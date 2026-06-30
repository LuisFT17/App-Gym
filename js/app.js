// ============================================================
// GymCoach - Lógica Principal de la Aplicación
// ============================================================

// ── Base de Datos de Alimentos (por 100g) ─
const FOOD_DB = [
  // CARNES
  { id: 'chicken_breast', name: 'Pechuga de pollo', kcal: 165, p: 31, c: 0, f: 3.6, icon: '' },
  { id: 'chicken_thigh', name: 'Muslo de pollo', kcal: 177, p: 26, c: 0, f: 8, icon: '' },
  { id: 'chicken_wing', name: 'Alitas de pollo', kcal: 203, p: 30, c: 0, f: 8, icon: '' },
  { id: 'turkey_breast', name: 'Pechuga de pavo', kcal: 135, p: 30, c: 0, f: 1, icon: '' },
  { id: 'beef_steak', name: 'Filete de ternera', kcal: 250, p: 26, c: 0, f: 15, icon: '' },
  { id: 'beef_mince', name: 'Carne picada ternera', kcal: 250, p: 26, c: 0, f: 15, icon: '' },
  { id: 'pork_loin', name: 'Lomo de cerdo', kcal: 143, p: 26, c: 0, f: 3.5, icon: '' },
  { id: 'pork_ribs', name: 'Costillas de cerdo', kcal: 277, p: 24, c: 0, f: 19, icon: '' },
  { id: 'lamb', name: 'Cordero', kcal: 294, p: 25, c: 0, f: 21, icon: '' },
  { id: 'bacon', name: 'Bacon', kcal: 541, p: 37, c: 1.4, f: 42, icon: '' },
  { id: 'ham_serrano', name: 'Jamón serrano', kcal: 240, p: 32, c: 0, f: 12, icon: '' },
  { id: 'ham_york', name: 'Jamón York', kcal: 100, p: 18, c: 1, f: 2.5, icon: '' },

  // PESCADO Y MARISCO
  { id: 'tuna', name: 'Atún en agua', kcal: 116, p: 26, c: 0, f: 1, icon: '' },
  { id: 'tuna_oil', name: 'Atún en aceite', kcal: 198, p: 29, c: 0, f: 8, icon: '' },
  { id: 'salmon', name: 'Salmón', kcal: 208, p: 20, c: 0, f: 13, icon: '' },
  { id: 'hake', name: 'Merluza', kcal: 80, p: 17, c: 0, f: 1, icon: '' },
  { id: 'cod', name: 'Bacalao', kcal: 82, p: 18, c: 0, f: 0.7, icon: '' },
  { id: 'sardine', name: 'Sardinas', kcal: 208, p: 25, c: 0, f: 11, icon: '' },
  { id: 'shrimp', name: 'Gambas/Langostinos', kcal: 99, p: 24, c: 0.2, f: 0.3, icon: '' },
  { id: 'octopus', name: 'Pulpo', kcal: 82, p: 15, c: 2, f: 1, icon: '' },
  { id: 'squid', name: 'Calamares', kcal: 92, p: 16, c: 3, f: 1.4, icon: '' },
  { id: 'sea_bass', name: 'Lubina', kcal: 97, p: 18, c: 0, f: 2, icon: '' },

  // HUEVOS Y LÁCTEOS
  { id: 'egg', name: 'Huevo entero', kcal: 155, p: 13, c: 1.1, f: 11, icon: '' },
  { id: 'egg_white', name: 'Clara de huevo', kcal: 52, p: 11, c: 0.7, f: 0.2, icon: '' },
  { id: 'milk_whole', name: 'Leche entera', kcal: 61, p: 3.2, c: 4.8, f: 3.3, icon: '' },
  { id: 'milk_skim', name: 'Leche desnatada', kcal: 34, p: 3.4, c: 5, f: 0.1, icon: '' },
  { id: 'yogurt_greek', name: 'Yogur griego 0%', kcal: 59, p: 10, c: 3.6, f: 0.4, icon: '' },
  { id: 'yogurt_natural', name: 'Yogur natural', kcal: 61, p: 3.5, c: 4.7, f: 3.3, icon: '' },
  { id: 'cheese_fresh', name: 'Queso fresco', kcal: 170, p: 11, c: 3, f: 12, icon: '' },
  { id: 'cheese_manchego', name: 'Queso Manchego', kcal: 390, p: 25, c: 0, f: 32, icon: '' },
  { id: 'cheese_cottage', name: 'Queso Cottage', kcal: 98, p: 11, c: 3.4, f: 4.3, icon: '' },
  { id: 'mozzarella', name: 'Mozzarella', kcal: 280, p: 22, c: 2.2, f: 20, icon: '' },
  { id: 'butter', name: 'Mantequilla', kcal: 717, p: 0.9, c: 0.1, f: 81, icon: '' },

  // FRUTAS
  { id: 'banana', name: 'Plátano', kcal: 89, p: 1.1, c: 23, f: 0.3, icon: '' },
  { id: 'apple', name: 'Manzana', kcal: 52, p: 0.3, c: 14, f: 0.2, icon: '' },
  { id: 'orange', name: 'Naranja', kcal: 47, p: 0.9, c: 12, f: 0.1, icon: '' },
  { id: 'strawberry', name: 'Fresas', kcal: 32, p: 0.7, c: 8, f: 0.3, icon: '' },
  { id: 'blueberry', name: 'Arándanos', kcal: 57, p: 0.7, c: 14, f: 0.3, icon: '' },
  { id: 'watermelon', name: 'Sandía', kcal: 30, p: 0.6, c: 8, f: 0.2, icon: '' },
  { id: 'grape', name: 'Uvas', kcal: 69, p: 0.7, c: 18, f: 0.2, icon: '' },
  { id: 'kiwi', name: 'Kiwi', kcal: 61, p: 1.1, c: 15, f: 0.5, icon: '' },
  { id: 'pineapple', name: 'Piña', kcal: 50, p: 0.5, c: 13, f: 0.1, icon: '' },
  { id: 'avocado', name: 'Aguacate', kcal: 160, p: 2, c: 9, f: 15, icon: '' },

  // VERDURAS Y HORTALIZAS
  { id: 'broccoli', name: 'Brócoli', kcal: 34, p: 2.8, c: 7, f: 0.4, icon: '' },
  { id: 'spinach', name: 'Espinacas', kcal: 23, p: 2.9, c: 3.6, f: 0.4, icon: '' },
  { id: 'tomato', name: 'Tomate', kcal: 18, p: 0.9, c: 3.9, f: 0.2, icon: '' },
  { id: 'cucumber', name: 'Pepino', kcal: 15, p: 0.7, c: 3.6, f: 0.1, icon: '' },
  { id: 'lettuce', name: 'Lechuga', kcal: 15, p: 1.4, c: 2.9, f: 0.2, icon: '' },
  { id: 'carrot', name: 'Zanahoria', kcal: 41, p: 0.9, c: 10, f: 0.2, icon: '' },
  { id: 'pepper', name: 'Pimiento', kcal: 20, p: 0.9, c: 4.6, f: 0.2, icon: '' },
  { id: 'onion', name: 'Cebolla', kcal: 40, p: 1.1, c: 9, f: 0.1, icon: '' },
  { id: 'mushroom', name: 'Champiñones', kcal: 22, p: 3.1, c: 3.3, f: 0.3, icon: '' },
  { id: 'zucchini', name: 'Calabacín', kcal: 17, p: 1.2, c: 3.1, f: 0.3, icon: '' },
  { id: 'eggplant', name: 'Berenjena', kcal: 25, p: 1, c: 6, f: 0.2, icon: '' },
  { id: 'green_beans', name: 'Judías verdes', kcal: 31, p: 1.8, c: 7, f: 0.2, icon: '' },
  { id: 'asparagus', name: 'Espárragos', kcal: 20, p: 2.2, c: 3.9, f: 0.1, icon: '' },

  // LEGUMBRES Y CEREALES
  { id: 'rice_white', name: 'Arroz blanco cocido', kcal: 130, p: 2.7, c: 28, f: 0.3, icon: '' },
  { id: 'rice_brown', name: 'Arroz integral', kcal: 111, p: 2.6, c: 23, f: 0.9, icon: '' },
  { id: 'pasta', name: 'Pasta cocida', kcal: 131, p: 5, c: 25, f: 1.1, icon: '' },
  { id: 'potato', name: 'Patata cocida', kcal: 87, p: 1.9, c: 20, f: 0.1, icon: '' },
  { id: 'sweet_potato', name: 'Boniatos', kcal: 86, p: 1.6, c: 20, f: 0.1, icon: '' },
  { id: 'oats', name: 'Avena', kcal: 389, p: 16.9, c: 66, f: 6.9, icon: '' },
  { id: 'bread', name: 'Pan integral', kcal: 247, p: 13, c: 41, f: 3.4, icon: '' },
  { id: 'bread_white', name: 'Pan blanco', kcal: 265, p: 9, c: 49, f: 3.2, icon: '' },
  { id: 'lentils', name: 'Lentejas cocidas', kcal: 116, p: 9, c: 20, f: 0.4, icon: '' },
  { id: 'chickpeas', name: 'Garbanzos', kcal: 164, p: 8.9, c: 27, f: 2.6, icon: '' },
  { id: 'beans', name: 'Frijoles negros', kcal: 132, p: 8.9, c: 24, f: 0.5, icon: '' },
  { id: 'quinoa', name: 'Quinoa cocida', kcal: 120, p: 4.4, c: 21, f: 1.9, icon: '' },
  { id: 'corn', name: 'Maíz dulce', kcal: 96, p: 3.4, c: 21, f: 1.5, icon: '' },

  // FRUTOS SECOS Y SNACKS
  { id: 'almonds', name: 'Almendras', kcal: 579, p: 21, c: 22, f: 50, icon: '' },
  { id: 'walnuts', name: 'Nueces', kcal: 654, p: 15, c: 14, f: 65, icon: '' },
  { id: 'peanuts', name: 'Cacahuetes', kcal: 567, p: 26, c: 16, f: 49, icon: '' },
  { id: 'cashews', name: 'Anacardos', kcal: 553, p: 18, c: 30, f: 44, icon: '' },
  { id: 'peanut_butter', name: 'Crema de cacahuete', kcal: 588, p: 25, c: 20, f: 50, icon: '' },
  { id: 'dark_chocolate', name: 'Chocolate negro 85%', kcal: 598, p: 7.8, c: 46, f: 43, icon: '' },
  { id: 'protein_bar', name: 'Barrita proteica', kcal: 350, p: 20, c: 40, f: 12, icon: '' },
  { id: 'rice_cakes', name: 'Tortitas de arroz', kcal: 387, p: 8, c: 82, f: 3, icon: '' },

  // GRASAS Y ACEITES
  { id: 'olive_oil', name: 'Aceite de oliva', kcal: 884, p: 0, c: 0, f: 100, icon: '' },
  { id: 'coconut_oil', name: 'Aceite de coco', kcal: 862, p: 0, c: 0, f: 100, icon: '' },
  { id: 'honey', name: 'Miel', kcal: 304, p: 0.3, c: 82, f: 0, icon: '' },
  { id: 'jam', name: 'Mermelada', kcal: 250, p: 0.4, c: 65, f: 0, icon: '' },

  // BEBIDAS Y SUPLEMENTOS
  { id: 'protein_powder', name: 'Proteína en polvo (scoop)', kcal: 120, p: 24, c: 3, f: 1.5, icon: '' },
  { id: 'creatine', name: 'Creatina (5g)', kcal: 0, p: 0, c: 0, f: 0, icon: '' },
  { id: 'coke', name: 'Coca-Cola', kcal: 42, p: 0, c: 11, f: 0, icon: '' },
  { id: 'beer', name: 'Cerveza', kcal: 43, p: 0.5, c: 3.6, f: 0, icon: '' },
  { id: 'wine', name: 'Vino tinto', kcal: 85, p: 0.1, c: 2.6, f: 0, icon: '' },
  { id: 'orange_juice', name: 'Zumo de naranja', kcal: 45, p: 0.7, c: 10, f: 0.2, icon: '' }
];

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
  activeTab: 'entreno',    // 'inicio' | 'entreno' | 'perfil' | 'misiones' | 'nutricion'
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
  programsCollapsed: false,
  routinesCollapsed: false,
  userRegistered: false,
  userName: '',

  // Post-workout summary
  postWorkout: {
    active: false,
    feedback: null,
    notes: '',
    sessionData: null
  },

  // Avatar gamificado
  avatar: {
    level: 1,
    xp: 0,
    muscles: {
      chest: { volume: 0, growth: 0 },
      back: { volume: 0, growth: 0 },
      legs: { volume: 0, growth: 0 },
      arms: { volume: 0, growth: 0 },
      shoulders: { volume: 0, growth: 0 }
    },
    accessories: [],
    levelUpTriggered: false
  },

  // Nutrición Tracker
  nutritionLog: [], // [{date: 'YYYY-MM-DD', name: '', kcal: 0, p: 0, c: 0, f: 0}]
  nutritionSelectedDate: new Date().toISOString().split('T')[0],
  selectedFood: null
};

// ── Inicialización ──
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is registered
  const savedUser = localStorage.getItem('gymcoach_user');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      state.userRegistered = true;
      state.userName = user.name || '';
      state.userProfile.goals = user.goals || 'gain';
      state.userProfile.joinedDate = user.joinedDate || new Date().toISOString();
    } catch (e) {
      console.error('Error parsing user data:', e);
    }
  }

  if (!state.userRegistered) {
    renderRegister();
    return;
  }

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
  window.openExerciseExplorer = openExerciseExplorer;
  window.closeExerciseExplorer = closeExerciseExplorer;
  window.setChartMetric = setChartMetric;
  window.toggleRoutineMenu = toggleRoutineMenu;
  window.shareRoutine = shareRoutine;
  window.editRoutine = editRoutine;
  window.deleteRoutine = deleteRoutine;
  window.toggleHistoryMenu = toggleHistoryMenu;
  window.shareWorkout = shareWorkout;
  window.copyWorkout = copyWorkout;
  window.editWorkout = editWorkout;
  window.deleteWorkout = deleteWorkout;
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
  window.exportData = exportData;
  window.loadTemplateRoutine = loadTemplateRoutine;
  window.openProgramDetail = openProgramDetail;
  window.closeProgramDetail = closeProgramDetail;
  window.toggleProgramsSection = toggleProgramsSection;
  window.openProgramSelector = openProgramSelector;
  window.closeProgramSelector = closeProgramSelector;
  window.toggleRoutinesSection = toggleRoutinesSection;
  window.submitRegistration = submitRegistration;
  window.enterGym = enterGym;
  window.selectGoal = selectGoal;

  // Add touch feedback for better mobile UX
  setupTouchFeedback();

  console.log('GymCoach initialized');
  renderWelcome();
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

// ── Pantalla de Registro ──
let selectedGoal = 'gain';

