/**
 * Central site configuration — edit this file to adapt the portal to your
 * own domain / contact address / cost figures / panel links.
 *
 * NOTE: if you change COSTS below, keep the hard-coded figures in
 * src/lib/i18n/en.js and fr.js in sync (they mirror the same numbers).
 */
export const SITE = {
  name: 'Beryllium',
  domain: 'beryllium.ovh',
  contactEmail: 'admin@beryllium.ovh',
  tagline: 'Administration portal & self-hosted infrastructure'
};

/**
 * Links shown in the navbar "Panels" dropdown.
 * REPLACE the examples below with your own dashboard URLs.
 */
export const PANELS = [
  { label: 'Pelican Panel', href: 'https://pelican.beryllium.ovh' },
  // Add as many panel links as you need: { label, href }
];

/**
 * Optional donation URL (Buy Me a Coffee, Ko-fi, Liberapay…).
 * Leave empty ('') to hide the donate button; the clause text stays visible.
 */
export const DONATE_URL = 'https://ko-fi.com/agentflemme';

/**
 * Real, documented cost basis of the franc-le-franc cost-sharing agreement.
 * Monthly electricity per standard node ≈ power × 24 h × 30 d × priceCents/kWh.
 */
export const NODES = {
  nodePowerWatts: 60,
  kwhpriceCentsEuros: 0.22,
  hoursPerMonth: 24 * 30
};

export const SUBSCRIPTIONS = {
  pangolin: 4
};

export const MISC = {
  domains: 6,
  vpn: 5,
  purelymail: 10
};

export const USERCOUNT = 2;

export function monthlyNodeElectricityEuros(costs = NODES) {
  const kwh = (costs.nodePowerWatts / 1000) * costs.hoursPerMonth;
  return Math.round(kwh * costs.kwhpriceCentsEuros * 100) / 100
};

export function monthlySubscriptionEuros(costs = SUBSCRIPTIONS) {
  const p = costs.pangolin;
  return p
};

export function monthlyMiscEuros(costs = MISC) {
  const d = costs.domains / 12 ;
  const v = costs.vpn;
  const p = costs.vpn / 12;
  return d + v + p
};

export function pricePerUser(opt = 0, e = monthlyNodeElectricityEuros(), s = monthlySubscriptionEuros(), m = monthlyMiscEuros(), u = USERCOUNT) {
  return Math.ceil((e + s + m) / (u + opt));
};

/**
 * Services listed on /services — EXAMPLE TEMPLATE:
 * duplicate an entry, edit the fields, delete this comment.
 * (Service content is written once, in your language of choice;
 * only the page chrome is translated.)
 */
export const SERVICES = [
  {
    id: 'gameserver',
    name: 'Managed game servers',
    tagline: 'A ready to use game server.',
    description:
      'A server up and ready to go, preconfigured for maximum ease of use. Put your files in the server, connect to the console and click start !',
    features: [
      'Wide games list : Minecraft, Terraria, Palworld...',
      'On-demand resource expansion and port requests',
      'Access panel with live metrics',
      'Best-effort support by email or Discord'
    ],
    priceCents: `${pricePerUser(1)}€ per month`,
    priceCentsNote: '',
    badge: 'Available on Pelican'
  },
  {
    id: 'computeserver',
    name: 'Managed compute servers',
    tagline: 'A ready to use compute server.',
    description:
      'A server up and ready to go, preconfigured for maximum ease of use. Put your files in the server, connect to the console and click start !',
    features: [
      'Wide languages list : Python, Rust, C++, Javascript...',
      'On-demand resource expansion and port requests',
      'Access panel with live metrics',
      'Best-effort support by email or Discord',
      'Packages list editing (ex. dependancies like sqlite)'
    ],
    priceCents: `${pricePerUser(1)}€ per month`,
    priceCentsNote: '',
    badge: 'Available on Pelican'
  },
  {
    id: 'webserver',
    name: 'Managed compute servers',
    tagline: 'A ready to use compute server.',
    description:
      'A server up and ready to go, preconfigured for maximum ease of use. Put your files in the server, connect to the console and click start !',
    features: [
      'Wide languages list : Python, Rust, C++, Javascript...',
      'On-demand resource expansion and port requests',
      'Access panel with live metrics',
      'Best-effort support by email or Discord',
      'Packages list editing (ex. dependancies like sqlite)'
    ],
    priceCents: `${pricePerUser(1)}€ per month`,
    priceCentsNote: '',
    badge: 'Available on Pelican'
  }
];