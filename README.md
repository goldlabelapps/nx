# NX

NX is a modern, full-stack web application framework and platform built on [Next.js](https://nextjs.org/) and [React](https://react.dev/). It provides a robust foundation for building scalable, modular, and high-performance web apps, with a focus on developer experience, design systems, and multi-tenant support.

![NextJS](https://goldlabel.pro/shared/png/nextjs.png)

> In this Open Source release of NX, we offer a public repo for NX. Production ready and fully documented it allows a fullstack JavaScript developer to spin up a fully functinoing Firebase powered NX instance within 30 mins

## Techstack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Firebase](https://firebase.google.com/)
- [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/)
- [GSAP](https://greensock.com/gsap/)
- [PWA](https://web.dev/progressive-web-apps/)

## Features

- **Next.js 16**: SSR, SSG, API routes, and advanced routing
- **TypeScript**: Strict typing and modern JavaScript features
- **Material UI (MUI)**: Beautiful, accessible UI components
- **Redux Toolkit**: State management
- **Firebase**: Authentication and backend integration
- **PWA Support**: Offline-ready with service workers
- **Multi-Tenant Architecture**: Easily support multiple brands/clients
- **RESTful API**: Built-in API endpoints ([API Docs](https://goldlabel.pro/api))
- **Design System**: Reusable components and hooks
- **Rich Media Support**: Markdown, images, SVG, PDF, and more

## Quick Start

1. **Clone the repository:**
	```bash
	git clone https://github.com/goldlabelapps/nx
	cd nx
	```
2. **Install dependencies:**
	```bash
	yarn install
	```
3. **Run the development server:**
	```bash
	yarn dev
	```
	The app will be available at [http://localhost:1999](http://localhost:1999)

## API

NX exposes a RESTful API under `/api`. See [app/api/README.md](app/api/README.md) for details and [live API docs](https://goldlabel.pro/api).


## Scripts

- `yarn dev` — Start development server
- `yarn build` — Build for production
- `yarn start` — Start production server
- `yarn lint` — Run ESLint
- `yarn clean` — Clean build artifacts

## Contributing

Contributions are welcome! Please open issues or submit pull requests. 
For major changes, open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Owner

NX is built and maintained by [Goldlabel Apps Ltd](https://company.goldlabel.pro).
