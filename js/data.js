// ============================================================
// GymCoach - Datos de Rutina y Asesoramiento
// ============================================================

// Base de datos de ejercicios con coaching contextual
const EXERCISE_DB = {
  press_inclinado_maquina: {
    name: 'Press inclinado máquina/Smith',
    muscleGroup: 'pecho',
    secondaryMuscles: ['hombro anterior', 'tríceps'],
    icon: '',
    tips: [
      'Mantén los omóplatos retraídos y deprimidos durante todo el movimiento',
      'Baja los agarres hasta que los codos estén a 90° o ligeramente por debajo',
      'Exhala durante la fase concéntrica (empuje)',
      'No bloquees completamente los codos en la parte superior',
      'Aprieta el pecho en la parte alta del movimiento'
    ],
    commonMistakes: [
      'Separar los omóplatos del respaldo al empujar',
      'Levantar los glúteos del asiento',
      'Usar impulso en lugar de fuerza controlada',
      'Bajar demasiado rápido sin controlar la excéntrica'
    ],
    progression: 'Cuando alcances 10 reps en las 3 series con buena técnica, sube 2.5-5 kg',
    warmup: 'Haz 2-3 series de calentamiento progresivo: 12 reps al 40%, 8 reps al 60%, 4 reps al 80%',
    restRecommended: 120,
    image: 'img/exercises/press_inclinado.png'
  },
  press_pecho_maquina_plano: {
    name: 'Press pecho máquina plano',
    muscleGroup: 'pecho',
    secondaryMuscles: ['tríceps', 'hombro anterior'],
    icon: '',
    tips: [
      'Ajusta el asiento para que los agarres queden a la altura del pecho medio',
      'Empuja hacia delante y ligeramente hacia dentro para máxima contracción',
      'Controla la fase excéntrica (vuelta) 2-3 segundos',
      'Mantén el core activado durante todo el movimiento'
    ],
    commonMistakes: [
      'Sentarse demasiado alto o bajo en la máquina',
      'Perder la retracción escapular',
      'No completar el rango de movimiento'
    ],
    progression: 'Cuando consigas 12 reps en las 2 series, sube 5 kg',
    restRecommended: 90
  },
  elevaciones_laterales_maquina: {
    name: 'Elevaciones laterales máquina',
    muscleGroup: 'hombro',
    secondaryMuscles: ['trapecio superior'],
    icon: '',
    tips: [
      'Lidera el movimiento con los codos, no con las manos',
      'Sube hasta que los brazos estén paralelos al suelo',
      'Mantén una ligera flexión en los codos',
      'Baja de forma controlada, no dejes caer el peso',
      'Concéntrate en sentir el deltoides lateral'
    ],
    commonMistakes: [
      'Subir los hombros (encogerlos) al levantar',
      'Usar demasiado peso y compensar con balanceo',
      'Subir más allá de paralelo (activa más trapecio)'
    ],
    progression: 'Prioriza reps antes que peso. Sube peso solo cuando completes 15 reps perfectas',
    restRecommended: 60
  },
  extension_triceps_polea: {
    name: 'Extensión tríceps unilateral polea',
    muscleGroup: 'tríceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Mantén el codo pegado al costado durante todo el movimiento',
      'Extiende completamente el brazo abajo para máxima contracción',
      'Gira ligeramente la muñeca hacia fuera en la parte baja',
      'Controla la subida sin dejar que el cable tire de tu brazo'
    ],
    commonMistakes: [
      'Separar el codo del cuerpo',
      'Usar el hombro para ayudar al movimiento',
      'No extender completamente el brazo'
    ],
    progression: 'Sube peso cuando completes 12 reps con ambos brazos sin perder forma',
    restRecommended: 60
  },
  fondos_maquina: {
    name: 'Fondos en máquina',
    muscleGroup: 'tríceps',
    secondaryMuscles: ['pecho inferior', 'hombro anterior'],
    icon: '',
    tips: [
      'Inclínate ligeramente hacia delante para más activación del pecho',
      'Mantente más erguido para focalizar en tríceps',
      'Baja hasta que los codos formen 90°',
      'Empuja de forma explosiva arriba, controla la bajada'
    ],
    commonMistakes: [
      'Bajar demasiado (estrés excesivo en el hombro)',
      'Bloquear los codos arriba completamente',
      'No controlar la fase negativa'
    ],
    progression: 'Cuando alcances 12 reps en ambas series, sube 5 kg',
    restRecommended: 90
  },
  abdominal_maquina: {
    name: 'Abdominal en máquina',
    muscleGroup: 'core',
    secondaryMuscles: ['oblicuos'],
    icon: '',
    tips: [
      'Concéntrate en la contracción abdominal, no en tirar con los brazos',
      'Exhala completamente al contraer',
      'Mantén la tensión constante, no relajes abajo del todo',
      'Movimiento lento y controlado, 2 seg arriba, 2 seg abajo'
    ],
    commonMistakes: [
      'Usar los brazos para tirar en lugar del abdomen',
      'Usar impulso/rebote',
      'Hacer el movimiento demasiado rápido'
    ],
    progression: 'Sube peso cuando completes 15 reps con contracción perfecta',
    restRecommended: 60
  },
  jalon_pecho: {
    name: 'Jalón al pecho',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'antebrazo'],
    icon: '',
    tips: [
      'Saca pecho y lleva los codos hacia abajo y atrás',
      'Tira la barra hasta la parte superior del pecho',
      'Aprieta los dorsales 1 segundo en la contracción',
      'Controla la subida del peso (fase excéntrica)',
      'Agarre algo más ancho que los hombros'
    ],
    commonMistakes: [
      'Tirar la barra detrás de la cabeza (riesgo de lesión)',
      'Inclinarse demasiado hacia atrás',
      'No completar el rango de movimiento',
      'Usar los brazos más que la espalda'
    ],
    progression: 'Cuando alcances 10 reps con buena contracción en las 3 series, sube 5 kg',
    warmup: 'Haz 1-2 series de calentamiento: 12 reps al 50%, 6 reps al 70%',
    restRecommended: 90,
    image: 'img/exercises/jalon_pecho.png'
  },
  pullover_polea: {
    name: 'Pullover en polea',
    muscleGroup: 'espalda',
    secondaryMuscles: ['pecho', 'tríceps largo'],
    icon: '',
    tips: [
      'Mantén los brazos casi rectos (ligera flexión en codos)',
      'Inicia el movimiento desde los dorsales, no desde los brazos',
      'Lleva la barra/cuerda hasta los muslos',
      'Siente el estiramiento en la parte alta del movimiento'
    ],
    commonMistakes: [
      'Flexionar demasiado los codos (se convierte en press)',
      'No controlar la vuelta arriba',
      'Usar demasiado peso sacrificando la conexión mente-músculo'
    ],
    progression: 'Ejercicio de aislamiento: prioriza la conexión mente-músculo sobre el peso',
    restRecommended: 60
  },
  remo_sentado_v: {
    name: 'Remo sentado agarre V',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'romboides'],
    icon: '',
    tips: [
      'Mantén el torso estable, no balancees adelante y atrás',
      'Tira los codos hacia atrás pegados al cuerpo',
      'Aprieta los omóplatos juntos en la contracción',
      'El agarre en V trabaja más la parte media de la espalda'
    ],
    commonMistakes: [
      'Usar impulso del torso para mover el peso',
      'Redondear la espalda baja',
      'No llevar los codos suficientemente atrás'
    ],
    progression: 'Cuando alcances 12 reps en ambas series con espalda estable, sube 5 kg',
    restRecommended: 90
  },
  curl_biceps_polea_barra: {
    name: 'Curl bíceps en polea con barra',
    muscleGroup: 'bíceps',
    secondaryMuscles: ['antebrazo'],
    icon: '',
    tips: [
      'Mantén los codos pegados al costado',
      'Sube hasta contracción máxima sin mover los hombros',
      'Baja controlando 2-3 segundos (excéntrica lenta)',
      'Aprieta el bíceps 1 segundo arriba del todo'
    ],
    commonMistakes: [
      'Balancear el cuerpo para subir el peso',
      'Mover los codos hacia delante',
      'Hacer el movimiento demasiado rápido'
    ],
    progression: 'Sube peso cuando completes 12 reps sin compensar con el cuerpo',
    restRecommended: 60
  },
  curl_martillo: {
    name: 'Curl martillo mancuernas',
    muscleGroup: 'bíceps',
    secondaryMuscles: ['braquial', 'braquiorradial'],
    icon: '',
    tips: [
      'Agarre neutro (palmas mirándose entre sí)',
      'Este ejercicio trabaja especialmente el braquial y antebrazo',
      'Mantén los codos fijos al costado',
      'Puedes hacerlo alterno o simultáneo'
    ],
    commonMistakes: [
      'Girar la muñeca durante el movimiento',
      'Balancear el torso',
      'Subir los codos'
    ],
    progression: 'Cuando completes 12 reps con ambos brazos sin balanceo, sube 1-2 kg por mancuerna',
    restRecommended: 60
  },
  hiperextension_lumbar: {
    name: 'Hiperextensión lumbar',
    muscleGroup: 'espalda baja',
    secondaryMuscles: ['glúteos', 'isquiotibiales'],
    icon: '',
    tips: [
      'Baja de forma controlada hasta sentir estiramiento en isquiotibiales',
      'Sube hasta que el torso quede en línea con las piernas (no más)',
      'Aprieta los glúteos en la parte alta',
      'Puedes cruzar los brazos sobre el pecho o poner las manos en la nuca'
    ],
    commonMistakes: [
      'Hiperextender la espalda (subir demasiado)',
      'Hacer el movimiento con velocidad/rebote',
      'Redondear la espalda en la bajada'
    ],
    progression: 'Cuando 15 reps sean fáciles, sujeta un disco en el pecho para añadir peso',
    restRecommended: 60
  },
  prensa: {
    name: 'Prensa',
    muscleGroup: 'piernas',
    secondaryMuscles: ['glúteos', 'isquiotibiales'],
    icon: '',
    tips: [
      'Coloca los pies a la anchura de los hombros en la plataforma',
      'Pies más arriba = más glúteo/isquio. Pies más abajo = más cuádriceps',
      'No bloquees las rodillas arriba del todo',
      'Baja hasta que las rodillas formen 90° o algo más',
      'Mantén la zona lumbar pegada al respaldo'
    ],
    commonMistakes: [
      'Bloquear las rodillas completamente (riesgo de lesión)',
      'Despegar la zona lumbar del asiento al bajar',
      'Rebotar en la parte baja del movimiento',
      'Colocar los pies demasiado juntos'
    ],
    progression: 'Cuando alcances 10 reps en las 3 series, sube 10-20 kg',
    warmup: 'Haz 2-3 series de calentamiento: 15 reps al 40%, 10 reps al 60%, 5 reps al 80%',
    restRecommended: 150,
    image: 'img/exercises/prensa_piernas.png'
  },
  curl_femoral: {
    name: 'Curl femoral tumbado',
    muscleGroup: 'isquiotibiales',
    secondaryMuscles: ['gemelos'],
    icon: '',
    tips: [
      'Ajusta el rodillo para que quede justo encima de los talones',
      'Mantén las caderas pegadas al banco',
      'Sube (flexiona) de forma explosiva, baja controlando',
      'Aprieta los isquiotibiales 1 segundo arriba'
    ],
    commonMistakes: [
      'Levantar las caderas del banco al flexionar',
      'No completar el rango de movimiento',
      'Usar demasiado peso y compensar con la cadera'
    ],
    progression: 'Sube peso cuando completes 12 reps sin levantar caderas',
    restRecommended: 60
  },
  extension_cuadriceps: {
    name: 'Extensión de cuádriceps unilateral',
    muscleGroup: 'cuádriceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Ajusta el respaldo para que las rodillas queden alineadas con el eje de la máquina',
      'Extiende completamente la pierna arriba',
      'Aprieta el cuádriceps 1-2 segundos en extensión completa',
      'Al ser unilateral, empieza con la pierna más débil'
    ],
    commonMistakes: [
      'No extender completamente la pierna',
      'Usar impulso/balanceo',
      'Rodillas mal alineadas con el eje de la máquina'
    ],
    progression: 'Sube peso cuando completes 12 reps con ambas piernas con contracción completa',
    restRecommended: 60
  },
  abduccion_cadera: {
    name: 'Abducción cadera',
    muscleGroup: 'glúteos',
    secondaryMuscles: ['abductores'],
    icon: '',
    tips: [
      'Abre las piernas de forma controlada contra la resistencia',
      'Mantén la espalda recta contra el respaldo',
      'Aprieta los glúteos en la posición abierta',
      'Vuelve despacio, no dejes que el peso cierre tus piernas'
    ],
    commonMistakes: [
      'Inclinarse hacia delante para ayudarse',
      'Hacer el movimiento demasiado rápido',
      'No abrir completamente'
    ],
    progression: 'Prioriza la contracción y el control sobre el peso',
    restRecommended: 45
  },
  aduccion_cadera: {
    name: 'Aducción cadera',
    muscleGroup: 'aductores',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Cierra las piernas de forma controlada',
      'Aprieta los aductores en la posición cerrada 1-2 segundos',
      'Abre despacio controlando la excéntrica',
      'Mantén la espalda recta contra el respaldo'
    ],
    commonMistakes: [
      'Usar demasiado peso sacrificando rango de movimiento',
      'Hacer el movimiento con rebote',
      'Inclinar el torso'
    ],
    progression: 'Sube peso cuando completes 15 reps con rango completo',
    restRecommended: 45
  },
  gemelo_pie: {
    name: 'Gemelo de pie',
    muscleGroup: 'gemelos',
    secondaryMuscles: ['sóleo'],
    icon: '',
    tips: [
      'Baja el talón todo lo posible para estirar el gemelo',
      'Sube hasta ponerte de puntillas completamente',
      'Mantén 1-2 segundos la contracción arriba',
      'Movimiento lento y controlado, sin rebotes'
    ],
    commonMistakes: [
      'No bajar el talón lo suficiente (rango parcial)',
      'Rebotar en la parte baja',
      'Doblar las rodillas para ayudarse'
    ],
    progression: 'Los gemelos necesitan alto volumen. Cuando completes 15 reps en las 3 series, sube peso',
    restRecommended: 60
  },
  press_inclinado_discos: {
    name: 'Press inclinado máquina discos',
    muscleGroup: 'pecho',
    secondaryMuscles: ['hombro anterior', 'tríceps'],
    icon: '',
    tips: [
      'Similar al press Smith pero con rango de movimiento más libre',
      'Retrae los omóplatos antes de empezar',
      'Empuja hacia arriba y ligeramente hacia dentro',
      'Controla la bajada 2-3 segundos'
    ],
    commonMistakes: [
      'No ajustar bien el asiento (demasiado alto o bajo)',
      'Perder la retracción escapular',
      'Bloquear codos arriba'
    ],
    progression: 'Cuando alcances 10 reps en las 3 series, sube 2.5-5 kg por lado',
    restRecommended: 90
  },
  aperturas_polea: {
    name: 'Aperturas en polea',
    muscleGroup: 'pecho',
    secondaryMuscles: ['hombro anterior'],
    icon: '',
    tips: [
      'Mantén una ligera flexión en los codos durante todo el movimiento',
      'Junta las manos delante del pecho, cruzando ligeramente',
      'Siente el estiramiento al abrir los brazos',
      'Serie de congestión: peso ligero, muchas reps, mucha conexión'
    ],
    commonMistakes: [
      'Flexionar demasiado los codos (se convierte en press)',
      'Usar demasiado peso en una serie de congestión',
      'No controlar la apertura'
    ],
    progression: 'Serie de congestión: mantén el peso ligero y concéntrate en sentir el pecho',
    restRecommended: 45
  },
  remo_polea_abierto: {
    name: 'Remo polea agarre abierto',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'romboides', 'trapecio'],
    icon: '',
    tips: [
      'Agarre pronado (palmas hacia abajo) y más ancho que los hombros',
      'Tira los codos hacia atrás y hacia fuera',
      'Aprieta los omóplatos en la contracción',
      'Este agarre enfatiza la parte alta de la espalda y romboides'
    ],
    commonMistakes: [
      'Usar impulso del torso',
      'No separar suficiente los codos',
      'Redondear la espalda'
    ],
    progression: 'Cuando completes 12 reps con contracción completa, sube 5 kg',
    restRecommended: 90
  },
  remo_maquina_unilateral: {
    name: 'Remo máquina discos unilateral',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'core'],
    icon: '',
    tips: [
      'Al ser unilateral, empieza con el lado más débil',
      'Tira el codo hacia atrás, pegado al cuerpo',
      'Gira ligeramente el torso al tirar para más rango',
      'Aprieta el dorsal 1 segundo en la contracción'
    ],
    commonMistakes: [
      'Rotar demasiado el torso usando impulso',
      'No completar el rango de movimiento',
      'Desequilibrar el peso entre ambos lados'
    ],
    progression: 'Iguala siempre ambos lados. Sube peso cuando el lado débil complete las reps',
    restRecommended: 60
  },
  face_pull: {
    name: 'Face pull',
    muscleGroup: 'hombro posterior',
    secondaryMuscles: ['trapecio', 'romboides'],
    icon: '',
    tips: [
      'Tira la cuerda hacia la cara, separando las manos al final',
      'Los codos deben terminar a la altura de los hombros o más altos',
      'Rotación externa al final: gira las manos para que apunten al techo',
      'Excelente para salud del hombro y postura'
    ],
    commonMistakes: [
      'Tirar demasiado bajo (se convierte en remo)',
      'No separar las manos al final',
      'Inclinarse hacia atrás para mover el peso'
    ],
    progression: 'Ejercicio de salud articular. Prioriza técnica perfecta sobre peso',
    restRecommended: 45
  },
  encogimientos_trapecio: {
    name: 'Encogimientos trapecio',
    muscleGroup: 'trapecio',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Sube los hombros rectos hacia las orejas',
      'Mantén 2 segundos la contracción arriba',
      'Baja controlando despacio',
      'No gires los hombros (movimiento vertical puro)'
    ],
    commonMistakes: [
      'Girar/rotar los hombros (riesgo de lesión)',
      'No mantener la contracción arriba',
      'Flexionar los codos y usar los bíceps'
    ],
    progression: 'Cuando completes 15 reps con contracción de 2 seg, sube peso',
    restRecommended: 60
  },
  press_hombros_mancuernas: {
    name: 'Press hombros mancuernas',
    muscleGroup: 'hombro',
    secondaryMuscles: ['tríceps', 'trapecio'],
    icon: '',
    tips: [
      'Siéntate con la espalda apoyada en el respaldo',
      'Empieza con las mancuernas a la altura de las orejas',
      'Empuja hacia arriba juntando ligeramente las mancuernas',
      'No bloquees los codos arriba del todo'
    ],
    commonMistakes: [
      'Arquear excesivamente la espalda baja',
      'Bajar las mancuernas demasiado (por debajo de las orejas)',
      'Usar demasiado peso y compensar con la espalda'
    ],
    progression: 'Cuando alcances 12 reps en las 3 series, sube 1-2 kg por mancuerna',
    warmup: 'Haz 1-2 series de calentamiento: 12 reps con mancuernas ligeras',
    restRecommended: 90
  },
  elevacion_lateral_polea: {
    name: 'Elevación lateral unilateral polea',
    muscleGroup: 'hombro',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'La polea permite tensión constante en todo el recorrido',
      'Lidera con el codo, no con la mano',
      'Sube hasta paralelo al suelo',
      'La polea baja da un ángulo diferente al de mancuernas/máquina'
    ],
    commonMistakes: [
      'Encoger el hombro al subir',
      'Subir la mano por encima del codo',
      'Usar demasiado peso'
    ],
    progression: 'Ejercicio de aislamiento. Prioriza conexión mente-músculo',
    restRecommended: 45
  },
  curl_bayesian: {
    name: 'Curl bayesian polea',
    muscleGroup: 'bíceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'El brazo queda detrás del cuerpo, lo que estira más el bíceps',
      'Maximiza el estiramiento en la parte baja',
      'Curl completo hasta contracción máxima',
      'Excelente para la cabeza larga del bíceps'
    ],
    commonMistakes: [
      'No dejar que el brazo vaya detrás del cuerpo (perder el estiramiento)',
      'Mover el hombro durante el curl',
      'Hacer el movimiento demasiado rápido'
    ],
    progression: 'Sube peso cuando completes 12 reps con estiramiento completo',
    restRecommended: 60
  },
  triceps_polea_v: {
    name: 'Tríceps polea barra V',
    muscleGroup: 'tríceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Mantén los codos pegados al costado',
      'Extiende completamente los brazos abajo',
      'La barra V permite un agarre neutro más cómodo',
      'Aprieta el tríceps 1 segundo en extensión completa'
    ],
    commonMistakes: [
      'Separar los codos del cuerpo',
      'Inclinar el torso hacia delante para ayudar',
      'No extender completamente'
    ],
    progression: 'Cuando completes 12 reps sin mover los codos, sube peso',
    restRecommended: 60
  },
  press_frances: {
    name: 'Press francés barra',
    muscleGroup: 'tríceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Baja la barra hacia la frente o ligeramente por detrás de la cabeza',
      'Mantén los codos apuntando al techo, no los abras',
      'Extiende los brazos completamente arriba',
      'Ejercicio excelente para la cabeza larga del tríceps'
    ],
    commonMistakes: [
      'Abrir los codos hacia fuera',
      'Mover los hombros (solo deben moverse los antebrazos)',
      'Usar demasiado peso y perder el control'
    ],
    progression: 'Sube peso cuando completes 12 reps con codos estables',
    restRecommended: 60
  },
  curl_muneca: {
    name: 'Curl muñeca barra',
    muscleGroup: 'antebrazo',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Apoya los antebrazos en los muslos, muñecas colgando del borde',
      'Flexiona solo las muñecas, no muevas los antebrazos',
      'Movimiento corto pero controlado',
      'Ayuda a mejorar el agarre para otros ejercicios'
    ],
    commonMistakes: [
      'Mover todo el antebrazo',
      'Usar demasiado peso (las muñecas son articulaciones delicadas)',
      'Hacer el movimiento con rebote'
    ],
    progression: 'Sube peso muy gradualmente. Los antebrazos responden bien a alto volumen',
    restRecommended: 45
  },
  pecho_plano: {
    name: 'Press de banca plano barra', muscleGroup: 'pecho', secondaryMuscles: ["tríceps", "hombro anterior"], icon: '',
    tips: ["Toca el pecho", "Baja controlado", "Pies firmes en el suelo"], commonMistakes: ["Rebotar en el pecho"],
    progression: 'Sube 2.5kg al llegar a 12 reps', restRecommended: 120
  },
  sentadilla: {
    name: 'Sentadilla libre barra', muscleGroup: 'piernas', secondaryMuscles: ["glúteos", "core"], icon: '',
    tips: ["Baja hasta paralelo o más", "Pecho arriba", "Rodillas en línea con puntas"], commonMistakes: ["Redondear lumbar"],
    progression: 'Sube 5kg al llegar a 10 reps', restRecommended: 180
  },
  peso_muerto: {
    name: 'Peso muerto barra', muscleGroup: 'espalda baja', secondaryMuscles: ["isquiotibiales", "glúteos"], icon: '',
    tips: ["Barra pegada al cuerpo", "Espalda recta", "Empuja el suelo"], commonMistakes: ["Redondear espalda"],
    progression: 'Sube 5kg al llegar a 5 reps', restRecommended: 180
  },
  zancadas: {
    name: 'Zancadas mancuernas', muscleGroup: 'cuádriceps', secondaryMuscles: ["glúteos"], icon: '',
    tips: ["Paso largo", "Rodilla no pasa la punta en exceso", "Mantén el equilibrio"], commonMistakes: ["Paso corto que tira de rodilla"],
    progression: 'Sube peso al llegar a 15 reps', restRecommended: 90
  },
  remo_barra: {
    name: 'Remo con barra', muscleGroup: 'espalda', secondaryMuscles: ["bíceps", "lumbares"], icon: '',
    tips: ["Inclinación de 45-90 grados", "Tira hacia el ombligo", "Espalda recta"], commonMistakes: ["Tirar muy arriba"],
    progression: 'Sube 5kg al llegar a 10 reps', restRecommended: 120
  },
  curl_barra: {
    name: 'Curl bíceps barra', muscleGroup: 'bíceps', secondaryMuscles: ["antebrazo"], icon: '',
    tips: ["Codos inmóviles", "Movimiento estricto", "Aprieta arriba"], commonMistakes: ["Balancearse"],
    progression: 'Sube 2.5kg al llegar a 12 reps', restRecommended: 90
  },
  press_militar_b: {
    name: 'Press militar barra de pie', muscleGroup: 'hombro', secondaryMuscles: ["tríceps", "core"], icon: '',
    tips: ["Glúteos y core apretados", "Barra desde clavícula arriba", "No hiperextender lumbar"], commonMistakes: ["Inclinarse hacia atrás demasiado"],
    progression: 'Sube 2.5kg al llegar a 8 reps', restRecommended: 120
  },
  dominadas: {
    name: 'Dominadas agarre prono', muscleGroup: 'espalda', secondaryMuscles: ["bíceps"], icon: '',
    tips: ["Sube hasta pasar la barbilla", "Controla la bajada", "Retracción escapular inicial"], commonMistakes: ["Kipping o balanceo"],
    progression: 'Usa lastre al llegar a 12 reps', restRecommended: 120
  },
  fondo_triceps: {
    name: 'Fondos en paralelas', muscleGroup: 'tríceps', secondaryMuscles: ["pecho inferior"], icon: '',
    tips: ["Cuerpo recto", "Baja hasta 90 grados", "Extiende codos al subir"], commonMistakes: ["Abrir mucho los codos"],
    progression: 'Lastra si pasas de 12 reps', restRecommended: 120
  },
  press_inclinado_m: {
    name: 'Press inclinado mancuernas', muscleGroup: 'pecho', secondaryMuscles: ["hombro anterior", "tríceps"], icon: '',
    tips: ["Banco a 30-45 grados", "Codos a 45 grados", "Estira abajo"], commonMistakes: ["Juntar mancuernas arriba"],
    progression: 'Sube peso al llegar a 12 reps', restRecommended: 120
  },
  elevacion_gemelos: {
    name: 'Elevación de gemelos sentado', muscleGroup: 'gemelos', secondaryMuscles: ["sóleo"], icon: '',
    tips: ["Estira todo abajo", "Sube explosivo y aguanta 2 seg", "Repeticiones altas"], commonMistakes: ["No bajar del todo"],
    progression: 'Sube peso al llegar a 20 reps', restRecommended: 60
  },
  curl_scott: {
    name: 'Curl Scott / Predicador', muscleGroup: 'bíceps', secondaryMuscles: [], icon: '',
    tips: ["Axilas pegadas al soporte", "Estira completo sin soltar tensión", "Sube sin descansar"], commonMistakes: ["Descansar arriba"],
    progression: 'Sube peso al llegar a 12 reps', restRecommended: 90
  },
  pulldown_brazo_recto: {
    name: 'Pulldown con brazo recto', muscleGroup: 'espalda', secondaryMuscles: ["tríceps largo"], icon: '',
    tips: ["Brazos rectos", "Imagina llevar la barra al ombligo en un semicírculo", "Espalda arqueada"], commonMistakes: ["Doblar codos"],
    progression: 'Llega a 15 reps', restRecommended: 60
  },
  peso_muerto_rumano: {
    name: 'Peso muerto rumano (RDL)', muscleGroup: 'isquiotibiales', secondaryMuscles: ["glúteos", "lumbares"], icon: '',
    tips: ["Lleva caderas atrás", "Ligera flexión de rodilla", "Barra rozando piernas"], commonMistakes: ["Bajar solo moviendo el torso"],
    progression: 'Sube 5kg al hacer 12 reps', restRecommended: 120
  },
  hip_thrust: {
    name: 'Hip Thrust con barra', muscleGroup: 'glúteos', secondaryMuscles: ["isquiotibiales"], icon: '',
    tips: ["Espalda apoyada en el banco por las escápulas", "Empuja con los talones", "Aprieta un segundo arriba"], commonMistakes: ["Mirar al techo en lugar del frente"],
    progression: 'Sube 10kg al llegar a 12 reps', restRecommended: 120
  },
  cruce_poleas: {
    name: 'Cruce de poleas', muscleGroup: 'pecho', secondaryMuscles: [], icon: '',
    tips: ["Pecho fuera", "Brazos levemente flexionados", "Acerca las manos como si abrazaras un árbol"], commonMistakes: ["Hacer press en vez de apertura"],
    progression: 'Llega a 15 reps perfecto', restRecommended: 60
  },
  press_frances_mancuernas: {
    name: 'Press francés mancuernas', muscleGroup: 'tríceps', secondaryMuscles: [], icon: '',
    tips: ["Codos firmes apuntando arriba", "Baja hacia los lados de la cabeza", "Sube solo con el tríceps"], commonMistakes: ["Mover el brazo entero"],
    progression: 'Llega a 12 reps', restRecommended: 60
  },
  v_bar_pulldown: {
    name: 'Jalón agarre estrecho V', muscleGroup: 'espalda', secondaryMuscles: ["bíceps"], icon: '',
    tips: ["Saca pecho", "Tira hacia el esternón", "Deja elongar el dorsal"], commonMistakes: ["Tirar hacia la barriga"],
    progression: 'Llega a 10 reps', restRecommended: 90
  },
  pajaros: {
    name: 'Pájaros mancuerna', muscleGroup: 'hombro posterior', secondaryMuscles: ["trapecio"], icon: '',
    tips: ["Tronco inclinado paralelo al suelo", "Eleva brazos hacia atrás y arriba", "Controla la bajada"], commonMistakes: ["Torso demasiado alto"],
    progression: 'Llega a 15 reps', restRecommended: 60
  },

  // === PECHO ===
  press_plano_mancuernas: {
    name: 'Press plano mancuernas',
    muscleGroup: 'pecho',
    secondaryMuscles: ['tríceps', 'hombro anterior'],
    icon: '',
    tips: [
      'Retrae omóplatos y mantén contacto con el banco',
      'Baja las mancuernas controlando la excéntrica 2-3 seg',
      'Sube sin chocar las mancuernas arriba, aprieta el pecho',
      'No bloquees los codos completamente en la parte alta'
    ],
    commonMistakes: [
      'Separar los omóplatos del banco al empujar',
      'Bajar demasiado profundo (estrés en el hombro)',
      'Abrir los codos a 90° (mejor 45-75°)'
    ],
    progression: 'Cuando alcances 12 reps en 3 series, sube 2 kg',
    warmup: '2 series: 12 reps al 40%, 6 reps al 60%',
    restRecommended: 120
  },
  aperturas_mancuernas: {
    name: 'Aperturas mancuernas',
    muscleGroup: 'pecho',
    secondaryMuscles: ['hombro anterior'],
    icon: '',
    tips: [
      'Mantén ligera flexión en los codos durante todo el movimiento',
      'Abre hasta sentir el estiramiento del pecho, no más',
      'Concéntrate en juntar las mancuernas arriba apretando el pecho'
    ],
    commonMistakes: [
      'Usar demasiado peso (riesgo de lesión en el hombro)',
      'Mover los brazos como si fuera press en vez de apertura'
    ],
    progression: 'Prioriza la conexión mente-músculo sobre el peso',
    restRecommended: 90
  },
  press_declinado_maquina: {
    name: 'Press declinado máquina',
    muscleGroup: 'pecho',
    secondaryMuscles: ['tríceps'],
    icon: '',
    tips: [
      'Ajusta el asiento para que los agarres queden a la altura del pecho inferior',
      'Empuja hacia delante y ligeramente hacia abajo',
      'Aprieta el pecho abajo en la contracción'
    ],
    commonMistakes: [
      'No completar el rango de movimiento',
      'Levantar los glúteos del asiento'
    ],
    progression: 'Cuando alcances 12 reps en 2 series, sube 5 kg',
    restRecommended: 90
  },

  // === ESPALDA ===
  remo_maquina: {
    name: 'Remo en máquina',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'lumbares'],
    icon: '',
    tips: [
      'Tira con los codos hacia atrás, no con las manos',
      'Aprieta los dorsales 1 seg en la contracción',
      'Controla la vuelta del peso 2-3 seg',
      'Mantén el pecho apoyado contra el soporte'
    ],
    commonMistakes: [
      'Usar los bíceps más que la espalda',
      'No completar el rango de movimiento',
      'Balancear el torso para generar impulso'
    ],
    progression: 'Cuando alcances 10 reps en 3 series, sube 5 kg',
    warmup: '1-2 series de calentamiento: 12 reps al 50%, 6 reps al 70%',
    restRecommended: 90
  },
  jalons_agarre_neutro: {
    name: 'Jalón agarre neutro (triángulo)',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'lumbares'],
    icon: '',
    tips: [
      'Inclínate ligeramente hacia atrás al tirar',
      'Lleva el agarre hacia la parte superior del pecho',
      'Aprieta los dorsales abajo, siente el estiramiento arriba'
    ],
    commonMistakes: [
      'Tirar hacia la barriga en vez del pecho',
      'Inclinarse demasiado hacia atrás'
    ],
    progression: 'Cuando alcances 10 reps en 3 series, sube 5 kg',
    restRecommended: 90
  },
  remo_con_mancuerna_unilateral: {
    name: 'Remo mancuerna unilateral',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'lumbares'],
    icon: '',
    tips: [
      'Apoya la rodilla y la mano del mismo lado en el banco',
      'Tira la mancuerna hacia la cadera, no hacia el pecho',
      'Mantén la espalda recta, no redondees'
    ],
    commonMistakes: [
      'Rotar el torso excesivamente al subir',
      'Usar impulso de las caderas'
    ],
    progression: 'Iguala reps y peso en ambos lados',
    restRecommended: 90
  },

  // === HOMBRO ===
  press_militar_mancuernas_sentado: {
    name: 'Press militar mancuernas sentado',
    muscleGroup: 'hombro',
    secondaryMuscles: ['tríceps', 'core'],
    icon: '',
    tips: [
      'Ajusta el banco a 90°, apoya la espalda',
      'Sube las mancuernas sin que choquen arriba',
      'Baja hasta que las mancuernas lleguen a la altura de las orejas'
    ],
    commonMistakes: [
      'Arquear la espalda baja en exceso',
      'Bloquear los codos arriba completamente'
    ],
    progression: 'Cuando alcances 10 reps en 3 series, sube 2 kg',
    warmup: '2 series: 12 reps al 40%, 6 reps al 60%',
    restRecommended: 120
  },
  elevaciones_frontales_mancuerna: {
    name: 'Elevaciones frontales mancuerna',
    muscleGroup: 'hombro',
    secondaryMuscles: ['trapecio'],
    icon: '',
    tips: [
      'Sube la mancuerna al frente hasta la altura del hombro',
      'Controla la bajada 2-3 seg',
      'Alterna brazos o haz ambos simultáneamente'
    ],
    commonMistakes: [
      'Usar impulso balanceando el torso',
      'Subir más allá de paralelo (activa trapecio)'
    ],
    progression: 'Sube peso cuando completes 12 reps perfectas',
    restRecommended: 60
  },

  // === TRÍCEPS ===
  extension_triceps_sobre_cabeza: {
    name: 'Extensión tríceps sobre cabeza (polea/manco)',
    muscleGroup: 'tríceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Mantén los codos apuntando al techo, no se abran',
      'Estira completamente el brazo arriba',
      'Controla la bajada detrás de la cabeza'
    ],
    commonMistakes: [
      'Abrir los codos hacia los lados',
      'No extender completamente el brazo'
    ],
    progression: 'Sube peso cuando completes 12 reps con ambos brazos',
    restRecommended: 60
  },
  press_triceps_polea: {
    name: 'Press tríceps polea (barra recta/V)',
    muscleGroup: 'tríceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Pega los codos al cuerpo durante todo el movimiento',
      'Extiende completamente abajo, aprieta el tríceps',
      'Sube controlando el peso, no dejes que la polea tire'
    ],
    commonMistakes: [
      'Separar los codos del cuerpo',
      'Inclinar el torso hacia delante para generar impulso'
    ],
    progression: 'Sube peso cuando completes 12 reps estrictas',
    restRecommended: 60
  },
  patada_triceps_mancuerna: {
    name: 'Patada tríceps mancuerna',
    muscleGroup: 'tríceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Inclínate hacia delante, brazo paralelo al suelo',
      'Extiende el brazo atrás hasta bloqueo completo',
      'Aprieta el tríceps 1 seg en extensión'
    ],
    commonMistakes: [
      'Mover el codo durante la extensión',
      'Usar demasiado peso y perder la técnica'
    ],
    progression: 'Sube peso cuando completes 12 reps estrictas',
    restRecommended: 60
  },

  // === BÍCEPS ===
  curl_martillo_mancuernas: {
    name: 'Curl martillo mancuernas',
    muscleGroup: 'bíceps',
    secondaryMuscles: ['antebrazo'],
    icon: '',
    tips: [
      'Agarre neutro (palmas enfrentadas) todo el movimiento',
      'Sube la mancuerna controlando la velocidad',
      'Aprieta el bíceps arriba 1 seg'
    ],
    commonMistakes: [
      'Balancear el torso para generar impulso',
      'Mover los codos hacia atrás al subir'
    ],
    progression: 'Sube peso cuando completes 12 reps estrictas',
    restRecommended: 60
  },
  curl_polea_cuerda: {
    name: 'Curl bíceps polea cuerda',
    muscleGroup: 'bíceps',
    secondaryMuscles: ['antebrazo'],
    icon: '',
    tips: [
      'La tensión constante de la polea es clave',
      'Aprieta el bíceps en la contracción máxima',
      'Controla la extensión completa del brazo'
    ],
    commonMistakes: [
      'Mover los codos fuera de posición',
      'Usar demasiado peso y perder la forma'
    ],
    progression: 'Sube peso cuando completes 12 reps perfectas',
    restRecommended: 60
  },
  curl_inclinado_mancuernas: {
    name: 'Curl inclinado mancuernas',
    muscleGroup: 'bíceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Banco a 45-60°, apoya la espalda completamente',
      'Deja colgar los brazos, estiramiento completo del bíceps',
      'Sube las mancuernas apretando el bíceps'
    ],
    commonMistakes: [
      'Inclinar el torso hacia delante',
      'No completar la extensión abajo'
    ],
    progression: 'Sube peso cuando completes 10 reps en 3 series',
    restRecommended: 60
  },

  // === PIERNA - CUÁDRICEPS ===
  prensa_piernas: {
    name: 'Prensa de piernas',
    muscleGroup: 'cuádriceps',
    secondaryMuscles: ['glúteos', 'isquiotibiales'],
    icon: '',
    tips: [
      'Coloca los pies a la anchura de los hombros',
      'Baja controlando el peso hasta 90° de rodilla',
      'Empuja con los talones, no con las puntas',
      'No bloquees las rodillas completamente arriba'
    ],
    commonMistakes: [
      'Levantar los glúteos del asiento',
      'Bajar demasiado profundo (estrés en lumbar)',
      'Bloquear las rodillas arriba'
    ],
    progression: 'Cuando alcances 12 reps en 3 series, sube 10 kg',
    warmup: '2 series: 15 reps al 40%, 8 reps al 60%',
    restRecommended: 120
  },
  extension_cuadriceps_maquina: {
    name: 'Extensión de cuádriceps máquina',
    muscleGroup: 'cuádriceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Extiende las piernas completamente arriba',
      'Aprieta el cuádriceps 1-2 seg en extensión',
      'Baja de forma controlada 2-3 seg'
    ],
    commonMistakes: [
      'Usar impulso con la cadera',
      'No completar el rango de movimiento'
    ],
    progression: 'Sube peso cuando completes 15 reps estrictas',
    restRecommended: 90
  },
  sentadilla_bulgarra: {
    name: 'Sentadilla búlgara',
    muscleGroup: 'cuádriceps',
    secondaryMuscles: ['glúteos', 'core'],
    icon: '',
    tips: [
      'Apoya el empeine del pie trasero en el banco',
      'Baja la rodilla trasera hacia el suelo',
      'Mantén el torso recto y el core activado'
    ],
    commonMistakes: [
      'Inclinar el torso demasiado hacia delante',
      'No bajar suficiente (rango incompleto)'
    ],
    progression: 'Empieza con peso corporal, luego añade mancuernas',
    restRecommended: 90
  },

  // === PIERNA - ISQUIOTIBIALES ===
  curl_femoral_maquina_sentado: {
    name: 'Curl femoral máquina sentado',
    muscleGroup: 'isquiotibiales',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Apoya bien la espalda contra el respaldo',
      'Flexiona las piernas llevando los talones hacia los glúteos',
      'Aprieta los isquiotibiales 1 seg arriba'
    ],
    commonMistakes: [
      'Levantar los glúteos del asiento',
      'Usar impulso en vez de fuerza de los isquios'
    ],
    progression: 'Sube peso cuando completes 12 reps perfectas',
    restRecommended: 90
  },
  curl_femoral_maquina_tumbado: {
    name: 'Curl femoral máquina tumbado',
    muscleGroup: 'isquiotibiales',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Mantén las caderas pegadas al banco',
      'Flexiona las piernas controlando el peso',
      'Aprieta los isquiotibiales arriba 1 seg'
    ],
    commonMistakes: [
      'Levantar las caderas del banco',
      'Bajar el peso demasiado rápido'
    ],
    progression: 'Sube peso cuando completes 12 reps perfectas',
    restRecommended: 90
  },

  // === GLÚTEOS ===
  hip_thrust_maquina: {
    name: 'Hip Thrust en máquina',
    muscleGroup: 'glúteos',
    secondaryMuscles: ['isquiotibiales'],
    icon: '',
    tips: [
      'Apoya la espalda alta en el soporte de la máquina',
      'Empuja con los talones, aprieta los glúteos arriba',
      'Mantén la barbilla pegada al pecho'
    ],
    commonMistakes: [
      'Extender demasiado la espalda baja (hiperlordosis)',
      'Empujar con la espalda en vez de los glúteos'
    ],
    progression: 'Cuando alcances 12 reps en 3 series, sube 5 kg',
    restRecommended: 120
  },
  patada_gluteo_polea: {
    name: 'Patada de glúteo en polea',
    muscleGroup: 'glúteos',
    secondaryMuscles: ['isquiotibiales'],
    icon: '',
    tips: [
      'Mantén el core activado y la espalda neutra',
      'Empuja la pierna hacia atrás apretando el glúteo',
      'Controla la vuelta del peso'
    ],
    commonMistakes: [
      'Arquear la espalda baja al extender',
      'Usar impulso en vez de contracción del glúteo'
    ],
    progression: 'Sube peso cuando completes 15 reps perfectas',
    restRecommended: 60
  },

  // === ADUCTORES ===
  aductor_maquina: {
    name: 'Aductor en máquina',
    muscleGroup: 'aductores',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Aprieta las piernas juntas 1-2 seg',
      'Controla la apertura de las piernas 2-3 seg',
      'Mantén la espalda apoyada contra el respaldo'
    ],
    commonMistakes: [
      'Usar impulso abriendo y cerrando rápido',
      'No completar el rango de movimiento'
    ],
    progression: 'Sube peso cuando completes 15 reps estrictas',
    restRecommended: 60
  },

  // === GEMELOS ===
  elevacion_gemelos_de_pie: {
    name: 'Elevación de gemelos de pie (máquina)',
    muscleGroup: 'gemelos',
    secondaryMuscles: ['sóleo'],
    icon: '',
    tips: [
      'Sube lo más alto posible sobre las puntas de los pies',
      'Aprieta los gemelos 1-2 seg arriba',
      'Baja hasta sentir el estiramiento completo'
    ],
    commonMistakes: [
      'Hacer rebotes en la parte baja',
      'No completar el rango de movimiento'
    ],
    progression: 'Sube peso cuando completes 15 reps perfectas',
    restRecommended: 60
  },
  elevacion_gemelos_prensa: {
    name: 'Elevación de gemelos en prensa',
    muscleGroup: 'gemelos',
    secondaryMuscles: ['sóleo'],
    icon: '',
    tips: [
      'Coloca las puntas de los pies en el borde inferior de la plataforma',
      'Empuja con las puntas de los pies, no con los talones',
      'Mantén las piernas casi rectas (ligera flexión de rodilla)'
    ],
    commonMistakes: [
      'Flexionar demasiado las rodillas (trabaja sóleo en vez de gemelo)',
      'Hacer rebotes'
    ],
    progression: 'Sube peso cuando completes 15 reps perfectas',
    restRecommended: 60
  },

  // === CORE ===
  plancha_abdominal: {
    name: 'Plancha abdominal',
    muscleGroup: 'core',
    secondaryMuscles: ['oblicuos', 'hombro'],
    icon: '',
    tips: [
      'Mantén el cuerpo en línea recta de cabeza a talones',
      'Activa el core y los glúteos durante toda la plancha',
      'Respira de forma controlada, no aguantes la respiración'
    ],
    commonMistakes: [
      'Dejar caer las caderas hacia abajo',
      'Levantar los glúteos demasiado (forma de V invertida)'
    ],
    progression: 'Aguanta 30-60 seg, progresa aumentando el tiempo',
    restRecommended: 60
  },
  rueda_abdominal: {
    name: 'Rueda abdominal',
    muscleGroup: 'core',
    secondaryMuscles: ['hombro', 'espalda baja'],
    icon: '',
    tips: [
      'Empuja la rueda hacia delante controlando el core',
      'Vuelve tirando con el abdomen, no con los brazos',
      'Mantén la espalda neutra, no dejes que se hunda'
    ],
    commonMistakes: [
      'Arquear la espalda baja (peligro de lesión)',
      'Ir demasiado lejos al principio'
    ],
    progression: 'Empieza con recorrido corto, progresa gradualmente',
    restRecommended: 60
  },
  elevacion_piernas_colgado: {
    name: 'Elevación de piernas colgado',
    muscleGroup: 'core',
    secondaryMuscles: ['flexores de cadera'],
    icon: '',
    tips: [
      'Cuelga de la barra con agarre a la anchura de los hombros',
      'Eleva las piernas hasta paralelo o más',
      'Controla la bajada, no dejes que caigan'
    ],
    commonMistakes: [
      'Balancearse como un péndulo',
      'Usar impulso de la cadera'
    ],
    progression: 'Empieza con rodillas al pecho, progresa a piernas rectas',
    restRecommended: 60
  },

  // === TRAPECIO ===
  encogimientos_mancuernas: {
    name: 'Encogimientos con mancuernas (Trapecio)',
    muscleGroup: 'trapecio',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Sube los hombros hacia las orejas, no hacia delante ni atrás',
      'Aprieta los trapecios 1-2 seg arriba',
      'Baja de forma controlada'
    ],
    commonMistakes: [
      'Rotar los hombros (innecesario y potencialmente lesivo)',
      'Usar demasiado peso sin completar el movimiento'
    ],
    progression: 'Sube peso cuando completes 15 reps estrictas',
    restRecommended: 60
  },
  encogimientos_barra: {
    name: 'Encogimientos con barra',
    muscleGroup: 'trapecio',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Sujeta la barra con agarre prono a la anchura de los hombros',
      'Sube los hombros rectos hacia las orejas',
      'Aprieta los trapecios arriba 1-2 seg'
    ],
    commonMistakes: [
      'Flexionar los codos (deben estar rectos)',
      'Inclinar el torso hacia delante'
    ],
    progression: 'Sube peso cuando completes 12 reps estrictas',
    restRecommended: 60
  },

  // === ANTEBRAZO ===
  curl_antebrazo_polea: {
    name: 'Curl de antebrazo en polea',
    muscleGroup: 'antebrazo',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Apoya los antebrazos en el banco, muñecas fuera del borde',
      'Flexiona las muñecas hacia arriba (flexión)',
      'Controla la extensión completa de las muñecas abajo'
    ],
    commonMistakes: [
      'Mover los codos en vez de las muñecas',
      'Usar demasiado peso sin completar el rango'
    ],
    progression: 'Sube peso cuando completes 15 reps estrictas',
    restRecommended: 60
  },
  curl_antebrazo_mancuerna_invertido: {
    name: 'Curl invertido de muñeca (manco)',
    muscleGroup: 'antebrazo',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Agarre prono (palmas hacia abajo)',
      'Extiende las muñecas hacia arriba',
      'Controla la bajada 2-3 seg'
    ],
    commonMistakes: [
      'Mover los codos durante el ejercicio',
      'Usar impulso balanceando la mancuerna'
    ],
    progression: 'Sube peso cuando completes 15 reps estrictas',
    restRecommended: 60
  },

  // === PECHO ===
  press_plano_mancuernas: {
    name: 'Press plano mancuernas',
    muscleGroup: 'pecho',
    secondaryMuscles: ['tríceps', 'hombro anterior'],
    icon: '',
    tips: [
      'Retrae omóplatos y mantén contacto con el banco',
      'Baja las mancuernas controlando la excéntrica 2-3 seg',
      'Sube sin chocar las mancuernas arriba, aprieta el pecho',
      'No bloquees los codos completamente en la parte alta'
    ],
    commonMistakes: [
      'Separar los omóplatos del banco al empujar',
      'Bajar demasiado profundo (estrés en el hombro)',
      'Abrir los codos a 90° (mejor 45-75°)'
    ],
    progression: 'Cuando alcances 12 reps en 3 series, sube 2 kg',
    warmup: '2 series: 12 reps al 40%, 6 reps al 60%',
    restRecommended: 120
  },
  aperturas_mancuernas: {
    name: 'Aperturas mancuernas',
    muscleGroup: 'pecho',
    secondaryMuscles: ['hombro anterior'],
    icon: '',
    tips: [
      'Mantén ligera flexión en los codos durante todo el movimiento',
      'Abre hasta sentir el estiramiento del pecho, no más',
      'Concéntrate en juntar las mancuernas arriba apretando el pecho'
    ],
    commonMistakes: [
      'Usar demasiado peso (riesgo de lesión en el hombro)',
      'Mover los brazos como si fuera press en vez de apertura'
    ],
    progression: 'Prioriza la conexión mente-músculo sobre el peso',
    restRecommended: 90
  },
  press_declinado_maquina: {
    name: 'Press declinado máquina',
    muscleGroup: 'pecho',
    secondaryMuscles: ['tríceps'],
    icon: '',
    tips: [
      'Ajusta el asiento para que los agarres queden a la altura del pecho inferior',
      'Empuja hacia delante y ligeramente hacia abajo',
      'Aprieta el pecho abajo en la contracción'
    ],
    commonMistakes: [
      'No completar el rango de movimiento',
      'Levantar los glúteos del asiento'
    ],
    progression: 'Cuando alcances 12 reps en 2 series, sube 5 kg',
    restRecommended: 90
  },
  press_declinado_mancuernas: {
    name: 'Press declinado mancuernas',
    muscleGroup: 'pecho',
    secondaryMuscles: ['tríceps'],
    icon: '',
    tips: [
      'Banco declinado a 15-30 grados',
      'Empuja hacia arriba y ligeramente hacia dentro',
      'Controla la bajada 2-3 segundos'
    ],
    commonMistakes: [
      'Bajar demasiado profundo',
      'Separar los omóplatos del banco'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 90
  },
  cruce_poleas: {
    name: 'Cruce de poleas',
    muscleGroup: 'pecho',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Pecho fuera, brazos levemente flexionados',
      'Acerca las manos como si abrazaras un árbol',
      'Aprieta el pecho en la contracción'
    ],
    commonMistakes: [
      'Hacer press en vez de apertura',
      'Usar demasiado peso'
    ],
    progression: 'Llega a 15 reps perfecto',
    restRecommended: 60
  },
  pullover_mancuerna: {
    name: 'Pullover mancuerna',
    muscleGroup: 'pecho',
    secondaryMuscles: ['dorsal', 'tríceps largo'],
    icon: '',
    tips: [
      'Baja la mancuerna detrás de la cabeza controlando',
      'Mantén ligera flexión en los codos',
      'Sube apretando el pecho y dorsales'
    ],
    commonMistakes: [
      'Bajar demasiado rápido',
      'Extender completamente los codos'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 90
  },

  // === ESPALDA ===
  remo_maquina: {
    name: 'Remo en máquina',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'lumbares'],
    icon: '',
    tips: [
      'Tira con los codos hacia atrás, no con las manos',
      'Aprieta los dorsales 1 seg en la contracción',
      'Controla la vuelta del peso 2-3 seg',
      'Mantén el pecho apoyado contra el soporte'
    ],
    commonMistakes: [
      'Usar los bíceps más que la espalda',
      'No completar el rango de movimiento',
      'Balancear el torso para generar impulso'
    ],
    progression: 'Cuando alcances 10 reps en 3 series, sube 5 kg',
    warmup: '1-2 series de calentamiento: 12 reps al 50%, 6 reps al 70%',
    restRecommended: 90
  },
  jalons_agarre_neutro: {
    name: 'Jalón agarre neutro (triángulo)',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'lumbares'],
    icon: '',
    tips: [
      'Inclínate ligeramente hacia atrás al tirar',
      'Lleva el agarre hacia la parte superior del pecho',
      'Aprieta los dorsales abajo, siente el estiramiento arriba'
    ],
    commonMistakes: [
      'Tirar hacia la barriga en vez del pecho',
      'Inclinarse demasiado hacia atrás'
    ],
    progression: 'Cuando alcances 10 reps en 3 series, sube 5 kg',
    restRecommended: 90
  },
  remo_con_mancuerna_unilateral: {
    name: 'Remo mancuerna unilateral',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'lumbares'],
    icon: '',
    tips: [
      'Apoya la rodilla y la mano del mismo lado en el banco',
      'Tira la mancuerna hacia la cadera, no hacia el pecho',
      'Mantén la espalda recta, no redondees'
    ],
    commonMistakes: [
      'Rotar el torso excesivamente al subir',
      'Usar impulso de las caderas'
    ],
    progression: 'Iguala reps y peso en ambos lados',
    restRecommended: 90
  },
  remo_t_barra: {
    name: 'Remo en T',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps', 'lumbares'],
    icon: '',
    tips: [
      'Inclinación de 45 grados, barra entre las piernas',
      'Tira hacia el ombligo apretando la espalda',
      'Mantén el core activado'
    ],
    commonMistakes: [
      'Redondear la espalda baja',
      'Usar impulso del torso'
    ],
    progression: 'Sube peso al llegar a 10 reps',
    restRecommended: 120
  },
  dominadas_agarre_supino: {
    name: 'Dominadas agarre supino (Chin-ups)',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps'],
    icon: '',
    tips: [
      'Agarre supino (palmas hacia ti)',
      'Sube hasta pasar la barbilla',
      'Controla la bajada'
    ],
    commonMistakes: [
      'Kipping o balanceo',
      'No completar el rango'
    ],
    progression: 'Usa lastre al llegar a 12 reps',
    restRecommended: 120
  },
  dominadas_agarre_neutro: {
    name: 'Dominadas agarre neutro',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps'],
    icon: '',
    tips: [
      'Agarre neutro (palmas enfrentadas)',
      'Tira con los codos hacia abajo',
      'Aprieta los dorsales arriba'
    ],
    commonMistakes: [
      'Subir los hombros',
      'No controlar la bajada'
    ],
    progression: 'Usa lastre al llegar a 10 reps',
    restRecommended: 120
  },
  jalons_agarre_ancho: {
    name: 'Jalón agarre ancho',
    muscleGroup: 'espalda',
    secondaryMuscles: ['bíceps'],
    icon: '',
    tips: [
      'Agarre más ancho que los hombros',
      'Tira hacia el pecho superior',
      'Aprieta los dorsales abajo'
    ],
    commonMistakes: [
      'Tirar detrás de la cabeza',
      'Inclinarse demasiado'
    ],
    progression: 'Sube peso al llegar a 10 reps',
    restRecommended: 90
  },
  pulldown_brazo_recto: {
    name: 'Pulldown con brazo recto',
    muscleGroup: 'espalda',
    secondaryMuscles: ['tríceps largo'],
    icon: '',
    tips: [
      'Brazos rectos, imagina llevar la barra al ombligo en un semicírculo',
      'Espalda arqueada, pecho fuera',
      'Aprieta los dorsales abajo'
    ],
    commonMistakes: [
      'Doblar codos',
      'Usar impulso'
    ],
    progression: 'Llega a 15 reps',
    restRecommended: 60
  },

  // === HOMBRO ===
  press_militar_mancuernas_sentado: {
    name: 'Press militar mancuernas sentado',
    muscleGroup: 'hombro',
    secondaryMuscles: ['tríceps', 'core'],
    icon: '',
    tips: [
      'Ajusta el banco a 90°, apoya la espalda',
      'Sube las mancuernas sin que choquen arriba',
      'Baja hasta que las mancuernas lleguen a la altura de las orejas'
    ],
    commonMistakes: [
      'Arquear la espalda baja en exceso',
      'Bloquear los codos arriba completamente'
    ],
    progression: 'Cuando alcances 10 reps en 3 series, sube 2 kg',
    warmup: '2 series: 12 reps al 40%, 6 reps al 60%',
    restRecommended: 120
  },
  elevaciones_frontales_mancuerna: {
    name: 'Elevaciones frontales mancuerna',
    muscleGroup: 'hombro',
    secondaryMuscles: ['trapecio'],
    icon: '',
    tips: [
      'Sube la mancuerna al frente hasta la altura del hombro',
      'Controla la bajada 2-3 seg',
      'Alterna brazos o haz ambos simultáneamente'
    ],
    commonMistakes: [
      'Usar impulso balanceando el torso',
      'Subir más allá de paralelo (activa trapecio)'
    ],
    progression: 'Sube peso cuando completes 12 reps perfectas',
    restRecommended: 60
  },
  elevaciones_frontales_polea: {
    name: 'Elevaciones frontales polea',
    muscleGroup: 'hombro',
    secondaryMuscles: ['trapecio'],
    icon: '',
    tips: [
      'Tira la polea hacia delante hasta la altura del hombro',
      'Controla la vuelta',
      'Mantén el core activado'
    ],
    commonMistakes: [
      'Inclinarse hacia atrás',
      'Usar impulso'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 60
  },
  press_arnold: {
    name: 'Press Arnold',
    muscleGroup: 'hombro',
    secondaryMuscles: ['tríceps'],
    icon: '',
    tips: [
      'Empieza con palmas hacia ti, rota al subir',
      'Termina con palmas hacia fuera',
      'Movimiento fluido y controlado'
    ],
    commonMistakes: [
      'Usar demasiado peso',
      'No completar la rotación'
    ],
    progression: 'Sube peso al llegar a 10 reps',
    restRecommended: 90
  },
  elevacion_lateral_polea_unilateral: {
    name: 'Elevación lateral polea unilateral',
    muscleGroup: 'hombro',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'La polea da tensión constante',
      'Lidera con el codo',
      'Sube hasta paralelo'
    ],
    commonMistakes: [
      'Encoger el hombro',
      'Subir la mano por encima del codo'
    ],
    progression: 'Prioriza conexión mente-músculo',
    restRecommended: 45
  },
  face_pull_cuerda: {
    name: 'Face pull cuerda',
    muscleGroup: 'hombro posterior',
    secondaryMuscles: ['trapecio', 'romboides'],
    icon: '',
    tips: [
      'Tira la cuerda hacia la cara separando las manos',
      'Codos a la altura de los hombros',
      'Rotación externa al final'
    ],
    commonMistakes: [
      'Tirar demasiado bajo',
      'No separar las manos'
    ],
    progression: 'Prioriza técnica perfecta',
    restRecommended: 45
  },

  // === TRÍCEPS ===
  extension_triceps_sobre_cabeza: {
    name: 'Extensión tríceps sobre cabeza (polea/manco)',
    muscleGroup: 'tríceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Mantén los codos apuntando al techo',
      'Estira completamente el brazo arriba',
      'Controla la bajada detrás de la cabeza'
    ],
    commonMistakes: [
      'Abrir los codos hacia los lados',
      'No extender completamente'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 60
  },
  press_triceps_polea: {
    name: 'Press tríceps polea (barra recta/V)',
    muscleGroup: 'tríceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Pega los codos al cuerpo',
      'Extiende completamente abajo',
      'Aprieta el tríceps en extensión'
    ],
    commonMistakes: [
      'Separar los codos',
      'Inclinar el torso'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 60
  },
  patada_triceps_mancuerna: {
    name: 'Patada tríceps mancuerna',
    muscleGroup: 'tríceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Inclínate hacia delante, brazo paralelo al suelo',
      'Extiende el brazo atrás hasta bloqueo',
      'Aprieta el tríceps 1 seg'
    ],
    commonMistakes: [
      'Mover el codo',
      'Usar demasiado peso'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 60
  },
  extension_triceps_banca: {
    name: 'Extensión tríceps en banca (Skullcrushers)',
    muscleGroup: 'tríceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Baja la barra hacia la frente',
      'Mantén los codos apuntando al techo',
      'Extiende completamente arriba'
    ],
    commonMistakes: [
      'Abrir los codos',
      'Mover los hombros'
    ],
    progression: 'Sube peso al llegar a 10 reps',
    restRecommended: 90
  },

  // === BÍCEPS ===
  curl_martillo_mancuernas: {
    name: 'Curl martillo mancuernas',
    muscleGroup: 'bíceps',
    secondaryMuscles: ['antebrazo'],
    icon: '',
    tips: [
      'Agarre neutro (palmas enfrentadas)',
      'Sube controlando la velocidad',
      'Aprieta el bíceps arriba 1 seg'
    ],
    commonMistakes: [
      'Balancear el torso',
      'Mover los codos hacia atrás'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 60
  },
  curl_polea_cuerda: {
    name: 'Curl bíceps polea cuerda',
    muscleGroup: 'bíceps',
    secondaryMuscles: ['antebrazo'],
    icon: '',
    tips: [
      'Tensión constante de la polea',
      'Aprieta el bíceps en contracción',
      'Controla la extensión completa'
    ],
    commonMistakes: [
      'Mover los codos',
      'Usar demasiado peso'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 60
  },
  curl_inclinado_mancuernas: {
    name: 'Curl inclinado mancuernas',
    muscleGroup: 'bíceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Banco a 45-60°, apoya la espalda',
      'Deja colgar los brazos, estiramiento completo',
      'Sube apretando el bíceps'
    ],
    commonMistakes: [
      'Inclinar el torso',
      'No completar la extensión'
    ],
    progression: 'Sube peso al llegar a 10 reps',
    restRecommended: 60
  },
  curl_concentrado: {
    name: 'Curl concentrado',
    muscleGroup: 'bíceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Apoya el codo en la parte interna del muslo',
      'Sube la mancuerna apretando el bíceps',
      'Controla la bajada'
    ],
    commonMistakes: [
      'Mover el torso',
      'Usar impulso'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 60
  },
  curl_polea_barra_recta: {
    name: 'Curl bíceps polea barra recta',
    muscleGroup: 'bíceps',
    secondaryMuscles: ['antebrazo'],
    icon: '',
    tips: [
      'Agarre a la anchura de los hombros',
      'Mantén los codos pegados al costado',
      'Aprieta el bíceps arriba'
    ],
    commonMistakes: [
      'Balancearse',
      'Mover los codos'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 60
  },

  // === PIERNA - CUÁDRICEPS ===
  prensa_piernas: {
    name: 'Prensa de piernas',
    muscleGroup: 'cuádriceps',
    secondaryMuscles: ['glúteos', 'isquiotibiales'],
    icon: '',
    tips: [
      'Pies a la anchura de los hombros',
      'Baja controlando hasta 90° de rodilla',
      'Empuja con los talones',
      'No bloquees las rodillas arriba'
    ],
    commonMistakes: [
      'Levantar los glúteos',
      'Bajar demasiado profundo',
      'Bloquear las rodillas'
    ],
    progression: 'Sube 10 kg al llegar a 12 reps',
    warmup: '2 series: 15 reps al 40%, 8 reps al 60%',
    restRecommended: 120
  },
  extension_cuadriceps_maquina: {
    name: 'Extensión de cuádriceps máquina',
    muscleGroup: 'cuádriceps',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Extiende completamente arriba',
      'Aprieta el cuádriceps 1-2 seg',
      'Baja controlando 2-3 seg'
    ],
    commonMistakes: [
      'Usar impulso con la cadera',
      'No completar el rango'
    ],
    progression: 'Sube peso al llegar a 15 reps',
    restRecommended: 90
  },
  sentadilla_bulgarra: {
    name: 'Sentadilla búlgara',
    muscleGroup: 'cuádriceps',
    secondaryMuscles: ['glúteos', 'core'],
    icon: '',
    tips: [
      'Apoya el empeine en el banco',
      'Baja la rodilla trasera hacia el suelo',
      'Mantén el torso recto'
    ],
    commonMistakes: [
      'Inclinar el torso',
      'No bajar suficiente'
    ],
    progression: 'Empieza con peso corporal, luego mancuernas',
    restRecommended: 90
  },
  sentadilla_hack: {
    name: 'Sentadilla Hack',
    muscleGroup: 'cuádriceps',
    secondaryMuscles: ['glúteos'],
    icon: '',
    tips: [
      'Espalda apoyada en el respaldo',
      'Baja hasta paralelo',
      'Empuja con los talones'
    ],
    commonMistakes: [
      'Levantar los talones',
      'No bajar suficiente'
    ],
    progression: 'Sube peso al llegar a 10 reps',
    restRecommended: 120
  },
  zancadas_caminando: {
    name: 'Zancadas caminando',
    muscleGroup: 'cuádriceps',
    secondaryMuscles: ['glúteos'],
    icon: '',
    tips: [
      'Paso largo, rodilla no pasa la punta',
      'Mantén el equilibrio',
      'Alterna piernas'
    ],
    commonMistakes: [
      'Paso corto',
      'Inclinar el torso'
    ],
    progression: 'Sube peso al llegar a 12 reps por pierna',
    restRecommended: 90
  },

  // === PIERNA - ISQUIOTIBIALES ===
  curl_femoral_maquina_sentado: {
    name: 'Curl femoral máquina sentado',
    muscleGroup: 'isquiotibiales',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Apoya bien la espalda',
      'Flexiona llevando talones a glúteos',
      'Aprieta los isquios 1 seg'
    ],
    commonMistakes: [
      'Levantar los glúteos',
      'Usar impulso'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 90
  },
  curl_femoral_maquina_tumbado: {
    name: 'Curl femoral máquina tumbado',
    muscleGroup: 'isquiotibiales',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Caderas pegadas al banco',
      'Flexiona controlando',
      'Aprieta los isquios arriba'
    ],
    commonMistakes: [
      'Levantar las caderas',
      'Bajar rápido'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 90
  },
  peso_muerto_rumano_mancuernas: {
    name: 'Peso muerto rumano mancuernas',
    muscleGroup: 'isquiotibiales',
    secondaryMuscles: ['glúteos', 'lumbares'],
    icon: '',
    tips: [
      'Lleva caderas atrás',
      'Ligera flexión de rodilla',
      'Mancuernas rozando piernas'
    ],
    commonMistakes: [
      'Redondear espalda',
      'Bajar solo moviendo el torso'
    ],
    progression: 'Sube 2 kg por mancuerna al llegar a 12 reps',
    restRecommended: 120
  },

  // === GLÚTEOS ===
  hip_thrust_maquina: {
    name: 'Hip Thrust en máquina',
    muscleGroup: 'glúteos',
    secondaryMuscles: ['isquiotibiales'],
    icon: '',
    tips: [
      'Apoya la espalda alta en el soporte',
      'Empuja con los talones',
      'Aprieta los glúteos arriba'
    ],
    commonMistakes: [
      'Extender demasiado la espalda',
      'Empujar con la espalda'
    ],
    progression: 'Sube 5 kg al llegar a 12 reps',
    restRecommended: 120
  },
  patada_gluteo_polea: {
    name: 'Patada de glúteo en polea',
    muscleGroup: 'glúteos',
    secondaryMuscles: ['isquiotibiales'],
    icon: '',
    tips: [
      'Core activado, espalda neutra',
      'Empuja la pierna atrás apretando el glúteo',
      'Controla la vuelta'
    ],
    commonMistakes: [
      'Arquear la espalda',
      'Usar impulso'
    ],
    progression: 'Sube peso al llegar a 15 reps',
    restRecommended: 60
  },
  abduccion_cadera_maquina: {
    name: 'Abducción cadera máquina',
    muscleGroup: 'glúteos',
    secondaryMuscles: ['abductores'],
    icon: '',
    tips: [
      'Abre controlando',
      'Aprieta los glúteos abiertos',
      'Vuelve despacio'
    ],
    commonMistakes: [
      'Inclinarse hacia delante',
      'Hacer rápido'
    ],
    progression: 'Prioriza contracción sobre peso',
    restRecommended: 45
  },
  sumo_sentadilla: {
    name: 'Sentadilla Sumo',
    muscleGroup: 'glúteos',
    secondaryMuscles: ['aductores', 'cuádriceps'],
    icon: '',
    tips: [
      'Pies más anchos que hombros, puntas hacia fuera',
      'Baja manteniendo rodillas en línea con puntas',
      'Empuja con los talones'
    ],
    commonMistakes: [
      'Meter rodillas hacia dentro',
      'No bajar suficiente'
    ],
    progression: 'Sube peso al llegar a 10 reps',
    restRecommended: 120
  },

  // === ADUCTORES ===
  aductor_maquina: {
    name: 'Aductor en máquina',
    muscleGroup: 'aductores',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Aprieta las piernas juntas 1-2 seg',
      'Controla la apertura 2-3 seg',
      'Espalda apoyada'
    ],
    commonMistakes: [
      'Usar impulso',
      'No completar rango'
    ],
    progression: 'Sube peso al llegar a 15 reps',
    restRecommended: 60
  },

  // === GEMELOS ===
  elevacion_gemelos_de_pie_maquina: {
    name: 'Elevación de gemelos de pie (máquina)',
    muscleGroup: 'gemelos',
    secondaryMuscles: ['sóleo'],
    icon: '',
    tips: [
      'Sube lo más alto posible',
      'Aprieta los gemelos 1-2 seg',
      'Baja hasta estiramiento completo'
    ],
    commonMistakes: [
      'Hacer rebotes',
      'No completar rango'
    ],
    progression: 'Sube peso al llegar a 15 reps',
    restRecommended: 60
  },
  elevacion_gemelos_prensa: {
    name: 'Elevación de gemelos en prensa',
    muscleGroup: 'gemelos',
    secondaryMuscles: ['sóleo'],
    icon: '',
    tips: [
      'Puntas en el borde inferior de la plataforma',
      'Empuja con las puntas',
      'Piernas casi rectas'
    ],
    commonMistakes: [
      'Flexionar demasiado rodillas',
      'Hacer rebotes'
    ],
    progression: 'Sube peso al llegar a 15 reps',
    restRecommended: 60
  },
  elevacion_gemelos_sentado_maquina: {
    name: 'Elevación de gemelos sentado (máquina)',
    muscleGroup: 'gemelos',
    secondaryMuscles: ['sóleo'],
    icon: '',
    tips: [
      'Trabaja más el sóleo',
      'Sube explosivo y aguanta 2 seg',
      'Baja controlando'
    ],
    commonMistakes: [
      'No bajar del todo',
      'Usar impulso'
    ],
    progression: 'Sube peso al llegar a 20 reps',
    restRecommended: 60
  },

  // === CORE ===
  plancha_abdominal: {
    name: 'Plancha abdominal',
    muscleGroup: 'core',
    secondaryMuscles: ['oblicuos', 'hombro'],
    icon: '',
    tips: [
      'Cuerpo en línea recta',
      'Activa core y glúteos',
      'Respira controlado'
    ],
    commonMistakes: [
      'Dejar caer caderas',
      'Levantar glúteos demasiado'
    ],
    progression: 'Aguanta 30-60 seg, progresa tiempo',
    restRecommended: 60
  },
  rueda_abdominal: {
    name: 'Rueda abdominal',
    muscleGroup: 'core',
    secondaryMuscles: ['hombro', 'espalda baja'],
    icon: '',
    tips: [
      'Empuja controlando el core',
      'Vuelve tirando con abdomen',
      'Mantén espalda neutra'
    ],
    commonMistakes: [
      'Arquear espalda baja',
      'Ir demasiado lejos'
    ],
    progression: 'Empieza con recorrido corto',
    restRecommended: 60
  },
  elevacion_piernas_colgado: {
    name: 'Elevación de piernas colgado',
    muscleGroup: 'core',
    secondaryMuscles: ['flexores de cadera'],
    icon: '',
    tips: [
      'Cuelga de la barra',
      'Eleva piernas hasta paralelo',
      'Controla la bajada'
    ],
    commonMistakes: [
      'Balancearse',
      'Usar impulso'
    ],
    progression: 'Empieza con rodillas al pecho',
    restRecommended: 60
  },
  crunch_polea: {
    name: 'Crunch en polea',
    muscleGroup: 'core',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'De espaldas a la polea',
      'Flexiona el torso hacia abajo',
      'Aprieta el abdomen'
    ],
    commonMistakes: [
      'Usar los brazos',
      'Redondear espalda'
    ],
    progression: 'Sube peso al llegar a 15 reps',
    restRecommended: 60
  },
  oblicuos_polea: {
    name: 'Rotación oblicua en polea',
    muscleGroup: 'core',
    secondaryMuscles: ['oblicuos'],
    icon: '',
    tips: [
      'De lado a la polea',
      'Rota el torso controlando',
      'Aprieta los oblicuos'
    ],
    commonMistakes: [
      'Usar los brazos',
      'Mover las caderas'
    ],
    progression: 'Sube peso al llegar a 12 reps por lado',
    restRecommended: 60
  },

  // === TRAPECIO ===
  encogimientos_mancuernas: {
    name: 'Encogimientos con mancuernas (Trapecio)',
    muscleGroup: 'trapecio',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Sube los hombros hacia las orejas',
      'Aprieta los trapecios 1-2 seg',
      'Baja controlando'
    ],
    commonMistakes: [
      'Rotar los hombros',
      'Usar demasiado peso'
    ],
    progression: 'Sube peso al llegar a 15 reps',
    restRecommended: 60
  },
  encogimientos_barra: {
    name: 'Encogimientos con barra',
    muscleGroup: 'trapecio',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Agarre prono a la anchura de los hombros',
      'Sube los hombros rectos',
      'Aprieta los trapecios arriba'
    ],
    commonMistakes: [
      'Flexionar los codos',
      'Inclinar el torso'
    ],
    progression: 'Sube peso al llegar a 12 reps',
    restRecommended: 60
  },

  // === ANTEBRAZO ===
  curl_antebrazo_polea: {
    name: 'Curl de antebrazo en polea',
    muscleGroup: 'antebrazo',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Apoya los antebrazos en el banco',
      'Flexiona las muñecas hacia arriba',
      'Controla la extensión'
    ],
    commonMistakes: [
      'Mover los codos',
      'Usar demasiado peso'
    ],
    progression: 'Sube peso al llegar a 15 reps',
    restRecommended: 60
  },
  curl_antebrazo_mancuerna_invertido: {
    name: 'Curl invertido de muñeca (manco)',
    muscleGroup: 'antebrazo',
    secondaryMuscles: [],
    icon: '',
    tips: [
      'Agarre prono (palmas hacia abajo)',
      'Extiende las muñecas hacia arriba',
      'Controla la bajada 2-3 seg'
    ],
    commonMistakes: [
      'Mover los codos',
      'Usar impulso'
    ],
    progression: 'Sube peso al llegar a 15 reps',
    restRecommended: 60
  },
  farmer_walk: {
    name: 'Farmer Walk (Caminata del granjero)',
    muscleGroup: 'antebrazo',
    secondaryMuscles: ['core', 'trapecio'],
    icon: '',
    tips: [
      'Sujeta mancuernas pesadas a los lados',
      'Camina con pasos cortos y controlados',
      'Mantén el core activado y la espalda recta'
    ],
    commonMistakes: [
      'Inclinar el torso hacia delante',
      'Soltar el agarre antes de tiempo'
    ],
    progression: 'Aumenta distancia o peso gradualmente',
    restRecommended: 90
  }
};

