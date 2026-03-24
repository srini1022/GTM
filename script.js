// script.js - Dummy E-Commerce JavaScript

// Cart functionality using localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        el.textContent = cart.length;
    });
}

// Add item to cart
function addToCart(productId, name, price) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: parseFloat(price),
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    alert('Cart cleared!');
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    alert('Item removed from cart!');
}

// Update item quantity in cart
function updateQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// Add to wishlist (dummy)
function addToWishlist(productId) {
    alert(`Product ${productId} added to wishlist!`);
}

// Video event tracking
function setupVideoTracking() {
    const video = document.getElementById('promo-video');
    if (video) {
        video.addEventListener('play', () => {
            console.log('Video play event');
        });
        video.addEventListener('pause', () => {
            console.log('Video pause event');
        });
        video.addEventListener('ended', () => {
            console.log('Video ended event');
        });
    }
}

// Download functionality
function setupDownload() {
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            console.log('Download event triggered');
            // Create a link to download the file
            const link = document.createElement('a');
            link.href = 'assets/files/sample.pdf';
            link.download = 'sample.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}

// Gallery image clicks
function setupGallery() {
    document.querySelectorAll('.gallery-images img').forEach(img => {
        img.addEventListener('click', () => {
            console.log('Gallery image clicked:', img.id);
            // Could open a modal or something, but for now just log
        });
    });
}

// Render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (!cartItemsContainer || !totalPriceElement) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-action="decrease" data-product-id="${item.id}">-</button>
                    <span class="quantity">Quantity: ${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase" data-product-id="${item.id}">+</button>
                </div>
                <p>Total: $${itemTotal.toFixed(2)}</p>
            </div>
            <button class="btn remove-btn" data-product-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = total.toFixed(2);

    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            const action = e.target.dataset.action;
            updateQuantity(productId, action);
        });
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            removeFromCart(productId);
        });
    });
}

// Form validation and submission
function validateContactForm() {
    const form = document.getElementById('contact-form');
    const messagesDiv = document.getElementById('form-messages');
    let isValid = true;
    let errors = [];

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(el => {
        el.classList.remove('error');
    });
    messagesDiv.innerHTML = '';

    // Full Name
    const name = document.getElementById('full-name').value.trim();
    if (!name) {
        showError('full-name', 'name-error', 'This field is required');
        errors.push('Name is required');
        isValid = false;
    }

    // Email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email', 'email-error', 'This field is required');
        errors.push('Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'email-error', 'Invalid email format');
        errors.push('Invalid email format');
        isValid = false;
    }

    // Phone
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^\d{10}$/;
    if (!phone) {
        showError('phone', 'phone-error', 'This field is required');
        errors.push('Phone is required');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        showError('phone', 'phone-error', 'Phone number must be 10 digits');
        errors.push('Phone must be 10 digits');
        isValid = false;
    }

    // Subject
    const subject = document.getElementById('subject').value;
    if (!subject) {
        showError('subject', 'subject-error', 'This field is required');
        errors.push('Subject is required');
        isValid = false;
    }

    // Message
    const message = document.getElementById('message').value.trim();
    if (!message) {
        showError('message', 'message-error', 'This field is required');
        errors.push('Message is required');
        isValid = false;
    }

    // Country (optional, no validation)

    // Gender (optional, no validation)

    // Terms
    const terms = document.getElementById('terms').checked;
    if (!terms) {
        showError('terms', 'terms-error', 'You must agree to the terms');
        errors.push('Terms must be accepted');
        isValid = false;
    }

    if (!isValid) {
        console.log('form_error');
        if (errors.length > 0) {
            messagesDiv.innerHTML = '<div class="error-summary">Please correct the following errors:</div>';
        }
    } else {
        console.log('form_submit');
        // Log field values
        const formData = {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message,
            country: document.getElementById('country').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || '',
            terms: terms
        };
        console.log('Form data:', formData);

        // Show success
        messagesDiv.innerHTML = '<div class="success-message">Form submitted successfully</div>';
        form.reset();
    }

    return isValid;
}

function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.add('error');
    error.textContent = message;
    error.style.display = 'block';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
    setupVideoTracking();
    setupDownload();
    setupGallery();

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            const name = e.target.dataset.productName;
            const price = e.target.dataset.productPrice;
            addToCart(productId, name, price);
        });
    });

    // View details buttons (redirect to product-detail.html)
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'product-detail.html';
        });
    });

    // Buy now button (redirect to checkout)
    const buyNowBtn = document.getElementById('buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }

    // Continue shopping button
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }

    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Back to cart button
    const backToCartBtn = document.getElementById('back-to-cart-btn');
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    // Add to wishlist button
    const addToWishlistBtn = document.getElementById('add-to-wishlist-btn');
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            addToWishlist(productId);
        });
    }

    // Share button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareProduct);
    }

    // Product images (redirect to detail)
    document.querySelectorAll('.product-card img').forEach(img => {
        img.addEventListener('click', () => {
            window.location.href = 'product-detail.html';
        });
    });

    // Hero banner click
    const heroBanner = document.getElementById('hero-banner');
    if (heroBanner) {
        heroBanner.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }

    // Filter buttons (dummy)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Filter applied! (Dummy functionality)');
        });
    });

    // Social links (dummy)
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`Redirecting to ${e.target.textContent} (Dummy functionality)`);
        });
    });

    // Form handlers
    // Contact form with validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            validateContactForm();
        });
    }

    // Other forms
    handleFormSubmit('checkout-form', 'Order placed successfully!');
    handleFormSubmit('newsletter-form', 'Subscribed to newsletter!');
});