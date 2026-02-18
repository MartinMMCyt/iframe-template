const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

function init() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    particlesArray = [];
    for (let i = 0; i < CONFIG.maxParticles; i++) particlesArray.push(new Particle());
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = (Math.random() - 0.5) * 1.2;
        this.color = CONFIG.particleColors[Math.floor(Math.random() * CONFIG.particleColors.length)];
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONFIG.maxDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0,255,255,${0.5 - dist / (2 * CONFIG.maxDistance)})`;
                ctx.lineWidth = 1.2;
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();