// Rutina del usuario - 5 días
const ROUTINE = {
  days: [
    {
      id: 'day1',
      name: 'Día 1',
      title: 'Empuje',
      subtitle: 'Pecho, Hombros & Tríceps',
      icon: '',
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
      coachingTips: [
        '💡 Empieza con el ejercicio compuesto más pesado (press inclinado) cuando estés más fresco',
        ' Los días de empuje trabajan mucho el hombro anterior. Si sientes fatiga en el hombro, reduce el peso en laterales',
        '⏱️ Descansa más en los compuestos (2-3 min) y menos en aislamientos (1 min)',
        ' El tríceps ya trabaja en los presses. Los aislamientos de tríceps son para "rematar"'
      ],
      exercises: [
        { exerciseId: 'press_inclinado_maquina', sets: 3, reps: '6-10', rir: '2 / 1 / 0', notes: 'Última serie al fallo controlado' },
        { exerciseId: 'press_pecho_maquina_plano', sets: 2, reps: '8-12', rir: '1', notes: '' },
        { exerciseId: 'elevaciones_laterales_maquina', sets: 3, reps: '10-15', rir: '1', notes: '' },
        { exerciseId: 'extension_triceps_polea', sets: 2, reps: '10-12', rir: '1', notes: '' },
        { exerciseId: 'fondos_maquina', sets: 2, reps: '8-12', rir: '1', notes: '' },
        { exerciseId: 'abdominal_maquina', sets: 2, reps: '12-15', rir: '1', notes: '' }
      ]
    },
    {
      id: 'day2',
      name: 'Día 2',
      title: 'Tirón',
      subtitle: 'Espalda & Bíceps',
      icon: '',
      color: '#4ecdc4',
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
      coachingTips: [
        '💡 Concéntrate en la conexión mente-músculo con la espalda. "Tira con los codos, no con las manos"',
        ' Los bíceps trabajan en todos los ejercicios de tirón. Los curls son para aislar y dar forma',
        '⏱️ En jalón y remo, descansa 90-120s. En aislamientos de bíceps, 60s es suficiente',
        '🧠 Truco mental: imagina que tus manos son ganchos y que tiras con los codos/espalda'
      ],
      exercises: [
        { exerciseId: 'jalon_pecho', sets: 3, reps: '8-10', rir: '1', notes: '' },
        { exerciseId: 'pullover_polea', sets: 2, reps: '10-12', rir: '1', notes: '' },
        { exerciseId: 'remo_sentado_v', sets: 2, reps: '8-12', rir: '1', notes: '' },
        { exerciseId: 'curl_biceps_polea_barra', sets: 2, reps: '10-12', rir: '1', notes: '' },
        { exerciseId: 'curl_martillo', sets: 2, reps: '10-12', rir: '1', notes: '' },
        { exerciseId: 'hiperextension_lumbar', sets: 2, reps: '12-15', rir: '1', notes: '' }
      ]
    },
    {
      id: 'day3',
      name: 'Día 3',
      title: 'Pierna',
      subtitle: 'Cuádriceps, Isquios & Gemelos',
      icon: '',
      color: '#00b894',
      gradient: 'linear-gradient(135deg, #00b894 0%, #00a86b 100%)',
      coachingTips: [
        '💡 El día de pierna es el más demandante. Asegúrate de estar bien hidratado y alimentado',
        ' La prensa es tu ejercicio principal. Dale todo pero con técnica perfecta',
        '⏱️ Descansa 2-3 minutos entre series de prensa. El resto 60-90 segundos',
        ' Trabajo unilateral ayuda a corregir desequilibrios entre piernas',
        '💧 Bebe más agua de lo normal en el día de pierna'
      ],
      exercises: [
        { exerciseId: 'prensa', sets: 3, reps: '6-10', rir: '2 / 1 / 0', notes: '' },
        { exerciseId: 'curl_femoral', sets: 2, reps: '10-12', rir: '1', notes: '' },
        { exerciseId: 'extension_cuadriceps', sets: 2, reps: '10-12', rir: '1', notes: '' },
        { exerciseId: 'abduccion_cadera', sets: 2, reps: '12-15', rir: '1', notes: '' },
        { exerciseId: 'aduccion_cadera', sets: 2, reps: '12-15', rir: '1', notes: '' },
        { exerciseId: 'gemelo_pie', sets: 3, reps: '10-15', rir: '1', notes: '' }
      ]
    },
    {
      id: 'day4',
      name: 'Día 4',
      title: 'Pecho/Espalda',
      subtitle: 'Empuje + Tirón combinado',
      icon: '',
      color: '#6c5ce7',
      gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
      coachingTips: [
        '💡 Día de torso completo. Alterna pecho y espalda para una mejor congestión',
        ' Las aperturas son serie de congestión: peso ligero, muchas reps, siente el músculo',
        '⏱️ Al combinar pecho y espalda, puedes descansar menos porque son músculos antagonistas',
        ' Face pulls y encogimientos son para salud del hombro y postura. No los descuides'
      ],
      exercises: [
        { exerciseId: 'press_inclinado_discos', sets: 3, reps: '8-10', rir: '1', notes: '' },
        { exerciseId: 'aperturas_polea', sets: 1, reps: '12-15', rir: '1', notes: 'Serie extra ligera de congestión' },
        { exerciseId: 'remo_polea_abierto', sets: 2, reps: '8-12', rir: '1', notes: '' },
        { exerciseId: 'remo_maquina_unilateral', sets: 2, reps: '8-12', rir: '1', notes: '' },
        { exerciseId: 'face_pull', sets: 2, reps: '12-15', rir: '1', notes: '' },
        { exerciseId: 'encogimientos_trapecio', sets: 2, reps: '12-15', rir: '1', notes: '' }
      ]
    },
    {
      id: 'day5',
      name: 'Día 5',
      title: 'Brazos/Hombro',
      subtitle: 'Bíceps, Tríceps & Deltoides',
      icon: '',
      color: '#fd79a8',
      gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
      coachingTips: [
        '💡 Día de brazos y hombros. Volumen moderado con buena técnica',
        ' Empieza con press de hombros (compuesto) y luego pasa a aislamientos',
        '⏱️ Descansos cortos (45-60s) para mantener la congestión muscular',
        ' Alterna bíceps y tríceps si quieres: mientras uno trabaja, el otro descansa',
        ' El curl bayesian es top para la cabeza larga del bíceps. Haz hincapié en el estiramiento'
      ],
      exercises: [
        { exerciseId: 'press_hombros_mancuernas', sets: 3, reps: '8-12', rir: '1', notes: '' },
        { exerciseId: 'elevacion_lateral_polea', sets: 2, reps: '10-15', rir: '1', notes: '' },
        { exerciseId: 'curl_bayesian', sets: 2, reps: '8-12', rir: '1', notes: '' },
        { exerciseId: 'curl_martillo', sets: 2, reps: '10-12', rir: '1', notes: '' },
        { exerciseId: 'triceps_polea_v', sets: 2, reps: '10-12', rir: '1', notes: '' },
        { exerciseId: 'press_frances', sets: 2, reps: '10-12', rir: '1', notes: '' },
        { exerciseId: 'curl_muneca', sets: 2, reps: '12-15', rir: '1', notes: '' }
      ]
    }
  ]
};

