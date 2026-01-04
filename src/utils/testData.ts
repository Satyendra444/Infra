// Define the locales to test with expected data
export const LOCALES = [
    {
        path: '',
        name: 'Base',
        expectedTitle: 'New Construction Equipment, Latest Construction Equipment News in India',
        expectedDesc: 'Thinking of buying a Construction Equipment? 91Infra helps you in researching with reviews, specifications, customer ratings all in one place.',
        header: {
            logoHref: '/',
            searchPlaceholder: 'Search Construction Equipments',
            langText: 'English' // Based on user request/snippet
        }
    },
    {
        path: 'en',
        name: 'English',
        expectedTitle: 'New Construction Equipment, Latest Construction Equipment News in India',
        expectedDesc: 'Thinking of buying a Construction Equipment? 91Infra helps you in researching with reviews, specifications, customer ratings all in one place.',
        header: {
            logoHref: '/en', // Assuming /en, checking logic later
            searchPlaceholder: 'Search Construction Equipments',
            langText: 'English'
        }
    },
    {
        path: 'hi',
        name: 'Hindi',
        expectedTitle: 'नए निर्माण उपकरण, भारत में नवीनतम वाणिज्यिक वाहन समाचार',
        expectedDesc: 'निर्माण उपकरण खरीदने की सोच रहे हैं? 91इन्फ्रा आपको एक ही स्थान पर समीक्षा, विशिष्टताओं, ग्राहक रेटिंग के साथ शोध करने में मदद करता है।',
        header: {
            logoHref: '/hi',
            searchPlaceholder: 'कंस्ट्रक्शन इक्विपमेंट्स',
            langText: 'Hindi'
        }
    }
];
