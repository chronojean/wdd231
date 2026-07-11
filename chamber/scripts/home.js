// home.js — Chamber of Commerce Home Page Scripts

const membersUrl = 'data/members.json';

// ── Date ──────────────────────────────────────────────────────────────────────
const dateEl = document.getElementById('current-date');
if (dateEl) {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = today.toLocaleDateString('en-US', options);
}

// ── Weather (OpenWeatherMap) ───────────────────────────────────────────────────
// Ureña, Venezuela coordinates: 7.9309° N, -72.4458° W
const LAT = 7.9309;
const LON = -72.4458;
// NOTE: Replace with your own free API key from openweathermap.org
const API_KEY = 'demo';

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather API unavailable');
        const data = await response.json();

        const tempEl = document.getElementById('weather-temp');
        const descEl = document.getElementById('weather-desc');
        if (tempEl) tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        if (descEl) descEl.textContent = data.weather[0].description;
    } catch (error) {
        // Fallback when API key is demo/unavailable
        const tempEl = document.getElementById('weather-temp');
        const descEl = document.getElementById('weather-desc');
        if (tempEl) tempEl.textContent = '27°C';
        if (descEl) descEl.textContent = 'Partly Cloudy · Ureña';
    }
}
getWeather();

// ── Member Spotlights ─────────────────────────────────────────────────────────
// Show 2-3 random members with Gold or Silver membership
async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();

        // Filter Gold (3) and Silver (2) members
        const eligible = members.filter(m => m.membershipLevel >= 2);

        // Shuffle and pick up to 3
        const shuffled = eligible.sort(() => Math.random() - 0.5).slice(0, 3);

        const container = document.getElementById('spotlights-container');
        if (!container) return;
        container.innerHTML = '';

        shuffled.forEach(member => {
            const levelLabel = member.membershipLevel === 3 ? 'Gold' :
                               member.membershipLevel === 2 ? 'Silver' : 'Member';
            const levelClass = member.membershipLevel === 3 ? 'badge-gold' :
                               member.membershipLevel === 2 ? 'badge-silver' : 'badge-bronze';

            const card = document.createElement('div');
            card.classList.add('spotlight-card');
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                <div class="spotlight-info">
                    <h3>${member.name}</h3>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>
                    <span class="membership-badge ${levelClass}">${levelLabel} Member</span>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        const container = document.getElementById('spotlights-container');
        if (container) container.innerHTML = '<p>Unable to load member spotlights.</p>';
    }
}
loadSpotlights();