// Grupos musculares con colores
const MUSCLE_GROUPS = {
  pecho: { name: 'Pecho', color: '#ff0000', icon: '' },
  espalda: { name: 'Espalda', color: '#000000', icon: '' },
  'espalda baja': { name: 'Espalda baja', color: '#333333', icon: '' },
  hombro: { name: 'Hombro', color: '#ff0000', icon: '' },
  'hombro posterior': { name: 'Deltoides posterior', color: '#333333', icon: '' },
  tríceps: { name: 'Tríceps', color: '#000000', icon: '' },
  bíceps: { name: 'Bíceps', color: '#ff0000', icon: '' },
  piernas: { name: 'Piernas', color: '#000000', icon: '' },
  cuádriceps: { name: 'Cuádriceps', color: '#000000', icon: '' },
  isquiotibiales: { name: 'Isquiotibiales', color: '#333333', icon: '' },
  glúteos: { name: 'Glúteos', color: '#000000', icon: '' },
  aductores: { name: 'Aductores', color: '#333333', icon: '' },
  gemelos: { name: 'Gemelos', color: '#333333', icon: '' },
  core: { name: 'Core', color: '#000000', icon: '' },
  trapecio: { name: 'Trapecio', color: '#333333', icon: '' },
  antebrazo: { name: 'Antebrazo', color: '#333333', icon: '' }
};

