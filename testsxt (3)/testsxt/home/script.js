const body = document.querySelector('body');

body.addEventListener('mousemove', (e) => {
    const xOffset = Math.min(Math.max((window.innerWidth / 2 - e.pageX) / 20, -50), 50);
    const yOffset = Math.min(Math.max((window.innerHeight / 2 - e.pageY) / 20, -50), 50);
    body.style.backgroundPosition = `${xOffset}px ${yOffset}px`;
});
