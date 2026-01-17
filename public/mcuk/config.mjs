// import { } from '../../app/NX/types'


const config = {
    project: "mcuk",
    url: "https://listingslab.com",
    title: "Medical Cannabis UK",
    description: "Medical cannabis dispensed by licensed pharmacies and delivered to your door",
    icon: `/mcuk/favicon.svg`,
    favicon: `/mcuk/favicon.svg`,
    flickr: [
        {
            title: "Adventure monkeys",
            id: "55016604557",
            flickrSlug: "adventure-monkeys",
            src: "https://live.staticflickr.com/65535/55016604557_0c679df5b8_b.jpg"
        },
        {
            id: "55017757554",
            title: "Monkeys at play",
            flickrSlug: "monkeys-at-play",
            src: "https://live.staticflickr.com/65535/55017757554_8d463c2b1a_b.jpg"
        },
        {
            title: "Monkeys at work",
            id: "55017672828",
            flickrSlug: "monkeys-at-work",
            src: "https://live.staticflickr.com/65535/55017672828_1753510293_b.jpg"
        },
        {
            title: "Research",
            id: "55019057384",
            flickrSlug: "research",
            src: "https://live.staticflickr.com/65535/55019057384_01c119be7a_b.jpg"
        },
        {
            title: "Monkey Doctor",
            id: "55021434005",
            flickrSlug: "monkey-doctor",
            src: "https://live.staticflickr.com/65535/55019680500_9d68f883f8_b.jpg"
        },
        {
            title: "Edibles",
            id: "55021434005",
            flickrSlug: "edibles",
            src: "https://live.staticflickr.com/65535/55021434005_3cb12dc491_b.jpg"
        },
        {
            title: "Monkeys flinging poo",
            id: "55016269007",
            flickrSlug: "monkeys-flinging-poo",
            src: "https://live.staticflickr.com/65535/55016269007_092c55e1ba_b.jpg"
        },
    ],
    cartridges: {
        designSystem: {
            defaultTheme: 'light',
            themes: {
                dark: {
                    mode: "dark",
                    primary: "#17A1AC",
                    secondary: "#07c7d5ff",
                    background: "#000",
                    paper: "#1e1e1eff",
                    text: "#fff",
                    border: "#17A1AC",
                },
                light: {
                    mode: "light",
                    primary: "#17A1AC",
                    secondary: "#1b595dff",
                    background: "#fff",
                    paper: "#f3f3f3ff",
                    border: "#17A1AC",
                    text: "#000",
                },

            },
        }
    },
};

export default config;


/*
    {
        id: "",
        title: "",
        flickrSlug: "",
        src: ""
    },
*/