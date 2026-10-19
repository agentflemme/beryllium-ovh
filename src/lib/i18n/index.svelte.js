/**
 * Minimal client-side i18n (English default, French optional).
 *
 * SSR always renders the default language (keeps prerendered pages cacheable);
 * the visitor's saved/browser language is applied after hydration, and the
 * navbar button switches languages live — no reload, no server round-trip.
 */
import { en } from './en.js';
import { fr } from './fr.js';

const dictionaries = { en, fr };
const STORAGE_KEY = 'beryllium-lang';

/** @type {'en' | 'fr'} */
let lang = $state('en');

/** Apply a stored/browser-detected language after hydration. */
export function initLang() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
  if (saved && dictionaries[saved]) {
    lang = /** @type {'en' | 'fr'} */ (saved);
    return;
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2) : null;
  if (nav && dictionaries[nav]) lang = /** @type {'en' | 'fr'} */ (nav);
}

/** @param {'en' | 'fr'} next */
export function setLang(next) {
  if (!dictionaries[next]) return;
  lang = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage unavailable */
  }
  if (typeof document !== 'undefined') document.documentElement.lang = next;
}

export function toggleLang() {
  setLang(lang === 'en' ? 'fr' : 'en');
}

export function getLang() {
  return lang;
}

/** Locale for Intl formatting, mirroring the active language. */
export function currentLocale() {
  return lang === 'fr' ? 'fr-FR' : 'en-GB';
}

/**
 * Look up a dot-separated key in the active dictionary (falls back to English,
 * then to the key itself so missing strings are visible instead of blank).
 * Reading `lang` here makes calling components re-render on language change.
 * @param {string} path
 */
export function t(path) {
  const dict = dictionaries[lang] ?? en;
  let value = path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), dict);
  if (value === undefined) value = path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), en);
  return value === undefined ? path : value;
}
