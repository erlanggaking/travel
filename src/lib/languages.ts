// Supported languages configuration
export const languages = [
  { code: "ID", name: "Bahasa Indonesia", flag: "🇮🇩", locale: "id-ID" },
  { code: "EN", name: "English", flag: "🇺🇸", locale: "en-US" },
  { code: "ZH", name: "中文 (Chinese)", flag: "🇨🇳", locale: "zh-CN" },
  { code: "ES", name: "Español (Spanish)", flag: "🇪🇸", locale: "es-ES" },
  { code: "AR", name: "العربية (Arabic)", flag: "🇸🇦", locale: "ar-SA" },
  { code: "HI", name: "हिन्दी (Hindi)", flag: "🇮🇳", locale: "hi-IN" },
  { code: "FR", name: "Français (French)", flag: "🇫🇷", locale: "fr-FR" },
  { code: "RU", name: "Русский (Russian)", flag: "🇷🇺", locale: "ru-RU" },
  { code: "PT", name: "Português (Portuguese)", flag: "🇧🇷", locale: "pt-BR" },
  { code: "DE", name: "Deutsch (German)", flag: "🇩🇪", locale: "de-DE" },
  { code: "JA", name: "日本語 (Japanese)", flag: "🇯🇵", locale: "ja-JP" },
  { code: "KO", name: "한국어 (Korean)", flag: "🇰🇷", locale: "ko-KR" },
  { code: "IT", name: "Italiano (Italian)", flag: "🇮🇹", locale: "it-IT" },
  { code: "TR", name: "Türkçe (Turkish)", flag: "🇹🇷", locale: "tr-TR" },
  { code: "NL", name: "Nederlands (Dutch)", flag: "🇳🇱", locale: "nl-NL" },
  { code: "TH", name: "ไทย (Thai)", flag: "🇹🇭", locale: "th-TH" },
  { code: "VI", name: "Tiếng Việt (Vietnamese)", flag: "🇻🇳", locale: "vi-VN" },
];

export type LanguageCode = typeof languages[number]["code"];
