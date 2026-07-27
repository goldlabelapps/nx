#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$REPO_ROOT"

echo "Stopping workspace kill scripts (if present)..."
pnpm -r --if-present run kill >/dev/null 2>&1 || true

echo "Stopping repo-related Node processes..."
CANDIDATE_PIDS="$(lsof -t +D "$REPO_ROOT" 2>/dev/null | sort -u || true)"

# Build the full ancestor PID chain so we never kill the current clean command.
ANCESTOR_PIDS="$$"
CURRENT_PID="$$"
while true; do
  PARENT_PID="$(ps -p "$CURRENT_PID" -o ppid= 2>/dev/null | tr -d ' ')"
  if [[ -z "$PARENT_PID" || "$PARENT_PID" -le 1 ]]; then
    break
  fi
  ANCESTOR_PIDS="$ANCESTOR_PIDS $PARENT_PID"
  CURRENT_PID="$PARENT_PID"
done

is_ancestor_pid() {
  case " $ANCESTOR_PIDS " in
    *" $1 "*) return 0 ;;
    *) return 1 ;;
  esac
}

for pid in $CANDIDATE_PIDS; do
  [[ -z "$pid" ]] && continue
  is_ancestor_pid "$pid" && continue

  cmd="$(ps -p "$pid" -o command= 2>/dev/null || true)"
  [[ -z "$cmd" ]] && continue

  if [[ "$cmd" =~ (node|next|turbo|jest|tsx|vite|webpack) ]]; then
    kill -TERM "$pid" 2>/dev/null || true
  fi
done

for pid in $CANDIDATE_PIDS; do
  [[ -z "$pid" ]] && continue
  is_ancestor_pid "$pid" && continue

  if ps -p "$pid" >/dev/null 2>&1; then
    cmd="$(ps -p "$pid" -o command= 2>/dev/null || true)"
    if [[ "$cmd" =~ (node|next|turbo|jest|tsx|vite|webpack) ]]; then
      kill -KILL "$pid" 2>/dev/null || true
    fi
  fi
done

echo "Removing ignored build artifacts (preserving .env files)..."
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  CLEAN_EXCLUDES=(
    -e .env
    -e .env.*
    -e '**/.env'
    -e '**/.env.*'
  )

  # Keep an active local virtualenv so clean doesn't fail on in-use files.
  if [[ -n "${VIRTUAL_ENV:-}" && "$VIRTUAL_ENV" == "$REPO_ROOT"/* ]]; then
    REL_VENV="${VIRTUAL_ENV#"$REPO_ROOT"/}"
    CLEAN_EXCLUDES+=( -e "$REL_VENV/" -e "$REL_VENV/**" )
    echo "Preserving active virtualenv at $REL_VENV"
  fi

  if ! git clean -fdX "${CLEAN_EXCLUDES[@]}"; then
    echo "Retrying git clean after transient file-lock issue..."
    git clean -fdX "${CLEAN_EXCLUDES[@]}" || true
  fi

  # Ensure common build/dependency artifacts are removed even if git clean hit locks.
  find "$REPO_ROOT" -type d \( -name node_modules -o -name .turbo -o -name .next \) -prune -exec rm -rf {} +
else
  echo "This command must be run inside a git repository."
  exit 1
fi

echo "Clean complete: repository now matches a fresh clone (except preserved .env files)."
