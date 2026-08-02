package com.outcasters.domain

enum class ModelState { NotDownloaded, Downloading, Ready, Loading, Failed, Corrupted, LowStorage }
enum class ModelStatus { Ready, Loading, DownloadRequired, OfflineMode }
enum class LearnMode { Concept, Language, Interview }
enum class Role { User, Assistant, System }

data class AiModel(
    val id: String,
    val name: String,
    val repo: String,
    val size: String,
    val ram: String,
    val quantization: String,
    val contextLength: String,
    val state: ModelState,
    val progress: Float = 0f,
    val isActive: Boolean = false
)

data class ChatMessage(val id: String, val role: Role, val text: String, val isStreaming: Boolean = false)
data class RecentWork(val title: String, val subtitle: String)
data class OcrResult(val text: String, val confidence: Float)
data class AppSettings(
    val answerStyle: String = "Tutor",
    val responseLength: String = "Balanced",
    val explanationDepth: String = "Step by step",
    val clarifyAmbiguous: Boolean = true,
    val offlineOnly: Boolean = true,
    val threadCount: Int = 4,
    val batterySaver: Boolean = false,
    val warmup: Boolean = true,
    val memoryMode: String = "Balanced",
    val streaming: Boolean = true
)
