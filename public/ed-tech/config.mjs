/**
 * @type {import("./types").TNXConfig}
 */
const config = {
    project: "ed-tech",
    url: "https://ed-tech.co",
    title: "EdTech",
    description: "",
    icon: '/echopay/favicon.svg',
    favicon: '/ed-tech/favicon.svg',
    cartridges: {
        designSystem: {
            defaultTheme: 'dark',
            themes: {
                dark: {
                    mode: "dark",
                    primary: "#0762e7",
                    secondary: "#022a6a",
                    background: "#000",
                    paper: "#1e1e1eff",
                    text: "#fff",
                    border: "#0762e7",
                },
                light: {
                    mode: "light",
                    primary: "#022a6a",
                    secondary: "#0762e7",
                    background: "#fff",
                    paper: "#f3f3f3ff",
                    border: "#0762e7",
                    text: "#000",
                },

            },
        }
    },
};

export default config;
