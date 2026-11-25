export type Lang = "en" | "it" | "es";
export const LANGS: Lang[] = ["en", "it", "es"];
type L = Record<Lang, string>;

export const cvFile = (lang: Lang) => (lang === "it" ? "cv/Tomas-Vales-CV-IT.pdf" : "cv/Tomas-Vales-CV-EN.pdf");

export const LINKS = {
  email: "contacto.tomasvales@gmail.com",
  github: "https://github.com/TomasVales",
  linkedin: "https://www.linkedin.com/in/tomasvales/",
};

export const UI = {
  nav: { work: { en: "Work", it: "Progetti", es: "Proyectos" }, about: { en: "About", it: "Chi sono", es: "Sobre mí" }, contact: { en: "Contact", it: "Contatti", es: "Contacto" } },
  available: { en: "Open to opportunities", it: "Aperto a opportunità", es: "Abierto a oportunidades" },
  heroRole: { en: "Computer Science student", it: "Studente di Informatica", es: "Estudiante de Computer Science" },
  heroAt: { en: "Ca' Foscari University of Venice", it: "Università Ca' Foscari Venezia", es: "Universidad Ca' Foscari de Venecia" },
  heroTag: {
    en: "Developer from Argentina, based in Venice. I build software end to end: APIs, data pipelines, desktop apps and games.",
    it: "Sviluppatore argentino, a Venezia. Costruisco software dall'inizio alla fine: API, pipeline di dati, app desktop e videogiochi.",
    es: "Desarrollador argentino viviendo en Venecia. Hago software de punta a punta: APIs, pipelines de datos, apps de escritorio y juegos.",
  },
  scroll: { en: "Scroll", it: "Scorri", es: "Bajá" },
  local: { en: "Venice", it: "Venezia", es: "Venecia" },
  aboutLabel: { en: "About", it: "Chi sono", es: "Sobre mí" },
  aboutText: {
    en: "I'm Tomas, an Argentine developer studying Computer Science at Ca' Foscari in Venice. I trained as a Programming Technician at UTN and since then I've built backends, data tools, desktop apps and games. Now I'm looking for a place to work, learn and ship real things.",
    it: "Sono Tomas, sviluppatore argentino e studente di Informatica a Ca' Foscari, Venezia. Mi sono formato come Tecnico in Programmazione all'UTN e da allora ho costruito backend, strumenti per i dati, app desktop e videogiochi. Ora cerco un posto dove lavorare, imparare e realizzare cose vere.",
    es: "Soy Tomas, desarrollador argentino y estudiante de Computer Science en Ca' Foscari, Venecia. Me recibí de Técnico Superior en Programación en la UTN y desde entonces hice backends, herramientas de datos, apps de escritorio y juegos. Ahora busco un lugar donde trabajar, aprender y construir cosas reales.",
  },
  facts: [
    { n: 50, en: "public repositories", it: "repository pubblici", es: "repositorios públicos" },
    { n: 9, en: "programming languages", it: "linguaggi di programmazione", es: "lenguajes de programación" },
    { n: 6, en: "databases worked with", it: "database usati nei progetti", es: "bases de datos usadas en proyectos" },
  ],
  workLabel: { en: "Selected work", it: "Progetti scelti", es: "Proyectos destacados" },
  view: { en: "View", it: "Apri", es: "Ver" },
  live: { en: "Live", it: "Online", es: "Online" },
  code: { en: "Code", it: "Codice", es: "Código" },
  close: { en: "Close", it: "Chiudi", es: "Cerrar" },
  next: { en: "Next project", it: "Progetto successivo", es: "Siguiente proyecto" },
  year: { en: "Year", it: "Anno", es: "Año" },
  type: { en: "Type", it: "Tipo", es: "Tipo" },
  stackL: { en: "Stack", it: "Stack", es: "Stack" },
  highlights: { en: "Highlights", it: "In evidenza", es: "Lo destacado" },
  archiveLabel: { en: "More things I've built", it: "Altre cose che ho costruito", es: "Más cosas que hice" },
  archiveCols: { en: ["Year", "Project", "Type", "Stack"], it: ["Anno", "Progetto", "Tipo", "Stack"], es: ["Año", "Proyecto", "Tipo", "Stack"] },
  allRepos: { en: "All repositories on GitHub", it: "Tutti i repository su GitHub", es: "Todos los repos en GitHub" },
  toolbox: { en: "Toolbox", it: "Strumenti", es: "Herramientas" },
  toolboxSub: { en: "What I work with", it: "Con cosa lavoro", es: "Con qué trabajo" },
  path: { en: "Path", it: "Percorso", es: "Recorrido" },
  contactBig: { en: ["Let's build", "something"], it: ["Costruiamo", "qualcosa"], es: ["Hagamos", "algo"] },
  contactSub: {
    en: "Have an internship, a job or a project in mind? Write me.",
    it: "Hai uno stage, un lavoro o un progetto in mente? Scrivimi.",
    es: "¿Tenés una pasantía, un trabajo o un proyecto en mente? Escribime.",
  },
  copy: { en: "Click to copy", it: "Clicca per copiare", es: "Click para copiar" },
  copied: { en: "Copied!", it: "Copiato!", es: "¡Copiado!" },
  top: { en: "Back to top", it: "Torna su", es: "Volver arriba" },
  built: { en: "Designed & built by Tomas Vales", it: "Progettato e sviluppato da Tomas Vales", es: "Diseñado y hecho por Tomas Vales" },
  cv: { en: "Download CV", it: "Scarica il CV", es: "Descargar CV" },
  inProgress: { en: "in progress", it: "in corso", es: "en curso" },
} satisfies Record<string, unknown>;