// Guía de RIR (Reps In Reserve)
const RIR_GUIDE = {
  '0': {
    label: 'Fallo muscular',
    description: 'No podrías hacer ni una repetición más con buena técnica',
    feeling: 'Esfuerzo máximo absoluto. Sensación de que el músculo no responde más.',
    advice: 'Solo usar en la última serie de ejercicios compuestos principales. Nunca en calentamiento.'
  },
  '1': {
    label: 'Casi al fallo',
    description: 'Podrías hacer 1 repetición más como máximo',
    feeling: 'Esfuerzo muy alto. La última rep cuesta mucho pero la técnica es aceptable.',
    advice: 'Punto óptimo para la mayoría de series de trabajo. Máximo estímulo con mínimo riesgo.'
  },
  '2': {
    label: 'Cerca del fallo',
    description: 'Podrías hacer 2 repeticiones más',
    feeling: 'Esfuerzo alto. Notas que se pone difícil pero aún tienes control.',
    advice: 'Bueno para primeras series de ejercicios pesados donde necesitas reservar energía.'
  },
  '3': {
    label: 'Esfuerzo moderado-alto',
    description: 'Podrías hacer 3 repeticiones más',
    feeling: 'Trabajo decente. Notas la fatiga pero aún tienes bastante margen.',
    advice: 'Ideal para series de calentamiento pesadas o cuando estás empezando un mesociclo.'
  }
};

