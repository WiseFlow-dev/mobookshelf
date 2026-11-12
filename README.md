# MoBookShelf (`MoBookShelf.com`) — Official Author Website

This folder (`C:\Users\wiseflow\Books\mobookshelf-website\`) contains the complete website for **MoBookShelf (`MoBookShelf.com`)**.

---

## 1. How to Open & Preview on Your Computer

- **Instant Preview:** Double-click `index.html` in this folder to open it right in your browser.
- **Local Web Server:** Run this command in PowerShell inside this folder:
  ```powershell
  python -m http.server 8080
  ```
  Then open `http://localhost:8080` in your browser.

---

## 2. Published Rowan & Kit Adventures

Both books are marked available in **`books.js`**:

- Book 1 — [The Echoing Village](https://www.amazon.com/dp/B0HQPVPYV3)
- Book 2 — [The Whispering Orchard](https://www.amazon.com/dp/B0HQWZPHH5)

Each book has a **Buy on Amazon** button and a clickable cover. The Whispering Orchard cover is at `assets/books/whispering-orchard/cover.jpg`. Its **Look inside** gallery matches Book 1: the cover, a real two-page spread (pages 10–11), and four early scene illustrations. Prices are omitted until confirmed.

---

## 3. How to Add Future Books to the Shelf

1. Put the new cover and inside pictures in a folder under `assets/books/`.
2. In **`books.js`**, copy a book block in `window.BOOKS`, paste it at the end, and change the words and picture paths.
3. Your social links go in `social` near the top of `books.js`.

---

## 4. How to Put `MoBookShelf.com` Live Online (100% Free Hosting)

Because this website is pure HTML, CSS, and JavaScript with zero server dependencies, you can host it for **$0/month** on any of these services and connect your `MoBookShelf.com` domain:

- **Option A — Netlify Drop (Fastest, 60 Seconds):**
  1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
  2. Drag and drop this entire `mobookshelf-website` folder onto the page.
  3. Click **Domain Management → Add Custom Domain** and enter `MoBookShelf.com`.
- **Option B — Cloudflare Pages (Great if your domain is on Cloudflare):**
  1. Go to your Cloudflare Dashboard → **Workers & Pages → Create → Pages → Upload Assets**.
  2. Upload the `mobookshelf-website` folder and click **Custom Domains → Set up a custom domain (`MoBookShelf.com`)**.
- **Option C — GitHub Pages:**
  1. Push this folder to a GitHub repository.
  2. In **Settings → Pages**, enable GitHub Pages and enter `MoBookShelf.com` under Custom Domain.