export const STACK: { name: L; items: string[] }[] = [
  { name: { en: "Languages", it: "Linguaggi", es: "Lenguajes" }, items: ["Python", "TypeScript", "JavaScript", "C", "C++", "C#", "Java", "PHP", "ARM64 Assembly"] },
  { name: { en: "Frameworks", it: "Framework", es: "Frameworks" }, items: ["React", "FastAPI", "Django", "Node.js", ".NET", "Electron", "Astro", "Tailwind"] },
  { name: { en: "Databases", it: "Database", es: "Bases de datos" }, items: ["PostgreSQL", "MySQL", "SQLite", "SQL Server", "MongoDB", "Oracle"] },
  { name: { en: "Data & ML", it: "Dati & ML", es: "Datos & ML" }, items: ["Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Jupyter"] },
  { name: { en: "Cloud & Tools", it: "Cloud & Tool", es: "Cloud & Tools" }, items: ["Docker", "Docker Compose", "Azure", "Git", "GitHub Actions", "Linux"] },
];

export const PATH: { when: L; title: L; place: string; text: L }[] = [
  {
    when: { en: "Now", it: "Oggi", es: "Hoy" },
    title: { en: "B.Sc. Computer Science", it: "Laurea in Informatica", es: "Licenciatura en Computer Science" },
    place: "Università Ca' Foscari · Venezia, IT",
    text: { en: "Data Science curriculum. Algorithms, systems, statistics and machine learning.", it: "Curriculum Data Science. Algoritmi, sistemi, statistica e machine learning.", es: "Orientación en Data Science. Algoritmos, sistemas, estadística y machine learning." },
  },
  {
    when: { en: "Before", it: "Prima", es: "Antes" },
    title: { en: "Programming Technician", it: "Tecnico in Programmazione", es: "Técnico Superior en Programación" },
    place: "UTN · Universidad Tecnológica Nacional, AR",
    text: { en: "Programming I–III, databases, OOP and full-stack projects, from C++ games to an ASP.NET clinic system.", it: "Programmazione I–III, database, OOP e progetti full-stack, da giochi in C++ a un gestionale clinico in ASP.NET.", es: "Programación I a III, bases de datos, POO y proyectos full-stack, desde juegos en C++ hasta un sistema de clínica en ASP.NET." },
  },
];

export type Project = {
  id: string;
  title: string;
  year: string;
  type: L;
  stack: string[];
  summary: L;
  points: Record<Lang, string[]>;
  images: string[];
  live?: string;
  repo?: string;
  /** imagen cuadrada (ícono) en vez de captura */
  icon?: boolean;
};

const gh = (r: string) => `https://github.com/TomasVales/${r}`;

