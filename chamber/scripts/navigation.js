// Toggle mobile menu
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        menuButton.classList.toggle('open');
        
        const isOpen = navigation.classList.contains('open');
        menuButton.setAttribute('aria-expanded', isOpen);
    });
}

// Set current year
const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Set last modified date
const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}
