import * as migration_20260708_122041 from './20260708_122041';
import * as migration_20260715_232523_add_localized_fields from './20260715_232523_add_localized_fields';
import * as migration_20260719_121928_add_site_whatsapp_phone from './20260719_121928_add_site_whatsapp_phone';
import * as migration_20260719_123413_add_leads_summary_fields from './20260719_123413_add_leads_summary_fields';
import * as migration_20260719_124716_add_products_collection from './20260719_124716_add_products_collection';
import * as migration_20260719_134505_add_orders_collection from './20260719_134505_add_orders_collection';

export const migrations = [
  {
    up: migration_20260708_122041.up,
    down: migration_20260708_122041.down,
    name: '20260708_122041',
  },
  {
    up: migration_20260715_232523_add_localized_fields.up,
    down: migration_20260715_232523_add_localized_fields.down,
    name: '20260715_232523_add_localized_fields',
  },
  {
    up: migration_20260719_121928_add_site_whatsapp_phone.up,
    down: migration_20260719_121928_add_site_whatsapp_phone.down,
    name: '20260719_121928_add_site_whatsapp_phone',
  },
  {
    up: migration_20260719_123413_add_leads_summary_fields.up,
    down: migration_20260719_123413_add_leads_summary_fields.down,
    name: '20260719_123413_add_leads_summary_fields',
  },
  {
    up: migration_20260719_124716_add_products_collection.up,
    down: migration_20260719_124716_add_products_collection.down,
    name: '20260719_124716_add_products_collection',
  },
  {
    up: migration_20260719_134505_add_orders_collection.up,
    down: migration_20260719_134505_add_orders_collection.down,
    name: '20260719_134505_add_orders_collection'
  },
];
