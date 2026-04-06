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
    name: 'Press de banca plano barra', muscleGroup: 'pecho', secondaryMuscles: ["tríceps","hombro anterior"], icon: '',
    tips: ["Toca el pecho","Baja controlado","Pies firmes en el suelo"], commonMistakes: ["Rebotar en el pecho"],
    progression: 'Sube 2.5kg al llegar a 12 reps', restRecommended: 120
  },
  sentadilla: {
    name: 'Sentadilla libre barra', muscleGroup: 'piernas', secondaryMuscles: ["glúteos","core"], icon: '',
    tips: ["Baja hasta paralelo o más","Pecho arriba","Rodillas en línea con puntas"], commonMistakes: ["Redondear lumbar"],
    progression: 'Sube 5kg al llegar a 10 reps', restRecommended: 180
  },
  peso_muerto: {
    name: 'Peso muerto barra', muscleGroup: 'espalda baja', secondaryMuscles: ["isquiotibiales","glúteos"], icon: '',
    tips: ["Barra pegada al cuerpo","Espalda recta","Empuja el suelo"], commonMistakes: ["Redondear espalda"],
    progression: 'Sube 5kg al llegar a 5 reps', restRecommended: 180
  },
  zancadas: {
    name: 'Zancadas mancuernas', muscleGroup: 'cuádriceps', secondaryMuscles: ["glúteos"], icon: '',
    tips: ["Paso largo","Rodilla no pasa la punta en exceso","Mantén el equilibrio"], commonMistakes: ["Paso corto que tira de rodilla"],
    progression: 'Sube peso al llegar a 15 reps', restRecommended: 90
  },
  remo_barra: {
    name: 'Remo con barra', muscleGroup: 'espalda', secondaryMuscles: ["bíceps","lumbares"], icon: '',
    tips: ["Inclinación de 45-90 grados","Tira hacia el ombligo","Espalda recta"], commonMistakes: ["Tirar muy arriba"],
    progression: 'Sube 5kg al llegar a 10 reps', restRecommended: 120
  },
  curl_barra: {
    name: 'Curl bíceps barra', muscleGroup: 'bíceps', secondaryMuscles: ["antebrazo"], icon: '',
    tips: ["Codos inmóviles","Movimiento estricto","Aprieta arriba"], commonMistakes: ["Balancearse"],
    progression: 'Sube 2.5kg al llegar a 12 reps', restRecommended: 90
  },
  press_militar_b: {
    name: 'Press militar barra de pie', muscleGroup: 'hombro', secondaryMuscles: ["tríceps","core"], icon: '',
    tips: ["Glúteos y core apretados","Barra desde clavícula arriba","No hiperextender lumbar"], commonMistakes: ["Inclinarse hacia atrás demasiado"],
    progression: 'Sube 2.5kg al llegar a 8 reps', restRecommended: 120
  },
  dominadas: {
    name: 'Dominadas agarre prono', muscleGroup: 'espalda', secondaryMuscles: ["bíceps"], icon: '',
    tips: ["Sube hasta pasar la barbilla","Controla la bajada","Retracción escapular inicial"], commonMistakes: ["Kipping o balanceo"],
    progression: 'Usa lastre al llegar a 12 reps', restRecommended: 120
  },
  fondo_triceps: {
    name: 'Fondos en paralelas', muscleGroup: 'tríceps', secondaryMuscles: ["pecho inferior"], icon: '',
    tips: ["Cuerpo recto","Baja hasta 90 grados","Extiende codos al subir"], commonMistakes: ["Abrir mucho los codos"],
    progression: 'Lastra si pasas de 12 reps', restRecommended: 120
  },
  press_inclinado_m: {
    name: 'Press inclinado mancuernas', muscleGroup: 'pecho', secondaryMuscles: ["hombro anterior","tríceps"], icon: '',
    tips: ["Banco a 30-45 grados","Codos a 45 grados","Estira abajo"], commonMistakes: ["Juntar mancuernas arriba"],
    progression: 'Sube peso al llegar a 12 reps', restRecommended: 120
  },
  elevacion_gemelos: {
    name: 'Elevación de gemelos sentado', muscleGroup: 'gemelos', secondaryMuscles: ["sóleo"], icon: '',
    tips: ["Estira todo abajo","Sube explosivo y aguanta 2 seg","Repeticiones altas"], commonMistakes: ["No bajar del todo"],
    progression: 'Sube peso al llegar a 20 reps', restRecommended: 60
  },
  curl_scott: {
    name: 'Curl Scott / Predicador', muscleGroup: 'bíceps', secondaryMuscles: [], icon: '',
    tips: ["Axilas pegadas al soporte","Estira completo sin soltar tensión","Sube sin descansar"], commonMistakes: ["Descansar arriba"],
    progression: 'Sube peso al llegar a 12 reps', restRecommended: 90
  },
  pulldown_brazo_recto: {
    name: 'Pulldown con brazo recto', muscleGroup: 'espalda', secondaryMuscles: ["tríceps largo"], icon: '',
    tips: ["Brazos rectos","Imagina llevar la barra al ombligo en un semicírculo","Espalda arqueada"], commonMistakes: ["Doblar codos"],
    progression: 'Llega a 15 reps', restRecommended: 60
  },
  peso_muerto_rumano: {
    name: 'Peso muerto rumano (RDL)', muscleGroup: 'isquiotibiales', secondaryMuscles: ["glúteos","lumbares"], icon: '',
    tips: ["Lleva caderas atrás","Ligera flexión de rodilla","Barra rozando piernas"], commonMistakes: ["Bajar solo moviendo el torso"],
    progression: 'Sube 5kg al hacer 12 reps', restRecommended: 120
  },
  hip_thrust: {
    name: 'Hip Thrust con barra', muscleGroup: 'glúteos', secondaryMuscles: ["isquiotibiales"], icon: '',
    tips: ["Espalda apoyada en el banco por las escápulas","Empuja con los talones","Aprieta un segundo arriba"], commonMistakes: ["Mirar al techo en lugar del frente"],
    progression: 'Sube 10kg al llegar a 12 reps', restRecommended: 120
  },
  cruce_poleas: {
    name: 'Cruce de poleas', muscleGroup: 'pecho', secondaryMuscles: [], icon: '',
    tips: ["Pecho fuera","Brazos levemente flexionados","Acerca las manos como si abrazaras un árbol"], commonMistakes: ["Hacer press en vez de apertura"],
    progression: 'Llega a 15 reps perfecto', restRecommended: 60
  },
  press_frances_mancuernas: {
    name: 'Press francés mancuernas', muscleGroup: 'tríceps', secondaryMuscles: [], icon: '',
    tips: ["Codos firmes apuntando arriba","Baja hacia los lados de la cabeza","Sube solo con el tríceps"], commonMistakes: ["Mover el brazo entero"],
    progression: 'Llega a 12 reps', restRecommended: 60
  },
  elevaciones_laterales_polea: {
    name: 'Elevación lateral polea', muscleGroup: 'hombro', secondaryMuscles: [], icon: '',
    tips: ["Cable detrás o delante","Lidera con el codo","Tensión constante"], commonMistakes: ["Usar inercia"],
    progression: 'Prioriza reps 15+', restRecommended: 60
  },
  v_bar_pulldown: {
    name: 'Jalón agarre estrecho V', muscleGroup: 'espalda', secondaryMuscles: ["bíceps"], icon: '',
    tips: ["Saca pecho","Tira hacia el esternón","Deja elongar el dorsal"], commonMistakes: ["Tirar hacia la barriga"],
    progression: 'Llega a 10 reps', restRecommended: 90
  },
  pajaros: {
    name: 'Pájaros mancuerna', muscleGroup: 'hombro posterior', secondaryMuscles: ["trapecio"], icon: '',
    tips: ["Tronco inclinado paralelo al suelo","Eleva brazos hacia atrás y arriba","Controla la bajada"], commonMistakes: ["Torso demasiado alto"],
    progression: 'Llega a 15 reps', restRecommended: 60
  },
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
