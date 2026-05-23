// ============================================================
// GymCoach - Lógica Principal de la Aplicación
// ============================================================

// ── Estado Global ──
const state = {
  currentView: 'home',    // 'home' | 'workout'
  currentDay: 0,
  sessionActive: false,
  sessionStartTime: null,
  sessionElapsed: 0,
  sessionInterval: null,
  workoutMinimized: false, // true when user navigates away from an active workout
  expandedExercise: null,
  expandedExerciseId: null, // ID directo del ejercicio para el detalle
  expandedExerciseListSnapshot: null, // Snapshot de la lista de ejercicios al entrar al detalle
  exerciseDetailSource: null, // 'workout' | 'exercise_selector' | 'empty_workout' | 'routine_builder'
  expandedInfo: null,      // Para desplegar la info de tips
  previousView: null,      // Para volver desde exercise_detail
  previousDay: null,       // Para volver al día correcto

  routine: null,           // Modifiable routine plan
  prs: {},                 // { 'peso_muerto': { maxKg: 100, maxRepsAtMax: 5 } }

  completedSets: {},       // { 'day0_ex0': [ {done: true, kg: '100', reps: '10', type: 'normal'}, ... ] }
  activeTab: 'entreno',    // 'inicio' | 'entreno' | 'perfil'
  history: [],
  userProfile: {
    totalWorkouts: 0,
    measures: {},
    measurements: [],
    goals: "gain",
    age: 25,
    weight: 75,
    height: 175,
    joinedDate: new Date().toISOString()
  },

  restTimer: {
    active: false,
    remaining: 0,
    duration: 90,
    interval: null,
    exerciseIndex: null
  },
  exerciseTimers: {},
  exerciseTimerIntervals: {},
  coachingTipIndex: 0,
  tipsOpen: {},
  emptyWorkout: {
    active: false,
    name: 'Entrenamiento Libre',
    exercises: []
  },
  builder: {
    days: [] // [{title: '', exercises: []}]
  },

  // Post-workout summary
  postWorkout: {
    active: false,
    feedback: null,
    notes: '',
    sessionData: null
  }
};

// ── Inicialización ──
document.addEventListener('DOMContentLoaded', () => {
  // Check if localStorage has valid data
  const savedState = localStorage.getItem('gymcoach_state');
  let hasValidData = false;

  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      // Check if routine exists AND has days with exercises
      hasValidData = parsed.routine &&
        Array.isArray(parsed.routine.days) &&
        parsed.routine.days.length > 0 &&
        parsed.routine.days.some(d => d.exercises && d.exercises.length > 0);
    } catch (e) {
      console.error('Error parsing saved state:', e);
    }
  }

  // If no valid data, load fresh default routine
  if (!hasValidData) {
    console.log('No valid saved data, loading default routine');
    state.routine = JSON.parse(JSON.stringify(ROUTINE));
    state.currentDay = 0;
    state.completedSets = {};
    state.history = [];
    // Clear corrupted localStorage
    localStorage.removeItem('gymcoach_state');
  } else {
    loadState();
  }

  if (!state.routine) state.routine = JSON.parse(JSON.stringify(ROUTINE));

  // SVGs globally available
  window.ICON_TRASH = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;
  window.ICON_REPLACE = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`;
  window.ICON_PLATE = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>`;
  window.ICON_X = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
  window.ICON_EXPLORE = `<svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;

  // Register global functions for inline onclick
  window.startSelectedDay = startSelectedDay;
  window.startEmptyWorkout = startEmptyWorkout;
  window.startRoutineBuilder = startRoutineBuilder;
  window.navigateHome = navigateHome;
  window.minimizeWorkout = minimizeWorkout;
  window.resumeWorkout = resumeWorkout;
  window.openHistoryDetail = openHistoryDetail;
  window.closeHistoryDetail = closeHistoryDetail;
  window.openExerciseSelector = openExerciseSelector;
  window.closeExerciseSelector = closeExerciseSelector;
  window.openExerciseDetailFromSelector = openExerciseDetailFromSelector;
  window.addExerciseFromDetailAndBack = addExerciseFromDetailAndBack;
  window.navigateBackFromExerciseDetail = navigateBackFromExerciseDetail;
  window.openExerciseSelectorToReplace = openExerciseSelectorToReplace;
  window.showPlateCalculator = showPlateCalculator;
  window.finishWorkout = finishWorkout;
  window.resetWorkout = resetWorkout;
  window.changeTab = changeTab;
  window.navigateToView = navigateToView;
  window.selectPostWorkoutFeedback = selectPostWorkoutFeedback;
  window.submitPostWorkout = submitPostWorkout;
  window.openExerciseSelectorForBuilder = openExerciseSelectorForBuilder;
  window.navigateBackFromSubview = navigateBackFromSubview;
  window.addBuilderDay = addBuilderDay;
  window.removeBuilderDay = removeBuilderDay;
  window.updateBuilderDayTitle = updateBuilderDayTitle;
  window.updateBuilderExSets = updateBuilderExSets;
  window.removeBuilderEx = removeBuilderEx;
  window.generateAIRoutine = generateAIRoutine;
  window.finalizeRoutineBuilder = finalizeRoutineBuilder;
  window.addSet = addSet;
  window.removeSet = removeSet;
  window.removeExercise = removeExercise;
  window.openExerciseDetail = openExerciseDetail;
  window.updateExerciseNote = updateExerciseNote;
  window.toggleSet = toggleSet;
  window.updateSetType = updateSetType;
  window.updateSetData = updateSetData;
  window.toggleTheme = toggleTheme;
  window.filterExplorarList = filterExplorarList;
  window.openExerciseDetailFromExplorar = openExerciseDetailFromExplorar;
  window.openReorderView = openReorderView;
  window.closeReorderView = closeReorderView;
  window.initReorderDrag = initReorderDrag;
  window.showCustomConfirm = showCustomConfirm;
  window.openRestTimerPicker = openRestTimerPicker;
  window.closeRestTimerPicker = closeRestTimerPicker;

  // Add touch feedback for better mobile UX
  setupTouchFeedback();

  console.log('GymCoach initialized');
  renderApp();
});

// ── Touch Feedback (Mobile UX Enhancement) ──
function setupTouchFeedback() {
  // Add ripple effect on tap for mobile devices
  document.addEventListener('touchstart', function (e) {
    const target = e.target.closest('button, .exercise-card, .home-action-card, .nav-item');
    if (target) {
      target.style.transform = 'scale(0.98)';
      setTimeout(() => {
        target.style.transform = '';
      }, 150);
    }
  }, { passive: true });

  // Prevent double-tap zoom on iOS
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}

// ── Haptic Feedback Simulation ──
function hapticFeedback(type = 'light') {
  // Use navigator.vibrate if available (Android)
  if (navigator.vibrate) {
    if (type === 'light') {
      navigator.vibrate(10);
    } else if (type === 'medium') {
      navigator.vibrate(20);
    } else if (type === 'success') {
      navigator.vibrate([50, 50, 50]);
    }
  }
  // iOS doesn't support navigator.vibrate, but we can use visual feedback
}

// ── Renderizado de la App (controlador de vistas) ──
function renderApp() {
  document.documentElement.setAttribute('data-theme', state.theme || 'light');

  if (state.currentView === 'post_workout') {
    renderHeader();
    renderPostWorkout();
  } else if (state.currentView === 'workout' || state.currentView === 'empty_workout') {
    renderHeader();
    if (state.currentView === 'workout') renderDayTabs();
    renderContent();
    if (typeof setupSessionTimer === 'function') setupSessionTimer();
  } else if (state.currentView === 'routine_builder') {
    renderMainShell();
  } else {
    // Standard views (home/inicio/perfil)
    renderMainShell();
  }
  renderBottomNav();
}

function renderMainShell() {
  const header = document.getElementById('appHeader');
  const main = document.getElementById('mainContent');
  header.innerHTML = `
    <div class="header-top home-header" style="background:#fff; border-bottom:2px solid #000;">
       <div class="app-logo">
          <span class="app-logo-text" style="font-weight:900; letter-spacing:-1px; color:#000;">GYMCOACH</span>
       </div>
    </div>
  `;

  if (state.currentView === 'exercise_selector') {
    renderExerciseSelectorView(main);
    return;
  }

  if (state.currentView === 'reorder_exercises') {
    renderReorderView(main);
    return;
  }

  if (state.currentView === 'history_detail') {
    renderHistoryDetail(main);
    return;
  }

  if (state.activeTab === 'inicio') {
    renderInicio(main);
  } else if (state.activeTab === 'explorar') {
    // Subviews from explorar (exercise_detail, etc.) take priority
    if (state.currentView === 'exercise_detail') renderExerciseDetail(main);
    else renderExplorar(main);
  } else {
    // Subviews common to both Entrenamiento and Perfil
    if (state.currentView === 'exercise_detail') renderExerciseDetail(main);
    else if (state.currentView === 'measures') renderMeasures(main);
    else if (state.currentView === 'calendar') renderCalendar(main);
    else if (state.currentView === 'ai_coach') renderAICoach(main);
    else if (state.currentView === 'routine_builder') renderRoutineBuilder(main);
    else if (state.currentView === 'nutrition') renderNutrition(main);
    else if (state.currentView === 'workout' || state.currentView === 'empty_workout') {
      if (state.currentView === 'workout') renderDayTabs();
      renderContent();
    }
    else {
      if (state.activeTab === 'entreno') renderHome();
      else renderPerfil(main);
    }
  }
}

function renderBottomNav() {
  let nav = document.getElementById('bottomNav');
  if (!nav) {
    nav = document.createElement('nav');
    nav.id = 'bottomNav';
    nav.className = 'bottom-nav';
    document.getElementById('app').appendChild(nav);
  }

  // Show or hide mini-player depending on whether a session is running outside the workout view
  const isInWorkout = (state.currentView === 'workout' || state.currentView === 'empty_workout');
  if (state.sessionActive && !isInWorkout) {
    renderMiniPlayer();
  } else {
    teardownMiniPlayer();
  }

  // SVG Icons for tabs
  const homeIcon = `<svg class="nav-icon-svg" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
  const workoutIcon = `<svg class="nav-icon-svg" viewBox="0 0 24 24"><path d="M6.5 6.5h11M6.5 17.5h11M3 12h1m16 0h1M5.5 6.5v11M18.5 6.5v11"/><rect x="5.5" y="9" width="13" height="6" rx="1"/></svg>`;
  const profileIcon = `<svg class="nav-icon-svg" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

  const hideNav = ['post_workout', 'reorder_exercises'].includes(state.currentView);
  nav.className = hideNav ? 'bottom-nav hidden' : 'bottom-nav';

  nav.innerHTML = `
    <button class="nav-item ${state.activeTab === 'inicio' ? 'active' : ''}" onclick="changeTab('inicio')">
      ${homeIcon}
      <span class="nav-label">Inicio</span>
    </button>
    <button class="nav-item ${state.activeTab === 'entreno' ? 'active' : ''}" onclick="changeTab('entreno')">
      ${workoutIcon}
      <span class="nav-label">Entrenar</span>
    </button>
    <button class="nav-item ${state.activeTab === 'perfil' ? 'active' : ''}" onclick="changeTab('perfil')">
      ${profileIcon}
      <span class="nav-label">Perfil</span>
    </button>
  `;
}

function changeTab(tab) {
  state.activeTab = tab;
  // If a workout is minimized, don't override the view – keep 'home' but don't lose session
  if (!state.workoutMinimized) {
    state.currentView = 'home';
  } else {
    state.currentView = 'home'; // still show home, mini-player will appear
  }
  saveState();
  renderApp();
}

// ── Header Dinámico ──
function renderHeader() {
  const header = document.getElementById('appHeader');

  if (state.currentView === 'home') {
    header.innerHTML = `
      <div class="header-top">
        <div class="app-logo">
          <div class="app-logo-icon" style="background:#000; color:#fff; font-size:12px; font-weight:900; letter-spacing:1px; display:flex; align-items:center; justify-content:center;">GYM</div>
          <span class="app-logo-text" style="text-transform:uppercase; font-weight:900; letter-spacing:-0.5px;">GymCoach</span>
        </div>
      </div>
    `;
    header.classList.add('home-header');
  } else {
    const workoutName = state.currentView === 'empty_workout'
      ? state.emptyWorkout.name
      : (state.routine.days[state.currentDay]?.title || 'Entrenamiento');
    header.innerHTML = `
      <div class="header-top" style="justify-content: space-between; align-items:center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
        <div style="display:flex; align-items:center; gap:8px;">
           <button class="back-btn" style="background:transparent; border:none; color:var(--text-primary); font-size:1.2rem; cursor:pointer;" onclick="minimizeWorkout()">←</button>
           <div style="font-size:0.75rem; font-weight:700; color:var(--text-primary); display:flex; gap:12px; align-items:center;">
             <span id="sessionTimerValue" style="color:var(--text-muted)">${formatTime(state.sessionElapsed)}</span>
             <span><span id="headerTotalSets" style="color:#fff">${getCurrentSessionSets()}</span> <span style="color:var(--text-muted); font-weight:400; font-size:0.65rem; text-transform:uppercase;">Series</span></span>
             <span><span id="headerTotalVolume" style="color:#fff">${getCurrentSessionVolume()}</span> <span style="color:var(--text-muted); font-weight:400; font-size:0.65rem; text-transform:uppercase;">Volumen</span></span>
           </div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
           ${state.currentView === 'empty_workout' ? renderBodyHeatmap({ exercises: state.emptyWorkout.exercises }) : renderBodyHeatmap(state.routine.days[state.currentDay])}
           <button onclick="minimizeWorkout()" style="background:rgba(0,0,0,0.07); border:none; color:var(--text-primary); font-size:0.65rem; font-weight:800; cursor:pointer; padding:6px 10px; border-radius:10px; text-transform:uppercase; letter-spacing:0.3px; white-space:nowrap;">— Min</button>
        </div>
      </div>
    `;
    header.classList.remove('home-header');
  }
}

function getHeatColor(muscleList, day) {
  if (!day) return 'var(--border-subtle)';
  let total = 0; let done = 0;
  day.exercises.forEach((ex, i) => {
    const exDB = EXERCISE_DB[ex.exerciseId];
    if (exDB && muscleList.includes(exDB.muscleGroup)) {
      total += ex.sets;
      const sets = state.completedSets[`day${state.currentDay}_ex${i}`] || [];
      done += sets.filter(s => s && s.done).length;
    }
  });
  if (total === 0) return 'var(--border-subtle)';
  const r = done / total;
  if (r === 0) return 'rgba(255,59,48,0.15)';
  if (r <= 0.3) return 'rgba(255,59,48,0.4)';
  if (r <= 0.7) return 'rgba(255,59,48,0.7)';
  return 'var(--accent-primary)';
}

function renderBodyHeatmap(day) {
  const cPecho = getHeatColor(['pecho'], day);
  const cCore = getHeatColor(['core'], day);
  const cHombro = getHeatColor(['hombro', 'hombro anterior'], day);
  const cBiceps = getHeatColor(['bíceps', 'antebrazo'], day);
  const cQuad = getHeatColor(['cuádriceps', 'piernas', 'aductores'], day);

  const cEspalda = getHeatColor(['espalda', 'trapecio', 'espalda baja'], day);
  const cTriceps = getHeatColor(['tríceps'], day);
  const cGluteo = getHeatColor(['glúteos', 'isquiotibiales'], day);
  const cGemelo = getHeatColor(['gemelos'], day);

  return `
    <div style="display:flex; gap:6px; align-items:center; opacity:0.8;">
      <!-- Front -->
      <svg viewBox="0 0 100 200" width="24" height="48">
        <circle cx="50" cy="20" r="12" fill="#222"/>
        <rect x="32" y="36" width="36" height="25" rx="4" fill="${cPecho}" />
        <rect x="36" y="65" width="28" height="25" rx="3" fill="${cCore}" />
        <rect x="15" y="36" width="13" height="15" rx="4" fill="${cHombro}" />
        <rect x="72" y="36" width="13" height="15" rx="4" fill="${cHombro}" />
        <rect x="13" y="55" width="10" height="35" rx="3" fill="${cBiceps}" />
        <rect x="77" y="55" width="10" height="35" rx="3" fill="${cBiceps}" />
        <rect x="34" y="95" width="14" height="50" rx="4" fill="${cQuad}" />
        <rect x="52" y="95" width="14" height="50" rx="4" fill="${cQuad}" />
      </svg>
      <!-- Back -->
      <svg viewBox="0 0 100 200" width="24" height="48">
        <circle cx="50" cy="20" r="12" fill="#222"/>
        <rect x="32" y="36" width="36" height="54" rx="4" fill="${cEspalda}" />
        <rect x="15" y="36" width="13" height="15" rx="4" fill="#222" />
        <rect x="72" y="36" width="13" height="15" rx="4" fill="#222" />
        <rect x="13" y="55" width="10" height="35" rx="3" fill="${cTriceps}" />
        <rect x="77" y="55" width="10" height="35" rx="3" fill="${cTriceps}" />
        <rect x="34" y="95" width="14" height="30" rx="4" fill="${cGluteo}" />
        <rect x="52" y="95" width="14" height="30" rx="4" fill="${cGluteo}" />
        <rect x="35" y="130" width="12" height="20" rx="3" fill="${cGemelo}" />
        <rect x="53" y="130" width="12" height="20" rx="3" fill="${cGemelo}" />
      </svg>
    </div>
  `;
}

// ── Cálculo de Progreso General ──
function calculateOverallProgress() {
  let totalSetsAll = 0;
  let completedSetsAll = 0;

  state.routine.days.forEach((day, dayIdx) => {
    day.exercises.forEach((ex, exIdx) => {
      totalSetsAll += ex.sets;
      const key = `day${dayIdx}_ex${exIdx}`;
      const sets = state.completedSets[key] || [];
      completedSetsAll += sets.filter(s => s && s.done).length;
    });
  });
  return totalSetsAll > 0 ? Math.round((completedSetsAll / totalSetsAll) * 100) : 0;
}

function renderHome() {
  const mainContent = document.getElementById('mainContent');

  // Quick stats
  const lastWorkout = state.history.length > 0 ? state.history[state.history.length - 1] : null;
  const weekWorkouts = state.history.filter(h => {
    const daysAgo = (Date.now() - new Date(h.date).getTime()) / (1000 * 60 * 60 * 24);
    return daysAgo <= 7;
  }).length;
  const totalVolume = state.history.reduce((acc, h) => acc + (h.volume || 0), 0);

  mainContent.innerHTML = `
    <div class="home-screen">
      <!-- Quick Stats Bar -->
      <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:1px; background:rgba(0,0,0,0.05); margin-bottom:0;">
        <div style="background:var(--bg-card); padding:14px 12px; text-align:center;">
          <div style="font-size:1.3rem; font-weight:800; color:var(--accent-primary);">${weekWorkouts}</div>
          <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; margin-top:2px;">Esta semana</div>
        </div>
        <div style="background:var(--bg-card); padding:14px 12px; text-align:center;">
          <div style="font-size:1.3rem; font-weight:800; color:var(--text-primary);">${state.history.length}</div>
          <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; margin-top:2px;">Total</div>
        </div>
        <div style="background:var(--bg-card); padding:14px 12px; text-align:center;">
          <div style="font-size:1.3rem; font-weight:800; color:var(--text-primary);">${totalVolume >= 1000 ? (totalVolume / 1000).toFixed(1) + 't' : totalVolume + 'kg'}</div>
          <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; margin-top:2px;">Volumen</div>
        </div>
      </div>
      
      ${lastWorkout ? `
        <div style="padding:12px 16px; background:var(--bg-surface); border-bottom:0.5px solid rgba(0,0,0,0.05); display:flex; align-items:center; gap:10px;">
          <div style="font-size:1.2rem;">📊</div>
          <div style="flex:1;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-primary);">Último: ${lastWorkout.name}</div>
            <div style="font-size:0.65rem; color:var(--text-muted);">${new Date(lastWorkout.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })} · ${formatTime(lastWorkout.duration)} · ${lastWorkout.volume >= 1000 ? (lastWorkout.volume / 1000).toFixed(1) + 't' : lastWorkout.volume + 'kg'}</div>
          </div>
        </div>
      ` : ''}

      <!-- Explorar Ejercicios -->
      <button onclick="changeTab('explorar')" style="width:100%; padding:14px 16px; background:var(--bg-card); border:none; cursor:pointer; display:flex; align-items:center; gap:12px; font-family:var(--font-family); text-align:left; transition: background 0.2s;" onmouseover="this.style.background='var(--bg-surface)'" onmouseout="this.style.background='var(--bg-card)'">
        ${ICON_EXPLORE}
        <div style="flex:1;">
          <div style="font-size:0.8rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Explorar Ejercicios</div>
          <div style="font-size:0.65rem; color:var(--text-muted); font-weight:500;">Busca y descubre ejercicios</div>
        </div>
        <span style="color:var(--text-muted); font-size:1.2rem;">›</span>
      </button>

      <!-- Action Buttons -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background:rgba(0,0,0,0.05); margin: 0;">
        <button class="home-action-card" onclick="startEmptyWorkout()" style="flex-direction: column; padding: 18px 12px; text-align: center; gap: 6px; background:var(--bg-card); border-radius:0;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          <div style="font-size: 0.7rem; font-weight:700; text-transform:uppercase;">Vacío</div>
        </button>
        <button class="home-action-card" onclick="startRoutineBuilder()" style="flex-direction: column; padding: 18px 12px; text-align: center; gap: 6px; background:var(--bg-card); border-radius:0;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          <div style="font-size: 0.7rem; font-weight:700; text-transform:uppercase;">Nueva</div>
        </button>
      </div>

      <div class="home-section-header">
        <h2>Mis Rutinas</h2>
        <span class="home-section-count">${state.routine.days.length} planes</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:1px; margin-top:0; background: rgba(0,0,0,0.05);">
        ${state.routine.days.map((day, i) => {
    const totalExercises = day.exercises.length;
    const completedExercises = day.exercises.filter((ex, exIdx) => {
      const key = `day${i}_ex${exIdx}`;
      const sets = state.completedSets[key] || [];
      return sets.length > 0 && sets.every(s => s.done);
    }).length;
    const progress = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

    // If a session is currently active, detect if it's this specific day
    const isActiveDay = state.sessionActive && state.currentDay === i
      && (state.currentView === 'workout' || state.workoutMinimized);
    const sessionIsRunning = state.sessionActive && state.workoutMinimized;

    return `
            <button onclick="${sessionIsRunning ? 'resumeWorkout()' : `startSelectedDay(${i})`}" style="background:var(--bg-card); padding:16px; display:flex; align-items:center; gap:14px; cursor:pointer; border:none; width:100%; font-family:var(--font-family); text-align:left; transition: all 0.2s; -webkit-appearance:none;" onmouseover="this.style.background='var(--bg-surface)'" onmouseout="this.style.background='var(--bg-card)'">
               <div style="width:44px; height:44px; border-radius:var(--radius-sm); background:${isActiveDay ? 'linear-gradient(135deg,#34c759,#30d158)' : 'var(--accent-gradient)'}; display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-size:0.9rem; flex-shrink:0; pointer-events:none;">
                 ${isActiveDay ? '▶' : i + 1}
               </div>
               <div style="flex:1; min-width:0;">
                  <h3 style="font-size:0.95rem; font-weight:700; margin-bottom:4px; color:var(--text-primary); text-transform:uppercase; pointer-events:none;">${day.title}</h3>
                  <p style="font-size:0.7rem; color:${isActiveDay ? '#34c759' : 'var(--text-muted)'}; font-weight:600; pointer-events:none;">${isActiveDay ? '● En curso · ' + formatTime(state.sessionElapsed) : totalExercises + ' ejercicios · ' + progress + '% completado'}</p>
                  <div style="width:100%; height:3px; background:var(--bg-surface); border-radius:2px; margin-top:6px; overflow:hidden; pointer-events:none;">
                    <div style="width:${progress}%; height:100%; background:${isActiveDay ? 'linear-gradient(135deg,#34c759,#30d158)' : 'var(--accent-gradient)'}; border-radius:2px; transition:width 0.3s; pointer-events:none;"></div>
                  </div>
               </div>
               <div style="color:var(--text-muted); font-size:1.2rem; flex-shrink:0; pointer-events:none;">›</div>
            </button>
            <div style="background:var(--bg-card); padding:0 16px 12px; display:flex; gap:8px;">
              ${sessionIsRunning
                ? (isActiveDay
                    ? `<button onclick="resumeWorkout()" style="flex:1; padding:10px; background:linear-gradient(135deg,#34c759,#30d158); color:#fff; border:none; font-weight:700; font-size:0.75rem; cursor:pointer; border-radius:var(--radius-sm); text-transform:uppercase; letter-spacing:0.3px;">▶ Continuar entrenamiento</button>`
                    : `<div class="routine-start-btn-locked">🔒 Entrenamiento en curso</div>`
                  )
                : `<button onclick="startSelectedDay(${i})" style="flex:1; padding:10px; background:var(--accent-gradient); color:#fff; border:none; font-weight:600; font-size:0.75rem; cursor:pointer; border-radius:var(--radius-sm); box-shadow:var(--accent-glow); text-transform:uppercase; letter-spacing:0.3px;">▶ Empezar rutina</button>`
              }
            </div>
          `;
  }).join('')}
      </div>
      </div>
    </div>
  `;
}

// ── Navegación ──
function navigateToWorkout() {
  state.currentView = 'workout';
  state.expandedExercise = null;
  state.expandedInfo = null;

  if (!state.sessionActive) {
    state.sessionElapsed = 0;
    state.sessionStartTime = null;
  }

  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDaySelector() {
  const overlay = document.createElement('div');
  overlay.id = 'daySelectorOverlay';
  overlay.className = 'feedback-overlay';

  const daysList = state.routine.days.map((day, idx) => `
     <div class="home-action-card" onclick="startSelectedDay(${idx})" style="margin-bottom:10px; cursor:pointer; padding:15px; border:1px solid ${state.currentDay === idx ? 'var(--accent-primary)' : 'var(--border-subtle)'}; background:${state.currentDay === idx ? 'rgba(108,99,255,0.05)' : 'var(--bg-card)'};">
        <div class="home-action-icon" style="font-size:1.2rem;">${idx + 1}</div>
        <div class="home-action-info">
          <h3>${day.title}</h3>
          <p>${day.exercises.length} ejercicios</p>
        </div>
        ${state.currentDay === idx ? '<span style="color:var(--accent-primary); font-size:0.7rem; font-weight:700;">SIGUIENTE</span>' : ''}
     </div>
   `).join('');

  overlay.innerHTML = `
     <div class="feedback-modal" style="width:90%; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
           <h3>Elige tu Entrenamiento</h3>
           <button onclick="document.body.removeChild(document.getElementById('daySelectorOverlay'))" style="background:transparent; border:none; color:#fff; font-size:1.5rem;">✕</button>
        </div>
        <div style="display:flex; flex-direction:column; max-height:60vh; overflow-y:auto;">
           ${daysList}
        </div>
     </div>
   `;
  document.body.appendChild(overlay);
}

function startSelectedDay(idx) {
  console.log('startSelectedDay called with idx:', idx);

  // Block starting a new workout if one is already running in background
  if (state.sessionActive && state.workoutMinimized) {
    showToast('⚠️', 'Ya tienes un entrenamiento en curso. Retómalo primero.');
    resumeWorkout();
    return;
  }

  state.currentDay = idx;
  state.currentView = 'workout';
  state.activeTab = 'entreno';
  state.expandedExercise = null;
  state.expandedInfo = null;
  state.postWorkout.active = false;
  state.workoutMinimized = false;
  state._minimizedView = null;
  state.emptyWorkout.active = false; // ensure empty workout flag is clear when starting a routine

  // Start session timer immediately
  if (!state.sessionActive) {
    state.sessionElapsed = 0;
    state.sessionStartTime = Date.now();
    state.sessionActive = true;
  }

  saveState();

  // Close modal if open
  const overlay = document.getElementById('daySelectorOverlay');
  if (overlay) document.body.removeChild(overlay);

  renderApp();

  // Add transition class
  const main = document.getElementById('mainContent');
  if (main) {
    main.classList.add('view-transition-enter');
    setTimeout(() => main.classList.remove('view-transition-enter'), 300);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

let explorarQuery = '';

function renderExplorar(container) {
  container.innerHTML = `
     <div class="home-screen">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; padding: 12px 16px; background: var(--bg-primary); border-bottom: 0.5px solid rgba(0,0,0,0.05);">
          <button onclick="changeTab('entreno')" style="background:transparent; border:none; color:var(--accent-primary); width:44px; height:44px; cursor:pointer; font-weight:700; font-size:1.3rem;">←</button>
          <h2 style="font-size:1rem; font-weight:800; text-transform:uppercase; flex:1;">Explorar Ejercicios</h2>
        </div>
        
        <div style="padding: 0 16px 16px;">
           <input type="text" id="exSearchExplore" placeholder="Buscar ejercicio..." oninput="filterExplorarList(this.value)" value="${explorarQuery}" style="width:100%; padding:12px 16px; margin: 0 0 16px 0; border:0.5px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); outline:none; font-size:0.9rem; font-weight:600; border-radius: var(--radius-sm);">
           
           <div id="explorarList" style="display:flex; flex-direction:column; gap:12px;">
              ${renderExerciseListForExplorar(explorarQuery)}
           </div>
        </div>
        </div>
     </div>
  `;
}

// ── Confirmaciones Custom (Reemplazo de confirm() nativo) ──
function showCustomConfirm(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    
    overlay.innerHTML = `
      <div class="confirm-modal">
        <h3 class="confirm-title">Confirmar</h3>
        <p class="confirm-message">${message}</p>
        <div class="confirm-actions">
          <button class="confirm-btn confirm-btn-cancel" id="confirmBtnCancel">Cancelar</button>
          <button class="confirm-btn confirm-btn-ok" id="confirmBtnOk">Confirmar</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
      overlay.classList.add('show');
    });
    
    const cleanup = (value) => {
      overlay.classList.remove('show');
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        resolve(value);
      }, 250);
    };
    
    overlay.querySelector('#confirmBtnCancel').addEventListener('click', () => cleanup(false));
    overlay.querySelector('#confirmBtnOk').addEventListener('click', () => cleanup(true));
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cleanup(false);
      }
    });
  });
}

