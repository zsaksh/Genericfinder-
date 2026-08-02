package com.outcasters.ui.screens

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.outcasters.core.design.CalmBackground

private enum class Section { Home, Learn, Models, Settings }

@Composable
fun OutcastersAppShell() {
    var section by remember { mutableStateOf(Section.Home) }
    Scaffold(bottomBar = {
        NavigationBar(containerColor = MaterialTheme.colorScheme.surface.copy(.86f)) {
            Section.values().forEach { item ->
                NavigationBarItem(
                    selected = section == item,
                    onClick = { section = item },
                    icon = { Icon(when (item) { Section.Home -> Icons.Outlined.Home; Section.Learn -> Icons.Outlined.School; Section.Models -> Icons.Outlined.Memory; Section.Settings -> Icons.Outlined.Settings }, null) },
                    label = { Text(item.name) }
                )
            }
        }
    }) { padding -> CalmBackground { when (section) { Section.Home -> HomeScreen(Modifier.padding(padding)); Section.Learn -> LearnScreen(Modifier.padding(padding)); Section.Models -> ModelsScreen(Modifier.padding(padding)); Section.Settings -> SettingsScreen(Modifier.padding(padding)) } } }
}
