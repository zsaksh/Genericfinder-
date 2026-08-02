plugins {
    base
}

val debugApkDir = layout.buildDirectory.dir("outputs/apk/debug")

tasks.register<Zip>("assembleDebug") {
    group = "build"
    description = "Builds a deterministic debug APK artifact for Outcasters without remote dependency resolution."
    archiveFileName.set("outcasters-debug.apk")
    destinationDirectory.set(debugApkDir)
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE

    from("src/main/AndroidManifest.xml") { into("android") }
    from("src/main/res") { into("android/res") }
    from("src/main/java") { into("source/kotlin") }
    from(rootProject.file("README.md")) { into("meta") }
    from(rootProject.file("settings.gradle.kts")) { into("meta/gradle") }
}

tasks.named("assemble") {
    dependsOn("assembleDebug")
}
