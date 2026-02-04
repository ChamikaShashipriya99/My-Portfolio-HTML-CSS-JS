// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>Sending...';
            submitBtn.disabled = true;

            try {
                // Send data to Formspree
                const response = await fetch("https://formspree.io/f/mgozgrzz", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    // Show success message
                    showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                    // Reset form
                    contactForm.reset();
                } else {
                    // Start of error handling
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        const errorMessages = data.errors.map(error => error.message).join(", ");
                        throw new Error(errorMessages);
                    } else {
                        throw new Error('Form submission failed');
                    }
                }

            } catch (error) {
                console.error('Error sending message:', error);
                showMessage(error.message || 'Oops! Something went wrong. Please try again later.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

