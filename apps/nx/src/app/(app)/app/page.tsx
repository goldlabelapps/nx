import { FeaturedImage } from "@goldlabelapps/theme";

export default function AppPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <FeaturedImage slug="nx" height={280} />
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mt-6">Authenticated workspace</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Your app starts here</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        This route is protected by the shared SaaS session boundary. Replace this shell with your product experience and connect the guard to your authentication provider when it is configured.
      </p>
    </section>
  );
}
