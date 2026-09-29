const emailAddress = 'suryanshkumarsaxena@gmail.com';

function setupEmailButton() {
    const emailBtn = document.getElementById('emailBtn');
    if (!emailBtn) return;

    emailBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            const originalText = emailBtn.textContent;
            emailBtn.textContent = 'Copied!';
            emailBtn.style.color = '#00ff88';

            setTimeout(() => {
                emailBtn.textContent = originalText;
                emailBtn.style.color = '';
            }, 2000);
        } catch (error) {
            window.location.href = 'mailto:' + emailAddress;
        }
    });
}

function initStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;

    const fragment = document.createDocumentFragment();
    const starCount = 120;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = (Math.random() * 3 + 0.8).toFixed(2) + 'px';
        star.className = 'star';
        star.style.width = size;
        star.style.height = size;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
        star.style.opacity = (0.3 + Math.random() * 0.7).toFixed(2);
        fragment.appendChild(star);
    }

    container.appendChild(fragment);
}

function initAurora() {
    const canvas = document.getElementById('auroraCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const meteors = [];

    function createGradient() {
        const gradient = ctx.createRadialGradient(
            width / 2,
            height / 2.2,
            0,
            width / 2,
            height / 2.2,
            Math.max(width, height)
        );
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.18)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.08)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        return gradient;
    }

    function createMeteor() {
        meteors.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.6,
            length: 40 + Math.random() * 110,
            speed: 4 + Math.random() * 8,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.6,
            opacity: 1,
            fadeRate: 0.018 + Math.random() * 0.02
        });
    }

    function drawMeteors() {
        for (let i = meteors.length - 1; i >= 0; i--) {
            const meteor = meteors[i];
            meteor.x += Math.cos(meteor.angle) * meteor.speed;
            meteor.y += Math.sin(meteor.angle) * meteor.speed;
            meteor.opacity -= meteor.fadeRate;

            if (meteor.opacity <= 0 || meteor.x > width + 200 || meteor.y > height + 200) {
                meteors.splice(i, 1);
                continue;
            }

            const endX = meteor.x - Math.cos(meteor.angle) * meteor.length;
            const endY = meteor.y - Math.sin(meteor.angle) * meteor.length;
            const gradient = ctx.createLinearGradient(meteor.x, meteor.y, endX, endY);
            gradient.addColorStop(0, `rgba(255, 217, 128, ${meteor.opacity})`);
            gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(meteor.x, meteor.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            ctx.fillStyle = `rgba(255, 255, 220, ${meteor.opacity})`;
            ctx.beginPath();
            ctx.arc(meteor.x, meteor.y, 2.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function render() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = createGradient();
        ctx.fillRect(0, 0, width, height);

        if (meteors.length < 12 && Math.random() < 0.03) {
            createMeteor();
        }

        drawMeteors();
        requestAnimationFrame(render);
    }

    render();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

function setCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupEmailButton();
    initStars();
    initAurora();
    setCurrentYear();
});
