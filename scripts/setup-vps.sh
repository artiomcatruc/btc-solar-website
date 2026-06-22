#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# VPS initial setup script for BTC Solar website
# Run as root on a fresh Ubuntu 22.04/24.04 Hetzner VPS:
#   curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/btc-solar-website/main/scripts/setup-vps.sh | bash
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_DIR="/opt/btcsolar"
DEPLOY_USER="deploy"

echo "── [1/6] System update ──────────────────────────────────────"
apt-get update -qq && apt-get upgrade -y -qq

echo "── [2/6] Install Docker ─────────────────────────────────────"
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
fi

# Add deploy user to docker group so it can run docker without sudo
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
  echo "  ⚠  Paste your GitHub Actions public SSH key below, then press ENTER twice:"
  read -r pubkey
  echo "$pubkey" >> /home/$DEPLOY_USER/.ssh/authorized_keys
  chmod 600 /home/$DEPLOY_USER/.ssh/authorized_keys
  chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/.ssh
fi

echo "── [5/6] Create app directory ───────────────────────────────"
mkdir -p "$APP_DIR"
chown "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

echo ""
echo "  Copy your docker-compose.prod.yml and .env.production to $APP_DIR on the server:"
echo "  scp docker-compose.prod.yml .env.production $DEPLOY_USER@<SERVER_IP>:$APP_DIR/"
echo ""

echo "── [6/6] Configure firewall (UFW) ───────────────────────────"
apt-get install -y -qq ufw
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP  (Caddy redirects to HTTPS)
ufw allow 443/tcp  # HTTPS
ufw allow 443/udp  # HTTP/3 (QUIC)
ufw --force enable
ufw status verbose

echo ""
echo "─────────────────────────────────────────────────────────────"
echo " VPS setup complete!"
echo ""
echo " Next steps:"
echo "  1. Copy Caddyfile to /etc/caddy/Caddyfile"
echo "  2. Replace 'btcsolar.md' in Caddyfile with your real domain"
echo "  3. systemctl reload caddy"
echo "  4. Copy docker-compose.prod.yml + .env.production to $APP_DIR"
echo "  5. Add GitHub Secrets: SSH_HOST, SSH_USER=deploy, SSH_PRIVATE_KEY"
echo "  6. Push to main → GitHub Actions will deploy automatically"
echo "─────────────────────────────────────────────────────────────"
