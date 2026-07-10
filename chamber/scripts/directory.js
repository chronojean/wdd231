const url = 'data/members.json';
const directoryContainer = document.getElementById('directory-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

async function getMembers() {
    try {
        const response = await fetch(url);
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = '';
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>
        `;
        
        directoryContainer.appendChild(card);
    });
}

gridBtn.addEventListener('click', () => {
    directoryContainer.classList.add('grid');
    directoryContainer.classList.remove('list');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    directoryContainer.classList.add('list');
    directoryContainer.classList.remove('grid');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// Initialize fetch
getMembers();
