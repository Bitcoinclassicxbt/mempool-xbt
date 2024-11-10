export const defaultMempoolFeeColors = [
  '557d00',
  '5d7d01',
  '637d02',
  '6d7d04',
  '757d05',
  '7d7d06',
  '867d08',
  '8c7d09',
  '957d0b',
  '9b7d0c',
  'a67d0e',
  'aa7d0f',
  'b27d10',
  'bb7d11',
  'bf7d12',
  'bf7815',
  'bf7319',
  'be6c1e',
  'be6820',
  'bd6125',
  'bd5c28',
  'bc552d',
  'bc4f30',
  'bc4a34',
  'bb4339',
  'bb3d3c',
  'bb373f',
  'ba3243',
  'b92b48',
  'b9254b',
  'b8214d',
  'b71d4f',
  'b61951',
  'b41453',
  'b30e55',
  'b10857',
  'b00259',
  'ae005b',
];

export const contrastMempoolFeeColors = [
  '0082e6',
  '0984df',
  '1285d9',
  '1a87d2',
  '2388cb',
  '2c8ac5',
  '358bbe',
  '3e8db7',
  '468eb0',
  '4f90aa',
  '5892a3',
  '61939c',
  '6a9596',
  '72968f',
  '7b9888',
  '849982',
  '8d9b7b',
  '959c74',
  '9e9e6e',
  'a79f67',
  'b0a160',
  'b9a35a',
  'c1a453',
  'caa64c',
  'd3a745',
  'dca93f',
  'e5aa38',
  'edac31',
  'f6ad2b',
  'ffaf24',
  'ffb01e',
  'ffb118',
  'ffb212',
  'ffb30c',
  'ffb406',
  'ffb500',
  'ffb600',
  'ffb700',
 ];

export const chartColors = [
  "#D81B60",
  "#8E24AA",
  "#5E35B1",
  "#3949AB",
  "#1E88E5",
  "#039BE5",
  "#00ACC1",
  "#00897B",
  "#43A047",
  "#7CB342",
  "#C0CA33",
  "#FDD835",
  "#FFB300",
  "#FB8C00",
  "#F4511E",
  "#6D4C41",
  "#757575",
  "#546E7A",
  "#b71c1c",
  "#880E4F",
  "#4A148C",
  "#311B92",
  "#1A237E",
  "#0D47A1",
  "#01579B",
  "#006064",
  "#004D40",
  "#1B5E20",
  "#33691E",
  "#827717",
  "#F57F17",
  "#FF6F00",
  "#E65100",
  "#BF360C",
  "#3E2723",
  "#212121",
  "#263238",
  "#801313",
];

export const poolsColor = {
  'unknown': '#FDD835',
};

export const feeLevels = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200,
  250, 300, 350, 400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000];

export interface Language {
  code: string;
  name: string;
}

