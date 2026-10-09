import { company } from "./company";
import type { Locale } from "./index";

/**
 * Privacy policy.
 * ─────────────────────────────────────────────────────────────────────────
 * Kept out of the main dictionaries because it is a legal document, not sales
 * copy, and because it is the one page whose wording should be reviewed by
 * someone other than a developer.
 *
 * It exists because the lead form links to it. Shipping a form that promises a
 * privacy policy and then 404s is both a bad look and a genuine compliance
 * problem, so this describes accurately and minimally what the site really
 * does: it collects a name and a phone number and sends them to the company's
 * Telegram. Nothing here claims a certification, a registry entry or a
 * retention policy the business has not actually adopted.
 *
 * TODO(client): have this reviewed against O'zbekiston's «Персональные данные»
 * law (ЗРУ-547) and add the operator's legal entity name and registration
 * details once confirmed.
 */

type PrivacySection = { heading: string; body: string[] };
type PrivacyDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
  back: string;
};

/** TODO(client): update when the text is next revised. */
const UPDATED = "10.08.2026";

const ru: PrivacyDoc = {
  title: "Политика конфиденциальности",
  updated: `Обновлено: ${UPDATED}`,
  intro: `Эта страница объясняет, какие данные собирает сайт ${company.siteUrl.replace("https://", "")}, зачем они нужны и что с ними происходит дальше.`,
  back: "Вернуться на главную",
  sections: [
    {
      heading: "Какие данные мы собираем",
      body: [
        "Через формы на сайте мы получаем только то, что вы вводите сами: имя, номер телефона и, если вы их заполнили, комментарий и параметры переезда из калькулятора.",
        "Мы не запрашиваем паспортные данные, адрес проживания, платёжную информацию и не собираем ничего, что вы не ввели в форму.",
      ],
    },
    {
      heading: "Зачем они нужны",
      body: [
        "Единственная цель — связаться с вами, рассчитать стоимость переезда и согласовать детали заказа.",
        "Мы не используем ваш номер для рассылок и не передаём его третьим лицам для рекламы.",
      ],
    },
    {
      heading: "Куда они передаются",
      body: [
        "Заявка отправляется в рабочий чат нашей компании в Telegram, где её видят только менеджеры, обрабатывающие заказы. Передача происходит по защищённому соединению.",
        "Мы не продаём и не публикуем контактные данные клиентов.",
      ],
    },
    {
      heading: "Аналитика и файлы cookie",
      body: [
        "Сайт может использовать сервисы веб-аналитики для подсчёта посещений и оценки эффективности рекламы. Эти сервисы работают с обезличенными данными о поведении на сайте и не получают ваше имя или телефон.",
        "Вы можете ограничить сбор таких данных в настройках вашего браузера.",
      ],
    },
    {
      heading: "Сколько мы храним данные",
      body: [
        "Заявки хранятся столько, сколько нужно для обработки заказа и последующей связи по нему.",
      ],
    },
    {
      heading: "Ваши права",
      body: [
        `Вы можете в любой момент попросить удалить ваши данные или уточнить, какие сведения о вас у нас есть. Для этого напишите на ${company.email.display} или позвоните по номеру ${company.phone.display}.`,
      ],
    },
    {
      heading: "Согласие",
      body: [
        "Отправляя форму на сайте, вы подтверждаете, что ознакомились с этой страницей и согласны на обработку указанных вами данных в описанных здесь целях.",
      ],
    },
  ],
};

const uz: PrivacyDoc = {
  title: "Maxfiylik siyosati",
  updated: `Yangilangan: ${UPDATED}`,
  intro: `Bu sahifa ${company.siteUrl.replace("https://", "")} sayti qanday ma'lumotlarni to'plashini, ular nima uchun kerakligini va keyin ular bilan nima bo'lishini tushuntiradi.`,
  back: "Bosh sahifaga qaytish",
  sections: [
    {
      heading: "Qanday ma'lumotlarni to'playmiz",
      body: [
        "Saytdagi shakllar orqali biz faqat siz o'zingiz kiritgan ma'lumotni olamiz: ism, telefon raqami va, agar to'ldirgan bo'lsangiz, izoh hamda kalkulyatordagi ko'chish parametrlari.",
        "Biz pasport ma'lumotlari, yashash manzili yoki to'lov ma'lumotlarini so'ramaymiz va siz shaklga kiritmagan hech narsani to'plamaymiz.",
      ],
    },
    {
      heading: "Ular nima uchun kerak",
      body: [
        "Yagona maqsad — siz bilan bog'lanish, ko'chish narxini hisoblash va buyurtma tafsilotlarini kelishish.",
        "Raqamingizni tarqatma xabarlar uchun ishlatmaymiz va reklama maqsadida uchinchi shaxslarga bermaymiz.",
      ],
    },
    {
      heading: "Ular qayerga uzatiladi",
      body: [
        "So'rov kompaniyamizning Telegramdagi ishchi chatiga yuboriladi, uni faqat buyurtmalarni qayta ishlaydigan menejerlar ko'radi. Uzatish himoyalangan ulanish orqali amalga oshiriladi.",
        "Biz mijozlarning kontakt ma'lumotlarini sotmaymiz va e'lon qilmaymiz.",
      ],
    },
    {
      heading: "Analitika va cookie fayllari",
      body: [
        "Sayt tashriflarni hisoblash va reklama samaradorligini baholash uchun veb-analitika xizmatlaridan foydalanishi mumkin. Bu xizmatlar saytdagi xatti-harakatlar haqidagi shaxssizlantirilgan ma'lumotlar bilan ishlaydi va sizning ismingiz yoki telefoningizni olmaydi.",
        "Bunday ma'lumotlar to'planishini brauzeringiz sozlamalarida cheklashingiz mumkin.",
      ],
    },
    {
      heading: "Ma'lumotlarni qancha saqlaymiz",
      body: [
        "So'rovlar buyurtmani qayta ishlash va u bo'yicha keyingi aloqa uchun zarur bo'lgan muddat davomida saqlanadi.",
      ],
    },
    {
      heading: "Sizning huquqlaringiz",
      body: [
        `Istalgan vaqtda ma'lumotlaringizni o'chirishni so'rashingiz yoki sizda qanday ma'lumot borligini aniqlashtirishingiz mumkin. Buning uchun ${company.email.display} manziliga yozing yoki ${company.phone.display} raqamiga qo'ng'iroq qiling.`,
      ],
    },
    {
      heading: "Rozilik",
      body: [
        "Saytdagi shaklni yuborish orqali siz ushbu sahifa bilan tanishganingizni va ko'rsatilgan ma'lumotlaringiz shu yerda tavsiflangan maqsadlarda qayta ishlanishiga rozi ekanligingizni tasdiqlaysiz.",
      ],
    },
  ],
};

const docs: Record<Locale, PrivacyDoc> = { ru, uz };

export function getPrivacy(locale: Locale): PrivacyDoc {
  return docs[locale];
}
