document.addEventListener('DOMContentLoaded', () => {
    const resultsElement = document.getElementById('results');
    if (!resultsElement) return;

    const currentUrl = window.location.search;
    const urlParams = new URLSearchParams(currentUrl);

    function getParam(paramKey, fallback = 'Not provided') {
        const value = urlParams.get(paramKey);
        return (value && value.trim() !== '') ? decodeURIComponent(value.replace(/\+/g, ' ')) : fallback;
    }

    const fname = getParam('fname', 'Applicant');
    const lname = getParam('lname', '');
    const title = getParam('title', 'N/A');
    const email = getParam('email', 'N/A');
    const phone = getParam('phone', 'N/A');
    const organization = getParam('organization', 'N/A');
    const membershipLevel = getParam('membershipLevel', 'General');
    const description = getParam('description', 'No description provided.');
    const rawTimestamp = getParam('timestamp', '');

    let formattedDate = 'N/A';
    if (rawTimestamp !== 'N/A' && rawTimestamp !== '') {
        const parsedDate = new Date(rawTimestamp);
        if (!isNaN(parsedDate.getTime())) {
            formattedDate = parsedDate.toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'medium'
            });
        } else {
            formattedDate = rawTimestamp;
        }
    }

    resultsElement.innerHTML = `
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label">Applicant Name:</span>
                <span class="result-value"><strong>${fname} ${lname}</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Organizational Title:</span>
                <span class="result-value">${title}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Email Address:</span>
                <span class="result-value"><a href="mailto:${email}">${email}</a></span>
            </div>
            <div class="result-item">
                <span class="result-label">Mobile Phone:</span>
                <span class="result-value"><a href="tel:${phone}">${phone}</a></span>
            </div>
            <div class="result-item">
                <span class="result-label">Business / Organization:</span>
                <span class="result-value"><strong>${organization}</strong></span>
            </div>
            <div class="result-item">
                <span class="result-label">Membership Level Selected:</span>
                <span class="result-value level-badge">${membershipLevel}</span>
            </div>
            <div class="result-item full-width">
                <span class="result-label">Application Date & Time:</span>
                <span class="result-value">📅 ${formattedDate}</span>
            </div>
            <div class="result-item full-width">
                <span class="result-label">Business Description:</span>
                <p class="result-desc">${description}</p>
            </div>
        </div>
    `;
});
