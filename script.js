// 스크롤 진행률 및 현재 섹션 활성화 (쓰로틀링 적용)
const scrollProgress = document.getElementById("scrollProgress");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

let isTicking = false;

function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;

    let currentSection = "home";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (scrollTop >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
}

window.addEventListener("scroll", () => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            isTicking = false;
        });
        isTicking = true;
    }
});

// 모바일 메뉴 토글
navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

// ESC 키로 모바일 메뉴 닫기
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    }
});

// Contact 폼 유효성 검사 및 알림
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const toast = document.getElementById("toast");

let toastTimer;
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameVal) {
        nameError.textContent = "이름을 입력해 주세요.";
        isValid = false;
    }

    if (!emailVal) {
        emailError.textContent = "이메일을 입력해 주세요.";
        isValid = false;
    } else if (!emailPattern.test(emailVal)) {
        emailError.textContent = "올바른 이메일 형식을 입력해 주세요.";
        isValid = false;
    }

    if (!messageVal) {
        messageError.textContent = "메시지를 입력해 주세요.";
        isValid = false;
    }

    if (isValid) {
        showToast(`${nameVal}님, 메시지가 성공적으로 전송되었습니다!`);
        contactForm.reset();
    }
});
