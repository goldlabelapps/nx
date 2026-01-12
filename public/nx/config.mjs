/**
 * @type {import("./types").TNXConfig}
 */
const config = {
    project: "default",
    url: "https://nx.goldlabel.pro",
    title: "Default",
    description: "deault",
    icon: `/${process.env.NEXT_PUBLIC_PROJECT || 'default'}/favicon.svg`,
    image: "/jpg/og.jpg",
    cartridges: {
        designSystem: {
            defaultTheme: 'light',
            themes: {
                dark: {
                    mode: "dark",
                    primary: "#888",
                    secondary: "#bbb",
                    background: "#111",
                    paper: "#222",
                    text: "#eee",
                    border: "#444",
                },
                light: {
                    mode: "light",
                    primary: "#444",
                    secondary: "#888",
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
