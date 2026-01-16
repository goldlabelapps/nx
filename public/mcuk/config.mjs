/**
 * @type {import("./types").TNXConfig}
 */
const config = {
    project: "mcuk",
    url: "https://listingslab.com",
    title: "MCUK",
    description: "Medical Cannabis UK",
    icon: `/mcuk/favicon.svg`,
    favicon: `/mcuk/favicon.svg`,
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
