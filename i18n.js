/* eslint-disable prefer-destructuring */
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import en from './src/locales/en.json';
import pt from './src/locales/pt.json';

const loc = Localization.locale.split('-');

i18n.defaultLocale = 'en';
i18n.locale = loc[0];
i18n.fallbacks = true;
i18n.translations = { en, pt };

export default i18n;
