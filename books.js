/**
 * MoBookShelf.com — the only file you need to edit.
 *
 * The first two Rowan & Kit Adventures are available on Amazon.
 *
 * To add a new book: copy one book block below, paste it at the end of BOOKS,
 * and change the words, cover and pictures.
 */

window.SITE = {
  name: "MoBookShelf",
  domain: "MoBookShelf.com",
  author: "Mohamad Ismail",
  email: "mo.issmail@gmail.com",
  about:
    "I'm Mohamad Ismail. I make books that ask you to do something: cross out suspects with a pencil, or follow two brothers into a valley where the echoes answer back. No apps and no screens, just paper, good pictures and fair clues.",
  // When your social pages are ready, add them like this:
  // { label: "Instagram", url: "https://instagram.com/yourname" }
  social: []
};

// Amazon stores. The site picks one from the visitor's country (US if unknown).
// To use Amazon OneLink / affiliate tags later, set amazonTag, e.g. "mobookshelf-20".
window.AMAZON = {
  tag: "mobookshelf-20",
  stores: {
    US: { label: "United States", host: "www.amazon.com" },
    GB: { label: "United Kingdom", host: "www.amazon.co.uk" },
    CA: { label: "Canada", host: "www.amazon.ca" },
    AU: { label: "Australia", host: "www.amazon.com.au" },
    DE: { label: "Germany", host: "www.amazon.de" },
    FR: { label: "France", host: "www.amazon.fr" },
    ES: { label: "Spain", host: "www.amazon.es" },
    IT: { label: "Italy", host: "www.amazon.it" },
    NL: { label: "Netherlands", host: "www.amazon.nl" },
    PL: { label: "Poland", host: "www.amazon.pl" },
    SE: { label: "Sweden", host: "www.amazon.se" },
    JP: { label: "Japan", host: "www.amazon.co.jp" }
  },
  // Countries that share another country's store.
  alias: { IE: "GB", AT: "DE", CH: "DE", BE: "NL", LU: "FR", NZ: "AU" }
};

