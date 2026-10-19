/* ==========================================================================
   DONNÉES DES PROJETS — portfolio LAWANI AKIRAM
   --------------------------------------------------------------------------
   C'est LE fichier à modifier pour ajouter ou mettre à jour un projet.
   Aucune autre modification du code n'est nécessaire : la page « Projets »
   est générée automatiquement à partir du tableau ci-dessous.

   COMMENT AJOUTER UN PROJET :
   1. Déposer le rapport PDF dans  assets/rapports/
   2. Copier un bloc { ... } ci-dessous, le coller à la fin du tableau
      (avant le crochet final ]), puis adapter les textes et les chemins.
   3. Recharger la page : la nouvelle carte apparaît automatiquement.

   Remarque : les cartes ne comportent volontairement aucune image. Les captures
   d'écran contenues dans les rapports ne sont jamais extraites ni affichées
   séparément ; elles restent visibles dans les PDF publics.

   Champs utilisés par la page :
     id            identifiant unique, sans espace ni accent (sert d'ancre)
     numero        libellé affiché en haut de la carte, ex. "Projet 03"
     titre         titre exact du projet
     tags          une ou deux étiquettes courtes
     resume        présentation en une ou deux phrases
     objectif      but du projet
     demarche      liste des étapes réellement suivies (facultatif)
     mesures       liste des mesures configurées (facultatif)
     recommandations  liste de recommandations (facultatif)
     environnement liste de { intitule, valeur }
     outils        liste de noms d'outils réellement utilisés
     observations  liste de constats réellement documentés (facultatif)
     tests         liste de { scenario, resultat } (facultatif)
     reserve       mise en garde honnête sur le périmètre des tests (facultatif)
     enseignement  ce que le projet a apporté
     rapport       { fichier, pages, poids } — chemin du PDF
   ========================================================================== */

