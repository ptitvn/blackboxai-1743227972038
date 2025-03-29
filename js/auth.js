// Registration Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Reset error messages
            document.getElementById('email-error').classList.add('hidden');
            document.getElementById('password-error').classList.add('hidden');
            document.getElementById('confirm-password-error').classList.add('hidden');
            
            let isValid = true;
            
            // Email validation
            if (!email) {
                document.getElementById('email-error').textContent = 'Vui lòng nhập email';
                document.getElementById('email-error').classList.remove('hidden');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('email-error').textContent = 'Email không đúng định dạng';
                document.getElementById('email-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Password validation
            if (!password) {
                document.getElementById('password-error').textContent = 'Vui lòng nhập mật khẩu';
                document.getElementById('password-error').classList.remove('hidden');
                isValid = false;
            } else if (password.length < 6) {
                document.getElementById('password-error').textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
                document.getElementById('password-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Confirm password validation
            if (!confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Vui lòng xác nhận mật khẩu';
                document.getElementById('confirm-password-error').classList.remove('hidden');
                isValid = false;
            } else if (password !== confirmPassword) {
                document.getElementById('confirm-password-error').textContent = 'Mật khẩu xác nhận không khớp';
                document.getElementById('confirm-password-error').classList.remove('hidden');
                isValid = false;
            }
            
            // If all validations pass
            if (isValid) {
                // In a real app, you would send this to your backend
                console.log('Registration successful', { email, password });
                
                // Store user data in localStorage (for demo purposes)
                localStorage.setItem('userEmail', email);
                
                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    }

    // Login Form Handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            
            // Reset error message
            document.getElementById('login-error').classList.add('hidden');
            
            // In a real app, you would verify credentials with your backend
            // For demo, we'll check against localStorage
            const storedEmail = localStorage.getItem('userEmail');
            
            if (!email || !password) {
                document.getElementById('login-error').textContent = 'Vui lòng nhập email và mật khẩu';
                document.getElementById('login-error').classList.remove('hidden');
            } else if (email !== storedEmail) {
                document.getElementById('login-error').textContent = 'Email hoặc mật khẩu không đúng';
                document.getElementById('login-error').classList.remove('hidden');
            } else {
                // Successful login
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
            }
        });
    }

    // Logout Functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create custom confirmation modal
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3 class="modal-title">Xác nhận đăng xuất</h3>
                    <p class="modal-message">Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?</p>
                    <div class="modal-actions">
                        <button id="cancel-logout" class="btn-cancel">
                            Hủy bỏ
                        </button>
                        <button id="confirm-logout" class="btn-confirm">
                            Đăng xuất
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Handle cancel
            document.getElementById('cancel-logout').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Handle confirm
            document.getElementById('confirm-logout').addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                window.location.href = 'login.html';
            });
        });
    }

    // Check login status and update UI
    function checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const authLinks = document.getElementById('auth-links');
        const userMenu = document.getElementById('user-menu');
        
        if (authLinks) authLinks.style.display = isLoggedIn ? 'none' : 'flex';
        if (userMenu) userMenu.style.display = isLoggedIn ? 'block' : 'none';
        
        // Set username if logged in
        if (isLoggedIn && document.getElementById('username-display')) {
            const userEmail = localStorage.getItem('userEmail');
            document.getElementById('username-display').textContent = userEmail || 'Tài khoản';
        }
    }
    
    // Initialize auth status check
    checkAuthStatus();
});