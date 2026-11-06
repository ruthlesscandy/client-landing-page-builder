// The sample content below is used until you edit the page in the visual editor.
const business = {
  name: "Your Business", tagline: "A neighbourhood favourite", headline: "Good food.\nGood company.",
  description: "A warm, welcoming place for something delicious. Add a short sentence here about what makes your business special.",
  heroImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85", heroImageAlt: "A welcoming restaurant dining room", imageNote: "Made fresh, shared together",
  aboutTitle: "A place to slow down and enjoy.", about: "Tell your story here: what you do, where you are, and what you want customers to know. Keep it friendly and personal.",
  menuTitle: "A few favourites", menuNote: "Ask us about today's specials.",
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
  updatesTitle: "The latest", updates: [{ date: "Your update date", title: "Share what's new", text: "Add a special, event, new product, holiday hours, or other news here." }],
  contactTitle: "We'd love to see you.", contactText: "Drop by, give us a call, or follow us online.", address: "Add your street address, city", phoneDisplay: "(555) 123-4567", phoneLink: "+15551234567",
  hours: "Hours: Add your opening days and times", socials: [{ label: "Instagram", url: "https://instagram.com/" }, { label: "Facebook", url: "https://facebook.com/" }]
};

const STORE_KEY = "easy-business-page-v1";
const byId = (id) => document.getElementById(id);
const text = (value) => String(value ?? "");

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

for (const item of business.menu) {
  const article = document.createElement("article");
  article.className = "menu-item";
  article.innerHTML = '<div class="menu-item-top"><h3></h3><span></span></div><p></p>';
  article.querySelector("h3").textContent = item.name;
  article.querySelector("span").textContent = item.price;
  article.querySelector("p").textContent = item.description;
  byId("menu-list").append(article);
}
for (const photo of business.photos) {
  const image = document.createElement("img");
  image.src = photo.url;
  image.alt = photo.alt;
  image.loading = "lazy";
  byId("gallery-grid").append(image);
}
for (const update of business.updates) {
  const article = document.createElement("article");
  article.className = "update";
  article.innerHTML = '<p class="update-date"></p><div><h3></h3><p></p></div>';
  article.querySelector(".update-date").textContent = update.date;
  article.querySelector("h3").textContent = update.title;
  article.querySelector("div p").textContent = update.text;
  byId("updates-list").append(article);
}
const phone = byId("phone");
phone.href = `tel:${business.phoneLink}`;
phone.textContent = business.phoneDisplay;
for (const social of business.socials) {
  const link = document.createElement("a");
  link.href = social.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.append(document.createTextNode(social.label + " "));
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  link.append(arrow);
  byId("social-links").append(link);
}

// Restore this browser's saved page, if there is one.
try {
  const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
  if (saved?.main) byId("page-main").innerHTML = saved.main;
  if (saved?.footer) document.querySelector("footer").innerHTML = saved.footer;
} catch (error) {
  console.warn("Could not load the saved page.", error);
}

const editor = document.querySelector(".editor");
const main = document.querySelector("main");
const toggle = byId("edit-toggle");
const tools = byId("editor-tools");
const status = byId("save-status");
let editing = false;
let draggedSection = null;
let imageTarget = null;

function pageSnapshot() {
  const mainCopy = main.cloneNode(true);
  mainCopy.querySelectorAll("[contenteditable], [draggable]").forEach((el) => {
    el.removeAttribute("contenteditable");
    el.removeAttribute("draggable");
  });
  const footerCopy = document.querySelector("footer").cloneNode(true);
  footerCopy.querySelectorAll("[contenteditable]").forEach((el) => el.removeAttribute("contenteditable"));
  return { main: mainCopy.innerHTML, footer: footerCopy.innerHTML };
}
function savePage(message = "Saved in this browser. Changes stay on this device and browser.") {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(pageSnapshot()));
    status.textContent = message;
  } catch (error) {
    status.textContent = "Could not save. Try using smaller photos.";
  }
}
function setEditing(value) {
  editing = value;
  document.body.classList.toggle("is-editing", editing);
  tools.hidden = !editing;
  toggle.textContent = editing ? "Done editing" : "✏️ Edit this page";
  main.querySelectorAll("p, h1, h2, h3, .menu-item-top span, .image-note, .social-links a").forEach((el) => {
    if (!el.closest(".hero-actions")) el.contentEditable = editing ? "true" : "false";
  });
  document.querySelectorAll("footer span").forEach((el) => { el.contentEditable = editing ? "true" : "false"; });
  main.querySelectorAll("section").forEach((section) => { section.draggable = editing; });
  status.textContent = editing ? "Click text to edit. Click a photo to change it. Drag sections using the ⋮⋮ handle." : "Changes save in this browser.";
}
toggle.addEventListener("click", () => setEditing(!editing));
byId("save-page").addEventListener("click", () => savePage());

