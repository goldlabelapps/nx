#!/usr/bin/env bash

set -euo pipefail

IFS=$'\n\t'

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PNPM_VERSION="11.13.0"
DEV_URL="http://localhost:1999/"

log() {
	printf '%s\n' "$*"
}

warn() {
	printf 'Warning: %s\n' "$*" >&2
}

die() {
	printf 'Error: %s\n' "$*" >&2
	exit 1
}

has_command() {
	command -v "$1" >/dev/null 2>&1
}

run_pnpm() {
	if has_command pnpm; then
		pnpm "$@"
		return
	fi

	if has_command corepack; then
		corepack pnpm "$@"
		return
	fi

	die "pnpm or corepack is required. Install Node.js with Corepack enabled first."
}

ensure_pnpm() {
	if has_command corepack; then
		corepack enable >/dev/null 2>&1 || true
		corepack prepare "pnpm@${PNPM_VERSION}" --activate >/dev/null 2>&1 || true
	fi
}

bootstrap() {
	cd "$REPO_ROOT"
	ensure_pnpm
	run_pnpm install
}

run_root_script() {
	cd "$REPO_ROOT"
	run_pnpm "$@"
}

open_url() {
	local url="$1"

	case "${OSTYPE:-}" in
		darwin*)
			open "$url"
			;;
		msys*|cygwin*|win32*)
			if has_command cmd.exe; then
				cmd.exe /c start "" "$url" >/dev/null 2>&1 || true
			elif has_command powershell.exe; then
				powershell.exe -NoProfile -Command "Start-Process '$url'" >/dev/null 2>&1 || true
			else
				warn "No Windows browser opener found. Open $url manually."
			fi
			;;
		linux*)
			if has_command xdg-open; then
				xdg-open "$url"
			else
				warn "No browser opener found. Open $url manually."
			fi
			;;
		*)
			warn "Unsupported platform for automatic browser opening. Open $url manually."
			;;
	esac
}

kill_dev_server() {
	if [[ -x "$REPO_ROOT/shell/kill.sh" ]]; then
		bash "$REPO_ROOT/shell/kill.sh"
	else
		die "shell/kill.sh is missing."
	fi
}

show_status() {
	log "NX° CLI status"
	log "Repository: $REPO_ROOT"
	log "Node: $(node --version 2>/dev/null || echo 'missing')"
	log "Corepack: $(corepack --version 2>/dev/null || echo 'missing')"
	log "pnpm: $(pnpm --version 2>/dev/null || echo 'missing')"
	log "Dev URL: $DEV_URL"
}

show_help() {
	cat <<EOF
NX° bash CLI

Usage:
  bash shell/nx.sh [command]

Commands:
  menu        Interactive menu (default)
  doctor      Show local toolchain status
  bootstrap   Enable Corepack and install dependencies
  dev         Bootstrap, then start the full workspace dev servers
  test        Bootstrap, then run the workspace test suite
  lint        Bootstrap, then run workspace lint
  type-check  Bootstrap, then run workspace type-check
  build       Bootstrap, then build the workspace
  clean       Run the repository clean script
  open        Open the local app URL
  kill        Stop the local dev server on port 1999
  help        Show this message

Examples:
  bash shell/nx.sh
  bash shell/nx.sh bootstrap
  bash shell/nx.sh dev
EOF
}

run_action() {
	local command="$1"
	shift || true

	case "$command" in
		doctor)
			show_status
			;;
		bootstrap|install)
			bootstrap
			;;
		dev)
			bootstrap
			run_root_script dev "$@"
			;;
		test)
			bootstrap
			run_root_script test "$@"
			;;
		lint)
			bootstrap
			run_root_script lint "$@"
			;;
		type-check|typecheck)
			bootstrap
			run_root_script type-check "$@"
			;;
		build)
			bootstrap
			run_root_script build "$@"
			;;
		clean)
			run_root_script clean "$@"
			;;
		open)
			open_url "$DEV_URL"
			;;
		kill)
			kill_dev_server
			;;
		help|-h|--help)
			show_help
			;;
		menu)
			while true; do
				cat <<EOF

NX° workspace menu

  1) Doctor
  2) Bootstrap dependencies
  3) Start dev servers
  4) Run tests
  5) Lint
  6) Type-check
  7) Build
  8) Clean repository
  9) Open local app
 10) Kill local dev server
  0) Quit
EOF

				printf 'Choose an action: '
				read -r choice || exit 0

				case "$choice" in
					1) run_action doctor ;;
					2) run_action bootstrap ;;
					3) run_action dev ;;
					4) run_action test ;;
					5) run_action lint ;;
					6) run_action type-check ;;
					7) run_action build ;;
					8) run_action clean ;;
					9) run_action open ;;
					10) run_action kill ;;
					0) break ;;
					*) warn "Unknown choice: $choice" ;;
				esac
			done
			;;
		*)
			die "Unknown command: $command"
			;;
	esac
}

main() {
	cd "$REPO_ROOT"
	local command="${1:-menu}"
	shift || true
	run_action "$command" "$@"
}

main "$@"