// Données éditoriales vérifiées ou explicitement signalées comme incomplètes.
// Pour ajouter une image : placer un vrai fichier dans le dépôt, puis renseigner images: [{src, alt}].
window.PORTFOLIO_PROJECTS = [
  {
    id: "sharescreen",
    title: "ShareScreen",
    category: "digital",
    categoryLabel: "Application web",
    status: "Déployé",
    number: "01",
    year: "2026",
    teaser: "Partager et afficher des écrans à distance pour les TP, ateliers et formations.",
    short: "Une application web de partage d’écran, organisée autour de salons, d’un hôte et de participants.",
    tags: ["JavaScript", "WebRTC", "Cloudflare Workers", "WebSockets"],
    context: [
      "Dans les travaux pratiques et les formations, montrer l’écran d’un participant sur celui de l’animateur peut être fastidieux. ShareScreen propose un salon partagé où chacun peut rejoindre une session avec un code et choisir l’écran à transmettre.",
      "L’objectif du projet : simplifier les démonstrations et permettre à l’hôte de choisir l’écran à afficher, avec une gestion claire des participants et des demandes."
    ],
    methodology: [
      ["Comprendre l’usage", "Définition des parcours hôte et invité, des salons et des règles de demande d’affichage."],
      ["Concevoir l’interface", "Création d’une interface web adaptée aux ateliers et aux travaux pratiques."],
      ["Construire la solution", "Utilisation de WebRTC pour le transport des flux, de WebSockets pour la signalisation et de Cloudflare Workers pour l’application."],
      ["Tester et déployer", "Vérifications des principales opérations et mise en ligne de la solution."]
    ],
    results: [
      "Une application web déployée et accessible en ligne.",
      "Création et accès à des salons avec code unique.",
      "Partage et affichage de l’écran d’un participant, gestion des demandes et export des présences en CSV."
    ],
    links: [
      { label: "Ouvrir l’application", url: "https://sharescreen.donaldzinsoud.workers.dev", kind: "live" },
      { label: "Voir le code sur GitHub", url: "https://github.com/donald150507/sharescreen", kind: "github" }
    ],
    access: "Code source public sur GitHub.",
    imageNote: "Une capture réelle de l’application sera ajoutée ici. Le visuel ci-dessous est une illustration schématique, pas une capture.",
    images: []
  },
  {
    id: "decrochage-scolaire",
    title: "Décrochage scolaire",
    category: "data",
    categoryLabel: "Recherche & statistique",
    status: "Étude réalisée",
    number: "02",
    year: "2025",
    teaser: "Identifier les facteurs associés à l’abandon scolaire au premier cycle du secondaire au Bénin.",
    short: "Une analyse statistique des facteurs associés à l’abandon scolaire à partir des données MICS du Bénin.",
    tags: ["MICS 2021–2022", "Régression logistique", "ACM", "Analyse de données"],
    context: [
      "L’abandon scolaire pose un enjeu pour le système éducatif et l’égalité des chances. L’étude cherche à mieux comprendre les caractéristiques associées à la déscolarisation des élèves du premier cycle du secondaire au Bénin.",
      "Le travail s’appuie sur l’enquête MICS 2021–2022, en considérant notamment le milieu de résidence, les caractéristiques du ménage et le travail des enfants."
    ],
    methodology: [
      ["Préparer les données", "Sélection des observations pertinentes et construction des variables de l’analyse."],
      ["Décrire l’échantillon", "Étude de la fréquence de l’abandon et comparaison des profils observés."],
      ["Explorer les associations", "Analyse des correspondances multiples (ACM) pour étudier les proximités entre modalités."],
      ["Modéliser", "Régression logistique pour examiner les facteurs associés à l’abandon, sans interprétation causale automatique."]
    ],
    results: [
      "2 114 observations dans l’échantillon final, avec un taux d’abandon observé de 11,5 %.",
      "L’ACM fait ressortir un profil d’abandon associé à plusieurs facteurs de vulnérabilité, notamment le milieu rural et un niveau de vie plus faible.",
      "La régression logistique explore les associations entre caractéristiques individuelles, familiales et abandon scolaire."
    ],
    links: [],
    access: "Document d’étude à ajouter : aucun rapport public vérifié n’est actuellement lié.",
    imageNote: "Figures d’analyse et extraits du rapport à insérer lorsqu’ils seront disponibles. Le visuel ci-dessous est schématique.",
    images: []
  },
  {
    id: "reporting-automatise",
    title: "Reporting automatisé",
    category: "data",
    categoryLabel: "Data & automatisation",
    status: "Travail professionnel",
    number: "03",
    year: "2026",
    teaser: "Transformer des états de transactions en indicateurs et rapports structurés.",
    short: "Des traitements automatisés pour suivre l’activité et faciliter la lecture des données opérationnelles.",
    tags: ["Excel / VBA", "Power Query", "Reporting", "Contrôles"],
    context: [
      "Les états de transactions contiennent des données détaillées qu’il faut retraiter avant d’en tirer une information exploitable. Le projet vise à automatiser les opérations récurrentes et produire des indicateurs cohérents.",
      "Cette fiche décrit les objectifs et la démarche à un niveau général ; les informations internes et les données professionnelles ne sont pas publiées."
    ],
    methodology: [
      ["Définir les indicateurs", "Recenser les besoins de reporting et les règles de calcul."],
      ["Préparer les données", "Structurer les enregistrements, les catégories et les statuts pertinents."],
      ["Automatiser", "Mettre en place des traitements reproductibles et des feuilles de synthèse."],
      ["Contrôler", "Vérifier les agrégations et produire des restitutions lisibles."]
    ],
    results: [
      "Mise en place d’une structure de rapports et d’indicateurs.",
      "Automatisation de tâches de traitement répétitives.",
      "Résultats détaillés et documents professionnels non diffusés."
    ],
    links: [],
    access: "Code, données et documents non publics : il s’agit d’un travail professionnel.",
    imageNote: "Les captures internes ne sont pas publiées. L’illustration est volontairement conceptuelle et ne reprend aucune donnée professionnelle.",
    images: []
  },
  {
    id: "revixo",
    title: "Revixo",
    category: "digital",
    categoryLabel: "EdTech & conception",
    status: "Concept en développement",
    number: "04",
    year: "En conception",
    teaser: "Imaginer une plateforme d’apprentissage avec quiz, corrections et challenges.",
    short: "Un concept de plateforme pour rendre la révision plus accessible et structurée.",
    tags: ["EdTech", "UX", "Quiz", "Produit"],
    context: [
      "Les étudiants jonglent souvent entre supports de cours, corrigés et ressources de révision dispersées. Revixo est pensé pour les réunir dans une expérience d’apprentissage plus organisée.",
      "Le concept aborde notamment les quiz, les questions ouvertes, les explications et le suivi de progression."
    ],
    methodology: [
      ["Identifier les usages", "Décrire les besoins étudiants et les difficultés rencontrées lors des révisions."],
      ["Définir les modules", "Structurer quiz, campagnes de challenges, classements et tableaux de progression."],
      ["Concevoir les parcours", "Préciser les interactions de l’apprenant et l’organisation des contenus."]
    ],
    results: [
      "Concept fonctionnel documenté autour de la révision et des défis hebdomadaires.",
      "Les fonctionnalités décrites correspondent à des choix de conception ; elles ne constituent pas une annonce de produit déjà déployé."
    ],
    links: [],
    access: "Aucun dépôt public ou démonstrateur confirmé pour ce projet à ce stade.",
    imageNote: "Maquettes et captures d’interface à ajouter lorsque des visuels partageables seront disponibles.",
    images: []
  },
  {
    id: "gestion-avicole",
    title: "Gestion avicole",
    category: "digital",
    categoryLabel: "AgriTech & conception",
    status: "Conception fonctionnelle",
    number: "05",
    year: "En conception",
    teaser: "Structurer la gestion d’une activité avicole multi-sites et ses flux.",
    short: "Une architecture fonctionnelle pour le suivi de la production, des stocks et des opérations.",
    tags: ["AgriTech", "Stocks", "Traçabilité", "Modélisation métier"],
    context: [
      "Une exploitation avicole doit suivre des sites, des zones, des lots, la production, les consommations et les mouvements de stocks. Les opérations intersites demandent une traçabilité claire.",
      "Le projet formalise les règles de gestion d’une future application plutôt que de présenter un produit déjà finalisé."
    ],
    methodology: [
      ["Modéliser l’organisation", "Définir une hiérarchie exploitation, sites, zones et subdivisions possibles."],
      ["Décrire les opérations", "Formaliser les flux de production, d’alimentation, de vente et de stock."],
      ["Préciser la traçabilité", "Documenter les mouvements, les annulations, les inventaires et les validations."],
      ["Préparer l’implémentation", "Organiser les règles fonctionnelles par module et prévoir les configurations utiles."]
    ],
    results: [
      "Structuration de plusieurs modules métiers et de leurs règles.",
      "Formalisation d’un modèle multi-sites avec traçabilité des mouvements.",
      "Solution toujours en phase de conception ; aucune application finale n’est présentée ici comme publiée."
    ],
    links: [],
    access: "Documents de conception non ajoutés publiquement à ce portfolio.",
    imageNote: "Schémas de modules et captures de l’application à ajouter lors d’une phase ultérieure.",
    images: []
  }
];
