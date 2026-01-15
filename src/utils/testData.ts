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
        latestNews: {
            sectionTitle: 'Latest News',
            tabButtonText: 'Construction Equipments',
            footerLinkText: 'View All Construction Equipments News',
            footerLinkHref: '/news/category/construction-equipments',
            sampleArticles: [
                {
                    href: '/news/ace-introduces-new-construction-machinery-line-up-at-excon-2025',
                    titleContains: 'ACE Introduces New Construction Machinery Line-Up at EXCON 2025',
                    excerptContains: 'At EXCON 2025',
                    author: 'By Indraroop',
                    dateContains: 'Dec 24 2025',
                    readTime: '4 min read'
                },
                {
                    href: '/news/autocracy-machinery-expands-product-line-with-rudra-prime-pro-and-mini-at-excon-2025',
                    titleContains: 'Autocracy Machinery Expands Product Line',
                    excerptContains: 'Autocracy Machinery launched',
                    author: 'By Indraroop',
                    dateContains: 'Dec 18 2025',
                    readTime: '3 min read'
                },
                {
                    href: '/news/why-construction-vehicles-have-so-many-blind-spots-and-how-they-are-managed',
                    titleContains: 'Why Construction Vehicles Have So Many Blind Spots',
                    excerptContains: 'Construction sites are bustling',
                    author: 'By Pratham',
                    dateContains: 'Dec 17 2025',
                    readTime: '4 min read'
                }
            ]
        },
        comparePopular: {
            sectionTitle: 'Most Popular Comparison',
            items: [
                { href: '/compare-construction-equipments/jcb-3dx-vs-tata-hitachi-shinrai', left: { brand: 'JCB', model: '3DX', priceContains: '₹35.00 Lakh' }, right: { brand: 'Tata Hitachi', model: 'Shinrai', priceContains: '₹29.00 Lakh' }, ctaText: 'Compare' },
                { href: '/compare-construction-equipments/jcb-2dx-vs-jcb-3dx-plus', left: { brand: 'JCB', model: '2DX', priceContains: '₹18.00 Lakh' }, right: { brand: 'JCB', model: '3DX Plus', priceContains: '₹30.00 Lakh' }, ctaText: 'Compare' },
                { href: '/compare-construction-equipments/jcb-3dx-plus-vs-jcb-3dx-super', left: { brand: 'JCB', model: '3DX Plus', priceContains: '₹30.00 Lakh' }, right: { brand: 'JCB', model: '3DX Super', priceContains: '₹34.00 Lakh' }, ctaText: 'Compare' },
                { href: '/compare-construction-equipments/cat-424-b2-vs-jcb-3dx', left: { brand: 'CAT', model: '424 B2', priceContains: '₹34.00 Lakh' }, right: { brand: 'JCB', model: '3DX', priceContains: '₹35.00 Lakh' }, ctaText: 'Compare' },
                { href: '/compare-construction-equipments/jcb-3dx-vs-jcb-3dx-super', left: { brand: 'JCB', model: '3DX', priceContains: '₹35.00 Lakh' }, right: { brand: 'JCB', model: '3DX Super', priceContains: '₹34.00 Lakh' }, ctaText: 'Compare' },
                { href: '/compare-construction-equipments/case-770-ex-vs-jcb-3dx', left: { brand: 'CASE', model: '770 EX', priceContains: 'Price coming soon' }, right: { brand: 'JCB', model: '3DX', priceContains: '₹35.00 Lakh' }, ctaText: 'Compare' }
            ]
        },
        brands: {
            heading: 'Search Construction Equipment By Brands',
            slugs: ['jcb', 'cat', 'ace', 'bobcat', 'bull', 'case', 'escorts']
        },
        footer: {
            logoAlt: '91Infra',
            logoTitle: '91Infra',
            descriptionText: '91Infra is a rapidly growing digital platform that provides the latest updates and detailed information about the infrastructure and construction equipment industry.',
            sections: {
                about: {
                    title: 'About 91Infra',
                    links: [
                        { text: 'About Us', href: '/about' },
                        { text: 'Contact Us', href: '/contact' },
                        { text: 'Privacy Policy', href: '/privacy-policy' },
                        { text: 'Terms & Conditions', href: '/terms' }
                    ]
                },
                workWithUs: {
                    title: 'Work With Us',
                    links: [
                        { text: 'Advertise With Us', href: '/advertise' },
                        { text: 'Feedback', href: '/feedback' },
                        { text: 'Career', href: '/careers' }
                    ]
                },
                usefulLinks: {
                    title: 'Useful Links',
                    links: [
                        { text: 'Construction Equipments', href: '/construction-equipments' },
                        { text: 'News', href: '/news/category/construction-equipments' }
                    ]
                },
                partners: {
                    title: 'Our Partner Website',
                    links: [
                        { alt: '91trucks.com', logoSrc: '91trucks-logo.png' },
                        { alt: '91tractors.com', logoSrc: '91tractors-logo.webp' }
                    ]
                },
                social: {
                    title: 'Get Connected',
                    icons: ['facebook', 'insta', 'linkedin', 'youtube']
                }
            }
        },
        seo: {
            title: 'New Construction Equipment, Latest Construction Equipment News in India',
            description: 'Thinking of buying a Construction Equipment? 91Infra helps you in researching with reviews, specifications, customer ratings all in one place.',
            ogTitle: 'New Construction Equipment, Latest Construction Equipment News in India',
            ogDescription: 'Thinking of buying a Construction Equipment? 91Infra helps you in researching with reviews, specifications, customer ratings all in one place.',
            ogImage: 'https://images.91infra.com/banner/91infra-masthead-without-logo1440x450png_1716197957.png',
            ogUrl: 'https://www.91infra.com/',
            ogType: 'website',
            twitterTitle: 'New Construction Equipment, Latest Construction Equipment News in India',
            twitterDescription: 'Thinking of buying a Construction Equipment? 91Infra helps you in researching with reviews, specifications, customer ratings all in one place.',
            twitterImage: 'https://images.91infra.com/banner/91infra-masthead-without-logo1440x450png_1716197957.png',
            twitterCard: 'summary_large_image',
            robots: 'index, follow',
            canonical: '/',
            hreflangs: [
                { lang: 'en', href: 'https://www.91infra.com/' },
                { lang: 'hi', href: 'https://www.91infra.com/hi/' },
                { lang: 'x-default', href: 'https://www.91infra.com/' }
            ]
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
        latestNews: {
            sectionTitle: 'Latest News',
            tabButtonText: 'Construction Equipments',
            footerLinkText: 'View All Construction Equipments News',
            footerLinkHref: '/news/category/construction-equipments',
            sampleArticles: [
                {
                    href: '/news/ace-introduces-new-construction-machinery-line-up-at-excon-2025',
                    titleContains: 'ACE Introduces New Construction Machinery Line-Up at EXCON 2025',
                    excerptContains: 'At EXCON 2025',
                    author: 'By Indraroop',
                    dateContains: 'Dec 24 2025',
                    readTime: '4 min read'
                },
                {
                    href: '/news/autocracy-machinery-expands-product-line-with-rudra-prime-pro-and-mini-at-excon-2025',
                    titleContains: 'Autocracy Machinery Expands Product Line',
                    excerptContains: 'Autocracy Machinery launched',
                    author: 'By Indraroop',
                    dateContains: 'Dec 18 2025',
                    readTime: '3 min read'
                },
                {
                    href: '/news/why-construction-vehicles-have-so-many-blind-spots-and-how-they-are-managed',
                    titleContains: 'Why Construction Vehicles Have So Many Blind Spots',
                    excerptContains: 'Construction sites are bustling',
                    author: 'By Pratham',
                    dateContains: 'Dec 17 2025',
                    readTime: '4 min read'
                }
            ]
        },
        comparePopular: {
            sectionTitle: 'Most Popular Comparison',
            items: [
                { href: '/compare-construction-equipments/jcb-3dx-vs-tata-hitachi-shinrai', left: { brand: 'JCB', model: '3DX', priceContains: '₹35.00 Lakh' }, right: { brand: 'Tata Hitachi', model: 'Shinrai', priceContains: '₹29.00 Lakh' }, ctaText: 'Compare' },
                { href: '/compare-construction-equipments/jcb-2dx-vs-jcb-3dx-plus', left: { brand: 'JCB', model: '2DX', priceContains: '₹18.00 Lakh' }, right: { brand: 'JCB', model: '3DX Plus', priceContains: '₹30.00 Lakh' }, ctaText: 'Compare' },
                { href: '/compare-construction-equipments/jcb-3dx-plus-vs-jcb-3dx-super', left: { brand: 'JCB', model: '3DX Plus', priceContains: '₹30.00 Lakh' }, right: { brand: 'JCB', model: '3DX Super', priceContains: '₹34.00 Lakh' }, ctaText: 'Compare' },
                { href: '/compare-construction-equipments/cat-424-b2-vs-jcb-3dx', left: { brand: 'CAT', model: '424 B2', priceContains: '₹34.00 Lakh' }, right: { brand: 'JCB', model: '3DX', priceContains: '₹35.00 Lakh' }, ctaText: 'Compare' },
                { href: '/compare-construction-equipments/jcb-3dx-vs-jcb-3dx-super', left: { brand: 'JCB', model: '3DX', priceContains: '₹35.00 Lakh' }, right: { brand: 'JCB', model: '3DX Super', priceContains: '₹34.00 Lakh' }, ctaText: 'Compare' },
                { href: '/compare-construction-equipments/case-770-ex-vs-jcb-3dx', left: { brand: 'CASE', model: '770 EX', priceContains: 'Price coming soon' }, right: { brand: 'JCB', model: '3DX', priceContains: '₹35.00 Lakh' }, ctaText: 'Compare' }
            ]
        },
        brands: {
            heading: 'Search Construction Equipment By Brands',
            slugs: ['jcb', 'cat', 'ace', 'bobcat', 'bull', 'case', 'escorts']
        },
        footer: {
            logoAlt: '91Infra',
            logoTitle: '91Infra',
            descriptionText: '91Infra is a rapidly growing digital platform that provides the latest updates and detailed information about the infrastructure and construction equipment industry.',
            sections: {
                about: {
                    title: 'About 91Infra',
                    links: [
                        { text: 'About Us', href: '/en/about' },
                        { text: 'Contact Us', href: '/en/contact' },
                        { text: 'Privacy Policy', href: '/en/privacy-policy' },
                        { text: 'Terms & Conditions', href: '/en/terms' }
                    ]
                },
                workWithUs: {
                    title: 'Work With Us',
                    links: [
                        { text: 'Advertise With Us', href: '/en/advertise' },
                        { text: 'Feedback', href: '/en/feedback' },
                        { text: 'Career', href: '/en/careers' }
                    ]
                },
                usefulLinks: {
                    title: 'Useful Links',
                    links: [
                        { text: 'Construction Equipments', href: '/en/construction-equipments' },
                        { text: 'News', href: '/en/news/category/construction-equipments' }
                    ]
                },
                partners: {
                    title: 'Our Partner Website',
                    links: [
                        { alt: '91trucks.com', logoSrc: '91trucks-logo.png' },
                        { alt: '91tractors.com', logoSrc: '91tractors-logo.webp' }
                    ]
                },
                social: {
                    title: 'Get Connected',
                    icons: ['facebook', 'insta', 'linkedin', 'youtube']
                }
            }
        },
        seo: {
            title: 'New Construction Equipment, Latest Construction Equipment News in India',
            description: 'Thinking of buying a Construction Equipment? 91Infra helps you in researching with reviews, specifications, customer ratings all in one place.',
            ogTitle: 'New Construction Equipment, Latest Construction Equipment News in India',
            ogDescription: 'Thinking of buying a Construction Equipment? 91Infra helps you in researching with reviews, specifications, customer ratings all in one place.',
            ogImage: 'https://images.91infra.com/banner/91infra-masthead-without-logo1440x450png_1716197957.png',
            ogUrl: 'https://www.91infra.com/',
            ogType: 'website',
            twitterTitle: 'New Construction Equipment, Latest Construction Equipment News in India',
            twitterDescription: 'Thinking of buying a Construction Equipment? 91Infra helps you in researching with reviews, specifications, customer ratings all in one place.',
            twitterImage: 'https://images.91infra.com/banner/91infra-masthead-without-logo1440x450png_1716197957.png',
            twitterCard: 'summary_large_image',
            robots: 'index, follow',
            canonical: '/',
            hreflangs: [
                { lang: 'en', href: 'https://www.91infra.com/' },
                { lang: 'hi', href: 'https://www.91infra.com/hi/' },
                { lang: 'x-default', href: 'https://www.91infra.com/' }
            ]
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
        latestNews: {
            sectionTitle: 'लेटेस्ट न्यूज़',
            tabButtonText: 'निर्माण उपकरण',
            footerLinkText: 'सभी निर्माण उपकरण समाचार देखे',
            footerLinkHref: '/hi/news/category/construction-equipments',
            sampleArticles: [
                {
                    href: '/hi/news/ace-excon-2025-new-construction-machines',
                    titleContains: 'एक्शन कंस्ट्रक्शन इक्विपमेंट (एसीई) ने एक्सकॉन 2025 में नई निर्माण मशीनों की श्रृंखला पेश की',
                    excerptContains: 'एक्सकॉन 2025',
                    author: 'By Indraroop',
                    dateContains: 'Dec 24 2025',
                    readTime: '3 min read'
                },
                {
                    href: '/hi/news/autocracy-machinery-rudra-prime-pro-mini-excon-2025',
                    titleContains: 'ऑटोकरेसी मशीनरी ने एक्सकॉन 2025 में लॉन्च किया “रुद्रा प्राइम प्रो” और “रुद्रा प्राइम मिनी”',
                    excerptContains: 'ऑटोकरेसी मशीनरी',
                    author: 'By Indraroop',
                    dateContains: 'Dec 18 2025',
                    readTime: '2 min read'
                },
                {
                    href: '/hi/news/construction-vehicle-blind-spots-safety',
                    titleContains: 'निर्माण कार्य में इस्तेमाल होने वाले वाहनों में इतने ज्यादा ब्लाइंड स्पॉट क्यों होते हैं और इन्हें कैसे संभाला जाता है',
                    excerptContains: 'निर्माण स्थल',
                    author: 'By Pratham',
                    dateContains: 'Dec 17 2025',
                    readTime: '4 min read'
                }
            ]
        },
        comparePopular: {
            sectionTitle: 'सर्वाधिक लोकप्रिय तुलनाएँ',
            items: [
                { href: '/hi/compare-construction-equipments/jcb-3dx-vs-tata-hitachi-shinrai', left: { brand: 'जेसीबी', model: '3डीएक्स', priceContains: '₹35.00 Lakh' }, right: { brand: 'टाटा हिटाची', model: 'शिनराई', priceContains: '₹29.00 Lakh' }, ctaText: 'तुलना करे' },
                { href: '/hi/compare-construction-equipments/jcb-2dx-vs-jcb-3dx-plus', left: { brand: 'जेसीबी', model: '2डीएक्स', priceContains: '₹18.00 Lakh' }, right: { brand: 'जेसीबी', model: '3डीएक्स प्लस', priceContains: '₹30.00 Lakh' }, ctaText: 'तुलना करे' },
                { href: '/hi/compare-construction-equipments/jcb-3dx-plus-vs-jcb-3dx-super', left: { brand: 'जेसीबी', model: '3डीएक्स प्लस', priceContains: '₹30.00 Lakh' }, right: { brand: 'जेसीबी', model: '3डीएक्स सुपर', priceContains: '₹34.00 Lakh' }, ctaText: 'तुलना करे' },
                { href: '/hi/compare-construction-equipments/cat-424-b2-vs-jcb-3dx', left: { brand: 'सीएटी', model: '424 बी2', priceContains: '₹34.00 Lakh' }, right: { brand: 'जेसीबी', model: '3डीएक्स', priceContains: '₹35.00 Lakh' }, ctaText: 'तुलना करे' },
                { href: '/hi/compare-construction-equipments/jcb-3dx-vs-jcb-3dx-super', left: { brand: 'जेसीबी', model: '3डीएक्स', priceContains: '₹35.00 Lakh' }, right: { brand: 'जेसीबी', model: '3डीएक्स सुपर', priceContains: '₹34.00 Lakh' }, ctaText: 'तुलना करे' },
                { href: '/hi/compare-construction-equipments/case-770-ex-vs-jcb-3dx', left: { brand: 'केस', model: '770 ईएक्स', priceContains: 'कीमत जल्द ही आ रही है' }, right: { brand: 'जेसीबी', model: '3डीएक्स', priceContains: '₹35.00 Lakh' }, ctaText: 'तुलना करे' }
            ]
        },
        brands: {
            heading: 'ब्रांड के आधार पर निर्माण उपकरण खोजें',
            slugs: ['jcb', 'cat', 'ace', 'bobcat', 'bull', 'case', 'escorts']
        },
        footer: {
            logoAlt: '91Infra',
            logoTitle: '91Infra',
            descriptionText: '91इंफ्रा एक तेजी से बढ़ता डिजिटल प्लेटफॉर्म है जो इंफ्रास्ट्रक्चर और निर्माण उपकरण उद्योग से संबंधित नवीनतम अपडेट और विस्तृत जानकारी प्रदान करता है।',
            sections: {
                about: {
                    title: '91Infra के बारे में',
                    links: [
                        { text: 'हमारे बारे में', href: '/hi/about' },
                        { text: 'संपर्क करें', href: '/hi/contact' },
                        { text: 'गोपनीयता नीति', href: '/hi/privacy-policy' },
                        { text: 'नियम और शर्तें', href: '/hi/terms' }
                    ]
                },
                workWithUs: {
                    title: ' हमारे साथ काम करें',
                    links: [
                        { text: 'हमारे साथ विज्ञापन करें', href: '/hi/advertise' },
                        { text: 'प्रतिक्रिया', href: '/hi/feedback' },
                        { text: 'कैरियर', href: '/hi/careers' }
                    ]
                },
                usefulLinks: {
                    title: 'उपयोगी लिंक',
                    links: [
                        { text: 'निर्माण उपकरण', href: '/hi/construction-equipments' },
                        { text: 'समाचार', href: '/hi/news/category/construction-equipments' }
                    ]
                },
                partners: {
                    title: 'हमारी साझेदार वेबसाइट',
                    links: [
                        { alt: '91trucks.com', logoSrc: '91trucks-logo.png' },
                        { alt: '91tractors.com', logoSrc: '91tractors-logo.webp' }
                    ]
                },
                social: {
                    title: 'हम से जुड़ें',
                    icons: ['facebook', 'insta', 'linkedin', 'youtube']
                }
            }
        },
        seo: {
            title: 'नए निर्माण उपकरण, भारत में नवीनतम वाणिज्यिक वाहन समाचार',
            description: 'निर्माण उपकरण खरीदने की सोच रहे हैं? 91इन्फ्रा आपको एक ही स्थान पर समीक्षा, विशिष्टताओं, ग्राहक रेटिंग के साथ शोध करने में मदद करता है।',
            ogTitle: 'नए निर्माण उपकरण, भारत में नवीनतम वाणिज्यिक वाहन समाचार',
            ogDescription: 'निर्माण उपकरण खरीदने की सोच रहे हैं? 91इन्फ्रा आपको एक ही स्थान पर समीक्षा, विशिष्टताओं, ग्राहक रेटिंग के साथ शोध करने में मदद करता है।',
            ogImage: 'https://images.91infra.com/banner/91infra-masthead-without-logo1440x450png_1716197957.png',
            ogUrl: 'https://www.91infra.com/',
            ogType: 'website',
            twitterTitle: 'नए निर्माण उपकरण, भारत में नवीनतम वाणिज्यिक वाहन समाचार',
            twitterDescription: 'निर्माण उपकरण खरीदने की सोच रहे हैं? 91इन्फ्रा आपको एक ही स्थान पर समीक्षा, विशिष्टताओं, ग्राहक रेटिंग के साथ शोध करने में मदद करता है।',
            twitterImage: 'https://images.91infra.com/banner/91infra-masthead-without-logo1440x450png_1716197957.png',
            twitterCard: 'summary_large_image',
            robots: 'index, follow',
            canonical: '/hi',
            hreflangs: [
                { lang: 'en', href: 'https://www.91infra.com/' },
                { lang: 'hi', href: 'https://www.91infra.com/hi/' },
                { lang: 'x-default', href: 'https://www.91infra.com/' }
            ]
        }
    }
];
