# Profi Pereezd

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)

**Profi Pereezd** — Toshkentdagi ko‘chirish xizmatlari kompaniyasi uchun ishlab chiqilgan, rus va o‘zbek tillarida ishlaydigan bir sahifali savdo veb-sayt.

Saytning asosiy vazifasi: foydalanuvchiga xizmatni tez tushuntirish, ishonch uyg‘otish, narxni aniqlash uchun kerakli ma’lumotlarni yig‘ish va murojaatni Telegram orqali kompaniya guruhiga yuborish.

## Texnologiyalar

| Yo‘nalish | Texnologiya |
| --- | --- |
| Framework | Next.js 16 |
| UI | React 19 |
| Til | TypeScript |
| Styling | Tailwind CSS v4 |
| Animatsiya | GSAP, Lenis |
| Lead qabul qilish | Next.js API Route + Telegram Bot API |
| Sifat nazorati | ESLint, TypeScript, Playwright visual check |

## Asosiy Imkoniyatlar

- Rus va o‘zbek tillari uchun lokalizatsiya.
- `/` manzilidan standart `/ru` sahifasiga yo‘naltirish.
- Tezkor ariza qoldirish oynasi.
- Narxni aniqlash uchun savollar asosidagi kalkulyator.
- Telegram guruhiga avtomatik lead yuborish.
- Telefon niqobi, forma validatsiyasi va spamga qarshi yashirin maydon.
- `prefers-reduced-motion` sozlamasiga mos animatsiyalar.
- SEO uchun sitemap, robots, metadata va structured data.
- Mobil va desktop ekranlar uchun moslashuvchan dizayn.

## Tezkor Ishga Tushirish

```bash
npm install
cp .env.example .env.local
npm run dev
```

Lokal server:

```text
http://localhost:3000
```

Root sahifa avtomatik ravishda `/ru` manziliga yo‘naltiriladi.

## Muhit O‘zgaruvchilari

Lead yuborish ishlashi uchun `.env.local` faylida quyidagi qiymatlar bo‘lishi kerak:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

`.env.local` Git tomonidan kuzatilmaydi. Production muhitida bu qiymatlarni hosting yoki server sozlamalariga alohida kiritish kerak.

Agar Telegram sozlamalari mavjud bo‘lmasa, `/api/lead` `503` javob qaytaradi va foydalanuvchiga telefon yoki Telegram orqali bog‘lanish tavsiya qilinadi.

## Buyruqlar

| Buyruq | Vazifasi |
| --- | --- |
| `npm run dev` | Dasturlash serverini ishga tushiradi. Avval `public/images` papkasini skanerlaydi. |
| `npm run build` | Production uchun loyihani yig‘adi. |
| `npm run start` | Yig‘ilgan production versiyasini ishga tushiradi. |
| `npm run lint` | ESLint tekshiruvini bajaradi. |
| `npm run typecheck` | `tsc --noEmit` orqali TypeScript xatolarini tekshiradi. |
| `npm run assets` | `public/images` papkasini skanerlab, rasmlar manifestini yangilaydi. |
| `npm run visual-check` | 8 ta ekran kengligida responsive va accessibility tekshiruvlarini bajaradi. |

## Loyiha Tuzilmasi

```text
src/
  app/
    [locale]/            Asosiy sahifa, layout, privacy va OG image
    api/lead/            Telegram orqali ariza yuborish endpointi
    globals.css          Global uslublar va dizayn tokenlari
    robots.ts            Robots sozlamalari
    sitemap.ts           Sitemap generatsiyasi
    not-found.tsx        404 sahifa
    icon.svg             Sayt belgisi

  components/
    brand/               Logotip va brend elementlari
    contact/             Aloqa kanallari
    forms/               LeadForm va LeadModal
    layout/              Header, Footer, mobil menyu va sticky CTA
    media/               Rasm/figure komponentlari
    motion/              Reveal, RevealLines va SmoothScroll
    sections/            Landing sahifasining asosiy bloklari
    seo/                 Structured data
    ui/                  Qayta ishlatiladigan UI komponentlar

  content/
    company.ts           Kompaniya ma’lumotlarining yagona manbasi
    ru.ts                Ruscha kontent va Dictionary tipi
    uz.ts                O‘zbekcha tarjima
    images.ts            Rasm sozlamalari
    images.generated.ts  Avtomatik yaratiladigan rasm manifesti
    pricing.ts           Kalkulyator tariflari
    privacy.ts           Maxfiylik siyosati

  lib/
    analytics.ts         Analitika hodisalari
    motion.ts            Animatsiya sozlamalari
    phone.ts             Telefon formatlash va validatsiya
    scroll-lock.ts       Modal va menyu uchun scroll boshqaruvi
```

## Kontentni Tahrirlash

Saytdagi foydalanuvchiga ko‘rinadigan matnlar asosan `src/content` papkasida saqlanadi.

| Fayl | Nima uchun |
| --- | --- |
| `src/content/ru.ts` | Ruscha asosiy matnlar |
| `src/content/uz.ts` | O‘zbekcha tarjima |
| `src/content/company.ts` | Telefon, email, ijtimoiy tarmoqlar, tajriba va kompaniya ma’lumotlari |
| `src/content/pricing.ts` | Kalkulyator tariflari |
| `src/content/privacy.ts` | Maxfiylik siyosati matni |

`uz.ts` ruscha dictionary tipiga mos tekshiriladi. Agar kalit yetishmasa yoki noto‘g‘ri yozilsa, xato runtime’da `undefined` bo‘lib chiqishidan oldin build bosqichida aniqlanadi.

## Rasmlar

Rasmlar `public/images/` papkasida saqlanadi.

Yangi rasm qo‘shilgandan keyin manifestni yangilash uchun:

