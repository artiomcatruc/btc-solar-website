import * as migration_20260708_122041 from './20260708_122041';
import * as migration_20260715_232523_add_localized_fields from './20260715_232523_add_localized_fields';

export const migrations = [
  {
    up: migration_20260708_122041.up,
    down: migration_20260708_122041.down,
    name: '20260708_122041',
  },
  {
    up: migration_20260715_232523_add_localized_fields.up,
    down: migration_20260715_232523_add_localized_fields.down,
    name: '20260715_232523_add_localized_fields'
  },
];
