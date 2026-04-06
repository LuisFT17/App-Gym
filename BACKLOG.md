# 🏋️ GymCoach - Backlog

> Tablero vivo. Las tareas completadas se eliminan.

---

## 🔴 BUGS PENDIENTES

| # | Tarea | Impacto |
|---|-------|---------|
| B1 | `openExerciseDetail()` llamada pero no existe — crash al clicar nombre de ejercicio | 🔴 Crash |
| B2 | `resetWorkout` no funciona en modo "entrenamiento vacío" | 🔴 Feature rota |
| B3 | `toggleSet` usa prefijo incorrecto en modo vacío — toast nunca aparece | 🔴 UI rota |
| B4 | `removeExercise` remapeo off-by-one en `completedSets` | 🟠 Datos huérfanos |
| B5 | `addSet`/`removeSet` no soportan modo vacío | 🟠 Feature incompleta |
| B6 | `renderWorkoutSummary` no cuenta PRs en modo vacío | 🟠 Stats mal |

---

## 🚀 ÉPICAS PENDIENTES

### 📊 Exportar/Importar Datos
> La librería `xlsx` ya está instalada pero nunca se usa.

- [ ] E1 — Exportar historial de entrenamientos a `.xlsx`
- [ ] E2 — Importar rutina desde `Docs/rutina_gym_5_dias.xlsx`
- [ ] E3 — Exportar rutina actual a `.xlsx`
- [ ] E4 — Exportar/importar medidas corporales

### 🖼️ Imágenes de Ejercicios
> 3 imágenes existen en `img/exercises/` pero no se renderizan.

- [ ] E5 — Renderizar imágenes en tarjetas de ejercicio
- [ ] E6 — Añadir campo `icon` a todos los ejercicios en `EXERCISE_DB`
- [ ] E7 — Placeholder cuando no hay imagen disponible

### 🎨 Mejoras UI/UX
- [ ] E8 — Implementar feature "Explorar" (browse exercises)
- [ ] E9 — Implementar "Reordenar" ejercicios (drag & drop)
- [ ] E10 — Dark theme real (no solo comentario)
- [ ] E11 — Animaciones de transición entre vistas
- [ ] E12 — Confirmaciones custom (reemplazar `confirm()` nativo)

### 🤖 AI Coach Mejorado
- [ ] E13 — Mejorar motor de reglas con más keywords y respuestas
- [ ] E14 — Contexto de conversación (historial de chat)
- [ ] E15 — Integración opcional con API de IA externa
- [ ] E16 — Análisis de patrones del historial para recomendaciones

### 📱 PWA & Offline
- [ ] E17 — Crear `manifest.json`
- [ ] E18 — Implementar Service Worker
- [ ] E19 — Cache de assets para offline
- [ ] E20 — Iconos de app (192x192, 512x512)
- [ ] E21 — Soporte "Add to Home Screen"

### 📈 Analytics & Progreso
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

---

## 💡 SUGERENCIAS

1. **Renombrar `App Gym.html` → `index.html`** — El espacio en el nombre causa problemas de encoding en URLs.
2. **Timer de descanso inteligente** — Auto-ajustar según tipo de serie (warm-up: 60s, normal: 90s, failure: 180s).
3. **Modo "siguiente serie"** — Indicador visual claro de qué serie toca ahora.
4. **Catálogo de plantillas de rutinas** — No solo una rutina hardcodeada, sino opciones (3 días, PPL, full body, etc.).
5. **Backend opcional (Supabase/Firebase)** — Sincronización entre dispositivos y backup en la nube.
6. **Migrar a framework ligero (Vue/Preact)** — 1,888 líneas en un solo archivo son difíciles de mantener.
