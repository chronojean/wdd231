const url = 'data/members.json';
const directoryContainer = document.getElementById('directory-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

// Map numeric level → label & CSS class
function getMembership(level) {
    const map = {
        3: { label: 'Gold',   cls: 'badge-gold'   },
        2: { label: 'Silver', cls: 'badge-silver'  },
        1: { label: 'Bronze', cls: 'badge-bronze'  }
    };
    return map[level] || { label: 'Member', cls: 'badge-bronze' };
}

async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not OK');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        directoryContainer.innerHTML = '<p>Unable to load members. Please try again later.</p>';
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = '';

    members.forEach(member => {
        const { label, cls } = getMembership(member.membershipLevel);

        const card = document.createElement('div');
        card.classList.add('member-card');

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>
            <span class="membership-badge ${cls}">${label} Member</span>
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

// Initialize
getMembers();
