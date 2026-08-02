package com.outcasters.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.DocumentScanner
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.outcasters.core.design.*

@Composable
fun HomeScreen(modifier: Modifier = Modifier) = Column(modifier.fillMaxSize().padding(22.dp), verticalArrangement = Arrangement.spacedBy(18.dp)) {
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        Column { Text("Outcasters", style = MaterialTheme.typography.headlineLarge); Text("Local AI for learning", color = Ink.copy(.62f)) }
        StatusPill("Ready")
    }
    GlassCard(Modifier.fillMaxWidth()) {
        Icon(Icons.Outlined.DocumentScanner, null, tint = Sage)
        Text("Ask or Scan", style = MaterialTheme.typography.headlineSmall)
        Text("Type a doubt, scan a question, import an image, or paste text. Answers stay on your device.", color = Ink.copy(.66f))
        Button(onClick = {}) { Text("Start a question") }
    }
    Text("Quick actions", style = MaterialTheme.typography.titleMedium)
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) { ActionCard("Learn a Concept", "Simple explanations", Modifier.weight(1f)); ActionCard("Practice Language", "Grammar and vocabulary", Modifier.weight(1f)) }
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) { ActionCard("Interview Prep", "Practice and feedback", Modifier.weight(1f)); ActionCard("Open Chat", "Private local tutor", Modifier.weight(1f)) }
    }
    Text("Recent", style = MaterialTheme.typography.titleMedium)
    GlassCard(Modifier.fillMaxWidth()) { Text("No recent work yet"); Text("Your questions, answers, notes, and recently used model appear here.", color = Ink.copy(.6f)) }
    GlassCard(Modifier.fillMaxWidth()) { Text("Learning status"); Text("Current model: Qwen2.5 0.5B • Device ready • Local inference active", color = Ink.copy(.68f)) }
}
