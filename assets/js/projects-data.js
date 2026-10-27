
/* ==========================================================================
   Portfolio LAWANI AKIRAM — données des projets
   ========================================================================== */

window.PROJETS = [
  /* ----------------------------------------------------------------------
     PROJET 1 — Reconnaissance réseau avec Zenmap
     Rapport : assets/rapports/Rapport_Audit_Reseau.pdf
     ---------------------------------------------------------------------- */
  {
    id: "reconnaissance-zenmap",
    numero: "Projet 01",
    titre: "Reconnaissance réseau avec Zenmap",
    tags: [
      "Reconnaissance réseau",
      "Scan de ports"
    ],
    resume:
      "Audit d'un petit laboratoire virtuel personnel (VM Ubuntu) : configuration réseau, scan de découverte, identification des services exposés (SSH, Apache) et de leurs versions, diagnostic d'un problème de connectivité lié à l'isolation d'un point d'accès Wi-Fi.",
    outils: [
      "Zenmap 7.99",
      "VirtualBox",
      "Ubuntu",
      "Windows 11"
    ],
    rapport: {
      fichier: "assets/rapports/Rapport_Audit_Reseau.pdf",
      pages: 4
    }
  },

  /* ----------------------------------------------------------------------
     PROJET 2 — Gestion des accès et politique de mots de passe
     Rapport : assets/rapports/rapport_gestion_acces_mfa.pdf
     ---------------------------------------------------------------------- */
  {
    id: "gestion-acces-mfa",
    numero: "Projet 02",
    titre: "Gestion des accès et politique de mots de passe (SSH + MFA)",
    tags: [
      "Durcissement système",
      "Authentification"
    ],
    resume:
      "Mise en place d'une politique de gestion des accès sur un serveur Ubuntu : mots de passe robustes, moindre privilège, durcissement de SSH, authentification à deux facteurs (TOTP), protection contre la force brute et journalisation.",
    outils: [
      "Ubuntu Server 26.04 LTS",
      "OpenSSH",
      "PAM (pam_pwquality)",
      "pam_google_authenticator",
      "Google Authenticator (TOTP)",
      "Fail2ban",
      "journalctl",
      "VirtualBox"
    ],
    rapport: {
      fichier: "assets/rapports/rapport_gestion_acces_mfa.pdf",
      pages: 15
    }
  },

  /* ----------------------------------------------------------------------
     PROJET 3 — IT Quiz Challenge
     ---------------------------------------------------------------------- */
  {
    id: "it-quiz-challenge",
    numero: "Projet 03",
    titre: "IT Quiz Challenge : Application de quiz informatique",
    tags: [
      "Développement web",
      "JavaScript",
      "Application interactive"
    ],
    resume:
      "Développement d'une application web interactive permettant de tester et d'améliorer ses connaissances en informatique grâce à trois niveaux de difficulté : débutant, intermédiaire et avancé. L'application propose plusieurs modes de quiz, un système de scores et un suivi de progression. Les données sont conservées localement dans le navigateur grâce à LocalStorage.",
    outils: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "LocalStorage",
      "GitHub Pages"
    ],
    lienProjet: "https://akiram55.github.io/it-quiz-challenge/",
    rapport: {
      fichier: "https://akiram55.github.io/it-quiz-challenge/docs/rapport_it_quiz_challenge.pdf"
    }
  }
];
