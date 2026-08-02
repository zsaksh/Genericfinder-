package com.outcasters.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.outcasters.core.design.*

@Composable
fun SettingsScreen(modifier: Modifier = Modifier) = Column(modifier.fillMaxSize().padding(22.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
    Text("Settings", style = MaterialTheme.typography.headlineLarge)
    listOf(
        "AI behavior" to "Answer style, response length, explanation depth, clarify questions, offline-only mode",
        "Appearance" to "Calm glass surfaces, typography, and theme",
        "Privacy" to "Local-only data, clear history, clear OCR cache, clear model cache",
        "Performance" to "Thread count, battery saver, warmup, memory mode, streaming mode",
        "OCR" to "Text cleanup, confidence display, edit-before-send",
        "Storage" to "Models, imported PDFs, saved scans, and cache",
        "About" to "Outcasters is a serverless academic AI companion"
    ).forEach { GlassCard(Modifier.fillMaxWidth()) { Text(it.first, style = MaterialTheme.typography.titleMedium); Text(it.second, color = Ink.copy(.65f)) } }
}
