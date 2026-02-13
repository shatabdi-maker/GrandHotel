document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon) {  // null check
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // লিঙ্ক ক্লিকে ক্লোজ
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks) navLinks.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
});
    
    // Tab Switching for Reservation
    // const tabBtns = document.querySelectorAll('.tab-btn');
    // const tabContents = document.querySelectorAll('.tab-content');
    
    // tabBtns.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         // Remove active class from all tabs
    //         tabBtns.forEach(b => b.classList.remove('active'));
    //         tabContents.forEach(c => c.classList.remove('active'));
            
    //         // Add active class to clicked tab
    //         this.classList.add('active');
    //         const tabId = this.getAttribute('data-tab') + '-tab';
    //         document.getElementById(tabId).classList.add('active');
    //     });
    // });//
    
    // Gallery Thumbnail Interaction
   //
    // // Form Date Input - Set min date to today
    // const today = new Date().toISOString().split('T')[0];
    // const dateInputs = document.querySelectorAll('input[type="date"]');
    
    // dateInputs.forEach(input => {
    //     input.setAttribute('min', today);
        
    //     // Set default checkout date to tomorrow
    //     if (input.id === 'checkout') {
    //         const tomorrow = new Date();
    //         tomorrow.setDate(tomorrow.getDate() + 1);
    //         const tomorrowStr = tomorrow.toISOString().split('T')[0];
    //         input.setAttribute('min', tomorrowStr);
    //     }
    // });
    
    // Form Validation and Submission
    const forms = document.querySelectorAll('.reservation-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#0b0707';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Validate email format
            const emailFields = this.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailPattern.test(field.value)) {
                    isValid = false;
                    field.style.borderColor = '#4d1913';
                }
            });
            
            if (isValid) {
                // In a real implementation, you would send data to server
                // For this demo, we'll just show a success message
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Reservation Sent!';
                submitBtn.style.backgroundColor = '#27ae60';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    
                    // Show thank you message
                    alert('Thank you for your reservation! We will contact you shortly to confirm.');
                }, 3000);
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (emailInput.value) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                submitBtn.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    emailInput.value = '';
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    alert('Thank you for subscribing to our newsletter!');
                }, 2000);
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '15px 0';
        }
    });
    
    // Set default dates for reservation forms
    const setDefaultDates = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formatDate = (date) => {
            return date.toISOString().split('T')[0];
        };
        
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        const rDateInput = document.getElementById('rDate');
        
        if (checkinInput) checkinInput.value = formatDate(today);
        if (checkoutInput) checkoutInput.value = formatDate(tomorrow);
        if (rDateInput) rDateInput.value = formatDate(today);
    };
    
    // Call function to set default dates
    setDefaultDates();
    
    // Image lazy loading (for better performance)
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    };
    
    // Initialize lazy loading
    lazyLoadImages();
});
// Gallery Functionality
class PhotoGallery {
    constructor() {
        this.galleryItems = [];
        this.currentFilter = 'all';
        this.currentLightboxIndex = 0;
        this.itemsPerPage = 12;
        this.currentPage = 1;
        this.totalItems = 24; // Example total
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.bindEvents();
        this.initializeGallery();
    }
    
