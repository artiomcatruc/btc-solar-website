#!/bin/bash
# VPS initial setup for btc-solar-website (GitHub Actions deploy — no build on VPS)
# Run as root on fresh Ubuntu 22.04/24.04:
#   bash scripts/setup-vps.sh
set -euo pipefail

APP_DIR="/opt/btcsolar"
DEPLOY_USER="${DEPLOY_USER:-deploy}"

echo "── [1/6] System update ──────────────────────────────────────"
apt-get update -qq && apt-get upgrade -y -qq

echo "── [2/6] Install Docker ─────────────────────────────────────"
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
fi

getent group docker || groupadd docker

echo "── [3/6] Install Caddy ──────────────────────────────────────"
if ! command -v caddy &>/dev/null; then
  apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https curl
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    | tee /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -qq
  apt-get install -y -qq caddy
  systemctl enable caddy
fi

echo "── [4/6] Create deploy user ─────────────────────────────────"
if ! id "$DEPLOY_USER" &>/dev/null; then
  useradd -m -s /bin/bash "$DEPLOY_USER"
  usermod -aG docker "$DEPLOY_USER"
  mkdir -p /home/$DEPLOY_USER/.ssh
  chmod 700 /home/$DEPLOY_USER/.ssh
  echo ""
  echo "  Paste GitHub Actions deploy public key, then press ENTER twice:"
  read -r pubkey
  echo "$pubkey" >> /home/$DEPLOY_USER/.ssh/authorized_keys
  chmod 600 /home/$DEPLOY_USER/.ssh/authorized_keys
  chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/.ssh
fi

echo "── [5/6] App directory ──────────────────────────────────────"
mkdir -p "$APP_DIR"
chown "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

echo ""
echo "  Create $APP_DIR/.env (postgres credentials):"
echo "    POSTGRES_USER=btcsolar"
echo "    POSTGRES_PASSWORD=<strong-password>"
echo "    POSTGRES_DB=btcsolar"
echo "    APP_IMAGE=ghcr.io/artiomcatruc/btc-solar-website:latest"
echo ""
echo "  Create $APP_DIR/.env.production (app secrets):"
echo "    DATABASE_URL=postgres://btcsolar:<password>@postgres:5432/btcsolar"
echo "    PAYLOAD_SECRET=<secret>"
echo "    NEXT_PUBLIC_SERVER_URL=https://btcecosystem.md"
echo "    CRON_SECRET=<secret>"
echo "    PREVIEW_SECRET=<secret>"
echo ""

echo "── [6/6] Firewall ───────────────────────────────────────────"
apt-get install -y -qq ufw
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp
ufw --force enable

echo ""
echo "─────────────────────────────────────────────────────────────"
echo " VPS setup complete."
echo ""
echo " Next:"
echo "  1. cp Caddyfile /etc/caddy/Caddyfile && systemctl reload caddy"
echo "  2. Put .env + .env.production in $APP_DIR"
echo "  3. GitHub Secrets: SSH_HOST, SSH_USER, SSH_PRIVATE_KEY,"
echo "     PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL"
echo "  4. If GHCR package is private, add GHCR_PAT (read:packages)"
echo "     OR make package public: github.com/artiomcatruc?tab=packages"
echo "  5. Push to main → GHA builds image, VPS only pull + migrate"
echo "─────────────────────────────────────────────────────────────"
