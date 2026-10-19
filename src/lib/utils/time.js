/** Date/time helpers (locale-aware via i18n). */

import { currentLocale } from '$lib/i18n/index.svelte.js';

const RELATIVE_UNITS = [
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60]
];

/**
 * @param {string | null | undefined} iso
 * @returns {string} human-readable relative time in the active language
 */
export function formatRelative(iso) {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';

  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat(currentLocale(), { numeric: 'auto' });

  for (const [unit, seconds] of RELATIVE_UNITS) {
    if (Math.abs(diffSeconds) >= seconds) {
      return rtf.format(Math.round(diffSeconds / seconds), unit);
    }
  }
  return currentLocale().startsWith('fr') ? "à l'instant" : 'just now';
}

/**
 * @param {string | null | undefined} iso
 * @returns {string} HH:MM:SS in the active locale, or '—'
 */
export function formatClock(iso) {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleTimeString(currentLocale(), {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * @param {number | null | undefined} value
 * @returns {string} formatted percentage with locale decimal separator
 */
export function formatPercent(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return '—';
  return `${Number(value).toLocaleString(currentLocale(), { maximumFractionDigits: 1 })} %`;
}

/**
 * Format bytes into a human-readable string (GB with 1 decimal, or MB if < 1 GB).
 * @param {number | null | undefined} bytes
 * @returns {string | null}
 */
export function formatBytes(bytes) {
  if (bytes === null || bytes === undefined || bytes === 0 || !Number.isFinite(bytes)) return null;
  const gb = bytes / (1024 ** 3);
  if (gb >= 1) return `${gb.toFixed(1)} GB`;
  const mb = bytes / (1024 ** 2);
  return `${mb.toFixed(0)} MB`;
}

