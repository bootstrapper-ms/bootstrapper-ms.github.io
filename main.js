var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    const headerElement = document.querySelector(".header") 
    if (headerElement) {
    headerElement.style.height = window.innerHeight*0.4 + "px";
    } else {
        console.info("No header element found, skipping style adjustment")
    }
});

function updateContent(langData) {
    document.querySelectorAll('[data-il8n]').forEach(element => {
        const key = element.getAttribute('data-il8n');
        element.innerHTML = langData[key];
    });
}

function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

async function fetchLanguageData(lang) {
    const response = await fetch(`./${lang}.json`);
    return response.json();
}

async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});

window.onload = function() {
    const stickyNotes = document.querySelectorAll('.sticky_note');
    stickyNotes.forEach(note => {
        const randomPositive = Math.floor(Math.random() * 3) + 1;
        const randomRotation = Math.random() < 0.5 ? -randomPositive : randomPositive;
        note.style.transform = `rotate(${randomRotation}deg)`;
    });
};