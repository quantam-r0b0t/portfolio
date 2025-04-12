document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formContainer = contactForm.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Message sent successfully!</p>
        `;
        successMessage.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background-color: var(--success-color);
            color: white;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        `;
        
        formContainer.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
        }, 10);
        this.reset();
        
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                formContainer.removeChild(successMessage);
            }, 500);
        }, 3000);
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('section, .project').forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .fadeIn {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    //typing animation
    const heroText = document.querySelector('.hero h1');
    const originalText = heroText.innerHTML;
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.style.cssText = `
        display: inline-block;
        width: 3px;
        height: 1em;
        background-color: currentColor;
        margin-left: 3px;
        animation: blink 1s step-end infinite;
    `;
    
    document.head.appendChild(document.createElement('style')).textContent = `
        @keyframes blink {
            50% { opacity: 0; }
        }
    `;
    
    //apply after page_reload
    setTimeout(() => {
        heroText.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroText.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroText.appendChild(cursorSpan);
            }
        }
        typeWriter();
    }, 500);
});