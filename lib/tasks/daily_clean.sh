#!/usr/bin/env bash
set -x

rails_env=$1
curl https://cronitor.link/KuHCa7/run?msg="Daily clean started on: CA-${rails_env}" -m 10 || true

#cd /app || exit
result=$(bundle exec thor clean:addresses)
status_code=$?
addresses=$(echo "${result}" | tail -n1 | cut -c26)

curl https://cronitor.link/KuHCa7/complete?msg="Daily clean completed on: CA-${rails_env}, Status: ${status_code}, Addresses Cleaned: ${addresses}" -m 10 || true
