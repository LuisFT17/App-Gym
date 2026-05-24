# 🏋️ GymCoach - Backlog

> Tablero vivo. Las tareas completadas se eliminan.

---

## 🔴 BUGS PENDIENTES

> ¡Todos los bugs originales están resueltos! 🎉

| # | Tarea | Impacto |
|---|-------|---------|
| — | Sin bugs pendientes | — |

---

##  ÉPICAS PENDIENTES

###  Nutrición Tracker (NUEVA)
> Registro completo de comidas con macros, base de datos de alimentos y contexto nutricional.

- [ ] E67 — Fase 1: Tracker diario básico (añadir comida con kcal, P, C, G)
- [ ] E68 — Fase 1: Resumen del día vs objetivo calórico
- [ ] E69 — Fase 1: Historial de días anteriores
- [ ] E70 — Fase 2: Base de datos de alimentos predefinidos (pollo, arroz, huevos, etc.)
- [ ] E71 — Fase 2: Búsqueda rápida al añadir comida
- [ ] E72 — Fase 2: Porciones personalizables (100g, 150g, etc.)
- [ ] E73 — Fase 3: Tips nutricionales según objetivo
- [ ] E74 — Fase 3: Distribución recomendada de macros a lo largo del día

### 📊 Exportar/Importar Datos
> La librería `xlsx` ya está instalada y se usa para exportar.

- [ ] E1 — Exportar historial de entrenamientos a `.xlsx` ✅ Implementado
- [ ] E2 — Importar rutina desde `Docs/rutina_gym_5_dias.xlsx`
- [ ] E3 — Exportar rutina actual a `.xlsx`
- [ ] E4 — Exportar/importar medidas corporales

### 🖼️ Imágenes de Ejercicios
> 3 imágenes existen en `img/exercises/` pero no se renderizan.

- [ ] E5 — Renderizar imágenes en tarjetas de ejercicio
- [ ] E6 — Añadir campo `icon` a todos los ejercicios en `EXERCISE_DB`
- [ ] E7 — Placeholder cuando no hay imagen disponible

###  AI Coach Mejorado
- [ ] E13 — Mejorar motor de reglas con más keywords y respuestas
- [ ] E14 — Contexto de conversación (historial de chat)
- [ ] E15 — Integración opcional con API de IA externa
- [ ] E16 — Análisis de patrones del historial para recomendaciones

### 📱 PWA & Offline
- [x] E17 — Crear `manifest.json`
- [x] E18 — Implementar Service Worker
- [x] E19 — Cache de assets para offline
- [ ] E20 — Iconos de app (192x192, 512x512)
- [x] E21 — Soporte "Add to Home Screen"

###  Analytics & Progreso
- [ ] E22 — Gráficos de progreso de peso/reps por ejercicio
- [ ] E23 — Gráfico de peso corporal y % grasa
- [ ] E24 — Estadísticas semanales/mensuales (volumen, sesiones)
- [ ] E25 — Racha de entrenamientos consecutivos

### 🔧 Refactorización de Código
- [ ] E26 — Unificar prefijos de keys (`empty_ex` vs `day{N}_ex`)
- [ ] E27 — Extraer constantes mágicas a archivo de config
- [ ] E28 — Separar funciones de render gigantes en componentes
- [ ] E29 — Implementar event delegation (eliminar `onclick` inline)
- [ ] E30 — Eliminar CSS no usado
- [ ] E31 — Documentar funciones públicas del estado

### 🎮 Avatar/Personaje Gamificado (PRIORITARIA)
> Avatar SVG que evoluciona visualmente con el progreso real del gym. Fase 1: grupos musculares que crecen según volumen entrenado.

- [ ] E42 — Sistema de registro de entrada + creación de perfil de usuario
- [ ] E43 — Avatar SVG base con 5-6 grupos musculares escalables
- [ ] E44 — Mapear volumen entrenado por grupo muscular → crecimiento proporcional del avatar
- [ ] E45 — Sistema de niveles basado en métricas reales (workouts, racha, PRs)
- [ ] E46 — Ropa y accesorios desbloqueables por hitos
- [ ] E47 — Persistencia eficiente del estado del avatar (optimizar localStorage)

