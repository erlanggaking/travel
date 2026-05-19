// Supported currencies configuration
export const currencies = [
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", locale: "id-ID" },
  { code: "USD", name: "US Dollar", symbol: "$", locale: "en-US" },
  { code: "EUR", name: "Euro", symbol: "€", locale: "de-DE" },
  { code: "GBP", name: "British Pound", symbol: "£", locale: "en-GB" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", locale: "ja-JP" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", locale: "zh-CN" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", locale: "en-AU" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", locale: "en-CA" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", locale: "de-CH" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", locale: "en-SG" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", locale: "zh-HK" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", locale: "ko-KR" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", locale: "hi-IN" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", locale: "ms-MY" },
  { code: "THB", name: "Thai Baht", symbol: "฿", locale: "th-TH" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", locale: "ar-AE" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", locale: "ar-SA" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", locale: "pt-BR" },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$", locale: "es-MX" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", locale: "ru-RU" },
];

export type CurrencyCode = typeof currencies[number]["code"];
