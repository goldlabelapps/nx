/**
 * @type {import("./types").TGoldlabelConfig}
 */
const config = {
    project: "mcuk",
    title: "MCUK",
    description: "Medical Cannabis UK",
    icon: '/svg/favicon.svg',
    image: "/jpg/og.jpg",
    url: "https://nx.goldlabel.pro",
    git: 'https://github.com/goldlabelapps/mcuk',
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
