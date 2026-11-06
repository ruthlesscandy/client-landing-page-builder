// ✏️ EDIT THIS FILE to add your business details. Replace the sample text and image links.
// Keep the quotation marks and commas. Use full links beginning with https:// for images and socials.
const business = {
  name: "Your Business",
  tagline: "A neighbourhood favourite",
  headline: "Good food.\nGood company.",
  description: "A warm, welcoming place for something delicious. Add a short sentence here about what makes your business special.",
  heroImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85",
  heroImageAlt: "A welcoming restaurant dining room",
  imageNote: "Made fresh, shared together",
  aboutTitle: "A place to slow down and enjoy.",
  about: "Tell your story here: what you do, where you are, and what you want customers to know. Keep it friendly and personal.",
  menuTitle: "A few favourites",
  menuNote: "Ask us about today's specials.",
  menu: [
    { name: "House favourite", description: "Add a short, appetizing description of this item.", price: "$14" },
    { name: "Something seasonal", description: "Describe the ingredients or what makes it special.", price: "$16" },
    { name: "A little treat", description: "Add another popular item, drink, or service.", price: "$8" }
  ],
  galleryTitle: "A taste of the day",
  photos: [
    { url: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80", alt: "Freshly prepared dish" },
    { url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80", alt: "Food ready to share" },
    { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80", alt: "Inside the restaurant" }
  ],
  updatesTitle: "The latest",
  updates: [
    { date: "Your update date", title: "Share what's new", text: "Add a special, event, new product, holiday hours, or other news here." }
  ],
  contactTitle: "We'd love to see you.",
  contactText: "Drop by, give us a call, or follow us online.",
  address: "Add your street address, city",
  phoneDisplay: "(555) 123-4567",
  phoneLink: "+15551234567",
  hours: "Hours: Add your opening days and times",
  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "Facebook", url: "https://facebook.com/" }
  ]
};

const byId = (id) => document.getElementById(id);
const safeText = (value) => String(value ?? "");

document.title = business.name;
byId("brand-name").textContent = business.name;
byId("footer-name").textContent = `© ${new Date().getFullYear()} ${business.name}`;
byId("hero-eyebrow").textContent = business.tagline;
byId("hero-title").textContent = business.headline;
byId("hero-description").textContent = business.description;
byId("hero-image").src = business.heroImage;
byId("hero-image").alt = business.heroImageAlt;
byId("image-note").textContent = business.imageNote;
byId("about-title").textContent = business.aboutTitle;
byId("about-copy").textContent = business.about;
byId("menu-title").textContent = business.menuTitle;
byId("menu-note").textContent = business.menuNote;
byId("gallery-title").textContent = business.galleryTitle;
byId("updates-title").textContent = business.updatesTitle;
byId("contact-title").textContent = business.contactTitle;
byId("contact-copy").textContent = business.contactText;
byId("address").textContent = business.address;
byId("hours").textContent = business.hours;

byId("menu-list").innerHTML = business.menu.map((item) => `
  <article class="menu-item"><div class="menu-item-top"><h3>${safeText(item.name)}</h3><span>${safeText(item.price)}</span></div><p>${safeText(item.description)}</p></article>
`).join("");

byId("gallery-grid").innerHTML = business.photos.map((photo) => `
  <img src="${safeText(photo.url)}" alt="${safeText(photo.alt)}" loading="lazy">
`).join("");

byId("updates-list").innerHTML = business.updates.map((update) => `
  <article class="update"><p class="update-date">${safeText(update.date)}</p><div><h3>${safeText(update.title)}</h3><p>${safeText(update.text)}</p></div></article>
`).join("");

const phone = byId("phone");
phone.href = `tel:${business.phoneLink}`;
phone.textContent = business.phoneDisplay;
byId("social-links").innerHTML = business.socials.map((social) => `
  <a href="${safeText(social.url)}" target="_blank" rel="noopener noreferrer">${safeText(social.label)} <span aria-hidden="true">↗</span></a>
`).join("");
