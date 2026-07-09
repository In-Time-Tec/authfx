#!/usr/bin/env bash
set -uo pipefail

staging_url="https://authfx-docs-staging.up.railway.app"
production_url="https://authfx-docs.up.railway.app"
deep_link="/docs/start/quickstart"
failures=0

check() {
  local label="$1" url="$2" expected="$3"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$code" = "$expected" ]; then
    printf 'ok   %s %s -> %s\n' "$label" "$url" "$code"
  else
    printf 'FAIL %s %s -> %s (expected %s)\n' "$label" "$url" "$code" "$expected"
    failures=$((failures + 1))
  fi
}

check "staging root" "$staging_url/" 200
check "staging deep link" "$staging_url$deep_link" 200
check "staging llms" "$staging_url/llms.txt" 200
check "production root" "$production_url/" 200
check "production deep link" "$production_url$deep_link" 200
check "production llms" "$production_url/llms.txt" 200

if [ "$failures" -gt 0 ]; then
  printf 'verify-docs-deploy: %s failures\n' "$failures"
  exit 1
fi

printf 'verify-docs-deploy: all checks passed\n'
