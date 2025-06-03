document.addEventListener('DOMContentLoaded', function() {
    // Get websim metadata username if available
    if (window.websim && window.websim.getUser) {
        window.websim.getUser().then(user => {
            if (user && user.username) {
                document.getElementById('username').value = user.username;
            }
        }).catch(() => {
            // Fallback if websim API not available
            console.log('Websim API not available');
        });
    }

    // Handle custom color selection
    const colorOptions = document.querySelectorAll('input[name="favoriteColor"]');
    const customColorInput = document.getElementById('customColorInput');

    colorOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'custom') {
                customColorInput.style.display = 'block';
            } else {
                customColorInput.style.display = 'none';
            }
        });
    });

    // Handle custom interests
    const customInterestCheckbox = document.getElementById('customInterest');
    const customInterestInput = document.getElementById('customInterestInput');
    const noInterestsCheckbox = document.getElementById('noInterests');
    const interestCheckboxes = document.querySelectorAll('.interests-options input[type="checkbox"]');

    customInterestCheckbox.addEventListener('change', function() {
        if (this.checked) {
            customInterestInput.style.display = 'block';
            noInterestsCheckbox.checked = false;
        } else {
            customInterestInput.style.display = 'none';
        }
    });

    // Handle "None" interests option
    noInterestsCheckbox.addEventListener('change', function() {
        if (this.checked) {
            interestCheckboxes.forEach(checkbox => {
                if (checkbox !== this) {
                    checkbox.checked = false;
                }
            });
            customInterestInput.style.display = 'none';
        }
    });

    // Prevent other interests when "None" is selected
    interestCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked && this !== noInterestsCheckbox) {
                noInterestsCheckbox.checked = false;
            }
        });
    });

    // Handle plan selection and payment display
    const planOptions = document.querySelectorAll('input[name="plan"]');
    const paymentSection = document.getElementById('paymentSection');
    const memberPayment = document.getElementById('memberPayment');
    const investorPayment = document.getElementById('investorPayment');

    planOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'member') {
                paymentSection.style.display = 'block';
                memberPayment.style.display = 'block';
                investorPayment.style.display = 'none';
            } else if (this.value === 'investor') {
                paymentSection.style.display = 'block';
                memberPayment.style.display = 'none';
                investorPayment.style.display = 'block';
            } else {
                paymentSection.style.display = 'none';
            }
        });
    });

    // Handle investment amount validation
    const investmentAmount = document.getElementById('investmentAmount');
    const investmentError = document.getElementById('investmentError');

    investmentAmount.addEventListener('input', function() {
        const amount = parseFloat(this.value);
        if (amount > 1000) {
            investmentError.style.display = 'block';
            this.style.borderColor = '#e53e3e';
        } else {
            investmentError.style.display = 'none';
            this.style.borderColor = '#e2e8f0';
        }
    });

    // Handle form submission
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate investment amount if investor plan
        const selectedPlan = document.querySelector('input[name="plan"]:checked').value;
        if (selectedPlan === 'investor') {
            const amount = parseFloat(investmentAmount.value);
            if (amount > 1000) {
                alert('Please contact admin@safespace.social for investments over $1000');
                return;
            }
            if (amount < 2) {
                alert('Minimum investment is $2 per year');
                return;
            }
        }
        
        // Show success message (since this is just a prototype)
        alert('Registration form completed! (This is a prototype - no data was actually submitted)');
        console.log('Form data:', data);
    });

    // Add smooth animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.form-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

