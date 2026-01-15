import { LocaleData } from './testData/types';
import { BASE_COMMON, EN_COMMON, HI_COMMON } from './testData/common';
import { BASE_HOME, HI_HOME } from './testData/home';

export const LOCALES: LocaleData[] = [
    {
        path: '',
        name: 'Base',
        common: BASE_COMMON,
        home: BASE_HOME
    },
    {
        path: 'en',
        name: 'English',
        common: EN_COMMON,
        home: BASE_HOME
    },
    {
        path: 'hi',
        name: 'Hindi',
        common: HI_COMMON,
        home: HI_HOME
    }
];
