"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Settings, LogOut, Check } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton,
  IconButton,
} from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { Prospects } from "@goldlabelapps/prospects";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export interface HeaderActionsMenuProps {
  isAuthenticated?: boolean;
  user?: { photoURL?: string | null; displayName?: string | null; email?: string | null } | null;
  onSignOut?: () => void;
}

/** Settings icon button that opens a dialog for Account Settings, Appearance, and Forget Me reset. */
export function HeaderActionsMenu({ isAuthenticated, user, onSignOut }: HeaderActionsMenuProps) {
  void isAuthenticated;
  void user;
  void onSignOut;
  const [isOpen, setIsOpen] = useState(false);
  const [confirmForgetOpen, setConfirmForgetOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const { theme } = useTheme();

  const isDark = mounted && theme === "dark";

  const handleForgetMeConfirm = async () => {
    setConfirmForgetOpen(false);
    setIsOpen(false);

    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }

    try {
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } catch {
      // ignore
    }

    try {
      const { signOut } = await import("firebase/auth");
      const { getFirebaseClientAuth } = await import("@/lib/firebase/client");
      await signOut(getFirebaseClientAuth());
    } catch {
      // ignore
    }

    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
    } catch {
      // ignore
    }

    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/?reset=true";
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Settings"
        title="Settings"
        className={cn(
          "inline-flex items-center justify-center h-9 w-9 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer",
          isOpen && "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
        )}
      >
        <Settings className="h-4 w-4" aria-hidden="true" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="settings-dialog-title"
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 1,
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            color: isDark ? "#f8fafc" : "#0f172a",
            backgroundImage: "none",
            border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
          },
        }}
      >
        <DialogTitle
          id="settings-dialog-title"
          sx={{
            fontWeight: 700,
            fontSize: "1.25rem",
            display: "flex",
            alignItems: "center",
            pb: 1,
          }}
        >
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            <span>Settings</span>
          </div>
        </DialogTitle>

        <DialogContent sx={{ py: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Appearance Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Appearance
              </h3>
              <ThemeToggle variant="segmented" onChange={() => setIsOpen(false)} />
            </div>

            {/* Public Prospect Section */}
            <div className="md:col-span-2">
              <Prospects showDevOutput={false} />
            </div>

            {/* Sign Out & Clear Data Section (bottom) */}
            <div className="md:col-span-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Sign Out & Clear Data
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Sign out of your session and remove saved preferences and cached data from this device.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmForgetOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out & clear</span>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => setIsOpen(false)}
            size="large"
            aria-label="Done"
            sx={{
              color: isDark ? "#f8fafc" : "#0f172a",
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.06)",
              "&:hover": {
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(15, 23, 42, 0.12)",
              },
            }}
          >
            <Check className="w-6 h-6" />
          </IconButton>
        </DialogActions>
      </Dialog>

      {/* Confirm Reset Dialog */}
      <Dialog
        open={confirmForgetOpen}
        onClose={() => setConfirmForgetOpen(false)}
        aria-labelledby="forget-dialog-title"
        aria-describedby="forget-dialog-description"
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
        <DialogTitle id="forget-dialog-title" sx={{ fontWeight: 700, fontSize: "1.25rem" }}>
          Sign Out & Clear Data?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="forget-dialog-description"
            sx={{ color: isDark ? "#94a3b8" : "text.secondary", fontSize: "0.95rem" }}
          >
            Are you sure you want to sign out and clear your data? This will clear stored preferences, reset cached data, log you out of your session, and start fresh.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <MuiButton
            onClick={() => setConfirmForgetOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              color: isDark ? "#cbd5e1" : "text.primary",
              borderColor: isDark ? "#475569" : "divider",
              backgroundColor: isDark ? "transparent" : "#ffffff",
            }}
          >
            Cancel
          </MuiButton>
          <MuiButton
            onClick={handleForgetMeConfirm}
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
            Sign Out & Clear Data
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

