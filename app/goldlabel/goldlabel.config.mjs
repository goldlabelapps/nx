// /Users/goldlabel/GitHub/ed-tech/goldlabel/goldlabel.config.mjs

const config = {
    title: "NX",
    description: "GoldLabel NX Application",
    url: "https://nx.goldlabel.pro",
    cartridges: {
        designSystem: {
            defaultTheme: 'system',
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