// Frases de motivación y coaching general
const COACHING_PHRASES = {
  preWorkout: [
    '¡Vamos a por ello! Recuerda: cada entrenamiento cuenta ',
    'Concéntrate en la técnica. El peso vendrá con el tiempo ',
    'Hoy es un buen día para superar tus límites ',
    'Respira, enfócate y disfruta del proceso 🧘',
    'Tu versión de mañana te agradecerá el esfuerzo de hoy 📈'
  ],
  midWorkout: [
    '¡Buen ritmo! Mantén la intensidad ',
    'Recuerda hidratarte entre series 💧',
    'La técnica es más importante que el peso. Siempre. ',
    'Vas por buen camino. ¡No aflojes! ',
    'Cada serie bien hecha es un paso más hacia tu objetivo 📈'
  ],
  postWorkout: [
    '¡Gran sesión! Tiempo de recuperar 🏆',
    'Entrenamiento completado. ¡Ahora a comer bien y descansar! 🍽️',
    '¡Lo has dado todo! Mañana vuelves más fuerte ',
    'Sesión terminada. Recuerda: el músculo crece descansando 😴'
  ],
  restReminder: [
    'Aprovecha el descanso para respirar profundo y relajar el músculo',
    'Buen momento para un trago de agua 💧',
    'Visualiza la siguiente serie mientras descansas',
    'Estira suavemente el músculo trabajado entre series'
  ]
};