window.BOOKS = [
  {
    id: "midnight",
    title: "The Killer Boarded at Midnight",
    kind: "Murder-mystery puzzle book · adults & teens",
    status: "available", // "available" or "coming-soon"
    price: "$13.99",
    asin: "B0HQDMH9ZX",
    amazonUrl: "https://www.amazon.com/dp/B0HQDMH9ZX",
    cover: "assets/books/midnight/cover.jpg",
    shelfNote: "A murder to solve. Bring a pencil.",
    blurb:
      "November 1929. A storm at sea, a locked cabin, and a dead man inside. There are 2,400 passengers on board. You get 24 clues and a pencil, and you cross out names until only the killer is left.",
    facts: "Paperback · 8.5 × 11 in · 208 pages",
    lookInside: [
      { src: "assets/books/midnight/cover.jpg", caption: "The front cover." },
      { src: "assets/books/midnight/manifest-spread.jpg", caption: "The passenger list, pages 34–35. Plenty of room to cross out names." },
      { src: "assets/books/midnight/study-scene.jpg", caption: "The crime scene: the locked study on the ship." },
      { src: "assets/books/midnight/evidence-objects.jpg", caption: "The evidence. Four suspects, four objects, four reasons." },
      { src: "assets/books/midnight/ship-profile.jpg", caption: "The SS Nocturne, Southampton to New York, November 1929." }
    ]
  },
  {
    id: "echoing-village",
    title: "The Echoing Village",
    kind: "Illustrated chapter book · ages 8–12 · Rowan & Kit Adventures, Book 1",
    status: "available",
    price: "",
    asin: "B0HQPVPYV3",
    amazonUrl: "https://www.amazon.com/dp/B0HQPVPYV3",
    cover: "assets/books/echoing-village/cover-en.jpg",
    shelfNote: "Rowan & Kit Adventures, Book 1. Available now.",
    blurb:
      "Rowan and Kit find a map hidden in Grandpa's old chest. It leads to Echo Hollow, a silent stone village with one rule: the echoes copy your voice, follow every sound, and cannot cross running water.",
    facts: "Paperback · 98 pages · 75 colour pictures",
    languages: [
      { code: "EN", name: "English", title: "The Echoing Village", cover: "assets/books/echoing-village/cover-en.jpg" },
      { code: "DE", name: "Deutsch", title: "Das Echo-Dorf", cover: "assets/books/echoing-village/cover-de.jpg" },
      { code: "ES", name: "Español", title: "El Pueblo del Eco", cover: "assets/books/echoing-village/cover-es.jpg" },
      { code: "FR", name: "Français", title: "Le Village de l'Écho", cover: "assets/books/echoing-village/cover-fr.jpg" },
      { code: "AR", name: "العربية", title: "قرية الصدى", cover: "assets/books/echoing-village/cover-ar.jpg" }
    ],
    lookInside: [
      { src: "assets/books/echoing-village/cover-en.jpg", caption: "The front cover." },
      { src: "assets/books/echoing-village/sample-spread.jpg", caption: "A page spread from inside the book." },
      { src: "assets/books/echoing-village/scene-01-attic.jpg", caption: "Chapter 1. Grandpa's room in the hills." },
      { src: "assets/books/echoing-village/scene-03-chest.jpg", caption: "Chapter 2. The secret bottom of Grandpa's chest." },
      { src: "assets/books/echoing-village/scene-08-valley.jpg", caption: "Chapter 3. Looking down into Echo Hollow." },
      { src: "assets/books/echoing-village/scene-14-ford.jpg", caption: "Chapter 4. The echoes stop at running water." }
    ]
  },
  {
    id: "whispering-orchard",
    title: "The Whispering Orchard",
    kind: "Illustrated chapter book · ages 8–12 · Rowan & Kit Adventures, Book 2",
    status: "available",
    price: "",
    asin: "B0HQWZPHH5",
    amazonUrl: "https://www.amazon.com/dp/B0HQWZPHH5",
    cover: "assets/books/whispering-orchard/cover.jpg",
    shelfNote: "Rowan & Kit Adventures, Book 2. Available now.",
    blurb:
      "A year after Echo Hollow, Rowan and Kit follow Grandpa's last secret to an old walled orchard, where the scarecrows don't always stand still. When something in the mist steals Grandma's voice, the brothers must cross the orchard without making a sound.",
    facts: "",
    nextInSeries: ["The Turning Light", "The Ticking Town", "The Homeward Road"],
    lookInside: [
      { src: "assets/books/whispering-orchard/cover.jpg", caption: "The front cover of The Whispering Orchard, Book 2 of Rowan & Kit Adventures." },
      { src: "assets/books/whispering-orchard/sample-spread.jpg", caption: "Pages 10–11 from inside the book. Chapter 2: The Second Valley." },
      { src: "assets/books/whispering-orchard/scene-01-kitchen.jpg", caption: "Chapter 1. A summer morning in Grandma's kitchen." },
      { src: "assets/books/whispering-orchard/scene-03-map.jpg", caption: "Chapter 1. Grandpa's compass, the hidden map strip and a pressed apple leaf." },
      { src: "assets/books/whispering-orchard/scene-07-valley.jpg", caption: "Chapter 2. Looking down into the walled orchard." },
      { src: "assets/books/whispering-orchard/scene-13-gate.jpg", caption: "Chapter 3. Rowan steps through the orchard gate." }
    ]
  },
  {
    id: "borrowed-badge",
    title: "The Borrowed Badge",
    kind: "Crime thriller · adults · On the Inside, Book 1",
    status: "coming-soon",
    price: "",
    cover: "assets/books/borrowed-badge/cover.jpg",
    shelfNote: "On the Inside, Book 1. Coming soon.",
    blurb:
      "His badge is gone. His orders still stand. To the Metropolitan Police, Daniel Hollis is a disgrace. To East London crime boss Frank Mercer, he is a useful recruit with nothing left to lose. Neither impression tells the whole story. As evidence turns into leverage and trust becomes a weapon, Daniel must decide how far he can push his cover before someone else pays the price.",
    facts: "Paperback · 6 × 9 in",
    lookInside: [
      { src: "assets/books/borrowed-badge/cover.jpg", caption: "The front cover of The Borrowed Badge, Book 1 of On the Inside." }
    ]
  }
];

// A tiny taste of the Midnight puzzle. Shown folded away under that book.
window.MINI_CASE = {
  clues: [
    "The killer did not board at Cobh.",
    "The killer was through the gangway before 19:30.",
    "The killer's luggage weighed under 45 lb."
  ],
  suspects: [
    { name: "Lawrence Devereux", detail: "Southampton · 23:47 · 41 lb", guilty: false },
    { name: "Mona Ramsey", detail: "Cobh · 18:20 · 38 lb", guilty: false },
    { name: "Jean Salisbury", detail: "Southampton · 18:11 · 37 lb", guilty: true },
    { name: "Evan Galloway", detail: "Liverpool · 18:50 · 100 lb", guilty: false }
  ],
  answer: "Jean Salisbury is the only one left. In the book, you do this with 2,400 names."
};
