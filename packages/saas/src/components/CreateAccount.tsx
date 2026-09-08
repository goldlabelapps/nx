"use client";

import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  type Auth,
} from "firebase/auth";
import { Alert, Field, Heading, Button } from "@goldlabelapps/theme";
import * as React from "react";

export interface CreateAccountProps {
  auth: Auth;
  className?: string;
  onSuccess?: () => void;
}

type SocialProvider = GoogleAuthProvider | TwitterAuthProvider | GithubAuthProvider;

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function CreateAccount({ auth, className, onSuccess }: CreateAccountProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function completeSignUp(signUp: () => Promise<unknown>) {
    setError(null);
    setIsSubmitting(true);

    try {
      await signUp();
      onSuccess?.();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void completeSignUp(() => createUserWithEmailAndPassword(auth, email, password));
  }

  function handleSocialSignUp(provider: SocialProvider) {
    void completeSignUp(() => signInWithPopup(auth, provider));
  }

  return (
    <section className={`w-full max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-xl border border-slate-100 ${className ?? ""}`} aria-labelledby="create-account-heading">
      <div className="mb-8 text-center md:text-left border-b border-slate-100 pb-5">
        <Heading as="h1" variant="h1">
          Create account
        </Heading>
        <p className="text-slate-500 text-sm mt-1">Get started by creating your account or signing up with a provider.</p>
      </div>

      {error ? (
        <div className="mb-6">
          <Alert severity="error">{error}</Alert>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Email Signup Form */}
        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4 order-2 md:order-1">
          <Field
            autoComplete="email"
            disabled={isSubmitting}
            fullWidth
            label="Email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
          <Field
            autoComplete="new-password"
            disabled={isSubmitting}
            fullWidth
            label="Password"
            inputProps={{ minLength: 6 }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account with email"}
          </Button>
        </form>

        {/* 3rd Party Logins */}
        <div className="flex flex-col gap-3.5 justify-center order-1 md:order-2 md:border-l md:border-slate-200 md:pl-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Or continue with</p>
          <Button
            disabled={isSubmitting}
            onClick={() => handleSocialSignUp(new GoogleAuthProvider())}
            variant="outline"
            size="lg"
            className="w-full justify-start gap-3 bg-white hover:bg-slate-50 border-slate-300 text-slate-700"
            type="button"
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={() => handleSocialSignUp(new TwitterAuthProvider())}
            variant="outline"
            size="lg"
            className="w-full justify-start gap-3 bg-white hover:bg-slate-50 border-slate-300 text-slate-700"
            type="button"
          >
            <TwitterIcon />
            <span>Continue with X</span>
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={() => handleSocialSignUp(new GithubAuthProvider())}
            variant="outline"
            size="lg"
            className="w-full justify-start gap-3 bg-white hover:bg-slate-50 border-slate-300 text-slate-700"
            type="button"
          >
            <GithubIcon />
            <span>Continue with GitHub</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CreateAccount;