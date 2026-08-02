package com.outcasters.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.outcasters.core.design.*
import com.outcasters.domain.LearnMode

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LearnScreen(modifier: Modifier = Modifier) {
    var mode by remember { mutableStateOf(LearnMode.Concept) }
    val items = when (mode) {
        LearnMode.Concept -> listOf("Explain simply" to "Understand the core idea", "Step by step" to "Follow the method", "Give example" to "See it in use", "Compare topics" to "Find differences", "Quiz me" to "Check understanding", "Summarize" to "Short notes")
        LearnMode.Language -> listOf("Translate" to "Natural meaning", "Grammar help" to "Fix and learn", "Vocabulary" to "Build word bank", "Pronunciation practice" to "Speak clearly", "Conversation practice" to "Role-play locally")
        LearnMode.Interview -> listOf("Practice questions" to "Topic drills", "Feedback on answer" to "Improve clarity", "Improve my response" to "Stronger wording", "Mock interview" to "Guided session", "Explain weak points" to "Focused plan")
    }
    Column(modifier.fillMaxSize().padding(22.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Learn", style = MaterialTheme.typography.headlineLarge); Text("Concepts, languages, and interviews in one quiet workspace.", color = Ink.copy(.65f))
        SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) { LearnMode.values().forEachIndexed { i, it -> SegmentedButton(selected = mode == it, onClick = { mode = it }, shape = SegmentedButtonDefaults.itemShape(i, 3)) { Text(it.name) } } }
        items.chunked(2).forEach { row -> Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) { row.forEach { ActionCard(it.first, it.second, Modifier.weight(1f)) }; if (row.size == 1) Spacer(Modifier.weight(1f)) } }
    }
}