export const PROJECTS: Project[] = [
  {
    id: "fly-that-reads",
    title: "The fly that reads",
    year: "2026",
    type: { en: "Computational neuroscience", it: "Neuroscienze computazionali", es: "Neurociencia computacional" },
    stack: ["Python", "PyTorch", "TypeScript", "React", "three.js", "Web Workers"],
    summary: {
      en: "The real wiring of a fruit-fly brain, 127,000 neurons mapped by FlyWire, learns to read Shakespeare, Cervantes, Hernández and Dante, and runs live in the browser.",
      it: "Il cablaggio reale del cervello di un moscerino, 127.000 neuroni mappati da FlyWire, impara a leggere Shakespeare, Cervantes, Hernández e Dante, e gira dal vivo nel browser.",
      es: "El cableado real del cerebro de una mosca, 127.000 neuronas mapeadas por FlyWire, aprende a leer a Shakespeare, Cervantes, Hernández y Dante, y corre en vivo en el navegador.",
    },
    points: {
      en: ["The full FlyWire connectome (3.7 million connections, 50 million synapses) used as a fixed network; only the Kenyon cells of the memory centre learn, like in a real fly. Trained on the Apple GPU with PyTorch.", "A lab where the brain runs in a Web Worker letter by letter: write a beginning and the fly continues it, switch parts of the brain off, or let it dream. Matches PyTorch to 1e-8.", "Honest results: it learns to babble in each book's language, but a brain with shuffled wiring learns just as much. Silencing 2 neurons (APL) breaks it as much as silencing 40,000."],
      it: ["Il connettoma completo di FlyWire (3,7 milioni di connessioni, 50 milioni di sinapsi) usato come rete fissa; imparano solo le cellule di Kenyon del centro della memoria, come in un moscerino vero. Addestrato sulla GPU Apple con PyTorch.", "Un laboratorio dove il cervello gira in un Web Worker lettera per lettera: scrivi un inizio e il moscerino continua, spegni parti del cervello o lascialo sognare. Coincide con PyTorch fino a 1e-8.", "Risultati onesti: impara a balbettare nella lingua di ogni libro, ma un cervello con i cavi mescolati impara lo stesso. Spegnere 2 neuroni (APL) lo rompe quanto spegnerne 40.000."],
      es: ["El conectoma completo de FlyWire (3,7 millones de conexiones, 50 millones de sinapsis) usado como red fija; solo aprenden las células de Kenyon del centro de memoria, como en una mosca real. Entrenado en la GPU de Apple con PyTorch.", "Un laboratorio donde el cerebro corre en un Web Worker letra por letra: escribís un comienzo y la mosca sigue, apagás partes del cerebro o la dejás soñar. Coincide con PyTorch hasta 1e-8.", "Resultados honestos: aprende a balbucear en el idioma de cada libro, pero un cerebro con los cables mezclados aprende lo mismo. Apagar 2 neuronas (APL) la rompe tanto como apagar 40.000."],
    },
    images: ["fly-main.jpg", "fly-lab.jpg", "fly-lesions.jpg"],
    live: "https://tomasvales.github.io/fly-that-reads/",
    repo: gh("fly-that-reads"),
  },
  {
    id: "pacific-pulse",
    title: "Pacific Pulse",
    year: "2026",
    type: { en: "Data visualization", it: "Visualizzazione dati", es: "Visualización de datos" },
    stack: ["TypeScript", "React", "three.js", "globe.gl", "Python", "GitHub Actions"],
    summary: {
      en: "An interactive 3D globe that shows how El Niño and La Niña reshape rain, heat and risk across Latin America over the next six months.",
      it: "Un globo 3D interattivo che mostra come El Niño e La Niña cambiano pioggia, caldo e rischi in America Latina nei prossimi sei mesi.",
      es: "Un globo 3D interactivo que muestra cómo El Niño y La Niña cambian la lluvia, el calor y los riesgos en Latinoamérica en los próximos seis meses.",
    },
    points: {
      en: ["Real data from NOAA (ONI index) and ERA5, processed by a Python pipeline that refreshes itself every month with GitHub Actions.", "About 2,600 hexagonal columns animated month by month across four layers: climate, agriculture, energy and urban health.", "What-if simulator: drag the ONI from extreme La Niña to extreme El Niño and the whole map is recomputed live. Historical analog years found with k-NN."],
      it: ["Dati reali da NOAA (indice ONI) ed ERA5, elaborati da una pipeline Python che si aggiorna ogni mese con GitHub Actions.", "Circa 2.600 colonne esagonali animate mese per mese su quattro livelli: clima, agricoltura, energia e salute urbana.", "Simulatore what-if: trascina l'ONI da La Niña estrema a El Niño estremo e la mappa si ricalcola dal vivo. Anni analoghi trovati con k-NN."],
      es: ["Datos reales de NOAA (índice ONI) y ERA5, procesados por un pipeline en Python que se actualiza solo cada mes con GitHub Actions.", "Unas 2.600 columnas hexagonales animadas mes a mes en cuatro capas: clima, agro, energía y salud urbana.", "Simulador what-if: arrastrás el ONI de La Niña extrema a El Niño extremo y todo el mapa se recalcula en vivo. Años análogos encontrados con k-NN."],
    },
    images: ["pacific1.jpg", "pacific2.jpg"],
    live: "https://tomasvales.github.io/pacific-pulse/",
    repo: gh("pacific-pulse"),
  },
  {
    id: "carrera-crack",
    title: "Carrera de Crack",
    year: "2026",
    type: { en: "Browser game", it: "Gioco per browser", es: "Juego web" },
    stack: ["TypeScript", "React", "Canvas", "Vite", "Tailwind", "PWA"],
    summary: {
      en: "A football career game: create your player, debut at 17 and chase the Ballon d'Or across 12 leagues, cups and World Cups.",
      it: "Un gioco di carriera calcistica: crea il tuo giocatore, debutta a 17 anni e insegui il Pallone d'Oro tra 12 campionati, coppe e Mondiali.",
      es: "Un juego de carrera de fútbol: creá tu jugador, debutá a los 17 y perseguí el Balón de Oro en 12 ligas, copas y Mundiales.",
    },
    points: {
      en: ["Playable key moments drawn on canvas: one-on-ones, free kicks with a wall, penalties and last-minute chances.", "A living world: clubs grow or decline every season, sign players, expand stadiums, and four rivals race you for the Ballon d'Or.", "No image or audio files: everything is drawn and synthesized in code. Works offline and installs on the phone."],
      it: ["Momenti chiave giocabili disegnati su canvas: uno contro uno, punizioni con barriera, rigori e occasioni all'ultimo minuto.", "Un mondo vivo: i club crescono o calano ogni stagione, comprano giocatori, ampliano lo stadio, e quattro rivali ti contendono il Pallone d'Oro.", "Nessun file di immagini o audio: tutto è disegnato e sintetizzato via codice. Funziona offline e si installa sul telefono."],
      es: ["Jugadas clave jugables dibujadas en canvas: mano a mano, tiros libres con barrera, penales y el épico minuto 90.", "Un mundo vivo: los clubes suben o bajan cada temporada, fichan jugadores, amplían el estadio, y cuatro rivales te pelean el Balón de Oro.", "Sin imágenes ni audios: todo se dibuja y suena por código. Funciona sin internet y se instala en el celular."],
    },
    images: ["crack-inicio.jpg", "crack-match.jpg", "crack-plantel.jpg"],
    live: "https://tomasvales.github.io/carrera-crack/",
    repo: gh("carrera-crack"),
  },
  {
    id: "oasi",
    title: "Oasi",
    year: "2026",
    type: { en: "Desktop app", it: "App desktop", es: "App de escritorio" },
    stack: ["Electron", "React", "TypeScript", "SQLite", "Drizzle", "Claude API"],
    summary: {
      en: "A minimalist, offline-first study OS for university students: planner, PDF workspace, notes, focus timer and an AI assistant.",
      it: "Un sistema di studio minimalista e offline per universitari: planner, lettore PDF, appunti, timer di concentrazione e assistente IA.",
      es: "Un sistema de estudio minimalista y offline para universitarios: planificador, lector de PDF, apuntes, cronómetro y un asistente con IA.",
    },
    points: {
      en: ["Deterministic, tested study planner that weighs deadlines, difficulty and your daily energy check-in.", "Split-screen workspace: PDF viewer plus Markdown notes with deep links that jump back to the exact spot in the PDF.", "Local SQLite with Drizzle migrations, secure IPC with zod, Google Calendar sync over OAuth with PKCE, and 44 tests."],
      it: ["Planner di studio deterministico e testato che pesa scadenze, difficoltà e il tuo livello di energia giornaliero.", "Schermo diviso: lettore PDF e appunti Markdown con deep link che riportano al punto esatto del PDF.", "SQLite locale con migrazioni Drizzle, IPC sicuro con zod, sincronizzazione con Google Calendar via OAuth con PKCE e 44 test."],
      es: ["Planificador de estudio determinístico y testeado que pondera fechas, dificultad y tu nivel de energía del día.", "Pantalla dividida: visor de PDF y apuntes en Markdown con deep links que vuelven al punto exacto del PDF.", "SQLite local con migraciones de Drizzle, IPC seguro con zod, sincronización con Google Calendar por OAuth con PKCE y 44 tests."],
    },
    images: ["oasi1.jpg", "oasi2.jpg", "oasi3.jpg", "oasi4.jpg"],
    repo: gh("Oasi"),
  },
  {
    id: "shadows-of-laenor",
    title: "Shadows of Laenor",
    year: "2024",
    type: { en: "Game · C++", it: "Gioco · C++", es: "Juego · C++" },
    stack: ["C++", "SFML", "Box2D", "OOP"],
    summary: {
      en: "A dark 2D action RPG inspired by Dark Souls, built from scratch in C++ as the final project for Programming II.",
      it: "Un RPG d'azione 2D dai toni cupi ispirato a Dark Souls, creato da zero in C++ come progetto finale di Programmazione II.",
      es: "Un RPG de acción 2D oscuro inspirado en Dark Souls, hecho desde cero en C++ como trabajo final de Programación II.",
    },
    points: {
      en: ["Modular object-oriented architecture for players, enemies and bosses.", "Event system to handle player and enemy interactions.", "Physics and collisions powered by Box2D, rendering with SFML."],
      it: ["Architettura modulare orientata agli oggetti per giocatore, nemici e boss.", "Sistema di eventi per gestire le interazioni tra giocatore e nemici.", "Fisica e collisioni con Box2D, grafica con SFML."],
      es: ["Arquitectura orientada a objetos y modular para jugador, enemigos y jefes.", "Sistema de eventos para manejar las interacciones entre jugador y enemigos.", "Física y colisiones con Box2D, gráficos con SFML."],
    },
    images: ["shadows.jpg"],
    repo: gh("Shadows-of-Laenor"),
  },
  {
    id: "oath-of-laenor",
    title: "Oath of Laenor",
    year: "2025",
    type: { en: "Game · Unity", it: "Gioco · Unity", es: "Juego · Unity" },
    stack: ["C#", "Unity", "2D"],
    summary: {
      en: "A 2D action-platformer in the Laenor universe: a warrior, enemy AI and a boss fight, made to master Unity and C#.",
      it: "Un action-platformer 2D nell'universo di Laenor: un guerriero, IA nemica e uno scontro con il boss, per imparare Unity e C#.",
      es: "Un plataformas de acción 2D en el universo de Laenor: un guerrero, IA enemiga y una pelea contra un jefe, para dominar Unity y C#.",
    },
    points: {
      en: ["Character controller with movement and combat.", "Enemy AI with patrol and chase behaviour.", "A boss fight prototype with its own patterns."],
      it: ["Controller del personaggio con movimento e combattimento.", "IA nemica con pattugliamento e inseguimento.", "Prototipo di boss fight con i suoi pattern."],
      es: ["Controlador del personaje con movimiento y combate.", "IA enemiga que patrulla y persigue.", "Prototipo de pelea contra un jefe con sus propios patrones."],
    },
    images: ["oath1.jpg", "oath2.jpg", "oath3.jpg"],
    repo: gh("AothofLaenor"),
  },
  {
    id: "notecloud",
    title: "NoteCloud",
    year: "2025",
    type: { en: "Full-stack web app", it: "Web app full-stack", es: "Web app full-stack" },
    stack: ["React", "FastAPI", "SQLAlchemy", "JWT", "Tailwind"],
    summary: {
      en: "A full-stack music streaming app inspired by Spotify, with artists, albums, playlists and an admin panel.",
      it: "Un'app full-stack di streaming musicale ispirata a Spotify, con artisti, album, playlist e pannello di amministrazione.",
      es: "Una app full-stack de streaming de música inspirada en Spotify, con artistas, álbumes, playlists y panel de administración.",
    },
    points: {
      en: ["Public artist profiles and album pages with tracklists and cover art.", "Admin panel to upload and manage songs, albums and artists.", "JWT authentication with role-based access, built with FastAPI and React."],
      it: ["Profili pubblici degli artisti e pagine degli album con tracklist e copertine.", "Pannello admin per caricare e gestire brani, album e artisti.", "Autenticazione JWT con ruoli, costruita con FastAPI e React."],
      es: ["Perfiles públicos de artistas y páginas de álbumes con lista de temas y portadas.", "Panel de administración para subir y gestionar canciones, álbumes y artistas.", "Autenticación JWT con roles, hecha con FastAPI y React."],
    },
    images: ["notecloud1.jpg", "notecloud2.jpg", "notecloud3.jpg"],
    repo: gh("NoteCloud"),
  },
];