    cacheElements() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.galleryGrid = document.querySelector('.gallery-grid');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.shownCount = document.getElementById('shownCount');
        this.totalCount = document.getElementById('totalCount');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxTitle = document.getElementById('lightboxTitle');
        this.lightboxDescription = document.getElementById('lightboxDescription');
        this.lightboxCategory = document.getElementById('lightboxCategory');
        this.imageCounter = document.getElementById('imageCounter');
        this.lightboxClose = document.getElementById('lightboxClose');
        this.lightboxPrev = document.querySelector('.lightbox-prev');
        this.lightboxNext = document.querySelector('.lightbox-next');
        this.lightboxThumbnails = document.querySelector('.lightbox-thumbnails');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.shareBtn = document.getElementById('shareBtn');
    }
    
    bindEvents() {
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });
        
        // Load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMorePhotos());
        }
        
        // Lightbox navigation
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.showPreviousImage());
        this.lightboxNext.addEventListener('click', () => this.showNextImage());
        
        // Keyboard navigation for lightbox
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Close lightbox when clicking on backdrop
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Download and share buttons
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.shareBtn.addEventListener('click', () => this.shareImage());
        
        // Lazy load images
        this.initializeLazyLoading();
    }
    
    initializeGallery() {
        // Get all gallery items
        this.galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        
        // Update counters
        this.updateCounters();
        
        // Initialize expand buttons
        this.initializeExpandButtons();
    }
    
    handleFilterClick(e) {
        const filter = e.currentTarget.getAttribute('data-filter');
        
        // Update active button
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });
        
        // Apply filter
        this.currentFilter = filter;
        this.filterGallery();
    }
    
    filterGallery() {
        this.galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (this.currentFilter === 'all' || category === this.currentFilter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Reset pagination
        this.currentPage = 1;
        this.updateCounters();
    }
    
    loadMorePhotos() {
        this.currentPage++;
        const newItemsCount = this.currentPage * this.itemsPerPage;
        
        // Simulate loading new photos
        this.simulateNewPhotos();
        
        // Update counters
        this.updateCounters();
        
        // Disable button if all items are shown
        if (newItemsCount >= this.totalItems) {
            this.loadMoreBtn.disabled = true;
            this.loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Photos Loaded';
        }
    }
    
    simulateNewPhotos() {
        // In a real application, this would be an API call
        // For demo, we'll just show a loading state and then reveal hidden items
        
        const hiddenItems = Array.from(this.galleryItems)
            .filter(item => item.style.display !== 'none' && !item.classList.contains('visible'));
        
        // Show loading state
        this.loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.loadMoreBtn.disabled = true;
        
        // Simulate API delay
        setTimeout(() => {
            // Show next batch of items
            hiddenItems.slice(0, 4).forEach(item => {
                item.classList.add('visible');
                item.style.animation = 'fadeIn 0.5s ease';
            });
            
            // Reset button
            this.loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Photos';
            this.loadMoreBtn.disabled = false;
        }, 1000);
    }
    
    updateCounters() {
        const visibleItems = Array.from(this.galleryItems)
            .filter(item => item.style.display !== 'none' && item.classList.contains('visible'));
        
        const shownCount = Math.min(visibleItems.length + (this.currentPage - 1) * 4, this.totalItems);
        
        this.shownCount.textContent = shownCount;
        this.totalCount.textContent = this.totalItems;
    }
    
    initializeExpandButtons() {
        document.querySelectorAll('.gallery-expand').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openLightbox(index);
            });
        });
        
        // Also make the entire image clickable
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.gallery-expand')) {
                    this.openLightbox(index);
                }
            });
        });
    }
    
    openLightbox(index) {
        this.currentLightboxIndex = index;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.updateLightbox();
        this.generateThumbnails();
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    updateLightbox() {
        const currentItem = this.galleryItems[this.currentLightboxIndex];
        const imageSrc = currentItem.querySelector('img').src;
        const title = currentItem.querySelector('.gallery-info h3').textContent;
        const description = currentItem.querySelector('.gallery-info p').textContent;
        const category = currentItem.getAttribute('data-category');
        
        // Show loader
        this.lightboxImage.classList.remove('loaded');
        
        // Load image
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            this.lightboxImage.src = imageSrc;
            this.lightboxImage.classList.add('loaded');
        };
        
        // Update info
        this.lightboxTitle.textContent = title;
        this.lightboxDescription.textContent = description;
        this.lightboxCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        this.imageCounter.textContent = `${this.currentLightboxIndex + 1} / ${this.galleryItems.length}`;
        
        // Update thumbnail selection
        this.updateThumbnailSelection();
    }
    
    showPreviousImage() {
        if (this.currentLightboxIndex > 0) {
            this.currentLightboxIndex--;
            this.updateLightbox();
        }
    }
    
    showNextImage() {
        if (this.currentLightboxIndex < this.galleryItems.length - 1) {
            this.currentLightboxIndex++;
            this.updateLightbox();
        }
    }
    
    handleKeyboard(e) {
        if (!this.lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                this.closeLightbox();
                break;
            case 'ArrowLeft':
                this.showPreviousImage();
                break;
            case 'ArrowRight':
                this.showNextImage();
                break;
        }
    }
    
    generateThumbnails() {
        this.lightboxThumbnails.innerHTML = '';
        
        this.galleryItems.forEach((item, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            if (index === this.currentLightboxIndex) {
                thumbnail.classList.add('active');
            }
            
            const img = document.createElement('img');
            img.src = item.querySelector('img').src;
            img.alt = `Thumbnail ${index + 1}`;
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => {
                this.currentLightboxIndex = index;
                this.updateLightbox();
            });
            
            this.lightboxThumbnails.appendChild(thumbnail);
        });
    }
    
    updateThumbnailSelection() {
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            if (index === this.currentLightboxIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
}