export const languages: Language[] = [
   { code: 'ar', name: 'العربية' },         // Arabic
// { code: 'bg', name: 'Български' },       // Bulgarian
// { code: 'bs', name: 'Bosanski' },        // Bosnian
// { code: 'ca', name: 'Català' },          // Catalan
   { code: 'cs', name: 'Čeština' },         // Czech
   { code: 'da', name: 'Dansk' },           // Danish
   { code: 'de', name: 'Deutsch' },         // German
// { code: 'et', name: 'Eesti' },           // Estonian
// { code: 'el', name: 'Ελληνικά' },        // Greek
   { code: 'en', name: 'English' },         // English
   { code: 'es', name: 'Español' },         // Spanish
// { code: 'eo', name: 'Esperanto' },       // Esperanto
// { code: 'eu', name: 'Euskara' },         // Basque
   { code: 'fa', name: 'فارسی' },           // Persian
   { code: 'fr', name: 'Français' },        // French
// { code: 'gl', name: 'Galego' },          // Galician
   { code: 'ko', name: '한국어' },          // Korean
   { code: 'hr', name: 'Hrvatski' },        // Croatian
// { code: 'id', name: 'Bahasa Indonesia' },// Indonesian
   { code: 'hi', name: 'हिन्दी' },             // Hindi
   { code: 'ne', name: 'नेपाली' },            // Nepalese
   { code: 'it', name: 'Italiano' },        // Italian
   { code: 'he', name: 'עברית' },           // Hebrew
   { code: 'ka', name: 'ქართული' },         // Georgian
// { code: 'lv', name: 'Latviešu' },        // Latvian
   { code: 'lt', name: 'Lietuvių' },        // Lithuanian
   { code: 'hu', name: 'Magyar' },          // Hungarian
   { code: 'mk', name: 'Македонски' },      // Macedonian
// { code: 'ms', name: 'Bahasa Melayu' },   // Malay
   { code: 'nl', name: 'Nederlands' },      // Dutch
   { code: 'ja', name: '日本語' },          // Japanese
   { code: 'nb', name: 'Norsk' },           // Norwegian Bokmål
// { code: 'nn', name: 'Norsk Nynorsk' },   // Norwegian Nynorsk
   { code: 'pl', name: 'Polski' },          // Polish
   { code: 'pt', name: 'Português' },       // Portuguese
// { code: 'pt-BR', name: 'Português (Brazil)' }, // Portuguese (Brazil)
   { code: 'ro', name: 'Română' },          // Romanian
   { code: 'ru', name: 'Русский' },         // Russian
// { code: 'sk', name: 'Slovenčina' },      // Slovak
   { code: 'sl', name: 'Slovenščina' },     // Slovenian
// { code: 'sr', name: 'Српски / srpski' }, // Serbian
// { code: 'sh', name: 'Srpskohrvatski / српскохрватски' },// Serbo-Croatian
   { code: 'fi', name: 'Suomi' },           // Finnish
   { code: 'sv', name: 'Svenska' },         // Swedish
   { code: 'th', name: 'ไทย' },             // Thai
   { code: 'tr', name: 'Türkçe' },          // Turkish
   { code: 'uk', name: 'Українська' },      // Ukrainian
   { code: 'vi', name: 'Tiếng Việt' },      // Vietnamese
   { code: 'zh', name: '中文' },            // Chinese
];

