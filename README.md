Profi Pereezd — xizmatlarni sotish veb-sayti
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
profipereezd.uz saytining qayta dizayni — Toshkentdagi ko‘chirish xizmatlari kompaniyasi uchun mijozlardan murojaat olish va ularni buyurtmaga aylantirishga yo‘naltirilgan, rus va o‘zbek tillarida ishlaydigan bir sahifali savdo sayti.
Texnologiyalar: Next.js 16 · React 19 · Tailwind CSS v4 · GSAP + Lenis · TypeScript
---
Tezkor ishga tushirish
```bash
npm install
cp .env.example .env.local  # Telegram uchun ikkita o‘zgaruvchini kiriting
npm run dev                 # http://localhost:3000 → /ru manziliga yo‘naltiradi
```
Buyruq	Vazifasi
`npm run dev`	Dasturlash serverini ishga tushiradi (avval `public/images` qayta skanerlanadi).
`npm run build`	Production uchun loyihani yig‘adi.
`npm run start`	Yig‘ilgan production versiyasini ishga tushiradi.
`npm run typecheck`	`tsc --noEmit` orqali TypeScript xatolarini tekshiradi.
`npm run lint`	ESLint tekshiruvini ishga tushiradi.
`npm run assets`	`public/images` papkasini qayta skanerlab, rasmlar xaritasini yangilaydi.
`npm run visual-check`	8 ta ekran kengligida moslashuvchan dizayn va accessibility tekshiruvini bajaradi (server ishlab turishi kerak).
---
Saytni production muhitiga chiqarishdan oldin
1. Telegram orqali murojaatlarni yuborish
Lokal muhitda sozlangan, production serverda ham sozlanishi shart.
`.env.local` faylida `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` saqlanadi. Mijozlardan kelgan arizalar Telegram'dagi «Заявки» superguruhiga yuboriladi.
`.env.local` Git tomonidan kuzatilmaydi (`.gitignore`ga kiritilgan). Shu sababli ushbu ikkita o‘zgaruvchini production hosting/server muhitida alohida sozlash kerak.
Agar ular mavjud bo‘lmasa, `/api/lead` 503 javobini qaytaradi va forma foydalanuvchiga telefon qilish yoki Telegram orqali yozishni tavsiya qiladi. Bu ataylab shunday ishlaydi: murojaatning bildirmasdan yo‘qolib ketishidan ko‘ra, xatoni ochiq ko‘rsatish afzal.
Yuborish vaqtida timeout yoki serverning `5xx` xatosi yuz bersa, tizim bir marta qayta urinadi. Ikkala urinish ham muvaffaqiyatsiz bo‘lsa, arizaning to‘liq ma’lumotlari — ism, telefon, izoh va kalkulyator xulosasi — qo‘lda tiklash imkoniyati uchun server jurnaliga yoziladi.
> **Xavfsizlik:** Telegram tokenini hech qachon ommaviy GitHub repozitoriysiga joylamang. Server jurnallarida mijozlarning shaxsiy ma’lumotlari bo‘lishi mumkin; ularga kirishni cheklang va saqlash muddatini nazorat qiling.
2. Fotosuratlar
Hozircha rasmlar joylashadigan barcha bloklarda belgilangan vaqtinchalik ramkalar ko‘rinadi. Zarur suratlar ro‘yxati, o‘lchamlari va vizual yo‘nalishi IMAGE-BRIEF.md faylida keltirilgan.
Rasmlarni aynan belgilangan nomlar bilan `public/images/` papkasiga qo‘ying — kodni o‘zgartirish talab qilinmaydi.
Qo‘shimcha, majburiy bo‘lmagan materiallar `IMAGE-BRIEF.md` oxirida sanab o‘tilgan: SVG logotip, mijoz kompaniyalari logotiplari, real bajarilgan ishlar haqidagi ma’lumotlar, manzil, ish vaqti, WhatsApp raqami va narx koeffitsiyentlari.
---
Mijozlardan ariza olishning ikki yo‘li
Saytda foydalanuvchining qaror qabul qilish bosqichiga qarab ikkita alohida yo‘l mavjud. Ikkala yo‘l orqali yuborilgan arizalar ham bitta Telegram guruhiga keladi.
Bosh ekran → «Оставить заявку» («Ariza qoldirish»). Ikki maydonli `LeadModal` oynasini ochadi. Bu xizmatga buyurtma berishga tayyor mijozlar uchun qisqa yo‘l. U `LeadForm` komponentining `compact` rejimidan foydalanadi, shu sababli ma’lumotlarni tekshirish, telefon niqobi, spamga qarshi yashirin maydon (honeypot) va yuborish muvaffaqiyatsiz bo‘lsa kiritilgan ma’lumotni saqlash mexanizmi umumiy kod orqali ishlaydi.
Sayt sarlavhasidagi CTA va xizmatlar → «Рассчитать стоимость» («Narxni hisoblash»). To‘rtta savoldan iborat kalkulyatorga olib boradi. Bu hali tanlov qilayotgan foydalanuvchilar uchun mo‘ljallangan yo‘l.
---
Loyiha tuzilmasi
```text
src/
  app/
    [locale]/            layout · page · privacy · opengraph-image
    api/lead/            Telegram orqali ariza yuborish
    globals.css          Dizayn tizimining asosiy uslublari
    robots.ts sitemap.ts not-found.tsx icon.svg
  components/
    sections/            Savdo sahifasining har bir bo‘limi alohida faylda
    layout/              Header · MobileMenu · Footer · StickyContact · MobileActionBar
    forms/               LeadForm
    motion/              Reveal · RevealLines · SmoothScroll
    media/ ui/ brand/ contact/ seo/
  content/
    company.ts           Kompaniya ma’lumotlarining yagona manbasi
    ru.ts                Asosiy matnlar; Dictionary tipi shu fayldan olinadi
    uz.ts                Dictionary tipiga mos tekshiriladigan o‘zbekcha tarjima
    images.ts            Rasmlar manifesti
    pricing.ts           Kalkulyator tariflari (to‘ldirilmaguncha o‘chirilgan)
    privacy.ts           Maxfiylik siyosati
  lib/                   Animatsiya parametrlari · analitika · telefon niqobi · scroll-lock
```
Sayt matnlarini tahrirlash: `src/content/ru.ts` va `src/content/uz.ts` fayllarini o‘zgartiring. Foydalanuvchiga ko‘rinadigan matnlar komponentlarga bevosita yozilmagan. `uz.ts` faylida kalit yetishmasa yoki xato nomlansa, xatolik sayt ishlayotgan vaqtda `undefined` chiqishi o‘rniga build bosqichida aniqlanadi.
---
Muhim arxitektura va dizayn qarorlari
Quyidagi yechimlar standart sozlamalar emas, ongli ravishda tanlangan qarorlardir. Zarurat bo‘lsa, ularni o‘zgartirish mumkin.
1. Saytdagi ma’lumotlar to‘qib chiqarilmagan
Audit davomida 10 yillik tajriba, 2000 dan ortiq ko‘chirish, ikkita telefon raqami, Telegram foydalanuvchi nomi, elektron pochta manzili va sakkizta sharh (ism hamda sanalari bilan) amaldagi saytdan olingan. To‘rtta mijoz kompaniya nomi saytida logotipi ko‘rsatilgan yoki o‘z nomidan ommaviy sharh qoldirgan tashkilotlardan tanlangan.
Saytda tasdiqlanmagan mukofotlar, sug‘urta kafolatlari, sertifikatlar, xodimlar soni yoki korporativ mijozlar haqidagi da’volar kiritilmagan. Sababi — ko‘chirish xizmatida ishonch asosiy omillardan biridir.
2. Kalkulyator tasdiqlanmagan narxni ko‘rsatmaydi
Kompaniya uchun ochiq e’lon qilingan tariflar mavjud emas. Kalkulyator foydalanuvchining ko‘chirishga oid talablarini yig‘ib, qayta qo‘ng‘iroq qilish uchun ariza qabul qiladi.
Narxni taxminiy ko‘rsatib, keyin menejer boshqa summa aytishi mijoz ishonchiga zarar yetkazishi mumkin. `src/content/pricing.ts` fayliga haqiqiy tariflar kiritilgach, kalkulyator narx oralig‘ini ko‘rsatishni boshlaydi; boshqa joyni o‘zgartirish talab qilinmaydi.
3. Bajarilgan ishlar haqidagi faktlar boshlang‘ich holatda bo‘sh
`route`, `duration`, `team` va `vehicles` maydonlari faqat haqiqiy ma’lumot kiritilganida ko‘rsatiladi. «Bizning ishlarimiz» bo‘limida tasdiqlanmagan «4 soat · 3 mutaxassis» kabi ma’lumotlar chiqarilmaydi.
4. Ko‘k rang o‘rniga iliq clay aksenti
Dizayn talabi odatiy SaaS ko‘k rangidan foydalanishni cheklagan. Mavjud logotip asosan monoxrom bo‘lib, unda kichik ko‘k-binafsha gradient elementi bor.
Shu sababli saytda iliq oqish fon, to‘q rangli matn va asosan CTA tugmalarida ishlatiladigan clay aksent tanlangan. Zarur bo‘lsa, `globals.css` ichidagi `--color-clay` o‘zgaruvchisini logotipning indigo rangiga moslab yangilash kifoya.
5. WhatsApp tasdiqlanmaguncha o‘chirilgan
Amaldagi saytda WhatsApp raqami ko‘rsatilmagan va u tasdiqlanmagan. `company.whatsapp.number` maydoniga haqiqiy raqam kiritilsa, WhatsApp havolasi bosh ekranda, kompyuter ekranidagi kontakt panelida, mobil menyuda, yakuniy CTA blokida va footer'da avtomatik chiqadi.
Qiymat `null` bo‘lsa, ishlamaydigan havolalar ko‘rsatilmaydi.
6. Ayrim bo‘limlar birlashtirilgan
Muammo va yechim bo‘limi alohida «oldin/keyin» blokini o‘z ichiga oladi.
Statistikalar va mijozlar logotiplari yagona ishonch bloki sifatida berilgan.
Yakuniy chaqiriq (CTA) va aloqa formasi bitta ekranga birlashtirilgan.
Bu takrorlanuvchi dalillarni va ortiqcha formalarni kamaytirish uchun qilingan.
7. Kalkulyator ishonch bloklaridan oldin joylashgan
Foydalanuvchi xizmat jarayoni bilan tanishib bo‘lgach, uning qiziqishi yuqori bo‘lishi mumkin. Shu sababli narxga oid savollar qo‘shimcha ishonch bloklaridan oldin beriladi — bu qiziqishni arizaga aylantirishga yordam beradi.
---
Analitika
Kod ichiga hech qanday pixel, konteyner yoki o‘lchov identifikatori qattiq yozilmagan.
`src/lib/analytics.ts` hodisalarni `window.dataLayer`ga uzatadi, mavjud bo‘lsa `gtag` va `fbq`ga ham yuboradi. Shuningdek, CRM skriptlari uchun `profipereezd:lead` nomli DOM hodisasini yaratadi.
Keyinchalik GTM, GA4 yoki Meta Pixel qo‘shilsa, asosiy CTA hodisalarini kuzatish mexanizmi tayyor.
Hodisalar:
`hero_form` · `price_calculator` · `service_cta` · `final_cta` · `phone_click` · `telegram_click` · `whatsapp_click` · `sticky_mobile_cta`
---
Foydalanish qulayligi va animatsiyalar
Saytda semantik HTML tuzilmasi, bitta `<h1>` sarlavha, belgilangan forma maydonlari, ko‘rinadigan klaviatura fokus indikatorlari, harakatlar uchun haqiqiy tugmalar, navigatsiya uchun havolalar va asosiy kontentga o‘tish havolasi (skip link) mavjud.
Mobil menyuda klaviatura fokusi menyu chegarasida ushlab turiladi; menyu yopilgach, fokus uni ochgan tugmaga qaytadi.
Barcha animatsiyalar `prefers-reduced-motion` sozlamasiga moslashadi. Kontent dastlab ko‘rinadigan holatda bo‘ladi; JavaScript animatsiya kerakligini aniqlagandan keyingina tegishli elementlarga harakat qo‘llanadi. Shuning uchun animatsiyani cheklagan yoki JavaScript ishlamaydigan foydalanuvchi bo‘sh sahifaga duch kelmaydi.
Animatsiya cheklanganda Lenis orqali silliq skroll butunlay o‘chadi. Saytda majburiy scroll boshqaruvi (scroll hijacking) yoki skroll vaqtida qotirib qo‘yiladigan (pinned) bo‘limlar yo‘q.
`npm run visual-check` quyidagi ekran kengliklarida tekshiruv o‘tkazadi:
`375` · `390` · `430` · `768` · `1024` · `1280` · `1440` · `1920` px
Tekshiriladigan jihatlar: gorizontal chiqib ketish (overflow), `<h1>` soni, yetishmayotgan `alt` atributlari, WCAG 2.5.8 bo‘yicha bosiladigan elementlar o‘lchami, brauzer konsolidagi xatolar hamda bajarilmagan tarmoq so‘rovlari.
---
Eski WordPress saytidan ko‘chirish
Avvalgi sayt WordPress + Elementor, Contact Form 7 va Site Reviews plaginlariga asoslangan. Yangi sayt oldingi kodni ishlatmaydi — loyiha yangidan yozilgan.
DNS'ni yangi serverga o‘tkazishdan oldingi vazifalar:
Qidiruv tizimlarida indekslangan eski URL manzillari uchun mos yo‘naltirishlarni sozlang. Yoast sitemap'ida `/`, `/thank-you/`, `/privacy/` va `/review/` ko‘rsatilgan; ularning har biri uchun mos yangi manzilni tekshiring.
`/privacy/` manzilini `/ru/privacy`ga yo‘naltiring.
Keshda qolgan formalar orqali eski arizalar kelishi ehtimoli sababli Contact Form 7 pochta qutisini yana bir necha hafta faol saqlang.
Yangi `/sitemap.xml` faylini Google Search Console'da tekshiring.
---
Ishlab chiquvchilar
Ushbu loyiha MyWeb va Nyrosoft tomonidan ishlab chiqilgan.
Loyihani o‘rnatish, sozlash, ishga tushirish yoki undan foydalanishda savollar, texnik muammolar yoxud tushunmovchiliklar yuzaga kelsa, dasturchi bilan bevosita bog‘laning.
Aloqa turi	Ma’lumot
Dasturchi	Hayotbek Ismoilov
Telefon / WhatsApp	+998 95 005 15 45
Telegram	@ismoillooff
Instagram	@ismoillooff
---
© MyWeb · Nyrosoft. Foydalanish va tarqatish shartlari loyiha egasi bilan kelishilgan huquqlarga muvofiq belgilanadi.#   P r o f i - P e r e z d . u z  
 