// ── Reordenar Ejercicios (Drag & Drop con Pointer Events) ──
function openReorderView() {
  state.previousView = state.currentView;
  state.currentView = 'reorder_exercises';
  saveState();
  renderApp();
}

function closeReorderView() {
  state.currentView = state.previousView || (state.emptyWorkout.active ? 'empty_workout' : 'workout');
  saveState();
  renderApp();
}

function getActiveExercises() {
  const isVacío = state.previousView === 'empty_workout';
  if (isVacío) {
    return state.emptyWorkout.exercises;
  } else {
    return state.routine.days[state.currentDay]?.exercises || [];
  }
}

function setActiveExercises(newExs) {
  const isVacío = state.previousView === 'empty_workout';
  if (isVacío) {
    state.emptyWorkout.exercises = newExs;
  } else {
    if (state.routine.days[state.currentDay]) {
      state.routine.days[state.currentDay].exercises = newExs;
    }
  }
}

function renderReorderView(container) {
  const exercises = getActiveExercises();
  
  const itemsHtml = exercises.map((exConfig, index) => {
    const ex = EXERCISE_DB[exConfig.exerciseId];
    if (!ex) return '';
    const muscleGroup = MUSCLE_GROUPS[ex.muscleGroup] || { color: '#000000', name: ex.muscleGroup, icon: '' };
    return `
      <div class="reorder-item" data-index="${index}" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:16px; display:flex; justify-content:space-between; align-items:center; user-select:none; touch-action:none; cursor:grab;">
        <div style="display:flex; align-items:center; gap:12px; pointer-events:none;">
          <div style="width:4px; height:20px; background:${muscleGroup.color}; border-radius:2px;"></div>
          <div>
            <h4 style="font-size:0.9rem; font-weight:700; margin:0; color:var(--text-primary);">${ex.name}</h4>
            <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">${muscleGroup.name}</span>
          </div>
        </div>
        <div class="reorder-handle" style="color:var(--text-muted); display:flex; align-items:center; justify-content:center; width:36px; height:36px; cursor:grab;" onpointerdown="initReorderDrag(event, ${index})">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/></svg>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="home-screen" style="padding-bottom:80px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; padding: 12px 16px; background:var(--bg-primary); border-bottom:1px solid var(--border-subtle);">
        <h3 style="font-weight:800; text-transform:uppercase; font-size:0.95rem; margin:0;">Reordenar Ejercicios</h3>
        <button onclick="closeReorderView()" style="background:var(--accent-primary); border:none; color:#fff; font-weight:700; font-size:0.8rem; cursor:pointer; padding:8px 16px; border-radius:var(--radius-sm); box-shadow:var(--accent-glow);">Hecho</button>
      </div>
      
      <div style="padding: 0 16px;">
        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:16px; font-weight:500;">Arrastra el icono de las barras ☰ para cambiar el orden de los ejercicios.</p>
        <div id="reorderList" style="display:flex; flex-direction:column; gap:10px; position:relative;">
          ${itemsHtml}
        </div>
      </div>
    </div>
  `;
}

let activeDragItem = null;
let activeDragIndex = null;

function initReorderDrag(e, index) {
  if (e.button !== 0 && e.pointerType === 'mouse') return;
  
  const handle = e.target.closest('.reorder-handle');
  if (!handle) return;

  const row = handle.closest('.reorder-item');
  if (!row) return;

  e.preventDefault();
  activeDragItem = row;
  activeDragIndex = index;
  
  try {
    handle.setPointerCapture(e.pointerId);
  } catch(err) {}
  
  row.classList.add('dragging');
  row.style.cursor = 'grabbing';
  handle.style.cursor = 'grabbing';
  
  handle.addEventListener('pointermove', onReorderMove);
  handle.addEventListener('pointerup', onReorderEnd);
  handle.addEventListener('pointercancel', onReorderEnd);
}

function onReorderMove(e) {
  if (!activeDragItem) return;
  const clientY = e.clientY;
  
  const container = document.getElementById('reorderList');
  if (!container) return;

  const items = [...container.querySelectorAll('.reorder-item')];
  const siblings = items.filter(item => item !== activeDragItem);
  
  const nextSibling = siblings.find(sibling => {
    const rect = sibling.getBoundingClientRect();
    return clientY < rect.top + rect.height / 2;
  });
  
  if (nextSibling) {
    container.insertBefore(activeDragItem, nextSibling);
  } else {
    container.appendChild(activeDragItem);
  }
}

function onReorderEnd(e) {
  if (!activeDragItem) return;
  
  const handle = e.target.closest('.reorder-handle');
  if (handle) {
    try {
      handle.releasePointerCapture(e.pointerId);
    } catch(err) {}
    handle.removeEventListener('pointermove', onReorderMove);
    handle.removeEventListener('pointerup', onReorderEnd);
    handle.removeEventListener('pointercancel', onReorderEnd);
    handle.style.cursor = '';
  }

  activeDragItem.classList.remove('dragging');
  activeDragItem.style.cursor = '';
  
  const container = document.getElementById('reorderList');
  if (container) {
    const items = [...container.querySelectorAll('.reorder-item')];
    const newOrderIndices = items.map(item => parseInt(item.dataset.index));
    const orderChanged = newOrderIndices.some((val, idx) => val !== idx);
    
    if (orderChanged) {
      const exercises = getActiveExercises();
      const reorderedExercises = newOrderIndices.map(idx => exercises[idx]);
      
      const isVacío = state.previousView === 'empty_workout';
      const prefix = isVacío ? 'empty_ex' : `day${state.currentDay}_ex`;
      
      const newCompletedSets = {};
      
      Object.keys(state.completedSets).forEach(key => {
        if (!key.startsWith(prefix)) {
          newCompletedSets[key] = state.completedSets[key];
        }
      });
      
      newOrderIndices.forEach((oldIdx, newIdx) => {
        const oldKey = `${prefix}${oldIdx}`;
        const newKey = `${prefix}${newIdx}`;
        if (state.completedSets[oldKey]) {
          newCompletedSets[newKey] = state.completedSets[oldKey];
        }
      });
      
      state.completedSets = newCompletedSets;
      setActiveExercises(reorderedExercises);
      saveState();
    }
  }
  
  activeDragItem = null;
  activeDragIndex = null;
  
  renderApp();
}


function filterExplorarList(query) {
  explorarQuery = query;
  const container = document.getElementById('explorarList');
  if (container) container.innerHTML = renderExerciseListForExplorar(query);
}

function renderExerciseListForExplorar(query) {
  const q = query.toLowerCase().trim();
  const groups = {};
  
  Object.keys(EXERCISE_DB).forEach(id => {
    const ex = EXERCISE_DB[id];
    if (ex.name.toLowerCase().includes(q) || ex.muscleGroup.toLowerCase().includes(q)) {
      if (!groups[ex.muscleGroup]) groups[ex.muscleGroup] = [];
      groups[ex.muscleGroup].push({ ...ex, id });
    }
  });

  if (Object.keys(groups).length === 0) {
    return `<p style="text-align:center; color:var(--text-muted); padding:40px 0;">No se encontraron ejercicios</p>`;
  }

  return Object.keys(groups).sort().map(mg => {
    const muscleGroup = MUSCLE_GROUPS[mg] || { color: '#000000', name: mg, icon: '' };
    const exercises = groups[mg];
    
    return `
      <div class="explore-group" style="margin-bottom:8px;">
         <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
            <div style="width:4px; height:16px; background:${muscleGroup.color}; border-radius:2px;"></div>
            <h3 style="font-size:0.8rem; font-weight:800; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.5px;">${muscleGroup.name}</h3>
         </div>
         <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            ${exercises.map(ex => `
               <div onclick="openExerciseDetailFromExplorar('${ex.id}')" style="background:var(--bg-card); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); cursor:pointer; display:flex; flex-direction:column; gap:8px; transition: transform 0.2s;" onmousedown="this.style.transform='scale(0.97)'" onmouseup="this.style.transform='scale(1)'" onmouseleave="this.style.transform='scale(1)'">
                  <span style="font-size:0.85rem; font-weight:700; line-height:1.2; min-height:2em;">${ex.name}</span>
                  <div style="display:flex; align-items:center; gap:4px;">
                     <span style="font-size:0.6rem; background:rgba(0,0,0,0.05); color:var(--text-muted); padding:2px 6px; border-radius:4px; font-weight:700; text-transform:uppercase;">${ex.muscleGroup}</span>
                  </div>
               </div>
            `).join('')}
         </div>
      </div>
    `;
  }).join('');
}

function openExerciseDetailFromExplorar(exerciseId) {
  state.previousView = state.currentView;
  state.previousDay = state.currentDay;
  state.expandedExerciseId = exerciseId;
  state.exerciseDetailSource = 'exercise_selector';
  state.currentView = 'exercise_detail';
  saveState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderInicio(container) {
  container.innerHTML = `
    <div class="home-screen">
      <div class="home-section-header">
        <h2>Historial de Entrenamientos</h2>
        <span class="home-section-count">${state.history.length > 0 ? state.history.length + ' sesiones' : 'Sin sesiones'}</span>
      </div>
      
      <div class="history-list" style="margin-top:20px;">
        ${state.history.length === 0 ? `
          <div style="text-align:center; padding:40px; color:var(--text-muted); border:1px solid var(--border-subtle); border-radius:12px;">
             <p>Aún no has terminado ningún entrenamiento.</p>
             <p style="font-size:0.8rem; margin-top:8px;">¡Dale duro hoy! 💪</p>
          </div>
        ` : state.history.map((session, i) => `
          <div class="history-card" onclick="openHistoryDetail(${i})" style="cursor:pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(0.98)'" onmouseout="this.style.transform='none'">
            <div class="history-header">
               <div>
                  <div class="history-date">${new Date(session.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
                  <div style="font-weight:700; margin-top:4px;">${session.name}</div>
               </div>
               <div style="text-align:right;">
                  <div class="history-volume">${session.volume} kg</div>
                  <div style="font-size:0.7rem; color:var(--text-muted);">${formatTime(session.duration)}</div>
               </div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
               <span style="font-size:0.7rem; background:var(--bg-elevated); padding:2px 8px; border-radius:10px;">${session.sets} sets</span>
               ${session.prs > 0 ? `<span style="font-size:0.7rem; background:rgba(255,215,0,0.2); color:var(--pr-color); padding:2px 8px; border-radius:10px; font-weight:700;">🏅 ${session.prs} PRs</span>` : ''}
            </div>
          </div>
        `).reverse().join('')}
      </div>
    </div>
  `;
}

function renderPerfil(container) {
  const totalWeight = state.history.reduce((acc, s) => acc + s.volume, 0);
  const totalHours = Math.round(state.history.reduce((acc, s) => acc + s.duration, 0) / 3600);

  // Datos reales para el gráfico (últimos 7 entrenamientos)
  const last7 = state.history.slice(-7);
  const maxVol = Math.max(...last7.map(s => s.volume), 1000);

  container.innerHTML = `
    <div class="home-screen">
       <div style="text-align:center; padding: 20px 0;">
          <div style="width:80px; height:80px; background:var(--bg-elevated); border-radius:50%; margin:0 auto 15px; display:flex; align-items:center; justify-content:center; font-size:2rem; border:2px solid var(--border-subtle);">👤</div>
          <h2>Usuario Pro</h2>
          <p style="color:var(--text-muted); font-size:0.8rem;">Entrenando desde ${new Date(state.userProfile.joinedDate).toLocaleDateString()}</p>
       </div>

       <div class="profile-stat-grid">
          <div class="stat-box">
             <span class="stat-value">${state.history.length}</span>
             <span class="stat-label">Sesiones</span>
          </div>
          <div class="stat-box">
             <span class="stat-value">${totalHours}h</span>
             <span class="stat-label">Tiempo Total</span>
          </div>
          <div class="stat-box">
             <span class="stat-value">${totalWeight >= 1000 ? (totalWeight / 1000).toFixed(1) + 't' : totalWeight + 'kg'}</span>
             <span class="stat-label">Volumen Acum.</span>
          </div>
          <div class="stat-box">
             <span class        </div>

        <h3 style="margin-top:20px; font-weight:700; font-size:1rem;">Volumen (Últimos 7 días)</h3>
        <div class="bar-chart" style="background:var(--bg-surface); padding:16px; border-radius:var(--radius-md); display:flex; gap:8px; align-items:flex-end; height:120px; margin-top:10px;">
           ${last7.length > 0 ? last7.map(s => `
              <div class="bar-wrap" style="flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; height:100%;">
                 <div class="bar" style="height: ${(s.volume / maxVol) * 100}%; width:100%; background:var(--accent-primary); border-radius:4px 4px 0 0;"></div>
                 <span style="font-size:0.6rem; color:var(--text-muted); font-weight:600;">${new Date(s.date).getDate()}</span>
              </div>
           `).join('') : '<p style="color:var(--text-muted); width:100%; text-align:center; padding:20px; font-size:0.8rem;">Entrena para ver estadísticas</p>'}
        </div>
        
        <h3 style="margin-top:30px; font-weight:700; font-size:1rem;">Ajustes</h3>
        
        <div style="margin-top:10px; display:flex; flex-direction:column; gap:10px;">
           <button class="home-action-card" onclick="toggleTheme()" style="padding:15px; border:1px solid var(--border-subtle); background:var(--bg-card); align-items:center; display:flex; justify-content:space-between; border-radius:var(--radius-md);">
              <div style="display:flex; align-items:center; gap:16px;">
                 <div class="home-action-icon" style="background:var(--bg-elevated); color:var(--text-primary); font-size:1.2rem; border-radius:var(--radius-sm);">🌓</div>
                 <div class="home-action-info"><h3 style="font-size:0.9rem; font-weight:700; text-transform:uppercase;">Modo Oscuro</h3><p style="font-size:0.75rem; color:var(--text-muted);">Cambiar tema visual</p></div>
              </div>
              <div style="color:var(--text-muted); font-size:1.2rem; display:flex; align-items:center;">
                 ${state.theme === 'dark' ? 'Activado' : 'Desactivado'}
              </div>
           </button>
        </div>

        <h3 style="margin-top:30px; font-weight:700; font-size:1rem;">Configuración IA</h3>
        <div style="background:var(--bg-surface); border-radius:var(--radius-md); border:1px solid var(--border-subtle); padding:16px; display:flex; flex-direction:column; gap:12px; margin-top:10px;">
           <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.8rem; font-weight:700; color:var(--text-primary);">EDAD</span>
              <input type="number" value="${state.userProfile.age || 25}" onchange="state.userProfile.age=this.value; saveState();" style="width:60px; background:var(--bg-elevated); border:1px solid var(--border-subtle); color:var(--text-primary); text-align:center; padding:6px; font-weight:700; font-size:0.8rem; border-radius:4px;">
           </div>
           <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.8rem; font-weight:700; color:var(--text-primary);">PESO (KG)</span>
              <input type="number" value="${state.userProfile.weight || 75}" onchange="state.userProfile.weight=this.value; saveState();" style="width:60px; background:var(--bg-elevated); border:1px solid var(--border-subtle); color:var(--text-primary); text-align:center; padding:6px; font-weight:700; font-size:0.8rem; border-radius:4px;">
           </div>
           <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.8rem; font-weight:700; color:var(--text-primary);">ALTURA (CM)</span>
              <input type="number" value="${state.userProfile.height || 175}" onchange="state.userProfile.height=this.value; saveState();" style="width:60px; background:var(--bg-elevated); border:1px solid var(--border-subtle); color:var(--text-primary); text-align:center; padding:6px; font-weight:700; font-size:0.8rem; border-radius:4px;">
           </div>
           <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.8rem; font-weight:700; color:var(--text-primary);">OBJETIVO</span>
              <select onchange="state.userProfile.goals=this.value; saveState();" style="background:var(--bg-elevated); border:1px solid var(--border-subtle); color:var(--text-primary); font-size:0.8rem; font-weight:700; outline:none; padding:6px; border-radius:4px;">
                 <option value="gain" ${state.userProfile.goals === 'gain' ? 'selected' : ''}>GANAR MASA</option>
                 <option value="lose" ${state.userProfile.goals === 'lose' ? 'selected' : ''}>PERDER GRASA</option>
                 <option value="strength" ${state.userProfile.goals === 'strength' ? 'selected' : ''}>FUERZA PURA</option>
              </select>
           </div>
        </div>

        <div style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">
           <button class="home-action-card" onclick="navigateToView('measures')" style="padding:15px; border:1px solid var(--border-subtle); background:var(--bg-card); align-items:center; display:flex; gap:16px; border-radius:var(--radius-md);">
              <div class="home-action-icon" style="background:var(--bg-elevated); color:var(--text-primary); font-size:1.2rem; border-radius:var(--radius-sm);">📏</div>
              <div class="home-action-info"><h3 style="font-size:0.9rem; font-weight:700; text-transform:uppercase;">MIS MEDIDAS</h3><p style="font-size:0.75rem; color:var(--text-muted);">Peso, grasa corporal...</p></div>
           </button>
           
           <button class="home-action-card" onclick="navigateToView('nutrition')" style="padding:15px; border:1px solid var(--border-subtle); background:var(--bg-card); align-items:center; display:flex; gap:16px; border-radius:var(--radius-md);">
              <div class="home-action-icon" style="background:var(--bg-elevated); color:var(--text-primary); font-size:1.2rem; border-radius:var(--radius-sm);">🍎</div>
              <div class="home-action-info"><h3 style="font-size:0.9rem; font-weight:700; text-transform:uppercase;">NUTRICIÓN Y DIETA</h3><p style="font-size:0.75rem; color:var(--text-muted);">Plan alimenticio con IA</p></div>
           </button>
           
           <button class="home-action-card" onclick="navigateToView('calendar')" style="padding:15px; border:1px solid var(--border-subtle); background:var(--bg-card); align-items:center; display:flex; gap:16px; border-radius:var(--radius-md);">
              <div class="home-action-icon" style="background:var(--bg-elevated); color:var(--text-primary); font-size:1.2rem; border-radius:var(--radius-sm);">📅</div>
              <div class="home-action-info"><h3 style="font-size:0.9rem; font-weight:700; text-transform:uppercase;">CALENDARIO</h3><p style="font-size:0.75rem; color:var(--text-muted);">Días de entreno</p></div>
           </button>
        </div>
    </div>
  `;
}

function navigateToView(view) {
  state.currentView = view;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderMeasures(container) {
  container.innerHTML = `
    <div class="home-screen">
       <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
          <button onclick="navigateBackFromSubview()" style="background:#000; border:none; color:#fff; width:36px; height:36px; border-radius:0; cursor:pointer; font-weight:900;">←</button>
          <h2 style="font-size:1.5rem; font-weight:900; text-transform:uppercase;">MIS MEDIDAS</h2>
       </div>

       <div style="background:#fff; border:2px solid #000; padding:16px; margin-bottom:20px; border-radius:0;">
          <h4 style="margin-bottom:12px; font-size:0.8rem; color:#000; font-weight:900; text-transform:uppercase;">REGISTRAR MEDIDA HOY</h4>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
             <div><label style="font-size:0.7rem; color:#000; font-weight:900;">PESO (KG)</label><input id="m_weight" type="number" step="0.1" style="width:100%; background:#f9f9f9; border:1px solid #000; color:#000; padding:6px; font-weight:900;"></div>
             <div><label style="font-size:0.7rem; color:#000; font-weight:900;">GRASA %</label><input id="m_fat" type="number" step="0.1" style="width:100%; background:#f9f9f9; border:1px solid #000; color:#000; padding:6px; font-weight:900;"></div>
             <div><label style="font-size:0.7rem; color:#000; font-weight:900;">PECHO (CM)</label><input id="m_chest" type="number" style="width:100%; background:#f9f9f9; border:1px solid #000; color:#000; padding:6px; font-weight:900;"></div>
             <div><label style="font-size:0.7rem; color:#000; font-weight:900;">CINTURA (CM)</label><input id="m_waist" type="number" style="width:100%; background:#f9f9f9; border:1px solid #000; color:#000; padding:6px; font-weight:900;"></div>
          </div>
          <button onclick="saveNewMeasurement()" style="width:100%; margin-top:15px; background:#ff0000; color:#fff; border:none; padding:12px; font-weight:900; cursor:pointer; font-size:0.9rem;">GUARDAR MEDIDA</button>
       </div>

       <h3 style="font-weight:900; text-transform:uppercase;">HISTORIAL</h3>
       <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
          ${state.userProfile.measurements.length > 0 ? state.userProfile.measurements.slice().reverse().map(m => `
             <div class="history-card" style="padding:12px; background:#f9f9f9; border:1px solid #000; border-radius:0;">
                <div style="font-size:0.7rem; color:#000; font-weight:900; margin-bottom:8px;">${new Date(m.date).toLocaleDateString()}</div>
                <div style="display:flex; gap:15px; font-size:0.85rem; font-weight:900; color:#000;">
                   <span>PESO: ${m.weight}kg</span>
                   <span>GRASA: ${m.fat}%</span>
                   ${m.chest ? `<span>PECHO: ${m.chest}cm</span>` : ''}
                </div>
             </div>
          `).join('') : '<p style="color:#000; text-align:center; padding:20px; font-weight:700;">No hay medidas registradas.</p>'}
       </div>
    </div>
  `;
}

function saveNewMeasurement() {
  const w = document.getElementById('m_weight').value;
  const f = document.getElementById('m_fat').value;
  const c = document.getElementById('m_chest').value;
  const ws = document.getElementById('m_waist').value;
  if (!w) { showToast('⚠️', 'Al menos indica el peso'); return; }

  state.userProfile.measurements.push({
    date: new Date().toISOString(),
    weight: parseFloat(w),
    fat: parseFloat(f) || 0,
    chest: parseFloat(c) || 0,
    waist: parseFloat(ws) || 0
  });

  // Actualizar peso actual en perfil para la IA
  state.userProfile.weight = parseFloat(w);

  saveState();
  showToast('✅', 'Medida guardada');
  renderApp();
}

function renderCalendar(container) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = now.toLocaleString('es-ES', { month: 'long' });

  // Días del mes
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Mapear días entrenados (encontrados en history)
  const trainedDays = state.history
    .filter(s => {
      const d = new Date(s.date);
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .map(s => new Date(s.date).getDate());

  let calendarHtml = '<div style="display:grid; grid-template-columns:repeat(7, 1fr); gap:8px; margin-top:20px;">';
  const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  weekDays.forEach(d => calendarHtml += `<div style="text-align:center; font-size:0.7rem; font-weight:700; color:var(--text-muted);">${d}</div>`);

  // Celdas vacías al inicio
  for (let i = 0; i < firstDay; i++) calendarHtml += '<div></div>';

  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const isTrained = trainedDays.includes(day);
    const isToday = now.getDate() === day;
    calendarHtml += `
       <div style="aspect-ratio:1; display:flex; align-items:center; justify-content:center; border-radius:0; font-size:0.8rem; font-weight:900; 
         ${isTrained ? 'background:#ff0000; color:#fff; border:1px solid #000;' : 'background:#f9f9f9; color:#000; border:1px solid #000;'}
         ${isToday ? 'border:3px solid #000;' : ''}">
         ${day}
       </div>
     `;
  }
  calendarHtml += '</div>';

  container.innerHTML = `
    <div class="home-screen">
       <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
          <button onclick="navigateBackFromSubview()" style="background:#000; border:none; color:#fff; width:36px; height:36px; border-radius:0; cursor:pointer; font-weight:900;">←</button>
          <h2 style="font-size:1.5rem; font-weight:900; text-transform:uppercase;">CALENDARIO</h2>
       </div>
       
       <div style="text-align:center; font-weight:900; font-size:1.2rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">${monthName} ${year}</div>
       <p style="text-align:center; font-size:0.8rem; color:#000; font-weight:900; margin-bottom:20px;">HAS ENTRENADO ${trainedDays.length} DÍAS ESTE MES</p>

       <div style="background:#fff; border:2px solid #000; padding:16px; margin-bottom:20px;">
          ${calendarHtml}
       </div>
       
       <div style="margin-top:30px; background:#f9f9f9; padding:16px; border-radius:0; border:2px solid #000;">
          <h4 style="font-size:0.8rem; font-weight:900; margin-bottom:10px; text-transform:uppercase; color:#000;">REFERENCIA</h4>
          <div style="display:flex; gap:15px; font-size:0.7rem;">
             <div style="display:flex; align-items:center; gap:6px;"><div style="width:12px; height:12px; border-radius:0; background:#ff0000; border:1px solid #000;"></div> ENTRENADO</div>
             <div style="display:flex; align-items:center; gap:6px;"><div style="width:12px; height:12px; border-radius:0; background:#f9f9f9; border:1px solid #000;"></div> NO ENTRENADO</div>
          </div>
       </div>
    </div>
  `;
}

function navigateBackFromSubview() {
  state.currentView = 'home';
  renderApp();
}

// ── History Detail View ──
window.openHistoryDetail = function(idx) {
  state.selectedHistoryIdx = idx;
  state.currentView = 'history_detail';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.closeHistoryDetail = function() {
  state.currentView = 'home';
  state.activeTab = 'inicio';
  renderApp();
};

function renderHistoryDetail(container) {
  const session = state.history[state.selectedHistoryIdx];
  if (!session) { closeHistoryDetail(); return; }

  const feedbackEmoji = {
    'facil': '🥱 Fácil',
    'normal': '👍 Normal',
    'intenso': '🔥 Intenso',
    'mortal': '💀 Mortal'
  }[session.feedback] || 'Sin especificar';

  const exercisesHtml = (session.exercisesList && session.exercisesList.length > 0)
    ? session.exercisesList.map((ex, idx) => `
      <div style="background:var(--bg-card); border:0.5px solid var(--border-subtle); border-radius:var(--radius-md); padding:16px; margin-bottom:12px;">
        <h4 style="font-size:0.9rem; font-weight:800; margin-bottom:12px; color:var(--text-primary); text-transform:uppercase;">${ex.name}</h4>
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div style="display:grid; grid-template-columns: 40px 1fr 1fr 50px; font-size:0.65rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; margin-bottom:4px; padding:0 4px;">
            <div style="text-align:center;">TIPO</div>
            <div style="text-align:center;">KG</div>
            <div style="text-align:center;">REPS</div>
            <div style="text-align:center;">PR</div>
          </div>
          ${ex.sets.map(s => `
            <div style="display:grid; grid-template-columns: 40px 1fr 1fr 50px; align-items:center; background:var(--bg-surface); padding:8px 4px; border-radius:var(--radius-sm); font-size:0.85rem; font-weight:700;">
              <div style="text-align:center; font-size:1.1rem;">${SET_TYPES[s.type]?.icon || '1'}</div>
              <div style="text-align:center;">${s.kg || '-'}</div>
              <div style="text-align:center;">${s.reps || '-'}</div>
              <div style="text-align:center;">${s.isPR ? '🏅' : ''}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')
    : `<div style="text-align:center; padding:30px; background:var(--bg-card); border:1px dashed var(--border-subtle); border-radius:var(--radius-md); color:var(--text-muted); font-weight:600; font-size:0.8rem;">No hay detalles de ejercicios guardados para esta sesión (sesión antigua).</div>`;

  container.innerHTML = `
    <div class="home-screen">
       <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px; padding:12px 16px; background:var(--bg-primary); border-bottom:0.5px solid rgba(0,0,0,0.05);">
          <button onclick="closeHistoryDetail()" style="background:transparent; border:none; color:var(--text-primary); font-size:1.5rem; font-weight:900; cursor:pointer;">←</button>
          <h2 style="font-size:1rem; font-weight:900; text-transform:uppercase;">Detalle de Sesión</h2>
       </div>

       <div style="padding:0 16px;">
          <!-- Resumen cabecera -->
          <div style="background:var(--bg-surface); border-radius:var(--radius-md); padding:20px; text-align:center; margin-bottom:20px;">
             <h3 style="font-size:1.2rem; font-weight:900; color:var(--text-primary); margin-bottom:4px;">${session.name}</h3>
             <p style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">${new Date(session.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}</p>
          </div>

          <!-- Stats -->
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:20px;">
             <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-md); text-align:center;">
                <div style="font-size:1.3rem; font-weight:800; color:var(--text-primary);">${formatTime(session.duration)}</div>
                <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; margin-top:4px; font-weight:700;">Duración</div>
             </div>
             <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-md); text-align:center;">
                <div style="font-size:1.3rem; font-weight:800; color:var(--text-primary);">${session.volume >= 1000 ? (session.volume / 1000).toFixed(1) + 't' : session.volume + 'kg'}</div>
                <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; margin-top:4px; font-weight:700;">Volumen</div>
             </div>
             <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-md); text-align:center;">
                <div style="font-size:1.3rem; font-weight:800; color:var(--text-primary);">${session.sets}</div>
                <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; margin-top:4px; font-weight:700;">Series Totales</div>
             </div>
             <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-md); text-align:center;">
                <div style="font-size:1.3rem; font-weight:800; color:var(--pr-color);">${session.prs > 0 ? '🏅 ' + session.prs : '0'}</div>
                <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; margin-top:4px; font-weight:700;">Nuevos PRs</div>
             </div>
          </div>

          ${session.notes || session.feedback ? `
          <div style="background:var(--bg-surface); border-radius:var(--radius-md); padding:16px; margin-bottom:20px;">
             <div style="font-size:0.7rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; margin-bottom:8px;">Sensaciones & Notas</div>
             ${session.feedback ? `<div style="font-size:0.85rem; font-weight:700; color:var(--text-primary); margin-bottom:8px;">Estado: ${feedbackEmoji}</div>` : ''}
             ${session.notes ? `<div style="font-size:0.85rem; color:var(--text-secondary); font-style:italic;">"${session.notes}"</div>` : ''}
          </div>
          ` : ''}

          <h3 style="font-size:0.9rem; font-weight:800; color:var(--text-primary); text-transform:uppercase; margin-bottom:12px;">Ejercicios Realizados</h3>
          ${exercisesHtml}
       </div>
    </div>
  `;
}

function navigateHome() {
  state.currentView = 'home';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Minimize / Resume Workout ──
function minimizeWorkout() {
  if (!state.sessionActive) {
    // No active session – just go home normally
    state.currentView = 'home';
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  // Snapshot the exact view so resume restores it correctly
  state._minimizedView = state.currentView; // 'workout' | 'empty_workout'
  state.workoutMinimized = true;
  state.currentView = 'home';
  saveState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resumeWorkout() {
  state.workoutMinimized = false;
  // Restore the exact view that was active when the user minimized
  state.currentView = state._minimizedView || (state.emptyWorkout.active ? 'empty_workout' : 'workout');
  state._minimizedView = null;
  state.activeTab = 'entreno';
  saveState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Floating Mini-Player ──
let _miniPlayerInterval = null;

function renderMiniPlayer() {
  let container = document.getElementById('workoutMiniPlayer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'workoutMiniPlayer';
    document.getElementById('app').appendChild(container);
  }

  const name = state.emptyWorkout.active
    ? state.emptyWorkout.name
    : (state.routine.days[state.currentDay]?.title || 'Entrenamiento');

  container.innerHTML = `
    <div class="mini-player-pill" onclick="resumeWorkout()">
      <div class="mini-player-dot"></div>
      <div class="mini-player-info">
        <div class="mini-player-name">${name}</div>
        <div class="mini-player-time" id="miniPlayerTime">${formatTime(state.sessionElapsed)}</div>
      </div>
      <button style="background:transparent; border:none; color:var(--accent-primary); cursor:pointer; padding:6px; margin-right:-4px; display:flex; align-items:center; justify-content:center; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='none'" onclick="event.stopPropagation(); resetWorkout()">${ICON_TRASH}</button>
    </div>
  `;

  // Start live-updating timer inside the pill
  if (_miniPlayerInterval) clearInterval(_miniPlayerInterval);
  _miniPlayerInterval = setInterval(() => {
    const el = document.getElementById('miniPlayerTime');
    if (el && state.sessionActive) {
      state.sessionElapsed = Math.floor((Date.now() - state.sessionStartTime) / 1000);
      el.textContent = formatTime(state.sessionElapsed);
    }
  }, 1000);
}

function teardownMiniPlayer() {
  if (_miniPlayerInterval) {
    clearInterval(_miniPlayerInterval);
    _miniPlayerInterval = null;
  }
  const container = document.getElementById('workoutMiniPlayer');
  if (container) container.remove();
}

function navigateHome() {
  state.currentView = 'home';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Exercise Detail View ──
function openExerciseDetail(exerciseIndex) {
  const isVacío = state.currentView === 'empty_workout';
  const exList = isVacío ? state.emptyWorkout.exercises : state.routine.days[state.currentDay].exercises;
  const exerciseConfig = exList[exerciseIndex];

  if (!exerciseConfig) {
    showToast('⚠️', 'Ejercicio no encontrado');
    return;
  }

  const exerciseData = EXERCISE_DB[exerciseConfig.exerciseId];
  if (!exerciseData) {
    showToast('⚠️', 'Datos del ejercicio no disponibles');
    return;
  }

  // Guardar contexto COMPLETO e INMUTABLE para evitar cualquier bug de navegación
  state.previousView = state.currentView;
  state.previousDay = state.currentDay;
  state.expandedExercise = exerciseIndex;
  state.expandedExerciseId = exerciseConfig.exerciseId;
  state.exerciseDetailSource = 'workout'; // Viene del entrenamiento normal
  // Guardar también la lista de ejercicios snapshot para no depender de currentDay
  state.expandedExerciseListSnapshot = isVacío
    ? JSON.parse(JSON.stringify(state.emptyWorkout.exercises))
    : JSON.parse(JSON.stringify(state.routine.days[state.currentDay].exercises));

  state.currentView = 'exercise_detail';
  saveState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Abrir detalle desde el selector de ejercicios
function openExerciseSelectorToReplace(index) {
  state.replaceExerciseIndex = index;
  state.exerciseDetailSource = state.currentView === 'empty_workout' ? 'empty_workout' : 'workout';
  state.previousView = state.currentView;
  state.currentView = 'exercise_selector';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPlateCalculator(totalWeight) {
  if (!totalWeight || totalWeight <= 20) {
    showToast(window.ICON_PLATE, 'El peso debe ser mayor a la barra (20kg)');
    return;
  }
  
  const barWeight = 20;
  let weightPerSide = (totalWeight - barWeight) / 2;
  const plates = [25, 20, 15, 10, 5, 2.5, 1.25];
  const usedPlates = [];

  for (let plate of plates) {
    while (weightPerSide >= plate) {
      usedPlates.push(plate);
      weightPerSide -= plate;
    }
  }

  const platesText = usedPlates.length > 0 
    ? usedPlates.map(p => `<span style="background:var(--accent-primary); color:#fff; padding:3px 6px; border-radius:4px; font-weight:800; font-size:0.75rem; margin:0 2px;">${p}</span>`).join('')
    : '<span style="font-size:0.8rem; font-weight:700;">Solo barra</span>';

  showToast(window.ICON_PLATE, `Por lado:<br><div style="margin-top:6px;">${platesText}</div>`);
}

function openExerciseDetailFromSelector(exerciseId) {
  const exerciseData = EXERCISE_DB[exerciseId];
  if (!exerciseData) {
    showToast('⚠️', 'Ejercicio no encontrado');
    return;
  }

  // Guardar contexto del selector para poder volver y mostrar botón de añadir
  state.previousView = state.currentView;
  state.previousDay = state.currentDay;
  state.expandedExerciseId = exerciseId;
  state.exerciseDetailSource = exerciseSelectorSource || 'empty_workout'; // 'empty_workout' o 'routine_builder'
  state.expandedExerciseListSnapshot = null; // No necesitamos snapshot aquí

  state.currentView = 'exercise_detail';
  saveState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderExerciseDetail(container) {
  let exerciseConfig = null;
  let exerciseData = null;

  // Si viene del selector de ejercicios, usar EXERCISE_DB directamente
  if (state.exerciseDetailSource === 'exercise_selector' || state.exerciseDetailSource === 'empty_workout' || state.exerciseDetailSource === 'routine_builder') {
    exerciseData = EXERCISE_DB[state.expandedExerciseId];
    exerciseConfig = { exerciseId: state.expandedExerciseId }; // Config mínima
  } else {
    // Viene de un entrenamiento en curso, buscar en la lista
    const exList = state.expandedExerciseListSnapshot ||
      (state.currentView === 'empty_workout' ? state.emptyWorkout.exercises : state.routine.days[state.currentDay]?.exercises || []);

    exerciseConfig = state.expandedExerciseId
      ? exList.find(ex => ex.exerciseId === state.expandedExerciseId)
      : exList[state.expandedExercise];
  }

  if (!exerciseConfig) {
    showToast('⚠️', 'Ejercicio no encontrado');
    navigateHome();
    return;
  }

  if (!exerciseData) {
    exerciseData = EXERCISE_DB[exerciseConfig.exerciseId];
  }

  if (!exerciseData) {
    showToast('⚠️', 'Datos del ejercicio no disponibles');
    navigateHome();
    return;
  }

  const muscleGroup = MUSCLE_GROUPS[exerciseData.muscleGroup] || { name: exerciseData.muscleGroup };

  container.innerHTML = `
    <div class="home-screen">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; padding: 12px 16px; background: var(--bg-primary); border-bottom: 0.5px solid rgba(0,0,0,0.05);">
        <button onclick="navigateBackFromExerciseDetail()" style="background:transparent; border:none; color:var(--accent-primary); width:44px; height:44px; cursor:pointer; font-weight:700; font-size:1.3rem;">←</button>
        <h2 style="font-size:1rem; font-weight:800; text-transform:uppercase; flex:1;">${exerciseData.name}</h2>
      </div>

      <div style="padding: 0 16px;">
      <!-- Muscle Group Info -->
      <div style="background:var(--bg-surface); padding:14px 16px; margin-bottom:12px; border-radius: var(--radius-md);">
        <div style="font-size:0.6rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px; letter-spacing:0.5px;">MÚSCULO PRINCIPAL</div>
        <div style="font-size:0.95rem; font-weight:700; color:var(--text-primary);">${muscleGroup.name}</div>
        ${exerciseData.secondaryMuscles && exerciseData.secondaryMuscles.length > 0 ? `
          <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:6px; font-weight:600;">
            Secundario: ${exerciseData.secondaryMuscles.join(', ')}
          </div>
        ` : ''}
      </div>

      <!-- Tips Section -->
      ${exerciseData.tips && exerciseData.tips.length > 0 ? `
        <h3 style="font-weight:700; text-transform:uppercase; margin:20px 0 12px; font-size:0.75rem; color:var(--text-muted); letter-spacing:0.5px;">CONSEJOS DE TÉCNICA</h3>
        <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
          ${exerciseData.tips.map((tip, i) => `
            <div style="background:var(--bg-surface); padding:12px 14px; display:flex; gap:10px; align-items:flex-start; border-radius: var(--radius-sm);">
              <div style="background:var(--accent-primary); color:#fff; width:22px; height:22px; display:flex; align-items:center; justify-content:center; font-size:0.65rem; font-weight:800; flex-shrink:0; border-radius: 6px;">${i + 1}</div>
              <div style="font-size:0.8rem; color:var(--text-secondary); font-weight:500; line-height:1.5;">${tip}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Common Mistakes -->
      ${exerciseData.commonMistakes && exerciseData.commonMistakes.length > 0 ? `
        <h3 style="font-weight:700; text-transform:uppercase; margin:20px 0 12px; font-size:0.75rem; color:var(--accent-primary); letter-spacing:0.5px;">ERRORES COMUNES</h3>
        <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
          ${exerciseData.commonMistakes.map((mistake, i) => `
            <div style="background:rgba(255,59,48,0.05); border:0.5px solid rgba(255,59,48,0.15); padding:12px 14px; display:flex; gap:10px; align-items:flex-start; border-radius: var(--radius-sm);">
              <div style="background:var(--accent-primary); color:#fff; width:22px; height:22px; display:flex; align-items:center; justify-content:center; font-size:0.65rem; font-weight:800; flex-shrink:0; border-radius: 6px;">✕</div>
              <div style="font-size:0.8rem; color:var(--text-secondary); font-weight:500; line-height:1.5;">${mistake}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Progression -->
      ${exerciseData.progression ? `
        <h3 style="font-weight:700; text-transform:uppercase; margin:20px 0 12px; font-size:0.75rem; color:var(--text-muted); letter-spacing:0.5px;">PROGRESIÓN</h3>
        <div style="background:var(--bg-surface); padding:14px 16px; margin-bottom:16px; border-radius: var(--radius-sm);">
          <div style="font-size:0.8rem; color:var(--text-secondary); font-weight:500; line-height:1.5;">${exerciseData.progression}</div>
        </div>
      ` : ''}

      <!-- Warm-up -->
      ${exerciseData.warmup ? `
        <h3 style="font-weight:700; text-transform:uppercase; margin:20px 0 12px; font-size:0.75rem; color:var(--text-muted); letter-spacing:0.5px;">CALENTAMIENTO</h3>
        <div style="background:var(--bg-surface); padding:14px 16px; margin-bottom:16px; border-radius: var(--radius-sm);">
          <div style="font-size:0.8rem; color:var(--text-secondary); font-weight:500; line-height:1.5;">${exerciseData.warmup}</div>
        </div>
      ` : ''}

      <!-- Rest Time -->
      ${exerciseData.restRecommended ? `
        <h3 style="font-weight:700; text-transform:uppercase; margin:20px 0 12px; font-size:0.75rem; color:var(--text-muted); letter-spacing:0.5px;">DESCANSO RECOMENDADO</h3>
        <div style="background:var(--bg-surface); padding:16px; text-align:center; border-radius: var(--radius-md);">
          <div style="font-size:1.8rem; font-weight:800; color:var(--text-primary);">${exerciseData.restRecommended}s</div>
          <div style="font-size:0.65rem; color:var(--text-muted); font-weight:600; text-transform:uppercase; margin-top:4px; letter-spacing:0.5px;">Descanso entre series</div>
        </div>
      ` : ''}

      <!-- Botón Añadir al Entrenamiento (solo si viene del selector) -->
      ${state.exerciseDetailSource ? `
        <div style="margin-top:24px; margin-bottom:20px;">
          <button onclick="addExerciseFromDetailAndBack('${exerciseConfig.exerciseId}')" style="width:100%; padding:16px; background:var(--accent-gradient); color:#fff; border:none; font-weight:700; font-size:0.9rem; cursor:pointer; text-transform:uppercase; border-radius: var(--radius-md); box-shadow: var(--accent-glow); display:flex; align-items:center; justify-content:center; gap:8px;">
            ${state.replaceExerciseIndex !== null && state.replaceExerciseIndex !== undefined ? `${ICON_REPLACE} SUSTITUIR EJERCICIO` : '+ AÑADIR AL ENTRENAMIENTO'}
          </button>
        </div>
      ` : ''}
      </div>
    </div>
  `;
}

function navigateBackFromExerciseDetail() {
  // Restaurar contexto de navegación guardado
  const targetView = state.previousView || (state.emptyWorkout.active ? 'empty_workout' : 'workout');
  const targetDay = state.previousDay !== null && state.previousDay !== undefined ? state.previousDay : state.currentDay;

  // Limpiar todas las propiedades temporales del detalle
  state.expandedExercise = null;
  state.expandedExerciseId = null;
  state.expandedExerciseListSnapshot = null;
  state.exerciseDetailSource = null;
  state.previousView = null;
  state.previousDay = null;

  // Restaurar vista y día correctos
  state.currentView = targetView;
  state.currentDay = targetDay;

  saveState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addExerciseFromDetailAndBack(exerciseId) {
  const ex = { exerciseId, sets: 3, reps: '10-12', notes: '' };

  if (state.replaceExerciseIndex !== null && state.replaceExerciseIndex !== undefined) {
    // Sustitución al vuelo
    if (state.exerciseDetailSource === 'empty_workout') {
      state.emptyWorkout.exercises[state.replaceExerciseIndex] = ex;
      state.completedSets[`empty_ex${state.replaceExerciseIndex}`] = [];
    } else {
      state.routine.days[state.currentDay].exercises[state.replaceExerciseIndex] = ex;
      state.completedSets[`day${state.currentDay}_ex${state.replaceExerciseIndex}`] = [];
    }
    showToast(window.ICON_REPLACE, `Sustituido por ${EXERCISE_DB[exerciseId].name}`);
  } else {
    // Añadir normal
    if (state.exerciseDetailSource === 'routine_builder') {
      state.builder.days[activeBuilderDay].exercises.push(ex);
      showToast('✅', `${EXERCISE_DB[exerciseId].name} añadido a la rutina`);
    } else if (state.exerciseDetailSource === 'empty_workout') {
      state.emptyWorkout.exercises.push({
        exerciseId: exerciseId,
        sets: 3,
        history: []
      });
      showToast('✅', `${EXERCISE_DB[exerciseId].name} añadido al entrenamiento`);
    }
  }

  saveState();

  // Volver a la vista donde estábamos
  state.currentView = state.previousView || (state.emptyWorkout.active ? 'empty_workout' : 'workout');
  state.exerciseDetailSource = null;
  state.expandedExerciseId = null;
  state.replaceExerciseIndex = null;
  state.previousView = null;
  state.previousDay = null;
  saveState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showComingSoon(feature) {
  showToast('🚧', `"${feature}" estará disponible próximamente.`);
}

// ── Persistencia ──
function saveState() {
  const toSave = {
    routine: state.routine,
    prs: state.prs,
    currentDay: state.currentDay,
    completedSets: state.completedSets,
    sessionActive: state.sessionActive,
    sessionElapsed: state.sessionElapsed,
    sessionStartTime: state.sessionStartTime,
    workoutMinimized: state.workoutMinimized,
    activeTab: state.activeTab,
    history: state.history,
    userProfile: state.userProfile,
    currentView: state.currentView,
    emptyWorkout: state.emptyWorkout,
    theme: state.theme
  };
  localStorage.setItem('gymcoach_state', JSON.stringify(toSave));
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  saveState();
  renderApp();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('gymcoach_state'));
    if (saved) {
      if (saved.routine) state.routine = saved.routine;
      if (saved.prs) state.prs = saved.prs;

      state.currentDay = saved.currentDay || 0;
      state.completedSets = saved.completedSets || {};
      state.activeTab = saved.activeTab || 'entreno';
      state.history = saved.history || [];
      state.userProfile = { ...state.userProfile, ...saved.userProfile };
      state.currentView = saved.currentView || 'home';
      state.emptyWorkout = saved.emptyWorkout || state.emptyWorkout;
      state.workoutMinimized = saved.workoutMinimized || false;

      if (saved.sessionActive && saved.sessionStartTime) {
        state.sessionActive = true;
        state.sessionStartTime = saved.sessionStartTime;
        state.sessionElapsed = Math.floor((Date.now() - saved.sessionStartTime) / 1000);
        // If page was reloaded while minimized, keep it minimized
        if (state.workoutMinimized) {
          state.currentView = 'home';
        }
      } else {
        state.sessionActive = false;
        state.sessionElapsed = saved.sessionElapsed || 0;
        state.workoutMinimized = false;
      }
    }
  } catch (e) {
    console.error("Error loading state", e);
  }
}

// ── UI de Días (Tabs) ──
function renderDayTabs() {
  const tabs = document.getElementById('dayTabs');
  if (!tabs) return;
  tabs.innerHTML = state.routine.days.map((day, index) => `
    <button class="day-tab ${index === state.currentDay ? 'active' : ''}" 
            onclick="changeDay(${index})">
      <span class="day-tab-icon">${day.icon}</span>
      <span class="day-tab-title">${day.title}</span>
      ${getCompletedSetsCount(index) > 0 ? `<div class="day-tab-progress" style="width: ${(getCompletedSetsCount(index) / day.exercises.reduce((s, e) => s + e.sets, 0)) * 100}%"></div>` : ''}
    </button>
  `).join('');
}

function changeDay(index) {
  state.currentDay = index;
  state.expandedExercise = null;
  state.expandedInfo = null;
  stopRestTimer();
  saveState();
  renderDayTabs();
  renderContent();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Contenido Principal (Workout) ──
function renderContent() {
  if (state.currentView !== 'workout' && state.currentView !== 'empty_workout') return;

  const main = document.getElementById('mainContent');
  const isVacío = state.currentView === 'empty_workout';
  const day = isVacío ? { title: state.emptyWorkout.name, exercises: state.emptyWorkout.exercises, coachingTips: [] } : state.routine.days[state.currentDay];

  if (!day) return;

  const totalSets = day.exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedCount = getCompletedSetsCount(state.currentDay);

  let exercisesHtml = '';
  if (day.exercises.length === 0) {
    exercisesHtml = `<div style="text-align:center; padding: 60px 40px; color: var(--text-muted); background:var(--bg-card); border-radius:16px; border:1px dashed var(--border-subtle); margin-bottom:20px;">
      <div style="font-size:3rem; margin-bottom:15px;">🏋️‍♂️</div>
      <h3>Entrenamiento Vacío</h3>
      <p style="font-size:0.85rem; margin-top:5px;">Añade ejercicios de la lista para empezar a registrar tu sesión libre.</p>
    </div>`;
  } else {
    exercisesHtml = day.exercises.map((ex, index) => renderExerciseCard(ex, index, day)).join('');
  }

  const summaryDiv = renderWorkoutSummary(day, totalSets, completedCount);

  main.innerHTML = `
    <div class="exercises-list">
      ${isVacío ? `<div style="margin-bottom:20px; text-align:center;"><h2 style="font-size:1.2rem; color:var(--text-primary);">${state.emptyWorkout.name}</h2></div>` : ''}
      ${exercisesHtml}
      <button class="add-exercise-btn" onclick="openExerciseSelector()">+ Agregar Ejercicio</button>
      ${day.exercises.length > 1 ? `<button class="add-exercise-btn" style="margin-top:0; display:flex; align-items:center; justify-content:center; gap:8px;" onclick="openReorderView()">☰ Reordenar Ejercicios</button>` : ''}
    </div>
    ${summaryDiv}
  `;
}

function startEmptyWorkout() {
  state.currentView = 'empty_workout';
  state.emptyWorkout.active = true;
  state.emptyWorkout.exercises = [];
  state.sessionStartTime = null; // Important for startSession
  state.sessionElapsed = 0;
  state.completedSets = {}; // Reset for the empty session
  renderApp();
}

let exerciseSelectorSource = null;
let selectorQuery = '';

function openExerciseSelector() {
  exerciseSelectorSource = 'empty_workout';
  selectorQuery = '';
  state.currentView = 'exercise_selector';
  renderApp();
}

let activeBuilderDay = null;
function openExerciseSelectorForBuilder(dIdx) {
  exerciseSelectorSource = 'routine_builder';
  activeBuilderDay = dIdx;
  selectorQuery = '';
  state.currentView = 'exercise_selector';
  renderApp();
}

function closeExerciseSelector() {
  selectorQuery = '';
  state.currentView = exerciseSelectorSource === 'routine_builder' ? 'routine_builder' : 'empty_workout';
  renderApp();
}

let collapsedGroups = {}; // Estado de grupos colapsados

function renderExerciseSelectorView(container) {
  container.innerHTML = `
     <div class="home-screen">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding: 12px 16px; background: var(--bg-primary); border-bottom: 0.5px solid rgba(0,0,0,0.05);">
           <div style="display:flex; align-items:center; gap:10px;">
              <button onclick="closeExerciseSelector()" style="background:transparent; border:none; color:var(--accent-primary); width:44px; height:44px; cursor:pointer; font-weight:700; font-size:1.3rem;">←</button>
              <h3 style="font-weight:800; text-transform:uppercase; font-size:0.95rem;">AGREGAR EJERCICIO</h3>
           </div>
        </div>

        <input type="text" id="exSearchFull" placeholder="Buscar ejercicio..." oninput="filterExerciseList(this.value)" value="${selectorQuery}" style="width:100%; padding:12px 16px; margin: 0 0 12px 0; border:0.5px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); outline:none; font-size:0.9rem; font-weight:600;">

        <div id="exSelectorList" style="display:flex; flex-direction:column; gap:1px; background: rgba(0,0,0,0.05);">
           ${renderExerciseListForSelector(selectorQuery)}
        </div>
     </div>
   `;
}

function toggleGroupCollapse(mg) {
  collapsedGroups[mg] = !collapsedGroups[mg];
  const container = document.getElementById('exSelectorList');
  if (container) container.innerHTML = renderExerciseListForSelector(selectorQuery);
}

function renderExerciseListForSelector(query = '') {
  const q = query.toLowerCase();

  // Filtrar ejercicios por búsqueda
  const filtered = Object.keys(EXERCISE_DB).filter(id => {
    const ex = EXERCISE_DB[id];
    const mg = MUSCLE_GROUPS[ex.muscleGroup];
    const mgName = mg ? mg.name.toLowerCase() : '';
    return ex.name.toLowerCase().includes(q) || mgName.includes(q) || (ex.secondaryMuscles && ex.secondaryMuscles.some(m => m.toLowerCase().includes(q)));
  });

  // Si hay búsqueda, mostrar lista plana
  if (q.length > 0) {
    return filtered.map(id => {
      const ex = EXERCISE_DB[id];
      const m = MUSCLE_GROUPS[ex.muscleGroup] || { color: '#000', name: 'Otro' };
      return `
        <div class="exercise-card" onclick="openExerciseDetailFromSelector('${id}')" style="background:var(--bg-card); cursor:pointer; padding:14px 16px; display:flex; gap:12px; align-items:center;">
           <div style="flex:1;">
             <h3 style="font-size:0.9rem; font-weight:700; color:var(--text-primary); margin-bottom:4px;">${ex.name}</h3>
             <p style="font-size:0.7rem; font-weight:600; color:var(--text-muted); text-transform:uppercase;">${m.name}</p>
           </div>
           <div style="color:var(--text-muted); font-size:1.2rem;">›</div>
        </div>
      `;
    }).join('');
  }

  // Sin búsqueda: agrupar por grupo muscular con desplegables
  const groups = {};
  filtered.forEach(id => {
    const ex = EXERCISE_DB[id];
    const mg = ex.muscleGroup;
    if (!groups[mg]) groups[mg] = [];
    groups[mg].push(id);
  });

  // Orden de grupos musculares
  const groupOrder = ['pecho', 'espalda', 'espalda baja', 'hombro', 'hombro posterior', 'tríceps', 'bíceps', 'cuádriceps', 'isquiotibiales', 'glúteos', 'piernas', 'aductores', 'gemelos', 'core', 'trapecio', 'antebrazo'];

  let html = '';
  groupOrder.forEach(mg => {
    if (!groups[mg]) return;
    const m = MUSCLE_GROUPS[mg] || { name: mg, color: '#000' };
    const isCollapsed = collapsedGroups[mg];

    html += `
      <div style="margin-bottom:0;">
        <div onclick="toggleGroupCollapse('${mg}')" style="background:var(--bg-surface); color:var(--text-primary); padding:12px 16px; font-weight:700; font-size:0.7rem; text-transform:uppercase; letter-spacing:0.5px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; border-bottom:0.5px solid var(--border-subtle);">
          <span>${m.name}</span>
          <span style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:0.65rem; color:var(--text-muted); font-weight:600;">${groups[mg].length} ejercicios</span>
            <span style="font-size:0.9rem; color:var(--text-muted); transform:${isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)'}; transition:transform 0.2s;">▼</span>
          </span>
        </div>
        <div style="overflow:hidden; max-height:${isCollapsed ? '0' : '2000px'}; transition:max-height 0.3s ease;">
          ${groups[mg].map(id => {
      const ex = EXERCISE_DB[id];
      return `
              <div class="exercise-card" onclick="openExerciseDetailFromSelector('${id}')" style="background:var(--bg-card); cursor:pointer; padding:14px 16px; display:flex; gap:12px; align-items:center;">
                 <div style="flex:1;">
                   <h3 style="font-size:0.9rem; font-weight:700; color:var(--text-primary); margin-bottom:4px;">${ex.name}</h3>
                 </div>
                 <div style="color:var(--text-muted); font-size:1.2rem;">›</div>
              </div>
            `;
    }).join('')}
        </div>
      </div>
    `;
  });

  return html || '<p style="text-align:center; color:#888; font-weight:700; padding:20px;">No se encontraron ejercicios</p>';
}

function filterExerciseList(query) {
  selectorQuery = query;
  const container = document.getElementById('exSelectorList');
  if (container) container.innerHTML = renderExerciseListForSelector(query);
}

function startRoutineBuilder() {
  state.currentView = 'routine_builder';
  state.builder.days = [{ title: 'Día 1', exercises: [] }];
  renderApp();
}

function renderRoutineBuilder(container) {
  container.innerHTML = `
    <div class="home-screen">
       <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0; padding: 12px 16px; background: var(--bg-primary); border-bottom: 0.5px solid rgba(0,0,0,0.05);">
          <div style="display:flex; align-items:center; gap:10px;">
             <button onclick="navigateBackFromSubview()" style="background:transparent; border:none; color:var(--accent-primary); width:44px; height:44px; cursor:pointer; font-weight:700; font-size:1.3rem;">←</button>
             <h2 style="font-size:1rem; font-weight:800; text-transform:uppercase;">Nueva Rutina</h2>
          </div>
          <button onclick="generateAIRoutine()" style="background:var(--accent-gradient); color:#fff; border:none; padding:8px 14px; font-weight:700; cursor:pointer; font-size:0.75rem; border-radius:var(--radius-sm); box-shadow:var(--accent-glow);">⚡ IA</button>
       </div>

       <div style="display:flex; flex-direction:column; gap:1px; background:rgba(0,0,0,0.05);">
          ${state.builder.days.map((day, dIdx) => `
             <div style="background:var(--bg-card); padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                   <input type="text" value="${day.title}" onchange="updateBuilderDayTitle(${dIdx}, this.value)" style="background:transparent; border:none; color:var(--text-primary); font-weight:700; font-size:0.95rem; width:150px; outline:none;">
                   <button onclick="removeBuilderDay(${dIdx})" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-weight:600; min-width:44px; min-height:44px; display:flex; align-items:center; justify-content:center;">✕</button>
                </div>

                <div style="display:flex; flex-direction:column; gap:1px; background:rgba(0,0,0,0.05); margin-bottom:12px;">
                   ${day.exercises.map((ex, eIdx) => `
                      <div style="padding:12px 14px; background:var(--bg-card); display:flex; justify-content:space-between; align-items:center;">
                         <div style="font-size:0.85rem; font-weight:600; color:var(--text-primary);">${EXERCISE_DB[ex.exerciseId]?.name || 'Unknown'}</div>
                         <div style="display:flex; align-items:center; gap:8px;">
                            <input type="number" value="${ex.sets}" onchange="updateBuilderExSets(${dIdx}, ${eIdx}, this.value)" style="width:45px; background:var(--bg-surface); border:0.5px solid var(--border-subtle); color:var(--text-primary); text-align:center; font-size:0.8rem; padding:6px; font-weight:600; border-radius:6px;">
                            <span style="font-size:0.65rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">series</span>
                            <button onclick="removeBuilderEx(${dIdx}, ${eIdx})" style="background:transparent; border:none; color:var(--accent-primary); width:36px; height:36px; cursor:pointer; font-weight:600; font-size:0.9rem; display:flex; align-items:center; justify-content:center;">✕</button>
                         </div>
                      </div>
                   `).join('')}
                </div>
                <button onclick="openExerciseSelectorForBuilder(${dIdx})" style="width:100%; padding:12px; background:var(--bg-surface); color:var(--text-secondary); border:1px dashed var(--border-subtle); font-size:0.8rem; font-weight:600; cursor:pointer; border-radius:var(--radius-sm);">+ Añadir ejercicio</button>
             </div>
          `).join('')}

          <button onclick="addBuilderDay()" style="width:100%; padding:14px; border:2px dashed var(--border-light); background:var(--bg-card); color:var(--text-secondary); cursor:pointer; font-weight:600; font-size:0.85rem; border-radius:var(--radius-md); margin: 16px;">+ Añadir día</button>

          <button onclick="finalizeRoutineBuilder()" style="width:100%; padding:16px; background:var(--accent-gradient); color:#fff; border:none; font-weight:700; font-size:0.9rem; cursor:pointer; margin: 0 16px 20px; border-radius:var(--radius-md); box-shadow:var(--accent-glow);">Guardar y Activar Rutina</button>
       </div>
    </div>
  `;
}

function addBuilderDay() {
  state.builder.days.push({ title: `Día ${state.builder.days.length + 1}`, exercises: [] });
  renderApp();
}

function removeBuilderDay(idx) {
  if (state.builder.days.length <= 1) return;
  state.builder.days.splice(idx, 1);
  renderApp();
}

function updateBuilderDayTitle(idx, title) {
  state.builder.days[idx].title = title;
}

function updateBuilderExSets(dIdx, eIdx, val) {
  state.builder.days[dIdx].exercises[eIdx].sets = parseInt(val) || 1;
}

function removeBuilderEx(dIdx, eIdx) {
  state.builder.days[dIdx].exercises.splice(eIdx, 1);
  renderApp();
}

function addExerciseToEmptySession(exerciseId) {
  const ex = { exerciseId, sets: 3, reps: '10-12', notes: '' };
  if (exerciseSelectorSource === 'routine_builder') {
    state.builder.days[activeBuilderDay].exercises.push(ex);
  } else if (exerciseSelectorSource === 'empty_workout') {
    state.emptyWorkout.exercises.push({
      exerciseId: exerciseId,
      sets: 3,
      history: []
    });
  }

  closeExerciseSelector();
}

function generateAIRoutine() {
  showToast('🤖', 'Generando rutina óptima según tus objetivos...');
  setTimeout(() => {
    const goals = state.userProfile.goals;
    let newDays = [];
    if (goals === 'gain') {
      newDays = [
        { title: 'EMPUJE', exercises: [{ exerciseId: 'press_pecho_maquina_plano', sets: 4, reps: '10-12', notes: '' }, { exerciseId: 'press_inclinado_maquina', sets: 4, reps: '10-12', notes: '' }, { exerciseId: 'fondos_maquina', sets: 3, reps: 'fallo', notes: '' }] },
        { title: 'TIRÓN', exercises: [{ exerciseId: 'jalon_pecho', sets: 4, reps: '10-12', notes: '' }, { exerciseId: 'remo_sentado_v', sets: 4, reps: '10-12', notes: '' }, { exerciseId: 'curl_biceps_polea_barra', sets: 3, reps: '12-15', notes: '' }] },
        { title: 'PIERNAS', exercises: [{ exerciseId: 'prensa', sets: 4, reps: '10-15', notes: '' }, { exerciseId: 'extension_cuadriceps', sets: 3, reps: '12-15', notes: '' }, { exerciseId: 'gemelo_pie', sets: 4, reps: '15-20', notes: '' }] }
      ];
    } else if (goals === 'lose') {
      newDays = [
        { title: 'FULL BODY A', exercises: [{ exerciseId: 'prensa', sets: 3, reps: '15-20', notes: '' }, { exerciseId: 'press_pecho_maquina_plano', sets: 3, reps: '12-15', notes: '' }, { exerciseId: 'jalon_pecho', sets: 3, reps: '12-15', notes: '' }] },
        { title: 'FULL BODY B', exercises: [{ exerciseId: 'hiperextension_lumbar', sets: 3, reps: '15-20', notes: '' }, { exerciseId: 'press_inclinado_maquina', sets: 3, reps: '12-15', notes: '' }, { exerciseId: 'remo_sentado_v', sets: 3, reps: '12-15', notes: '' }] }
      ];
    } else {
      newDays = [
        { title: 'FUERZA TREN INF', exercises: [{ exerciseId: 'prensa', sets: 5, reps: '4-6', notes: '' }, { exerciseId: 'hiperextension_lumbar', sets: 3, reps: '8-10', notes: '' }, { exerciseId: 'curl_femoral', sets: 3, reps: '8-10', notes: '' }] },
        { title: 'FUERZA TREN SUP', exercises: [{ exerciseId: 'press_pecho_maquina_plano', sets: 5, reps: '4-6', notes: '' }, { exerciseId: 'remo_sentado_v', sets: 5, reps: '4-6', notes: '' }] }
      ];
    }
    state.builder.days = newDays;
    renderApp();
    showToast('⚡', '¡Rutina de IA lista para usarse!');
  }, 1500);
}

async function finalizeRoutineBuilder() {
  const hasEx = state.builder.days.some(d => d.exercises.length > 0);
  if (!hasEx) { showToast('⚠️', 'Añade ejercicios antes de guardar'); return; }

  if (await showCustomConfirm('¿Quieres guardar esta nueva rutina? Se convertirá en tu plan de entrenamiento activo.')) {
    state.routine = {
      id: 'user_custom',
      title: 'Mi Rutina Personalizada',
      days: state.builder.days
    };
    state.currentDay = 0;
    state.completedSets = {};
    state.currentView = 'home';
    state.activeTab = 'entreno';
    saveState();
    showToast('🎉', '¡Nueva rutina activada con éxito!');
    renderApp();
  }
}

// ── Utils ──
function getCompletedSetsCount(dayIndex) {
  const isVacío = state.currentView === 'empty_workout';
  const day = isVacío ? { exercises: state.emptyWorkout.exercises } : state.routine.days[dayIndex];
  if (!day) return 0;
  let count = 0;
  day.exercises.forEach((ex, i) => {
    const key = isVacío ? `empty_ex${i}` : `day${dayIndex}_ex${i}`;
    const sets = state.completedSets[key] || [];
    count += sets.filter(s => s && s.done).length;
  });
  return count;
}

function getCurrentSessionSets() {
  return getCompletedSetsCount(state.currentDay);
}

function getCurrentSessionVolume() {
  const isVacío = state.currentView === 'empty_workout';
  const day = isVacío ? { exercises: state.emptyWorkout.exercises } : state.routine.days[state.currentDay];
  if (!day) return 0;
  let vol = 0;
  day.exercises.forEach((ex, exIdx) => {
    const key = isVacío ? `empty_ex${exIdx}` : `day${state.currentDay}_ex${exIdx}`;
    const sets = state.completedSets[key] || [];
    sets.forEach(s => {
      if (s.done && s.kg && s.reps) {
        vol += (parseFloat(s.kg) || 0) * (parseInt(s.reps) || 0);
      }
    });
  });
  return Math.round(vol);
}

function updateHeaderStats() {
  const setsEl = document.getElementById('headerTotalSets');
  const volEl = document.getElementById('headerTotalVolume');
  if (setsEl) setsEl.textContent = getCurrentSessionSets();
  if (volEl) volEl.textContent = getCurrentSessionVolume();
}

// Resumen del Día se ha eliminado visualmente. Renderizamos vacío para minimizar la app.
function renderDayHeader(day, totalSets, completedCount) {
  return '';
}

// ── Coaching Banner ──
function renderCoachingBanner(day) {
  const tips = day.coachingTips;
  if (!tips || tips.length === 0) return '';
  const tipIndex = state.coachingTipIndex % tips.length;

  return `
    <div class="coaching-banner" id="coachingBanner">
      <div class="coaching-banner-header">
        <span>🧠</span>
        <span class="coaching-banner-title">Consejo del Coach</span>
      </div>
      <div class="coaching-banner-text" id="coachingText">
        ${tips[tipIndex]}
      </div>
    </div>
  `;
}

// ── Exercise Card (NUEVO DISEÑO PLANO Y DIRECTO) ──
function renderExerciseCard(exerciseConfig, index, day) {
  const exercise = EXERCISE_DB[exerciseConfig.exerciseId];
  if (!exercise) return '';

  const muscleGroup = MUSCLE_GROUPS[exercise.muscleGroup] || { color: '#000000', name: exercise.muscleGroup, icon: '' };
  const isVacío = state.currentView === 'empty_workout';
  const setKey = isVacío ? `empty_ex${index}` : `day${state.currentDay}_ex${index}`;

  if (!state.completedSets[setKey] || state.completedSets[setKey].length !== exerciseConfig.sets) {
    const oldSets = state.completedSets[setKey] || [];
    const newSets = [];
    for (let i = 0; i < exerciseConfig.sets; i++) {
      newSets.push(oldSets[i] || { done: false, kg: '', reps: '', type: 'normal' });
    }
    state.completedSets[setKey] = newSets;
  }
  const setsData = state.completedSets[setKey];
  const isCompleted = setsData.every(s => s.done) && setsData.length > 0;

  return `
    <div class="exercise-card ${isCompleted ? 'completed' : ''}" id="exerciseCard${index}" style="background:var(--bg-card); border-bottom:0.5px solid rgba(0,0,0,0.05);">

      <!-- CARD HEADER -->
      <div class="ex-card-header" style="cursor:default; padding:12px 16px;">
        <div class="ex-title-sect" style="margin-left:0;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <h4 onclick="openExerciseDetail(${index})" style="cursor:pointer; font-weight:700; letter-spacing:-0.3px; font-size:0.9rem;">${exercise.name}</h4>
            <div style="display:flex;">
              <button class="ex-btn-rep" onclick="openExerciseSelectorToReplace(${index})" style="background:transparent; border:none; color:var(--text-muted); min-width:32px; min-height:44px; display:flex; align-items:center; justify-content:center; cursor:pointer;" title="Sustituir ejercicio">${ICON_REPLACE}</button>
              <button class="ex-btn-del" onclick="removeExercise(${index})" style="background:transparent; border:none; color:var(--text-muted); min-width:32px; min-height:44px; display:flex; align-items:center; justify-content:center;">${ICON_X}</button>
            </div>
          </div>
          <div style="display:flex; gap:8px; font-size:0.65rem; font-weight:600; color:var(--text-muted); text-transform:uppercase; margin-top:4px; letter-spacing:0.3px;">
            <span>${muscleGroup.name}</span>
            <span>·</span>
            <span>${setsData.length} series</span>
          </div>
        </div>
      </div>

      <!-- CARD BODY -->
      <div class="exercise-card-body" style="background:var(--bg-card);">
        <div class="exercise-card-body-inner" style="padding: 0 16px 16px;">

          <!-- SETS TRACKER HEADER -->
          <div class="sets-header" style="margin-top: 8px;">
             <div class="sh-type">Tipo</div>
             <div class="sh-prev" style="width:60px; text-align:center;">Prev</div>
             <div class="sh-kg">Peso (kg)</div>
             <div class="sh-reps">Reps</div>
             <div class="sh-done">OK</div>
          </div>

          <!-- SETS ROWS -->
          <div class="sets-list">
             ${setsData.map((s, i) => renderSetRow(index, i, s, exerciseConfig.exerciseId)).join('')}
          </div>

          <div class="sets-actions">
             <button class="btn-outline-small" onclick="addSet(${index})">+ Serie</button>
             <button class="btn-outline-small" style="color:var(--accent-primary)" onclick="removeSet(${index})">- Serie</button>
          </div>

          <!-- COMPACT REST TIMER -->
          ${renderCompactRestTimer(index, exercise)}

          <!-- Notas -->
          <div style="margin-top: 12px;">
            <input type="text" placeholder="Notas (asiento, técnica...)" value="${exerciseConfig.notes || ''}" oninput="updateExerciseNote(${index}, this.value)" style="width:100%; background:var(--bg-elevated); border:1px solid var(--border-subtle); color:var(--text-primary); border-radius:var(--radius-sm); padding:10px 12px; font-size:0.8rem; font-family:var(--font-family);" />
          </div>

        </div>
      </div>
    </div>
  `;
}

// ── Renderización de Filas de Series ──
const SET_TYPES = {
  calentamiento: { icon: 'W', label: 'Warm-up (Calentamiento)' },
  aproximacion: { icon: 'X', label: 'Aproximación' },
  normal: { icon: '1', label: 'Serie Normal' },
  dropset: { icon: 'D', label: 'Dropset' },
  fallida: { icon: 'F', label: 'Fallo' }
};
const SET_TYPE_KEYS = Object.keys(SET_TYPES);

function renderSetRow(exIndex, setIndex, setObj, exerciseId) {
  const isPR = setObj.isPR;
  const prevPerf = getPreviousPerformance(exerciseId, setIndex);

  return `
    <div class="set-row ${setObj.done ? 'completed' : ''}" id="setRow_${exIndex}_${setIndex}">
      <select class="set-type" title="Elegir tipo de serie" onchange="updateSetType(${exIndex}, ${setIndex}, this.value)" style="border:none; outline:none; background:var(--bg-card); color:var(--text-primary); border-radius:4px; padding:2px; cursor:pointer;-webkit-appearance:none; font-size:0.9rem; font-weight:700; text-align:center; width:50px; flex-shrink:0;">
         ${SET_TYPE_KEYS.map(k => `<option value="${k}" ${setObj.type === k ? 'selected' : ''}>${SET_TYPES[k].icon}</option>`).join('')}
      </select>
      
      <div class="set-prev-hint" style="width:60px; text-align:center; font-size:0.75rem; color:var(--text-muted); font-weight:600;">
         ${prevPerf || '-'}
      </div>

      <div class="set-input-wrap" style="position:relative; display:flex;">
         <input type="number" step="0.5" placeholder="Kg" value="${setObj.kg}" oninput="updateSetData(${exIndex}, ${setIndex}, 'kg', this.value)" style="padding-right:24px; width:100%;">
         <button onclick="showPlateCalculator(${setObj.kg || 0})" style="position:absolute; right:4px; top:50%; transform:translateY(-50%); background:transparent; border:none; color:var(--accent-primary); cursor:pointer;" title="Calculadora de discos" ${!setObj.kg || setObj.kg <= 20 ? 'disabled style="opacity:0.3; position:absolute; right:4px; top:50%; transform:translateY(-50%); background:transparent; border:none;"' : ''}>${ICON_PLATE}</button>
      </div>
      <div class="set-input-wrap">
         <input type="number" placeholder="Rep" value="${setObj.reps}" oninput="updateSetData(${exIndex}, ${setIndex}, 'reps', this.value)">
      </div>
      <button class="set-check-btn ${setObj.done ? 'checked' : ''}" onclick="toggleSet(${exIndex}, ${setIndex}, this)">
         ${setObj.done ? '✓' : ''}
      </button>
      ${isPR ? `<div class="pr-medal" id="prMedal_${exIndex}_${setIndex}" title="¡Nuevo Récord Personal!">🏅</div>` : ''}
    </div>
  `;
}

function getPreviousPerformance(exerciseId, setIndex) {
  // Buscamos en el historial del final al principio
  for (let i = state.history.length - 1; i >= 0; i--) {
    const session = state.history[i];
    if (session.exercisesPerformance && session.exercisesPerformance[exerciseId]) {
      const prevSet = session.exercisesPerformance[exerciseId][setIndex];
      if (prevSet && prevSet.kg && prevSet.reps) {
        return `${prevSet.kg}x${prevSet.reps}`;
      }
    }
  }
  // Alternativa: ver en PRS
  if (state.prs[exerciseId]) {
    return `${state.prs[exerciseId].maxKg}x${state.prs[exerciseId].maxRepsAtMax}`;
  }
  return null;
}

function updateSetType(exIndex, setIndex, newType) {
  const isVacío = state.currentView === 'empty_workout';
  const setKey = isVacío ? `empty_ex${exIndex}` : `day${state.currentDay}_ex${exIndex}`;
  state.completedSets[setKey][setIndex].type = newType;
  saveState();
}

function updateSetData(exIndex, setIndex, field, value) {
  const isVacío = state.currentView === 'empty_workout';
  const setKey = isVacío ? `empty_ex${exIndex}` : `day${state.currentDay}_ex${exIndex}`;
  state.completedSets[setKey][setIndex][field] = value;
  saveState();
}

function toggleSet(exerciseIndex, setIndex, btnElement = null) {
  const isVacío = state.currentView === 'empty_workout';
  const setKey = isVacío ? `empty_ex${exerciseIndex}` : `day${state.currentDay}_ex${exerciseIndex}`;
  if (!state.completedSets[setKey]) return;
  const setObj = state.completedSets[setKey][setIndex];
  if (!setObj) return;

  const wasCompleted = setObj.done;
  setObj.done = !wasCompleted;

  // Haptic feedback on set complete
  if (!wasCompleted) {
    hapticFeedback('light');
    if (!state.sessionActive) startSession();
    const exList = isVacío ? state.emptyWorkout.exercises : state.routine.days[state.currentDay].exercises;
    const exerciseId = exList[exerciseIndex].exerciseId;
    checkPR(exerciseId, setObj);

    if (setObj.isPR) {
      hapticFeedback('success');
    }
  } else {
    setObj.isPR = false;
  }

  // Check if session fully done (just for the toast)
  const day = isVacío ? { exercises: state.emptyWorkout.exercises } : state.routine.days[state.currentDay];
  let setsDoneInDay = 0;
  day.exercises.forEach((ex, i) => {
    const k = isVacío ? `empty_ex${i}` : `day${state.currentDay}_ex${i}`;
    const s = state.completedSets[k] || [];
    setsDoneInDay += s.filter(item => item.done).length;
  });
  const totalPossibleSets = day.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  if (setsDoneInDay === totalPossibleSets && !wasCompleted) {
    hapticFeedback('success');
    showToast('🎉', "¡TODOS LOS EJERCICIOS DEL DÍA COMPLETADOS!");
  }

  // DOM UPDATE PERFECTION
  const row = btnElement ? btnElement.closest('.set-row') : document.getElementById(`setRow_${exerciseIndex}_${setIndex}`);
  if (row) {
    if (setObj.done) {
      row.classList.add('completed');
      // Add smooth scale animation
      row.style.transform = 'scale(1.02)';
      setTimeout(() => {
        row.style.transform = '';
      }, 200);
    } else {
      row.classList.remove('completed');
    }
  }

  const btn = btnElement || document.getElementById(`setBtn_${exerciseIndex}_${setIndex}`);
  if (btn) {
    if (setObj.done) {
      btn.classList.add('checked');
      btn.textContent = '✓';
      // Button press animation
      btn.style.transform = 'scale(0.9)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
    } else {
      btn.classList.remove('checked');
      btn.textContent = '';
    }
  }

  // Patch PR Medal directly in DOM
  if (row) {
    const existingMedal = row.querySelector('.pr-medal');
    if (setObj.isPR && !existingMedal) {
      const medal = document.createElement('div');
      medal.className = 'pr-medal';
      medal.textContent = '🏅';
      row.appendChild(medal);
    } else if (!setObj.isPR && existingMedal) {
      existingMedal.remove();
    }
  }

  // Update header and redraw heatmaps inside header via renderHeader (cheap)
  updateHeaderStats();
  renderHeader();
  saveState();
}

function updateExerciseNote(exerciseIndex, noteText) {
  const isVacío = state.currentView === 'empty_workout';
  if (isVacío) {
    state.emptyWorkout.exercises[exerciseIndex].notes = noteText;
  } else {
    state.routine.days[state.currentDay].exercises[exerciseIndex].notes = noteText;
  }
  saveState();
}

function checkPR(exerciseId, setObj) {
  if (!setObj.kg || !setObj.reps) return;
  const kgFloat = parseFloat(setObj.kg);
  const repsInt = parseInt(setObj.reps);

  // Excluimos calentamiento para los PR
  if (setObj.type === 'calentamiento' || setObj.type === 'aproximacion' || setObj.type === 'fallida') return;

  if (!state.prs[exerciseId]) {
    state.prs[exerciseId] = { maxKg: kgFloat, maxRepsAtMax: repsInt };
    setObj.isPR = true;
    showToast('🏅', '¡Nuevo Récord Personal de peso establecido!');
  } else {
    const currentPR = state.prs[exerciseId];
    if (kgFloat > currentPR.maxKg) {
      currentPR.maxKg = kgFloat;
      currentPR.maxRepsAtMax = repsInt;
      setObj.isPR = true;
      showToast('🏅', `¡NUEVO RÚCORD HISTÓRICO! (${kgFloat} kg)`);
    } else if (kgFloat === currentPR.maxKg && repsInt > currentPR.maxRepsAtMax) {
      currentPR.maxRepsAtMax = repsInt;
      setObj.isPR = true;
      showToast('🏅', `¡Récord de Reps con el peso máximo!`);
    } else {
      setObj.isPR = false;
    }
  }
}

// ── Manejo del Plan (Añadir/Quitar) ──
function addSet(exerciseIndex) {
  const isVacío = state.currentView === 'empty_workout' || state.emptyWorkout.active;

  let exerciseConfig;
  let setKey;

  if (isVacío) {
    exerciseConfig = state.emptyWorkout.exercises[exerciseIndex];
    setKey = `empty_ex${exerciseIndex}`;
  } else {
    exerciseConfig = state.routine.days[state.currentDay].exercises[exerciseIndex];
    setKey = `day${state.currentDay}_ex${exerciseIndex}`;
  }

  if (!exerciseConfig) return;
  if (exerciseConfig.sets >= 10) return showToast('⚠️', "Límite: 10 series");

  exerciseConfig.sets++;
  if (!state.completedSets[setKey]) state.completedSets[setKey] = [];
  state.completedSets[setKey].push({ done: false, kg: '', reps: '', type: 'normal' });

  saveState();
  renderContent();
}

function removeSet(exerciseIndex) {
  const isVacío = state.currentView === 'empty_workout' || state.emptyWorkout.active;

  let exerciseConfig;
  let setKey;

  if (isVacío) {
    exerciseConfig = state.emptyWorkout.exercises[exerciseIndex];
    setKey = `empty_ex${exerciseIndex}`;
  } else {
    exerciseConfig = state.routine.days[state.currentDay].exercises[exerciseIndex];
    setKey = `day${state.currentDay}_ex${exerciseIndex}`;
  }

  if (!exerciseConfig) return;
  if (exerciseConfig.sets <= 1) return showToast('⚠️', "Mínimo 1 serie por ejercicio");

  exerciseConfig.sets--;
  if (state.completedSets[setKey]) {
    state.completedSets[setKey].pop(); // remove last element
  }

  saveState();
  renderContent();
}

async function removeExercise(exerciseIndex) {
  if (!(await showCustomConfirm("¿Eliminar este ejercicio de la rutina actual?"))) return;

  const isVacío = state.currentView === 'empty_workout' || state.emptyWorkout.active;

  if (isVacío) {
    // Modo entrenamiento vacío
    state.emptyWorkout.exercises.splice(exerciseIndex, 1);

    // Re-mapear completedSets para modo vacío
    for (let i = exerciseIndex; i < state.emptyWorkout.exercises.length; i++) {
      const currKey = `empty_ex${i}`;
      const nextKey = `empty_ex${i + 1}`;
      state.completedSets[currKey] = state.completedSets[nextKey] || [];
    }
    // Eliminar la última key que ahora está vacía
    delete state.completedSets[`empty_ex${state.emptyWorkout.exercises.length}`];
  } else {
    // Modo rutina normal
    const day = state.routine.days[state.currentDay];
    day.exercises.splice(exerciseIndex, 1);

    // Re-mapear completedSets para rutina normal
    for (let i = exerciseIndex; i < day.exercises.length; i++) {
      const currKey = `day${state.currentDay}_ex${i}`;
      const nextKey = `day${state.currentDay}_ex${i + 1}`;
      state.completedSets[currKey] = state.completedSets[nextKey] || [];
    }
    // Eliminar la última key que ahora está vacía
    delete state.completedSets[`day${state.currentDay}_ex${day.exercises.length}`];
  }

  showToast('🗑️', "Ejercicio eliminado del plan");
  saveState();
  renderContent();
}

function askAddExercise() {
  const exerciseId = prompt("Para esta versión rápida, pon el ID del ejercicio (ej. pecho_plano, curl_barra). En version final esto será un buscador visual:");
  if (exerciseId && EXERCISE_DB[exerciseId]) {
    state.routine.days[state.currentDay].exercises.push({
      exerciseId: exerciseId,
      sets: 3, reps: '8-12', rir: "2", note: "-"
    });
    showToast('✨', "Ejercicio añadido al final de la lista");
    saveState();
    renderContent();
  } else if (exerciseId) {
    showToast('❌', "No se encontró el ejercicio");
  }
}

function toggleInfo(index) {
  if (state.expandedInfo === index) state.expandedInfo = null;
  else state.expandedInfo = index;
  renderContent();
}

// ── COMPACT Rest Timer ──
function renderCompactRestTimer(exerciseIndex, exercise) {
  const isActive = state.restTimer.active && state.restTimer.exerciseIndex === exerciseIndex;

  if (!isActive) {
    return `
      <div class="compact-rest" style="box-shadow: none; border:1px solid var(--border-subtle); background:var(--bg-surface); margin-top:15px;">
        <div class="c-rest-content" style="justify-content: space-between; padding: 8px 14px;">
           <span onclick="openRestTimerPicker(${exerciseIndex})" style="font-size: 0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; cursor:pointer;">Descanso:</span>
        </div>
      </div>
    `;
  }

  const remaining = state.restTimer.remaining;
  const duration = state.restTimer.duration;
  const progress = ((duration - remaining) / duration) * 100;

  return `
    <div class="compact-rest" style="border:1px solid var(--accent-primary); background:var(--bg-surface); margin-top:15px; overflow:hidden; position:relative;">
      <div class="c-rest-bar" id="restBar_${exerciseIndex}" style="width: ${progress}%; background:var(--accent-primary); height:100%; opacity:0.1; position:absolute; top:0; left:0; transition:width 1s linear;"></div>
      <div class="c-rest-content" style="position:relative; z-index:1; justify-content:space-between; padding:8px 14px; display:flex; align-items:center;">
        <span style="font-weight:700; font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Descanso:</span>
        <span class="c-rest-val" style="color:var(--text-primary); font-weight:800; font-size:1.1rem;" id="restVal_${exerciseIndex}">${formatTime(remaining)}</span>
        <div class="c-rest-actions" style="gap:6px; display:flex; align-items:center;">
           <button class="c-rest-btn" style="background:transparent; color:var(--text-muted); border:1px solid var(--border-subtle); padding:4px 10px; font-size:0.7rem; font-weight:700; cursor:pointer; border-radius:var(--radius-sm);" onclick="addRestTime(15)">+15s</button>
           <button class="c-rest-btn c-rest-skip" style="background:var(--accent-primary); color:#fff; border:none; padding:4px 12px; font-size:0.7rem; font-weight:700; cursor:pointer; border-radius:var(--radius-sm);" onclick="stopRestTimer(); renderContent();">Parar</button>
        </div>
      </div>
    </div>
  `;
}

function openRestTimerPicker(exerciseIndex, suggestedDuration) {
  const suggested = suggestedDuration || 90;
  const options = [];
  for (let s = 5; s <= 300; s += 5) {
    options.push(s);
  }

  const overlay = document.createElement('div');
  overlay.id = 'restTimerPickerOverlay';
  overlay.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:9999; display:flex; align-items:flex-end; justify-content:center; animation:fadeIn 0.2s ease;';

  let optionsHtml = options.map(s => {
    const label = s < 60 ? `${s}"` : `${Math.floor(s / 60)}m ${s % 60 > 0 ? s % 60 + '"' : ''}`;
    const isSuggested = s === suggested;
    return `<div class="rest-picker-option ${isSuggested ? 'suggested' : ''}" data-value="${s}" style="padding:14px 20px; text-align:center; font-size:0.9rem; font-weight:${isSuggested ? '800' : '600'}; color:${isSuggested ? 'var(--accent-primary)' : 'var(--text-primary)'}; background:${isSuggested ? 'rgba(108,99,255,0.08)' : 'transparent'}; cursor:pointer; border-bottom:0.5px solid rgba(0,0,0,0.05);">${label}${isSuggested ? ' <span style="font-size:0.6rem; color:var(--accent-primary); font-weight:600;">(recomendado)</span>' : ''}</div>`;
  }).join('');

  overlay.innerHTML = `
    <div style="background:var(--bg-primary); width:100%; max-width:500px; border-radius:16px 16px 0 0; max-height:70vh; display:flex; flex-direction:column; animation:slideUp 0.3s ease;">
      <div style="padding:16px 20px; border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
        <h3 style="font-size:0.9rem; font-weight:800; text-transform:uppercase; margin:0;">Tiempo de descanso</h3>
        <button onclick="closeRestTimerPicker()" style="background:transparent; border:none; color:var(--text-muted); font-size:1.3rem; cursor:pointer; padding:4px 8px;">✕</button>
      </div>
      <div id="restPickerScroll" style="overflow-y:auto; flex:1; -webkit-overflow-scrolling:touch;">
        ${optionsHtml}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeRestTimerPicker();
  });

  overlay.querySelectorAll('.rest-picker-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const value = parseInt(opt.dataset.value);
      closeRestTimerPicker();
      startRestTimer(exerciseIndex, value);
    });
  });

  // Scroll to suggested option
  setTimeout(() => {
    const suggestedEl = overlay.querySelector('.rest-picker-option.suggested');
    if (suggestedEl) {
      suggestedEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, 100);
}

function closeRestTimerPicker() {
  const overlay = document.getElementById('restTimerPickerOverlay');
  if (overlay) {
    overlay.style.animation = 'fadeOut 0.2s ease';
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 200);
  }
}

function addRestTime(seconds) {
  if (state.restTimer.active) {
    state.restTimer.remaining = Math.max(0, state.restTimer.remaining + seconds);
    state.restTimer.duration = Math.max(state.restTimer.remaining, state.restTimer.duration);
    updateRestTimerUI();
  }
}

function updateRestTimerUI() {
  const idx = state.restTimer.exerciseIndex;
  const bar = document.getElementById(`restBar_${idx}`);
  const val = document.getElementById(`restVal_${idx}`);

  if (bar && val) {
    const remaining = state.restTimer.remaining;
    const duration = state.restTimer.duration;
    const progress = ((duration - remaining) / duration) * 100;

    bar.style.width = `${progress}%`;
    val.textContent = formatTime(remaining);

    val.className = 'c-rest-val';
    if (remaining <= 10 && remaining > 0) val.classList.add('warning');
    if (remaining === 0) val.classList.add('finished');
  }
}

function startRestTimer(exerciseIndex, duration) {
  if (state.restTimer.interval) {
    clearInterval(state.restTimer.interval);
  }

  state.restTimer.active = true;
  state.restTimer.remaining = duration;
  state.restTimer.duration = duration;
  state.restTimer.exerciseIndex = exerciseIndex;

  state.restTimer.interval = setInterval(() => {
    if (state.restTimer.remaining > 0) {
      state.restTimer.remaining--;
      updateRestTimerUI();
    } else {
      stopRestTimer();
      playNotificationSound();
      showToast('⏱️', '¡Descanso terminado! Siguiente rep!');
      renderContent(); // Forzamos un render para que vuelva a mostrar los botones inactivos
    }
  }, 1000);

  // Renderizamos de inmediato para que muestre el estado activo (la barra)
  renderContent();
}

function stopRestTimer() {
  if (state.restTimer.interval) clearInterval(state.restTimer.interval);
  state.restTimer.active = false;
  state.restTimer.interval = null;
}

function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.5);
  } catch (e) { }
}



// ── Workout Summary & Feedback ──
function renderWorkoutSummary(day, totalSets, completedCount) {
  const allDone = completedCount === totalSets;
  const feedbackSaved = localStorage.getItem(`feedback_day_${state.currentDay}_${new Date().toDateString()}`);
  const isVacío = state.currentView === 'empty_workout' || state.emptyWorkout.active;

  // Contar PRs de la sesión actual
  const prCount = day.exercises.reduce((acc, ex, i) => {
    const key = isVacío ? `empty_ex${i}` : `day${state.currentDay}_ex${i}`;
    const sets = state.completedSets[key] || [];
    return acc + sets.filter(s => s && s.isPR).length;
  }, 0);

  return `
    <div class="workout-summary ${allDone ? 'completed' : ''}" id="workoutSummary">
      <h3>${allDone ? '🎉 ¡Entrenamiento completado!' : '📊 Resumen del entrenamiento'}</h3>
      <div class="summary-stats">
        <div class="summary-stat">
          <div class="summary-stat-value">${completedCount}</div>
          <div class="summary-stat-label">Series hechas</div>
        </div>
        <div class="summary-stat">
          <div class="summary-stat-value">${totalSets - completedCount}</div>
          <div class="summary-stat-label">Series restantes</div>
        </div>
        <div class="summary-stat">
          <div class="summary-stat-value">${prCount > 0 ? '🏅 ' + prCount : '0'}</div>
          <div class="summary-stat-label">${prCount > 0 ? 'PRs batidos' : 'PRs'}</div>
        </div>
        <div class="summary-stat">
          <div class="summary-stat-value" id="summaryTime">${formatTime(state.sessionElapsed)}</div>
          <div class="summary-stat-label">Tiempo</div>
        </div>
      </div>
      <button class="finish-workout-btn" onclick="finishWorkout()" style="margin-top: 24px;">
          ✅ Finalizar Entrenamiento
      </button>
      <button class="finish-workout-btn" onclick="resetWorkout()" style="margin-top: 12px; background: var(--bg-surface); color: var(--text-secondary); border: 1px solid var(--border-subtle); box-shadow: none;">
        🗑️ Descartar entreno
      </button>
    </div>
  `;
}

function finishWorkout() {
  const isVacío = state.currentView === 'empty_workout';
  const day = isVacío ? { title: state.emptyWorkout.name, exercises: state.emptyWorkout.exercises } : state.routine.days[state.currentDay];

  // Calcular datos de la sesión
  const totalVolume = getCurrentSessionVolume();
  const totalSets = getCurrentSessionSets();
  const totalPRs = day.exercises.reduce((acc, ex, i) => {
    const key = isVacío ? `empty_ex${i}` : `day${state.currentDay}_ex${i}`;
    const sets = state.completedSets[key] || [];
    return acc + sets.filter(s => s.isPR).length;
  }, 0);

  // Ejercicios completados
  const completedExercises = day.exercises.filter((ex, i) => {
    const key = isVacío ? `empty_ex${i}` : `day${state.currentDay}_ex${i}`;
    const sets = state.completedSets[key] || [];
    return sets.length > 0 && sets.every(s => s.done);
  }).length;

  // Recopilar detalle de los ejercicios realizados
  const exercisesPerformance = {};
  const exercisesList = [];

  day.exercises.forEach((ex, i) => {
    const key = isVacío ? `empty_ex${i}` : `day${state.currentDay}_ex${i}`;
    const sets = state.completedSets[key] || [];
    const doneSets = sets.filter(s => s && s.done).map(s => ({...s})); // clonar series hechas
    
    if (doneSets.length > 0) {
      exercisesPerformance[ex.exerciseId] = doneSets; // para el historial rápido (prevPerf)
      exercisesList.push({
        exerciseId: ex.exerciseId,
        name: EXERCISE_DB[ex.exerciseId]?.name || 'Ejercicio',
        sets: doneSets
      });
    }
  });

  // Guardar datos temporales para el resumen
  state.postWorkout.sessionData = {
    name: day.title,
    duration: state.sessionElapsed,
    volume: totalVolume,
    sets: totalSets,
    prs: totalPRs,
    exercisesCompleted: completedExercises,
    totalExercises: day.exercises.length,
    isVacío,
    exercisesPerformance,
    exercisesList
  };
  state.postWorkout.active = true;
  state.postWorkout.feedback = null;
  state.postWorkout.notes = '';

  // Mostrar vista de resumen post-entreno
  state.currentView = 'post_workout';
  renderApp();
  hapticFeedback('success');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function submitPostWorkout() {
  const session = state.postWorkout.sessionData;
  if (!session) { navigateHome(); return; }

  // Guardar en historial
  const sessionRecord = {
    date: new Date().toISOString(),
    name: session.name,
    duration: session.duration,
    volume: session.volume,
    sets: session.sets,
    prs: session.prs,
    feedback: state.postWorkout.feedback,
    notes: state.postWorkout.notes,
    exercisesPerformance: session.exercisesPerformance || {},
    exercisesList: session.exercisesList || []
  };

  state.history.push(sessionRecord);
  state.userProfile.totalWorkouts++;
  state.workoutMinimized = false;

  showToast('💾', 'Entrenamiento guardado en Inicio');

  // Resetear y volver al inicio
  setTimeout(() => {
    resetWorkout(true);
    navigateHome();
  }, 1000);
}

function renderPostWorkout() {
  const session = state.postWorkout.sessionData;
  if (!session) { navigateHome(); return; }

  const main = document.getElementById('mainContent');
  const feedbackOptions = [
    { type: 'facil', emoji: '🥱', label: 'Fácil', color: '#34c759' },
    { type: 'normal', emoji: '👍', label: 'Normal', color: '#007aff' },
    { type: 'intenso', emoji: '🔥', label: 'Intenso', color: '#ff9500' },
    { type: 'mortal', emoji: '💀', label: 'Mortal', color: '#ff3b30' }
  ];

  main.innerHTML = `
    <div class="home-screen">
      <!-- Header del resumen -->
      <div style="padding: 20px 16px; background: var(--bg-surface); border-bottom: 0.5px solid rgba(0,0,0,0.05); text-align:center;">
        <div style="font-size:2.5rem; margin-bottom:8px;">🎉</div>
        <h2 style="font-size:1.2rem; font-weight:800; margin-bottom:4px;">¡Entrenamiento Completado!</h2>
        <p style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">${session.name}</p>
      </div>

      <!-- Stats Grid -->
      <div style="padding: 16px;">
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:16px;">
          <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--accent-primary);">${formatTime(session.duration)}</div>
            <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; margin-top:4px; font-weight:600;">Duración</div>
          </div>
          <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--text-primary);">${session.sets}</div>
            <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; margin-top:4px; font-weight:600;">Series</div>
          </div>
          <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--text-primary);">${session.volume >= 1000 ? (session.volume / 1000).toFixed(1) + 't' : session.volume + 'kg'}</div>
            <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; margin-top:4px; font-weight:600;">Volumen</div>
          </div>
          <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--pr-color);">${session.prs > 0 ? '🏅 ' + session.prs : '0'}</div>
            <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; margin-top:4px; font-weight:600;">PRs</div>
          </div>
        </div>

        <!-- Progreso -->
        <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-md); margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <span style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Progreso</span>
            <span style="font-size:0.7rem; color:var(--text-primary); font-weight:700;">${session.exercisesCompleted}/${session.totalExercises}</span>
          </div>
          <div style="width:100%; height:6px; background:var(--bg-elevated); border-radius:3px; overflow:hidden;">
            <div style="width:${(session.exercisesCompleted / session.totalExercises) * 100}%; height:100%; background:var(--accent-gradient); border-radius:3px;"></div>
          </div>
        </div>

        <!-- Feedback -->
        <h3 style="font-size:0.75rem; font-weight:700; text-transform:uppercase; margin:20px 0 12px; color:var(--text-muted); letter-spacing:0.5px;">¿Cómo te has sentido?</h3>
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:8px; margin-bottom:16px;">
          ${feedbackOptions.map(opt => `
            <div onclick="selectPostWorkoutFeedback('${opt.type}', this)" 
                 style="background:${state.postWorkout.feedback === opt.type ? opt.color + '15' : 'var(--bg-surface)'}; 
                        border:2px solid ${state.postWorkout.feedback === opt.type ? opt.color : 'transparent'}; 
                        border-radius:var(--radius-md); padding:12px 8px; text-align:center; cursor:pointer; transition:all 0.2s;">
              <div style="font-size:1.8rem; margin-bottom:4px;">${opt.emoji}</div>
              <div style="font-size:0.6rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">${opt.label}</div>
            </div>
          `).join('')}
        </div>

        <!-- Notas -->
        <textarea 
          onchange="state.postWorkout.notes = this.value"
          placeholder="Notas opcionales (sensaciones, molestias, etc.)..." 
          style="width:100%; padding:12px; background:var(--bg-surface); border:0.5px solid var(--border-subtle); border-radius:var(--radius-md); font-size:0.85rem; font-family:var(--font-family); resize:vertical; min-height:80px; color:var(--text-primary); margin-bottom:16px;"
        >${state.postWorkout.notes}</textarea>

        <!-- Botón guardar -->
        <button onclick="submitPostWorkout()" 
                style="width:100%; padding:16px; background:var(--accent-gradient); color:#fff; border:none; font-weight:700; font-size:0.9rem; cursor:pointer; text-transform:uppercase; border-radius:var(--radius-md); box-shadow:var(--accent-glow); margin-bottom:10px;">
          ✅ Guardar Entrenamiento
        </button>
        <button onclick="resetWorkout(true); navigateHome();" 
                style="width:100%; padding:14px; background:transparent; color:var(--text-muted); border:1px solid var(--border-subtle); font-weight:600; font-size:0.85rem; cursor:pointer; border-radius:var(--radius-md);">
          🔄 Descartar
        </button>
      </div>
    </div>
  `;
}

function selectPostWorkoutFeedback(type, element) {
  state.postWorkout.feedback = type;

  // Actualizar UI
  const parent = element.parentElement;
  parent.querySelectorAll('div').forEach(div => {
    div.style.borderColor = 'transparent';
    div.style.background = 'var(--bg-surface)';
  });

  const colors = { facil: '#34c759', normal: '#007aff', intenso: '#ff9500', mortal: '#ff3b30' };
  element.style.borderColor = colors[type];
  element.style.background = colors[type] + '15';

  hapticFeedback('light');
}

async function resetWorkout(skipConfirm = false) {
  if (!skipConfirm && !(await showCustomConfirm('¿Seguro que quieres descartar y cancelar este entrenamiento? (Se perderá el progreso de hoy)'))) return;

  const isVacío = state.currentView === 'empty_workout' || state.emptyWorkout.active;

  if (isVacío) {
    // Resetear entrenamiento vacío
    state.emptyWorkout.exercises.forEach((ex, i) => {
      const key = `empty_ex${i}`;
      if (state.completedSets[key]) {
        state.completedSets[key].forEach(s => {
          s.done = false;
          s.isPR = false;
        });
      }
    });
  } else {
    // Resetear entrenamiento normal
    const day = state.routine.days[state.currentDay];
    day.exercises.forEach((ex, i) => {
      const key = `day${state.currentDay}_ex${i}`;
      if (state.completedSets[key]) {
        state.completedSets[key].forEach(s => {
          s.done = false;
          s.isPR = false;
        });
      }
    });
  }

  pauseSession();
  state.sessionElapsed = 0;
  state.sessionStartTime = null;
  state.workoutMinimized = false;
  state.expandedExercise = null;
  state.expandedExerciseId = null;
  state.expandedInfo = null;
  state.previousView = null;
  state.previousDay = null;
  state.emptyWorkout.active = false;
  teardownMiniPlayer();
  stopRestTimer();

  // Si fue cancelado por el usuario, mandarlo al inicio
  if (!skipConfirm) {
    state.currentView = 'home';
    state.activeTab = 'inicio';
  }

  saveState();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Toasts (iOS Style) ──
function showToast(icon, message) {
  const container = document.getElementById('toastContainer');

  // Remove any existing toasts to prevent stacking
  const existingToasts = container.querySelectorAll('.toast');
  if (existingToasts.length > 2) {
    existingToasts[0].remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  // Haptic feedback for toast
  hapticFeedback('light');

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function formatTime(totalSeconds) {
  if (!totalSeconds) return '00:00';
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins >= 60) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ── Session Timer Logic ──
function startSession() {
  if (state.sessionActive) return;
  state.sessionActive = true;
  state.sessionStartTime = Date.now() - (state.sessionElapsed * 1000);
  saveState();

  if (state.sessionInterval) clearInterval(state.sessionInterval);
  state.sessionInterval = setInterval(() => {
    state.sessionElapsed = Math.floor((Date.now() - state.sessionStartTime) / 1000);
    const val = document.getElementById('sessionTimerValue');
    if (val) val.textContent = formatTime(state.sessionElapsed);
  }, 1000);
}

function pauseSession() {
  state.sessionActive = false;
  if (state.sessionInterval) {
    clearInterval(state.sessionInterval);
    state.sessionInterval = null;
  }
  saveState();
}

function setupSessionTimer() {
  if (state.sessionActive) {
    state.sessionActive = false;
    startSession();
  }
}

function renderAICoach(container) {
  const profile = state.userProfile;
  const history = state.history;

  let primaryInsight = "Analizando tus datos...";
  let subText = "Completa más entrenamientos para que pueda asesorarte mejor.";

  if (profile.goals === 'gain') {
    primaryInsight = "Enfoque en Superávit Calórico";
    subText = "Para ganar masa, asegura al menos 2g de proteína por kg. Tu objetivo es la sobrecarga progresiva.";
  } else if (profile.goals === 'lose') {
    primaryInsight = "Déficit y Actividad";
    subText = "Mantén las repeticiones altas y el descanso moderado. Prioriza la proteína para mantener el músculo.";
  } else if (profile.goals === 'strength') {
    primaryInsight = "Especialización en Fuerza";
    subText = "Descansa 3-5 min entre series. Calentamiento piramidal y foco en la técnica explosiva.";
  }

  const volumeTrend = history.length >= 2 ? (history[history.length - 1].volume > history[history.length - 2].volume ? 'en aumento 🚀' : 'estable ⚖️') : 'iniciando 🏃‍♂️';

  container.innerHTML = `
    <div class="home-screen">
       <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
          <button onclick="navigateBackFromSubview()" style="background:#000; border:none; color:#fff; width:36px; height:36px; border-radius:0; cursor:pointer; font-weight:900;">←</button>
          <h2 style="font-size:1.5rem; font-weight:900; text-transform:uppercase;">Coach IA</h2>
       </div>

       <div style="background:#fff; padding:24px; border:2px solid #000; border-radius:0; margin-bottom:20px; text-align:center;">
          <h4 style="color:#ff0000; font-size:0.8rem; letter-spacing:1px; margin-bottom:8px; font-weight:900;">ANÁLISIS DE HOY</h4>
          <h3 style="font-size:1.2rem; margin-bottom:10px; font-weight:900;">${primaryInsight}</h3>
          <p style="font-size:0.85rem; color:#444; font-weight:700; line-height:1.4;">"${subText}"</p>
       </div>

       <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:25px;">
          <div style="background:#f9f9f9; border:1px solid #000; padding:15px; border-radius:0;">
             <span style="font-size:0.7rem; color:#000; text-transform:uppercase; font-weight:900;">TENDENCIA</span>
             <div style="font-size:0.9rem; font-weight:900; margin-top:5px;">${volumeTrend}</div>
          </div>
          <div style="background:#f9f9f9; border:1px solid #000; padding:15px; border-radius:0;">
             <span style="font-size:0.7rem; color:#000; text-transform:uppercase; font-weight:900;">PROTEÍNA</span>
             <div style="font-size:0.9rem; font-weight:900; margin-top:5px;">${(profile.weight * 2).toFixed(1)}g / día</div>
          </div>
       </div>

       <h3 style="font-weight:900; text-transform:uppercase;">RECOMENDACIONES</h3>
       <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
          <div class="history-card" style="padding:15px; border-radius:0; border:1px solid #000; background:#fff;">
             <div style="font-size:0.85rem; font-weight:900; margin-bottom:5px; text-transform:uppercase; color:#ff0000;">RECUPERACIÓN</div>
             <p style="font-size:0.75rem; color:#000; font-weight:700;">Recuerda la hidratación inteligente y el sueño de calidad para optimizar tus hormonas.</p>
          </div>
          <div class="history-card" style="padding:15px; border-radius:0; border:1px solid #000; background:#fff;">
             <div style="font-size:0.85rem; font-weight:900; margin-bottom:5px; text-transform:uppercase; color:#ff0000;">NUTRICIÓN POST</div>
             <p style="font-size:0.75rem; color:#000; font-weight:700;">Combina hidratos de carbono y proteína tras el entreno para restaurar el glucógeno.</p>
          </div>
       </div>
       
       <button onclick="showToast('ATENCIÓN', 'MODELO ACTUALIZADO CON TUS DATOS')" style="width:100%; margin-top:20px; padding:15px; background:#000; border:none; color:#fff; border-radius:0; font-weight:900; font-size:0.9rem; cursor:pointer; text-transform:uppercase;">RE-ANALIZAR PERFIL</button>

       <h3 style="font-weight:900; text-transform:uppercase; margin-bottom:10px; margin-top:30px;">CHAT CON IA (NUTRICIÓN & RUTINA)</h3>
       <div style="background:#fff; border:2px solid #000; display:flex; flex-direction:column; height:350px;">
          <div id="iaChatWindow" style="flex:1; padding:15px; overflow-y:auto; display:flex; flex-direction:column; gap:10px; background:#f9f9f9;">
             ${(state.chatHistory || []).map(msg => `
                <div style="align-self:${msg.role === 'user' ? 'flex-end' : 'flex-start'}; background:${msg.role === 'user' ? '#000' : '#fff'}; color:${msg.role === 'user' ? '#fff' : '#000'}; border:2px solid #000; padding:10px; max-width:85%; font-size:0.8rem; font-weight:900;">
                   ${msg.text}
                </div>
             `).join('')}
             ${!(state.chatHistory && state.chatHistory.length > 0) ? `
                <div style="align-self:flex-start; background:#fff; color:#000; border:2px solid #000; padding:10px; max-width:85%; font-size:0.8rem; font-weight:900;">
                   HOLA. SOY TU IA. PREGÚNTAME SOBRE RUTINAS, TÉCNICA O DIETA.
                </div>
             ` : ''}
          </div>
          <div style="display:flex; border-top:2px solid #000;">
             <input type="text" id="iaChatInput" placeholder="PREGUNTA ALGO..." style="flex:1; border:none; padding:15px; background:#fff; color:#000; outline:none; font-weight:900; font-size:0.8rem;">
             <button onclick="sendIAChatMessage()" style="background:#ff0000; color:#fff; border:none; border-left:2px solid #000; padding:0 20px; font-weight:900; cursor:pointer;">ENVIAR</button>
          </div>
       </div>

    </div>
  `;
}

window.sendIAChatMessage = function () {
  const input = document.getElementById('iaChatInput');
  const text = input.value.trim();
  if (!text) return;

  if (!state.chatHistory) state.chatHistory = [];
  state.chatHistory.push({ role: 'user', text: text.toUpperCase() });
  input.value = '';
  saveState();
  renderApp();

  setTimeout(() => {
    const el = document.getElementById('iaChatWindow');
    if (el) el.scrollTop = el.scrollHeight;
  }, 50);

  setTimeout(() => {
    let lowerText = text.toLowerCase();

    const greetings = ["¡Ojo! ", "Te entiendo, ", "Vale, mira: ", "Por supuesto. ", "Escucha: "];
    const closures = [" ¿Te queda claro?", " ¡Cualquier duda, dímela!", " Dale duro a eso.", " Pruébalo tú mismo hoy.", " Ve a muerte con este detalle."];

    const g = greetings[Math.floor(Math.random() * greetings.length)];
    const c = closures[Math.floor(Math.random() * closures.length)];

    let core = "Interesante. Para que pueda hilar fino y darte la respuesta de tu vida, sé un poco más específico sobre de qué quieres hablar: grupos musculares concretos, macros o rutinas.";

    if (lowerText.includes('hola') || lowerText.includes('buenas') || lowerText.includes('hey')) {
      core = "¿Qué tal? Soy tu IA personal. Dime en qué puedo echarte un cable hoy: ¿rutinas nuevas, ajustes de dieta o alguna duda de técnica?";
    } else if (lowerText.includes('proteina') || lowerText.includes('dieta') || lowerText.includes('comer') || lowerText.includes('comida') || lowerText.includes('nutricion')) {
      core = "Sobre el aspecto nutricional: no te compliques en exceso. Apunta a 2g de proteína por kg de tu peso (ahora pesas " + state.userProfile.weight + "kg, serían unos " + (state.userProfile.weight * 2) + "g diarios). Empuja los hidratos a tu post-entrenamiento para ganar de verdad.";
    } else if (lowerText.includes('pecho') || lowerText.includes('press')) {
      core = "Para que te crezca el pectoral de verdad, olvídate de subir kilos a lo loco y rebotar la barra. Retrae escápulas hacia abajo en el banco y baja la barra lento durante 3 segundos. Siente ese estiramiento.";
    } else if (lowerText.includes('pierna') || lowerText.includes('sentadilla') || lowerText.includes('prensa') || lowerText.includes('inferior') || lowerText.includes('gluteo') || lowerText.includes('femoral')) {
      core = "Las piernas hay que trabajarlas con brutalidad calculada. Rangos de 8 a 15, acercándote al fallo donde ya no puedes sacar otra más sin perder la postura. En Sentadilla, descansa tus 3 minutazos sin prisa.";
    } else if (lowerText.includes('peso') || lowerText.includes('adelgazar') || lowerText.includes('grasa') || lowerText.includes('definicion')) {
      core = "Para cortar grasa la magia no es correr 2 horas... es clavar tu déficit calórico usando mi sección de Nutrición, y entrenar pesadísimo. Necesitas conservar el músculo dándole un motivo de peso (literal) para quedarse.";
    } else if (lowerText.includes('espalda') || lowerText.includes('remo') || lowerText.includes('dominadas') || lowerText.includes('jalon')) {
      core = "El mayor truco de hipertrofia para espalda: no tires de los bíceps. Piensa en clavar el codo hacia tus caderas como ganchos. En polea, saca el pecho al final del movimiento para una máxima activación del dorsal.";
    } else if (lowerText.includes('brazo') || lowerText.includes('bicep') || lowerText.includes('tricep') || lowerText.includes('antebrazo')) {
      core = "Estos cabrones son pequeños y toleran mucha frecuencia. Dale caña 2 o 3 veces por semana. Y recuerda, la cabeza larga del tríceps es el 70% del brazo: trabájalo haciendo extensiones altas por encima de la cabeza.";
    } else if (lowerText.includes('rutina') || lowerText.includes('entrenar') || lowerText.includes('entrenamiento')) {
      core = "Si estás atascado y necesitas que te cuadre todas las variables, entra en Inicio -> Nueva Rutina y pulsa 'IA PRESET'. Te voy a escupir una bestialidad de mesociclo según tu objetivo exacto.";
    }

    let finalReply = (core.startsWith("Interesante") || core.startsWith("¿Qué tal")) ? core : (g + core + c);

    state.chatHistory.push({ role: 'ai', text: finalReply.toUpperCase() });
    saveState();
    renderApp();

    setTimeout(() => {
      const windowEl = document.getElementById('iaChatWindow');
      if (windowEl) windowEl.scrollTop = windowEl.scrollHeight;
    }, 50);
  }, 1200 + Math.random() * 800); // 1.2 to 2 sec delay for human response thinking feel
}

function renderNutrition(container) {
  const profile = state.userProfile;
  const weight = parseFloat(profile.weight) || 75;
  const height = parseFloat(profile.height) || 175;
  const age = parseInt(profile.age) || 25;

  // Fórmula Mifflin-St Jeor para TMB
  const tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  // Multiplicador actividad moderada/alta asumiendo que entrenan
  let tdee = tmb * 1.55;

  let targetCals = tdee;
  let split = { p: 30, c: 40, f: 30 };

  if (profile.goals === 'gain') {
    targetCals = tdee + 400; // Superávit
    split = { p: 25, c: 50, f: 25 }; // Más carbohidratos
  } else if (profile.goals === 'lose') {
    targetCals = tdee - 500; // Déficit
    split = { p: 40, c: 30, f: 30 }; // Más proteína
  } else {
    targetCals = tdee; // Mantenimiento
    split = { p: 30, c: 40, f: 30 };
  }

  const pGrams = Math.round((targetCals * (split.p / 100)) / 4);
  const cGrams = Math.round((targetCals * (split.c / 100)) / 4);
  const fGrams = Math.round((targetCals * (split.f / 100)) / 9);

  container.innerHTML = `
    <div class="home-screen">
       <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
          <button onclick="navigateBackFromSubview()" style="background:#000; border:none; color:#fff; width:36px; height:36px; border-radius:0; cursor:pointer; font-weight:900;">←</button>
          <h2 style="font-size:1.5rem; font-weight:900; text-transform:uppercase;">NUTRICIÓN E IA</h2>
       </div>

       <div style="background:#fff; border:2px solid #000; padding:20px; text-align:center; margin-bottom:20px;">
          <h4 style="color:#ff0000; font-size:0.8rem; font-weight:900; margin-bottom:5px;">OBJETIVO DIARIO (KCAL)</h4>
          <div style="font-size:3rem; font-weight:900;">${Math.round(targetCals)}</div>
          <p style="font-size:0.75rem; font-weight:900; color:#555; margin-top:5px; text-transform:uppercase;">Calculado para ${profile.weight}kg</p>
       </div>

       <h3 style="font-weight:900; text-transform:uppercase; margin-bottom:10px;">MACROS CLAVE</h3>
       <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:25px;">
          <div style="background:#f9f9f9; border:1px solid #000; padding:15px; text-align:center;">
             <div style="font-size:0.7rem; font-weight:900; color:#ff0000;">PROT</div>
             <div style="font-size:1.2rem; font-weight:900; margin-top:5px;">${pGrams}g</div>
          </div>
          <div style="background:#f9f9f9; border:1px solid #000; padding:15px; text-align:center;">
             <div style="font-size:0.7rem; font-weight:900; color:#ff0000;">CARB</div>
             <div style="font-size:1.2rem; font-weight:900; margin-top:5px;">${cGrams}g</div>
          </div>
          <div style="background:#f9f9f9; border:1px solid #000; padding:15px; text-align:center;">
             <div style="font-size:0.7rem; font-weight:900; color:#ff0000;">GRAS</div>
             <div style="font-size:1.2rem; font-weight:900; margin-top:5px;">${fGrams}g</div>
          </div>
       </div>

       <h3 style="font-weight:900; text-transform:uppercase; margin-bottom:10px;">ESTRATEGIA RECOMENDADA</h3>
       <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="border:1px solid #000; background:#fff; padding:15px;">
             <div style="font-weight:900; color:#ff0000; margin-bottom:5px;">PRE-ENTRENO (1-2H ANTES)</div>
             <p style="font-size:0.8rem; color:#000; font-weight:700;">Carbohidratos de ratio rápido + Proteína ligera. Ejemplo: Plátano/fruta con scoop de proteína o crema de arroz.</p>
          </div>
          <div style="border:1px solid #000; background:#fff; padding:15px;">
             <div style="font-weight:900; color:#ff0000; margin-bottom:5px;">POST-ENTRENO / COMIDA FUERTE</div>
             <p style="font-size:0.8rem; color:#000; font-weight:700;">Mayor ingesta del día. Integra aprox. ${Math.round(cGrams * 0.4)}g de carbohidratos (arroces/pasta) y ${Math.round(pGrams * 0.4)}g de proteína animal/soja para reconstrucción de glucógeno.</p>
          </div>
       </div>
    </div>
  `;
}
