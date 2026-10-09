import { company } from "./company";
import type { Dictionary } from "./ru";

/**
 * Uzbek copy (Latin script — what the Uzbek web actually uses).
 * ─────────────────────────────────────────────────────────────────────────
 * Typed as `Dictionary`, so a missing or misspelled key fails the build rather
 * than silently rendering `undefined` on a live sales page.
 *
 * This is a translation of the SELLING, not of the words. Where a Russian
 * phrase has no natural Uzbek equivalent it is rewritten to make the same
 * promise, not transliterated.
 *
 * The reviews are NOT translated — a testimonial rewritten by the company that
 * received it stops being a testimonial. They stay in the language the client
 * wrote them in, which is also why one of them is already in Uzbek.
 */

export const uz: Dictionary = {
  meta: {
    title:
      "Profi Pereezd — Toshkentda kvartira va ofis ko'chirish xizmati",
    description:
      "Stresssiz ko'chish: buyumlarni ehtiyotkorlik bilan joylaymiz, mebelni qismlarga ajratamiz, yuklaymiz, olib boramiz va yangi joyda yig'ib beramiz. Toshkentda kvartira, uy va ofislar uchun. 10 yillik tajriba, 2000 dan ortiq ko'chish. Bepul hisob-kitob.",
    ogAlt: "Profi Pereezd — Toshkentda professional ko'chirish xizmati",
  },

  nav: {
    services: "Xizmatlar",
    process: "Qanday ishlaymiz",
    price: "Narx",
    projects: "Ishlarimiz",
    reviews: "Sharhlar",
    faq: "Savollar",
    cta: "Narxni hisoblash",
    menu: "Menyu",
    close: "Yopish",
    openMenu: "Menyuni ochish",
    skipToContent: "Asosiy qismga o'tish",
    langLabel: "Sayt tili",
  },

  hero: {
    eyebrow: "Toshkentda professional ko'chirish",
    headline: ["Stresssiz ko'chish.", "Qolganini", "biz o'z zimmamizga olamiz."],
    lead: "Buyumlarni ehtiyotkorlik bilan joylaymiz, mebelni ajratamiz, yuklaymiz, olib boramiz va yangi joyda yig'ib beramiz. Kvartira, uy va ofislar — kalit topshirish sharti bilan.",
    primary: "So'rov qoldirish",
    secondary: "Hozir qo'ng'iroq qilish",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    imageAlt:
      "Profi Pereezd brigadasi kvartiradan o'ralgan mebelni ehtiyotkorlik bilan olib chiqmoqda",
    scrollHint: "Pastga suring",
    trust: [
      `${company.yearsOfExperience}+ yillik tajriba`,
      `${company.completedMoves.toLocaleString("ru-RU")}+ ko'chish`,
      "Yashirin to'lovlarsiz",
      "Ehtiyotkorlik bilan va o'z vaqtida",
    ],
  },

  trustBar: {
    label: "Bizga ishonishadi",
    items: [
      { value: "10", unit: "yil", caption: "Toshkentda ishlaymiz" },
      { value: "2000", unit: "+", caption: "bajarilgan ko'chish" },
      { value: "5,0", unit: "★", caption: "sharhlardagi o'rtacha baho" },
      { value: "1", unit: "jamoa", caption: "butun ko'chish uchun" },
    ],
  },

  problem: {
    label: "01 — Vaziyat",
    heading: "Ko'chish tartibsizlikka aylanmasligi kerak.",
    lead: "Odatda odam ko'chishni o'nlab alohida vazifalardan yig'adi. Har biri vaqt oladi va har biri noto'g'ri ketishi mumkin.",
    painsLabel: "Bu odatda qanday ko'rinadi",
    pains: [
      "Kerakli hajmdagi mashinani qayerdan topish kerak",
      "Og'ir divanni to'rtinchi qavatdan kim tushiradi",
      "Texnika va idishlarni shikastlanmasdan qanday yetkazish kerak",
      "Kupe shkafni kim ajratadi va keyin kim yig'adi",
      "Quti, plyonka va skotchni qayerdan olish kerak",
      "Bir kunda ko'chib ulgurish qanday mumkin",
    ],
    bridge: "Bularning barchasini bitta jamoa hal qiladi.",
    solutionLabel: "Biz bilan bu qanday ko'rinadi",
    solutions: [
      "Mashinani hajmingizga qarab tanlaymiz — bo'sh joy uchun pul to'lamaysiz",
      "Yuk tashuvchilar takelaj va eshik himoyasi bilan ishlaydi",
      "Texnika va mo'rt buyumlarni alohida, bir necha qatlamda o'raymiz",
      "Mebelni o'z asbobimiz bilan ajratamiz va yig'amiz",
      "O'rash materiallarini ko'chish kuni o'zimiz olib kelamiz",
      "Marshrut va vaqtni oldindan rejalashtiramiz — odatda bir kun",
    ],
    beforeAlt: "Brigada kelishidan oldingi kvartira: tarqoq buyumlar va mebel",
    afterAlt:
      "O'sha kvartira: buyumlar o'ralgan, mebel ajratilgan va himoyalangan",
  },

  services: {
    label: "02 — Xizmatlar",
    heading: "Biz nima qilamiz",
    lead: "Ko'chishni to'liq buyurtma qilishingiz yoki faqat o'zingiz shug'ullanmoqchi bo'lmagan qismini olishingiz mumkin.",
    detailsLabel: "Nimalar kiradi",
    factorsLabel: "Narxga nima ta'sir qiladi",
    cta: "Ko'chishimni hisoblash",
    expand: "Batafsil",
    collapse: "Yopish",
    items: [
      {
        id: "apartment",
        name: "Kvartira ko'chirish",
        summary:
          "Idishlarni o'rashdan yangi kvartirada shkafni yig'ishgacha — ko'chishni to'liq tashkil qilamiz.",
        forWhom: "Kvartira, uy yoki xonadan ko'chayotganlar uchun.",
        includes: [
          "Buyumlar, idish va kiyimlarni o'rash",
          "Mebelni ajratish va texnikani yechish",
          "Eshik, pol va liftni himoyalash",
          "Yuklash va tashish",
          "Yangi manzilda ko'tarish va tushirish",
          "Mebelni yig'ish va joy-joyiga qo'yish",
        ],
        factors: [
          "Xonalar soni va buyumlarning haqiqiy hajmi",
          "Qavat va ikkala tomonda lift bor-yo'qligi",
          "O'rash va mebelni ajratish kerakmi",
          "Manzillar orasidagi masofa",
        ],
        result:
          "Kechga borib yangi joyda tunaysiz: mebel yig'ilgan, texnika ulangan, qutilar siz aytgan joyda ochilgan.",
        imageAlt: "Yuk tashuvchilar kvartiradan o'ralgan mebelni olib chiqmoqda",
      },
      {
        id: "office",
        name: "Ofis ko'chirish",
        summary:
          "Ish vaqtidan tashqari ko'chiramiz, shunda ertalab xodimlar tayyor ish o'rniga o'tiradi.",
        forWhom:
          "Ofisini o'zgartirayotgan va to'xtab qolishga yo'l qo'ya olmaydigan kompaniyalar uchun.",
        includes: [
          "Menejer chiqishi va xonalar bo'yicha ko'chish rejasi",
          "Ish o'rinlari va qutilarni belgilash",
          "Ofis mebelini demontaj qilish va yig'ish",
          "Texnika va hujjatlarni alohida o'rash",
          "Seyf va og'ir uskunalarni tashish",
          "Yangi ofis rejasi bo'yicha joylashtirish",
        ],
        factors: [
          "Ish o'rinlari soni",
          "Texnika, server va hujjatlar hajmi",
          "Qavat va yuk lifti bor-yo'qligi",
          "Dam olish kuni yoki kechasi ko'chish",
        ],
        result:
          "Ofis dushanba kuni hech narsa bo'lmagandek ishlaydi — texnika joyida, hujjatlar aralashmagan.",
        imageAlt: "O'ralgan ofis texnikasi va belgilangan qutilar",
      },
      {
        id: "movers",
        name: "Yuk tashuvchilar xizmati",
        summary:
          "Takelaj bilan ishlaydigan tajribali yuk tashuvchilar — ko'chish, yuklash yoki xona ichida joyini o'zgartirish uchun.",
        forWhom:
          "Mashinasi bor, lekin og'irni ko'taradigan odami yo'qlar uchun.",
        includes: [
          "Liftsiz ko'tarish va tushirish",
          "Og'ir buyumlar takelaji",
          "Mashinani yuklash va bo'shatish",
          "Xona ichida mebel joyini o'zgartirish",
          "Qurilish chiqindilarini chiqarish",
        ],
        factors: [
          "Yuk tashuvchilar soni va soatlar",
          "Qavat va lift bor-yo'qligi",
          "Buyumlarning og'irligi va o'lchami",
        ],
        result:
          "Ishning og'ir qismi buni har kuni qiladigan odamlar tomonidan bajarilgan.",
        imageAlt: "Yuk tashuvchilar og'ir mebelni zinadan ko'tarmoqda",
      },
      {
        id: "freight",
        name: "Yuk tashish",
        summary:
          "Hajmingizga mos mashina — «Labo»dan furgongacha — Toshkent va viloyat bo'ylab.",
        forWhom:
          "Faqat tashish kerak bo'lganlar uchun: mebel, qurilish materiallari, tovar.",
        includes: [
          "Yuk hajmiga qarab mashina tanlash",
          "Yukni kuzovda mahkamlash",
          "Toshkent va viloyat bo'ylab tashish",
          "Kerak bo'lsa — yordamga yuk tashuvchilar",
        ],
        factors: [
          "Mashina turi va sig'imi",
          "Masofa va manzillar soni",
          "Yuk tashuvchilar kerakmi",
        ],
        result: "Yuk belgilangan vaqtda, butun holda yetib boradi.",
        imageAlt: "Profi Pereezd furgoni mahkamlangan yuk bilan",
      },
      {
        id: "furniture",
        name: "Mebelni ajratish va yig'ish",
        summary:
          "Eski joyda ajratamiz, yangisida yig'amiz — o'z asbobimiz bilan va furnitura yo'qotmasdan.",
        forWhom:
          "Kupe shkaf, karavot, oshxona va eshikdan butun holda o'tmaydigan hamma narsa uchun.",
        includes: [
          "Korpusli mebelni ajratish",
          "Furnitura imzolangan paketlarga solinadi",
          "Tashishda fasad va oynani himoyalash",
          "Yangi joyda yig'ish va eshiklarni rostlash",
        ],
        factors: [
          "Mebel turi va soni",
          "Konstruksiya murakkabligi (kupe, oshxona, stellaj)",
        ],
        result:
          "Yangi joydagi shkaf eskisidagidek yopiladi.",
        imageAlt: "Mutaxassis ko'chishdan oldin kupe shkafni ajratmoqda",
      },
      {
        id: "packing",
        name: "O'rash",
        summary:
          "Quti, plyonka va himoya materiallarini o'zimiz olib kelamiz va o'zimiz o'raymiz.",
        forWhom:
          "Quti qidirib, ishdan keyin kechqurun o'rash bilan shug'ullanmoqchi bo'lmaganlar uchun.",
        includes: [
          "Gofrokarton quti, stretch va pufakchali plyonka",
          "Idish va oynani alohida o'rash",
          "Yumshoq mebel va matraslar uchun g'ilof",
          "Qutilarni xonalar bo'yicha belgilash",
        ],
        factors: [
          "Buyumlar hajmi",
          "Mo'rt buyumlar ulushi — idish, oyna, texnika",
          "Yangi joyda ochib berish kerakmi",
        ],
        result:
          "Hech narsa sinmagan va yangi joyda qaysi quti qaysi xonaga ekani tushunarli.",
        imageAlt: "Idishlarni himoya plyonkasi va gofrokarton qutiga o'rash",
      },
      {
        id: "fragile",
        name: "Og'ir va mo'rt buyumlar",
        summary:
          "Pianino, seyf, stanok, akvarium, texnika va shunchaki ko'tarib bo'lmaydigan hamma narsa.",
        forWhom:
          "Oddiy brigada uchun buyumni yoki odamni shikastlash xavfi bo'lgan holatlar uchun.",
        includes: [
          "Og'irlik, o'lcham va chiqarish yo'lini oldindan baholash",
          "Takelaj uskunalari va tasmalar",
          "Korpus va burchaklarni ko'p qatlamli himoyalash",
          "Kuzovda alohida mahkamlash",
        ],
        factors: [
          "Buyum og'irligi va o'lchami",
          "Qavat, eshik va zinapoya kengligi",
          "Qo'shimcha takelaj kerakmi",
        ],
        result:
          "Buyum shikastsiz ko'chadi — zinapoyada improvizatsiyasiz.",
        imageAlt: "Og'ir buyumni tasmalar yordamida takelaj qilish",
      },
    ],
  },

  process: {
    label: "03 — Qanday ishlaymiz",
    heading: "Bitta qo'ng'iroq — qolganini biz tashkil qilamiz.",
    lead: "Mashina, yuk tashuvchilar va yig'uvchini bir-biri bilan muvofiqlashtirish sizning ishingiz emas. Bu bizniki.",
    imageAlt: "Profi Pereezd brigadasi ko'chish paytida ish jarayonida",
    steps: [
      {
        index: "01",
        title: "So'rov",
        text: "Qayerdan qayerga ko'chayotganingizni, necha xona va yirik narsalardan nima borligini ayting. Bu telefonda yoki Telegramda bir necha daqiqa oladi.",
      },
      {
        index: "02",
        title: "Baholash",
        text: "Hajm, mos mashina, yuk tashuvchilar soni va narxni aniqlaymiz. Hajm katta bo'lsa menejer kelib joyida ko'radi — bepul.",
      },
      {
        index: "03",
        title: "Ko'chish",
        text: "Brigada belgilangan vaqtda o'z o'rash materiallari va asbobi bilan keladi. O'raymiz, ajratamiz, eshiklarni himoyalaymiz, yuklaymiz va olib boramiz.",
      },
      {
        index: "04",
        title: "Tayyor",
        text: "Tushiramiz, mebelni yig'amiz, rejangiz bo'yicha joylashtiramiz va o'rash chiqindisini olib ketamiz. Ishni joyida qabul qilasiz.",
      },
    ],
  },

  benefits: {
    label: "04 — Bu siz uchun nima anglatadi",
    heading: "Nega biz bilan xotirjamroq",
    items: [
      {
        title: "Narxni oldindan qat'iylashtiramiz",
        text: "Hajmni tushunganimizdan so'ng, ish boshlanishidan oldin narxni aytamiz. Ko'chishdan keyin kutilmagan qo'shimcha to'lov paydo bo'lmasligi uchun.",
      },
      {
        title: "Himoya materiallaridan foydalanamiz",
        text: "Mebel, texnika va mo'rt buyumlar kuzovda «bor holicha» emas, plyonka, g'ilof va qutilarda ketadi.",
      },
      {
        title: "Butun jarayon uchun bitta jamoa javob beradi",
        text: "Mashina, yuk tashuvchi va yig'uvchini alohida qidirib, ularning grafigini kelishtirib o'tirish shart emas.",
      },
      {
        title: "Ehtiyotkorlik bilan ishlaymiz",
        text: "Pol, eshik, lift va mebel burchaklarini ko'tarish boshlanmasdan oldin himoyalaymiz.",
      },
      {
        title: "O'z vaqtida kelamiz",
        text: "Ko'chish vaqti va marshruti oldindan rejalashtiriladi, brigada yo'lga chiqishdan oldin qo'ng'iroq qiladi.",
      },
      {
        title: "Ajratganimizni yig'ib beramiz",
        text: "Furnitura yo'lda yo'qolmaydi: u imzolangan paketlarga solinadi va mebel bilan birga ketadi.",
      },
    ],
  },

  calculator: {
    label: "05 — Narx",
    heading: "Ko'chish narxini 30 soniyada bilib oling",
    lead: "To'rtta savolga javob bering. Menejer parametrlarni ko'rib chiqadi va aniq raqam bilan qo'ng'iroq qiladi — hajm tushunarli bo'lsa, chiqmasdan.",
    stepLabel: "Qadam",
    of: "dan",
    next: "Keyingisi",
    back: "Orqaga",
    skip: "O'tkazib yuborish",

    steps: {
      type: {
        title: "Nima ko'chadi?",
        options: [
          { id: "apartment", label: "Kvartira" },
          { id: "house", label: "Uy" },
          { id: "office", label: "Ofis" },
          { id: "freight", label: "Faqat yuk tashish" },
        ],
      },
      volume: {
        title: "Hajmi qanday?",
        hint: "Taxminan — hisob-kitobda aniqlashtiramiz.",
        optionsByType: {
          apartment: [
            { id: "studio", label: "Studiya / 1 xona" },
            { id: "2room", label: "2 xona" },
            { id: "3room", label: "3 xona" },
            { id: "4room", label: "4 xona va undan ko'p" },
          ],
          house: [
            { id: "small", label: "100 m² gacha" },
            { id: "medium", label: "100–200 m²" },
            { id: "large", label: "200 m² dan ko'p" },
          ],
          office: [
            { id: "upto10", label: "10 ta ish o'rnigacha" },
            { id: "upto30", label: "10–30 ta ish o'rni" },
            { id: "over30", label: "30 tadan ko'p ish o'rni" },
          ],
          freight: [
            { id: "labo", label: "Kam buyum — «Labo» yetadi" },
            { id: "van", label: "Mebel yoki yirik yuk — furgon kerak" },
            { id: "unknown", label: "Bilmayman, tanlashga yordam kerak" },
          ],
        },
      },
      route: {
        title: "Qayerdan qayerga?",
        fromLabel: "Qayerdan",
        toLabel: "Qayerga",
        placeholder: "Tumanni tanlang",
        floorFrom: "Qavat (qayerdan)",
        floorTo: "Qavat (qayerga)",
        liftYes: "Lift bor",
        liftNo: "Liftsiz",
        districts: [
          "Olmazor",
          "Bektemir",
          "Mirobod",
          "Mirzo Ulug'bek",
          "Sergeli",
          "Uchtepa",
          "Chilonzor",
          "Shayxontohur",
          "Yunusobod",
          "Yakkasaroy",
          "Yashnobod",
          "Shahar tashqarisi / viloyat",
        ],
      },
      extras: {
        title: "Yana nima kerak?",
        hint: "Bir nechtasini tanlash yoki o'tkazib yuborish mumkin.",
        options: [
          { id: "packing", label: "Buyumlarni o'rash" },
          { id: "disassembly", label: "Mebelni ajratish" },
          { id: "assembly", label: "Mebelni yig'ish" },
          { id: "heavy", label: "Og'ir buyumlar bor" },
          { id: "movers", label: "Yuk tashuvchilar kerak" },
          { id: "storage", label: "Vaqtinchalik saqlash kerak" },
        ],
      },
    },

    summary: {
      title: "Sizning ko'chishingiz",
      typeLabel: "Turi",
      volumeLabel: "Hajmi",
      routeLabel: "Marshrut",
      extrasLabel: "Qo'shimcha",
      extrasNone: "Qo'shimcha xizmatlarsiz",
      edit: "O'zgartirish",
    },

    noEstimate: {
      title: "Raqamingizni qoldiring — aniq hisoblaymiz",
      text: "Biz «bozordagi o'rtacha narx»ni ko'rsatmaymiz: u baribir sizning ko'chishingizga to'g'ri kelmaydi. Menejer parametrlaringizni ko'rib, aniq summani aytadi.",
    },
    withEstimate: {
      title: "Taxminiy narx",
      note: "Bu parametrlaringiz bo'yicha mo'ljal. Aniq summani menejer qisqa suhbatdan so'ng tasdiqlaydi.",
      from: "dan",
      to: "gacha",
      currency: "so'm",
    },
  },

  projects: {
    label: "06 — Ishlarimiz",
    heading: "Amalda bu qanday ko'rinadi",
    lead: "Jamoamizning Toshkentdagi haqiqiy ko'chishlari.",
    filters: {
      all: "Hammasi",
      apartment: "Kvartiralar",
      office: "Ofislar",
      freight: "Yuk tashish",
      furniture: "Mebel",
    },
    teamLabel: "mutaxassis",
    durationLabel: "soat",
    vehicleLabel: "mashina",
    items: [
      {
        id: "p1",
        category: "apartment",
        title: "Ikki xonali kvartira ko'chirish",
        note: "O'rash, mebelni ajratish, tashish va yangi joyda yig'ish.",
        route: null,
        duration: null,
        team: null,
        vehicles: null,
      },
      {
        id: "p2",
        category: "office",
        title: "Dam olish kunida ofis ko'chirish",
        note: "Ish o'rinlarini belgilash, texnika va hujjatlarni alohida o'rash.",
        route: null,
        duration: null,
        team: null,
        vehicles: null,
      },
      {
        id: "p3",
        category: "furniture",
        title: "Kupe shkafni ajratish va yig'ish",
        note: "Furnitura imzolangan paketlarda, eshiklar joyida rostlangan.",
        route: null,
        duration: null,
        team: null,
        vehicles: null,
      },
      {
        id: "p4",
        category: "apartment",
        title: "Liftsiz uydan ko'chish",
        note: "Eshik va zinapoyalarni himoyalash, og'ir mebel takelaji.",
        route: null,
        duration: null,
        team: null,
        vehicles: null,
      },
      {
        id: "p5",
        category: "freight",
        title: "Yirik gabaritli yukni tashish",
        note: "Hajm bo'yicha mashina tanlash, yukni kuzovda mahkamlash.",
        route: null,
        duration: null,
        team: null,
        vehicles: null,
      },
      {
        id: "p6",
        category: "office",
        title: "Texnika va uskunalarni tashish",
        note: "Ko'p qatlamli o'rash, alohida mahkamlash, ehtiyotkorona tushirish.",
        route: null,
        duration: null,
        team: null,
        vehicles: null,
      },
    ],
  },

  stats: {
    label: "07 — Tajriba",
    heading: "Buni har kuni o'n yildan beri qilamiz",
    lead: "Quyidagi raqamlar — biz tasdiqlay oladigan narsa: kompaniyaning ish muddati va bajarilgan ko'chishlar soni.",
    items: [
      {
        value: company.yearsOfExperience,
        suffix: "+",
        caption: "yil Toshkent bozorida",
      },
      {
        value: company.completedMoves,
        suffix: "+",
        caption: "bajarilgan ko'chish",
      },
      { value: 5, suffix: ",0", caption: "sharhlardagi o'rtacha baho" },
    ],
  },

  clients: {
    label: "08 — Mijozlar",
    heading: "Bizga jismoniy shaxslar ham, kompaniyalar ham ishonadi",
    note: "Biz bilan ko'chgan va o'zi haqida aytishga ruxsat bergan kompaniyalar.",
  },

  reviews: {
    label: "09 — Sharhlar",
    heading: "Ishimiz haqida eng yaxshi mijozlar aytadi",
    lead: "Sharhlar kompaniya saytida qoldirilgan. Biz ularda hech narsani o'zgartirmadik.",
    prev: "Oldingi sharh",
    next: "Keyingi sharh",
    ratingLabel: "Baho 5 dan 5",
    // Testimonials stay in the language they were written in — see file header.
    items: [
      {
        id: "grekova",
        author: "Грекова Анна",
        date: "11.09.2025",
        title: "Знаю точно, что буду советовать только эту компанию",
        text: "Хочу выразить огромную благодарность за слаженную работу и аккуратность. Очень вежливые весёлые ребята. Быстро всё разобрали, довезли, расставили. Впервые переезд был с таким комфортом и без капли нервов.",
        service: "Kvartira ko'chirish",
      },
      {
        id: "ubc",
        author: "UBC Group",
        date: "06.03.2025",
        title: "Скорость, аккуратность и дисциплина",
        text: "Работаем уже с командой profipereezd около года, профессионалы своего дела. Понимание и подход к клиенту на уровне. Главное качество — это скорость, аккуратность и дисциплина. Наша компания очень довольна!",
        service: "Ofis ko'chirish",
      },
      {
        id: "dagan",
        author: "Alexander Dagan",
        date: "09.06.2023",
        title: "Не самый большой переезд в моей жизни, но самый комфортный",
        text: "Парни позвонили за 10 минут до назначенного времени. Прибыли минута в минуту. Помогли закончить упаковку вещей. Это был не самый большой переезд в моей жизни, но безусловно самый комфортный. Я бы даже сказал идеальный.",
        service: "Kvartira ko'chirish",
      },
      {
        id: "khamzina",
        author: "Diana Khamzina",
        date: "02.05.2023",
        title: "Без каких-либо повреждений",
        text: "Вся мебель и техника офиса были перевезены максимально аккуратно, без каких-либо повреждений (а нам ведь ещё надо было их поднимать на 6 этаж по лестнице). Суперская работа, мы всем довольны.",
        service: "Ofis ko'chirish",
      },
      {
        id: "kalinichenko",
        author: "Max Kalinichenko",
        date: "09.06.2023",
        title: "Большой объём вещей перевезли меньше чем за 6 часов",
        text: "Ребята очень вежливые, профессионально выполняли поставленные задачи, помогли с отключением и подключением стиральной машины. Достаточно большой объём вещей перевезли менее чем за 6 часов!",
        service: "Kvartira ko'chirish",
      },
      {
        id: "akhtemov",
        author: "Сиёвуш Ахтемов",
        date: "30.04.2023",
        title: "Перевозка дорогого серверного оборудования",
        text: "Компания OOO Fintech Innovations выражает искреннюю благодарность за скрупулёзную и аккуратную перевозку вещей, мебели и, главное, очень дорогого серверного оборудования. Честно, не думал, что есть такой сервис в Ташкенте.",
        service: "Ofis ko'chirish",
      },
      {
        id: "tomin",
        author: "Alexandr Tomin",
        date: "15.07.2023",
        title: "Получил подробную консультацию заранее",
        text: "Я заранее связался с ними и получил подробную консультацию по всем вопросам, связанным с переездом. Менеджер был очень профессиональным и дружелюбным. В день переезда ребята прибыли вовремя.",
        service: "Kvartira ko'chirish",
      },
      {
        id: "ilhom",
        author: "Илхом ака",
        date: "02.05.2023",
        title: "Гап йўқ, профессионал йигитлар!",
        text: "Кўчиб кўрган инсонлар билади, қанчалик оғир меҳнат бир уйдан бошқа уйга кўчиш. «Профи переезд» гуруҳи йигитлари учун ишда ҳеч қандай муаммо бўлмас экан. Ўз ишининг усталари.",
        service: "Kvartira ko'chirish",
      },
    ],
  },

  faq: {
    label: "10 — Savollar",
    heading: "Ko'chishdan oldin odatda nima tashvishlantiradi",
    lead: "Eng ko'p so'raladigan savollarga qisqa javoblar.",
    items: [
      {
        q: "Agar mebel yoki texnikani shikastlantirsangiz-chi?",
        a: "Shuning uchun ko'tarishni boshlashdan oldin o'raymiz: mebelni plyonka va g'ilofga, texnikani alohida, burchak va eshiklarni himoya bilan yopamiz. Agar baribir bizning aybimiz bilan biror narsa shikastlansa — masalani ko'chishdan keyin emas, o'sha joyning o'zida siz bilan hal qilamiz.",
      },
      {
        q: "Brigada kelgandan keyin narx o'zgarmaydimi?",
        a: "Narxni haqiqiy hajmni tushunganimizdan keyin aytamiz — tavsif bo'yicha yoki menejerning bepul chiqishidan so'ng. Agar joyida oldindan aytilmagan narsa paydo bo'lmasa (qo'shimcha xona buyum, liftning yo'qligi, ikkinchi manzil), u o'zgarmaydi.",
      },
      {
        q: "Buyumlarni o'zingiz o'raysizmi?",
        a: "Ha. Quti, stretch va pufakchali plyonka, g'ilof va skotchni o'zimiz olib kelamiz va o'zimiz o'raymiz. Faqat o'rashni, qolgan ko'chishsiz ham buyurtma qilish mumkin.",
      },
      {
        q: "Muzlatgich, pianino yoki seyfni ko'chirish mumkinmi?",
        a: "Ha, bu alohida xizmat. Zinapoyada masala hal qilmaslik uchun og'irlik, o'lcham, qavat va eshik kengligini oldindan aniqlaymiz va kerakli takelaj bilan kelamiz.",
      },
      {
        q: "Kupe shkafni ajratib, yig'ib bera olasizmi?",
        a: "Ha, eski joyda ajratamiz va yangisida o'z asbobimiz bilan yig'amiz. Hech narsa yo'qolmasligi uchun furniturani imzolangan paketlarga solamiz va yig'ilgandan keyin eshiklarni rostlaymiz.",
      },
      {
        q: "Kechqurun va dam olish kunlari ishlaysizmi?",
        a: "Ha. Ofislar ko'pincha ish kunini yo'qotmaslik uchun aynan dam olish kunlari yoki kechasi ko'chadi. Vaqtni oldindan kelishamiz.",
      },
      {
        q: "Yuk tashuvchilarsiz, faqat mashina buyurtma qilsa bo'ladimi?",
        a: "Bo'ladi. Yuk hajmiga qarab mashina tanlaymiz. Lekin og'ir narsa bo'lsa, kamida ikkita yuk tashuvchi olish halolroq — bu deyarli har doim shikastlangan mebeldan arzonroq.",
      },
      {
        q: "Ko'chish qancha vaqt oladi?",
        a: "Shahar ichidagi standart 2 xonali kvartira — odatda bir ish kuni. Muddatga buyumlar hajmi, qavat, lift bor-yo'qligi va o'rash kerakligi ta'sir qiladi. Aniqrog'ini hajmni baholagandan keyin aytamiz.",
      },
      {
        q: "Menga kun bo'yi joyda bo'lish kerakmi?",
        a: "Yo'q. Boshida nima ketishini ko'rsatish uchun, yangi manzilda esa nimani qayerga qo'yishni aytish uchun bo'lsangiz yetarli. Qolganini brigada qiladi.",
      },
    ],
  },

  finalCta: {
    label: "11 — Keyingi qadam",
    heading: "Ko'chish ko'ringanidan ancha oson bo'lishi mumkin.",
    lead: "Nimani ko'chirish kerakligini ayting. Biz mos mashina, jamoa taklif qilamiz va narxni oldindan hisoblaymiz.",
    primary: "Bepul hisob-kitob olish",
    secondary: "Qo'ng'iroq qilish",
    telegram: "Telegramga yozish",
    whatsapp: "WhatsAppga yozish",
    phoneLabel: "Yoki shunchaki qo'ng'iroq qiling",
    imageAlt: "Yuklangan Profi Pereezd furgoni yo'lga tayyor",
  },

  modal: {
    title: "So'rov qoldirish",
    lead: "Ism va raqamingizni qoldiring — qo'ng'iroq qilamiz, tafsilotlarni aniqlaymiz va narxni hisoblaymiz. Bu bepul va hech qanday majburiyat yuklamaydi.",
    close: "Yopish",
  },

  form: {
    heading: "Hisob-kitob olish",
    lead: "Qo'ng'iroq qilamiz va bepul maslahat beramiz.",
    name: "Ism",
    namePlaceholder: "Sizga qanday murojaat qilaylik",
    phone: "Telefon",
    type: "Ko'chish turi",
    typePlaceholder: "Majburiy emas",
    comment: "Izoh",
    commentPlaceholder: "Oldindan bilish muhim bo'lgan narsa — majburiy emas",
    submit: "Hisob-kitob olish",
    submitting: "Yuborilmoqda…",
    privacy:
      "Tugmani bosish orqali siz shaxsiy ma'lumotlarni qayta ishlashga rozilik bildirasiz.",
    privacyLink: "Batafsil",
    honeypot: "Bu maydonni to'ldirmang",

    errors: {
      name: "Sizga qanday murojaat qilishni yozing",
      phone: "Raqamni +998 __ ___ __ __ formatida kiriting",
      network:
        "So'rovni yuborib bo'lmadi. Aloqani tekshirib, yana urinib ko'ring — kiritganingiz saqlanib qoldi.",
      server:
        "Server xatosi tufayli so'rov ketmadi. Bizga qo'ng'iroq qiling yoki Telegramga yozing — darhol javob beramiz.",
    },

    success: {
      title: "Rahmat! So'rovingizni oldik.",
      text: "Menejer siz bilan tez orada bog'lanadi.",
      telegramCta: "Telegramga yozish",
      again: "Yana bitta so'rov yuborish",
    },
  },

  footer: {
    tagline:
      "Toshkentda kvartira va ofis ko'chirish, yuk tashuvchilar, yuk tashish va mebel yig'ish.",
    servicesTitle: "Xizmatlar",
    companyTitle: "Kompaniya",
    contactTitle: "Kontaktlar",
    hoursLabel: "Ish vaqti",
    cityLabel: "Shahar",
    privacy: "Maxfiylik siyosati",
    rights: "Barcha huquqlar himoyalangan.",
    backToTop: "Yuqoriga",
  },

  common: {
    call: "Qo'ng'iroq",
    calculate: "Hisoblash",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    phone: "Telefon",
    email: "Pochta",
    close: "Yopish",
    required: "majburiy maydon",
  },
};
