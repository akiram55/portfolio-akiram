# Portfolio — LAWANI AKIRAM

Portfolio personnel en cybersécurité, réalisé en **HTML5, CSS3 et JavaScript natif**.
Aucun serveur, aucune base de données, aucune bibliothèque externe, aucun service payant :
le site se déploie gratuitement sur **Cloudflare Pages** (et fonctionne aussi sur GitHub Pages).

- **Auteur** : LAWANI AKIRAM — étudiant en Licence 3 (L3) en sécurité des systèmes informatiques
- **Contenu** : présentation, deux projets documentés, contact
- **Langue** : français
- **Thème** : « blanc premium » (fond blanc, accent bleu royal `#2457D6`), aucun thème sombre

---

## Sommaire

1. [Ce que contient le projet](#1-ce-que-contient-le-projet)
2. [Tester le site sur votre ordinateur (Kali Linux)](#2-tester-le-site-sur-votre-ordinateur-kali-linux)
3. [Déployer sur Cloudflare Pages](#3-déployer-sur-cloudflare-pages)
4. [Mettre à jour le site après publication](#4-mettre-à-jour-le-site-après-publication)
5. [Ajouter un nouveau projet](#5-ajouter-un-nouveau-projet)
6. [Personnaliser le site](#6-personnaliser-le-site)
7. [Vérifications effectuées](#7-vérifications-effectuées)
8. [Dépannage](#8-dépannage)
9. [Crédits et licences](#9-crédits-et-licences)

---

## 1. Ce que contient le projet

```
portfolio-lawani-akiram/
├── index.html                      ← la page du site (sections Accueil, À propos, Projets, Contact)
├── README.md                       ← ce fichier
├── .nojekyll                       ← fichier vide, sans effet sur Cloudflare Pages (utile à GitHub Pages)
├── _headers                        ← en-têtes HTTP lus par Cloudflare Pages
├── _redirects                      ← fichier facultatif lu par Cloudflare Pages
└── assets/
    ├── css/
    │   └── style.css               ← tout le design (couleurs, mise en page, responsive)
    ├── js/
    │   ├── projects-data.js        ← LES DONNÉES DES PROJETS (fichier à modifier)
    │   └── main.js                 ← le comportement du site (menu, cartes, animations)
    ├── fonts/
    │   ├── manrope-latin.woff2
    │   ├── inter-latin.woff2
    │   ├── jetbrains-mono-latin.woff2
    │   └── LICENCE-POLICES.txt
    ├── images/
    │   ├── photo-profil.jpg        ← votre portrait (accueil)
    │   ├── photo-profil-carre.jpg  ← le même portrait en carré (usage facultatif)
    │   └── favicon.svg             ← icône de l'onglet du navigateur
    └── rapports/
        ├── Rapport_Audit_Reseau.pdf              ← rapport du projet 1 (public)
        └── rapport_gestion_acces_mfa.pdf         ← rapport du projet 2 (public)
```

### Où se trouve quoi ?

| Je veux modifier… | Fichier à ouvrir |
|---|---|
| Le texte de l'accueil, de « À propos », du contact, du pied de page | `index.html` |
| Les projets (titres, objectifs, outils, PDF associés) | `assets/js/projects-data.js` |
| Les couleurs, les espacements, les polices | `assets/css/style.css` (variables en haut du fichier) |
| Les rapports PDF | dossier `assets/rapports/` |
| La photo de profil | `assets/images/photo-profil.jpg` |

> **Important** : ne renommez pas les dossiers `assets/css`, `assets/js`, `assets/images`
> et `assets/rapports` sans mettre à jour les chemins correspondants. Les chemins sont
> **relatifs** (`assets/...`), ce qui permet au site de fonctionner à la racine d'un domaine
> comme dans un sous-dossier.

### Principes éditoriaux du site

- **Aucune date** n'est affichée sur les cartes de projets ni dans le pied de page.
  Les projets sont présentés par leur titre, leur objectif, leur description et leurs outils.
- **Aucune capture d'écran n'est extraite des rapports.** Les images contenues dans les PDF ne
  sont jamais reprises séparément sur le portfolio. Les rapports étant publics, leurs lecteurs
  voient ces images en ouvrant les documents, ce qui est le comportement voulu.
- **Aucune section « Compétences », « Certifications » ou « CV »**, aucun témoignage,
  aucune statistique, aucune expérience professionnelle inventée.

### Technologies utilisées

- **HTML5 sémantique** (`header`, `nav`, `main`, `section`, `article`, `footer`), un seul `h1`.
- **CSS3** : variables, `grid`, `flexbox`, `clamp()`, points de rupture à 1040 px, 880 px,
  720 px et 420 px.
- **JavaScript natif, sans aucune bibliothèque** : génération des cartes, menu mobile accessible,
  apparition progressive des sections, lien actif dans la navigation, copie de l'adresse e-mail.
- **Polices auto-hébergées** (Manrope, Inter, JetBrains Mono) : aucun appel à Google Fonts.
- **Aucun cookie, aucun traceur, aucun formulaire, aucune clé d'API, aucun secret.**

---

## 2. Tester le site sur votre ordinateur (Kali Linux)

### 2.1 Ouvrir le dossier

Décompressez le fichier ZIP, puis placez-vous dans le dossier du site :

```bash
cd ~/Téléchargements/portfolio-lawani-akiram
ls
```

Vous devez voir `index.html`, `README.md`, `_headers` et le dossier `assets`.

### 2.2 Lancer un petit serveur local

```bash
python3 -m http.server 8000
```

Puis ouvrez votre navigateur à l'adresse :

```
http://localhost:8000
```

Pour arrêter le serveur : `Ctrl + C` dans le terminal.

### 2.3 Vérifier les points importants

1. Les quatre liens du menu (Accueil, À propos, Projets, Contact).
2. Les boutons **« Découvrir mes projets »** et **« Me contacter »**.
3. **« Lire le rapport »** : le PDF doit s'ouvrir dans un **nouvel onglet**.
4. **« Télécharger le rapport »** : le fichier doit être **téléchargé**.
5. Le lien e-mail (ouvre le logiciel de messagerie) et le lien GitHub.
6. La photo de profil et sa légende.
7. Réduisez la largeur de la fenêtre pour vérifier l'affichage mobile et le menu hamburger.

### 2.4 Pourquoi ne pas double-cliquer sur `index.html` ?

Ouvrir le fichier directement (`file://`) fonctionne souvent, mais certains navigateurs bloquent
alors le chargement des polices ou l'ouverture des PDF. Le petit serveur de l'étape 2.2 évite
ces problèmes et reproduit les conditions réelles.

---

## 3. Déployer sur Cloudflare Pages

Le site est 100 % statique : **aucune commande de build n'est nécessaire**. Cloudflare Pages
est gratuit (offre « Free »), sans carte bancaire pour un projet de ce type.

> **À savoir** : Cloudflare Pages attribue une adresse technique du type
> `https://portfolio-lawani-akiram.pages.dev`. Cloudflare propose aussi d'associer un nom de
> domaine si vous en possédez un — ce n'est **pas** obligatoire pour que le site fonctionne.

### 3.1 Créer un compte Cloudflare

1. Allez sur <https://dash.cloudflare.com/sign-up>.
2. Créez un compte gratuit (adresse e-mail + mot de passe).
3. Confirmez l'adresse e-mail reçue.

### 3.2 Méthode A — Envoi direct du dossier (la plus simple, sans Git)

1. Dans le tableau de bord, cliquez sur **« Workers & Pages »** dans le menu de gauche.
2. Cliquez sur **« Create »**, puis sur l'onglet **« Pages »**, puis **« Upload assets »**
   (ou **« Direct Upload »** selon la version de l'interface).
3. Donnez un nom au projet, par exemple `portfolio-lawani-akiram`.
4. **Glissez-déposez le contenu du dossier** `portfolio-lawani-akiram` — c'est-à-dire
   `index.html`, `README.md`, `_headers`, `_redirects` et le dossier `assets`.
   Ne déposez pas le dossier parent, mais bien **son contenu**.
5. Cliquez sur **« Deploy site »**.
6. Au bout de quelques secondes, l'adresse `https://<nom-du-projet>.pages.dev` s'affiche.

### 3.3 Méthode B — Depuis un dépôt GitHub (mises à jour automatiques)

1. Créez un dépôt **public** sur GitHub (bouton **« + » → « New repository »**).
2. Envoyez les fichiers depuis le dossier du site :

```bash
git init
git add .
git commit -m "Création du portfolio cybersécurité"
git branch -M main
git remote add origin https://github.com/akiram55/portfolio-cybersecurite.git
git push -u origin main
```

3. Dans Cloudflare : **Workers & Pages → Create → Pages → Connect to Git**.
4. Autorisez Cloudflare à accéder à votre compte GitHub, puis sélectionnez le dépôt.
5. Renseignez la configuration de build :
   - **Framework preset** : `None`
   - **Build command** : *(laisser vide)*
   - **Build output directory** : `/` *(ou laisser vide)*
6. Cliquez sur **« Save and Deploy »**.

Chaque `git push` sur `main` republiera automatiquement le site.

### 3.4 Les fichiers `_headers` et `_redirects`

- **`_headers`** : applique de bons réglages HTTP sur Cloudflare Pages
  (`Content-Type: application/pdf` pour les rapports, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, mise en cache des polices et des images).
  Il **n'influence pas** les performances du site ; il sert surtout à garantir que les PDF
  s'affichent correctement dans le navigateur.
- **`_redirects`** : permet d'ajouter des redirections. Il est vide de contenu utile ici ;
  vous pouvez le supprimer si vous le souhaitez.

Ces deux fichiers sont **ignorés par GitHub Pages** (ils n'y causent aucune erreur), mais ils
sont lus par Cloudflare Pages.

### 3.5 Vérifier après le déploiement

1. Ouvrez l'adresse `https://<nom-du-projet>.pages.dev`.
2. Cliquez sur **« Lire le rapport »** de chaque projet : le PDF doit s'ouvrir dans un nouvel onglet.
3. Cliquez sur **« Télécharger le rapport »** : le fichier doit être téléchargé.
4. Testez depuis un téléphone.

**Attention** : les noms de fichiers sont sensibles à la casse. Le fichier doit s'appeler
exactement `Rapport_Audit_Reseau.pdf` (avec les majuscules) et `rapport_gestion_acces_mfa.pdf`.
Si vous renommez un fichier, mettez à jour le chemin dans `assets/js/projects-data.js`.

### 3.6 Le fichier `.nojekyll`

Fichier vide, hérité de GitHub Pages : il empêche le générateur Jekyll d'interpréter les
dossiers commençant par un souligné. Il n'a **aucun effet sur Cloudflare Pages** mais ne gêne
pas. Conservez-le si vous publiez aussi sur GitHub Pages, sinon vous pouvez le supprimer.

---

## 4. Mettre à jour le site après publication

### Avec la méthode B (GitHub connecté)

```bash
cd ~/portfolio-lawani-akiram
git add .
git commit -m "Mise à jour du contenu"
git push
```

Cloudflare reconstruit le site automatiquement en une à deux minutes.

### Avec la méthode A (envoi direct)

1. Retournez dans **Workers & Pages**, ouvrez votre projet.
2. Cliquez sur **« Create new deployment »** (ou **« Upload assets »**).
3. Déposez à nouveau le contenu mis à jour du dossier.
4. Validez.

### Si vous ne voyez pas la modification

Videz le cache du navigateur : `Ctrl + Maj + R` (Firefox / Chrome).

---

## 5. Ajouter un nouveau projet

Tout se passe dans le fichier **`assets/js/projects-data.js`**.
Les cartes sont générées automatiquement : **aucun autre fichier n'est à modifier**.

### Étape 1 — Déposer le rapport PDF

Copiez votre PDF dans `assets/rapports/`.
Conseil : un nom simple, sans espace ni accent, par exemple `rapport_analyse_web.pdf`.

### Étape 2 — Ajouter le bloc du projet

Ouvrez `assets/js/projects-data.js`. À la fin du tableau, **après le dernier projet**,
ajoutez une virgule puis un nouveau bloc :

```js
  ,{
    id: "analyse-web-burp",
    numero: "Projet 03",
    titre: "Titre exact du projet",
    tags: ["Tests d'intrusion web"],
    resume: "Présentation courte et fidèle au rapport.",
    objectif: "Objectif du projet.",
    demarche: [
      "Première étape réellement suivie.",
      "Deuxième étape réellement suivie."
    ],
    environnement: [
      { intitule: "Cible", valeur: "Application de test locale" }
    ],
    outils: ["Burp Suite", "Navigateur"],
    observations: [
      "Constat réellement documenté dans le rapport."
    ],
    enseignement: "Ce que le projet a apporté.",
    rapport: {
      fichier: "assets/rapports/rapport_analyse_web.pdf",
      pages: 8,
      poids: "700 Ko"
    }
  }
```

### Étape 3 — Recharger la page

La nouvelle carte apparaît avec ses deux boutons
(« Lire le rapport » et « Télécharger le rapport ») et le rappel de la taille du PDF.

### Champs disponibles

| Champ | Obligatoire | Rôle |
|---|---|---|
| `id` | oui | identifiant unique, sans espace ni accent (sert d'ancre `#projet-mon-id`) |
| `numero` | non | libellé affiché en haut de carte, ex. `"Projet 03"` |
| `titre` | oui | titre exact du projet |
| `tags` | non | une ou deux étiquettes courtes |
| `resume` | non | présentation en une ou deux phrases |
| `objectif` | non | but du projet |
| `demarche` | non | liste des étapes suivies |
| `mesures` | non | liste des mesures configurées (projet de durcissement) |
| `recommandations` | non | liste de recommandations |
| `environnement` | non | liste de `{ intitule, valeur }` |
| `outils` | non | liste de noms d'outils réellement utilisés |
| `observations` | non | liste de constats réellement documentés |
| `tests` | non | liste de `{ scenario, resultat }` (affichée sous forme de tableau) |
| `reserve` | non | mise en garde honnête sur le périmètre des tests |
| `enseignement` | non | ce que le projet a apporté |
| `rapport` | oui | `{ fichier, pages, poids }` — sans lui, aucun bouton PDF n'est affiché |

> Il n'existe **volontairement aucun champ image ni aucun champ date** : les cartes n'affichent
> ni capture d'écran extraite des rapports, ni date de réalisation.

### Règles à conserver

- **N'écrivez que ce qui figure dans le rapport.** Pas d'adresse IP, de vulnérabilité ou de
  résultat inventé.
- Une **virgule** sépare chaque bloc `{ ... }` du suivant.
- Les guillemets doivent être des guillemets droits `"` (pas `“ ”`).
- Chaque ouverture `{` doit avoir sa fermeture `}`.
- Les chemins commencent toujours par `assets/` (jamais par `/assets/`).

---

## 6. Personnaliser le site

### Couleurs

En haut de `assets/css/style.css`, dans `:root` :

```css
--white: #ffffff;      /* fond principal          */
--surface: #f7f8fa;    /* fond secondaire         */
--ink: #20242c;        /* texte principal         */
--accent: #2457d6;     /* bleu royal (boutons)    */
--line: #e6e8ec;       /* bordures                */
```

### Textes

Tous les textes des sections (accueil, à propos, contact, pied de page) sont dans `index.html`.
Les textes des projets sont dans `assets/js/projects-data.js`.

### Photo de profil

Remplacez `assets/images/photo-profil.jpg` par une autre image **en conservant le même nom**.
Le cadrage est automatique : l'image est recadrée en 4/3 et la partie haute (le visage) est
privilégiée. Pour un cadrage différent, modifiez `object-position` dans la règle
`.profile-card__portrait img` de `assets/css/style.css`.

Une variante carrée existe également : `assets/images/photo-profil-carre.jpg`. Elle n'est pas
utilisée par la page actuelle ; elle peut servir pour un avatar ou une image de partage.

---

## 7. Vérifications effectuées

Voici ce qui a été réellement testé, et ce qui ne peut pas l'être dans cet environnement.

### Vérifié automatiquement (navigateur Chromium, serveur local)

- [x] Les deux cartes portent exactement les titres demandés :
      « Reconnaissance réseau avec Zenmap » et
      « Gestion des accès et politique de mots de passe (SSH + MFA) ».
- [x] Chaque carte pointe vers **son** rapport :
      `assets/rapports/Rapport_Audit_Reseau.pdf` et
      `assets/rapports/rapport_gestion_acces_mfa.pdf`.
- [x] Les deux PDF répondent en **HTTP 200**, type `application/pdf`
      (402 Ko / 4 pages et 529 Ko / 15 pages).
- [x] « Lire le rapport » : `target="_blank"` + `rel="noopener noreferrer"`.
- [x] « Télécharger le rapport » : attribut `download` avec le bon nom de fichier.
      Téléchargement réel testé : fichier récupéré de 411 553 octets, identique à l'original.
- [x] Test dans un **sous-dossier** (pour simuler une URL de type
      `https://…/portfolio-lawani-akiram/`) : cartes, polices et liens PDF fonctionnent
      avec les chemins relatifs.
- [x] Lien e-mail : `mailto:lawaniakiram@gmail.com` — lien GitHub : `https://github.com/akiram55`,
      nouvel onglet, `rel="noopener noreferrer"`.
- [x] Toutes les ancres internes existent (`#accueil`, `#a-propos`, `#projets`, `#contact`).
- [x] **Aucune erreur console**, aucune réponse ≥ 400, aucune requête externe.
- [x] Toutes les images sont chargées et possèdent un texte alternatif.
- [x] **Aucune capture d'écran extraite des rapports** n'est affichée : les cartes ne
      contiennent aucune image (vérifié : `0` élément de type capture).
- [x] **Aucune date** dans les cartes ni dans le pied de page (vérifié : plus d'élément
      d'année, pied de page « © LAWANI AKIRAM — Tous droits réservés. »).
- [x] Mise en page vérifiée à 1440 px (ordinateur), 834 px (tablette) et 390 px (téléphone) :
      aucun défilement horizontal.
- [x] Menu mobile : ouverture, fermeture au clic sur un lien, `aria-expanded` mis à jour.
- [x] Navigation clavier : lien d'évitement en premier, contour de focus visible.
- [x] Contrastes (WCAG) : texte principal 7,84:1 ; texte secondaire 4,55:1 à 4,83:1 ;
      bouton bleu 6,16:1 — tous ≥ 4,5:1.
- [x] Sans JavaScript, la page reste lisible et propose les liens directs vers les deux PDF.
- [x] Structure HTML valide (aucune balise non fermée), syntaxe JavaScript valide
      (`node --check` sur `main.js` et `projects-data.js`).

### Vérifié manuellement (lecture des deux rapports)

- [x] `Rapport_Audit_Reseau.pdf` : périmètre (une VM Ubuntu sous VirtualBox), commande
      `nmap -T4 -A -v 192.168.56.101`, ports 22 et 80, versions OpenSSH 10.2p1 et
      Apache 2.4.66, méthodes HTTP, adresse MAC, recommandations.
- [x] `rapport_gestion_acces_mfa.pdf` : comptes `akiram` / `alice` / `bob`, politique
      `pam_pwquality`, privilèges sudo, directives `sshd_config`, MFA TOTP
      (`pam_google_authenticator`), Fail2ban, journalisation, matrice des quatre tests,
      difficultés rencontrées.
- [x] Les formulations prudentes du rapport 2 sont reprises : les tests sont présentés comme
      des essais en laboratoire, pas comme une validation en production.

### Non vérifiable dans cet environnement

- [ ] **Déploiement réel sur Cloudflare Pages** : impossible à tester ici. Les chemins sont
      relatifs et compatibles avec une URL de projet (sous-dossier), mais la création du compte
      et le clic sur « Deploy » restent à faire (voir § 3).
- [ ] **Effet réel des fichiers `_headers` et `_redirects`** : ils ne sont interprétés que par
      Cloudflare Pages, pas par un serveur Python local.
- [ ] **Comportement du téléchargement selon le navigateur** : sur certains navigateurs mobiles
      (iOS notamment), l'attribut `download` est ignoré et le PDF s'ouvre dans un onglet.
      Le fichier reste accessible.
- [ ] **Rendu sur des navigateurs très anciens** (Internet Explorer) : non pris en charge.
- [ ] **Ouverture réelle du lien `mailto:`** : dépend du logiciel de messagerie du visiteur.

---

## 8. Dépannage

| Problème | Cause probable | Solution |
|---|---|---|
| Les cartes de projets ne s'affichent pas | erreur de syntaxe dans `projects-data.js` | ouvrez la console (`F12`), corrigez la virgule ou l'accolade signalée |
| Le PDF renvoie une erreur 404 après déploiement | nom de fichier ou chemin différents | vérifiez la casse exacte du nom dans `assets/rapports/` et dans `projects-data.js` |
| La photo ne s'affiche pas | fichier renommé ou déplacé | remettez `photo-profil.jpg` dans `assets/images/` |
| Les accents s'affichent mal | fichier enregistré dans un autre encodage | enregistrez en **UTF-8** |
| Les polices ne ressemblent à rien | dossier `assets/fonts` déplacé | remettez les trois `.woff2` dans `assets/fonts/` |
| Le site affiche l'ancienne version | cache du navigateur ou délai Cloudflare | `Ctrl + Maj + R`, puis attendez 2 minutes |
| Le menu mobile ne s'ouvre pas | JavaScript bloqué | vérifiez que `assets/js/main.js` est présent et que JavaScript est activé |

---

## 9. Crédits et licences

- **Code du site** : écrit pour ce projet, librement modifiable par LAWANI AKIRAM.
- **Rapports PDF** : documents personnels de l'auteur, publiés dans `assets/rapports/`.
- **Photo de profil** : fournie par LAWANI AKIRAM, publiée dans `assets/images/`.
- **Polices** : Manrope, Inter et JetBrains Mono, sous **SIL Open Font License 1.1**
  (voir `assets/fonts/LICENCE-POLICES.txt`). Auto-hébergées : aucune requête vers Google.
- **Icônes** : SVG écrits à la main dans le projet, sans bibliothèque externe.