main.addEventListener("input", () => { if (editing) savePage("Saved automatically in this browser."); });
document.querySelector("footer").addEventListener("input", () => { if (editing) savePage("Saved automatically in this browser."); });

main.addEventListener("click", (event) => {
  if (!editing) return;
  const image = event.target.closest("img");
  if (image) {
    event.preventDefault();
    imageTarget = image;
    byId("image-picker").click();
    return;
  }
  const socialLink = event.target.closest(".social-links a");
  if (socialLink) {
    event.preventDefault();
    const nextUrl = prompt("Paste this social page's web address:", socialLink.href);
    if (nextUrl) { socialLink.href = nextUrl; savePage("Social link saved in this browser."); }
  }
});

byId("image-picker").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file || !imageTarget) return;
  try {
    const dataUrl = await resizeImage(file);
    imageTarget.src = dataUrl;
    savePage("Photo saved in this browser.");
  } catch (error) {
    status.textContent = "That photo could not be loaded. Try another image.";
  }
  event.target.value = "";
});
function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const scale = Math.min(1, 1400 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

main.addEventListener("dragstart", (event) => {
  if (!editing) return;
  const section = event.target.closest("section");
  if (!section) return;
  draggedSection = section;
  section.classList.add("being-dragged");
  event.dataTransfer.effectAllowed = "move";
});
main.addEventListener("dragover", (event) => {
  if (!editing || !draggedSection) return;
  event.preventDefault();
  const target = event.target.closest("main > section");
  if (!target || target === draggedSection) return;
  const box = target.getBoundingClientRect();
  main.insertBefore(draggedSection, event.clientY < box.top + box.height / 2 ? target : target.nextSibling);
});
main.addEventListener("dragend", () => {
  if (draggedSection) draggedSection.classList.remove("being-dragged");
  draggedSection = null;
  if (editing) savePage("Section order saved in this browser.");
});

byId("add-menu").addEventListener("click", () => {
  const name = prompt("What is the menu item called?");
  if (!name) return;
  const description = prompt("Add a short description:") || "";
  const price = prompt("Add its price (optional):") || "";
  const article = document.createElement("article");
  article.className = "menu-item";
  article.innerHTML = '<div class="menu-item-top"><h3></h3><span></span></div><p></p>';
  article.querySelector("h3").textContent = name;
  article.querySelector("span").textContent = price;
  article.querySelector("p").textContent = description;
  byId("menu-list").append(article);
  setEditing(true);
  savePage("Menu item added and saved in this browser.");
});
byId("add-update").addEventListener("click", () => {
  const title = prompt("What is the update about?");
  if (!title) return;
  const date = prompt("Date or short label:") || "Latest update";
  const detail = prompt("Write the update:") || "";
  const article = document.createElement("article");
  article.className = "update";
  article.innerHTML = '<p class="update-date"></p><div><h3></h3><p></p></div>';
  article.querySelector(".update-date").textContent = date;
  article.querySelector("h3").textContent = title;
  article.querySelector("div p").textContent = detail;
  byId("updates-list").prepend(article);
  setEditing(true);
  savePage("Update added and saved in this browser.");
});
byId("reset-page").addEventListener("click", () => {
  if (!confirm("Reset this page to the original sample? Your saved edits and photos in this browser will be removed.")) return;
  localStorage.removeItem(STORE_KEY);
  location.reload();
});