export const specialBlocks = {
  '0': {
    labelEvent: 'Genesis',
    labelEventCompleted: 'The Genesis of Luckycoin with 88 LKY reward per block',
    details: 'Initial block reward set at 88 LKY with a target block time of 1 minute.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '100000': {
    labelEvent: 'Luckycoin\'s 1st Halving',
    labelEventCompleted: 'Block Subsidy has halved to 44 LKY per block',
    details: 'First halving, reducing the block reward from 88 to 44 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '200000': {
    labelEvent: 'Luckycoin\'s 2nd Halving',
    labelEventCompleted: 'Block Subsidy has halved to 22 LKY per block',
    details: 'Second halving, reducing the block reward from 44 to 22 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '300000': {
    labelEvent: 'Luckycoin\'s 3rd Halving',
    labelEventCompleted: 'Block Subsidy has halved to 11 LKY per block',
    details: 'Third halving, reducing the block reward from 22 to 11 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '400000': {
    labelEvent: 'Luckycoin\'s 4th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 5.5 LKY per block',
    details: 'Fourth halving, reducing the block reward from 11 to 5.5 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '500000': {
    labelEvent: 'Luckycoin\'s 5th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 2.75 LKY per block',
    details: 'Fifth halving, reducing the block reward from 5.5 to 2.75 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '600000': {
    labelEvent: 'Luckycoin\'s 6th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 1.375 LKY per block',
    details: 'Sixth halving, reducing the block reward from 2.75 to 1.375 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '700000': {
    labelEvent: 'Luckycoin\'s 7th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.6875 LKY per block',
    details: 'Seventh halving, reducing the block reward from 1.375 to 0.6875 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '800000': {
    labelEvent: 'Luckycoin\'s 8th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.34375 LKY per block',
    details: 'Eighth halving, reducing the block reward from 0.6875 to 0.34375 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '900000': {
    labelEvent: 'Luckycoin\'s 9th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.171875 LKY per block',
    details: 'Ninth halving, reducing the block reward from 0.34375 to 0.171875 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '1000000': {
    labelEvent: 'Luckycoin\'s 10th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.0859375 LKY per block',
    details: 'Tenth halving, reducing the block reward from 0.171875 to 0.0859375 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '1100000': {
    labelEvent: 'Luckycoin\'s 11th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.04296875 LKY per block',
    details: 'Eleventh halving, reducing the block reward from 0.0859375 to 0.04296875 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '1200000': {
    labelEvent: 'Luckycoin\'s 12th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.021484375 LKY per block',
    details: 'Twelfth halving, reducing the block reward from 0.04296875 to 0.021484375 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '1300000': {
    labelEvent: 'Luckycoin\'s 13th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.0107421875 LKY per block',
    details: 'Thirteenth halving, reducing the block reward from 0.021484375 to 0.0107421875 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '1400000': {
    labelEvent: 'Luckycoin\'s 14th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.00537109375 LKY per block',
    details: 'Fourteenth halving, reducing the block reward from 0.0107421875 to 0.00537109375 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  },
  '1500000': {
    labelEvent: 'Luckycoin\'s 15th Halving',
    labelEventCompleted: 'Block Subsidy has halved to 0.002685546875 LKY per block',
    details: 'Fifteenth halving, reducing the block reward from 0.00537109375 to 0.002685546875 LKY.',
    networks: ['mainnet', 'testnet', 'testnet4'],
  }
};
export const fiatCurrencies = {
  AUD: {
    name: 'Australian Dollar',
    code: 'AUD',
    indexed: true,
  },
  CAD: {
    name: 'Canadian Dollar',
    code: 'CAD',
    indexed: true,
  },
  CHF: {
    name: 'Swiss Franc',
    code: 'CHF',
    indexed: true,
  },
  EUR: {
    name: 'Euro',
    code: 'EUR',
    indexed: true,
  },
  GBP: {
    name: 'Pound Sterling',
    code: 'GBP',
    indexed: true,
  },
  JPY: {
    name: 'Japanese Yen',
    code: 'JPY',
    indexed: true,
  },
  USD: {
    name: 'US Dollar',
    code: 'USD',
    indexed: true,
  },
  BGN: {
    name: 'Bulgarian Lev',
    code: 'BGN',
    indexed: true,
  },
  BRL: {
    name: 'Brazilian Real',
    code: 'BRL',
    indexed: true,
  },
  CNY: {
    name: 'Chinese Yuan',
    code: 'CNY',
    indexed: true,
  },
  CZK: {
    name: 'Czech Koruna',
    code: 'CZK',
    indexed: true,
  },
  DKK: {
    name: 'Danish Krone',
    code: 'DKK',
    indexed: true,
  },
  HKD: {
    name: 'Hong Kong Dollar',
    code: 'HKD',
    indexed: true,
  },
  HRK: {
    name: 'Croatian Kuna',
    code: 'HRK',
    indexed: true,
  },
  HUF: {
    name: 'Hungarian Forint',
    code: 'HUF',
    indexed: true,
  },
  IDR: {
    name: 'Indonesian Rupiah',
    code: 'IDR',
    indexed: true,
  },
  ILS: {
    name: 'Israeli Shekel',
    code: 'ILS',
    indexed: true,
  },
  INR: {
    name: 'Indian Rupee',
    code: 'INR',
    indexed: true,
  },
  ISK: {
    name: 'Icelandic Krona',
    code: 'ISK',
    indexed: true,
  },
  KRW: {
    name: 'South Korean Won',
    code: 'KRW',
    indexed: true,
  },
  MXN: {
    name: 'Mexican Peso',
    code: 'MXN',
    indexed: true,
  },
  MYR: {
    name: 'Malaysian Ringgit',
    code: 'MYR',
    indexed: true,
  },
  NOK: {
    name: 'Norwegian Krone',
    code: 'NOK',
    indexed: true,
  },
  NZD: {
    name: 'New Zealand Dollar',
    code: 'NZD',
    indexed: true,
  },
  PHP: {
    name: 'Philippine Peso',
    code: 'PHP',
    indexed: true,
  },
  PLN: {
    name: 'Polish Zloty',
    code: 'PLN',
    indexed: true,
  },
  RON: {
    name: 'Romanian Leu',
    code: 'RON',
    indexed: true,
  },
  RUB: {
    name: 'Russian Ruble',
    code: 'RUB',
    indexed: true,
  },
  SEK: {
    name: 'Swedish Krona',
    code: 'SEK',
    indexed: true,
  },
  SGD: {
    name: 'Singapore Dollar',
    code: 'SGD',
    indexed: true,
  },
  THB: {
    name: 'Thai Baht',
    code: 'THB',
    indexed: true,
  },
  TRY: {
    name: 'Turkish Lira',
    code: 'TRY',
    indexed: true,
  },
  ZAR: {
    name: 'South African Rand',
    code: 'ZAR',
    indexed: true,
  },
};