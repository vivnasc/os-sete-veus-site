/**
 * Os 7 Véus - PWA Main JavaScript
 */

// =============================================
// SERVICE WORKER REGISTRATION
// =============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/pwa/sw.js');
            console.log('Service Worker registado com sucesso:', registration.scope);

            // Verificar atualizações
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // Nova versão disponível
                        showUpdateNotification();
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao registar Service Worker:', error);
        }
    });
}

// =============================================
// APP INSTALL PROMPT
// =============================================
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installBtn = document.getElementById('installBtn');
const dismissBtn = document.getElementById('dismissBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir o prompt automático
    e.preventDefault();
    deferredPrompt = e;

    // Verificar se já foi dismissed recentemente
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) {
        return; // Não mostrar se foi dismissed nos últimos 7 dias
    }

    // Mostrar o nosso prompt personalizado
    setTimeout(() => {
        installPrompt.classList.add('show');
    }, 3000);
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;

        // Mostrar prompt de instalação
        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        console.log('Resultado da instalação:', outcome);

        deferredPrompt = null;
        installPrompt.classList.remove('show');
    });
}

if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
        installPrompt.classList.remove('show');
        localStorage.setItem('installPromptDismissed', Date.now().toString());
    });
}

// Evento quando a app é instalada
window.addEventListener('appinstalled', () => {
    console.log('PWA instalada com sucesso!');
    installPrompt.classList.remove('show');
    deferredPrompt = null;
});

// =============================================
// OFFLINE/ONLINE STATUS
// =============================================
const offlineIndicator = document.getElementById('offlineIndicator');

function updateOnlineStatus() {
    if (navigator.onLine) {
        offlineIndicator.classList.remove('show');
        document.body.classList.remove('offline');
    } else {
        offlineIndicator.classList.add('show');
        document.body.classList.add('offline');
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// =============================================
// NAVIGATION
// =============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking a link
if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });
}

// Navbar scroll effect
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
});

// =============================================
// ANIMATIONS ON SCROLL
// =============================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.section, .content-block').forEach(el => {
    observer.observe(el);
});

// =============================================
// ACTIVE NAV LINK
// =============================================
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =============================================
// UPDATE NOTIFICATION
// =============================================
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <p>Nova versão disponível!</p>
        <button onclick="window.location.reload()">Atualizar</button>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 20px;
        right: 20px;
        background: #1a1a25;
        padding: 15px 20px;
        border-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1001;
        border: 1px solid rgba(255, 26, 117, 0.3);
    `;
    notification.querySelector('button').style.cssText = `
        background: linear-gradient(135deg, #FF1A75, #9719ff);
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        font-weight: 600;
    `;
    document.body.appendChild(notification);
}

// =============================================
// READING PROGRESS (for content pages)
// =============================================
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'readingProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FF1A75, #9719ff);
        z-index: 1003;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = `${Math.min(100, progress)}%`;
    });
}

// Inicializar barra de progresso apenas em páginas de conteúdo
if (document.querySelector('.page-content')) {
    initReadingProgress();
}

// =============================================
// KEYBOARD NAVIGATION
// =============================================
document.addEventListener('keydown', (e) => {
    // ESC para fechar menu mobile
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
    }
});

// =============================================
// PRELOAD CRITICAL PAGES
// =============================================
function preloadPages() {
    const pagesToPreload = [
        '/pwa/pages/os-7-veus.html',
        '/pwa/pages/comecar.html'
    ];

    pagesToPreload.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Preload após a página carregar
window.addEventListener('load', () => {
    setTimeout(preloadPages, 2000);
});

// =============================================
// CONSOLE WELCOME MESSAGE
// =============================================
console.log('%c Os 7 Véus PWA ', 'background: linear-gradient(135deg, #FF1A75, #9719ff); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;');
console.log('Um sistema literário para identificar padrões automáticos de vida');
