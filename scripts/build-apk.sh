#!/usr/bin/env bash
set -euo pipefail

# Gradle/Kotlin cannot parse Java 25 in this environment before project
# configuration. Prefer a stable LTS JDK for both local and CI builds.
if [[ -n "${JAVA_HOME_21_X64:-}" && -x "${JAVA_HOME_21_X64}/bin/java" ]]; then
  export JAVA_HOME="${JAVA_HOME_21_X64}"
elif [[ -x "$HOME/.local/share/mise/installs/java/21.0.2/bin/java" ]]; then
  export JAVA_HOME="$HOME/.local/share/mise/installs/java/21.0.2"
elif [[ -x "$HOME/.local/share/mise/installs/java/17.0.2/bin/java" ]]; then
  export JAVA_HOME="$HOME/.local/share/mise/installs/java/17.0.2"
fi

if [[ -n "${JAVA_HOME:-}" ]]; then
  export PATH="$JAVA_HOME/bin:$PATH"
fi

echo "Using Java: $(java -version 2>&1 | head -n 1)"
gradle :app:assembleDebug --no-daemon --stacktrace
