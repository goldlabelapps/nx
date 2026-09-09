"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { LogIn, UserPlus } from "lucide-react";
import { getFirebaseClientAuth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/Button";


export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCreateAccount = searchParams.get("mode") === "signup";
  const redirectTo = useMemo(() => {
    const redirect = searchParams.get("redirect");
    if (!redirect || !redirect.startsWith("/")) return "/account";
    return redirect;
  }, [searchParams]);

  const [user, setUser] = useState<import("firebase/auth").User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const auth = getFirebaseClientAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && !isSubmitting) {
      router.replace(redirectTo);
    }
  }, [user, router, redirectTo, isSubmitting]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const auth = getFirebaseClientAuth();
      const credential = isCreateAccount
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken(true);

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || (isCreateAccount ? "Account creation failed" : "Sign in failed"));
      }

      window.location.href = redirectTo;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : (isCreateAccount ? "Account creation failed" : "Sign in failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
      const auth = getFirebaseClientAuth();
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const idToken = await credential.user.getIdToken(true);

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || "Google sign in failed");
      }

      window.location.href = redirectTo;
    } catch (error) {
      const code = (error as { code?: string })?.code;
      if (code === "auth/unauthorized-domain") {
        setErrorMessage("Domain error: 'localhost' must be added to Authorized Domains in Firebase Console > Authentication > Settings.");
      } else if (code === "auth/operation-not-allowed") {
        setErrorMessage("Provider error: Google sign-in is not enabled in Firebase Console > Authentication > Sign-in method.");
      } else if (code === "auth/popup-closed-by-user") {
        setErrorMessage("Sign in was cancelled (popup closed).");
      } else {
        setErrorMessage(error instanceof Error ? error.message : "Google sign in failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTwitterSignIn = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const { TwitterAuthProvider, signInWithPopup } = await import("firebase/auth");
      const auth = getFirebaseClientAuth();
      const provider = new TwitterAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const idToken = await credential.user.getIdToken(true);

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || "X sign in failed");
      }

      window.location.href = redirectTo;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "X sign in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubSignIn = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const { GithubAuthProvider, signInWithPopup } = await import("firebase/auth");
      const auth = getFirebaseClientAuth();
      const provider = new GithubAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const idToken = await credential.user.getIdToken(true);

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || "GitHub sign in failed");
      }

      window.location.href = redirectTo;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "GitHub sign in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[360px] w-[620px] -translate-x-1/2 rounded-full bg-[#0f172a]/10 blur-3xl dark:bg-[#f8fafc]/10" />

      <div className="relative z-10 w-full max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 md:p-12 dark:border-slate-700 dark:bg-slate-900/85">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 items-start">
          {/* Left Column (1/3 width): Email / Password Form */}
          <div className="w-full text-center md:text-left md:col-span-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none ring-[#0f172a]/20 transition focus:border-[#0f172a] focus:ring-4 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:ring-[#f8fafc]/30 dark:focus:border-[#f8fafc]"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none ring-[#0f172a]/20 transition focus:border-[#0f172a] focus:ring-4 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:ring-[#f8fafc]/30 dark:focus:border-[#f8fafc]"
                />
              </div>

              {errorMessage && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300">
                  {errorMessage}
                </p>
              )}

              <Button type="submit" variant="secondary" className="w-full justify-center gap-2" disabled={isSubmitting}>
                {isCreateAccount ? (
                  <UserPlus className="h-4 w-4 shrink-0" />
                ) : (
                  <LogIn className="h-4 w-4 shrink-0" />
                )}
                <span>
                  {isSubmitting
                    ? (isCreateAccount ? "Creating account..." : "Signing in...")
                    : (isCreateAccount ? "Create account" : "Sign in")}
                </span>
              </Button>
            </form>

            <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
              {isCreateAccount ? "Already have an account? " : "Need an account? "}
              <Link
                href={isCreateAccount ? "/sign-in" : "/sign-in?mode=signup"}
                className="font-semibold text-[#0f172a] underline underline-offset-4 dark:text-[#f8fafc]"
              >
                {isCreateAccount ? "Sign in" : "Create account"}
              </Link>
            </p>
          </div>

          {/* Middle Column (1/3 width): 3rd Party OAuth Providers */}
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left md:col-span-1 md:border-l md:border-slate-200 md:dark:border-slate-700 md:pl-6 lg:pl-8">
            <div className="w-full max-w-sm md:max-w-none space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-center md:justify-start gap-3"
                disabled={isSubmitting}
                onClick={handleGoogleSignIn}
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isCreateAccount ? "Sign up with Google" : "Sign in with Google"}</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full justify-center md:justify-start gap-3"
                disabled={isSubmitting}
                onClick={handleTwitterSignIn}
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>{isCreateAccount ? "Sign up with X" : "Sign in with X"}</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full justify-center md:justify-start gap-3"
                disabled={isSubmitting}
                onClick={handleGithubSignIn}
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>{isCreateAccount ? "Sign up with GitHub" : "Sign in with GitHub"}</span>
              </Button>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
