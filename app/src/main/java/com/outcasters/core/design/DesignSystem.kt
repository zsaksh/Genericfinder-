package com.outcasters.core.design

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val Mist = Color(0xFFF6F4EF)
val Ink = Color(0xFF202622)
val Sage = Color(0xFF6F8278)
val Glass = Color(0xCCFFFFFF)
val Line = Color(0xFFE3E0D8)

@Composable
fun OutcastersTheme(content: @Composable () -> Unit) = MaterialTheme(
    colorScheme = lightColorScheme(primary = Sage, background = Mist, surface = Glass, onSurface = Ink),
    typography = Typography(),
    content = content
)

fun Modifier.glassPanel() = shadow(12.dp, RoundedCornerShape(28.dp), ambientColor = Color.Black.copy(.05f))
    .background(Glass, RoundedCornerShape(28.dp))

@Composable
fun CalmBackground(content: @Composable BoxScope.() -> Unit) = Box(
    Modifier.fillMaxSize().background(Brush.verticalGradient(listOf(Color(0xFFFBFAF6), Color(0xFFEDEFE9))))
) { content() }

@Composable
fun StatusPill(text: String) = Surface(color = Sage.copy(.12f), shape = RoundedCornerShape(50)) {
    Text(text, Modifier.padding(horizontal = 12.dp, vertical = 7.dp), style = MaterialTheme.typography.labelMedium, color = Sage)
}

@Composable
fun GlassCard(modifier: Modifier = Modifier, content: @Composable ColumnScope.() -> Unit) = Column(
    modifier.glassPanel().padding(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp), content = content
)

@Composable
fun ActionCard(title: String, subtitle: String, modifier: Modifier = Modifier) = GlassCard(modifier) {
    Text(title, style = MaterialTheme.typography.titleMedium)
    Text(subtitle, style = MaterialTheme.typography.bodyMedium, color = Ink.copy(.65f))
}
