import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME } from "@goldlabelapps/saas";
import { Suspense } from "react";
import { SignInForm } from "./SignInForm";

function SignInFallback() {
  return (
    <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-slate-700 dark:bg-slate-900/85">
        <div className="h-7 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-3 h-4 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-6 h-24 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      </div>
    </section>
  );
}

export default async function SignInPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (sessionCookie && sessionCookie.value) {
    redirect("/account");
  }

  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInForm />
    </Suspense>
  );
}