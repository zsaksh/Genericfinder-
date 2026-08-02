package com.outcasters.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.outcasters.backend.ModelRepository
import com.outcasters.core.design.*

@Composable
fun ModelsScreen(modifier: Modifier = Modifier, repo: ModelRepository = ModelRepository()) = Column(modifier.fillMaxSize().padding(22.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
    Text("Models", style = MaterialTheme.typography.headlineLarge)
    Text("Download once, use locally. Only one model runs at a time. Models stay on your device.", color = Ink.copy(.65f))
    GlassCard(Modifier.fillMaxWidth()) { Text("Active model", style = MaterialTheme.typography.titleMedium); Text(repo.catalog.first { it.isActive }.name); StatusPill("Ready") }
    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) { Button(onClick = {}) { Text("Import GGUF") }; OutlinedButton(onClick = {}) { Text("Hugging Face URL") } }
    repo.catalog.forEach { model -> GlassCard(Modifier.fillMaxWidth()) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text(model.name, style = MaterialTheme.typography.titleMedium); StatusPill(model.state.name) }
        Text(model.repo, color = Ink.copy(.62f)); Text("${model.size} • RAM ${model.ram} • ${model.quantization} • Context ${model.contextLength}", color = Ink.copy(.7f))
        if (model.progress > 0f) LinearProgressIndicator(progress = { model.progress }, Modifier.fillMaxWidth())
    } }
}
