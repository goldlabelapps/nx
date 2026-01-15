
const config = {
    project: "ed-tech",
    description: '',
    url: "https://ed-tech.co",
    icon: `ed-tech/favicon.svg`,
    cartridges: {
        designSystem: {
            allowTheme: false,
            defaultTheme: 'dark',
            themes: {
                dark: {
                    mode: "dark",
                    primary: "#33FF66",
                    secondary: "#33FF66",
                    background: "#000",
                    paper: "#000",
                    border: "#33FF66",
                    text: "#fff",
                },

            },
        }
    },
};

export default config;
