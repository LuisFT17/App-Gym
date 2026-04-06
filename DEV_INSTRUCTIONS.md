# 🛠️ GymCoach - Instrucciones de Desarrollo

> Reglas y convenciones que **todo asistente de IA** debe seguir en este proyecto.

---

## 🧪 Testing

- Crear tests para cada funcionalidad nueva o cambio realizado.
- Lanzar los tests (`npm test`) al terminar cada cambio para verificar que todo funciona.
- No mergear/pushear sin tests pasando.

---

## 🌿 Git

- No trabajar con ramas. Todo el trabajo se hace directamente en `main`.
- Hacer commit y push al terminar cada cambio.
- Usar mensajes de commit descriptivos y en **inglés** (convención):
  - `feat:` nueva funcionalidad
  - `fix:` corrección de bug
  - `docs:` cambios en documentación
  - `style:` cambios cosméticos (formato, espaciado)
  - `refactor:` reestructuración sin cambiar comportamiento
  - `test:` añadir o modificar tests
  - `chore:` mantenimiento, dependencias, configuración
- Antes de commit, verificar `git status` y `git diff` para revisar cambios.

---

## 📋 Backlog

- `BACKLOG.md` es un backlog real: **solo contiene trabajo pendiente**.
- **No hay** secciones de "completado", "recientemente cerrado" ni historial.
- Cada entrada: título breve + una/dos líneas de descripción. **Sin** detalles de implementación. Incluir definición del coste e impacto.
- Antes de añadir algo, verificar que no esté ya implementado en el código.
- Al completar una tarea: **eliminarla del backlog**. Distribuir la información como se considere oportuno (`HISTORIAL.md`, commits, etc.).
- Tamaño de entrada: puede ser épica, user story o funcionalidad concreta — lo que corresponda.

---

## 🔄 Flujo de Trabajo

1. **Entender la tarea** → Si hay ambigüedad, preguntar antes de actuar.
2. **Planificar** → Para tareas complejas, usar `todo_write` para trackear pasos.
3. **Implementar** → Hacer cambios mínimos y focalizados.
4. **Verificar** → `npm test` + revisar visualmente si aplica.
5. **Documentar** → Eliminar del `BACKLOG.md`. Distribuir info según corresponda.
6. **Commit** → Mensaje descriptivo, push inmediato.

---

## 📁 Estructura del Proyecto

```
App Gym/
├── App Gym.html        # Entry point principal
├── package.json        # Scripts y dependencias
├── BACKLOG.md          # Tablero de trabajo pendiente (VIVO)
├── HISTORIAL.md        # Registro permanente de avances
├── DEV_INSTRUCTIONS.md # Este archivo
├── css/
│   └── styles.css      # Estilos completos
├── js/
│   ├── data.js         # Base de datos de ejercicios y rutinas
│   └── app.js          # Lógica completa de la aplicación
├── img/exercises/      # Imágenes de ejercicios
└── Docs/               # Documentos de referencia
```

---

## 📐 Convenciones de Código

- **Sin dependencias de framework.** Vanilla JS puro, sin React/Vue/Angular.
- **Variables y funciones en camelCase.** Constantes en UPPER_SNAKE_CASE.
- **Sin frameworks de CSS.** CSS puro con variables CSS.
- **Persistencia:** `localStorage` como única base de datos.
- **Idioma del código:** comentarios y UI en español. Nombres de variables en inglés.
- **Un solo archivo de lógica:** `app.js` contiene todo. Si crece demasiado, priorizar separación por funcionalidad.

---

## ⚡ Reglas de Oro

1. **No romper funcionalidad existente.** Si un cambio afecta algo que funciona, avisar antes de aplicar.
2. **Cambios mínimos.** No refactorizar lo que no toca la tarea actual.
3. **Preguntar antes de asumir.** Si hay duda sobre requisitos, consultar.
4. **Verificar antes de entregar.** Tests + revisión visual.
5. **El backlog manda.** Si no está en `BACKLOG.md`, no se prioriza. Si está, se ejecuta.
