function highlightNavItem() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3 && window.scrollY < sectionTop + sectionHeight - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Typing effect for welcome message
document.addEventListener('DOMContentLoaded', () => {
    const text = "Welcome to my website";
    const speed = 100;
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            document.getElementById("typewriter").innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();

    // Initialize highlight on page load
    highlightNavItem();
});

// Event listener for scrolling
window.addEventListener('scroll', highlightNavItem);

// Project data
const projects = [
    
        {
               id: 1,
               title: "Weather App",
               description: "Real-time weather updates, forecasts, and alerts to keep users informed and prepared.",
               image: "images/weather-background-with-clouds_23-2150374514.avif",
               category: ["mobile","live-demo"],
               tech: ["React Native", "API Integration"],
               demoLink: "https://drive.google.com/file/d/1ktz9YTEqmjggmBR6M72A_bSN4fLfKjBH/view?usp=sharing",
               codeLink: "https://github.com/peeboat77/Weather-Application/"
           },
           {
            id: 2,
               title: "Simple Scientific Calculator",
               description: "Real-time weather updates, forecasts, and alerts to keep users informed and prepared.",
               image: "images/depositphotos_414576484-stock-illustration-digital-calculator-icon-editable-flat.jpg",
               category: ["mobile","live-demo"],
               tech: ["Java"],
               demoLink: "https://drive.google.com/file/d/1ktz9YTEqmjggmBR6M72A_bSN4fLfKjBH/view?usp=sharing",
               codeLink: "https://github.com/peeboat77/Weather-Application/"
           },

           {
               id: 3,
               title: "CopayHero GPT",
               description: "Users can calculate out-of-pocket medication costs in real-time by inputting insurance details and prescriptions",
               image: "images/360_F_713608482_2EJ8CcxWa87MDIw4YbNWaqTR84zPzpvN.jpg",
               category: ["ai"],
               tech: ["Python", "Natural Language Processing", "Machine Learning"],
               codeLink: "https://github.com/Sai-Vignesh/CopayHero"
           },
           {
               id: 4,
               title: "CollegeCollab",
               description: "Platform where college students connect to share resources, explore hobbies, showcase talents, and collaborate on academic projects.",
               image: "images/student_collaboration (1).jpeg",
               category: ["mobile","live-demo"],
               tech: ["Python", "Natural Language Processing", "Machine Learning"],
               demoLink: "https://www.canva.com/design/DAGQAQjWnEc/pyQu9l7vzyFpz4B0Td6kCw/edit?utm_content=DAGQAQjWnEc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
               codeLink: "https://github.com/peeboat77/"
           },
           {
               id: 5,
               title: "AI Chatbot",
               description: "An AI-powered chatbot for customer service.",
               image: "images/AI-Chatbots-1440x720.png",
               category: ["ai","live-demo"],
               tech: ["Python", "Natural Language Processing", "Machine Learning"],
               demoLink: "https://example.com/chatbot-demo",
               codeLink: "https://github.com/peeboat77/"
           },
           {
               id: 6,
               title: "Spanish FlashCard App",
               description: "An AI-powered chatbot for customer service.",
               image: "images/Hablando.jpeg",
               category: ["mobile", "web"],
               tech: ["Python", "Natural Language Processing", "Machine Learning"],

               codeLink: "https://github.com/peeboat77/Spanish-Quiz-app/"
           }
];

// Create project card
function createProjectCard(project) {
    return `
        <div class="project-card" data-id="${project.id}" data-category="${project.category.join(',')}">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Filter projects
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const cardCategories = card.dataset.category.split(',');
        card.style.display = category === 'all' || cardCategories.includes(category) ? 'block' : 'none';
    });
}

// Open project modal
function openModal(project) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalImage').alt = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalTech').innerHTML = project.tech.map(tech => `<span>${tech}</span>`).join('');
    document.getElementById('modalDemo').href = project.demoLink;
    document.getElementById('modalCode').href = project.codeLink;
    modal.style.display = 'block';
}

// Close project modal
function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Animate project cards
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    });
}

// Initialize projects and event listeners
document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Populate project grid
    projectGrid.innerHTML = projects.map(createProjectCard).join('');

    // Filter projects by category
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.category);
        });
    });

    // Open modal on project click
    projectGrid.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        if (projectCard) {
            const projectId = parseInt(projectCard.dataset.id);
            const project = projects.find(p => p.id === projectId);
            if (project) openModal(project);
        }
    });

    // Close modal
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('projectModal')) closeModal();
    });

    // Animate project cards
    animateProjectCards();

    // Show all projects initially
    filterProjects('all');

    // Add fade-in animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .project-card { opacity: 0; }
    `;
    document.head.appendChild(style);
});