```bash
npm run assets
```

Hozircha `public/images/` papkasi bo‘sh bo‘lsa, sahifadagi rasm bloklarida vaqtinchalik placeholder ko‘rinadi. Kerakli fayllar belgilangan nomlar bilan qo‘shilganda kodni o‘zgartirish shart emas.

## Ariza Qabul Qilish Yo‘llari

Saytda foydalanuvchidan murojaat olishning ikkita asosiy yo‘li bor:

1. **Tezkor ariza:** bosh ekrandagi `Оставить заявку` tugmasi `LeadModal` oynasini ochadi.
2. **Narx kalkulyatori:** `Рассчитать стоимость` tugmasi foydalanuvchini savollar asosidagi kalkulyatorga olib boradi.

Ikkala yo‘l ham `LeadForm` logikasidan foydalanadi va muvaffaqiyatli yuborilgan arizalar bitta Telegram guruhiga keladi.

## Kalkulyator

Kalkulyator hozircha aniq narx chiqarmaydi, chunki kompaniyaning tasdiqlangan tariflari loyihaga kiritilmagan.

`src/content/pricing.ts` faylidagi `RATES` qiymati `null` bo‘lganda kalkulyator foydalanuvchidan ko‘chirish bo‘yicha ma’lumotlarni yig‘adi va qayta aloqa uchun ariza qabul qiladi.

Haqiqiy tariflar kiritilgandan keyin kalkulyator avtomatik ravishda taxminiy narx oralig‘ini ko‘rsata boshlaydi.

## Analitika

`src/lib/analytics.ts` foydalanuvchi harakatlarini quyidagi kanallarga yuborishga tayyor:

- `window.dataLayer`
- `gtag`
- `fbq`
- `profipereezd:lead` DOM hodisasi

Kuzatiladigan asosiy hodisalar:

```text
hero_form
price_calculator
service_cta
final_cta
phone_click
telegram_click
whatsapp_click
sticky_mobile_cta
```

Kod ichida GTM, GA4 yoki Meta Pixel identifikatorlari qattiq yozilmagan. Ular keyinchalik alohida qo‘shilishi mumkin.

## Accessibility Va Animatsiyalar

Saytda quyidagi talablar hisobga olingan:

- semantik HTML tuzilmasi;
- bitta asosiy `<h1>`;
- forma maydonlari uchun label va validatsiya;
- klaviatura bilan ko‘rinadigan focus holatlari;
- mobil menyuda focus trap;
- skip link;
- `prefers-reduced-motion` qo‘llab-quvvatlashi;
- animatsiya o‘chirilganda kontentning ko‘rinib turishi.

Lenis orqali silliq skroll faqat foydalanuvchi harakatni cheklamagan holatda ishlaydi. Saytda majburiy scroll hijacking yoki pinned bo‘limlar yo‘q.

## Visual Check

Responsive va accessibility tekshiruvlari quyidagi ekran kengliklarida bajariladi:

```text
375 · 390 · 430 · 768 · 1024 · 1280 · 1440 · 1920 px
```

Tekshiriladigan jihatlar:

- gorizontal overflow;
- `<h1>` soni;
- rasm `alt` atributlari;
- bosiladigan elementlar o‘lchami;
- brauzer konsolidagi xatolar;
- bajarilmagan tarmoq so‘rovlari.

Ishga tushirish:

```bash
npm run dev
npm run visual-check
```

## Production Checklist

Production’ga chiqarishdan oldin quyidagilarni tekshirish kerak:

- `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` production muhitida sozlangan.
- `.env.local` yoki boshqa maxfiy fayllar GitHub’ga chiqmagan.
- Kerakli real rasmlar `public/images/` papkasiga qo‘yilgan.
- `npm run assets` bajarilgan.
- `npm run typecheck` muvaffaqiyatli tugagan.
- `npm run lint` muvaffaqiyatli tugagan.
- `npm run build` muvaffaqiyatli tugagan.
- Yangi `/sitemap.xml` Google Search Console’da tekshirilgan.
- Eski WordPress URL manzillari uchun redirectlar sozlangan.

## Eski Saytdan Ko‘chirish Eslatmalari

Avvalgi sayt WordPress, Elementor, Contact Form 7 va Site Reviews asosida ishlagan. Yangi loyiha eski koddan foydalanmaydi va Next.js asosida qayta yozilgan.

DNS yangi serverga o‘tkazilishidan oldin:

1. Eski indekslangan URL manzillar uchun redirectlarni tekshiring.
2. `/privacy/` manzilini `/ru/privacy`ga yo‘naltiring.
3. Contact Form 7 pochta qutisini bir necha hafta faol qoldiring.
4. Yangi sitemap’ni Search Console’da tekshiring.

## Git Ignore Qoidasi

Repository’da Markdown fayllardan faqat `README.md` ko‘rinishi kerak.

`.gitignore` ichida quyidagi qoida bor:

```gitignore
*.md
!README.md
!readme.md
```

Shu sababli texnik yoki ichki `.md` hujjatlar lokal papkada qolishi mumkin, lekin GitHub’ga chiqmaydi.

## Ishlab Chiquvchilar

Ushbu loyiha **MyWeb** va **Nyrosoft** tomonidan ishlab chiqilgan.

| Aloqa turi | Ma’lumot |
| --- | --- |
| Dasturchi | Hayotbek Ismoilov |
| Telefon / WhatsApp | +998 95 005 15 45 |
| Telegram | @ismoillooff |
| Instagram | @ismoillooff |

## Huquqlar

© MyWeb · Nyrosoft. Foydalanish va tarqatish shartlari loyiha egasi bilan kelishilgan huquqlarga muvofiq belgilanadi.