export const ARCHIVE: { year: string; title: string; type: L; stack: string; url?: string; wip?: boolean }[] = [
  { year: "2026", title: "A64 Trainer", type: { en: "ARM64 exam trainer · Ca' Foscari", it: "Allenatore ARM64 · Ca' Foscari", es: "Entrenador de ARM64 · Ca' Foscari" }, stack: "JavaScript · ARM64 Assembly", url: gh("A64-Trainer") },
  { year: "2026", title: "Neysu", type: { en: "Social app for students", it: "Social per universitari", es: "Red social universitaria" }, stack: "React Native · Expo", wip: true },
  { year: "2026", title: "Math Steps", type: { en: "Offline math helper (PWA)", it: "Aiuto per la matematica (PWA)", es: "Ayuda de matemática (PWA)" }, stack: "TypeScript · React", url: gh("app-cop") },
  { year: "2026", title: "C99 Adventure", type: { en: "Text adventure · Ca' Foscari", it: "Avventura testuale · Ca' Foscari", es: "Aventura de texto · Ca' Foscari" }, stack: "C99", url: gh("C99---Ca-Foscari") },
  { year: "2025", title: "BookSpace API", type: { en: "REST API", it: "API REST", es: "API REST" }, stack: "FastAPI · JWT · Docker · Pytest", url: gh("BookSpace") },
  { year: "2025", title: "Face Unlock", type: { en: "Face recognition", it: "Riconoscimento facciale", es: "Reconocimiento facial" }, stack: "Python · OpenCV · DeepFace", url: gh("FaceUnlock") },
  { year: "2025", title: "Inventory & POS", type: { en: "Inventory and sales API", it: "API magazzino e vendite", es: "API de inventario y ventas" }, stack: "FastAPI · SQLite", url: gh("InventoryAPI") },
  { year: "2025", title: "Bitcoin Predictor", type: { en: "ML dashboard", it: "Dashboard ML", es: "Dashboard de ML" }, stack: "Python · Scikit-Learn", url: gh("BitcoinPricePredictor") },
  { year: "2025", title: "Medical Clinic", type: { en: "Clinic management · UTN", it: "Gestionale clinico · UTN", es: "Gestión de clínica · UTN" }, stack: "C# · ASP.NET · SQL Server", url: gh("MedicalClinicSystem") },
  { year: "2025", title: "Cloud Delivery", type: { en: "Orders & e-commerce", it: "Ordini & e-commerce", es: "Pedidos & e-commerce" }, stack: "React · Node · PostgreSQL", url: gh("Cloud_Delivery") },
  { year: "2025", title: "Energy in Argentina", type: { en: "Regression analysis", it: "Analisi di regressione", es: "Análisis de regresión" }, stack: "Pandas · Scikit-Learn", url: gh("ConsumoArgentina") },
  { year: "2025", title: "SpikeBoost", type: { en: "Service web platform", it: "Piattaforma web", es: "Plataforma web" }, stack: "PHP · MySQL", url: gh("SpikeBoost") },
  { year: "2025", title: "Client sites ×8", type: { en: "Portfolio websites", it: "Siti portfolio", es: "Sitios de portfolio" }, stack: "React · Vercel", url: "https://github.com/TomasVales?tab=repositories&q=portfolio" },
  { year: "2024", title: "Generala", type: { en: "Dice game · UTN", it: "Gioco di dadi · UTN", es: "Juego de dados · UTN" }, stack: "C++", url: gh("Generala") },
];
