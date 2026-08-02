package com.outcasters.backend

import com.outcasters.domain.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import javax.inject.Inject
import javax.inject.Singleton

interface InferenceRuntime {
    suspend fun initialize(modelId: String)
    fun generate(messages: List<ChatMessage>): Flow<String>
    fun stop()
    suspend fun switchModel(modelId: String)
    suspend fun unload()
    fun isReady(): Boolean
}

@Singleton
class LlamaCppRuntime @Inject constructor() : InferenceRuntime {
    private var ready = false
    private var activeModel: String? = null
    override suspend fun initialize(modelId: String) { activeModel = modelId; delay(250); ready = true }
    override fun generate(messages: List<ChatMessage>) = flow {
        check(ready) { "Download and load a local GGUF model first." }
        val prompt = messages.lastOrNull()?.text.orEmpty()
        val tokens = listOf("Let's solve this calmly. ", "I will identify the idea, ", "work step by step, ", "and give a clear final answer.\n\n", "Question: $prompt")
        tokens.forEach { delay(120); emit(it) } // delta-only streaming: never emits accumulated text
    }
    override fun stop() { }
    override suspend fun switchModel(modelId: String) { unload(); initialize(modelId) }
    override suspend fun unload() { ready = false; activeModel = null }
    override fun isReady() = ready && activeModel != null
}

@Singleton
class ModelRepository @Inject constructor() {
    val catalog = listOf(
        AiModel("qwen-0.5b", "Qwen2.5 0.5B", "Qwen/Qwen2.5-0.5B-Instruct-GGUF", "390 MB", "1.2 GB", "Q4_K_M", "32K", ModelState.Ready, isActive = true),
        AiModel("smollm2-360m", "SmolLM2 360M", "HuggingFaceTB/SmolLM2-360M-Instruct-GGUF", "230 MB", "768 MB", "Q4_K_M", "8K", ModelState.NotDownloaded),
        AiModel("phi-3.5-mini", "Phi-3.5 Mini", "bartowski/Phi-3.5-mini-instruct-GGUF", "2.2 GB", "4 GB", "Q4_K_M", "128K", ModelState.NotDownloaded)
    )
}

@Singleton
class OcrPipeline @Inject constructor() {
    fun clean(raw: String): OcrResult {
        val text = raw.lines().map { it.trim() }.filter { it.isNotEmpty() }.joinToString(" ").replace(Regex("\\s+"), " ")
        return OcrResult(text = text, confidence = if (text.length > 12) .92f else .58f)
    }
}

@Singleton
class RetrievalRouter @Inject constructor() {
    fun localContext(query: String): String = "Searches saved scans, notes, imported PDFs, and prior answers locally for: $query"
}
