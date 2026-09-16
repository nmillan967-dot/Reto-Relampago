import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // ==========================================
  // 1. CULTURA GENERAL (11 preguntas)
  // ==========================================
  {
    id: 'cg_1',
    categoryId: 'cultura_general',
    level: 'facil',
    question: '¿Cuál es la capital de Japón?',
    options: ['Kioto', 'Tokio', 'Osaka', 'Seúl'],
    correctIndex: 1,
    explanation: 'Tokio es la capital política, económica y cultural de Japón desde 1868, cuando el emperador trasladó su residencia desde Kioto.'
  },
  {
    id: 'cg_2',
    categoryId: 'cultura_general',
    level: 'facil',
    question: '¿En qué continente se encuentra la cordillera de los Andes?',
    options: ['Europa', 'Asia', 'América del Sur', 'África'],
    correctIndex: 2,
    explanation: 'Los Andes forman la cordillera continental más larga del planeta, extendiéndose a lo largo de siete países sudamericanos.'
  },
  {
    id: 'cg_3',
    categoryId: 'cultura_general',
    level: 'facil',
    question: '¿Quién pintó la famosa obra "La Gioconda" (Mona Lisa)?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Miguel Ángel'],
    correctIndex: 1,
    explanation: 'Leonardo da Vinci comenzó a pintar la Mona Lisa a principios del siglo XVI; hoy se exhibe en el Museo del Louvre en París.'
  },
  {
    id: 'cg_4',
    categoryId: 'cultura_general',
    level: 'facil',
    question: '¿Cuál es el océano más grande y profundo de la Tierra?',
    options: ['Océano Atlántico', 'Océano Índico', 'Océano Pacífico', 'Océano Ártico'],
    correctIndex: 2,
    explanation: 'El océano Pacífico cubre más del 30% de la superficie terrestre y alberga la fosa de las Marianas, el punto más profundo conocido.'
  },
  {
    id: 'cg_5',
    categoryId: 'cultura_general',
    level: 'intermedio',
    question: '¿Qué civilización antigua construyó la mística ciudadela de Machu Picchu?',
    options: ['Maya', 'Azteca', 'Inca', 'Olmeca'],
    correctIndex: 2,
    explanation: 'Machu Picchu fue construida por los incas en el siglo XV bajo el mandato de Pachacútec en lo alto de los Andes peruanos.'
  },
  {
    id: 'cg_6',
    categoryId: 'cultura_general',
    level: 'intermedio',
    question: '¿Cuál es el río más largo y caudaloso del mundo?',
    options: ['Río Nilo', 'Río Amazonas', 'Río Yangtsé', 'Río Misisipi'],
    correctIndex: 1,
    explanation: 'El río Amazonas en América del Sur es el más caudaloso del mundo y las mediciones satelitales confirman que también es el más largo.'
  },
  {
    id: 'cg_7',
    categoryId: 'cultura_general',
    level: 'intermedio',
    question: '¿En qué año llegó el ser humano a la Luna por primera vez?',
    options: ['1959', '1969', '1975', '1981'],
    correctIndex: 1,
    explanation: 'El 20 de julio de 1969, la misión Apolo 11 llevó a Neil Armstrong y Buzz Aldrin a pisar la superficie lunar.'
  },
  {
    id: 'cg_8',
    categoryId: 'cultura_general',
    level: 'intermedio',
    question: '¿Cuál es el país más grande del mundo por superficie territorial?',
    options: ['Canadá', 'China', 'Estados Unidos', 'Rusia'],
    correctIndex: 3,
    explanation: 'Rusia abarca más de 17 millones de kilómetros cuadrados, extendiéndose por Europa del Este y el norte de Asia a través de 11 husos horarios.'
  },
  {
    id: 'cg_9',
    categoryId: 'cultura_general',
    level: 'dificil',
    question: '¿Qué lengua cuenta con el mayor número de hablantes nativos en el mundo?',
    options: ['Inglés', 'Español', 'Chino mandarín', 'Hindi'],
    correctIndex: 2,
    explanation: 'El chino mandarín cuenta con más de 900 millones de hablantes nativos, superando al español y al inglés en número de hablantes maternos.'
  },
  {
    id: 'cg_10',
    categoryId: 'cultura_general',
    level: 'dificil',
    question: '¿En qué antigua ciudad se encontraban los legendarios Jardines Colgantes?',
    options: ['Alejandría', 'Babilonia', 'Atenas', 'Roma'],
    correctIndex: 1,
    explanation: 'Los Jardines Colgantes de Babilonia eran una de las Siete Maravillas del Mundo Antiguo, supuestamente construidos por el rey Nabucodonosor II.'
  },
  {
    id: 'cg_11',
    categoryId: 'cultura_general',
    level: 'dificil',
    question: '¿Qué país tiene más islas en su territorio en todo el mundo?',
    options: ['Indonesia', 'Filipinas', 'Suecia', 'Grecia'],
    correctIndex: 2,
    explanation: 'Suecia tiene aproximadamente 267.570 islas registradas en sus costas y lagos, más que cualquier otra nación del mundo.'
  },

  // ==========================================
  // 2. TECNOLOGÍA E INTELIGENCIA ARTIFICIAL (11 preguntas)
  // ==========================================
  {
    id: 'tec_1',
    categoryId: 'tecnologia_ia',
    level: 'facil',
    question: '¿Qué significa la sigla "IA" en el ámbito digital?',
    options: ['Informática Avanzada', 'Inteligencia Artificial', 'Interacción Algorítmica', 'Internet Autónomo'],
    correctIndex: 1,
    explanation: 'Inteligencia Artificial (IA) se refiere a sistemas computacionales capaces de aprender, razonar, percibir y tomar decisiones de forma automatizada.'
  },
  {
    id: 'tec_2',
    categoryId: 'tecnologia_ia',
    level: 'facil',
    question: '¿Cuál es la función principal de Internet?',
    options: [
      'Almacenar todos los archivos en un solo disco duro mundial',
      'Conectar redes de computadoras de todo el mundo para compartir información',
      'Fabricar procesadores y chips más pequeños',
      'Controlar los satélites espaciales de telecomunicaciones'
    ],
    correctIndex: 1,
    explanation: 'Internet es una red global descentralizada de redes interconectadas que utilizan el protocolo TCP/IP para intercambiar datos.'
  },
  {
    id: 'tec_3',
    categoryId: 'tecnologia_ia',
    level: 'facil',
    question: '¿Qué característica define a una contraseña digital segura?',
    options: [
      'Usar tu fecha de cumpleaños o el nombre de tu mascota',
      'Tener más de 12 caracteres mezclando mayúsculas, minúsculas, números y símbolos',
      'Usar secuencias como "123456" o "password"',
      'Compartirla en notas abiertas de tu celular'
    ],
    correctIndex: 1,
    explanation: 'Una contraseña fuerte combina longitud (12+ caracteres) con variedad de caracteres y no contiene información personal predecible.'
  },
  {
    id: 'tec_4',
    categoryId: 'tecnologia_ia',
    level: 'facil',
    question: '¿Qué unidad de medida equivale aproximadamente a 1.024 Megabytes (MB)?',
    options: ['1 Kilobyte (KB)', '1 Terabyte (TB)', '1 Gigabyte (GB)', '1 Petabyte (PB)'],
    correctIndex: 2,
    explanation: 'En el sistema binario computacional, 1 Gigabyte equivale exactamente a 1.024 Megabytes.'
  },
  {
    id: 'tec_5',
    categoryId: 'tecnologia_ia',
    level: 'intermedio',
    question: '¿Qué es el "Machine Learning" (Aprendizaje Automático)?',
    options: [
      'Un robot físico que enseña materias escolares a niños',
      'Una rama de la IA donde los algoritmos aprenden patrones a partir de datos sin ser programados explícitamente para cada regla',
      'Una pantalla táctil que aprende a limpiar su propio vidrio',
      'Un software antivirus que borra la memoria RAM'
    ],
    correctIndex: 1,
    explanation: 'El Machine Learning permite a las computadoras identificar patrones complejos en grandes volúmenes de datos para hacer predicciones y mejoras continuas.'
  },
  {
    id: 'tec_6',
    categoryId: 'tecnologia_ia',
    level: 'intermedio',
    question: '¿Qué ataque informático consiste en engañar al usuario mediante correos o enlaces falsos para robar sus claves?',
    options: ['Phishing', 'Bluetooth pairing', 'Firewalling', 'Overclocking'],
    correctIndex: 0,
    explanation: 'El "phishing" suplanta la identidad de empresas o servicios conocidos (como bancos o redes sociales) para engañar al usuario y robar sus credenciales.'
  },
  {
    id: 'tec_7',
    categoryId: 'tecnologia_ia',
    level: 'intermedio',
    question: '¿Qué tipo de modelo de IA son ChatGPT y Gemini?',
    options: [
      'Sistemas operativos de bajo nivel',
      'Modelos de lenguaje grande (LLM)',
      'Hojas de cálculo automáticas',
      'Compiladores de código binario'
    ],
    correctIndex: 1,
    explanation: 'Son Modelos de Lenguaje Grande (LLM) entrenados con cantidades masivas de texto para comprender contexto, responder preguntas y razonar.'
  },
  {
    id: 'tec_8',
    categoryId: 'tecnologia_ia',
    level: 'intermedio',
    question: '¿Qué significa que un software sea de "código abierto" (Open Source)?',
    options: [
      'Que solo funciona cuando la computadora está conectada a internet',
      'Que cualquiera puede inspeccionar, modificar y compartir libremente su código fuente',
      'Que el software no contiene ningún tipo de seguridad ni clave',
      'Que fue creado exclusivamente por computadoras con IA'
    ],
    correctIndex: 1,
    explanation: 'El código abierto fomenta la colaboración global permitiendo a programadores de todo el mundo auditar, mejorar y distribuir el software libremente.'
  },
  {
    id: 'tec_9',
    categoryId: 'tecnologia_ia',
    level: 'dificil',
    question: '¿Qué matemático británico es considerado el padre de la computación moderna y propuso un célebre test para medir inteligencia de las máquinas?',
    options: ['Isaac Newton', 'Alan Turing', 'Charles Babbage', 'Ada Lovelace'],
    correctIndex: 1,
    explanation: 'Alan Turing diseñó el concepto de la máquina universal y propuso el "Test de Turing" en 1950 para evaluar si una máquina puede exhibir conducta indistinguible de la humana.'
  },
  {
    id: 'tec_10',
    categoryId: 'tecnologia_ia',
    level: 'dificil',
    question: '¿Qué tecnología de cifrado distribuido descentralizado sustenta a las criptomonedas y contratos inteligentes?',
    options: ['Blockchain', 'Cloud Computing', 'Bluetooth Mesh', 'Dial-up'],
    correctIndex: 0,
    explanation: 'Blockchain es un registro contable digital distribuido, inmutable y criptográfico donde cada bloque se enlaza cronológicamente al anterior.'
  },
  {
    id: 'tec_11',
    categoryId: 'tecnologia_ia',
    level: 'dificil',
    question: '¿Qué término describe el fenómeno en el que una IA generativa inventa información con total seguridad como si fuera un hecho real?',
    options: ['Sobrecalentamiento', 'Alucinación', 'Fragmentación de disco', 'Desborde de pila'],
    correctIndex: 1,
    explanation: 'La "alucinación" ocurre cuando un modelo de lenguaje predice palabras probabilísticamente verosímiles pero factualmente incorrectas o ficticias.'
  },

  // ==========================================
  // 3. CIENCIA Y CURIOSIDADES (11 preguntas)
  // ==========================================
  {
    id: 'cie_1',
    categoryId: 'ciencia_curiosidades',
    level: 'facil',
    question: '¿Cuál es el planeta más grande de nuestro sistema solar?',
    options: ['Marte', 'Saturno', 'Júpiter', 'Neptuno'],
    correctIndex: 2,
    explanation: 'Júpiter es un gigante gaseoso con una masa más de dos veces superior a la de todos los demás planetas del sistema solar combinados.'
  },
  {
    id: 'cie_2',
    categoryId: 'ciencia_curiosidades',
    level: 'facil',
    question: '¿Qué órgano del cuerpo humano bombea la sangre a todo el organismo?',
    options: ['Los pulmones', 'El corazón', 'El hígado', 'El cerebro'],
    correctIndex: 1,
    explanation: 'El corazón es un músculo vital que late cerca de 100.000 veces al día para hacer circular oxígeno y nutrientes a todos los tejidos.'
  },
  {
    id: 'cie_3',
    categoryId: 'ciencia_curiosidades',
    level: 'facil',
    question: '¿Qué gas absorben las plantas durante la fotosíntesis para liberar oxígeno?',
    options: ['Dióxido de carbono (CO₂)', 'Nitrógeno', 'Monóxido de carbono', 'Helio'],
    correctIndex: 0,
    explanation: 'En la fotosíntesis, los cloroplastos utilizan luz solar, agua y dióxido de carbono (CO₂) para producir glucosa y liberar oxígeno a la atmósfera.'
  },
  {
    id: 'cie_4',
    categoryId: 'ciencia_curiosidades',
    level: 'facil',
    question: '¿A qué temperatura en grados Celsius hierve el agua a nivel del mar?',
    options: ['50 °C', '80 °C', '100 °C', '120 °C'],
    correctIndex: 2,
    explanation: 'A presión atmosférica estándar a nivel del mar (1 atmósfera), el punto de ebullición del agua pura es exactamente 100 °C.'
  },
  {
    id: 'cie_5',
    categoryId: 'ciencia_curiosidades',
    level: 'intermedio',
    question: '¿Cuál es la velocidad aproximada de la luz en el vacío?',
    options: ['3.000 km/s', '30.000 km/s', '300.000 km/s', '3.000.000 km/s'],
    correctIndex: 2,
    explanation: 'La luz viaja en el vacío a casi 299.792 km por segundo (aproximadamente 300.000 km/s), el límite universal de velocidad en la física.'
  },
  {
    id: 'cie_6',
    categoryId: 'ciencia_curiosidades',
    level: 'intermedio',
    question: '¿Cuál es el hueso más largo y resistente del cuerpo humano?',
    options: ['El húmero', 'El fémur', 'La tibia', 'La clavícula'],
    correctIndex: 1,
    explanation: 'El fémur, ubicado en el muslo, es el hueso más largo, pesado y fuerte del esqueleto humano; soporta hasta 30 veces el peso del cuerpo.'
  },
  {
    id: 'cie_7',
    categoryId: 'ciencia_curiosidades',
    level: 'intermedio',
    question: '¿Qué partícula con carga eléctrica negativa orbita alrededor del núcleo de un átomo?',
    options: ['Protón', 'Neutrón', 'Electrón', 'Fotón'],
    correctIndex: 2,
    explanation: 'Los electrones tienen carga negativa y se distribuyen en niveles de energía u orbitales alrededor del núcleo formado por protones y neutrones.'
  },
  {
    id: 'cie_8',
    categoryId: 'ciencia_curiosidades',
    level: 'intermedio',
    question: '¿Por qué el cielo diurno de la Tierra se ve azul?',
    options: [
      'Por el reflejo del agua de los océanos en la atmósfera',
      'Por la dispersión de Rayleigh de la luz solar en las moléculas del aire',
      'Porque el sol emite principalmente luz azul',
      'Por la capa de ozono que tiñe las nubes'
    ],
    correctIndex: 1,
    explanation: 'Las ondas de luz azul son más cortas y se dispersan en todas direcciones al chocar con las moléculas de oxígeno y nitrógeno de la atmósfera.'
  },
  {
    id: 'cie_9',
    categoryId: 'ciencia_curiosidades',
    level: 'dificil',
    question: '¿Cuál es la sustancia natural conocida más dura en la escala de Mohs?',
    options: ['El cuarzo', 'El zafiro', 'El diamante', 'El titanio'],
    correctIndex: 2,
    explanation: 'El diamante tiene una puntuación máxima de 10 en la escala de dureza mineral de Mohs, debido a la formidable estructura tetraédrica de sus enlaces de carbono.'
  },
  {
    id: 'cie_10',
    categoryId: 'ciencia_curiosidades',
    level: 'dificil',
    question: '¿Cuánto tiempo tarda aproximadamente la luz del Sol en llegar a la Tierra?',
    options: ['8 segundos', '8 minutos y 20 segundos', '1 hora', '1 día completo'],
    correctIndex: 1,
    explanation: 'Dado que la Tierra se encuentra a unos 150 millones de kilómetros del Sol, los fotones tardan alrededor de 500 segundos (8 minutos y 20 segundos) en alcanzarnos.'
  },
  {
    id: 'cie_11',
    categoryId: 'ciencia_curiosidades',
    level: 'dificil',
    question: '¿Qué animal tiene tres corazones y sangre de color azul debido al cobre?',
    options: ['El tiburón blanco', 'El pulpo', 'La ballena jorobada', 'La medusa gigante'],
    correctIndex: 1,
    explanation: 'Los pulpos tienen tres corazones y su sangre utiliza hemocianina rica en cobre para transportar oxígeno en aguas frías y con poco oxígeno.'
  },

  // ==========================================
  // 4. CINE, MÚSICA Y VIDEOJUEGOS (11 preguntas)
  // ==========================================
  {
    id: 'cmv_1',
    categoryId: 'cine_musica_videojuegos',
    level: 'facil',
    question: '¿Qué famoso videojuego permite a los jugadores explorar un mundo infinito hecho de bloques cúbicos para minar y construir?',
    options: ['Minecraft', 'Roblox', 'Tetris', 'Fortnite'],
    correctIndex: 0,
    explanation: 'Minecraft, creado originalmente por Markus Persson ("Notch"), es el videojuego más vendido de todos los tiempos con más de 300 millones de copias.'
  },
  {
    id: 'cmv_2',
    categoryId: 'cine_musica_videojuegos',
    level: 'facil',
    question: '¿Cómo se llama el fontanero de gorra roja más famoso del universo de Nintendo?',
    options: ['Luigi', 'Sonic', 'Mario', 'Wario'],
    correctIndex: 2,
    explanation: 'Mario fue creado por Shigeru Miyamoto y apareció por primera vez en 1981 en el juego arcade Donkey Kong con el nombre de Jumpman.'
  },
  {
    id: 'cmv_3',
    categoryId: 'cine_musica_videojuegos',
    level: 'facil',
    question: '¿Cuál es el nombre del superhéroe arácnido alter ego de Peter Parker?',
    options: ['Batman', 'Iron Man', 'Spider-Man', 'Flash'],
    correctIndex: 2,
    explanation: 'Spider-Man fue creado por Stan Lee y Steve Ditko para Marvel Comics en 1962, convirtiéndose en un ícono global de la juventud.'
  },
  {
    id: 'cmv_4',
    categoryId: 'cine_musica_videojuegos',
    level: 'facil',
    question: '¿Qué instrumento musical tiene teclas blancas y negras y es tanto de cuerda percutida como de teclado?',
    options: ['Guitarra', 'Batería', 'Piano', 'Violín'],
    correctIndex: 2,
    explanation: 'El piano acústico produce sonido cuando pequeños martillos golpean cuerdas de acero al presionar sus 88 teclas.'
  },
  {
    id: 'cmv_5',
    categoryId: 'cine_musica_videojuegos',
    level: 'intermedio',
    question: '¿Quién es el protagonista de la legendaria saga de videojuegos "The Legend of Zelda"?',
    options: ['Zelda', 'Link', 'Ganon', 'Epona'],
    correctIndex: 1,
    explanation: 'A pesar del título de la franquicia (que lleva el nombre de la princesa Zelda), el guerrero del tiempo que controlas es Link.'
  },
  {
    id: 'cmv_6',
    categoryId: 'cine_musica_videojuegos',
    level: 'intermedio',
    question: '¿Qué película animada de Pixar tiene como personajes a Woody, Buzz Lightyear y el dinosaurio Rex?',
    options: ['Monsters, Inc.', 'Toy Story', 'Buscando a Nemo', 'Los Increíbles'],
    correctIndex: 1,
    explanation: 'Toy Story (1995) fue el primer largometraje de la historia producido enteramente con animación digital por computadora.'
  },
  {
    id: 'cmv_7',
    categoryId: 'cine_musica_videojuegos',
    level: 'intermedio',
    question: '¿Qué motor gráfico desarrollado por Epic Games es ampliamente utilizado en juegos como Fortnite y producciones de cine virtual?',
    options: ['Unity', 'Unreal Engine', 'Godot', 'Source'],
    correctIndex: 1,
    explanation: 'Unreal Engine es un motor de renderizado en tiempo real líder en la industria de videojuegos y series de alta producción como The Mandalorian.'
  },
  {
    id: 'cmv_8',
    categoryId: 'cine_musica_videojuegos',
    level: 'intermedio',
    question: '¿En qué año se lanzó la plataforma YouTube, donde se subió el primer video titulado "Me at the zoo"?',
    options: ['2001', '2005', '2009', '2012'],
    correctIndex: 1,
    explanation: 'Jawed Karim, cofundador de YouTube, subió el primer video de 19 segundos en el zoológico de San Diego en abril de 2005.'
  },
  {
    id: 'cmv_9',
    categoryId: 'cine_musica_videojuegos',
    level: 'dificil',
    question: '¿Cuál fue la primera consola doméstica lanzada por Sony en Japón a finales de 1994?',
    options: ['PlayStation', 'Nintendo 64', 'Sega Saturn', 'Xbox'],
    correctIndex: 0,
    explanation: 'La PlayStation original debutó en diciembre de 1994 en Japón y popularizó el uso masivo de discos CD-ROM para videojuegos 3D.'
  },
  {
    id: 'cmv_10',
    categoryId: 'cine_musica_videojuegos',
    level: 'dificil',
    question: '¿Quién compuso las inolvidables bandas sonoras de Star Wars, Jurassic Park, Harry Potter e Indiana Jones?',
    options: ['Hans Zimmer', 'John Williams', 'Ennio Morricone', 'Alan Silvestri'],
    correctIndex: 1,
    explanation: 'John Williams es el legendario compositor estadounidense ganador de 5 premios Óscar y nominado más de 50 veces por sus icónicas partituras.'
  },
  {
    id: 'cmv_11',
    categoryId: 'cine_musica_videojuegos',
    level: 'dificil',
    question: '¿Qué película de ciencia ficción de James Cameron ostenta el récord de mayor recaudación en taquilla de todos los tiempos?',
    options: ['Avengers: Endgame', 'Titanic', 'Avatar', 'Star Wars: El despertar de la fuerza'],
    correctIndex: 2,
    explanation: 'Avatar (2009) recaudó más de 2.920 millones de dólares a nivel mundial, revolucionando las tecnologías 3D en las salas de cine.'
  },

  // ==========================================
  // 5. LÓGICA Y ACERTIJOS (11 preguntas)
  // ==========================================
  {
    id: 'log_1',
    categoryId: 'logica_acertijos',
    level: 'facil',
    question: '¿Qué número continúa la secuencia matemática: 2, 4, 8, 16, ...?',
    options: ['24', '30', '32', '64'],
    correctIndex: 2,
    explanation: 'Cada número en la secuencia es el doble del anterior (se multiplica por 2): 16 × 2 = 32.'
  },
  {
    id: 'log_2',
    categoryId: 'logica_acertijos',
    level: 'facil',
    question: 'Si un tren eléctrico viaja hacia el norte a 100 km/h y el viento sopla hacia el oeste, ¿hacia dónde va el humo?',
    options: ['Hacia el sur', 'Hacia el oeste', 'Hacia el este', 'Los trenes eléctricos no echan humo'],
    correctIndex: 3,
    explanation: 'Es un clásico acertijo de atención: los trenes eléctricos funcionan con electricidad y no emiten humo.'
  },
  {
    id: 'log_3',
    categoryId: 'logica_acertijos',
    level: 'facil',
    question: 'Tengo ciudades pero no casas, montañas pero no árboles, y ríos pero no peces. ¿Qué soy?',
    options: ['Un mapa', 'Un sueño', 'Un telescopio', 'Un desierto'],
    correctIndex: 0,
    explanation: 'Un mapa cartográfico representa gráficamente territorios, relieves, ríos y poblaciones sin contener los objetos físicos reales.'
  },
  {
    id: 'log_4',
    categoryId: 'logica_acertijos',
    level: 'facil',
    question: 'Si tienes 5 manzanas en una canasta y tomas 3, ¿cuántas manzanas tienes tú?',
    options: ['2', '3', '5', '8'],
    correctIndex: 1,
    explanation: '¡Tienes 3! El acertijo pregunta cuántas manzanas tienes TÚ, que son precisamente las 3 que tomaste con tus manos.'
  },
  {
    id: 'log_5',
    categoryId: 'logica_acertijos',
    level: 'intermedio',
    question: 'El padre de Ana tiene 4 hijas: Lala, Lele, Lili y... ¿cómo se llama la cuarta?',
    options: ['Lolo', 'Lulu', 'Ana', 'María'],
    correctIndex: 2,
    explanation: 'El acertijo comienza diciendo "El padre de Ana tiene 4 hijas", por lo que la cuarta hija es Ana.'
  },
  {
    id: 'log_6',
    categoryId: 'logica_acertijos',
    level: 'intermedio',
    question: '¿Qué pesa más: un kilogramo de plumas de ganso o un kilogramo de plomo macizo?',
    options: ['El plomo', 'Las plumas', 'Pesan exactamente lo mismo', 'Depende del clima'],
    correctIndex: 2,
    explanation: 'Ambos pesan exactamente un kilogramo (1 kg). La masa es idéntica, aunque el volumen que ocupan sea muy diferente.'
  },
  {
    id: 'log_7',
    categoryId: 'logica_acertijos',
    level: 'intermedio',
    question: 'Si un bate y una pelota cuestan juntos $1.10 en total, y el bate cuesta $1.00 más que la pelota, ¿cuánto cuesta la pelota?',
    options: ['$0.10', '$0.05', '$0.15', '$0.01'],
    correctIndex: 1,
    explanation: 'Si la pelota cuesta $0.05 y el bate $1.05 (un dólar más), la suma da exactamente $1.10. ¡Un clásico sesgo del pensamiento intuitivo!'
  },
  {
    id: 'log_8',
    categoryId: 'logica_acertijos',
    level: 'intermedio',
    question: '¿Cuántos meses del año tienen al menos 28 días?',
    options: ['Solo 1 (febrero)', '6 meses', 'Todos los 12 meses', 'Ninguno'],
    correctIndex: 2,
    explanation: 'Todos los 12 meses del año tienen al menos 28 días; febrero tiene 28 (o 29 en año bisiesto) y el resto tienen 30 o 31.'
  },
  {
    id: 'log_9',
    categoryId: 'logica_acertijos',
    level: 'dificil',
    question: 'Tres personas cruzan un puente en fila india. La última persona dice: "Hay dos personas delante de mí". La del medio dice: "Hay una persona delante y una detrás". ¿Qué dice la primera?',
    options: [
      '"No hay nadie detrás de mí"',
      '"Hay dos personas detrás de mí"',
      '"Estoy en el medio"',
      '"No puedo hablar"'
    ],
    correctIndex: 1,
    explanation: 'Al ser la primera de la fila mirando hacia adelante, tiene a las otras dos personas detrás de ella.'
  },
  {
    id: 'log_10',
    categoryId: 'logica_acertijos',
    level: 'dificil',
    question: '¿Qué número continúa la secuencia de Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, ...?',
    options: ['18', '21', '24', '26'],
    correctIndex: 1,
    explanation: 'En la serie de Fibonacci, cada término es la suma de los dos anteriores: 8 + 13 = 21.'
  },
  {
    id: 'log_11',
    categoryId: 'logica_acertijos',
    level: 'dificil',
    question: 'Un caracol sube por un muro de 10 metros. Cada día sube 3 metros y cada noche resbala 2 metros mientras duerme. ¿En cuántos días llegará a la cima?',
    options: ['10 días', '8 días', '7 días', '5 días'],
    correctIndex: 1,
    explanation: 'Cada día avanza 1 metro neto. Al final del día 7 está a 7 metros. En el día 8 sube 3 metros y alcanza los 10 metros, llegando a la cima antes de caer.'
  },

  // ==========================================
  // 6. PREGUNTAS SORPRENDENTES (11 preguntas)
  // ==========================================
  {
    id: 'sor_1',
    categoryId: 'preguntas_sorprendentes',
    level: 'facil',
    question: '¿Cuál es el único mamífero capaz de volar activamente batiendo sus alas?',
    options: ['La ardilla voladora', 'El murciélago', 'El ornitorrinco', 'El lemur'],
    correctIndex: 1,
    explanation: 'Los murciélagos son los únicos mamíferos con vuelo activo propulsado; las ardillas "voladoras" en realidad solo planean.'
  },
  {
    id: 'sor_2',
    categoryId: 'preguntas_sorprendentes',
    level: 'facil',
    question: '¿Los flamencos nacen con plumaje rosado brillante?',
    options: [
      'Sí, es su color genético natural desde el cascarón',
      'No, nacen grises o blancos y obtienen el color de su dieta rica en carotenoides',
      'No, su piel cambia de color según el clima soleado',
      'Sí, pero pierden el color cuando se vuelven adultos'
    ],
    correctIndex: 1,
    explanation: 'Los flamencos nacen con plumaje grisáceo. Su característico color rosado se debe a los carotenoides presentes en las algas y pequeños crustáceos que comen.'
  },
  {
    id: 'sor_3',
    categoryId: 'preguntas_sorprendentes',
    level: 'facil',
    question: '¿Qué alimento natural encontrado en tumbas egipcias de más de 3.000 años se conserva perfectamente comestible?',
    options: ['El aceite de oliva', 'La miel pura de abeja', 'El trigo molido', 'El chocolate amargo'],
    correctIndex: 1,
    explanation: 'La miel pura tiene una actividad de agua sumamente baja y alta acidez natural, lo que impide la proliferación de bacterias y hongos por milenios.'
  },
  {
    id: 'sor_4',
    categoryId: 'preguntas_sorprendentes',
    level: 'facil',
    question: '¿Es cierto que la Gran Muralla China es visible a simple vista desde la órbita lunar?',
    options: [
      'Sí, es la única construcción visible desde la Luna',
      'No, es un mito popular; es demasiado estrecha y de materiales similares al entorno',
      'Solo durante los solsticios de verano',
      'Sí, pero únicamente con prismáticos espaciales'
    ],
    correctIndex: 1,
    explanation: 'Los astronautas de la NASA han confirmado que la Gran Muralla no se distingue a simple vista ni siquiera desde órbita baja sin instrumentos ópticos de aumento.'
  },
  {
    id: 'sor_5',
    categoryId: 'preguntas_sorprendentes',
    level: 'intermedio',
    question: '¿Cuántos cerebros y cuántos corazones tiene una lombriz de tierra común?',
    options: [
      '1 cerebro diminuto y 5 pares de estructuras con función de corazón (arcos aórticos)',
      '3 cerebros y ningún corazón',
      'Ningún cerebro y 1 corazón gigante',
      '4 cerebros y 8 corazones'
    ],
    correctIndex: 0,
    explanation: 'Las lombrices poseen un ganglio cerebral rudimentario y 5 pares de arcos aórticos que bombean sangre a lo largo de su cuerpo.'
  },
  {
    id: 'sor_6',
    categoryId: 'preguntas_sorprendentes',
    level: 'intermedio',
    question: '¿Qué animal marino puede regenerar un cuerpo completo a partir de un solo brazo desprendido?',
    options: ['El delfín', 'La estrella de mar', 'El caballito de mar', 'La tortuga marina'],
    correctIndex: 1,
    explanation: 'Ciertas especies de estrellas de mar pueden regenerar extremidades enteras e incluso un organismo nuevo si el brazo conserva parte del disco central.'
  },
  {
    id: 'sor_7',
    categoryId: 'preguntas_sorprendentes',
    level: 'intermedio',
    question: '¿Por qué las huellas dactilares de los koalas han llegado a confundir a investigadores policiales en Australia?',
    options: [
      'Porque tienen tinta natural en los dedos',
      'Porque sus patrones microscópicos son casi idénticos a las huellas humanas',
      'Porque cambian de forma cada semana',
      'Porque no tienen líneas ni surcos'
    ],
    correctIndex: 1,
    explanation: 'Los koalas y chimpancés tienen huellas dactilares con bucles y crestas dérmicas tan similares a las humanas que ni con microscopio óptico común se diferencian con facilidad.'
  },
  {
    id: 'sor_8',
    categoryId: 'preguntas_sorprendentes',
    level: 'intermedio',
    question: '¿Qué porcentaje aproximado del cerebro humano está compuesto por agua?',
    options: ['Alrededor del 25%', 'Alrededor del 50%', 'Cerca del 73% al 75%', 'Más del 95%'],
    correctIndex: 2,
    explanation: 'El cerebro humano está formado por aproximadamente un 73% a 75% de agua, por lo que una deshidratación leve afecta notablemente la concentración.'
  },
  {
    id: 'sor_9',
    categoryId: 'preguntas_sorprendentes',
    level: 'dificil',
    question: '¿Qué sonido no produce eco en condiciones acústicas normales según una antigua creencia popular finalmente desmentida por científicos?',
    options: ['El ladrido de un perro', 'El graznido de un pato', 'El maullido de un gato', 'El canto de un búho'],
    correctIndex: 1,
    explanation: 'El mito decía que el graznido de los patos no hacía eco. Físicos acústicos de la Universidad de Salford demostraron en 2003 que sí hace eco, solo que es sutil.'
  },
  {
    id: 'sor_10',
    categoryId: 'preguntas_sorprendentes',
    level: 'dificil',
    question: '¿Cuánto dura el día más largo en Venus, comparado con su año alrededor del Sol?',
    options: [
      'Un día en Venus dura más que su propio año completo',
      'Dura exactamente 24 horas como en la Tierra',
      'Dura apenas 45 minutos',
      'Dura 10 años terrestres'
    ],
    correctIndex: 0,
    explanation: 'Venus rota muy lentamente sobre su eje (tarda 243 días terrestres en girar una vez), mientras que su órbita solar toma solo 225 días terrestres.'
  },
  {
    id: 'sor_11',
    categoryId: 'preguntas_sorprendentes',
    level: 'dificil',
    question: '¿Qué criatura microscópica es capaz de resistir el vacío del espacio, radiación extrema y temperaturas desde -200 °C hasta 150 °C?',
    options: ['La ameba gigante', 'El tardígrado (oso de agua)', 'El ácaro del polvo', 'El rotífero dorado'],
    correctIndex: 1,
    explanation: 'Los tardígrados entran en un estado de criptobiosis donde expulsan casi toda el agua de su cuerpo, sobreviviendo a las condiciones más extremas del cosmos.'
  },

  // ==========================================
  // 7. MEDIO AMBIENTE (11 preguntas)
  // ==========================================
  {
    id: 'med_1',
    categoryId: 'medio_ambiente',
    level: 'facil',
    question: '¿Qué significan las famosas "3 R" fundamentales de la ecología moderna?',
    options: [
      'Reunir, Reclamar y Resolver',
      'Reducir, Reutilizar y Reciclar',
      'Reparar, Resguardar y Reponer',
      'Revisar, Reformar y Recargar'
    ],
    correctIndex: 1,
    explanation: 'La regla de las 3 R busca minimizar residuos: Reducir el consumo innecesario, Reutilizar objetos antes de desecharlos y Reciclar los materiales transformables.'
  },
  {
    id: 'med_2',
    categoryId: 'medio_ambiente',
    level: 'facil',
    question: '¿Cuál de las siguientes es una fuente de energía limpia y renovable?',
    options: ['Carbón mineral', 'Petróleo crudo', 'Energía solar fotovoltaica', 'Gas natural fósil'],
    correctIndex: 2,
    explanation: 'La energía solar aprovecha la radiación del sol mediante paneles sin emitir gases de efecto invernadero durante su generación.'
  },
  {
    id: 'med_3',
    categoryId: 'medio_ambiente',
    level: 'facil',
    question: '¿Por qué los plásticos de un solo uso son especialmente peligrosos para los océanos?',
    options: [
      'Porque evaporan el agua del mar',
      'Tardan siglos en descomponerse y se fragmentan en microplásticos que ingiere la fauna marina',
      'Porque atraen a los rayos durante las tormentas',
      'Porque congelan las corrientes submarinas'
    ],
    correctIndex: 1,
    explanation: 'Los plásticos pueden tardar más de 400 años en fragmentarse en partículas microscópicas que contaminan la cadena trófica de peces y aves.'
  },
  {
    id: 'med_4',
    categoryId: 'medio_ambiente',
    level: 'facil',
    question: '¿Qué gran selva tropical es conocida popularmente como un gigantesco regulador climático y de biodiversidad del planeta?',
    options: ['La taiga siberiana', 'La selva amazónica', 'El bosque negro alemán', 'El manglar de Sundarbans'],
    correctIndex: 1,
    explanation: 'La Amazonía alberga más del 10% de las especies conocidas de la Tierra y almacena gigantescas cantidades de carbono vital para el equilibrio climático.'
  },
  {
    id: 'med_5',
    categoryId: 'medio_ambiente',
    level: 'intermedio',
    question: '¿Qué gas de efecto invernadero se produce en grandes cantidades en vertederos de basura y en la ganadería intensiva?',
    options: ['Metano (CH₄)', 'Argón', 'Oxígeno puro', 'Helio'],
    correctIndex: 0,
    explanation: 'El metano es un gas de efecto invernadero con un potencial de calentamiento global más de 25 veces mayor que el dióxido de carbono en un lapso de 100 años.'
  },
  {
    id: 'med_6',
    categoryId: 'medio_ambiente',
    level: 'intermedio',
    question: '¿Qué insectos son responsables de polinizar aproximadamente el 75% de los cultivos que alimentan al mundo?',
    options: ['Las hormigas negras', 'Las abejas y otros polinizadores', 'Los escarabajos rinoceronte', 'Las moscas comunes'],
    correctIndex: 1,
    explanation: 'Las abejas, mariposas y murciélagos polinizan una inmensa variedad de frutas, verduras y frutos secos cruciales para la seguridad alimentaria mundial.'
  },
  {
    id: 'med_7',
    categoryId: 'medio_ambiente',
    level: 'intermedio',
    question: '¿Qué protege la capa de ozono estratosférica de nuestro planeta?',
    options: [
      'Protege a la Tierra del choque directo con la luna',
      'Bloquea la mayor parte de la dañina radiación solar ultravioleta (UV-B y UV-C)',
      'Mantiene los océanos con agua salada',
      'Evita que el aire salga flotando hacia el espacio exterior'
    ],
    correctIndex: 1,
    explanation: 'El ozono (O₃) filtra los rayos ultravioleta dañinos que causan cáncer de piel, cataratas oculares y daños a los ecosistemas marinos.'
  },
  {
    id: 'med_8',
    categoryId: 'medio_ambiente',
    level: 'intermedio',
    question: '¿A qué se refiere el concepto de "huella de carbono"?',
    options: [
      'La cantidad de carbón mineral que queda en una fogata',
      'La totalidad de gases de efecto invernadero emitidos por las actividades de una persona, producto u organización',
      'La marca de los neumáticos sobre el asfalto',
      'El número de árboles plantados en un año'
    ],
    correctIndex: 1,
    explanation: 'La huella de carbono mide el impacto ambiental expresado en toneladas equivalentes de CO₂ asociadas al transporte, energía, dieta y consumo.'
  },
  {
    id: 'med_9',
    categoryId: 'medio_ambiente',
    level: 'dificil',
    question: '¿Qué fenómeno ecológico ocurre cuando el exceso de nutrientes (como fertilizantes agrícolas) llega a ríos o lagos y agota el oxígeno?',
    options: ['Eutrofización', 'Sublimación', 'Lixiviación', 'Fotosíntesis inversa'],
    correctIndex: 0,
    explanation: 'La eutrofización produce proliferación masiva de algas superficiales que bloquean la luz solar y, al morir, consumen el oxígeno, asfixiando peces y plantas.'
  },
  {
    id: 'med_10',
    categoryId: 'medio_ambiente',
    level: 'dificil',
    question: '¿Qué tratado internacional histórico firmado en 1987 logró frenar con éxito la destrucción de la capa de ozono?',
    options: ['Protocolo de Kioto', 'Protocolo de Montreal', 'Acuerdo de París', 'Pacto de Ginebra'],
    correctIndex: 1,
    explanation: 'El Protocolo de Montreal prohibió gradualmente los clorofluorocarbonos (CFC), convirtiéndose en el acuerdo ambiental más exitoso de la historia.'
  },
  {
    id: 'med_11',
    categoryId: 'medio_ambiente',
    level: 'dificil',
    question: '¿Qué porcentaje del agua total del planeta Tierra es agua dulce accesible en lagos y ríos para el consumo humano?',
    options: ['Cerca del 50%', 'Aproximadamente el 20%', 'Menos del 1%', 'Alrededor del 10%'],
    correctIndex: 2,
    explanation: 'El 97% del agua terrestre es salada; del 3% restante, la mayor parte está congelada en glaciares o en acuíferos profundos, dejando menos del 1% accesible en superficie.'
  },

  // ==========================================
  // 8. VIDA COTIDIANA (11 preguntas)
  // ==========================================
  {
    id: 'cot_1',
    categoryId: 'vida_cotidiana',
    level: 'facil',
    question: '¿Cuántas horas de sueño nocturno de calidad se recomiendan generalmente para adolescentes entre 13 y 18 años?',
    options: ['4 a 5 horas', '8 a 10 horas', '12 a 14 horas', 'Bastan 3 horas con café'],
    correctIndex: 1,
    explanation: 'La Academia Americana de Medicina del Sueño recomienda de 8 a 10 horas para apoyar el desarrollo cerebral, la memoria y el equilibrio hormonal.'
  },
  {
    id: 'cot_2',
    categoryId: 'vida_cotidiana',
    level: 'facil',
    question: '¿Qué hábito simple y económico antes de comer reduce drásticamente el contagio de infecciones estomacales y respiratorias?',
    options: [
      'Limpiarse las manos únicamente con la ropa',
      'Lavarse las manos con agua y jabón durante al menos 20 segundos',
      'Soplar los alimentos calientes',
      'Tomar un vaso de refresco carbonatado'
    ],
    correctIndex: 1,
    explanation: 'Lavarse las manos con agua y jabón desintegra la membrana lipídica de virus y bacterias comunes, previniendo hasta el 50% de infecciones.'
  },
  {
    id: 'cot_3',
    categoryId: 'vida_cotidiana',
    level: 'facil',
    question: 'En finanzas personales juveniles, ¿qué significa "hacer un presupuesto"?',
    options: [
      'Gastar todo el dinero el primer día de la semana',
      'Pedir dinero prestado a amigos constantemente',
      'Planificar y registrar con anticipación los ingresos, gastos prioritarios y el ahorro',
      'Apostar el dinero en videojuegos de azar'
    ],
    correctIndex: 2,
    explanation: 'Un presupuesto te permite tener control de tus recursos, evitando compras impulsivas y facilitando metas a mediano y largo plazo.'
  },
  {
    id: 'cot_4',
    categoryId: 'vida_cotidiana',
    level: 'facil',
    question: '¿Cuál es la postura más saludable al sentarse frente a una computadora o escritorio?',
    options: [
      'Espalda recta apoyada, hombros relajados y pies planos sobre el suelo',
      'Totalmente encorvado hacia la pantalla con el cuello doblado',
      'Sentarse sobre una sola pierna durante horas',
      'Mirar hacia arriba con la pantalla por encima de la cabeza'
    ],
    correctIndex: 0,
    explanation: 'Mantener la espalda erguida con buen apoyo lumbar y la pantalla a la altura de los ojos previene fatiga muscular y dolores crónicos de cuello.'
  },
  {
    id: 'cot_5',
    categoryId: 'vida_cotidiana',
    level: 'intermedio',
    question: '¿Qué es la "luz azul" que emiten las pantallas de teléfonos y computadoras y cómo afecta en la noche?',
    options: [
      'Es luz ultravioleta que quema la piel de la cara',
      'Es una longitud de onda corta que inhibe la producción de melatonina y altera el sueño',
      'Es una señal de radio que recalienta la batería',
      'Es un reflejo que mejora la visión nocturna'
    ],
    correctIndex: 1,
    explanation: 'La luz azul engaña al cerebro haciéndole creer que todavía es de día, frenando la hormona melatonina que induce el sueño reparador.'
  },
  {
    id: 'cot_6',
    categoryId: 'vida_cotidiana',
    level: 'intermedio',
    question: '¿Qué significa la técnica de estudio "Pomodoro"?',
    options: [
      'Estudiar escuchando música clásica en italiano',
      'Trabajar en bloques concentrados de 25 minutos seguidos de 5 minutos de descanso',
      'Memorizar textos comiendo tomates frescos',
      'Repasar toda la noche anterior al examen sin dormir'
    ],
    correctIndex: 1,
    explanation: 'Creada por Francesco Cirillo, la técnica Pomodoro combate la procrastinación dividiendo el estudio en intervalos de alta concentración con pausas breves.'
  },
  {
    id: 'cot_7',
    categoryId: 'vida_cotidiana',
    level: 'intermedio',
    question: '¿Por qué las bebidas energizantes no sustituyen al agua ni al descanso real?',
    options: [
      'Porque contienen altas dosis de cafeína y azúcar que provocan taquicardia y posterior efecto rebote de fatiga',
      'Porque congelan las papilas gustativas',
      'Porque aumentan la estatura de forma anormal',
      'Porque neutralizan los glóbulos rojos'
    ],
    correctIndex: 0,
    explanation: 'El estímulo de las bebidas energizantes es temporal; al pasar el pico de cafeína y azúcar sobrevienen caídas abruptas de energía y deshidratación.'
  },
  {
    id: 'cot_8',
    categoryId: 'vida_cotidiana',
    level: 'intermedio',
    question: '¿Qué es la "asertividad" en la comunicación diaria entre amigos y familia?',
    options: [
      'Gritar más fuerte que los demás para tener la razón',
      'Aceptar todo lo que otros digan por miedo al conflicto',
      'Expresar tus opiniones, sentimientos y límites con honestidad y respeto, sin agredir ni someterte',
      'Ignorar a las personas cuando no estás de acuerdo'
    ],
    correctIndex: 2,
    explanation: 'La asertividad es el equilibrio saludable entre la pasividad y la agresividad, defendiendo tus derechos respetando siempre los ajenos.'
  },
  {
    id: 'cot_9',
    categoryId: 'vida_cotidiana',
    level: 'dificil',
    question: 'En economía y toma de decisiones, ¿qué es el "costo de oportunidad"?',
    options: [
      'La rebaja o descuento especial que encuentras en una tienda de ropa',
      'El valor de la mejor alternativa a la que renuncias al elegir una opción sobre otra',
      'La comisión que te cobra un banco por retirar efectivo',
      'El precio del envío a domicilio de un producto digital'
    ],
    correctIndex: 1,
    explanation: 'Si decides pasar dos horas viendo videos en lugar de estudiar para un examen decisivo, el costo de oportunidad es la calificación y tranquilidad sacrificadas.'
  },
  {
    id: 'cot_10',
    categoryId: 'vida_cotidiana',
    level: 'dificil',
    question: '¿Qué es el "sesgo de confirmación" que influye en cómo leemos noticias en redes sociales?',
    options: [
      'El mensaje que te confirma que tu contraseña se cambió con éxito',
      'La tendencia psicológica a buscar y creer solo información que coincide con nuestras opiniones previas, ignorando evidencias contrarias',
      'El filtro automático de spam de tu correo electrónico',
      'La verificación azul de una cuenta famosa'
    ],
    correctIndex: 1,
    explanation: 'El sesgo de confirmación nos hace vulnerables a noticias falsas y polarización, ya que nuestro cerebro prefiere sentirse cómodo teniendo la razón antes que verificar los datos.'
  },
  {
    id: 'cot_11',
    categoryId: 'vida_cotidiana',
    level: 'dificil',
    question: 'Al hacer compras, ¿qué diferencia sustancial existe entre una "necesidad" y un "deseo"?',
    options: [
      'Las necesidades son indispensables para la vida y bienestar básico; los deseos son gustos prescindibles que podemos posponer',
      'Los deseos siempre cuestan menos de $10 dólares',
      'Las necesidades son solo las que se compran con tarjeta de crédito',
      'No existe ninguna diferencia en economía moderna'
    ],
    correctIndex: 0,
    explanation: 'Aprender a distinguir necesidades indispensables (comida nutritiva, educación, salud) de deseos placenteros pero opcionales es la base del éxito financiero.'
  }
];
