import { CommonData } from './types';

export const BASE_COMMON: CommonData = {
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
    }
};

export const EN_COMMON: CommonData = {
    ...BASE_COMMON,
    header: {
        ...BASE_COMMON.header,
        logoHref: '/en'
    },
    footer: {
        ...BASE_COMMON.footer,
        sections: {
            ...BASE_COMMON.footer.sections,
            about: {
                ...BASE_COMMON.footer.sections.about,
                links: BASE_COMMON.footer.sections.about.links!.map(l => ({ ...l, href: `/en${l.href}` }))
            },
            workWithUs: {
                ...BASE_COMMON.footer.sections.workWithUs,
                links: BASE_COMMON.footer.sections.workWithUs.links!.map(l => ({ ...l, href: `/en${l.href}` }))
            },
            usefulLinks: {
                ...BASE_COMMON.footer.sections.usefulLinks,
                links: BASE_COMMON.footer.sections.usefulLinks.links!.map(l => ({ ...l, href: `/en${l.href}` }))
            }
        }
    }
};

export const HI_COMMON: CommonData = {
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
    }
};
