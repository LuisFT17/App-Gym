# 📜 GymCoach - Historial de Avances

> Registro cronológico de todo lo completado en el proyecto.

---

## 06-abr-2026

### Bug B1 resuelto: Crash en `openExerciseDetail()`
- ✅ Implementada función `openExerciseDetail()` que faltaba
- ✅ Creada vista de detalle de ejercicio con información completa:
  - Músculo principal y secundarios
  - Consejos de técnica
  - Errores comunes
  - Información de progresión
  - Recomendaciones de calentamiento
  - Tiempo de descanso recomendado
- ✅ Integrada en el sistema de navegación con `renderExerciseDetail()`
- ✅ Añadido botón de retroceso para volver al entrenamiento
- ✅ Actualizado BACKLOG.md (B1 eliminado de pendientes)

### Mejoras de navegación en exercise_detail
- ✅ Añadidas propiedades `previousView` y `previousDay` al estado global
- ✅ `openExerciseDetail()` ahora guarda el contexto completo de navegación
- ✅ `navigateBackFromExerciseDetail()` restaura el día y vista correctos
- ✅ Añadido `expandedExerciseId` como fallback robusto para evitar bugs de índice
- ✅ Bugs B7 y B8 añadidos al BACKLOG para seguimiento (reportados por usuario)

### Bug B2 resuelto: `resetWorkout` no funcionaba en modo "entrenamiento vacío"
- ✅ Corregida función `resetWorkout()` para detectar modo vacío
- ✅ Ahora resetea correctamente los sets con prefijo `empty_ex{i}`
- ✅ Limpia también propiedades de estado relacionadas (`expandedExerciseId`, `previousView`, `previousDay`)
- ✅ Actualizado BACKLOG.md (B2 eliminado de pendientes)

### Bug B3 resuelto: `toggleSet` usaba prefijo incorrecto en modo vacío
- ✅ Corregido bucle de conteo en `toggleSet()` para usar `empty_ex{i}` en modo vacío
- ✅ El toast "¡TODOS LOS EJERCICIOS DEL DÍA COMPLETADOS!" ahora aparece correctamente
- ✅ Actualizado BACKLOG.md (B3 eliminado de pendientes)

### Bug B4 resuelto: `removeExercise` remapeo off-by-one en `completedSets`
- ✅ Añadido soporte para modo entrenamiento vacío en `removeExercise()`
- ✅ Re-mapeo correcto de `completedSets` con prefijos `empty_ex{i}` o `day{N}_ex{i}`
- ✅ Eliminación limpia de keys huérfanas después del desplazamiento
- ✅ Actualizado BACKLOG.md (B4 eliminado de pendientes)

### Bug B5 resuelto: `addSet`/`removeSet` no soportaban modo vacío
- ✅ Ambas funciones ahora detectan modo vacío y usan `empty_ex{i}` correctamente
- ✅ Añadida validación de existencia de `exerciseConfig` y `completedSets[setKey]`
- ✅ Actualizado BACKLOG.md (B5 eliminado de pendientes)

### Bug B6 resuelto: `renderWorkoutSummary` no contaba PRs en modo vacío
- ✅ Añadido conteo de PRs en tiempo real en el resumen de entrenamiento
- ✅ Soporte para modo vacío con prefijo `empty_ex{i}`
- ✅ Reemplazado stat "Progreso" por "PRs batidos" con icono 🏅
- ✅ Actualizado BACKLOG.md (B6 eliminado de pendientes)

### Bug B7 resuelto: Consejos/errores en `exercise_detail` mostraban datos incorrectos
- ✅ Implementado sistema de snapshot inmutable (`expandedExerciseListSnapshot`)
- ✅ `renderExerciseDetail` ahora usa el snapshot en lugar de depender de `currentDay`
- ✅ Búsqueda por `exerciseId` directamente, más robusto que por índice
- ✅ Añadida propiedad `expandedExerciseListSnapshot` al estado global
- ✅ Actualizado BACKLOG.md (B7 eliminado de pendientes)

### Bug B8 resuelto: Botón atrás en `exercise_detail` no volvía al día correcto
- ✅ `navigateBackFromExerciseDetail()` ahora restaura vista y día de forma atómica
- ✅ Limpieza completa de propiedades temporales (`expandedExerciseId`, `expandedExerciseListSnapshot`)
- ✅ Cálculo seguro de `targetView` y `targetDay` antes de mutar el estado
- ✅ Actualizado BACKLOG.md (B8 eliminado de pendientes — ¡todos los bugs resueltos! 🎉)

