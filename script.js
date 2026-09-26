const phone = "919718499919";

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

function formValue(form, name) {
  return form.querySelector(`[name="${name}"]`)?.value.trim() || "Not specified";
}

document.querySelector("#registrationForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.currentTarget;
  const message =
`Hello Raza Classes,
I want to register for a course.

Student Name: ${formValue(f,"name")}
Phone: ${formValue(f,"phone")}
Course: ${formValue(f,"course")}
Category: ${formValue(f,"category")}
Mode: ${formValue(f,"mode")}
Preferred Timing: ${formValue(f,"timing")}
Message: ${formValue(f,"message")}`;
  openWhatsApp(message);
});

document.querySelector("#quoteForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.currentTarget;
  const message =
`Hello Raza Classes,
I want a course fee quote.

Name: ${formValue(f,"name")}
Phone: ${formValue(f,"phone")}
Course: ${formValue(f,"course")}
Requirement: ${formValue(f,"message")}`;
  openWhatsApp(message);
});

document.querySelector("#year").textContent = new Date().getFullYear();
