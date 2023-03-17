import Instagram from 'assets/svg/social/white-instagram.svg';
interface FooterTypes {
    logo?: string,
    text?: string,
    icons?: string[],
    iconLinks?: string[],
    iconsTexts?: string[],
    icon?: string,
    title?: string,
    link?: string
};

export const SocialLinks = {
    // facebook: "https://www.facebook.com/",
    // youtube: "https://www.youtube.com/channel",
    instagram: "https://www.instagram.com/shyptech",
    // twitter: "https://www.twitter.com"
}

export const LandingFooterAbout: Array<FooterTypes> = [{
    title: "hello@shyptech.com",
    link: "mailto:hello@shyptech.com"
}]

export const LandingFooterServices: Array<FooterTypes> = [
    {
        title: "About",
        link: "/about"
    },
    {
        title: "Privacy Policy",
        link: "/policy"
    },
    {
        title: "Terms And Conditions",
        link: "/terms"
    }
];

export const LandingFooterCompany: Array<FooterTypes> = [
    {
        iconsTexts: ["@shyptech"],
        icons: [Instagram],
        iconLinks: [SocialLinks.instagram]
    }
];
