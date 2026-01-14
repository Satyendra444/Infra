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
            langText: 'English',
            navItems: [
                {
                    text: 'Construction Equipments',
                    href: '/construction-equipments',
                    type: 'link',
                    subItems: [
                        { text: 'New Construction Equipments', href: '/construction-equipments' },
                        { text: 'Popular Construction Equipments', href: '/popular-construction-equipments' },
                        { text: 'Compare Construction Equipments', href: '/compare-construction-equipments' }
                    ]
                },
                {
                    text: 'JCB',
                    type: 'span',
                    subItems: [
                        { text: '3DX', href: '/construction-equipments/jcb/3dx' },
                        { text: '4DX', href: '/construction-equipments/jcb/4dx' },
                        { text: '3DX Plus', href: '/construction-equipments/jcb/3dx-plus' },
                        { text: '3DX Super', href: '/construction-equipments/jcb/3dx-super' },
                        { text: '3DX Xtra', href: '/construction-equipments/jcb/3dx-xtra' }
                    ]
                },
                {
                    text: 'BULL',
                    type: 'span',
                    subItems: [
                        { text: 'CH76 Challenger', href: '/construction-equipments/bull/ch76-challenger' },
                        { text: 'HD 100', href: '/construction-equipments/bull/hd-100' },
                        { text: 'HD 76', href: '/construction-equipments/bull/hd-76' },
                        { text: 'SD76', href: '/construction-equipments/bull/sd76' },
                        { text: 'Crusher King', href: '/construction-equipments/bull/crusher-king' }
                    ]
                },
                {
                    text: 'ACE',
                    type: 'span',
                    subItems: [
                        { text: 'AX-124', href: '/construction-equipments/ace/ax-124' },
                        { text: 'AX-124 4WD', href: '/construction-equipments/ace/ax-124-4wd' },
                        { text: 'AX-124 NS', href: '/construction-equipments/ace/ax-124-ns' },
                        { text: 'AX-130', href: '/construction-equipments/ace/ax-130' },
                        { text: 'AF 30E', href: '/construction-equipments/ace/af-30e' }
                    ]
                },
                { text: 'News', href: '/news', type: 'link' }
            ]
        },
        masthead: {
            cardTitle: 'Select Brand',
            categoryButtonText: 'Construction Equipment',
            brandPlaceholder: 'Select Brand',
            searchButtonText: 'Search'
        },
        popularEquipment: {
            sectionTitle: 'Most Popular Construction Equipment',
            tabButtonText: 'Popular',
            ctaButtonText: 'View On Road Price',
            footerLinkText: 'View All Popular Construction Equipments',
            footerLinkHref: '/popular-construction-equipments',
            sampleCards: [
                { brand: 'CASE', model: '770 FX', href: '/construction-equipments/case/770-fx', priceContains: '₹33.00 Lakh' },
                { brand: 'JCB', model: '2DX', href: '/construction-equipments/jcb/2dx', priceContains: '₹18.00 Lakh' },
                { brand: 'ACE', model: 'AX-130', href: '/construction-equipments/ace/ax-130', priceContains: '₹17.00 Lakh' }
            ]
        },
        brands: {
            heading: 'Search Construction Equipment By Brands',
            slugs: ['jcb', 'cat', 'ace', 'bobcat', 'bull', 'case', 'escorts']
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
            langText: 'English',
            navItems: [
                {
                    text: 'Construction Equipments',
                    href: '/construction-equipments',
                    type: 'link',
                    subItems: [
                        { text: 'New Construction Equipments', href: '/construction-equipments' },
                        { text: 'Popular Construction Equipments', href: '/popular-construction-equipments' },
                        { text: 'Compare Construction Equipments', href: '/compare-construction-equipments' }
                    ]
                },
                {
                    text: 'JCB',
                    type: 'span',
                    subItems: [
                        { text: '3DX', href: '/construction-equipments/jcb/3dx' },
                        { text: '4DX', href: '/construction-equipments/jcb/4dx' },
                        { text: '3DX Plus', href: '/construction-equipments/jcb/3dx-plus' },
                        { text: '3DX Super', href: '/construction-equipments/jcb/3dx-super' },
                        { text: '3DX Xtra', href: '/construction-equipments/jcb/3dx-xtra' }
                    ]
                },
                {
                    text: 'BULL',
                    type: 'span',
                    subItems: [
                        { text: 'CH76 Challenger', href: '/construction-equipments/bull/ch76-challenger' },
                        { text: 'HD 100', href: '/construction-equipments/bull/hd-100' },
                        { text: 'HD 76', href: '/construction-equipments/bull/hd-76' },
                        { text: 'SD76', href: '/construction-equipments/bull/sd76' },
                        { text: 'Crusher King', href: '/construction-equipments/bull/crusher-king' }
                    ]
                },
                {
                    text: 'ACE',
                    type: 'span',
                    subItems: [
                        { text: 'AX-124', href: '/construction-equipments/ace/ax-124' },
                        { text: 'AX-124 4WD', href: '/construction-equipments/ace/ax-124-4wd' },
                        { text: 'AX-124 NS', href: '/construction-equipments/ace/ax-124-ns' },
                        { text: 'AX-130', href: '/construction-equipments/ace/ax-130' },
                        { text: 'AF 30E', href: '/construction-equipments/ace/af-30e' }
                    ]
                },
                { text: 'News', href: '/news', type: 'link' }
            ]
        },
        masthead: {
            cardTitle: 'Select Brand',
            categoryButtonText: 'Construction Equipment',
            brandPlaceholder: 'Select Brand',
            searchButtonText: 'Search'
        },
        popularEquipment: {
            sectionTitle: 'Most Popular Construction Equipment',
            tabButtonText: 'Popular',
            ctaButtonText: 'View On Road Price',
            footerLinkText: 'View All Popular Construction Equipments',
            footerLinkHref: '/popular-construction-equipments',
            sampleCards: [
                { brand: 'CASE', model: '770 FX', href: '/construction-equipments/case/770-fx', priceContains: '₹33.00 Lakh' },
                { brand: 'JCB', model: '2DX', href: '/construction-equipments/jcb/2dx', priceContains: '₹18.00 Lakh' },
                { brand: 'ACE', model: 'AX-130', href: '/construction-equipments/ace/ax-130', priceContains: '₹17.00 Lakh' }
            ]
        },
        brands: {
            heading: 'Search Construction Equipment By Brands',
            slugs: ['jcb', 'cat', 'ace', 'bobcat', 'bull', 'case', 'escorts']
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
            langText: 'Hindi',
            navItems: [
                {
                    text: 'निर्माण उपकरण',
                    href: '/hi/construction-equipments',
                    type: 'link',
                    subItems: [
                        { text: 'नए निर्माण उपकरण', href: '/hi/construction-equipments' },
                        { text: 'लोकप्रिय निर्माण उपकरण', href: '/hi/popular-construction-equipments' },
                        { text: 'निर्माण उपकरण की तुलना करें', href: '/hi/compare-construction-equipments' }
                    ]
                },
                {
                    text: 'जेसीबी',
                    type: 'span',
                    subItems: [
                        { text: '3डीएक्स', href: '/hi/construction-equipments/jcb/3dx' },
                        { text: '4डीएक्स', href: '/hi/construction-equipments/jcb/4dx' },
                        { text: '3डीएक्स प्लस', href: '/hi/construction-equipments/jcb/3dx-plus' },
                        { text: '3डीएक्स सुपर', href: '/hi/construction-equipments/jcb/3dx-super' },
                        { text: '3डीएक्स एक्सट्रा', href: '/hi/construction-equipments/jcb/3dx-xtra' }
                    ]
                },
                {
                    text: 'बुल',
                    type: 'span',
                    subItems: [
                        { text: 'सीएच76 चैलेंजर', href: '/hi/construction-equipments/bull/ch76-challenger' },
                        { text: 'एचडी 100', href: '/hi/construction-equipments/bull/hd-100' },
                        { text: 'एचडी 76', href: '/hi/construction-equipments/bull/hd-76' },
                        { text: 'एसडी 76', href: '/hi/construction-equipments/bull/sd76' },
                        { text: 'क्रशर किंग', href: '/hi/construction-equipments/bull/crusher-king' }
                    ]
                },
                // {
                //     text: 'एस',
                //     type: 'span',
                //     subItems: [
                //         { text: 'एएक्स-124', href: '/hi/construction-equipments/ace/ax-124' },
                //         { text: 'एएक्स-124 4डब्ल्यूडी', href: '/hi/construction-equipments/ace/ax-124-4wd' },
                //         { text: 'एएक्स-124 एनएस', href: '/hi/construction-equipments/ace/ax-124-ns' },
                //         { text: 'एएक्स-130', href: '/hi/construction-equipments/ace/ax-130' },
                //         { text: 'ए एफ 30ई', href: '/hi/construction-equipments/ace/af-30e' }
                //     ]
                // },
                { text: 'समाचार', href: '/hi/news', type: 'link' }
            ]
        },
        masthead: {
            cardTitle: 'ब्रांड चुनें',
            categoryButtonText: 'निर्माण उपकरण',
            brandPlaceholder: 'ब्रांड चुनें',
            searchButtonText: 'खोजें'
        },
        popularEquipment: {
            sectionTitle: 'लोकप्रिय निर्माण उपकरण',
            tabButtonText: 'लोकप्रिय',
            ctaButtonText: 'ऑन-रोड कीमत देखें',
            footerLinkText: 'सभी लोकप्रिय निर्माण उपकरण को देखें',
            footerLinkHref: '/hi/popular-construction-equipments',
            sampleCards: [
                { brand: 'केस', model: '770 एफएक्स', href: '/hi/construction-equipments/case/770-fx', priceContains: '₹33.00 Lakh' },
                { brand: 'जेसीबी', model: '2डीएक्स', href: '/hi/construction-equipments/jcb/2dx', priceContains: '₹18.00 Lakh' },
                { brand: 'एस', model: 'एएक्स-130', href: '/hi/construction-equipments/ace/ax-130', priceContains: '₹17.00 Lakh' }
            ]
        },
        brands: {
            heading: 'ब्रांड के आधार पर निर्माण उपकरण खोजें',
            slugs: ['jcb', 'cat', 'ace', 'bobcat', 'bull', 'case', 'escorts']
        }
    }
];

