const phone = "919718499919";

// Paste your Google Apps Script Web App URL here (from Deploy > New deployment)
const SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwTLYvLT4PxYBsSORB_OORr5461yox6_GeUeJV2ekhdO7eve-WpPsy1LSy-jJ4_U_8OCg/exec";

function sendToSheet(data) {
  if (!SHEET_WEBAPP_URL || SHEET_WEBAPP_URL === "PASTE_YOUR_WEB_APP_URL_HERE") return;
  fetch(SHEET_WEBAPP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data)
  }).catch(() => {});
}

document.addEventListener("contextmenu", e => e.preventDefault());

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

document.querySelectorAll(".quote-course").forEach(btn => {
  btn.addEventListener("click", () => {
    const select = document.querySelector('#quoteForm select[name="course"]');
    select.value = btn.dataset.course;
    document.querySelector("#quote").scrollIntoView({behavior:"smooth"});
  });
});

function openWhatsApp(message) {
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

function showSuccess(id) {
  const el = document.querySelector(id);
  if (!el) return;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 5000);
}

function formValue(form, name) {
  return form.querySelector(`[name="${name}"]`)?.value.trim() || "Not specified";
}

document.querySelector("#registrationForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.currentTarget;
  sendToSheet({
    type: "Registration",
    name: formValue(f,"name"),
    phone: formValue(f,"phone"),
    course: formValue(f,"course"),
    category: formValue(f,"category"),
    mode: formValue(f,"mode"),
    timing: formValue(f,"timing"),
    message: formValue(f,"message")
  });
  const message =
`Hello Raza Classes,
I want to register for a course.

Student Name: ${formValue(f,"name")}
Phone: ${formValue(f,"phone")}
Course: ${formValue(f,"course")}
Category: ${formValue(f,"category")}
Mode: ${formValue(f,"mode")}
Preferred Timing: ${formValue(f,"timing")}
Message: ${formValue(f,"message")}

Note: Your response has already been sent to the Raza Classes website. This is a direct message for a fast service response. Thank you!`;
  openWhatsApp(message);
  f.reset();
  showSuccess("#regSuccess");
});

document.querySelector("#quoteForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.currentTarget;
  sendToSheet({
    type: "Quote",
    name: formValue(f,"name"),
    phone: formValue(f,"phone"),
    course: formValue(f,"course"),
    message: formValue(f,"message")
  });
  const message =
`Hello Raza Classes,
I want a course fee quote.

Name: ${formValue(f,"name")}
Phone: ${formValue(f,"phone")}
Course: ${formValue(f,"course")}
Requirement: ${formValue(f,"message")}

Note: Your response has already been sent to the Raza Classes website. This is a direct message for a fast service response. Thank you!`;
  openWhatsApp(message);
  f.reset();
  showSuccess("#quoteSuccess");
});

document.querySelector("#year").textContent = new Date().getFullYear();