function renderRegister() {
  document.getElementById('appHeader').innerHTML = '';
  document.getElementById('mainContent').innerHTML = '';
  const existingNav = document.getElementById('bottomNav');
  if (existingNav) existingNav.remove();

  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div style="min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 24px; background:var(--bg-primary);">
      <div style="text-align:center; margin-bottom:40px;">
        <div style="width:64px; height:64px; background:var(--accent-gradient); border-radius:16px; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; box-shadow:var(--accent-glow);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M3 12h1m16 0h1M5.5 6.5v11M18.5 6.5v11"/><rect x="5.5" y="9" width="13" height="6" rx="1"/></svg>
        </div>
        <h1 style="font-size:1.8rem; font-weight:900; color:var(--text-primary); text-transform:uppercase; letter-spacing:-0.5px; margin:0;">GymCoach</h1>
        <p style="font-size:0.85rem; color:var(--text-muted); font-weight:500; margin-top:4px;">Tu entrenador personal</p>
      </div>

      <div style="width:100%; max-width:360px;">
        <label style="font-size:0.7rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:6px;">Tu nombre</label>
        <input id="regName" type="text" placeholder="¿Cómo te llamas?" maxlength="20" style="width:100%; padding:14px 16px; background:var(--bg-surface); border:1px solid var(--border-subtle); color:var(--text-primary); font-size:1rem; font-weight:600; border-radius:var(--radius-md); outline:none; font-family:var(--font-family); margin-bottom:24px;" />

        <label style="font-size:0.7rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:10px;">Tu objetivo</label>
        <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:24px;">
          <button onclick="selectGoal('gain')" id="goalGain" style="padding:14px 16px; background:${selectedGoal === 'gain' ? 'var(--accent-primary)' : 'var(--bg-surface)'}; color:${selectedGoal === 'gain' ? '#fff' : 'var(--text-primary)'}; border:1px solid ${selectedGoal === 'gain' ? 'var(--accent-primary)' : 'var(--border-subtle)'}; font-weight:700; font-size:0.85rem; cursor:pointer; border-radius:var(--radius-md); text-align:left; font-family:var(--font-family); transition:all 0.2s;">
            🏋️ Ganar Masa Muscular
          </button>
          <button onclick="selectGoal('lose')" id="goalLose" style="padding:14px 16px; background:${selectedGoal === 'lose' ? 'var(--accent-primary)' : 'var(--bg-surface)'}; color:${selectedGoal === 'lose' ? '#fff' : 'var(--text-primary)'}; border:1px solid ${selectedGoal === 'lose' ? 'var(--accent-primary)' : 'var(--border-subtle)'}; font-weight:700; font-size:0.85rem; cursor:pointer; border-radius:var(--radius-md); text-align:left; font-family:var(--font-family); transition:all 0.2s;">
            🔥 Perder Grasa
          </button>
          <button onclick="selectGoal('strength')" id="goalStrength" style="padding:14px 16px; background:${selectedGoal === 'strength' ? 'var(--accent-primary)' : 'var(--bg-surface)'}; color:${selectedGoal === 'strength' ? '#fff' : 'var(--text-primary)'}; border:1px solid ${selectedGoal === 'strength' ? 'var(--accent-primary)' : 'var(--border-subtle)'}; font-weight:700; font-size:0.85rem; cursor:pointer; border-radius:var(--radius-md); text-align:left; font-family:var(--font-family); transition:all 0.2s;">
            💪 Fuerza Pura
          </button>
        </div>

        <label style="font-size:0.7rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:6px;">Fecha de inicio</label>
        <input id="regDate" type="date" value="${new Date().toISOString().slice(0, 10)}" style="width:100%; padding:14px 16px; background:var(--bg-surface); border:1px solid var(--border-subtle); color:var(--text-primary); font-size:0.9rem; font-weight:600; border-radius:var(--radius-md); outline:none; font-family:var(--font-family); margin-bottom:32px;" />

        <button onclick="submitRegistration()" style="width:100%; padding:16px; background:var(--accent-gradient); color:#fff; border:none; font-weight:800; font-size:1rem; cursor:pointer; text-transform:uppercase; border-radius:var(--radius-md); box-shadow:var(--accent-glow); letter-spacing:0.5px; font-family:var(--font-family);">
          Comenzar
        </button>
      </div>
    </div>
  `;
}

function selectGoal(goal) {
  selectedGoal = goal;
  renderRegister();
}

function submitRegistration() {
  const name = document.getElementById('regName').value.trim();
  if (!name) {
    showToast('⚠️', 'Pon tu nombre para empezar');
    return;
  }

  const date = document.getElementById('regDate').value;

  state.userRegistered = true;
  state.userName = name;
  state.userProfile.goals = selectedGoal;
  state.userProfile.joinedDate = new Date(date).toISOString();

  localStorage.setItem('gymcoach_user', JSON.stringify({
    name: name,
    goals: selectedGoal,
    joinedDate: state.userProfile.joinedDate
  }));

  state.userProfile.goals = selectedGoal;
  saveState();
  renderWelcome();
}

// ── Pantalla de Bienvenida ──
function renderWelcome() {
  document.getElementById('appHeader').innerHTML = '';
  document.getElementById('mainContent').innerHTML = '';
  const existingNav = document.getElementById('bottomNav');
  if (existingNav) existingNav.remove();

  const hour = new Date().getHours();
  let greeting = 'Buenas noches';
  if (hour >= 6 && hour < 12) greeting = 'Buenos días';
  else if (hour >= 12 && hour < 20) greeting = 'Buenas tardes';

  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div style="min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 24px; background:var(--bg-primary);">
      <div style="text-align:center; margin-bottom:48px;">
        <div style="width:96px; height:96px; background:var(--bg-elevated); border-radius:50%; margin:0 auto 20px; display:flex; align-items:center; justify-content:center; border:3px solid var(--border-subtle);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); font-weight:500; margin-bottom:4px;">${greeting}</p>
        <h1 style="font-size:2rem; font-weight:900; color:var(--text-primary); text-transform:uppercase; letter-spacing:-0.5px; margin:0;">${state.userName}</h1>
      </div>

      ${state.history.length > 0 ? `
        <div style="width:100%; max-width:360px; margin-bottom:32px;">
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
            <div style="background:var(--bg-surface); padding:14px 10px; border-radius:var(--radius-md); text-align:center;">
              <div style="font-size:1.3rem; font-weight:800; color:var(--accent-primary);">${state.history.length}</div>
              <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; margin-top:2px;">Entrenos</div>
            </div>
            <div style="background:var(--bg-surface); padding:14px 10px; border-radius:var(--radius-md); text-align:center;">
              <div style="font-size:1.3rem; font-weight:800; color:var(--text-primary);">${state.userProfile.totalWorkouts > 0 ? state.userProfile.totalWorkouts : state.history.length}</div>
              <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; margin-top:2px;">Total</div>
            </div>
            <div style="background:var(--bg-surface); padding:14px 10px; border-radius:var(--radius-md); text-align:center;">
              <div style="font-size:1.3rem; font-weight:800; color:var(--text-primary);">${state.history.length > 0 ? formatTime(state.history[state.history.length - 1].duration) : '-'}</div>
              <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; margin-top:2px;">Último</div>
            </div>
          </div>
        </div>
      ` : ''}

      <div style="width:100%; max-width:360px;">
        <button onclick="enterGym()" style="width:100%; padding:18px; background:var(--accent-gradient); color:#fff; border:none; font-weight:800; font-size:1.1rem; cursor:pointer; text-transform:uppercase; border-radius:var(--radius-md); box-shadow:var(--accent-glow); letter-spacing:0.5px; font-family:var(--font-family); display:flex; align-items:center; justify-content:center; gap:10px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M3 12h1m16 0h1M5.5 6.5v11M18.5 6.5v11"/><rect x="5.5" y="9" width="13" height="6" rx="1"/></svg>
          Entrar al Gym
        </button>
      </div>

      <p style="font-size:0.65rem; color:var(--text-muted); margin-top:24px; font-weight:500;">Entrenando desde ${new Date(state.userProfile.joinedDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </div>
  `;
}

function enterGym() {
  // Load routine data if not already loaded
  if (!state.routine) {
    const savedState = localStorage.getItem('gymcoach_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.routine) state.routine = parsed.routine;
        if (parsed.prs) state.prs = parsed.prs;
        if (parsed.completedSets) state.completedSets = parsed.completedSets;
        if (parsed.history) state.history = parsed.history;
        if (parsed.userProfile) state.userProfile = { ...state.userProfile, ...parsed.userProfile };
        if (parsed.emptyWorkout) state.emptyWorkout = parsed.emptyWorkout;
        if (parsed.theme) state.theme = parsed.theme;
      } catch (e) {}
    }
    if (!state.routine) state.routine = JSON.parse(JSON.stringify(ROUTINE));
  }

  state.currentView = 'home';
  state.activeTab = 'entreno';
  renderApp();
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

  if (state.currentView === 'program_detail') {
    renderProgramDetail(main);
    return;
  }

  if (state.currentView === 'program_selector') {
    renderProgramSelector(main);
    return;
  }

  if (state.currentView === 'exercise_explorer') {
    renderExerciseExplorer(main);
    return;
  }

  if (state.activeTab === 'inicio') {
    renderInicio(main);
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
      else if (state.activeTab === 'misiones') renderMissions(main);
      else if (state.activeTab === 'nutricion') renderNutritionTab(main);
      else renderPerfil(main);
    }
  }
}

