(function () {
  "use strict";

  var SITE = window.SITE || {};
  var BOOKS = window.BOOKS || [];
  var CASE = window.MINI_CASE;

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "text") node.textContent = attrs[key];
        else if (key === "class") node.className = attrs[key];
        else node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function isAvailable(book) {
    return book.status === "available" && book.amazonUrl;
  }

  /* ---------- Pick the visitor's Amazon store ---------- */
  var AMZ = window.AMAZON || { stores: {}, alias: {} };
  var TZ_COUNTRY = {
    "Europe/London": "GB", "Europe/Dublin": "IE", "Europe/Berlin": "DE", "Europe/Vienna": "AT",
    "Europe/Zurich": "CH", "Europe/Paris": "FR", "Europe/Madrid": "ES", "Europe/Rome": "IT",
    "Europe/Amsterdam": "NL", "Europe/Brussels": "BE", "Europe/Warsaw": "PL", "Europe/Stockholm": "SE",
    "Asia/Tokyo": "JP", "Australia/Sydney": "AU", "Australia/Melbourne": "AU", "Australia/Brisbane": "AU",
    "Australia/Perth": "AU", "Australia/Adelaide": "AU", "Pacific/Auckland": "NZ",
    "America/Toronto": "CA", "America/Vancouver": "CA", "America/Edmonton": "CA",
    "America/Winnipeg": "CA", "America/Halifax": "CA"
  };
  var LANG_COUNTRY = { de: "DE", fr: "FR", es: "ES", it: "IT", nl: "NL", pl: "PL", sv: "SE", ja: "JP" };

  function detectCountry() {
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ""];
    var i, m;
    for (i = 0; i < langs.length; i++) {
      m = /[-_]([A-Za-z]{2})$/.exec(langs[i] || "");
      if (m) return m[1].toUpperCase();
    }
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (TZ_COUNTRY[tz]) return TZ_COUNTRY[tz];
    } catch (e) {}
    var base = ((langs[0] || "").split(/[-_]/)[0] || "").toLowerCase();
    return LANG_COUNTRY[base] || "US";
  }

  var COUNTRY = (function () {
    var c = detectCountry();
    c = AMZ.alias[c] || c;
    return AMZ.stores[c] ? c : "US";
  })();

  function storeUrl(book, code) {
    var store = AMZ.stores[code];
    if (!book.asin || !store) return book.amazonUrl;
    return "https://" + store.host + "/dp/" + book.asin + (AMZ.tag && code === "US" ? "?tag=" + encodeURIComponent(AMZ.tag) : "");
  }

  function bookUrl(book) {
    return storeUrl(book, COUNTRY);
  }

  /* ---------- The shelf at the top ---------- */
  function buildShelf() {
    var shelf = document.getElementById("shelf");
    if (!shelf) return;

    var row = el("div", { class: "shelf-row" });
    BOOKS.forEach(function (book, i) {
      var note = isAvailable(book) && book.price
        ? book.shelfNote + " " + book.price
        : book.shelfNote;
      var item = el("a", { class: "shelf-item", href: "#" + book.id, style: "--i:" + i }, [
        el("img", {
          class: "shelf-cover",
          src: book.cover,
          alt: book.title + " — cover",
          width: "400",
          height: "600"
        }),
        el("span", { class: "shelf-note", text: note })
      ]);
      row.appendChild(item);
    });

    // An honest empty spot: the next Rowan & Kit book goes here.
    row.appendChild(
      el("div", { class: "shelf-item shelf-space", "aria-hidden": "true" }, [
        el("span", { class: "shelf-gap" }),
        el("span", { class: "shelf-note shelf-note--plain", text: "Saving this spot for the next one." })
      ])
    );

    shelf.appendChild(
      el("div", { class: "shelf-track" }, [row, el("div", { class: "plank", "aria-hidden": "true" })])
    );
  }

  /* ---------- One section per book ---------- */
  function buildBook(book, index) {
    var section = el("section", {
      class: "book" + (index % 2 ? " book--flip" : ""),
      id: book.id,
      "aria-labelledby": book.id + "-title"
    });

    // Cover column
    var coverImg = el("img", {
      class: "book-cover",
      src: book.cover,
      alt: book.title + " — cover",
      loading: "lazy",
      width: "400",
      height: "600"
    });
    var cover = isAvailable(book)
      ? el("a", {
          href: bookUrl(book),
          target: "_blank",
          rel: "noopener",
          "aria-label": "Buy " + book.title + " on Amazon"
        }, [coverImg])
      : coverImg;
    var coverCol = el("div", { class: "book-cover-col" }, [cover]);

    if (book.languages && book.languages.length) {
      coverCol.appendChild(buildLanguages(book, coverImg));
    }

    // Text column
    var text = el("div", { class: "book-text" }, [
      el("p", { class: "book-kind", text: book.kind }),
      el("h2", { id: book.id + "-title", text: book.title }),
      el("p", { class: "book-blurb", text: book.blurb }),
      book.facts ? el("p", { class: "book-facts", text: book.facts }) : null
    ]);

    var actions = el("div", { class: "book-actions" });
    if (isAvailable(book)) {
      actions.appendChild(
        el("a", {
          class: "button",
          href: bookUrl(book),
          target: "_blank",
          rel: "noopener",
          text: "Buy on Amazon" + (book.price ? " · " + book.price : "")
        })
      );
    } else {
      actions.appendChild(
        el("a", {
          class: "button button--quiet",
          href:
            "mailto:" + SITE.email +
            "?subject=" + encodeURIComponent("Tell me when " + book.title + " is out"),
          text: "Tell me when it's out"
        })
      );
    }
    if (book.lookInside && book.lookInside.length) {
      var look = el("button", { class: "link-button", type: "button", text: "Look inside" });
      look.addEventListener("click", function () { openViewer(book, 0); });
      actions.appendChild(look);
    }
    text.appendChild(actions);

    if (isAvailable(book) && book.asin) {
      var stores = el("p", { class: "book-stores" }, ["Other Amazon stores: "]);
      var first = true;
      Object.keys(AMZ.stores).forEach(function (code) {
        if (code === COUNTRY) return;
        if (!first) stores.appendChild(document.createTextNode(" · "));
        first = false;
        stores.appendChild(el("a", { href: storeUrl(book, code), target: "_blank", rel: "noopener", text: AMZ.stores[code].label }));
      });
      text.appendChild(stores);
    }

    if (book.nextInSeries && book.nextInSeries.length) {
      text.appendChild(
        el("p", {
          class: "book-next",
          text: "Still to come in " + (book.seriesName || "the series") + ": " + book.nextInSeries.join(", ") + "."
        })
      );
    }

    if (book.id === "midnight" && CASE) {
      text.appendChild(buildCase());
    }

    section.appendChild(coverCol);
    section.appendChild(text);
    return section;
  }

  function buildLanguages(book, coverImg) {
    var wrap = el("div", { class: "langs" });
    var title = el("p", { class: "langs-title", text: book.languages[0].title });
    var list = el("div", { class: "langs-list", role: "group", "aria-label": "See the cover in another language" });

    book.languages.forEach(function (lang, i) {
      var btn = el("button", {
        type: "button",
        lang: lang.code.toLowerCase(),
        title: lang.name,
        "aria-pressed": i === 0 ? "true" : "false",
        text: lang.code
      });
      btn.addEventListener("click", function () {
        coverImg.src = lang.cover;
        coverImg.alt = lang.title + " — cover";
        title.textContent = lang.title;
        title.setAttribute("dir", lang.code === "AR" ? "rtl" : "ltr");
        title.setAttribute("lang", lang.code.toLowerCase());
        list.querySelectorAll("button").forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
      });
      list.appendChild(btn);
    });

    wrap.appendChild(list);
    wrap.appendChild(title);
    return wrap;
  }

  /* ---------- The tiny optional puzzle ---------- */
  function buildCase() {
    var details = el("details", { class: "case" });
    details.appendChild(el("summary", { text: "Try a 30-second case from the book" }));

    var body = el("div", { class: "case-body" });
    body.appendChild(el("p", { class: "case-intro", text: "Read the clues, then tap a name to cross it out." }));

    var clues = el("ol", { class: "case-clues" });
    CASE.clues.forEach(function (c) { clues.appendChild(el("li", { text: c })); });
    body.appendChild(clues);

    var list = el("ul", { class: "case-names" });
    CASE.suspects.forEach(function (s) {
      var btn = el("button", { type: "button", "aria-pressed": "false" }, [
        el("span", { class: "case-name", text: s.name }),
        el("span", { class: "case-detail", text: s.detail })
      ]);
      btn.addEventListener("click", function () {
        var on = btn.getAttribute("aria-pressed") === "true";
        btn.setAttribute("aria-pressed", on ? "false" : "true");
      });
      list.appendChild(el("li", null, [btn]));
    });
    body.appendChild(list);

    var answer = el("p", { class: "case-answer", text: CASE.answer, hidden: "" });
    var reveal = el("button", { class: "link-button", type: "button", text: "Show the answer" });
    reveal.addEventListener("click", function () {
      answer.hidden = false;
      reveal.hidden = true;
    });
    body.appendChild(reveal);
    body.appendChild(answer);

    details.appendChild(body);
    return details;
  }

  /* ---------- Look inside viewer ---------- */
  var viewer = document.getElementById("viewer");
  var vImg = document.getElementById("viewer-img");
  var vCap = document.getElementById("viewer-caption");
  var vCount = document.getElementById("viewer-count");
  var current = { book: null, index: 0 };

  function showPage(i) {
    var pages = current.book.lookInside;
    current.index = (i + pages.length) % pages.length;
    var page = pages[current.index];
    vImg.src = page.src;
    vImg.alt = page.caption;
    vCap.textContent = page.caption;
    vCount.textContent = current.index + 1 + " of " + pages.length;
  }

  function openViewer(book, i) {
    current.book = book;
    viewer.setAttribute("aria-label", "Look inside " + book.title);
    showPage(i);
    if (typeof viewer.showModal === "function") viewer.showModal();
    else viewer.setAttribute("open", "");
  }

  function closeViewer() {
    if (typeof viewer.close === "function") viewer.close();
    else viewer.removeAttribute("open");
  }

  if (viewer) {
    document.getElementById("viewer-prev").addEventListener("click", function () { showPage(current.index - 1); });
    document.getElementById("viewer-next").addEventListener("click", function () { showPage(current.index + 1); });
    viewer.querySelector("[data-close]").addEventListener("click", closeViewer);
    viewer.addEventListener("click", function (e) { if (e.target === viewer) closeViewer(); });
    viewer.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") showPage(current.index + 1);
      if (e.key === "ArrowLeft") showPage(current.index - 1);
    });
  }

  /* ---------- Fill the page ---------- */
  buildShelf();

  var booksRoot = document.getElementById("books");
  BOOKS.forEach(function (book, i) { booksRoot.appendChild(buildBook(book, i)); });

  var about = document.getElementById("about-text");
  if (about && SITE.about) about.textContent = SITE.about;

  var email = document.getElementById("email-link");
  if (email && SITE.email) { email.href = "mailto:" + SITE.email; email.textContent = SITE.email; }

  var social = document.getElementById("social");
  if (social && SITE.social && SITE.social.length) {
    SITE.social.forEach(function (s, i) {
      if (i) social.appendChild(document.createTextNode(" · "));
      social.appendChild(el("a", { href: s.url, target: "_blank", rel: "noopener", text: s.label }));
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
