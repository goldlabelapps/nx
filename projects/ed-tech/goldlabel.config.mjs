// /Users/goldlabel/GitHub/ed-tech/goldlabel/goldlabel.config.mjs

const config = {
  app: "EdTech",
  url: "https://ed-tech.co",
  cartridges: {
    paywall: {
      enabled: true,
    },
    uberedux: {
      persist: false,
    },
    designSystem: {
      defaultMode: 'system', // light || dark || system
      defaultOpen: true,
      themes: {
        dark: {
          mode: "dark",
          primary: "#769825",
          secondary: "#FFCF00",
          background: "#413333",
          paper: "#413333",
          text: "#EEF3FA",
          border: "#BF4113",
        },
        light: {
          mode: "light",
          primary: "#1f1f1f",
          secondary: "#1f1f1f",
          background: "#fff",
          paper: "#eef3fa",
          border: "#FAFFFF",
          text: "#1f1f1f",
        },

      },
    }
  },
};

export default config;
