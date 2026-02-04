// ===== WEDDING WEBSITE JAVASCRIPT =====
// Manuel & Andrea - 17 de Noviembre, 2026

// ===== CONFIGURACIÓN INICIAL =====
const weddingDate = new Date('2026-11-17T17:00:00').getTime();
let isPlaying = false;
let countdownInterval = null;
let animationFrameId = null;

// ===== UTILITY FUNCTIONS =====

// Optimized throttle function
function throttle(func, wait) {
  let timeout = null;
  let previous = 0;

  return function executedFunction(...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}

// Debounce function for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== NAVIGATION =====
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const scrollTopBtn = document.getElementById("scrollTop");

// Toggle mobile menu
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when clicking on link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navToggle && navMenu) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// Optimized scroll handler
const handleScroll = throttle(() => {
  const scrollY = window.scrollY;

  // Navbar scroll effect
  if (navbar) {
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Show/hide scroll to top button
  if (scrollTopBtn) {
    if (scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }

  // Update active navigation link
  updateActiveLink();
}, 100);

window.addEventListener("scroll", handleScroll, { passive: true });

// Scroll to top
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Active link on scroll
const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -80px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add small delay before activating animation
      requestAnimationFrame(() => {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 100);
      });

      // Unobserve after animation to improve performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// ===== COUNTDOWN TIMER (OPTIMIZED) =====
const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

let previousValues = {
  days: -1,
  hours: -1,
  minutes: -1,
  seconds: -1,
};

// Optimized countdown update using requestAnimationFrame
function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  if (distance < 0) {
    // Wedding day has arrived
    const countdownContainer = document.getElementById("countdown");
    if (countdownContainer) {
      countdownContainer.innerHTML =
        '<div class="countdown-finished" style="padding: 2rem;"><p class="countdown-title" style="margin-bottom: 1rem;">¡El gran día ha llegado!</p><p style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-text-light);">Gracias por acompañarnos en este momento especial</p></div>';
    }
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    return;
  }

  // Calculate time units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update digits with animation
  updateCountdownDigit("days", days);
  updateCountdownDigit("hours", hours);
  updateCountdownDigit("minutes", minutes);
  updateCountdownDigit("seconds", seconds);
}

// Optimized digit update with flip animation
function updateCountdownDigit(id, newValue) {
  const element = countdownElements[id];
  if (!element) return;

  const currentValue = previousValues[id];

  if (currentValue !== newValue) {
    // Add flip animation class
    element.classList.add("flip");

    // Update value at animation midpoint
    setTimeout(() => {
      const formattedValue =
        newValue < 10 ? "0" + newValue : newValue.toString();
      element.textContent = formattedValue;
    }, 300);

    // Remove animation class
    setTimeout(() => {
      element.classList.remove("flip");
    }, 600);

    previousValues[id] = newValue;
  }
}

// Initialize countdown
updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);

// ===== MUSIC BUTTON =====
const musicBtn = document.getElementById("musicBtn");

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      musicBtn.classList.add("playing");
      // Here you would connect the actual audio player
      // const audio = document.getElementById('weddingMusic');
      // audio.play();
    } else {
      musicBtn.classList.remove("playing");
      // audio.pause();
    }
  });
}

// ===== SLIDER DOTS INTERACTION =====
const dots = document.querySelectorAll(".dot");

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    dots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
    // Here you would change the slider image
  });
});

// Auto-rotate slider (optional)
let currentSlide = 0;

function rotateSlider() {
  if (dots.length === 0) return;
  currentSlide = (currentSlide + 1) % dots.length;
  dots.forEach((d) => d.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

// Uncomment to enable auto-rotate every 5 seconds
// setInterval(rotateSlider, 5000);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== PRELOAD ANIMATIONS =====
window.addEventListener("load", () => {
  // Activate animations after brief delay
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 300);
  });
});

// ===== PERFORMANCE OPTIMIZATION =====

// Handle window resize
const handleResize = debounce(() => {
  // Add any resize-specific logic here
  // For example, recalculate layouts or update responsive elements
}, 250);

window.addEventListener("resize", handleResize, { passive: true });

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

// ===== ACCESSIBILITY IMPROVEMENTS =====

// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

if (prefersReducedMotion.matches) {
  // Disable or reduce animations for users who prefer reduced motion
  document.documentElement.style.setProperty("--transition-fast", "0.05s");
  document.documentElement.style.setProperty("--transition-base", "0.1s");
  document.documentElement.style.setProperty("--transition-slow", "0.15s");
}

// ===== CONSOLE LOG =====
console.log("🎉 Invitación de boda cargada exitosamente");
console.log("📅 Fecha de la boda: 17 de Noviembre, 2026");
console.log("⏰ Hora: 5:00 PM");
