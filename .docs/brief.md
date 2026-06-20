# Nuristani Wood Handcrafts
- One-line positioning: Luxury PWA e-commerce for handmade Nuristani wooden crafts sold internationally via WhatsApp
- Target users: International buyers (diaspora, collectors, gift shoppers); admin = Afghan artisan business owner on mobile
- Core features:
  1. Bilingual site (Dari/FA RTL ↔ English LTR) with language toggle
  2. Product catalog with category filter, search, lazy-loaded images
  3. Product detail page with WhatsApp order button (pre-filled message)
  4. About & Contact pages with brand story
  5. Admin panel: product/category CRUD, image upload, site settings
  6. PWA: manifest, service worker, offline cache, Add to Home Screen
- P1 features:
  1. Luxury visual identity: walnut dark bg, gold accents, Nastaliq + Playfair fonts
  2. Nuristani geometric divider pattern between sections
  3. Mobile-first responsive (2-col product grid on mobile)
- Device strategy: adaptive
- Design style: luxury artisan dark — walnut #1d140d, gold #c99a4b, cream #f1e9da
- Technical constraints: PostgreSQL via Drizzle ORM; image upload stored as public files
- Nova Agent: not needed
- Completed: DB init, schema design
- Current iteration: Full PWA build
