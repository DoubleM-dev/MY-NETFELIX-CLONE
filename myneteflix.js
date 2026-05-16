// ─── EMAIL VALIDATION
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ─── TOAST NOTIFICATION 
function showToast(msg, color) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.background = color || "#e50914";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ─── GET STARTED BUTTON 
function handleGetStarted() {
  const heroInput = document.getElementById("heroEmail");
  const faqInput = document.getElementById("faqEmail");
  const active = document.activeElement;

  // Figure out which input was most recently used
  let email = "";
  if (active === faqInput || faqInput.value.trim()) {
    email = faqInput.value.trim();
  } else {
    email = heroInput.value.trim();
  }

  if (!email) {
    showToast("Please enter your email address.", "#e50914");
    heroInput.focus();
    return;
  }

  if (!isValidEmail(email)) {
    showToast("Please enter a valid email address.", "#e50914");
    return;
  }

  showToast("🎉 Welcome! Redirecting to sign up...", "#157f1f");

  // Simulate redirect after a short delay
  setTimeout(() => {
    alert(`Creating your Netflix account for: ${email}`);
  }, 1800);
}

// ─── FAQ ACCORDION 
function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  const isOpen = item.classList.contains("open");

  // Close all open items first
  document.querySelectorAll(".faq-item.open").forEach((openItem) => {
    openItem.classList.remove("open");
  });

  // If it wasn't open, open it now
  if (!isOpen) {
    item.classList.add("open");
  }
}

// ─── TRENDING SCROLL 
function scrollTrending(direction) {
  const track = document.getElementById("trendingTrack");
  const scrollAmount = 480;
  track.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

// ─── NAVBAR: BACKGROUND ON SCROLL
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.style.background = "rgba(0,0,0,0.97)";
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.5)";
  } else {
    navbar.style.background = "";
    navbar.style.boxShadow = "";
  }
});

// ─── HERO EMAIL: ENTER KEY SUPPORT 
document.getElementById("heroEmail").addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleGetStarted();
});
document.getElementById("faqEmail").addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleGetStarted();
});

// ─── TRENDING CARDS: HOVER LABEL
document.querySelectorAll(".movie-card").forEach((card, i) => {
  const titles = [
    "Squid Game",
    "Wednesday",
    "Stranger Things",
    "The Crown",
    "Bridgerton",
    "Money Heist",
    "Ozark",
    "The Witcher",
    "Dark",
    "Narcos",
  ];

  // Build a small tooltip that appears on hover
  const tooltip = document.createElement("div");
  tooltip.className = "card-tooltip";
  tooltip.textContent = titles[i] || `Title ${i + 1}`;
  card.appendChild(tooltip);

  card.addEventListener("mouseenter", () => tooltip.classList.add("visible"));
  card.addEventListener("mouseleave", () =>
    tooltip.classList.remove("visible"),
  );
});

// ─── SMOOTH SECTION REVEAL ON SCROLL
const revealEls = document.querySelectorAll(
  ".reason-card, .faq-item, .section-title",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => {
  el.classList.add("hidden-start");
  observer.observe(el);
});
