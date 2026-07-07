import type { Access } from 'payload'

/** Unrestricted access (e.g. public read for catalogs). */
export const anyone: Access = () => true
