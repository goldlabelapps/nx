"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { getFirebaseClientAuth, getFirebaseClientFirestore } from "@/lib/firebase/client";
import { isGod } from "@/lib/auth/godAuth";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/Button";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;
import { Mail, Activity, LogOut, Database } from "lucide-react";
import Image from "next/image";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton,
} from "@mui/material";

function timeAgo(date: Date | string | number | undefined | null): string {
  if (!date) return "N/A";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "N/A";

  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export default function AccountPage() {
  const router = useRouter();
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const { theme } = useTheme();
  const isDark = mounted && theme === "dark";

  const [user, setUser] = useState<User | null>(null);
  const [firestoreUserData, setFirestoreUserData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const currentUid = (firestoreUserData?.uid as string | undefined) || user?.uid;
  const subscriptionLabel = isGod(currentUid) ? "God" : "Member";
  const createdDate = (firestoreUserData?.createdAt as string | undefined) || user?.metadata.creationTime;

  useEffect(() => {
    let unsubscribeAuth: (() => void) | undefined;
    let unsubscribeDoc: (() => void) | undefined;

    const initAuth = async () => {
      try {
        const auth = getFirebaseClientAuth();
        const { onAuthStateChanged } = await import("firebase/auth");
        const { doc, onSnapshot } = await import("firebase/firestore");
        const db = getFirebaseClientFirestore();

        unsubscribeAuth = onAuthStateChanged(auth, (u) => {
          if (unsubscribeDoc) {
            unsubscribeDoc();
            unsubscribeDoc = undefined;
          }

          if (u) {
            setUser(u);
            setIsAuthenticated(true);
            setLoading(false);
            const userDocRef = doc(db, "users", u.uid);
            unsubscribeDoc = onSnapshot(
              userDocRef,
              (snapshot) => {
                if (snapshot.exists()) {
                  setFirestoreUserData(snapshot.data());
                } else {
                  setFirestoreUserData(null);
                }
              },
              (error) => {
                console.error("Error listening to user document in Firestore:", error);
                setFirestoreUserData(null);
              }
            );
          } else {
            setFirestoreUserData(null);
            fetch("/api/auth/session", { cache: "no-store" })
              .then((res) => res.json())
              .then((data: { authenticated?: boolean }) => {
                if (data.authenticated) {
                  setIsAuthenticated(true);
                } else {
                  setIsAuthenticated(false);
                  setUser(null);
                  router.push("/");
                }
              })
              .catch(() => {
                setIsAuthenticated(false);
                setUser(null);
                router.push("/");
              })
              .finally(() => {
                setLoading(false);
              });
          }
        });
      } catch {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, [router]);

  const handleSignOutConfirm = async () => {
    setIsSigningOut(true);
    setConfirmOpen(false);

    try {
      setIsAuthenticated(false);
      setUser(null);
      router.push("/");

      try {
        const { signOut } = await import("firebase/auth");
        const { getFirebaseClientAuth } = await import("@/lib/firebase/client");
        await signOut(getFirebaseClientAuth());
      } catch {
        // ignore client SDK sign-out failures and clear server session anyway
      }

      await fetch("/api/auth/sign-out", {
        method: "POST",
      });

      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  if (loading || isSigningOut) {
    return (
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 pt-28 pb-20 sm:pt-32 sm:pb-24 min-h-[85vh] flex items-center justify-center">
        <div className="text-center text-slate-500 dark:text-slate-400 font-medium">
          {isSigningOut ? "Signing out..." : "Loading account..."}
        </div>
      </section>
    );
  }

  if (!isAuthenticated && !user) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 pt-28 pb-20 sm:pt-32 sm:pb-24 min-h-[85vh]">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Account
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Manage your authenticated identity, preferences, and security details.
        </p>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/85 p-6 sm:p-8 shadow-xl space-y-6">
          {/* User Profile Card Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-5">
              {(firestoreUserData?.photoURL as string | undefined) || user?.photoURL ? (
                <div className="relative h-20 w-20 rounded-full overflow-hidden shadow-md">
                  <Image
                    src={((firestoreUserData?.photoURL as string | undefined) || user?.photoURL)!}
                    alt={
                      (firestoreUserData?.displayName as string | undefined) ||
                      user?.displayName ||
                      "User avatar"
                    }
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-20 w-20 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-2xl">
                  {((firestoreUserData?.displayName as string | undefined) || user?.displayName)
                    ? ((firestoreUserData?.displayName as string | undefined) || user?.displayName)!.charAt(0).toUpperCase()
                    : ((firestoreUserData?.email as string | undefined) || user?.email)
                      ? ((firestoreUserData?.email as string | undefined) || user?.email)!.charAt(0).toUpperCase()
                      : "U"}
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {(firestoreUserData?.displayName as string | undefined) ||
                    (firestoreUserData?.name as string | undefined) ||
                    user?.displayName ||
                    "Authenticated User"}
                </h2>
                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {(firestoreUserData?.email as string | undefined) ||
                      user?.email ||
                      "No email associated"}
                  </span>
                </p>
              </div>
            </div>

            {/* Top-right action area with Access Level pill & Sign-out button */}
            <div className="flex items-center gap-3">
              <span
                className={
                  subscriptionLabel === "God"
                    ? "inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 shadow-xs"
                    : "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs"
                }
              >
                {subscriptionLabel}
              </span>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setConfirmOpen(true)}
                disabled={isSigningOut}
                className="font-semibold gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
              </Button>
            </div>
          </div>



          {/* Account Activity Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Activity
            </div>
            <p className="text-xs font-semibold text-slate-800">
              {createdDate ? `Joined ${timeAgo(createdDate)}` : "Joined N/A"}
            </p>
          </div>

          {/* Firestore User Document Data (Hidden for UI display, preserved for future use) */}
          <div className="hidden p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-indigo-600" />
              Firestore Extended Profile (`users/{user?.uid || "..."}`)
            </div>
            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed shadow-inner">
              {firestoreUserData
                ? JSON.stringify(firestoreUserData, null, 2)
                : user
                ? "// Document users/" + user.uid + " does not exist yet in Firestore"
                : "// Waiting for authentication..."}
            </pre>
          </div>
        </div>
      </div>

      {/* MUI Design System Integrated Confirm Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="sign-out-dialog-title"
        aria-describedby="sign-out-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 1,
            maxWidth: "420px",
            width: "100%",
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            color: isDark ? "#f8fafc" : "#0f172a",
            backgroundImage: "none",
            border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
          },
        }}
      >
        <DialogTitle id="sign-out-dialog-title" sx={{ fontWeight: 700, fontSize: "1.25rem" }}>
          Confirm Sign Out
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="sign-out-dialog-description"
            sx={{ color: isDark ? "#94a3b8" : "text.secondary", fontSize: "0.95rem" }}
          >
            Are you sure you want to sign out of your session? You will need to sign in again to access private account features.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <MuiButton
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              color: isDark ? "#cbd5e1" : "#0f172a",
              borderColor: isDark ? "#475569" : "#cbd5e1",
              backgroundColor: isDark ? "transparent" : "#ffffff",
              "&:hover": {
                borderColor: isDark ? "#64748b" : "#94a3b8",
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.04)",
              },
            }}
          >
            Cancel
          </MuiButton>
          <MuiButton
            onClick={handleSignOutConfirm}
            variant="contained"
            autoFocus
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: isDark ? "#f8fafc" : "#0f172a",
              color: isDark ? "#0f172a" : "#ffffff",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: isDark ? "#e2e8f0" : "#1e293b",
              },
            }}
          >
            Sign out
          </MuiButton>
        </DialogActions>
      </Dialog>
    </section>
  );
}
