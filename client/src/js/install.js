const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {

    const event = window.deferredPrompt;
    if (!event) {
        return;
    }
    event.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);

});

window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