### Selector de ejercicios reorganizado por grupos musculares
- ✅ `renderExerciseListForSelector()` ahora agrupa ejercicios por grupo muscular
- ✅ Headers clicables con animación de despliegue/colapso
- ✅ Flecha ▼ que rota indicando estado (abierto/cerrado)
- ✅ Búsqueda por nombre, grupo muscular o músculos secundarios
- ✅ Sin búsqueda: vista agrupada colapsable; con búsqueda: lista plana filtrada
- ✅ Variable `collapsedGroups` para recordar estado de cada grupo
- ✅ Añadidos +37 ejercicios nuevos a `EXERCISE_DB`

### E39 completada: Vista detalle al clicar ejercicio en el selector
- ✅ `openExerciseDetailFromSelector()` abre la vista de detalle desde el selector
- ✅ Botón "AÑADIR AL ENTRENAMIENTO" aparece en la vista detalle cuando viene del selector
- ✅ `addExerciseFromDetailAndBack()` añade el ejercicio y vuelve al selector
- ✅ Propiedad `exerciseDetailSource` añadida al estado para rastrear origen
- ✅ Icono cambiado de `+` a `›` en el selector para indicar navegación (no acción directa)

### Bug corregido: "ejercicio no encontrado" al abrir detalle desde selector
- ✅ `renderExerciseDetail()` ahora detecta cuando viene del selector y usa `EXERCISE_DB` directamente
- ✅ Eliminada dependencia de `expandedExerciseListSnapshot` cuando viene del selector
- ✅ Todos los ejercicios del selector ahora muestran sus detalles correctamente

### Limpieza de claves duplicadas en EXERCISE_DB
- ✅ Eliminado `face_pull` duplicado (línea 803, se mantenía la definición de línea 438 más completa)
- ✅ Eliminado `elevaciones_laterales_polea` duplicado x2 (líneas 676 y 840, se mantiene `elevacion_lateral_polea` de línea 496)
- ✅ Verificación automática: 0 claves duplicadas restantes en EXERCISE_DB
- ✅ Todos los 31 ejercicios de la ROUTINE existen y tienen estructura completa (name, muscleGroup, tips, commonMistakes)

### Auditoría completa del proyecto
- Análisis exhaustivo de todos los archivos fuente (`App Gym.html`, `css/styles.css`, `js/app.js`, `js/data.js`)
- Identificación de **9 bugs** (3 críticos, 3 medios, 3 bajos)
- Identificación de **8 épicas** con **40 tareas** pendientes
- Nuevas épicas añadidas:
  - **E32-E35** — Detalle completo del historial de entrenamientos (ejercicios, kg, reps, tiempo, PRs)
  - **E36** — Corregir color del body heatmap (blanco sobre fondo blanco no se ve)
- Detección de función `openExerciseDetail()` llamada pero no definida
- Detección de dependencia `xlsx` instalada pero sin uso
- Detección de 3 imágenes sin usar en `img/exercises/`
- Detección de 2 features "coming soon" sin implementar
- Detección de código muerto (`askAddExercise`)

### Creación del sistema de gestión
- Creado `BACKLOG.md` — tablero vivo con tareas pendientes (se actualiza al completar)
- Creado este archivo `HISTORIAL.md` — registro permanente de avances

### Configuración del servidor de desarrollo
- Añadido script `start` en `package.json` con `http-server`
- Puerto 3000 con apertura automática del navegador

### Parche de datos (sesión anterior)
- Inyectados 20 nuevos ejercicios en `EXERCISE_DB` (`patch_data.js`)
- Limpiados emojis del archivo `data.js`

---

## Estado del proyecto a fecha de hoy

| Métrica | Valor |
|---------|-------|
| Bugs identificados | 11 |
| Bugs resueltos | 11 |
| Tareas pendientes | 43 |
| Tareas completadas | 15 |
| Épicas pendientes | 8 |
| Épicas completadas | 0 |

---

> **Cómo se actualiza este archivo:** Cada vez que se complete una tarea o épica del BACKLOG, se elimina del tablero y se registra aquí con la fecha y descripción del cambio.
