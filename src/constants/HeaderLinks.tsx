
export const leftLinks: typeOfHeaderItem[] = [
    // {
    //     "title": "Home",
    //     "link": "/"
    // }
];

export const mobileLinks: typeOfHeaderItem[] = [
    {
        "title": "Home",
        "link": "/"
    },
    {
        "title": "About",
        "link": "/about"
    },
    {
        "title": "Privacy Policy",
        "link": "/policy"
    },
    {
        "title": "Terms And Conditions",
        "link": "/terms"
    },

];

export const rightLinks: typeOfHeaderItem[] = [
    {
        "title": "Track Order",
        "link": "/track"
    },
    {
        "title": "About",
        "link": "/about"
    }
];

export type typeOfHeaderItem = {
    title?: string,
    type?: string,
    link?: string,
    links?: { [key: string]: any }[],
    class?: string
};
