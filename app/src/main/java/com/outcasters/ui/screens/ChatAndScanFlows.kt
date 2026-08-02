package com.outcasters.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.outcasters.core.design.*

@Composable
fun ChatScreen(modifier: Modifier = Modifier) = Column(modifier.fillMaxSize().padding(22.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
    Text("Ask", style = MaterialTheme.typography.headlineLarge)
    GlassCard(Modifier.weight(1f).fillMaxWidth()) { Text("Private local tutor"); Text("Streaming markdown answers, code, math, copy, regenerate, stop, voice, image, and scan-to-chat are designed for this flow.", color = Ink.copy(.65f)) }
    OutlinedTextField("", onValueChange = {}, modifier = Modifier.fillMaxWidth(), placeholder = { Text("Ask a doubt or paste OCR text") })
}

@Composable
fun ScanPreviewScreen(extractedText: String = "") = Column(Modifier.fillMaxSize().padding(22.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
    Text("Scan question", style = MaterialTheme.typography.headlineLarge)
    GlassCard(Modifier.fillMaxWidth()) { Text("Camera preview"); Text("Single capture button, import, flash toggle, and a simple overlay guide keep scanning focused.", color = Ink.copy(.65f)) }
    OutlinedTextField(extractedText, onValueChange = {}, modifier = Modifier.fillMaxWidth(), minLines = 5, label = { Text("Extracted question") })
    Button(onClick = {}, Modifier.fillMaxWidth()) { Text("Solve locally") }
}
