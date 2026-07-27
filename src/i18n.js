export const SUPPORTED_LANGUAGES = ['es', 'en'];
export const DEFAULT_LANGUAGE = 'es';
export const LANGUAGE_CHANGE_EVENT = 'portfolio:languagechange';

const STORAGE_KEY = 'portfolio-language';
const supportedLanguageSet = new Set(SUPPORTED_LANGUAGES);

const normalizeLanguage = (value) => {
  const normalized = String(value ?? '')
    .trim()
    .toLowerCase()
    .slice(0, 2);

  return supportedLanguageSet.has(normalized)
    ? normalized
    : DEFAULT_LANGUAGE;
};

const isLocalizedRecord = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const keys = Object.keys(value);

  return (
    keys.length > 0 &&
    keys.every((key) => supportedLanguageSet.has(key))
  );
};

const readStoredLanguage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
    return storedLanguage && supportedLanguageSet.has(storedLanguage)
      ? storedLanguage
      : null;
  } catch {
    return null;
  }
};

export const getCurrentLanguage = () => {
  const storedLanguage = readStoredLanguage();

  if (storedLanguage) {
    return storedLanguage;
  }

  if (typeof document !== 'undefined') {
    const documentLanguage = normalizeLanguage(document.documentElement.lang);

    if (supportedLanguageSet.has(documentLanguage)) {
      return documentLanguage;
    }
  }

  if (typeof navigator !== 'undefined') {
    const navigatorLanguage = normalizeLanguage(navigator.language);

    if (supportedLanguageSet.has(navigatorLanguage)) {
      return navigatorLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
};

export const setCurrentLanguage = (value) => {
  const language = normalizeLanguage(value);
  const previousLanguage = getCurrentLanguage();

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage issues and keep the in-memory language flow working.
    }
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }

  if (
    typeof window !== 'undefined' &&
    previousLanguage !== language
  ) {
    window.dispatchEvent(
      new CustomEvent(LANGUAGE_CHANGE_EVENT, {
        detail: { language },
      })
    );
  }

  return language;
};

export const onLanguageChange = (listener) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handler = (event) => {
    listener(event.detail?.language ?? getCurrentLanguage());
  };

  window.addEventListener(LANGUAGE_CHANGE_EVENT, handler);

  return () => {
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, handler);
  };
};

export const resolveLocalizedValue = (
  value,
  language = getCurrentLanguage()
) => {
  if (Array.isArray(value)) {
    return value.map((entry) => resolveLocalizedValue(entry, language));
  }

  if (isLocalizedRecord(value)) {
    return (
      value[language] ??
      value[DEFAULT_LANGUAGE] ??
      Object.values(value).find((entry) => typeof entry === 'string') ??
      ''
    );
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        resolveLocalizedValue(entry, language),
      ])
    );
  }

  return value;
};
