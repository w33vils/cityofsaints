import type { Core } from '@strapi/strapi';

// Path is relative to dist/src/ after TypeScript compilation
const { runSeed } = require('../../seed/seed-data');

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * Sets up public API permissions and seeds development data.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // ── Public API Permissions ──────────────────────────────
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    const publicReadTypes = [
      'api::sermon.sermon',
      'api::sermon-series.sermon-series',
      'api::event.event',
      'api::location.location',
      'api::team-member.team-member',
      'api::ministry.ministry',
      'api::initiative.initiative',
      'api::article.article',
      'api::class.class',
      'api::home-page.home-page',
      'api::give-page.give-page',
      'api::site-setting.site-setting',
    ];

    const publicCreateTypes = [
      'api::event-registration.event-registration',
    ];

    const permissions = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({ where: { role: publicRole.id } });

    const existingPerms = new Set(permissions.map((p: any) => p.action));
    const toCreate: Array<{ action: string; role: number }> = [];

    for (const uid of publicReadTypes) {
      for (const action of ['find', 'findOne']) {
        const full = `${uid}.${action}`;
        if (!existingPerms.has(full)) {
          toCreate.push({ action: full, role: publicRole.id });
        }
      }
    }

    for (const uid of publicCreateTypes) {
      const full = `${uid}.create`;
      if (!existingPerms.has(full)) {
        toCreate.push({ action: full, role: publicRole.id });
      }
    }

    for (const perm of toCreate) {
      await strapi.query('plugin::users-permissions.permission').create({ data: perm });
    }

    if (toCreate.length > 0) {
      strapi.log.info(`[bootstrap] Created ${toCreate.length} public API permissions`);
    }

    // ── Seed Development Data ───────────────────────────────
    try {
      await runSeed(strapi);
    } catch (err) {
      strapi.log.warn('[bootstrap] Seed skipped or failed:', err);
    }
  },
};
