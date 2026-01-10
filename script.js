// Mobile Menu Logic
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Login Logic
let selectedPlan = '', selectedPrice = '', selectedMethod = '';

if (localStorage.getItem('spudyLoggedIn') === 'true') {
    const authBtn = document.getElementById('authBtn');
    if (authBtn) authBtn.textContent = 'Account';
}

function openLogin() {
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeLogin() {
    document.getElementById('loginModal').classList.add('hidden');
}

function checkLogin() {
    if (localStorage.getItem('spudyLoggedIn') !== 'true') {
        alert('Please login to continue!');
        openLogin();
    } else {
        alert('Application submitted successfully!');
    }
}

// Subscription Logic
function submitSubscribe(event) {
    const email = document.getElementById('subscribe-email').value;
    const error = document.getElementById('subscribe-error');
    if (email && email.includes('@')) {
        error.classList.add('hidden');
        alert('Thank you for subscribing!');
    } else {
        error.classList.remove('hidden');
    }
}

// Payment Logic
function selectPlan(name, price) {
    if (localStorage.getItem('spudyLoggedIn') !== 'true') {
        alert('Please login first!');
        openLogin();
        return;
    }
    selectedPlan = name;
    selectedPrice = price;
    document.getElementById('planName').textContent = name;
    document.getElementById('planPrice').textContent = price === 49 ? '$49 Lifetime' : '$' + price + '/month';
    document.getElementById('paymentModal').classList.remove('hidden');
    document.getElementById('paymentConfirm').classList.add('hidden');
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
}

function selectPayment(method) {
    selectedMethod = method;
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
    // Find the element that called this function - tricky in global scope, let's fix in HTML
    // We will assume the event is passed or handled via binding, but for now let's use the old way
    // or rely on event.currentTarget if called from inline.
    // Since I'm moving to a file, I should probably attach listeners, but to keep compatibility with
    // the existing inline onclicks, I'll use event.currentTarget.
    if(event && event.currentTarget) event.currentTarget.classList.add('selected');

    document.getElementById('selectedMethod').textContent = method;
    document.getElementById('paymentConfirm').classList.remove('hidden');
}

function sendWhatsAppReceipt() {
    const msg = `Hi Spudy Library! I just paid $${selectedPrice} for ${selectedPlan} using ${selectedMethod}. Please activate my account!`;
    window.open(`https://api.whatsapp.com/send?phone=263716669706&text=${encodeURIComponent(msg)}`, '_blank');
}

function closePayment() {
    document.getElementById('paymentModal').classList.add('hidden');
}

// Animated Counters
const counters = document.querySelectorAll('.counter');
let animated = false;

function animateCounters() {
    if (animated) return;
    const triggerBottom = window.innerHeight * 0.9;

    counters.forEach(counter => {
        const counterTop = counter.getBoundingClientRect().top;
        if (counterTop < triggerBottom) {
            animated = true; // Simple logic: animate all at once when one is visible

            const updateCounter = () => {
                const target = +counter.dataset.count;
                const c = +counter.innerText.replace(/,/g, '').replace('+', ''); // Clean current value
                const increment = target / 100;

                if (c < target) {
                    counter.innerText = `${Math.ceil(c + increment).toLocaleString()}+`;
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = `${target.toLocaleString()}+`;
                }
            };
            updateCounter();
        }
    });
}

window.addEventListener('scroll', animateCounters);

// Three.js Background - Subtle Particles
const initThreeJS = () => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50; // Spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xd4af37, // Gold
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    camera.position.z = 20;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Subtle interactive movement
        particlesMesh.rotation.x += mouseY * 0.00005;
        particlesMesh.rotation.y += mouseX * 0.00005;

        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();

    // Typed.js
    if (document.getElementById('typed')) {
        new Typed('#typed', {
            strings: ["Read Premium Books", "Master New Skills", "Join the Elite", "Spudy Library"],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            showCursor: false
        });
    }
});
