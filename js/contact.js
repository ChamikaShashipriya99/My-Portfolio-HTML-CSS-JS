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
                // Here you can integrate with a backend service like:
                // - EmailJS
                // - Formspree
                // - Your own backend API
                
                // For now, we'll simulate a successful submission
                // Replace this with actual form submission logic
                
                // Example with EmailJS (uncomment and configure):
                /*
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                });
                */

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();

            } catch (error) {
                console.error('Error sending message:', error);
                showMessage('Oops! Something went wrong. Please try again later or contact me directly via email.', 'error');
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