### 🎨 Estética Pixel Art (REVOLUCIONARIA)
> Rediseño completo de la UI con estética pixel art retro. Todos los elementos visuales, iconos, tipografía y animaciones en estilo pixelado.

- [ ] E53 — Rediseñar toda la UI con estética pixel art (colores, bordes, tipografía, iconos)
- [ ] E54 — Crear sprites pixel art para avatar, iconos de ejercicios y elementos UI
- [ ] E55 — Implementar fuente pixel art (Press Start 2P o similar)
- [ ] E56 — Animaciones pixel art (transiciones, efectos de nivel, notificaciones)
- [ ] E57 — Sistema de misiones diarias con recompensas de XP para el avatar
- [ ] E58 — Ranking semanal con amigos (iniciales, días de la semana con ticks, KG totales, REPS totales)

### 🎨 Sistema de Selección de Estilos (Minimalista / Pixel Art)
> Dos temas visuales coexistiendo sin romper el estilo actual. El usuario elige desde Perfil cuál usar.

- [ ] E59 — Crear selector de estilo en Perfil con formato desplegable en línea (Minimalista / Pixel Art)
- [ ] E60 — Organizar variables CSS en dos temas separados (`--theme-minimal`, `--theme-pixel`)
- [ ] E61 — Guardar preferencia de estilo en `localStorage`
- [ ] E62 — Aplicar tema seleccionado a todos los componentes sin duplicar lógica
- [ ] E63 — Migrar progresivamente componentes al estilo pixel art sin afectar al minimalista
- [ ] E64 — Fuente pixel art (Press Start 2P) solo activa cuando el tema pixel está seleccionado

### 🏅 Sistema de Logros/Badges (Pre-Avatar)
> Gamificación inmediata antes del avatar completo. Badges por hitos de entrenamiento.

- [ ] E48 — Definir catálogo de logros (primer entreno, racha 7 días, PRs, volumen acumulado)
- [ ] E49 — UI de logros desbloqueados y pendientes
- [ ] E50 — Notificaciones toast al desbloquear logro
- [ ] E51 — Persistencia de logros en localStorage

### 📋 Plantillas de Rutinas
- [x] E57 — Añadir 3 plantillas base: Full Body, Upper/Lower, PPL ✅ Implementado
- [ ] E58 — Selector de plantilla al iniciar rutina nueva
- [ ] E59 — Niveles (principiante, intermedio, avanzado) para cada plantilla

###  Backend & Cloud
> Evaluar Supabase/Firebase para auth, DB y llamadas seguras a IA sin exponer API keys.

- [ ] E52 — Evaluar Supabase vs Firebase vs backend propio
- [ ] E53 — Implementar autenticación de usuarios
- [ ] E54 — Migrar localStorage a DB remota con sync offline
- [ ] E55 — Proxy server para llamadas a IA (OpenAI/Groq/Anthropic)
- [ ] E56 — Backup automático de datos del usuario

---

## ✅ IMPLEMENTADO RECIENTEMENTE

- **Tab Misiones** — 4º tab con misiones diarias, XP y ranking semanal
- **Tab Nutrición** — 5º tab con macros calculados y estrategia nutricional
- **Perfil reorganizado** — Entrenamientos + Información (grid 2x2) + secundario
- **Gráfico interactivo** — Duración/Volumen/Series en Perfil > Entrenamientos
- **PRs ampliados** — Detección de récord de reps absolutas (cualquier peso)
- **Medidas corporales** — 17 partes del cuerpo + foto de progreso
- **Ejercicios movidos** — De Inicio a Perfil > Información > Ejercicios
- **Iconos renovados** — Mancuerna para Entrenar, pergamino para Misiones

---

## 💡 SUGERENCIAS

1. **Renombrar `App Gym.html` → `index.html`** — El espacio en el nombre causa problemas de encoding en URLs.
2. **Timer de descanso inteligente** — Auto-ajustar según tipo de serie (warm-up: 60s, normal: 90s, failure: 180s).
3. **Modo "siguiente serie"** — Indicador visual claro de qué serie toca ahora.
4. **Backend opcional (Supabase/Firebase)** — Sincronización entre dispositivos y backup en la nube.
5. **Migrar a framework ligero (Vue/Preact)** — 1,888 líneas en un solo archivo son difíciles de mantener.
