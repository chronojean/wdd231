const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

const courseListContainer = document.getElementById('course-list');
const totalCreditsElement = document.getElementById('total-credits');
const filterAllBtn = document.getElementById('filter-all');
const filterCseBtn = document.getElementById('filter-cse');
const filterWddBtn = document.getElementById('filter-wdd');
const courseModal = document.getElementById('course-details');

function renderCourses(courseArray) {
    courseListContainer.innerHTML = '';
    
    courseArray.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-item');
        courseDiv.setAttribute('tabindex', '0');
        courseDiv.setAttribute('role', 'button');
        courseDiv.setAttribute('aria-label', `View details for ${course.subject} ${course.number}`);
        if (course.completed) {
            courseDiv.classList.add('completed');
        }
        
        const checkIcon = course.completed ? '<span class="card-check">✓</span>' : '';
        courseDiv.innerHTML = `
            <h3>${course.subject} ${course.number} ${checkIcon}</h3>
        `;

        courseDiv.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseDiv.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                displayCourseDetails(course);
            }
        });
        
        courseListContainer.appendChild(courseDiv);
    });

    const totalCredits = courseArray.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsElement.innerHTML = `The total credits for courses listed above is <strong>${totalCredits}</strong>`;
}

function displayCourseDetails(course) {
    if (!courseModal) return;
    
    const techBadges = course.technology
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');

    const statusBadge = course.completed 
        ? `<span class="modal-status completed"><span class="status-icon">✓</span> Completed</span>`
        : `<span class="modal-status in-progress"><span class="status-icon">⏳</span> In Progress</span>`;

    courseModal.innerHTML = `
        <button id="closeModal" aria-label="Close modal">✕</button>
        <div class="modal-header">
            <span class="course-code-badge">${course.subject} ${course.number}</span>
            ${statusBadge}
        </div>
        <h2 class="modal-title">${course.title}</h2>

        <div class="modal-meta-grid">
            <div class="meta-item">
                <span class="meta-label">🎓 Certificate</span>
                <span class="meta-value">${course.certificate}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">⚡ Credits</span>
                <span class="meta-value">${course.credits} Credits</span>
            </div>
        </div>

        <div class="modal-description-card">
            <div class="desc-header">
                <span class="desc-icon">💡</span>
                <strong>Course Overview</strong>
            </div>
            <p>${course.description}</p>
        </div>

        <div class="modal-tech-section">
            <span class="tech-label">🛠️ Technologies:</span>
            <div class="tech-tags-container">${techBadges}</div>
        </div>
    `;

    courseModal.showModal();

    const closeModalBtn = document.getElementById('closeModal');
    closeModalBtn.addEventListener('click', () => {
        courseModal.close();
    });
}

// Close modal when clicking on the backdrop outside the dialog box
if (courseModal) {
    courseModal.addEventListener('click', (event) => {
        const rect = courseModal.getBoundingClientRect();
        if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        ) {
            courseModal.close();
        }
    });
}

// Initial render
renderCourses(courses);

// Event listeners for filtering
filterAllBtn.addEventListener('click', () => {
    setActiveButton(filterAllBtn);
    renderCourses(courses);
});

filterCseBtn.addEventListener('click', () => {
    setActiveButton(filterCseBtn);
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(cseCourses);
});

filterWddBtn.addEventListener('click', () => {
    setActiveButton(filterWddBtn);
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(wddCourses);
});

function setActiveButton(activeBtn) {
    [filterAllBtn, filterCseBtn, filterWddBtn].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}