function renderBottomNav() {
  let wrapper = document.getElementById('bottomBar');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'bottomBar';
    wrapper.style.cssText = 'position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:480px; z-index:1000;';
    document.getElementById('app').appendChild(wrapper);
  }

  let nav = document.getElementById('bottomNav');
  if (!nav) {
    nav = document.createElement('nav');
    nav.id = 'bottomNav';
    nav.className = 'bottom-nav';
    wrapper.appendChild(nav);
  }

  // Show or hide mini-player depending on whether a session is running outside the workout view
  const isInWorkout = (state.currentView === 'workout' || state.currentView === 'empty_workout');
  if (state.sessionActive && !isInWorkout) {
    renderMiniPlayer(wrapper);
  } else {
    teardownMiniPlayer();
  }

  // SVG Icons for tabs
  const homeIcon = `<svg class="nav-icon-svg" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
  const workoutIcon = `<svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="4" height="6" rx="1"/><rect x="18" y="9" width="4" height="6" rx="1"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg>`;
  const profileIcon = `<svg class="nav-icon-svg" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  const missionsIcon = `<svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>`;
  const nutritionIcon = `<svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`;

  const hideNav = ['post_workout', 'reorder_exercises', 'exercise_explorer'].includes(state.currentView);
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
    <button class="nav-item ${state.activeTab === 'misiones' ? 'active' : ''}" onclick="changeTab('misiones')">
      ${missionsIcon}
      <span class="nav-label">Misiones</span>
    </button>
    <button class="nav-item ${state.activeTab === 'nutricion' ? 'active' : ''}" onclick="changeTab('nutricion')">
      ${nutritionIcon}
      <span class="nav-label">Nutrición</span>
    </button>
  `;
}

function changeTab(tab) {
  state.activeTab = tab;
  state.currentView = 'home';
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
           <span id="sessionTimerValue" style="font-size:0.85rem; font-weight:700; color:var(--text-muted)">${formatTime(state.sessionElapsed)}</span>
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
            <div style="font-size:0.65rem; color:var(--text-muted);">${new Date(lastWorkout.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })} · ${formatTime(lastWorkout.duration)} · ${formatVolume(lastWorkout.volume)}</div>
          </div>
        </div>
      ` : ''}

      <!-- Programas -->
      <button onclick="openProgramSelector()" style="width:100%; padding:14px 16px; background:var(--bg-card); border:none; cursor:pointer; display:flex; align-items:center; gap:12px; font-family:var(--font-family); text-align:left; transition: background 0.2s;" onmouseover="this.style.background='var(--bg-surface)'" onmouseout="this.style.background='var(--bg-card)'">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <div style="flex:1;">
          <div style="font-size:0.8rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Programas</div>
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

      <!-- Mis Rutinas -->
      <div style="display:flex; flex-direction:column; gap:1px; margin-top:0; background: rgba(0,0,0,0.05);">
        <div onclick="toggleRoutinesSection()" style="background:var(--bg-card); padding:12px 16px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; border-bottom:0.5px solid var(--border-subtle);">
          <h2 style="margin:0; font-size:0.95rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Mis Rutinas</h2>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">${state.routine.days.length} planes</span>
            <span style="font-size:0.9rem; color:var(--text-muted); transform:${state.routinesCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)'}; transition:transform 0.2s;">▼</span>
          </div>
        </div>
        <div style="overflow:hidden; max-height:${state.routinesCollapsed ? '0' : '5000px'}; transition:max-height 0.3s ease;">
        ${state.routine.days.map((day, i) => {
    const totalExercises = day.exercises.length;
    const completedExercises = day.exercises.filter((ex, exIdx) => {
      const key = `day${i}_ex${exIdx}`;
      const sets = state.completedSets[key] || [];
      return sets.length > 0 && sets.every(s => s.done);
    }).length;
    const progress = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

    const isActiveDay = state.sessionActive && state.currentDay === i
      && (state.currentView === 'workout' || state.workoutMinimized);
    const sessionIsRunning = state.sessionActive && state.workoutMinimized;

    return `
            <div style="background:var(--bg-card); padding:16px; display:flex; align-items:center; gap:14px; position:relative;">
               <button onclick="${sessionIsRunning ? 'resumeWorkout()' : `startSelectedDay(${i})`}" style="flex:1; display:flex; align-items:center; gap:14px; cursor:pointer; border:none; background:transparent; font-family:var(--font-family); text-align:left; padding:0; min-width:0;">
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
               </button>
               <button onclick="event.stopPropagation(); toggleRoutineMenu(${i}, this)" style="background:transparent; border:none; color:var(--text-muted); font-size:1.2rem; cursor:pointer; padding:4px 8px; min-width:36px; min-height:36px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">⋮</button>
               <div id="routineMenu_${i}" class="routine-menu" style="display:none; position:absolute; top:50px; right:8px; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); box-shadow:0 4px 12px rgba(0,0,0,0.15); z-index:100; min-width:180px; overflow:hidden;">
                  <button onclick="event.stopPropagation(); shareRoutine(${i})" style="width:100%; padding:12px 16px; background:transparent; border:none; text-align:left; font-size:0.85rem; font-weight:600; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; gap:8px; font-family:var(--font-family);">📤 Compartir</button>
                  <button onclick="event.stopPropagation(); editRoutine(${i})" style="width:100%; padding:12px 16px; background:transparent; border:none; text-align:left; font-size:0.85rem; font-weight:600; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; gap:8px; font-family:var(--font-family);">✏️ Editar</button>
                  <button onclick="event.stopPropagation(); deleteRoutine(${i})" style="width:100%; padding:12px 16px; background:transparent; border:none; text-align:left; font-size:0.85rem; font-weight:600; color:#ff3b30; cursor:pointer; display:flex; align-items:center; gap:8px; font-family:var(--font-family);">🗑️ Borrar</button>
               </div>
            </div>
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
function navigateToWorkout() {
  state.currentView = 'workout';
  state.expandedExercise = null;
  state.expandedInfo = null;

  if (!state.sessionActive) {
    state.sessionElapsed = 0;
    state.sessionStartTime = null;
  }

  renderApp();
  scrollToTop();
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

  scrollToTop();
}

let explorarQuery = '';

function openExerciseExplorer() {
  state.previousView = state.currentView;
  state.currentView = 'exercise_explorer';
  renderApp();
  scrollToTop();
}

function closeExerciseExplorer() {
  state.currentView = 'home';
  state.activeTab = 'perfil';
  renderApp();
}

function renderExerciseExplorer(container) {
  container.innerHTML = `
     <div class="home-screen">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; padding: 12px 16px; background: var(--bg-primary); border-bottom: 0.5px solid rgba(0,0,0,0.05);">
          <button onclick="closeExerciseExplorer()" style="background:transparent; border:none; color:var(--accent-primary); width:44px; height:44px; cursor:pointer; font-weight:700; font-size:1.3rem;">←</button>
          <h2 style="font-size:1rem; font-weight:800; text-transform:uppercase; flex:1;">Ejercicios</h2>
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
      <div class="reorder-item" data-index="${index}" style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:16px; display:flex; justify-content:space-between; align-items:center; user-select:none; touch-action:none; cursor:grab;" onpointerdown="initReorderDrag(event, ${index})">
        <div style="display:flex; align-items:center; gap:12px; pointer-events:none;">
          <div style="width:4px; height:20px; background:${muscleGroup.color}; border-radius:2px;"></div>
          <div>
            <h4 style="font-size:0.9rem; font-weight:700; margin:0; color:var(--text-primary);">${ex.name}</h4>
            <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">${muscleGroup.name}</span>
          </div>
        </div>
        <div style="color:var(--text-muted); display:flex; align-items:center; justify-content:center; width:36px; height:36px; pointer-events:none;">
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
        <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:16px; font-weight:500;">Mantén pulsado un ejercicio y arrástralo para reordenar.</p>
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
  
  const row = e.target.closest('.reorder-item');
  if (!row) return;

  e.preventDefault();
  activeDragItem = row;
  activeDragIndex = index;
  
  try {
    row.setPointerCapture(e.pointerId);
  } catch(err) {}
  
  row.classList.add('dragging');
  row.style.cursor = 'grabbing';
  row.style.transform = 'scale(1.02)';
  row.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  row.style.zIndex = '100';
  
  row.addEventListener('pointermove', onReorderMove);
  row.addEventListener('pointerup', onReorderEnd);
  row.addEventListener('pointercancel', onReorderEnd);
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
  
  try {
    activeDragItem.releasePointerCapture(e.pointerId);
  } catch(err) {}
  activeDragItem.removeEventListener('pointermove', onReorderMove);
  activeDragItem.removeEventListener('pointerup', onReorderEnd);
  activeDragItem.removeEventListener('pointercancel', onReorderEnd);

  activeDragItem.classList.remove('dragging');
  activeDragItem.style.cursor = '';
  activeDragItem.style.transform = '';
  activeDragItem.style.boxShadow = '';
  activeDragItem.style.zIndex = '';
  
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
  scrollToTop();
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
          <div class="history-card" style="cursor:pointer; transition: transform 0.2s; position:relative;" onmouseover="this.style.transform='scale(0.98)'" onmouseout="this.style.transform='none'">
            <div class="history-header" onclick="openHistoryDetail(${i})" style="display:flex; justify-content:space-between; align-items:flex-start;">
               <div style="flex:1;">
                  <div class="history-date">${new Date(session.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
                  <div style="font-weight:700; margin-top:4px;">${session.name}</div>
               </div>
               <div style="text-align:right; margin-right:8px;">
                  <div class="history-volume">${session.volume} kg</div>
                  <div style="font-size:0.7rem; color:var(--text-muted);">${formatTime(session.duration)}</div>
               </div>
               <button onclick="event.stopPropagation(); toggleHistoryMenu(${i}, this)" style="background:transparent; border:none; color:var(--text-muted); font-size:1.2rem; cursor:pointer; padding:4px 8px; min-width:36px; min-height:36px; display:flex; align-items:center; justify-content:center;">⋮</button>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;" onclick="openHistoryDetail(${i})">
               <span style="font-size:0.7rem; background:var(--bg-elevated); padding:2px 8px; border-radius:10px;">${session.sets} sets</span>
               ${session.prs > 0 ? `<span style="font-size:0.7rem; background:rgba(255,215,0,0.2); color:var(--pr-color); padding:2px 8px; border-radius:10px; font-weight:700;">🏅 ${session.prs} PRs</span>` : ''}
            </div>
            <div id="historyMenu_${i}" class="history-menu" style="display:none; position:absolute; top:40px; right:8px; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); box-shadow:0 4px 12px rgba(0,0,0,0.15); z-index:100; min-width:180px; overflow:hidden;">
               <button onclick="event.stopPropagation(); shareWorkout(${i})" style="width:100%; padding:12px 16px; background:transparent; border:none; text-align:left; font-size:0.85rem; font-weight:600; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; gap:8px; font-family:var(--font-family);">📤 Compartir</button>
               <button onclick="event.stopPropagation(); copyWorkout(${i})" style="width:100%; padding:12px 16px; background:transparent; border:none; text-align:left; font-size:0.85rem; font-weight:600; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; gap:8px; font-family:var(--font-family);">📋 Copiar</button>
               <button onclick="event.stopPropagation(); editWorkout(${i})" style="width:100%; padding:12px 16px; background:transparent; border:none; text-align:left; font-size:0.85rem; font-weight:600; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; gap:8px; font-family:var(--font-family);">✏️ Editar</button>
               <button onclick="event.stopPropagation(); deleteWorkout(${i})" style="width:100%; padding:12px 16px; background:transparent; border:none; text-align:left; font-size:0.85rem; font-weight:600; color:#ff3b30; cursor:pointer; display:flex; align-items:center; gap:8px; font-family:var(--font-family);">🗑️ Borrar</button>
            </div>
          </div>
        `).reverse().join('')}
      </div>
    </div>
  `;
}

function toggleHistoryMenu(idx, btn) {
  const menu = document.getElementById(`historyMenu_${idx}`);
  const isVisible = menu.style.display === 'block';
  document.querySelectorAll('.history-menu').forEach(m => m.style.display = 'none');
  if (!isVisible) menu.style.display = 'block';
}

function shareWorkout(idx) {
  const session = state.history[idx];
  const text = `🏋️ ${session.name}\n📅 ${new Date(session.date).toLocaleDateString('es-ES')}\n⏱️ ${formatTime(session.duration)}\n📊 ${session.volume}kg · ${session.sets} series`;
  if (navigator.share) {
    navigator.share({ title: session.name, text });
  } else {
    navigator.clipboard.writeText(text);
    showToast('✅', 'Entrenamiento copiado al portapapeles');
  }
  document.querySelectorAll('.history-menu').forEach(m => m.style.display = 'none');
}

function copyWorkout(idx) {
  const session = state.history[idx];
  state.emptyWorkout.active = true;
  state.emptyWorkout.name = session.name + ' (copia)';
  state.emptyWorkout.exercises = (session.exercisesList || []).map(ex => ({
    exerciseId: ex.exerciseId,
    sets: ex.sets.length,
    reps: '10-12',
    notes: ''
  }));
  state.currentView = 'empty_workout';
  state.activeTab = 'entreno';
  saveState();
  renderApp();
  showToast('✅', 'Entrenamiento copiado');
  document.querySelectorAll('.history-menu').forEach(m => m.style.display = 'none');
}

function editWorkout(idx) {
  showToast('🚧', 'Edición de entrenamientos pasados próximamente');
  document.querySelectorAll('.history-menu').forEach(m => m.style.display = 'none');
}

async function deleteWorkout(idx) {
  if (await showCustomConfirm('¿Borrar este entrenamiento del historial?')) {
    state.history.splice(idx, 1);
    saveState();
    renderApp();
    showToast('️', 'Entrenamiento borrado');
  }
  document.querySelectorAll('.history-menu').forEach(m => m.style.display = 'none');
}

document.addEventListener('click', () => {
  closeAllMenus();
});

function toggleRoutineMenu(idx, btn) {
  const menu = document.getElementById(`routineMenu_${idx}`);
  const isVisible = menu.style.display === 'block';
  document.querySelectorAll('.routine-menu').forEach(m => m.style.display = 'none');
  if (!isVisible) menu.style.display = 'block';
}

function shareRoutine(idx) {
  const day = state.routine.days[idx];
  const exercises = day.exercises.map(ex => {
    const name = EXERCISE_DB[ex.exerciseId]?.name || ex.exerciseId;
    return `- ${name}: ${ex.sets} series x ${ex.reps}`;
  }).join('\n');
  const text = `🏋️ ${day.title}\n\n${exercises}`;
  if (navigator.share) {
    navigator.share({ title: day.title, text });
  } else {
    navigator.clipboard.writeText(text);
    showToast('✅', 'Rutina copiada al portapapeles');
  }
  document.querySelectorAll('.routine-menu').forEach(m => m.style.display = 'none');
}

function editRoutine(idx) {
  state.currentDay = idx;
  state.currentView = 'workout';
  state.activeTab = 'entreno';
  saveState();
  renderApp();
  showToast('️', 'Modo edición activado');
  document.querySelectorAll('.routine-menu').forEach(m => m.style.display = 'none');
}

async function deleteRoutine(idx) {
  if (state.routine.days.length <= 1) {
    showToast('⚠️', 'No puedes borrar la última rutina');
    return;
  }
  if (await showCustomConfirm(`¿Borrar "${state.routine.days[idx].title}"?`)) {
    state.routine.days.splice(idx, 1);
    if (state.currentDay >= state.routine.days.length) state.currentDay = 0;
    saveState();
    renderApp();
    showToast('🗑️', 'Rutina borrada');
  }
  document.querySelectorAll('.routine-menu').forEach(m => m.style.display = 'none');
}

function getAvatarMuscleStyle(growth) {
  const scale = 1 + (growth / 200);
  const opacity = 0.3 + (growth / 100) * 0.5;
  return `transform: scale(${scale}); transform-origin: center; opacity: ${opacity}; transition: all 0.5s ease;`;
}

function renderAvatarSVG() {
  const m = state.avatar.muscles;
  const lvl = state.avatar.level;
  const auraActive = state.avatar.levelUpTriggered;
  
  // Factores de crecimiento muscular (0-1)
  const chestGrowth = m.chest.growth / 100;
  const armsGrowth = m.arms.growth / 100;
  const legsGrowth = m.legs.growth / 100;
  const shouldersGrowth = m.shoulders.growth / 100;
  const backGrowth = m.back.growth / 100;

  // Colores premium
  const skinTone = '#F5C6A5';
  const skinShadow = '#D4A574';
  const skinHighlight = '#FFE8D6';
  const skinRim = '#FFDCC8';
  
  const tankTop = '#1A1A2E';
  const tankShadow = '#0F0F1A';
  const tankHighlight = '#2A2A42';
  const tankAccent = '#E94560';
  
  const shortsColor = '#16213E';
  const shortsShadow = '#0F1528';
  const shortsHighlight = '#1F2B4D';
  
  const hairColor = '#2C1810';
  const hairShadow = '#1A0F0A';
  const hairHighlight = '#4A2C1A';

  // Dimensiones dinámicas basadas en crecimiento muscular
  const shoulderWidth = 110 + (shouldersGrowth * 15);
  const chestWidth = 95 + (chestGrowth * 20);
  const waistWidth = 72 - (chestGrowth * 5);
  const armThickness = 22 + (armsGrowth * 12);
  const thighWidth = 28 + (legsGrowth * 15);
  const calfWidth = 20 + (legsGrowth * 10);

  return `
    <div style="position:relative; width:280px; height:420px; margin:0 auto; cursor:pointer;" onclick="toggleAvatarPose()">
      ${auraActive ? '<div class="ssj-aura"></div>' : ''}
      <svg viewBox="0 0 280 420" width="280" height="420" style="overflow:visible;">
        <defs>
          <!-- Gradiente Piel Premium con Iluminación 3D -->
          <linearGradient id="skinGrad" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stop-color="${skinHighlight}"/>
            <stop offset="40%" stop-color="${skinTone}"/>
            <stop offset="85%" stop-color="${skinShadow}"/>
            <stop offset="100%" stop-color="#B8845C"/>
          </linearGradient>
          
          <linearGradient id="skinGradSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${skinShadow}"/>
            <stop offset="50%" stop-color="${skinTone}"/>
            <stop offset="100%" stop-color="${skinHighlight}"/>
          </linearGradient>

          <!-- Gradiente Camiseta Premium -->
          <linearGradient id="tankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${tankHighlight}"/>
            <stop offset="30%" stop-color="${tankTop}"/>
            <stop offset="100%" stop-color="${tankShadow}"/>
          </linearGradient>
          
          <linearGradient id="tankGradFront" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="${tankHighlight}"/>
            <stop offset="60%" stop-color="${tankTop}"/>
            <stop offset="100%" stop-color="${tankShadow}"/>
          </linearGradient>

          <!-- Gradiente Pantalón -->
          <linearGradient id="shortsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${shortsHighlight}"/>
            <stop offset="50%" stop-color="${shortsColor}"/>
            <stop offset="100%" stop-color="${shortsShadow}"/>
          </linearGradient>

          <!-- Gradiente Cabello -->
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${hairHighlight}"/>
            <stop offset="60%" stop-color="${hairColor}"/>
            <stop offset="100%" stop-color="${hairShadow}"/>
          </linearGradient>

          <!-- Filtro Sombra Proyectada -->
          <filter id="dropShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.25"/>
          </filter>
          
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.2"/>
          </filter>

          <!-- Filtro Rim Light para Músculos -->
          <filter id="muscleRim" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
            <feOffset dx="1" dy="1" result="offsetBlur"/>
            <feFlood flood-color="#FFF" flood-opacity="0.3" result="glowColor"/>
            <feComposite in="glowColor" in2="offsetBlur" operator="in" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <!-- Gradiente para Zonas Musculares -->
          <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--accent-primary)" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="var(--accent-primary)" stop-opacity="0.3"/>
          </linearGradient>
        </defs>

        <!-- SOMBRA DEL SUELO -->
        <ellipse cx="140" cy="410" rx="70" ry="12" fill="rgba(0,0,0,0.2)" filter="blur(6px)"/>

        <!-- ========================================== -->
        <!-- CAPA 1: PIERNAS (Shorts + Musculatura) -->
        <!-- ========================================== -->
        <g id="legs-layer" filter="url(#softShadow)">
          <!-- Pierna Izquierda - Muslo -->
          <path d="M ${140 - waistWidth/2 - 5} 210 
                   C ${140 - waistWidth/2 - 10} 240, ${140 - thighWidth - 5} 260, ${140 - thighWidth} 290 
                   C ${140 - thighWidth + 5} 310, ${140 - calfWidth} 330, ${140 - calfWidth - 5} 360 
                   C ${140 - calfWidth - 8} 380, ${140 - 15} 390, ${140 - 25} 390 
                   C ${140 - 35} 390, ${140 - 30} 370, ${140 - 25} 350 
                   C ${140 - 20} 330, ${140 - 10} 300, ${140 - 5} 270 
                   C ${140} 240, ${140 - waistWidth/2} 220, ${140 - waistWidth/2 - 5} 210 Z" 
                fill="url(#shortsGrad)" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>
          
          <!-- Pierna Derecha - Muslo -->
          <path d="M ${140 + waistWidth/2 + 5} 210 
                   C ${140 + waistWidth/2 + 10} 240, ${140 + thighWidth + 5} 260, ${140 + thighWidth} 290 
                   C ${140 + thighWidth - 5} 310, ${140 + calfWidth} 330, ${140 + calfWidth + 5} 360 
                   C ${140 + calfWidth + 8} 380, ${140 + 15} 390, ${140 + 25} 390 
                   C ${140 + 35} 390, ${140 + 30} 370, ${140 + 25} 350 
                   C ${140 + 20} 330, ${140 + 10} 300, ${140 + 5} 270 
                   C ${140} 240, ${140 + waistWidth/2} 220, ${140 + waistWidth/2 + 5} 210 Z" 
                fill="url(#shortsGrad)" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>

          <!-- Pantorrillas (Piel visible) -->
          <path d="M ${140 - calfWidth - 5} 360 
                   C ${140 - calfWidth - 8} 380, ${140 - 15} 390, ${140 - 25} 390 
                   C ${140 - 35} 390, ${140 - 30} 370, ${140 - 25} 350 
                   C ${140 - 20} 330, ${140 - 10} 300, ${140 - 5} 270 
                   C ${140 - calfWidth + 5} 280, ${140 - calfWidth} 300, ${140 - calfWidth - 5} 360 Z" 
                fill="url(#skinGrad)"/>
          
          <path d="M ${140 + calfWidth + 5} 360 
                   C ${140 + calfWidth + 8} 380, ${140 + 15} 390, ${140 + 25} 390 
                   C ${140 + 35} 390, ${140 + 30} 370, ${140 + 25} 350 
                   C ${140 + 20} 330, ${140 + 10} 300, ${140 + 5} 270 
                   C ${140 + calfWidth - 5} 280, ${140 + calfWidth} 300, ${140 + calfWidth + 5} 360 Z" 
                fill="url(#skinGrad)"/>

          <!-- Zapatillas -->
          <path d="M ${140 - 35} 385 C ${140 - 40} 395, ${140 - 30} 405, ${140 - 15} 405 C ${140 - 5} 405, ${140} 395, ${140 - 5} 385 Z" fill="#FFFFFF" stroke="#DDD" stroke-width="1"/>
          <path d="M ${140 + 35} 385 C ${140 + 40} 395, ${140 + 30} 405, ${140 + 15} 405 C ${140 + 5} 405, ${140} 395, ${140 + 5} 385 Z" fill="#FFFFFF" stroke="#DDD" stroke-width="1"/>
          <path d="M ${140 - 30} 395 L ${140 - 10} 395" stroke="#333" stroke-width="2" stroke-linecap="round"/>
          <path d="M ${140 + 30} 395 L ${140 + 10} 395" stroke="#333" stroke-width="2" stroke-linecap="round"/>
        </g>

        <!-- ========================================== -->
        <!-- CAPA 2: BRAZOS (Deltoides, Bíceps, Antebrazos) -->
        <!-- ========================================== -->
        <g id="arms-layer" filter="url(#softShadow)">
          <!-- Brazo Izquierdo -->
          <!-- Deltoides -->
          <path d="M ${140 - shoulderWidth/2 - 5} 100 
                   C ${140 - shoulderWidth/2 - 15} 110, ${140 - shoulderWidth/2 - 20} 130, ${140 - shoulderWidth/2 - 15} 150 
                   C ${140 - shoulderWidth/2 - 10} 165, ${140 - shoulderWidth/2} 170, ${140 - shoulderWidth/2 + 5} 160 
                   C ${140 - shoulderWidth/2 + 10} 145, ${140 - shoulderWidth/2 + 5} 120, ${140 - shoulderWidth/2 - 5} 100 Z" 
                fill="url(#skinGrad)"/>
          
          <!-- Bíceps/Tríceps -->
          <path d="M ${140 - shoulderWidth/2 - 15} 150 
                   C ${140 - shoulderWidth/2 - 25 - armThickness/2} 170, ${140 - shoulderWidth/2 - 30 - armThickness/2} 195, ${140 - shoulderWidth/2 - 25 - armThickness/2} 215 
                   C ${140 - shoulderWidth/2 - 20 - armThickness/2} 230, ${140 - shoulderWidth/2 - 10} 235, ${140 - shoulderWidth/2 - 5} 225 
                   C ${140 - shoulderWidth/2} 210, ${140 - shoulderWidth/2 - 5} 185, ${140 - shoulderWidth/2 - 10} 165 
                   C ${140 - shoulderWidth/2 - 15} 155, ${140 - shoulderWidth/2 - 15} 150 Z" 
                fill="url(#skinGrad)"/>
          
          <!-- Antebrazo -->
          <path d="M ${140 - shoulderWidth/2 - 25 - armThickness/2} 215 
                   C ${140 - shoulderWidth/2 - 30 - armThickness/2} 235, ${140 - shoulderWidth/2 - 35 - armThickness/2} 255, ${140 - shoulderWidth/2 - 30 - armThickness/2} 275 
                   C ${140 - shoulderWidth/2 - 25 - armThickness/2} 290, ${140 - shoulderWidth/2 - 15} 295, ${140 - shoulderWidth/2 - 10} 285 
                   C ${140 - shoulderWidth/2 - 5} 270, ${140 - shoulderWidth/2 - 10} 245, ${140 - shoulderWidth/2 - 15} 225 
                   C ${140 - shoulderWidth/2 - 20 - armThickness/2} 220, ${140 - shoulderWidth/2 - 25 - armThickness/2} 215 Z" 
                fill="url(#skinGradSide)"/>
          
          <!-- Mano -->
          <ellipse cx="${140 - shoulderWidth/2 - 20}" cy="295" rx="10" ry="12" fill="url(#skinTone)"/>

          <!-- Brazo Derecho -->
          <!-- Deltoides -->
          <path d="M ${140 + shoulderWidth/2 + 5} 100 
                   C ${140 + shoulderWidth/2 + 15} 110, ${140 + shoulderWidth/2 + 20} 130, ${140 + shoulderWidth/2 + 15} 150 
                   C ${140 + shoulderWidth/2 + 10} 165, ${140 + shoulderWidth/2} 170, ${140 + shoulderWidth/2 - 5} 160 
                   C ${140 + shoulderWidth/2 - 10} 145, ${140 + shoulderWidth/2 - 5} 120, ${140 + shoulderWidth/2 + 5} 100 Z" 
                fill="url(#skinGrad)"/>
          
          <!-- Bíceps/Tríceps -->
          <path d="M ${140 + shoulderWidth/2 + 15} 150 
                   C ${140 + shoulderWidth/2 + 25 + armThickness/2} 170, ${140 + shoulderWidth/2 + 30 + armThickness/2} 195, ${140 + shoulderWidth/2 + 25 + armThickness/2} 215 
                   C ${140 + shoulderWidth/2 + 20 + armThickness/2} 230, ${140 + shoulderWidth/2 + 10} 235, ${140 + shoulderWidth/2 + 5} 225 
                   C ${140 + shoulderWidth/2} 210, ${140 + shoulderWidth/2 + 5} 185, ${140 + shoulderWidth/2 + 10} 165 
                   C ${140 + shoulderWidth/2 + 15} 155, ${140 + shoulderWidth/2 + 15} 150 Z" 
                fill="url(#skinGrad)"/>
          
          <!-- Antebrazo -->
          <path d="M ${140 + shoulderWidth/2 + 25 + armThickness/2} 215 
                   C ${140 + shoulderWidth/2 + 30 + armThickness/2} 235, ${140 + shoulderWidth/2 + 35 + armThickness/2} 255, ${140 + shoulderWidth/2 + 30 + armThickness/2} 275 
                   C ${140 + shoulderWidth/2 + 25 + armThickness/2} 290, ${140 + shoulderWidth/2 + 15} 295, ${140 + shoulderWidth/2 + 10} 285 
                   C ${140 + shoulderWidth/2 + 5} 270, ${140 + shoulderWidth/2 + 10} 245, ${140 + shoulderWidth/2 + 15} 225 
                   C ${140 + shoulderWidth/2 + 20 + armThickness/2} 220, ${140 + shoulderWidth/2 + 25 + armThickness/2} 215 Z" 
                fill="url(#skinGradSide)"/>
          
          <!-- Mano -->
          <ellipse cx="${140 + shoulderWidth/2 + 20}" cy="295" rx="10" ry="12" fill="url(#skinTone)"/>
        </g>

        <!-- ========================================== -->
        <!-- CAPA 3: TORSO (Pectorales, Abdominales, Espalda) -->
        <!-- ========================================== -->
        <g id="torso-layer" class="avatar-breathing" filter="url(#softShadow)">
          <!-- Cuello -->
          <path d="M ${140 - 18} 85 
                   C ${140 - 20} 70, ${140 + 20} 70, ${140 + 18} 85 
                   C ${140 + 22} 100, ${140 - 22} 100, ${140 - 18} 85 Z" 
                fill="url(#skinGrad)"/>
          
          <!-- Camiseta (Tank Top Ajustada) -->
          <path d="M ${140 - shoulderWidth/2} 95 
                   C ${140 - shoulderWidth/2 - 5} 110, ${140 - chestWidth/2 - 5} 140, ${140 - chestWidth/2} 180 
                   C ${140 - chestWidth/2 + 5} 210, ${140 - waistWidth/2} 220, ${140 - waistWidth/2} 230 
                   C ${140 - waistWidth/2 + 5} 240, ${140 + waistWidth/2 - 5} 240, ${140 + waistWidth/2} 230 
                   C ${140 + waistWidth/2} 220, ${140 + chestWidth/2 - 5} 210, ${140 + chestWidth/2} 180 
                   C ${140 + chestWidth/2 + 5} 140, ${140 + shoulderWidth/2 + 5} 110, ${140 + shoulderWidth/2} 95 
                   C ${140 + 25} 85, ${140 - 25} 85, ${140 - shoulderWidth/2} 95 Z" 
                fill="url(#tankGradFront)" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
          
          <!-- Escote -->
          <path d="M ${140 - 22} 88 
                   C ${140 - 15} 100, ${140 + 15} 100, ${140 + 22} 88 
                   C ${140 + 18} 80, ${140 - 18} 80, ${140 - 22} 88 Z" 
                fill="${skinTone}"/>
          
          <!-- Detalles Camiseta -->
          <path d="M ${140} 95 L ${140} 230" stroke="rgba(255,255,255,0.1)" stroke-width="1" fill="none"/>
          <path d="M ${140 - shoulderWidth/2} 95 Q ${140 - 30} 105, ${140 - 22} 88" stroke="rgba(0,0,0,0.15)" stroke-width="1" fill="none"/>
          <path d="M ${140 + shoulderWidth/2} 95 Q ${140 + 30} 105, ${140 + 22} 88" stroke="rgba(0,0,0,0.15)" stroke-width="1" fill="none"/>
          
          <!-- Logo/Acento en camiseta -->
          <circle cx="${140}" cy="130" r="8" fill="none" stroke="${tankAccent}" stroke-width="2" opacity="0.6"/>
          <path d="M ${140 - 4} 130 L ${140} 126 L ${140 + 4} 130 L ${140} 134 Z" fill="${tankAccent}" opacity="0.6"/>
        </g>

        <!-- ========================================== -->
        <!-- CAPA 4: CABEZA -->
        <!-- ========================================== -->
        <g id="head-layer" filter="url(#dropShadow)">
          <!-- Orejas -->
          <ellipse cx="${140 - 38}" cy="55" rx="8" ry="14" fill="url(#skinGrad)"/>
          <ellipse cx="${140 + 38}" cy="55" rx="8" ry="14" fill="url(#skinGrad)"/>
          
          <!-- Cabeza Base -->
          <path d="M ${140 - 38} 40 
                   C ${140 - 40} 20, ${140 - 20} 10, ${140} 10 
                   C ${140 + 20} 10, ${140 + 40} 20, ${140 + 40} 40 
                   C ${140 + 42} 60, ${140 + 38} 80, ${140 + 30} 90 
                   C ${140 + 20} 100, ${140 - 20} 100, ${140 - 30} 90 
                   C ${140 - 38} 80, ${140 - 42} 60, ${140 - 38} 40 Z" 
                fill="url(#skinGrad)"/>
          
          <!-- Mandíbula Definida -->
          <path d="M ${140 - 30} 75 
                   C ${140 - 25} 85, ${140 - 15} 92, ${140} 95 
                   C ${140 + 15} 92, ${140 + 25} 85, ${140 + 30} 75 
                   C ${140 + 28} 85, ${140 + 20} 95, ${140} 98 
                   C ${140 - 20} 95, ${140 - 28} 85, ${140 - 30} 75 Z" 
                fill="rgba(0,0,0,0.08)"/>

          <!-- Cabello Estilo Moderno -->
          <path d="M ${140 - 40} 35 
                   C ${140 - 42} 15, ${140 - 20} 5, ${140} 5 
                   C ${140 + 20} 5, ${140 + 42} 15, ${140 + 40} 35 
                   C ${140 + 38} 25, ${140 + 25} 15, ${140} 15 
                   C ${140 - 25} 15, ${140 - 38} 25, ${140 - 40} 35 Z" 
                fill="url(#hairGrad)"/>
          
          <!-- Flequillo Lateral -->
          <path d="M ${140 - 35} 25 
                   C ${140 - 25} 15, ${140 - 10} 20, ${140 - 5} 30 
                   C ${140 - 15} 25, ${140 - 25} 20, ${140 - 35} 25 Z" 
                fill="url(#hairGrad)"/>
          
          <!-- Cejas Definidas -->
          <path d="M ${140 - 28} 42 Q ${140 - 18} 38, ${140 - 8} 42" stroke="${hairColor}" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M ${140 + 8} 42 Q ${140 + 18} 38, ${140 + 28} 42" stroke="${hairColor}" stroke-width="3" fill="none" stroke-linecap="round"/>
          
          <!-- Ojos con Brillo Profesional -->
          <ellipse cx="${140 - 18}" cy="52" rx="9" ry="10" fill="#FFF"/>
          <circle cx="${140 - 17}" cy="52" r="5" fill="#2C3E50"/>
          <circle cx="${140 - 16}" cy="50" r="2" fill="#FFF"/>
          <circle cx="${140 - 18}" cy="54" r="1" fill="#FFF" opacity="0.6"/>
          
          <ellipse cx="${140 + 18}" cy="52" rx="9" ry="10" fill="#FFF"/>
          <circle cx="${140 + 17}" cy="52" r="5" fill="#2C3E50"/>
          <circle cx="${140 + 16}" cy="50" r="2" fill="#FFF"/>
          <circle cx="${140 + 18}" cy="54" r="1" fill="#FFF" opacity="0.6"/>
          
          <!-- Pestañas Superiores -->
          <path d="M ${140 - 27} 46 Q ${140 - 18} 44, ${140 - 9} 46" stroke="#2C3E50" stroke-width="1.5" fill="none"/>
          <path d="M ${140 + 9} 46 Q ${140 + 18} 44, ${140 + 27} 46" stroke="#2C3E50" stroke-width="1.5" fill="none"/>
          
          <!-- Nariz Estructurada -->
          <path d="M ${140 - 4} 58 Q ${140} 68, ${140 + 4} 58" stroke="${skinShadow}" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M ${140 - 3} 62 Q ${140} 65, ${140 + 3} 62" stroke="${skinShadow}" stroke-width="1" fill="none"/>
          
          <!-- Boca con Volumen -->
          <path d="M ${140 - 12} 78 Q ${140} 85, ${140 + 12} 78" stroke="#C47A5A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M ${140 - 8} 78 Q ${140} 82, ${140 + 8} 78" fill="#D4856A" opacity="0.5"/>
          
          <!-- Mejillas Sutil -->
          <circle cx="${140 - 25}" cy="65" r="7" fill="#FFB6C1" opacity="0.15"/>
          <circle cx="${140 + 25}" cy="65" r="7" fill="#FFB6C1" opacity="0.15"/>
        </g>

        <!-- ========================================== -->
        <!-- CAPA 5: MÚSCULOS (Heatmap Overlay) -->
        <!-- ========================================== -->
        <g id="muscles-layer" filter="url(#muscleRim)">
          <!-- Hombros (Deltoides) -->
          <g style="opacity: ${shouldersGrowth * 0.7}">
            <path d="M ${140 - shoulderWidth/2 - 5} 100 
                     C ${140 - shoulderWidth/2 - 15} 110, ${140 - shoulderWidth/2 - 20} 130, ${140 - shoulderWidth/2 - 15} 150 
                     C ${140 - shoulderWidth/2 - 10} 165, ${140 - shoulderWidth/2} 170, ${140 - shoulderWidth/2 + 5} 160 
                     C ${140 - shoulderWidth/2 + 10} 145, ${140 - shoulderWidth/2 + 5} 120, ${140 - shoulderWidth/2 - 5} 100 Z" 
                  fill="url(#muscleGrad)"/>
            <path d="M ${140 + shoulderWidth/2 + 5} 100 
                     C ${140 + shoulderWidth/2 + 15} 110, ${140 + shoulderWidth/2 + 20} 130, ${140 + shoulderWidth/2 + 15} 150 
                     C ${140 + shoulderWidth/2 + 10} 165, ${140 + shoulderWidth/2} 170, ${140 + shoulderWidth/2 - 5} 160 
                     C ${140 + shoulderWidth/2 - 10} 145, ${140 + shoulderWidth/2 - 5} 120, ${140 + shoulderWidth/2 + 5} 100 Z" 
                  fill="url(#muscleGrad)"/>
          </g>
          
          <!-- Pecho (Pectorales) -->
          <g style="opacity: ${chestGrowth * 0.7}">
            <path d="M ${140 - chestWidth/2 + 5} 120 
                     C ${140 - 10} 115, ${140 - 5} 115, ${140} 125 
                     C ${140 + 5} 140, ${140} 160, ${140 - 10} 165 
                     C ${140 - 20} 165, ${140 - chestWidth/2} 145, ${140 - chestWidth/2 + 5} 120 Z" 
                  fill="url(#muscleGrad)"/>
            <path d="M ${140 + chestWidth/2 - 5} 120 
                     C ${140 + 10} 115, ${140 + 5} 115, ${140} 125 
                     C ${140 - 5} 140, ${140} 160, ${140 + 10} 165 
                     C ${140 + 20} 165, ${140 + chestWidth/2} 145, ${140 + chestWidth/2 - 5} 120 Z" 
                  fill="url(#muscleGrad)"/>
          </g>
          
          <!-- Brazos (Bíceps) -->
          <g style="opacity: ${armsGrowth * 0.7}">
            <path d="M ${140 - shoulderWidth/2 - 15} 150 
                     C ${140 - shoulderWidth/2 - 25 - armThickness/2} 170, ${140 - shoulderWidth/2 - 30 - armThickness/2} 195, ${140 - shoulderWidth/2 - 25 - armThickness/2} 215 
                     C ${140 - shoulderWidth/2 - 20 - armThickness/2} 230, ${140 - shoulderWidth/2 - 10} 235, ${140 - shoulderWidth/2 - 5} 225 
                     C ${140 - shoulderWidth/2} 210, ${140 - shoulderWidth/2 - 5} 185, ${140 - shoulderWidth/2 - 10} 165 
                     C ${140 - shoulderWidth/2 - 15} 155, ${140 - shoulderWidth/2 - 15} 150 Z" 
                  fill="url(#muscleGrad)"/>
            <path d="M ${140 + shoulderWidth/2 + 15} 150 
                     C ${140 + shoulderWidth/2 + 25 + armThickness/2} 170, ${140 + shoulderWidth/2 + 30 + armThickness/2} 195, ${140 + shoulderWidth/2 + 25 + armThickness/2} 215 
                     C ${140 + shoulderWidth/2 + 20 + armThickness/2} 230, ${140 + shoulderWidth/2 + 10} 235, ${140 + shoulderWidth/2 + 5} 225 
                     C ${140 + shoulderWidth/2} 210, ${140 + shoulderWidth/2 + 5} 185, ${140 + shoulderWidth/2 + 10} 165 
                     C ${140 + shoulderWidth/2 + 15} 155, ${140 + shoulderWidth/2 + 15} 150 Z" 
                  fill="url(#muscleGrad)"/>
          </g>
          
          <!-- Piernas (Cuádriceps) -->
          <g style="opacity: ${legsGrowth * 0.7}">
            <path d="M ${140 - waistWidth/2 - 5} 220 
                     C ${140 - thighWidth - 5} 240, ${140 - thighWidth} 270, ${140 - thighWidth + 5} 290 
                     C ${140 - calfWidth} 310, ${140 - calfWidth - 5} 330, ${140 - 15} 340 
                     C ${140 - 5} 330, ${140} 300, ${140 - 5} 270 
                     C ${140 - 10} 240, ${140 - waistWidth/2} 230, ${140 - waistWidth/2 - 5} 220 Z" 
                  fill="url(#muscleGrad)"/>
            <path d="M ${140 + waistWidth/2 + 5} 220 
                     C ${140 + thighWidth + 5} 240, ${140 + thighWidth} 270, ${140 + thighWidth - 5} 290 
                     C ${140 + calfWidth} 310, ${140 + calfWidth + 5} 330, ${140 + 15} 340 
                     C ${140 + 5} 330, ${140} 300, ${140 + 5} 270 
                     C ${140 + 10} 240, ${140 + waistWidth/2} 230, ${140 + waistWidth/2 + 5} 220 Z" 
                  fill="url(#muscleGrad)"/>
          </g>
          
          <!-- Espalda (Trapecios/Dorsales) -->
          <g style="opacity: ${backGrowth * 0.6}">
            <path d="M ${140 - 35} 95 L ${140 - 45} 115 L ${140 - 40} 140 L ${140 - 25} 140 L ${140 - 30} 115 Z" fill="url(#muscleGrad)"/>
            <path d="M ${140 + 35} 95 L ${140 + 45} 115 L ${140 + 40} 140 L ${140 + 25} 140 L ${140 + 30} 115 Z" fill="url(#muscleGrad)"/>
          </g>
        </g>

      </svg>
      <div style="text-align:center; font-size:0.85rem; color:var(--text-muted); font-weight:700; margin-top:-5px; text-shadow: 0 1px 2px rgba(255,255,255,0.8); letter-spacing: 0.5px;">
        NIVEL ${lvl}
      </div>
    </div>
  `;
}

let avatarPoseActive = false;
function toggleAvatarPose() {
  avatarPoseActive = !avatarPoseActive;
  const container = document.querySelector('.avatar-arms');
  if (container) {
    container.classList.toggle('avatar-flexing', avatarPoseActive);
  }
  // Volver a pose normal después de 1.5 segundos
  if (avatarPoseActive) {
    setTimeout(() => {
      avatarPoseActive = false;
      const c = document.querySelector('.avatar-arms');
      if (c) c.classList.remove('avatar-flexing');
    }, 1500);
  }
}

function renderPerfil(container) {
  const totalWeight = state.history.reduce((acc, s) => acc + s.volume, 0);
  const totalHours = Math.round(state.history.reduce((acc, s) => acc + s.duration, 0) / 3600);

   container.innerHTML = `
    <div class="home-screen">
       <div style="text-align:center; padding: 20px 0;">
          <div style="width:80px; height:80px; background:var(--bg-elevated); border-radius:50%; margin:0 auto 15px; display:flex; align-items:center; justify-content:center; font-size:2rem; border:2px solid var(--border-subtle);">👤</div>
           <h2>${state.userName || 'Usuario'}</h2>
          <p style="color:var(--text-muted); font-size:0.8rem;">Entrenando desde ${new Date(state.userProfile.joinedDate).toLocaleDateString()}</p>
           <p style="color:var(--accent-primary); font-size:0.75rem; font-weight:700; margin-top:4px;">Nivel ${state.avatar.level} · ${state.avatar.xp} XP</p>
        </div>

        <!-- Avatar Preview (En mantenimiento) -->
        <!--
        <div style="padding:0 16px 16px; text-align:center;">
           ${renderAvatarSVG()}
        </div>
        -->

        <!-- Entrenamientos -->
       <div style="display:flex; flex-direction:column; gap:1px; background:rgba(0,0,0,0.05);">
         <div style="background:var(--bg-card); padding:12px 16px; border-bottom:0.5px solid var(--border-subtle);">
           <h2 style="margin:0; font-size:0.95rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Entrenamientos</h2>
         </div>
         ${state.history.length > 0 ? `
           <div style="background:var(--bg-card); padding:16px;">
              <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; margin-bottom:10px;">Últimos 7 entrenamientos</div>
              <div style="display:flex; gap:4px; margin-bottom:12px;">
                 <button onclick="setChartMetric('duration')" id="chartBtnDuration" style="flex:1; padding:8px; background:var(--accent-gradient); color:#fff; border:none; font-weight:700; font-size:0.65rem; cursor:pointer; border-radius:var(--radius-sm); text-transform:uppercase;">Duración</button>
                 <button onclick="setChartMetric('volume')" id="chartBtnVolume" style="flex:1; padding:8px; background:var(--bg-surface); color:var(--text-muted); border:none; font-weight:700; font-size:0.65rem; cursor:pointer; border-radius:var(--radius-sm); text-transform:uppercase;">Volumen</button>
                 <button onclick="setChartMetric('sets')" id="chartBtnSets" style="flex:1; padding:8px; background:var(--bg-surface); color:var(--text-muted); border:none; font-weight:700; font-size:0.65rem; cursor:pointer; border-radius:var(--radius-sm); text-transform:uppercase;">Series</button>
              </div>
              <div id="chartContainer" style="display:flex; gap:6px; align-items:flex-end; height:100px;"></div>
              <div id="chartLegend" style="margin-top:8px; font-size:0.6rem; color:var(--text-muted); font-weight:600; text-align:center;"></div>
           </div>
         ` : ''}
         ${state.history.length === 0 ? `
           <div style="background:var(--bg-card); padding:20px; text-align:center; color:var(--text-muted); font-size:0.8rem; font-weight:600;">
             Aún no has completado ningún entrenamiento
           </div>
         ` : state.history.slice().reverse().slice(0, 3).map((session, i) => `
           <div onclick="openHistoryDetail(${state.history.length - 1 - i})" style="background:var(--bg-card); padding:14px 16px; display:flex; align-items:center; gap:12px; cursor:pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--bg-surface)'" onmouseout="this.style.background='var(--bg-card)'">
              <div style="flex:1; min-width:0;">
                 <div style="font-size:0.85rem; font-weight:700; color:var(--text-primary);">${session.name}</div>
                 <div style="font-size:0.65rem; color:var(--text-muted);">${new Date(session.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })} · ${formatTime(session.duration)}</div>
              </div>
              <div style="text-align:right; flex-shrink:0;">
                 <div style="font-size:0.8rem; font-weight:800; color:var(--accent-primary);">${formatVolume(session.volume)}</div>
                 <div style="font-size:0.6rem; color:var(--text-muted); font-weight:600;">${session.sets} series</div>
              </div>
           </div>
         `).join('')}
         ${state.history.length > 3 ? `
           <div onclick="changeTab('inicio')" style="background:var(--bg-card); padding:12px 16px; text-align:center; cursor:pointer; font-size:0.75rem; font-weight:700; color:var(--accent-primary); text-transform:uppercase;">
             Ver historial completo ›
           </div>
         ` : ''}
       </div>

       <!-- Información -->
       <div style="display:flex; flex-direction:column; gap:1px; background:rgba(0,0,0,0.05); margin-top:16px;">
         <div style="background:var(--bg-card); padding:12px 16px; border-bottom:0.5px solid var(--border-subtle);">
           <h2 style="margin:0; font-size:0.95rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Información</h2>
         </div>
         <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1px; background:rgba(0,0,0,0.05);">
            <button onclick="navigateToView('measures')" style="background:var(--bg-card); padding:16px 12px; border:none; cursor:pointer; text-align:center; font-family:var(--font-family); transition: background 0.2s;" onmouseover="this.style.background='var(--bg-surface)'" onmouseout="this.style.background='var(--bg-card)'">
               <div style="font-size:1.5rem; margin-bottom:6px;">📏</div>
               <div style="font-size:0.7rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Medidas</div>
            </button>
            <button onclick="navigateToView('calendar')" style="background:var(--bg-card); padding:16px 12px; border:none; cursor:pointer; text-align:center; font-family:var(--font-family); transition: background 0.2s;" onmouseover="this.style.background='var(--bg-surface)'" onmouseout="this.style.background='var(--bg-card)'">
               <div style="font-size:1.5rem; margin-bottom:6px;">📅</div>
               <div style="font-size:0.7rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Calendario</div>
            </button>
            <button onclick="showComingSoon('Estadísticas')" style="background:var(--bg-card); padding:16px 12px; border:none; cursor:pointer; text-align:center; font-family:var(--font-family); transition: background 0.2s;" onmouseover="this.style.background='var(--bg-surface)'" onmouseout="this.style.background='var(--bg-card)'">
               <div style="font-size:1.5rem; margin-bottom:6px;">📊</div>
               <div style="font-size:0.7rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Estadísticas</div>
            </button>
            <button onclick="openExerciseExplorer()" style="background:var(--bg-card); padding:16px 12px; border:none; cursor:pointer; text-align:center; font-family:var(--font-family); transition: background 0.2s;" onmouseover="this.style.background='var(--bg-surface)'" onmouseout="this.style.background='var(--bg-card)'">
               <div style="font-size:1.5rem; margin-bottom:6px;">🏋️</div>
               <div style="font-size:0.7rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Ejercicios</div>
            </button>
         </div>
       </div>

       <!-- Secundario -->
       <div style="margin-top:16px; display:flex; flex-direction:column; gap:1px; background:rgba(0,0,0,0.05);">
          <button class="home-action-card" onclick="exportData()" style="padding:14px 16px; border:none; background:var(--bg-card); align-items:center; display:flex; gap:12px; cursor:pointer; font-family:var(--font-family); transition: background 0.2s;" onmouseover="this.style.background='var(--bg-surface)'" onmouseout="this.style.background='var(--bg-card)'">
             <div style="font-size:1.2rem;">📤</div>
             <div style="flex:1;">
                <div style="font-size:0.8rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Exportar datos</div>
                <div style="font-size:0.65rem; color:var(--text-muted);">Descargar backup .xlsx</div>
             </div>
             <span style="color:var(--text-muted); font-size:1.2rem;">›</span>
          </button>
        </div>
     </div>
  `;
  setTimeout(function(){ renderChart(_chartMetric); }, 50);
}

function navigateToView(view) {
  state.currentView = view;
  renderApp();
  scrollToTop();
}

function renderMeasures(container) {
  const bodyParts = [
    { key: 'weight', label: 'Peso corporal', unit: 'kg', step: '0.1' },
    { key: 'bodyFat', label: 'Grasa corporal', unit: '%', step: '0.1' },
    { key: 'leanMass', label: 'Masa corporal magra', unit: 'kg', step: '0.1' },
    { key: 'neck', label: 'Cuello', unit: 'cm', step: '0.1' },
    { key: 'shoulder', label: 'Hombro', unit: 'cm', step: '0.1' },
    { key: 'chest', label: 'Pecho', unit: 'cm', step: '0.1' },
    { key: 'bicepL', label: 'Bíceps izquierdo', unit: 'cm', step: '0.1' },
    { key: 'bicepR', label: 'Bíceps derecho', unit: 'cm', step: '0.1' },
    { key: 'forearmL', label: 'Antebrazo izquierdo', unit: 'cm', step: '0.1' },
    { key: 'forearmR', label: 'Antebrazo derecho', unit: 'cm', step: '0.1' },
    { key: 'abdomen', label: 'Abdomen', unit: 'cm', step: '0.1' },
    { key: 'waist', label: 'Cintura', unit: 'cm', step: '0.1' },
    { key: 'hips', label: 'Caderas', unit: 'cm', step: '0.1' },
    { key: 'thighL', label: 'Muslo izquierdo', unit: 'cm', step: '0.1' },
    { key: 'thighR', label: 'Muslo derecho', unit: 'cm', step: '0.1' },
    { key: 'calfL', label: 'Gemelo izquierdo', unit: 'cm', step: '0.1' },
    { key: 'calfR', label: 'Gemelo derecho', unit: 'cm', step: '0.1' }
  ];

  const measurements = state.userProfile.measurements || [];

  container.innerHTML = `
    <div class="home-screen">
       <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; padding: 12px 16px; background: var(--bg-primary); border-bottom: 0.5px solid rgba(0,0,0,0.05);">
         <button onclick="navigateBackFromSubview()" style="background:transparent; border:none; color:var(--accent-primary); width:44px; height:44px; cursor:pointer; font-weight:700; font-size:1.3rem;">←</button>
         <h2 style="font-size:1rem; font-weight:800; text-transform:uppercase; flex:1;">Mis Medidas</h2>
       </div>

       <!-- Foto -->
       <div style="padding:16px;">
         <div style="background:var(--bg-surface); border-radius:var(--radius-md); padding:16px; text-align:center; margin-bottom:16px;">
            <div style="font-size:0.7rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:10px;">Foto de progreso</div>
            <div id="measurePhotoPreview" style="width:120px; height:120px; background:var(--bg-elevated); border-radius:var(--radius-md); margin:0 auto 10px; display:flex; align-items:center; justify-content:center; overflow:hidden; border:1px dashed var(--border-subtle);">
               ${measurements.length > 0 && measurements[measurements.length - 1].photo ? `<img src="${measurements[measurements.length - 1].photo}" style="width:100%; height:100%; object-fit:cover;">` : '📷'}
            </div>
            <input type="file" id="measurePhotoInput" accept="image/*" onchange="saveMeasurePhoto(this)" style="display:none;">
            <button onclick="document.getElementById('measurePhotoInput').click()" style="background:var(--accent-gradient); color:#fff; border:none; padding:8px 16px; font-weight:700; font-size:0.75rem; cursor:pointer; border-radius:var(--radius-sm); text-transform:uppercase;">Añadir foto</button>
         </div>

         <!-- Formulario -->
         <h3 style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:12px; letter-spacing:0.5px;">Registrar medida hoy</h3>
         <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:16px;">
            ${bodyParts.map(p => `
              <div style="background:var(--bg-surface); padding:10px 12px; border-radius:var(--radius-sm); border:0.5px solid var(--border-subtle);">
                 <label style="font-size:0.6rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; display:block; margin-bottom:4px;">${p.label} (${p.unit})</label>
                 <input id="m_${p.key}" type="number" step="${p.step}" style="width:100%; background:var(--bg-elevated); border:0.5px solid var(--border-subtle); color:var(--text-primary); padding:6px 8px; font-weight:700; font-size:0.85rem; border-radius:4px; outline:none;">
              </div>
            `).join('')}
         </div>
         <button onclick="saveNewMeasurement()" style="width:100%; padding:14px; background:var(--accent-gradient); color:#fff; border:none; font-weight:700; font-size:0.85rem; cursor:pointer; text-transform:uppercase; border-radius:var(--radius-md); box-shadow:var(--accent-glow);">Guardar medida</button>
       </div>

       <!-- Historial -->
       <div style="display:flex; flex-direction:column; gap:1px; background:rgba(0,0,0,0.05);">
         <div style="background:var(--bg-card); padding:12px 16px; border-bottom:0.5px solid var(--border-subtle);">
           <h2 style="margin:0; font-size:0.95rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Historial</h2>
         </div>
         ${measurements.length === 0 ? `
           <div style="background:var(--bg-card); padding:20px; text-align:center; color:var(--text-muted); font-size:0.8rem; font-weight:600;">
             No hay medidas registradas
           </div>
         ` : measurements.slice().reverse().map(m => `
           <div style="background:var(--bg-card); padding:14px 16px;">
              <div style="font-size:0.7rem; color:var(--text-muted); font-weight:700; margin-bottom:8px; text-transform:uppercase;">${new Date(m.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px 12px; font-size:0.75rem; font-weight:600; color:var(--text-primary);">
                 ${bodyParts.map(p => m[p.key] ? `<div>${p.label}: <strong>${m[p.key]}${p.unit}</strong></div>` : '').join('')}
              </div>
              ${m.photo ? `<div style="margin-top:8px;"><img src="${m.photo}" style="width:60px; height:60px; object-fit:cover; border-radius:var(--radius-sm);"></div>` : ''}
           </div>
         `).join('')}
       </div>
    </div>
  `;
}

function saveMeasurePhoto(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    if (!state.userProfile.measurements) state.userProfile.measurements = [];
    if (state.userProfile.measurements.length === 0) {
      state.userProfile.measurements.push({ date: new Date().toISOString(), photo: e.target.result });
    } else {
      state.userProfile.measurements[state.userProfile.measurements.length - 1].photo = e.target.result;
    }
    saveState();
    renderApp();
  };
  reader.readAsDataURL(file);
}

function saveNewMeasurement() {
  const bodyParts = ['weight', 'bodyFat', 'leanMass', 'neck', 'shoulder', 'chest', 'bicepL', 'bicepR', 'forearmL', 'forearmR', 'abdomen', 'waist', 'hips', 'thighL', 'thighR', 'calfL', 'calfR'];
  const entry = { date: new Date().toISOString() };
  let hasData = false;

  bodyParts.forEach(key => {
    const val = document.getElementById(`m_${key}`).value;
    if (val) {
      entry[key] = parseFloat(val);
      hasData = true;
    }
  });

  if (!hasData) { showToast('⚠️', 'Rellena al menos una medida'); return; }

  if (!state.userProfile.measurements) state.userProfile.measurements = [];
  state.userProfile.measurements.push(entry);

  if (entry.weight) state.userProfile.weight = entry.weight;

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
  scrollToTop();
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
                <div style="font-size:1.3rem; font-weight:800; color:var(--text-primary);">${formatVolume(session.volume)}</div>
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
  scrollToTop();
}

// ── Minimize / Resume Workout ──
function minimizeWorkout() {
  if (!state.sessionActive) {
    // No active session – just go home normally
    state.currentView = 'home';
    renderApp();
    scrollToTop();
    return;
  }
  // Snapshot the exact view so resume restores it correctly
  state._minimizedView = state.currentView; // 'workout' | 'empty_workout'
  state.workoutMinimized = true;
  state.currentView = 'home';
  saveState();
  renderApp();
  scrollToTop();
}

function resumeWorkout() {
  state.workoutMinimized = false;
  // Restore the exact view that was active when the user minimized
  state.currentView = state._minimizedView || (state.emptyWorkout.active ? 'empty_workout' : 'workout');
  state._minimizedView = null;
  state.activeTab = 'entreno';
  saveState();
  renderApp();
  scrollToTop();
}

// ── Floating Mini-Player ──
let _miniPlayerInterval = null;

function renderMiniPlayer(wrapper) {
  let container = document.getElementById('workoutMiniPlayer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'workoutMiniPlayer';
    const nav = document.getElementById('bottomNav');
    if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(container, nav);
    } else if (wrapper) {
      wrapper.insertBefore(container, wrapper.firstChild);
    }
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
  scrollToTop();
}

// Abrir detalle desde el selector de ejercicios
function openExerciseSelectorToReplace(index) {
  state.replaceExerciseIndex = index;
  const isVacío = state.currentView === 'empty_workout';
  const exList = isVacío ? state.emptyWorkout.exercises : state.routine.days[state.currentDay].exercises;
  state.expandedExerciseId = exList[index].exerciseId;
  state.exerciseDetailSource = isVacío ? 'empty_workout' : 'routine';
  state.previousView = state.currentView;
  state.currentView = 'exercise_selector';
  renderApp();
  scrollToTop();
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

  state.previousView = state.currentView;
  state.previousDay = state.currentDay;
  state.expandedExerciseId = exerciseId;
  if (state.replaceExerciseIndex === null || state.replaceExerciseIndex === undefined) {
    state.exerciseDetailSource = exerciseSelectorSource || 'empty_workout';
  }
  state.expandedExerciseListSnapshot = null;

  state.currentView = 'exercise_detail';
  saveState();
  renderApp();
  scrollToTop();
}

function renderExerciseDetail(container) {
  let exerciseConfig = null;
  let exerciseData = null;

  // Si viene del selector de ejercicios o es una sustitución, usar EXERCISE_DB directamente
  if (state.exerciseDetailSource === 'exercise_selector' || state.exerciseDetailSource === 'empty_workout' || state.exerciseDetailSource === 'routine_builder' || state.exerciseDetailSource === 'workout' || state.exerciseDetailSource === 'routine' || state.replaceExerciseIndex !== null) {
    exerciseData = EXERCISE_DB[state.expandedExerciseId];
    exerciseConfig = { exerciseId: state.expandedExerciseId };
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
            ${state.replaceExerciseIndex !== null && state.replaceExerciseIndex !== undefined ? `${ICON_REPLACE} SUSTITUIR EJERCICIO` : (state.exerciseDetailSource === 'workout' || state.exerciseDetailSource === 'routine' ? '+ AÑADIR AL DÍA' : '+ AÑADIR AL ENTRENAMIENTO')}
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
  scrollToTop();
}

function addExerciseFromDetailAndBack(exerciseId) {
  const ex = { exerciseId, sets: 3, reps: '10-12', notes: '' };

  if (state.replaceExerciseIndex !== null && state.replaceExerciseIndex !== undefined) {
    // Sustitución al vuelo
    if (state.exerciseDetailSource === 'empty_workout') {
      state.emptyWorkout.exercises[state.replaceExerciseIndex] = ex;
      state.completedSets[`empty_ex${state.replaceExerciseIndex}`] = [];
    } else if (state.exerciseDetailSource === 'routine' || state.exerciseDetailSource === 'workout') {
      state.routine.days[state.currentDay].exercises[state.replaceExerciseIndex] = ex;
      state.completedSets[`day${state.currentDay}_ex${state.replaceExerciseIndex}`] = [];
    }
    showToast(window.ICON_REPLACE, `Sustituido por ${EXERCISE_DB[exerciseId].name}`);
  } else {
    // Añadir normal
    if (state.exerciseDetailSource === 'routine_builder') {
      state.builder.days[activeBuilderDay].exercises.push(ex);
      showToast('✅', `${EXERCISE_DB[exerciseId].name} añadido a la rutina`);
    } else if (state.exerciseDetailSource === 'workout') {
      state.routine.days[state.currentDay].exercises.push(ex);
      showToast('✅', `${EXERCISE_DB[exerciseId].name} añadido al día actual`);
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

  if (state.replaceExerciseIndex !== null && state.replaceExerciseIndex !== undefined) {
    state.currentView = 'workout';
    state.exerciseDetailSource = null;
    state.expandedExerciseId = null;
    state.replaceExerciseIndex = null;
    state.previousView = null;
    state.previousDay = null;
    saveState();
    renderApp();
    scrollToTop();
    return;
  }

  state.currentView = state.previousView || (state.emptyWorkout.active ? 'empty_workout' : 'workout');
  state.exerciseDetailSource = null;
  state.expandedExerciseId = null;
  state.replaceExerciseIndex = null;
  state.previousView = null;
  state.previousDay = null;
  saveState();
  renderApp();
  scrollToTop();
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
    theme: state.theme,
    avatar: state.avatar
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
      state.avatar = saved.avatar || state.avatar;
      state.nutritionLog = saved.nutritionLog || [];
      state.nutritionSelectedDate = saved.nutritionSelectedDate || new Date().toISOString().split('T')[0];

      // Inicializar avatar desde historial si es nuevo
      if (!saved.avatar || (saved.avatar && saved.avatar.muscles.chest.volume === 0)) {
        updateAvatarFromHistory();
      }

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

function updateAvatarFromHistory() {
  const muscleMap = {
    chest: ['pecho'],
    back: ['espalda', 'espalda baja', 'trapecio', 'core'],
    legs: ['cuádriceps', 'isquiotibiales', 'glúteos', 'piernas', 'gemelos', 'aductores'],
    arms: ['bíceps', 'tríceps', 'antebrazo'],
    shoulders: ['hombro', 'hombro anterior', 'hombro posterior']
  };

  // Reset volumes
  Object.keys(state.avatar.muscles).forEach(m => {
    state.avatar.muscles[m].volume = 0;
  });

  // Calcular volumen por grupo muscular desde el historial
  state.history.forEach(session => {
    if (session.exercisesList) {
      session.exercisesList.forEach(ex => {
        const exData = EXERCISE_DB[ex.exerciseId];
        if (!exData) return;
        const mg = exData.muscleGroup;

        // Encontrar a qué categoría del avatar pertenece
        for (const [avatarMuscle, groups] of Object.entries(muscleMap)) {
          if (groups.includes(mg)) {
            const setVolume = ex.sets.reduce((acc, s) => {
              return acc + ((parseFloat(s.kg) || 0) * (parseInt(s.reps) || 0));
            }, 0);
            state.avatar.muscles[avatarMuscle].volume += setVolume;
            break;
          }
        }
      });
    }
  });

  // Calcular growth (0-100) basado en el volumen máximo encontrado
  const maxVol = Math.max(...Object.values(state.avatar.muscles).map(m => m.volume), 1);
  Object.keys(state.avatar.muscles).forEach(m => {
    state.avatar.muscles[m].growth = Math.min(100, Math.round((state.avatar.muscles[m].volume / maxVol) * 100));
  });

  // Calcular XP y nivel
  const totalVol = Object.values(state.avatar.muscles).reduce((acc, m) => acc + m.volume, 0);
  const newXP = Math.floor(totalVol / 100); // 1 XP por cada 100kg
  const newLevel = Math.floor(newXP / 50) + 1; // 1 nivel cada 50 XP

  // Detectar subida de nivel (comparar con el nivel anterior guardado)
  const oldLevel = state.avatar.level || 1;
  if (newLevel > oldLevel) {
    state.avatar.levelUpTriggered = true;
    showToast('⚡', `¡NIVEL ${newLevel}! Tu avatar ha evolucionado`);
    // Desactivar el aura después de 5 segundos
    setTimeout(() => {
      state.avatar.levelUpTriggered = false;
      saveState();
      renderApp();
    }, 5000);
  }

  state.avatar.xp = newXP;
  state.avatar.level = newLevel;

  saveState();
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
  scrollToTop();
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
  // Detectar contexto: si estamos en workout (rutina activa), añadir al día actual
  if (state.currentView === 'workout') {
    exerciseSelectorSource = 'workout';
  } else {
    exerciseSelectorSource = 'empty_workout';
  }
  selectorQuery = '';
  // Colapsar todos los grupos por defecto para evitar scroll excesivo
  Object.keys(MUSCLE_GROUPS).forEach(mg => collapsedGroups[mg] = true);
  state.currentView = 'exercise_selector';
  renderApp();
}

let activeBuilderDay = null;
function openExerciseSelectorForBuilder(dIdx) {
  exerciseSelectorSource = 'routine_builder';
  activeBuilderDay = dIdx;
  selectorQuery = '';
  // Colapsar todos los grupos por defecto
  Object.keys(MUSCLE_GROUPS).forEach(mg => collapsedGroups[mg] = true);
  state.currentView = 'exercise_selector';
  renderApp();
}

function closeExerciseSelector() {
  selectorQuery = '';
  if (state.replaceExerciseIndex !== null && state.replaceExerciseIndex !== undefined) {
    state.currentView = 'workout';
    state.replaceExerciseIndex = null;
    state.expandedExerciseId = null;
  } else if (exerciseSelectorSource === 'routine_builder') {
    state.currentView = 'routine_builder';
  } else if (exerciseSelectorSource === 'workout') {
    state.currentView = 'workout';
  } else {
    state.currentView = 'empty_workout';
  }
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

function renderMissions(container) {
  const missionsState = getMissionsState();

  const xpData = JSON.parse(localStorage.getItem('gymcoach_xp') || '{"xp":0,"level":1}');
  const xpForNextLevel = xpData.level * 100;
  const xpProgress = (xpData.xp / xpForNextLevel) * 100;

  container.innerHTML = `
    <div class="home-screen">
      <!-- XP & Level Header -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1px; background:rgba(0,0,0,0.05); margin-bottom:0;">
        <div style="background:var(--bg-card); padding:14px 12px; text-align:center;">
          <div style="font-size:1.3rem; font-weight:800; color:var(--accent-primary);">${xpData.level}</div>
          <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; margin-top:2px;">Nivel</div>
        </div>
        <div style="background:var(--bg-card); padding:14px 12px; text-align:center;">
          <div style="font-size:1.3rem; font-weight:800; color:var(--text-primary);">${xpData.xp} / ${xpForNextLevel}</div>
          <div style="font-size:0.6rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; margin-top:2px;">XP</div>
        </div>
      </div>

      <!-- XP Progress Bar -->
      <div style="padding:12px 16px; background:var(--bg-surface); border-bottom:0.5px solid rgba(0,0,0,0.05);">
        <div style="width:100%; height:6px; background:var(--bg-elevated); border-radius:3px; overflow:hidden;">
          <div style="width:${xpProgress}%; height:100%; background:var(--accent-gradient); border-radius:3px; transition:width 0.3s;"></div>
        </div>
      </div>

      <!-- Daily Missions -->
      <div style="display:flex; flex-direction:column; gap:1px; margin-top:0; background:rgba(0,0,0,0.05);">
        <div style="background:var(--bg-card); padding:12px 16px; border-bottom:0.5px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
          <h2 style="margin:0; font-size:0.95rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Misiones Diarias</h2>
          <span style="font-size:0.65rem; color:var(--text-muted); font-weight:600;">Se reinician mañana</span>
        </div>
        ${missionsState.daily.map((m) => renderMissionCard(m)).join('')}
      </div>

      <!-- Weekly Missions -->
      <div style="display:flex; flex-direction:column; gap:1px; margin-top:16px; background:rgba(0,0,0,0.05);">
        <div style="background:var(--bg-card); padding:12px 16px; border-bottom:0.5px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
          <h2 style="margin:0; font-size:0.95rem; font-weight:700; color:var(--accent-primary); text-transform:uppercase;">Misiones Semanales</h2>
          <span style="font-size:0.65rem; color:var(--text-muted); font-weight:600;">Se reinician el lunes</span>
        </div>
        ${missionsState.weekly.map((m) => renderMissionCard(m, true)).join('')}
      </div>

      <!-- Monthly Mission -->
      <div style="display:flex; flex-direction:column; gap:1px; margin-top:16px; background:rgba(0,0,0,0.05);">
        <div style="background:var(--bg-card); padding:12px 16px; border-bottom:0.5px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
          <h2 style="margin:0; font-size:0.95rem; font-weight:700; color:#FFD700; text-transform:uppercase;">Misión Mensual</h2>
          <span style="font-size:0.65rem; color:var(--text-muted); font-weight:600;">Se reinicia el día 1</span>
        </div>
        ${renderMissionCard(missionsState.monthly, false, true)}
      </div>

      <!-- Weekly Ranking -->
      <div style="display:flex; flex-direction:column; gap:1px; margin-top:16px; background:rgba(0,0,0,0.05);">
        <div style="background:var(--bg-card); padding:12px 16px; border-bottom:0.5px solid var(--border-subtle);">
          <h2 style="margin:0; font-size:0.95rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Ranking Semanal</h2>
        </div>
        <div style="background:var(--bg-card); padding:20px; text-align:center; color:var(--text-muted); font-size:0.8rem; font-weight:600;">
          Completa entrenamientos para aparecer en el ranking
        </div>
      </div>
    </div>
  `;
}

function renderMissionCard(m, isWeekly = false, isMonthly = false) {
  const pct = m.target > 0 ? Math.min(100, Math.round((m.progress / m.target) * 100)) : 0;
  const borderColor = isMonthly ? '#FFD700' : (isWeekly ? 'var(--accent-primary)' : 'var(--border-subtle)');
  const bgColor = m.completed ? 'rgba(52, 199, 89, 0.1)' : 'var(--bg-card)';

  return `
    <div style="background:${bgColor}; padding:14px 16px; display:flex; align-items:center; gap:12px; border-left:3px solid ${m.completed ? '#34c759' : borderColor};">
      <div style="width:44px; height:44px; border-radius:var(--radius-sm); background:${m.completed ? 'var(--accent-gradient)' : 'var(--bg-elevated)'}; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0;">
        ${m.completed ? '✓' : m.icon}
      </div>
      <div style="flex:1; min-width:0;">
        <h3 style="font-size:0.85rem; font-weight:700; margin-bottom:4px; color:var(--text-primary); text-transform:uppercase;">${m.name}</h3>
        <div style="width:100%; height:4px; background:var(--bg-elevated); border-radius:2px; overflow:hidden; margin-bottom:4px;">
          <div style="width:${pct}%; height:100%; background:${m.completed ? '#34c759' : 'var(--accent-gradient)'}; border-radius:2px; transition:width 0.3s;"></div>
        </div>
        <p style="font-size:0.65rem; color:var(--text-muted); font-weight:600;">${m.progress} / ${m.target}</p>
      </div>
      <div style="text-align:right; flex-shrink:0;">
        <div style="font-size:0.75rem; font-weight:800; color:var(--accent-primary);">+${m.xpReward} XP</div>
        ${m.completed ? '<div style="font-size:0.6rem; color:#34c759; font-weight:600;">Completada</div>' : ''}
      </div>
    </div>
  `;
}

function getMissionsState() {
  const now = new Date();
  const today = now.toDateString();
  const weekKey = getWeekKey(now);
  const monthKey = now.getFullYear() + '-' + (now.getMonth() + 1);

  let saved = JSON.parse(localStorage.getItem('gymcoach_missions_v2') || 'null');

  // Generar nuevas si no existen o cambiaron de período
  if (!saved || saved.daily.date !== today) {
    saved = saved || {};
    saved.daily = { date: today, missions: generateDailyMissions() };
  }
  if (!saved.weekly || saved.weekly.week !== weekKey) {
    saved.weekly = { week: weekKey, missions: generateWeeklyMissions() };
  }
  if (!saved.monthly || saved.monthly.month !== monthKey) {
    saved.monthly = { month: monthKey, mission: generateMonthlyMission() };
  }

  // Actualizar progreso desde el historial
  updateMissionsProgress(saved);

  localStorage.setItem('gymcoach_missions_v2', JSON.stringify(saved));

  return {
    daily: saved.daily.missions,
    weekly: saved.weekly.missions,
    monthly: saved.monthly.mission
  };
}

function getWeekKey(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  return monday.toDateString();
}

function generateDailyMissions() {
  const allMissions = [
    { id: 'complete_workout', name: 'Completa un entrenamiento', icon: '🏋️', target: 1, xpReward: 50, progress: 0, completed: false },
    { id: 'total_sets_15', name: 'Haz 15 series', icon: '', target: 15, xpReward: 30, progress: 0, completed: false },
    { id: 'total_sets_25', name: 'Haz 25 series', icon: '📊', target: 25, xpReward: 45, progress: 0, completed: false },
    { id: 'volume_3000', name: 'Alcanza 3000 kg de volumen', icon: '💪', target: 3000, xpReward: 40, progress: 0, completed: false },
    { id: 'volume_5000', name: 'Alcanza 5000 kg de volumen', icon: '💪', target: 5000, xpReward: 60, progress: 0, completed: false },
    { id: 'complete_3_exercises', name: 'Completa 3 ejercicios', icon: '✅', target: 3, xpReward: 25, progress: 0, completed: false },
    { id: 'complete_5_exercises', name: 'Completa 5 ejercicios', icon: '✅', target: 5, xpReward: 40, progress: 0, completed: false },
    { id: 'duration_30min', name: 'Entrena 30 minutos', icon: '⏱️', target: 1800, xpReward: 35, progress: 0, completed: false },
    { id: 'duration_45min', name: 'Entrena 45 minutos', icon: '⏱️', target: 2700, xpReward: 50, progress: 0, completed: false },
    { id: 'hit_pr', name: 'Bate un récord personal', icon: '🏅', target: 1, xpReward: 60, progress: 0, completed: false }
  ];

  // Seleccionar 5 aleatorias sin repetir
  const shuffled = allMissions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5).map(m => ({...m}));
}

function generateWeeklyMissions() {
  const allMissions = [
    { id: 'weekly_workouts_3', name: 'Completa 3 entrenamientos', icon: '📅', target: 3, xpReward: 100, progress: 0, completed: false },
    { id: 'weekly_workouts_5', name: 'Completa 5 entrenamientos', icon: '📅', target: 5, xpReward: 200, progress: 0, completed: false },
    { id: 'weekly_sets_100', name: 'Haz 100 series', icon: '📊', target: 100, xpReward: 150, progress: 0, completed: false },
    { id: 'weekly_volume_20000', name: 'Alcanza 20000 kg de volumen', icon: '💪', target: 20000, xpReward: 175, progress: 0, completed: false },
    { id: 'weekly_pr_3', name: 'Bate 3 récords personales', icon: '🏅', target: 3, xpReward: 125, progress: 0, completed: false },
    { id: 'weekly_minutes_180', name: 'Entrena 180 minutos', icon: '⏱️', target: 10800, xpReward: 130, progress: 0, completed: false }
  ];

  const shuffled = allMissions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map(m => ({...m}));
}

function generateMonthlyMission() {
  const allMissions = [
    { id: 'monthly_workouts_20', name: 'Completa 20 entrenamientos', icon: '🏆', target: 20, xpReward: 500, progress: 0, completed: false },
    { id: 'monthly_volume_100000', name: 'Alcanza 100000 kg de volumen', icon: '', target: 100000, xpReward: 600, progress: 0, completed: false },
    { id: 'monthly_sets_500', name: 'Haz 500 series', icon: '', target: 500, xpReward: 550, progress: 0, completed: false },
    { id: 'monthly_pr_10', name: 'Bate 10 récords personales', icon: '⭐', target: 10, xpReward: 450, progress: 0, completed: false }
  ];

  const shuffled = allMissions.sort(() => Math.random() - 0.5);
  return {...shuffled[0]};
}

function updateMissionsProgress(saved) {
  // Calcular stats del día actual
  const today = new Date().toDateString();
  const todaySessions = state.history.filter(s => new Date(s.date).toDateString() === today);
  const todayVolume = todaySessions.reduce((acc, s) => acc + (s.volume || 0), 0);
  const todaySets = todaySessions.reduce((acc, s) => acc + (s.sets || 0), 0);
  const todayDuration = todaySessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const todayPRs = todaySessions.reduce((acc, s) => acc + (s.prs || 0), 0);
  const todayExercises = todaySessions.reduce((acc, s) => acc + (s.exercisesCompleted || 0), 0);
  const todayWorkouts = todaySessions.length;

  // Actualizar diarias
  saved.daily.missions.forEach(m => {
    switch(m.id) {
      case 'complete_workout': m.progress = todayWorkouts; break;
      case 'total_sets_15': case 'total_sets_25': m.progress = todaySets; break;
      case 'volume_3000': case 'volume_5000': m.progress = todayVolume; break;
      case 'complete_3_exercises': case 'complete_5_exercises': m.progress = todayExercises; break;
      case 'duration_30min': case 'duration_45min': m.progress = todayDuration; break;
      case 'hit_pr': m.progress = todayPRs; break;
    }
    m.completed = m.progress >= m.target;
  });

  // Calcular stats semanales
  const weekKey = getWeekKey(new Date());
  const weekSessions = state.history.filter(s => getWeekKey(new Date(s.date)) === weekKey);
  const weekVolume = weekSessions.reduce((acc, s) => acc + (s.volume || 0), 0);
  const weekSets = weekSessions.reduce((acc, s) => acc + (s.sets || 0), 0);
  const weekDuration = weekSessions.reduce((acc, s) => acc + (s.duration || 0), 0);
  const weekPRs = weekSessions.reduce((acc, s) => acc + (s.prs || 0), 0);
  const weekWorkouts = weekSessions.length;

  saved.weekly.missions.forEach(m => {
    switch(m.id) {
      case 'weekly_workouts_3': case 'weekly_workouts_5': m.progress = weekWorkouts; break;
      case 'weekly_sets_100': m.progress = weekSets; break;
      case 'weekly_volume_20000': m.progress = weekVolume; break;
      case 'weekly_pr_3': m.progress = weekPRs; break;
      case 'weekly_minutes_180': m.progress = weekDuration; break;
    }
    m.completed = m.progress >= m.target;
  });

  // Calcular stats mensuales
  const now = new Date();
  const monthKey = now.getFullYear() + '-' + (now.getMonth() + 1);
  const monthSessions = state.history.filter(s => {
    const d = new Date(s.date);
    return d.getFullYear() === now.getFullYear() && (d.getMonth() + 1) === (now.getMonth() + 1);
  });
  const monthVolume = monthSessions.reduce((acc, s) => acc + (s.volume || 0), 0);
  const monthSets = monthSessions.reduce((acc, s) => acc + (s.sets || 0), 0);
  const monthPRs = monthSessions.reduce((acc, s) => acc + (s.prs || 0), 0);
  const monthWorkouts = monthSessions.length;

  const mm = saved.monthly.mission;
  switch(mm.id) {
    case 'monthly_workouts_20': mm.progress = monthWorkouts; break;
    case 'monthly_volume_100000': mm.progress = monthVolume; break;
    case 'monthly_sets_500': mm.progress = monthSets; break;
    case 'monthly_pr_10': mm.progress = monthPRs; break;
  }
  mm.completed = mm.progress >= mm.target;
}

function exportData() {
  if (typeof XLSX === 'undefined') {
    showToast('⚠️', 'Librería de export no disponible');
    return;
  }

  const wb = XLSX.utils.book_new();

  // Hoja 1: Historial de entrenamientos
  const historyRows = state.history.map(s => ({
    Fecha: new Date(s.date).toLocaleDateString('es-ES'),
    Rutina: s.name,
    Duración: formatTime(s.duration),
    Volumen: s.volume + ' kg',
    Series: s.sets,
    PRs: s.prs || 0,
    Sensaciones: s.feedback || '-',
    Notas: s.notes || '-'
  }));
  if (historyRows.length === 0) historyRows.push({ Fecha: '-', Rutina: '-', Duración: '-', Volumen: '-', Series: '-', PRs: '-', Sensaciones: '-', Notas: 'Sin entrenamientos registrados' });
  const wsHistory = XLSX.utils.json_to_sheet(historyRows);
  XLSX.utils.book_append_sheet(wb, wsHistory, 'Historial');

  // Hoja 2: PRs (Récords Personales)
  const prRows = Object.keys(state.prs).map(exId => {
    const ex = EXERCISE_DB[exId];
    return {
      Ejercicio: ex ? ex.name : exId,
      'Peso Máx (kg)': state.prs[exId].maxKg,
      'Reps al Peso Máx': state.prs[exId].maxRepsAtMax,
      'Músculo': ex ? ex.muscleGroup : '-'
    };
  });
  if (prRows.length === 0) prRows.push({ Ejercicio: '-', 'Peso Máx (kg)': '-', 'Reps al Peso Máx': '-', 'Músculo': 'Sin PRs registrados' });
  const wsPRs = XLSX.utils.json_to_sheet(prRows);
  XLSX.utils.book_append_sheet(wb, wsPRs, 'PRs');

  // Hoja 3: Medidas corporales
  const measureRows = state.userProfile.measurements.map(m => ({
    Fecha: new Date(m.date).toLocaleDateString('es-ES'),
    'Peso (kg)': m.weight,
    'Grasa %': m.fat || '-',
    'Pecho (cm)': m.chest || '-',
    'Cintura (cm)': m.waist || '-'
  }));
  if (measureRows.length === 0) measureRows.push({ Fecha: '-', 'Peso (kg)': '-', 'Grasa %': '-', 'Pecho (cm)': '-', 'Cintura (cm)': 'Sin medidas registradas' });
  const wsMeasures = XLSX.utils.json_to_sheet(measureRows);
  XLSX.utils.book_append_sheet(wb, wsMeasures, 'Medidas');

  // Hoja 4: Rutina actual
  const routineRows = [];
  state.routine.days.forEach(day => {
    day.exercises.forEach(ex => {
      const exData = EXERCISE_DB[ex.exerciseId];
      routineRows.push({
        Día: day.title,
        Ejercicio: exData ? exData.name : ex.exerciseId,
        Series: ex.sets,
        Reps: ex.reps || '-',
        Notas: ex.notes || '-',
        Músculo: exData ? exData.muscleGroup : '-'
      });
    });
  });
  if (routineRows.length === 0) routineRows.push({ Día: '-', Ejercicio: 'Sin ejercicios', Series: '-', Reps: '-', Notas: '-', Músculo: '-' });
  const wsRoutine = XLSX.utils.json_to_sheet(routineRows);
  XLSX.utils.book_append_sheet(wb, wsRoutine, 'Rutina');

  // Descargar
  const dateStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `GymCoach_Backup_${dateStr}.xlsx`);
  showToast('✅', 'Datos exportados correctamente');
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

const ROUTINE_TEMPLATES = {
  fullbody: {
    id: 'template_fullbody',
    title: 'Full Body 3 Días',
    days: [
      { title: 'FULL BODY A', exercises: [
        { exerciseId: 'prensa', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'press_pecho_maquina_plano', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'jalon_pecho', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'press_hombros_mancuernas', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'curl_biceps_polea_barra', sets: 2, reps: '12-15', notes: '' },
        { exerciseId: 'extension_triceps_polea', sets: 2, reps: '12-15', notes: '' }
      ]},
      { title: 'FULL BODY B', exercises: [
        { exerciseId: 'hiperextension_lumbar', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'press_inclinado_maquina', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'remo_sentado_v', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'elevaciones_laterales_maquina', sets: 3, reps: '15-20', notes: '' },
        { exerciseId: 'curl_femoral', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'extension_cuadriceps', sets: 3, reps: '12-15', notes: '' }
      ]},
      { title: 'FULL BODY C', exercises: [
        { exerciseId: 'sentadilla_bulgarra', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'fondos_maquina', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'remo_polea_abierto', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'face_pull', sets: 3, reps: '15-20', notes: '' },
        { exerciseId: 'curl_inclinado_mancuernas', sets: 2, reps: '12-15', notes: '' },
        { exerciseId: 'press_frances', sets: 2, reps: '12-15', notes: '' }
      ]}
    ]
  },
  upperlower: {
    id: 'template_upperlower',
    title: 'Upper / Lower 4 Días',
    days: [
      { title: 'UPPER A', exercises: [
        { exerciseId: 'press_pecho_maquina_plano', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'remo_sentado_v', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'press_hombros_mancuernas', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'jalon_pecho', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'curl_biceps_polea_barra', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'extension_triceps_polea', sets: 3, reps: '12-15', notes: '' }
      ]},
      { title: 'LOWER A', exercises: [
        { exerciseId: 'prensa', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'extension_cuadriceps', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'curl_femoral', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'hiperextension_lumbar', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'gemelo_pie', sets: 4, reps: '15-20', notes: '' },
        { exerciseId: 'abdominal_maquina', sets: 3, reps: '15-20', notes: '' }
      ]},
      { title: 'UPPER B', exercises: [
        { exerciseId: 'press_inclinado_maquina', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'remo_maquina', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'elevaciones_laterales_maquina', sets: 4, reps: '15-20', notes: '' },
        { exerciseId: 'fondos_maquina', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'curl_inclinado_mancuernas', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'press_frances', sets: 3, reps: '12-15', notes: '' }
      ]},
      { title: 'LOWER B', exercises: [
        { exerciseId: 'sentadilla_bulgarra', sets: 4, reps: '10-12', notes: '' },
        { exerciseId: 'prensa_piernas', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'curl_femoral', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'aductor_maquina', sets: 3, reps: '15-20', notes: '' },
        { exerciseId: 'elevacion_gemelos_prensa', sets: 4, reps: '15-20', notes: '' },
        { exerciseId: 'plancha_abdominal', sets: 3, reps: '30-60s', notes: '' }
      ]}
    ]
  },
  ppl: {
    id: 'template_ppl',
    title: 'Push / Pull / Legs 6 Días',
    days: [
      { title: 'PUSH A', exercises: [
        { exerciseId: 'press_pecho_maquina_plano', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'press_inclinado_maquina', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'fondos_maquina', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'elevaciones_laterales_maquina', sets: 4, reps: '15-20', notes: '' },
        { exerciseId: 'extension_triceps_polea', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'press_frances', sets: 3, reps: '12-15', notes: '' }
      ]},
      { title: 'PULL A', exercises: [
        { exerciseId: 'jalon_pecho', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'remo_sentado_v', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'remo_polea_abierto', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'face_pull', sets: 3, reps: '15-20', notes: '' },
        { exerciseId: 'curl_biceps_polea_barra', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'curl_inclinado_mancuernas', sets: 3, reps: '12-15', notes: '' }
      ]},
      { title: 'LEGS A', exercises: [
        { exerciseId: 'prensa', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'extension_cuadriceps', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'curl_femoral', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'sentadilla_bulgarra', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'gemelo_pie', sets: 4, reps: '15-20', notes: '' },
        { exerciseId: 'abdominal_maquina', sets: 3, reps: '15-20', notes: '' }
      ]},
      { title: 'PUSH B', exercises: [
        { exerciseId: 'press_inclinado_maquina', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'press_pecho_maquina_plano', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'aperturas_polea', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'press_hombros_mancuernas', sets: 4, reps: '10-12', notes: '' },
        { exerciseId: 'elevacion_lateral_polea', sets: 3, reps: '15-20', notes: '' },
        { exerciseId: 'extension_triceps_sobre_cabeza', sets: 3, reps: '12-15', notes: '' }
      ]},
      { title: 'PULL B', exercises: [
        { exerciseId: 'dominadas', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'remo_sentado_v', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'jalon_pecho', sets: 3, reps: '10-12', notes: '' },
        { exerciseId: 'hiperextension_lumbar', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'curl_scott', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'curl_martillo', sets: 3, reps: '12-15', notes: '' }
      ]},
      { title: 'LEGS B', exercises: [
        { exerciseId: 'prensa_piernas', sets: 4, reps: '8-10', notes: '' },
        { exerciseId: 'curl_femoral', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'extension_cuadriceps', sets: 3, reps: '12-15', notes: '' },
        { exerciseId: 'aductor_maquina', sets: 3, reps: '15-20', notes: '' },
        { exerciseId: 'elevacion_gemelos_prensa', sets: 4, reps: '15-20', notes: '' },
        { exerciseId: 'plancha_abdominal', sets: 3, reps: '30-60s', notes: '' }
      ]}
    ]
  }
};

function loadTemplateRoutine(templateId) {
  const template = ROUTINE_TEMPLATES[templateId];
  if (!template) {
    showToast('⚠️', 'Plantilla no encontrada');
    return;
  }

  showCustomConfirm(`¿Quieres cargar la rutina "${template.title}"? Se reemplazará tu rutina actual.`).then(confirmed => {
    if (!confirmed) return;

    state.routine = {
      id: template.id,
      title: template.title,
      days: JSON.parse(JSON.stringify(template.days))
    };
    state.currentDay = 0;
    state.completedSets = {};
    state.activeTab = 'entreno';
    saveState();
    renderApp();
    showToast('✅', `Rutina "${template.title}" cargada`);
  });
}

function openProgramDetail(templateId) {
  state.selectedProgram = templateId;
  state.currentView = 'program_detail';
  renderApp();
  scrollToTop();
}

function closeProgramDetail() {
  state.selectedProgram = null;
  state.currentView = 'home';
  renderApp();
}

function toggleProgramsSection() {
  state.programsCollapsed = !state.programsCollapsed;
  renderApp();
}

function toggleRoutinesSection() {
  state.routinesCollapsed = !state.routinesCollapsed;
  renderApp();
}

function openProgramSelector() {
  state.currentView = 'program_selector';
  renderApp();
  scrollToTop();
}

function closeProgramSelector() {
  state.currentView = 'home';
  renderApp();
}

function renderProgramSelector(container) {
  const programs = [
    { id: 'fullbody', icon: '🏋️', gradient: 'linear-gradient(135deg,#007aff,#5ac8fa)', name: 'Full Body', desc: 'Entrena todo el cuerpo cada sesión', days: '3 días/semana' },
    { id: 'upperlower', icon: '💪', gradient: 'linear-gradient(135deg,#ff9500,#ffcc00)', name: 'Upper / Lower', desc: 'Tren superior e inferior alternados', days: '4 días/semana' },
    { id: 'ppl', icon: '🔥', gradient: 'linear-gradient(135deg,#ff3b30,#ff6b6b)', name: 'Push / Pull / Legs', desc: 'Empuje, tracción y piernas', days: '6 días/semana' }
  ];

  container.innerHTML = `
    <div class="home-screen">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; padding: 12px 16px; background: var(--bg-primary); border-bottom: 0.5px solid rgba(0,0,0,0.05);">
        <button onclick="closeProgramSelector()" style="background:transparent; border:none; color:var(--accent-primary); width:44px; height:44px; cursor:pointer; font-weight:700; font-size:1.3rem;">←</button>
        <h2 style="font-size:1rem; font-weight:800; text-transform:uppercase; flex:1;">Programas</h2>
      </div>

      <div style="padding:0 16px;">
        <div style="display:flex; flex-direction:column; gap:1px; background:rgba(0,0,0,0.05); border-radius:var(--radius-md); overflow:hidden;">
          ${programs.map(p => `
            <button onclick="openProgramDetail('${p.id}')" style="background:var(--bg-card); padding:16px; display:flex; align-items:center; gap:14px; cursor:pointer; border:none; width:100%; font-family:var(--font-family); text-align:left; transition: background 0.2s;" onmouseover="this.style.background='var(--bg-surface)'" onmouseout="this.style.background='var(--bg-card)'">
              <div style="width:44px; height:44px; border-radius:var(--radius-sm); background:${p.gradient}; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0;">${p.icon}</div>
              <div style="flex:1; min-width:0;">
                <h3 style="font-size:0.85rem; font-weight:700; margin-bottom:2px; color:var(--text-primary); text-transform:uppercase;">${p.name}</h3>
                <p style="font-size:0.65rem; color:var(--text-muted); font-weight:500;">${p.desc} · ${p.days}</p>
              </div>
              <span style="color:var(--text-muted); font-size:1.2rem;">›</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderProgramDetail(container) {
  const template = ROUTINE_TEMPLATES[state.selectedProgram];
  if (!template) { closeProgramDetail(); return; }

  const daysHtml = template.days.map((day) => `
    <div style="background:var(--bg-card); border:0.5px solid var(--border-subtle); border-radius:var(--radius-md); margin-bottom:12px; overflow:hidden;">
      <div style="padding:12px 16px; background:var(--bg-surface); border-bottom:0.5px solid var(--border-subtle);">
        <h3 style="font-size:0.85rem; font-weight:700; color:var(--text-primary); text-transform:uppercase; margin:0;">${day.title}</h3>
        <p style="font-size:0.65rem; color:var(--text-muted); font-weight:500; margin:2px 0 0;">${day.exercises.length} ejercicios</p>
      </div>
      <div style="display:flex; flex-direction:column; gap:1px; background:rgba(0,0,0,0.05);">
        ${day.exercises.map((ex) => {
          const exData = EXERCISE_DB[ex.exerciseId];
          const exName = exData ? exData.name : ex.exerciseId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          const mg = exData ? (MUSCLE_GROUPS[exData.muscleGroup] || { name: exData.muscleGroup, color: '#888' }) : { name: '-', color: '#888' };
          return `
            <div style="padding:12px 16px; background:var(--bg-card); display:flex; align-items:center; gap:12px;">
              <div style="width:4px; height:24px; background:${mg.color}; border-radius:2px; flex-shrink:0;"></div>
              <div style="flex:1; min-width:0;">
                <div style="font-size:0.8rem; font-weight:700; color:var(--text-primary);">${exName}</div>
                <div style="font-size:0.65rem; color:var(--text-muted); font-weight:500;">${ex.sets} series · ${ex.reps}</div>
              </div>
              <span style="font-size:0.6rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">${mg.name}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="home-screen">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; padding: 12px 16px; background: var(--bg-primary); border-bottom: 0.5px solid rgba(0,0,0,0.05);">
        <button onclick="closeProgramDetail()" style="background:transparent; border:none; color:var(--accent-primary); width:44px; height:44px; cursor:pointer; font-weight:700; font-size:1.3rem;">←</button>
        <h2 style="font-size:1rem; font-weight:800; text-transform:uppercase; flex:1;">${template.title}</h2>
      </div>

      <div style="padding:0 16px;">
        <div style="background:var(--bg-surface); border-radius:var(--radius-md); padding:14px 16px; margin-bottom:16px; display:flex; align-items:center; gap:12px;">
          <div style="font-size:1.5rem;">📋</div>
          <div>
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-primary);">Vista previa del programa</div>
            <div style="font-size:0.65rem; color:var(--text-muted); font-weight:500;">${template.days.length} días · Revisa los ejercicios antes de cargar</div>
          </div>
        </div>

        ${daysHtml}

        <button onclick="loadTemplateRoutine('${state.selectedProgram}')" style="width:100%; padding:16px; background:var(--accent-gradient); color:#fff; border:none; font-weight:700; font-size:0.9rem; cursor:pointer; text-transform:uppercase; border-radius:var(--radius-md); box-shadow:var(--accent-glow); margin-top:8px; margin-bottom:20px;">
          Cargar esta rutina
        </button>
      </div>
    </div>
  `;
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
    state.prs[exerciseId] = { maxKg: kgFloat, maxRepsAtMax: repsInt, maxReps: repsInt, maxRepsKg: kgFloat };
    setObj.isPR = true;
    showToast('🏅', '¡Nuevo Récord Personal establecido!');
  } else {
    const currentPR = state.prs[exerciseId];
    let isPR = false;

    // Récord de peso
    if (kgFloat > currentPR.maxKg) {
      currentPR.maxKg = kgFloat;
      currentPR.maxRepsAtMax = repsInt;
      isPR = true;
      showToast('🏅', `¡NUEVO RÉCORD DE PESO! (${kgFloat} kg)`);
    }
    // Récord de reps con el peso máximo
    else if (kgFloat === currentPR.maxKg && repsInt > currentPR.maxRepsAtMax) {
      currentPR.maxRepsAtMax = repsInt;
      isPR = true;
      showToast('🏅', `¡Récord de Reps con el peso máximo!`);
    }

    // Récord de repeticiones absolutas (cualquier peso)
    if (!currentPR.maxReps || repsInt > currentPR.maxReps) {
      currentPR.maxReps = repsInt;
      currentPR.maxRepsKg = kgFloat;
      if (!isPR) {
        isPR = true;
        showToast('🏅', `¡NUEVO RÉCORD DE REPS! (${repsInt} reps con ${kgFloat} kg)`);
      }
    }

    setObj.isPR = isPR;
  }
}

// ── Manejo del Plan (Añadir/Quitar) ───
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
  scrollToTop();
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

  // Actualizar avatar con el nuevo entrenamiento
  updateAvatarFromHistory();

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
            <div style="font-size:1.5rem; font-weight:800; color:var(--text-primary);">${formatVolume(session.volume)}</div>
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
  scrollToTop();
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

let _chartMetric = 'duration';

function setChartMetric(m) {
  _chartMetric = m;
  var btns = {duration:'chartBtnDuration',volume:'chartBtnVolume',sets:'chartBtnSets'};
  Object.keys(btns).forEach(function(k){
    var el = document.getElementById(btns[k]);
    if(!el) return;
    if(k === m){ el.style.background = 'var(--accent-gradient)'; el.style.color = '#fff'; }
    else { el.style.background = 'var(--bg-surface)'; el.style.color = 'var(--text-muted)'; }
  });
  renderChart(m);
}

function renderChart(m) {
  var history = state.history.slice(-7);
  var container = document.getElementById('chartContainer');
  var legend = document.getElementById('chartLegend');
  if(!container || !history.length) return;
  var values = history.map(function(s){
    if(m === 'duration') return s.duration;
    if(m === 'volume') return s.volume;
    return s.sets;
  });
  var maxVal = Math.max.apply(null, values) || 1;
  var labels = {duration:'Duración',volume:'Volumen (kg)',sets:'Series'};
  var html = history.map(function(s, i){
    var val = values[i];
    var pct = (val / maxVal) * 100;
    var label = '';
    if(m === 'duration') label = formatTime(val);
    else if(m === 'volume') label = val >= 1000 ? (val/1000).toFixed(1)+'t' : val+'kg';
    else label = val;
    return '<div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:2px;">'+
      '<div style="width:100%; background:var(--accent-primary); border-radius:4px 4px 0 0; height:'+pct+'%; min-height:4px;"></div>'+
      '<div style="font-size:0.55rem; color:var(--text-muted); font-weight:600;">'+new Date(s.date).getDate()+'</div>'+
      '<div style="font-size:0.5rem; color:var(--text-muted);">'+label+'</div>'+
    '</div>';
  }).join('');
  container.innerHTML = html;
  if(legend) legend.textContent = labels[m];
}

function renderNutritionTab(container) {
  const profile = state.userProfile;
  const weight = parseFloat(profile.weight) || 75;
  const height = parseFloat(profile.height) || 175;
  const age = parseInt(profile.age) || 25;

  const { targetCals, pGrams: pTarget, cGrams: cTarget, fGrams: fTarget } = calculateMacros(profile);

  // Fecha seleccionada
  const selectedDate = state.nutritionSelectedDate || new Date().toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];
  
  // Filtrar comidas por fecha seleccionada
  const selectedMeals = state.nutritionLog.filter(m => m.date === selectedDate);
  
  const totals = selectedMeals.reduce((acc, m) => ({
    kcal: acc.kcal + (m.kcal || 0),
    p: acc.p + (m.p || 0),
    c: acc.c + (m.c || 0),
    f: acc.f + (m.f || 0)
  }), { kcal: 0, p: 0, c: 0, f: 0 });

  const kcalRemaining = Math.round(targetCals - totals.kcal);
  const kcalPercent = Math.min(100, Math.round((totals.kcal / targetCals) * 100));
  const isOver = totals.kcal > targetCals;

  // Porcentajes de macros
  const pPercent = Math.min(100, Math.round((totals.p / pTarget) * 100));
  const cPercent = Math.min(100, Math.round((totals.c / cTarget) * 100));
  const fPercent = Math.min(100, Math.round((totals.f / fTarget) * 100));

  // Colores dinámicos
  const kcalColor = isOver ? '#ff3b30' : (kcalPercent > 80 ? '#ff9500' : '#34c759');
  const pColor = totals.p >= pTarget ? '#34c759' : 'var(--accent-primary)';
  const cColor = totals.c >= cTarget ? '#34c759' : 'var(--accent-primary)';
  const fColor = totals.f >= fTarget ? '#34c759' : 'var(--accent-primary)';

  // Formato de fecha para mostrar
  const dateObj = new Date(selectedDate + 'T00:00:00');
  const isToday = selectedDate === today;
  const dateLabel = isToday ? 'Hoy' : dateObj.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  
  // Navegación de fecha
  const canGoBack = selectedDate !== today; // Simplificado: solo permitir volver al pasado si hay datos o es hoy
  // Mejor lógica: permitir navegar siempre al pasado, pero bloquear futuro
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const canGoForward = selectedDate < tomorrow.toISOString().split('T')[0];

  container.innerHTML = `
    <div class="home-screen" style="padding-bottom:100px;">
      <!-- Selector de Fecha -->
      <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:var(--bg-card); margin-bottom:12px; border-bottom:0.5px solid var(--border-subtle);">
        <button onclick="changeNutritionDate(-1)" style="background:transparent; border:none; color:var(--text-primary); font-size:1.2rem; cursor:pointer; padding:8px; ${!canGoBack ? 'opacity:0.3; pointer-events:none;' : ''}">‹</button>
        <div style="text-align:center;">
          <div style="font-size:0.95rem; font-weight:800; color:var(--text-primary); text-transform:uppercase;">${dateLabel}</div>
          ${!isToday ? `<div style="font-size:0.65rem; color:var(--text-muted); font-weight:600;">${dateObj.toLocaleDateString('es-ES', { year: 'numeric' })}</div>` : ''}
        </div>
        <button onclick="changeNutritionDate(1)" style="background:transparent; border:none; color:var(--text-primary); font-size:1.2rem; cursor:pointer; padding:8px; ${!canGoForward ? 'opacity:0.3; pointer-events:none;' : ''}">›</button>
      </div>

      <!-- Panel de Progreso Visual -->
      <div style="background:var(--bg-card); padding:20px 16px; margin-bottom:12px;">
        <!-- Calorías Principales -->
        <div style="text-align:center; margin-bottom:16px;">
          <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:600; margin-bottom:4px;">Calorías</div>
          <div style="font-size:2.5rem; font-weight:900; color:${kcalColor}; line-height:1;">${totals.kcal}</div>
          <div style="font-size:0.85rem; color:var(--text-muted); font-weight:600; margin-top:4px;">/ ${Math.round(targetCals)} kcal</div>
          <div style="font-size:0.75rem; font-weight:700; color:${isOver ? '#ff3b30' : '#34c759'}; margin-top:4px;">
            ${isOver ? '+' + Math.abs(kcalRemaining) + ' kcal extra' : kcalRemaining + ' kcal restantes'}
          </div>
        </div>

        <!-- Barra Grande de Calorías -->
        <div style="width:100%; height:12px; background:var(--bg-elevated); border-radius:6px; overflow:hidden; margin-bottom:20px; position:relative;">
          <div style="width:${kcalPercent}%; height:100%; background:${kcalColor}; border-radius:6px; transition:width 0.5s ease; position:relative;">
            ${kcalPercent > 10 ? '<div style="position:absolute; right:8px; top:50%; transform:translateY(-50%); width:4px; height:4px; background:rgba(255,255,255,0.8); border-radius:50%;"></div>' : ''}
          </div>
        </div>

        <!-- Barras de Macros -->
        <div style="display:flex; flex-direction:column; gap:12px;">
          <!-- Proteína -->
          <div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Proteína</span>
              <span style="font-size:0.75rem; font-weight:800; color:${pColor};">${totals.p}g / ${pTarget}g</span>
            </div>
            <div style="width:100%; height:8px; background:var(--bg-elevated); border-radius:4px; overflow:hidden;">
              <div style="width:${pPercent}%; height:100%; background:${pColor}; border-radius:4px; transition:width 0.5s ease;"></div>
            </div>
          </div>
          <!-- Carbos -->
          <div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Carbos</span>
              <span style="font-size:0.75rem; font-weight:800; color:${cColor};">${totals.c}g / ${cTarget}g</span>
            </div>
            <div style="width:100%; height:8px; background:var(--bg-elevated); border-radius:4px; overflow:hidden;">
              <div style="width:${cPercent}%; height:100%; background:${cColor}; border-radius:4px; transition:width 0.5s ease;"></div>
            </div>
          </div>
          <!-- Grasas -->
          <div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="font-size:0.75rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Grasas</span>
              <span style="font-size:0.75rem; font-weight:800; color:${fColor};">${totals.f}g / ${fTarget}g</span>
            </div>
            <div style="width:100%; height:8px; background:var(--bg-elevated); border-radius:4px; overflow:hidden;">
              <div style="width:${fPercent}%; height:100%; background:${fColor}; border-radius:4px; transition:width 0.5s ease;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de comidas -->
      <div style="display:flex; flex-direction:column; gap:1px; background:rgba(0,0,0,0.05); margin-bottom:12px;">
        <div style="background:var(--bg-card); padding:12px 16px; border-bottom:0.5px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
          <h2 style="margin:0; font-size:0.95rem; font-weight:700; color:var(--text-primary); text-transform:uppercase;">Comidas</h2>
          <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">${selectedMeals.length} registros</span>
        </div>
        ${selectedMeals.length === 0 ? `
          <div style="background:var(--bg-card); padding:30px; text-align:center; color:var(--text-muted); font-size:0.85rem; font-weight:600;">
            No hay comidas registradas este día
          </div>
        ` : selectedMeals.map((m, i) => `
          <div style="background:var(--bg-card); padding:12px 16px; display:flex; justify-content:space-between; align-items:center; border-bottom:0.5px solid var(--border-subtle);">
            <div>
              <div style="font-size:0.9rem; font-weight:700; color:var(--text-primary);">${m.name}</div>
              <div style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">P:${m.p}g C:${m.c}g G:${m.f}g</div>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:0.9rem; font-weight:800; color:var(--accent-primary);">${m.kcal} kcal</span>
              <button onclick="deleteMeal(${i})" style="background:transparent; border:none; color:#ff3b30; font-size:1rem; cursor:pointer; padding:4px;">✕</button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Botón Añadir Comida (Solo si es hoy) -->
      ${isToday ? `
        <button onclick="openAddMealModal()" style="width:100%; padding:14px; background:var(--accent-gradient); color:#fff; border:none; font-weight:700; font-size:0.9rem; cursor:pointer; border-radius:var(--radius-md); box-shadow:var(--accent-glow); text-transform:uppercase; letter-spacing:0.3px;">+ Añadir Comida</button>
      ` : `
        <div style="text-align:center; padding:10px; color:var(--text-muted); font-size:0.8rem; font-weight:600;">
          Navega a "Hoy" para añadir comidas
        </div>
      `}
    </div>

    <!-- Modal Añadir Comida -->
    <div id="addMealModal" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:2000; align-items:flex-end; justify-content:center;">
      <div style="background:var(--bg-primary); width:100%; max-width:480px; border-radius:20px 20px 0 0; padding:20px; animation:slideUp 0.3s ease; max-height:90vh; overflow-y:auto;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 style="margin:0; font-size:1.1rem; font-weight:800; text-transform:uppercase;">Añadir Comida</h3>
          <button onclick="closeAddMealModal()" style="background:transparent; border:none; color:var(--text-muted); font-size:1.5rem; cursor:pointer; padding:4px;">✕</button>
        </div>
        
        <!-- Buscador de alimentos -->
        <div style="margin-bottom:16px;">
          <input type="text" id="foodSearch" placeholder="Buscar alimento..." oninput="filterFoodList(this.value)" style="width:100%; padding:12px; background:var(--bg-surface); border:0.5px solid var(--border-subtle); color:var(--text-primary); border-radius:var(--radius-sm); font-size:0.9rem; font-weight:600; margin-bottom:8px;">
          <div id="foodSearchResults" style="max-height:150px; overflow-y:auto; display:none; background:var(--bg-surface); border:0.5px solid var(--border-subtle); border-radius:var(--radius-sm);">
            <!-- Resultados dinámicos -->
          </div>
        </div>

        <!-- Alimento seleccionado -->
        <div id="selectedFoodInfo" style="display:none; background:var(--bg-surface); padding:12px; border-radius:var(--radius-sm); margin-bottom:12px; border-left:3px solid var(--accent-primary);">
          <div style="font-size:0.9rem; font-weight:700; color:var(--text-primary);" id="selectedFoodName"></div>
          <div style="font-size:0.7rem; color:var(--text-muted);">Por 100g: <span id="selectedFoodMacros"></span></div>
        </div>

        <!-- Cantidad -->
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
          <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; white-space:nowrap;">Cantidad (g)</label>
          <input type="number" id="mealGrams" value="100" oninput="updateMealMacros()" style="flex:1; padding:12px; background:var(--bg-surface); border:0.5px solid var(--border-subtle); color:var(--text-primary); border-radius:var(--radius-sm); font-size:0.9rem; font-weight:600; text-align:center;">
        </div>

        <!-- Macros calculados -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:16px;">
          <div style="background:var(--bg-elevated); padding:10px; border-radius:var(--radius-sm); text-align:center;">
            <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">Kcal</div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--accent-primary);" id="calcKcal">0</div>
          </div>
          <div style="background:var(--bg-elevated); padding:10px; border-radius:var(--radius-sm); text-align:center;">
            <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">Proteína</div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--text-primary);" id="calcP">0g</div>
          </div>
          <div style="background:var(--bg-elevated); padding:10px; border-radius:var(--radius-sm); text-align:center;">
            <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">Carbos</div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--text-primary);" id="calcC">0g</div>
          </div>
          <div style="background:var(--bg-elevated); padding:10px; border-radius:var(--radius-sm); text-align:center;">
            <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">Grasas</div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--text-primary);" id="calcF">0g</div>
          </div>
        </div>

        <button onclick="saveMealFromDB()" style="width:100%; padding:14px; background:var(--accent-gradient); color:#fff; border:none; font-weight:700; font-size:0.9rem; cursor:pointer; border-radius:var(--radius-md); box-shadow:var(--accent-glow); text-transform:uppercase;">Guardar Comida</button>
      </div>
    </div>
  `;
}

function changeNutritionDate(days) {
  const current = new Date(state.nutritionSelectedDate + 'T00:00:00');
  current.setDate(current.getDate() + days);
  
  // No permitir fechas futuras
  const today = new Date();
  today.setHours(0,0,0,0);
  if (current > today) return;

  state.nutritionSelectedDate = current.toISOString().split('T')[0];
  saveState();
  renderApp();
}

function openAddMealModal() {
  const modal = document.getElementById('addMealModal');
  if (modal) modal.style.display = 'flex';
}

function closeAddMealModal() {
  const modal = document.getElementById('addMealModal');
  if (modal) modal.style.display = 'none';
  
  // Resetear selección con verificación de existencia
  state.selectedFood = null;
  
  const searchInput = document.getElementById('foodSearch');
  if (searchInput) searchInput.value = '';
  
  const resultsDiv = document.getElementById('foodSearchResults');
  if (resultsDiv) resultsDiv.style.display = 'none';
  
  const infoDiv = document.getElementById('selectedFoodInfo');
  if (infoDiv) infoDiv.style.display = 'none';
  
  const gramsInput = document.getElementById('mealGrams');
  if (gramsInput) gramsInput.value = 100;
  
  updateMealMacros();
}

function filterFoodList(query) {
  const resultsDiv = document.getElementById('foodSearchResults');
  if (!query || query.length < 2) {
    resultsDiv.style.display = 'none';
    return;
  }

  const q = query.toLowerCase();
  const matches = FOOD_DB.filter(f => f.name.toLowerCase().includes(q));

  if (matches.length === 0) {
    resultsDiv.innerHTML = '<div style="padding:12px; text-align:center; color:var(--text-muted); font-size:0.8rem;">No encontrado</div>';
    resultsDiv.style.display = 'block';
    return;
  }

  resultsDiv.innerHTML = matches.map(f => `
    <div onclick="selectFood('${f.id}')" style="padding:12px; border-bottom:0.5px solid var(--border-subtle); cursor:pointer; display:flex; justify-content:space-between; align-items:center;" onmouseover="this.style.background='var(--bg-elevated)'" onmouseout="this.style.background='transparent'">
      <span style="font-size:0.9rem; font-weight:600; color:var(--text-primary);">${f.icon} ${f.name}</span>
      <span style="font-size:0.75rem; color:var(--text-muted);">${f.kcal} kcal</span>
    </div>
  `).join('');
  resultsDiv.style.display = 'block';
}

function selectFood(foodId) {
  const food = FOOD_DB.find(f => f.id === foodId);
  if (!food) return;

  state.selectedFood = food;
  
  // Mostrar info seleccionada
  document.getElementById('selectedFoodInfo').style.display = 'block';
  document.getElementById('selectedFoodName').textContent = `${food.icon} ${food.name}`;
  document.getElementById('selectedFoodMacros').textContent = `P:${food.p}g C:${food.c}g G:${food.f}g`;
  
  // Ocultar resultados
  document.getElementById('foodSearchResults').style.display = 'none';
  document.getElementById('foodSearch').value = food.name;

  updateMealMacros();
}

function updateMealMacros() {
  if (!state.selectedFood) {
    document.getElementById('calcKcal').textContent = '0';
    document.getElementById('calcP').textContent = '0g';
    document.getElementById('calcC').textContent = '0g';
    document.getElementById('calcF').textContent = '0g';
    return;
  }

  const grams = parseInt(document.getElementById('mealGrams').value) || 0;
  const factor = grams / 100;

  const kcal = Math.round(state.selectedFood.kcal * factor);
  const p = Math.round(state.selectedFood.p * factor * 10) / 10;
  const c = Math.round(state.selectedFood.c * factor * 10) / 10;
  const f = Math.round(state.selectedFood.f * factor * 10) / 10;

  document.getElementById('calcKcal').textContent = kcal;
  document.getElementById('calcP').textContent = p + 'g';
  document.getElementById('calcC').textContent = c + 'g';
  document.getElementById('calcF').textContent = f + 'g';
}

function saveMealFromDB() {
  if (!state.selectedFood) {
    showToast('️', 'Selecciona un alimento de la lista');
    return;
  }

  const grams = parseInt(document.getElementById('mealGrams').value) || 0;
  if (grams <= 0) {
    showToast('⚠️', 'Introduce una cantidad válida');
    return;
  }

  const factor = grams / 100;
  const selectedDate = state.nutritionSelectedDate || new Date().toISOString().split('T')[0];

  state.nutritionLog.push({
    date: selectedDate,
    name: state.selectedFood.name,
    grams: grams,
    kcal: Math.round(state.selectedFood.kcal * factor),
    p: Math.round(state.selectedFood.p * factor * 10) / 10,
    c: Math.round(state.selectedFood.c * factor * 10) / 10,
    f: Math.round(state.selectedFood.f * factor * 10) / 10,
    timestamp: Date.now()
  });

  saveState();
  closeAddMealModal();
  renderApp();
  showToast('✅', `${state.selectedFood.name} (${grams}g) añadido`);
}

function saveMeal() {
  // Fallback por si acaso, aunque ahora usamos saveMealFromDB
  saveMealFromDB();
}

function deleteMeal(index) {
  const selectedDate = state.nutritionSelectedDate || new Date().toISOString().split('T')[0];
  const selectedMeals = state.nutritionLog.filter(m => m.date === selectedDate);
  const mealToDelete = selectedMeals[index];
  
  if (mealToDelete) {
    const realIndex = state.nutritionLog.indexOf(mealToDelete);
    if (realIndex > -1) {
      state.nutritionLog.splice(realIndex, 1);
      saveState();
      renderApp();
      showToast('️', 'Comida eliminada');
    }
  }
}

function renderNutrition(container) {
  const profile = state.userProfile;
  const { targetCals, pGrams, cGrams, fGrams } = calculateMacros(profile);

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

// ── UTILIDADES ──
function formatVolume(kg) {
  return kg >= 1000 ? (kg / 1000).toFixed(1) + 't' : kg + 'kg';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeAllMenus() {
  document.querySelectorAll('.history-menu, .routine-menu').forEach(m => m.style.display = 'none');
}

function getSetKey(exerciseIndex) {
  const isVacío = state.currentView === 'empty_workout';
  return isVacío ? `empty_ex${exerciseIndex}` : `day${state.currentDay}_ex${exerciseIndex}`;
}

function getActiveExercises() {
  const isVacío = state.currentView === 'empty_workout';
  return isVacío ? state.emptyWorkout.exercises : state.routine.days[state.currentDay].exercises;
}

function calculateMacros(profile) {
  const weight = parseFloat(profile.weight) || 75;
  const height = parseFloat(profile.height) || 175;
  const age = parseInt(profile.age) || 25;

  const tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  let tdee = tmb * 1.55;

  let targetCals = tdee;
  let split = { p: 30, c: 40, f: 30 };

  if (profile.goals === 'gain') {
    targetCals = tdee + 400;
    split = { p: 25, c: 50, f: 25 };
  } else if (profile.goals === 'lose') {
    targetCals = tdee - 500;
    split = { p: 40, c: 30, f: 30 };
  }

  return {
    targetCals,
    pGrams: Math.round((targetCals * (split.p / 100)) / 4),
    cGrams: Math.round((targetCals * (split.c / 100)) / 4),
    fGrams: Math.round((targetCals * (split.f / 100)) / 9)
  };
}
