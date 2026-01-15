export interface NavItem {
    text: string;
    href?: string;
    type: 'link' | 'span';
    subItems?: Array<{ text: string; href: string }>;
}

export interface HeaderData {
    logoHref: string;
    searchPlaceholder: string;
    langText: string;
    navItems: NavItem[];
}

export interface FooterLink {
    text?: string;
    href?: string;
    alt?: string;
    logoSrc?: string;
}

export interface FooterSection {
    title: string;
    links?: FooterLink[];
    icons?: string[];
}

export interface FooterData {
    logoAlt: string;
    logoTitle: string;
    descriptionText: string;
    sections: {
        about: FooterSection;
        workWithUs: FooterSection;
        usefulLinks: FooterSection;
        partners: FooterSection;
        social: FooterSection;
    };
}

export interface CommonData {
    header: HeaderData;
    footer: FooterData;
}

export interface SEOHreflang {
    lang: string;
    href: string;
}

export interface SEOData {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    ogUrl: string;
    ogType: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
    twitterCard: string;
    robots: string;
    canonical: string;
    hreflangs: SEOHreflang[];
}

export interface MastheadData {
    cardTitle: string;
    categoryButtonText: string;
    brandPlaceholder: string;
    searchButtonText: string;
}

export interface EquipmentCard {
    brand: string;
    model: string;
    href: string;
    priceContains: string;
}

export interface NewsArticle {
    href: string;
    titleContains: string;
    excerptContains: string;
    author: string;
    dateContains: string;
    readTime: string;
}

export interface ComparisonItem {
    href: string;
    left: { brand: string; model: string; priceContains: string };
    right: { brand: string; model: string; priceContains: string };
    ctaText: string;
}

export interface HomePageData {
    seo: SEOData;
    masthead: MastheadData;
    popularEquipment: {
        sectionTitle: string;
        tabButtonText: string;
        ctaButtonText: string;
        footerLinkText: string;
        footerLinkHref: string;
        sampleCards: EquipmentCard[];
    };
    latestNews: {
        sectionTitle: string;
        tabButtonText: string;
        footerLinkText: string;
        footerLinkHref: string;
        sampleArticles: NewsArticle[];
    };
    comparePopular: {
        sectionTitle: string;
        items: ComparisonItem[];
    };
    brands: {
        heading: string;
        slugs: string[];
    };
}

export interface LocaleData {
    path: string;
    name: string;
    common: CommonData;
    home?: HomePageData;
}
