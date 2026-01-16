/**
 * @type {import("./types").TNXConfig}
 */
const config = {
    project: "nx",
    url: "https://nx.goldlabel.pro",
    icon: "/nx/favicon.svg",
    favicon: "/nx/favicon.svg",
    cartridges: {
        uberedux: {},
        designSystem: {
            allowTheme: false,
            defaultTheme: 'light',
            themes: {
                dark: {
                    mode: "dark",
                    primary: "#fab109",
                    secondary: "#eb0909",
                    background: "#111",
                    paper: "#222",
                    text: "#eee",
                    border: "#444",
                },
                light: {
                    mode: "light",
                    primary: "#C05252",
                    secondary: "#C09F52",
                    background: "#fff",
                    paper: "#f3f3f3",
                    border: "#bbb",
                    text: "#111",
                },

            },
        }
    },
};

export default config;
