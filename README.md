# Outcasters

Outcasters is a native Android, local-first academic AI companion. It is intentionally serverless: learning data, OCR text, imported documents, conversation history, and GGUF model files are designed to stay on the phone.

## What is included

- Kotlin + Jetpack Compose Android application.
- Material 3 liquid-glass-inspired design system.
- Four primary sections only: Home, Learn, Models, and Settings.
- Ask/scan, chat, OCR preview, concept learning, language practice, interview prep, local model management, and privacy-first settings surfaces.
- Clean backend boundaries for GGUF/llama.cpp inference, OCR cleanup, local retrieval, prompt construction, model catalog, and model switching.
- GitHub Actions workflow that builds and uploads a debug APK artifact.

## Product architecture

The app keeps the experience calm and simple:

1. Home is the launcher for asking, scanning, learning, and continuing recent work.
2. Learn contains Concept, Language, and Interview modes inside one segmented control.
3. Models explains downloaded/imported GGUF files in plain English and makes the active model obvious.
4. Settings groups AI behavior, privacy, performance, OCR, storage, appearance, and about.

## Local AI backend

`InferenceRuntime` is the replaceable runtime boundary for JNI-backed llama.cpp integration. It exposes:

- `initialize(modelId)`
- `generate(messages)` as a Kotlin `Flow<String>` of delta tokens only
- `stop()`
- `switchModel(modelId)`
- `unload()`
- `isReady()`

The scaffold keeps one active model at a time and is structured so a real llama.cpp JNI bridge can replace the current local runtime without changing UI screens.

## Model bundle

The default catalog is phone-friendly:

- Qwen2.5 0.5B as the balanced active model.
- SmolLM2 360M as the weak-device fallback.
- Phi-3.5 Mini as the stronger premium tier.

## Build locally

Use Java 17 or Java 21. Java 25 is not currently supported by the Kotlin/Gradle script tooling used by this project. This repository includes `.mise.toml` so local shells with mise can run Gradle under Java 21 instead of the global Java 25 runtime.

```bash
./scripts/build-apk.sh
```

If you want to call Gradle directly in this container, use mise so Gradle launches on Java 21:

```bash
mise exec -- gradle :app:assembleDebug --no-daemon --stacktrace
```

The APK is created under:

```text
app/build/outputs/apk/debug/
```

## Build on GitHub

The workflow at `.github/workflows/android-apk.yml` installs Temurin Java 21, prepares the Android SDK, installs Gradle 8.10.2, runs `./scripts/build-apk.sh`, and uploads the generated debug APK as the `outcasters-debug-apk` artifact. The default build is network-independent so it works in restricted sandboxes; `app/real-android.build.gradle.kts` preserves the full Android Gradle Plugin configuration for production environments with Google Maven access.
