
/* ==========================================================================
   Portfolio LAWANI AKIRAM — comportements du site
   JavaScript natif, sans dépendance externe.
   ========================================================================== */

(function () {
  "use strict";

  /* 1. Icônes SVG */
  var ICONS = {
    external:
      '<svg class="icon-out" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    download:
      '<svg class="icon-anim" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 11l5 5 5-5M5 21h14"/></svg>',
    info:
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    cap:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="M6 10v5.5c0 1.2 2.7 2.8 6 2.8s6-1.6 6-2.8V10"/><path d="M22 8v6"/></svg>'
  };

  /* 2. Protection des textes insérés dans le HTML */
  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function listItems(items, accent) {
    if (!Array.isArray(items) || items.length === 0) return "";

    return (
      '<ul class="list' + (accent ? " list--accent" : "") + '">' +
      items.map(function (item) {
        return "<li>" + esc(item) + "</li>";
      }).join("") +
      "</ul>"
    );
  }

  /* 3. Génération des cartes de projets */
  function renderCard(projet) {
    var id = esc(projet.id);
    var pdf =
      projet.rapport && projet.rapport.fichier
        ? projet.rapport.fichier
        : "";

    var pdfName = pdf ? pdf.split("/").pop() : "";
    var lienProjet = projet.lienProjet || "";

    var pages =
      projet.rapport && projet.rapport.pages
        ? projet.rapport.pages + " pages"
        : "PDF";

    var poids =
      projet.rapport && projet.rapport.poids
        ? " · " + projet.rapport.poids
        : "";

    /* En-tête et étiquettes */
    var tags = (projet.tags || [])
      .map(function (tag) {
        return '<span class="project__tag">' + esc(tag) + "</span>";
      })
      .join("");

    var head =
      '<div class="project__head">' +
        '<span class="project__index">' +
          esc(projet.numero || "") +
        "</span>" +
        (tags
          ? '<span class="project__tags">' + tags + "</span>"
          : "") +
      "</div>";

    /* Colonne principale */
    var main = "";

    if (projet.objectif) {
      main +=
        '<div class="block">' +
          '<h4 class="block__title">Objectif</h4>' +
          "<p>" + esc(projet.objectif) + "</p>" +
        "</div>";
    }

    if (Array.isArray(projet.demarche) && projet.demarche.length) {
      main +=
        '<div class="block">' +
          '<h4 class="block__title">Démarche suivie</h4>' +
          listItems(projet.demarche, true) +
        "</div>";
    }

    if (Array.isArray(projet.mesures) && projet.mesures.length) {
      main +=
        '<div class="block">' +
          '<h4 class="block__title">Mesures configurées</h4>' +
          listItems(projet.mesures, true) +
        "</div>";
    }

    if (
      Array.isArray(projet.recommandations) &&
      projet.recommandations.length
    ) {
      main +=
        '<div class="block">' +
          '<h4 class="block__title">Pistes de durcissement proposées</h4>' +
          listItems(projet.recommandations, false) +
        "</div>";
    }

    if (projet.reserve) {
      main +=
        '<div class="block">' +
          '<h4 class="block__title">Périmètre des tests</h4>' +
          '<p class="note-inline note-inline--block">' +
            ICONS.info +
            "<span>" + esc(projet.reserve) + "</span>" +
          "</p>" +
        "</div>";
    }

    /* Fiches techniques */
    var specs = [];

    if (
      Array.isArray(projet.environnement) &&
      projet.environnement.length
    ) {
      specs.push(
        '<div class="spec">' +
          '<h4 class="block__title">Environnement</h4>' +
          '<dl class="env">' +
            projet.environnement.map(function (row) {
              return (
                '<div class="env__row">' +
                  "<dt>" + esc(row.intitule) + "</dt>" +
                  "<dd>" + esc(row.valeur) + "</dd>" +
                "</div>"
              );
            }).join("") +
          "</dl>" +
        "</div>"
      );
    }

    if (Array.isArray(projet.outils) && projet.outils.length) {
      specs.push(
        '<div class="spec">' +
          '<h4 class="block__title">Outils identifiés</h4>' +
          '<div class="chips">' +
            projet.outils.map(function (outil) {
              return '<span class="chip">' + esc(outil) + "</span>";
            }).join("") +
          "</div>" +
        "</div>"
      );
    }

    if (Array.isArray(projet.tests) && projet.tests.length) {
      var rows = projet.tests.map(function (test) {
        var accepted =
          String(test.resultat).toLowerCase().indexOf("accept") === 0;

        return (
          "<tr>" +
            "<td>" + esc(test.scenario) + "</td>" +
            '<td class="' + (accepted ? "is-ok" : "") + '">' +
              esc(test.resultat) +
            "</td>" +
          "</tr>"
        );
      }).join("");

      specs.push(
        '<div class="spec spec--wide">' +
          '<h4 class="block__title">Tests effectués</h4>' +
          '<div class="table-wrap">' +
            '<table class="matrix">' +
              "<caption>Résultats des tests d'authentification réalisés dans le laboratoire</caption>" +
              '<thead><tr>' +
                '<th scope="col">Scénario</th>' +
                '<th scope="col">Résultat</th>' +
              "</tr></thead>" +
              "<tbody>" + rows + "</tbody>" +
            "</table>" +
          "</div>" +
        "</div>"
      );
    }

    if (
      Array.isArray(projet.observations) &&
      projet.observations.length
    ) {
      specs.push(
        '<div class="spec spec--wide">' +
          '<h4 class="block__title">Observations et résultats</h4>' +
          listItems(projet.observations, false) +
        "</div>"
      );
    }

    /* Enseignements */
    var takeaway = projet.enseignement
      ? '<div class="takeaway">' +
          '<span class="takeaway__icon">' + ICONS.cap + "</span>" +
          "<div>" +
            '<p class="takeaway__label">Enseignements</p>' +
            "<p>" + esc(projet.enseignement) + "</p>" +
          "</div>" +
        "</div>"
      : "";

    /* Boutons : chaque bouton apparaît selon les liens disponibles */
    var actions = "";

    if (pdf || lienProjet) {
      actions = '<div class="project__actions">';

      /* Le bouton Voir le projet apparaît seulement si lienProjet existe */
      if (lienProjet) {
        actions +=
          '<a class="btn btn--primary" href="' + esc(lienProjet) + '"' +
            ' target="_blank" rel="noopener noreferrer"' +
            ' aria-label="Voir le projet ' + esc(projet.titre) +
            ' (nouvel onglet)">' +
            "Voir le projet " + ICONS.external +
          "</a>";
      }

      /* Boutons du rapport PDF */
      if (pdf) {
        actions +=
          '<a class="btn btn--secondary" href="' + esc(pdf) + '"' +
            ' target="_blank" rel="noopener noreferrer"' +
            ' aria-label="Lire le rapport du projet ' + esc(projet.titre) +
            ' (PDF, nouvel onglet)">' +
            "Lire le rapport " + ICONS.external +
          "</a>" +

          '<a class="btn btn--secondary" href="' + esc(pdf) + '"' +
            ' download="' + esc(pdfName) + '"' +
            ' aria-label="Télécharger le rapport du projet ' +
            esc(projet.titre) + ' (PDF)">' +
            "Télécharger le rapport " + ICONS.download +
          "</a>" +

          '<span class="project__meta">PDF' +
            (
              projet.rapport && projet.rapport.pages
                ? " · " + esc(projet.rapport.pages) + " pages"
                : ""
            ) +
            (
              projet.rapport && projet.rapport.poids
                ? " · " + esc(projet.rapport.poids)
                : ""
            ) +
          "</span>";
      }

      actions += "</div>";
    }

    /* Assemblage de la carte */
    return (
      '<article class="project reveal" id="projet-' + id +
        '" aria-labelledby="titre-' + id + '">' +
        head +
        '<h3 class="project__title" id="titre-' + id + '">' +
          esc(projet.titre) +
        "</h3>" +
        (
          projet.resume
            ? '<p class="project__lead">' + esc(projet.resume) + "</p>"
            : ""
        ) +
        (main ? '<div class="project__main">' + main + "</div>" : "") +
        (
          specs.length
            ? '<div class="project__specs" role="group" aria-label="Fiche technique du projet">' +
                specs.join("") +
              "</div>"
            : ""
        ) +
        takeaway +
        actions +
      "</article>"
    );
  }

  function renderProjects() {
    var container = document.getElementById("projects-list");
    if (!container) return;

    if (!Array.isArray(window.PROJETS) || window.PROJETS.length === 0) {
      container.innerHTML =
        '<p class="section__lead">Les fiches projets seront publiées prochainement.</p>';
      return;
    }

    container.innerHTML = window.PROJETS.map(renderCard).join("");
  }

  /* 4. Apparition progressive au défilement */
  function initReveal() {
    var elements = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  /* 5. Ombre de l'en-tête */
  function initHeaderShadow() {
    var header = document.getElementById("site-header");
    if (!header) return;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 6);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* 6. Lien actif dans la navigation */
  function initActiveLink() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll(".nav-menu a")
    );
    var sections = Array.prototype.slice.call(
      document.querySelectorAll("main section[id]")
    );

    if (
      !links.length ||
      !sections.length ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    function setActive(id) {
      links.forEach(function (link) {
        var isActive = link.getAttribute("href") === "#" + id;

        link.classList.toggle("is-active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* 7. Menu mobile */
  function initMobileMenu() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");

    if (!toggle || !menu) return;

    function setMenu(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        open ? "Fermer le menu" : "Ouvrir le menu"
      );
      menu.classList.toggle("is-open", open);
    }

    function closeMenu() {
      if (toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
      }
    }

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!menu.classList.contains("is-open")) return;
      if (event.target.closest(".nav") === null) closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) closeMenu();
    });
  }

  /* 8. Copie de l'adresse e-mail */
  function initCopyEmail() {
    var button = document.getElementById("copy-email");
    var status = document.getElementById("copy-status");

    if (!button) return;

    var email = "lawaniak@gmail.com";

    function announce(message) {
      if (status) status.textContent = message;
    }

    function legacyCopy(text) {
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.top = "-1000px";
      field.style.opacity = "0";

      document.body.appendChild(field);
      field.select();

      var success = false;

      try {
        success = document.execCommand("copy");
      } catch (error) {
        success = false;
      }

      document.body.removeChild(field);

      if (!success) throw new Error("Copie indisponible");
    }

    function showCopied() {
      button.classList.add("is-copied");
      button.setAttribute("aria-label", "Adresse e-mail copiée");
      announce("Adresse e-mail copiée dans le presse-papiers.");

      window.setTimeout(function () {
        button.classList.remove("is-copied");
        button.setAttribute("aria-label", "Copier l'adresse e-mail");
        announce("");
      }, 2400);
    }

    button.addEventListener("click", function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email)
          .then(showCopied)
          .catch(function () {
            try {
              legacyCopy(email);
              showCopied();
            } catch (error) {
              announce("Copie automatique impossible. Adresse : " + email);
            }
          });
        return;
      }

      try {
        legacyCopy(email);
        showCopied();
      } catch (error) {
        announce("Copie automatique impossible. Adresse : " + email);
      }
    });
  }

  /* Démarrage */
  function init() {
    renderProjects();
    initReveal();
    initHeaderShadow();
    initActiveLink();
    initMobileMenu();
    initCopyEmail();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