window.PROJETS = [
  /* ----------------------------------------------------------------------
     PROJET 1 — Rapport : assets/rapports/Rapport_Audit_Reseau.pdf
     ---------------------------------------------------------------------- */
  {
    id: "reconnaissance-zenmap",
    numero: "Projet 01",
    titre: "Reconnaissance réseau avec Zenmap",
    tags: ["Reconnaissance réseau", "Scan de ports"],
    resume:
      "Cartographie d'une machine Ubuntu virtualisée avec Zenmap : découverte de l'hôte, identification des services exposés, détection des versions et formulation de pistes de durcissement.",
    objectif:
      "Identifier les services actifs sur une machine cible au moyen d'un scan de ports et de versions, évaluer leur niveau d'exposition, puis formuler des recommandations de sécurisation adaptées.",
    demarche: [
      "Configuration du réseau de la machine virtuelle : première tentative en mode « Accès par pont », puis bascule vers un réseau privé hôte (Host-only Adapter) après diagnostic d'un blocage lié à l'isolation du point d'accès Wi-Fi utilisé.",
      "Vérification de la connectivité entre la machine hôte et la machine virtuelle avec ping.",
      "Scan de découverte de l'hôte, puis scan intense avec détection de version et de système d'exploitation (profil « Intense scan » de Zenmap).",
      "Analyse des résultats et rédaction de recommandations de durcissement."
    ],
    recommandations: [
      "Remplacer la page par défaut d'Apache par un contenu propre à l'usage prévu.",
      "Désactiver la méthode HTTP OPTIONS si elle n'est pas requise par l'application.",
      "Restreindre l'accès SSH par adresse IP ou par clé plutôt que par mot de passe.",
      "Maintenir les paquets à jour (apt update && apt upgrade).",
      "Fermer ou désinstaller les services non essentiels."
    ],
    environnement: [
      { intitule: "Hôte", valeur: "Windows 11" },
      { intitule: "Cible", valeur: "Ubuntu (VirtualBox)" },
      { intitule: "Réseau", valeur: "Privé hôte — 192.168.56.101" },
      { intitule: "Services", valeur: "OpenSSH (22), Apache2 (80)" }
    ],
    outils: ["Zenmap 7.99", "Nmap", "VirtualBox", "Ubuntu", "Windows 11"],
    observations: [
      "Hôte détecté actif : 192.168.56.101, MAC 08:00:27:A8:FD:88 (Oracle VirtualBox virtual NIC), latence 0,00099 s.",
      "Port 22/tcp ouvert : OpenSSH 10.2p1 Ubuntu 2ubuntu3.5.",
      "Port 80/tcp ouvert : Apache httpd 2.4.66 (Ubuntu), page par défaut « It works ».",
      "Scripts NSE : méthodes HTTP GET, POST, OPTIONS et HEAD ; en-tête serveur Apache/2.4.66.",
      "Aucune vulnérabilité critique évidente à ce stade ; la page par défaut reste une fuite d'information mineure."
    ],
    enseignement:
      "Ce projet a permis de mener une démarche complète de reconnaissance réseau, de la configuration du laboratoire à l'interprétation des résultats. Il a aussi demandé un vrai travail de diagnostic : comprendre pourquoi l'hôte restait vu comme « down » en mode pont, puis résoudre le problème en passant sur un réseau privé hôte. C'est également l'occasion d'apprendre à restituer des résultats techniques dans un rapport structuré.",
    rapport: {
      fichier: "assets/rapports/Rapport_Audit_Reseau.pdf",
      pages: 4,
      poids: "402 Ko"
    }
  },

  /* ----------------------------------------------------------------------
     PROJET 2 — Rapport : assets/rapports/rapport_gestion_acces_mfa.pdf
     ---------------------------------------------------------------------- */
  {
    id: "gestion-acces-mfa",
    numero: "Projet 02",
    titre: "Gestion des accès et politique de mots de passe (SSH + MFA)",
    tags: ["Durcissement système", "Authentification"],
    resume:
      "Mise en place d'une politique de gestion des accès sur un serveur Ubuntu : mots de passe robustes, moindre privilège, durcissement de SSH, authentification à deux facteurs (TOTP), protection contre la force brute et journalisation.",
    objectif:
      "Faire en sorte que la compromission d'un seul facteur — le mot de passe — ne suffise pas à obtenir un accès au serveur, en combinant plusieurs couches de protection successives et en vérifiant chacune d'elles par des tests documentés.",
    mesures: [
      "Comptes : trois comptes créés et vérifiés via /etc/passwd — akiram (administrateur), alice et bob (utilisateurs standards).",
      "Mots de passe : module PAM pam_pwquality avec 12 caractères minimum, au moins une majuscule, une minuscule, un chiffre et un caractère spécial ; réutilisation des anciens mots de passe empêchée ; expiration à 90 jours (PASS_MAX_DAYS) et délai minimal d'un jour entre deux changements (PASS_MIN_DAYS).",
      "Privilèges : seul le compte administrateur appartient au groupe sudo ; alice et bob n'ont aucun droit d'administration (contrôlé avec sudo -l -U et getent group sudo).",
      "SSH : fichier sshd_config sauvegardé puis durci — PermitRootLogin no, restriction des comptes autorisés (AllowUsers), UsePAM yes, PasswordAuthentication no et AuthenticationMethods keyboard-interactive.",
      "MFA : module pam_google_authenticator basé sur le standard TOTP, avec enrôlement par QR code et génération de codes de secours.",
      "Force brute : Fail2ban activé pour le service sshd (maxretry = 3, bantime = 600 s, findtime = 120 s).",
      "Journalisation : suivi des connexions et des bannissements via journalctl -u ssh et /var/log/fail2ban.log."
    ],
    environnement: [
      { intitule: "Serveur", valeur: "Ubuntu Server 26.04 LTS — 192.168.56.10" },
      { intitule: "Client", valeur: "Windows 11 (hôte) — 192.168.56.1" },
      { intitule: "Réseau", valeur: "Host-Only 192.168.56.0/24 + NAT" },
      { intitule: "Comptes", valeur: "akiram (admin), alice, bob" },
      { intitule: "Accès", valeur: "SSH (port 22)" }
    ],
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
    tests: [
      { scenario: "Mauvais mot de passe + bon code MFA", resultat: "Refusé" },
      { scenario: "Bon mot de passe + mauvais code MFA", resultat: "Refusé" },
      { scenario: "Bon mot de passe + aucun code MFA", resultat: "Refusé" },
      { scenario: "Bon mot de passe + bon code MFA", resultat: "Accepté" }
    ],
    reserve:
      "Ces tests ont été réalisés dans un laboratoire isolé, avec des comptes de test (alice, bob). Ils démontrent le comportement des mesures configurées dans cet environnement ; ils ne constituent pas un audit de production.",
    observations: [
      "Les quatre scénarios de la matrice ont produit le résultat attendu.",
      "La connexion directe en root a été refusée ; une connexion avec alice a abouti après validation des deux facteurs.",
      "Fail2ban a banni l'adresse IP du client (192.168.56.1) après plusieurs échecs successifs.",
      "Les journaux ont confirmé les connexions acceptées via pam_google_authenticator / keyboard-interactive ainsi que les échecs d'authentification."
    ],
    enseignement:
      "Au-delà des configurations, l'essentiel du travail a consisté à résoudre des incidents successifs : erreurs de démarrage de la machine virtuelle, indentation du fichier netplan, résolution DNS, module PAM absent, dossier /run/sshd manquant ou encore directive UsePAM oubliée. Ces dépannages ont permis de mieux comprendre le fonctionnement de SSH, de PAM et de l'environnement de virtualisation.",
    rapport: {
      fichier: "assets/rapports/rapport_gestion_acces_mfa.pdf",
      pages: 15,
      poids: "529 Ko"
    }
  }

  /* ----------------------------------------------------------------------
     AJOUTER UN NOUVEAU PROJET ICI (ne pas oublier la virgule après l'accolade
     du projet précédent), par exemple :

     ,{
       id: "mon-nouveau-projet",
       numero: "Projet 03",
       titre: "Titre exact du projet",
       tags: ["Étiquette"],
       resume: "Présentation courte et fidèle au rapport.",
       objectif: "Objectif du projet.",
       demarche: ["Étape 1", "Étape 2"],
       environnement: [{ intitule: "Cible", valeur: "..." }],
       outils: ["Outil 1", "Outil 2"],
       observations: ["Constat documenté"],
       enseignement: "Ce que le projet a apporté.",
       rapport: { fichier: "assets/rapports/mon-rapport.pdf", pages: 10, poids: "800 Ko" }
     }
     ---------------------------------------------------------------------- */
];
