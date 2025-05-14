// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const mainMenu = document.getElementById('main-menu');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cards = document.querySelectorAll('.card');

// Sample search data (would be expanded in a real implementation)
const searchData = [
    { id: 'characters', title: 'Characters', keywords: ['player', 'enemy', 'monster', 'npc', 'character'] },
    { id: 'items', title: 'Items', keywords: ['weapon', 'tool', 'equipment', 'item', 'gear', 'powerup'] },
    { id: 'maps', title: 'Maps', keywords: ['location', 'area', 'level', 'map', 'zone'] },
    { id: 'guides', title: 'Guides', keywords: ['tutorial', 'how to', 'guide', 'help', 'tips', 'tricks', 'strategy'] },
    { id: 'faq', title: 'FAQ', keywords: ['question', 'answer', 'faq', 'help', 'support'] },
];

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
mainMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainMenu.classList.remove('active');
    });
});

// Search functionality
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) return;
    
    // Find matching results
    const results = searchData.filter(item => {
        return item.title.toLowerCase().includes(query) || 
               item.keywords.some(keyword => keyword.includes(query));
    });
    
    // Highlight matching cards and animate
    cards.forEach(card => {
        const cardId = card.id;
        const isMatch = results.some(result => result.id === cardId);
        
        if (isMatch) {
            card.style.animation = 'pulse 0.6s ease-in-out';
            card.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
            setTimeout(() => {
                card.style.animation = '';
                card.style.boxShadow = '';
            }, 1500);
        }
    });
    
    // Scroll to first match if exists
    if (results.length > 0) {
        const firstResultElement = document.getElementById(results[0].id);
        if (firstResultElement) {
            firstResultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

// Card animations on hover
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.card-icon svg');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.3s ease-in-out';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.card-icon svg');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    });
});

// Animate coming soon icons if they exist
const comingSoonIcons = document.querySelectorAll('.coming-soon-icon');
if (comingSoonIcons.length > 0) {
    comingSoonIcons.forEach(icon => {
        icon.style.transition = 'transform 0.3s ease-in-out';
    });
} 