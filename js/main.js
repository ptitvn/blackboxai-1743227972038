document.addEventListener('DOMContentLoaded', function() {
    // Check auth status and update UI
    function checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const authLinks = document.getElementById('auth-links');
        const userMenu = document.getElementById('user-menu');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const userBtn = document.getElementById('user-btn');
        
        if (authLinks) authLinks.style.display = isLoggedIn ? 'none' : 'flex';
        if (userMenu) userMenu.style.display = isLoggedIn ? 'block' : 'none';
        
        // Set username if logged in
        if (isLoggedIn && document.getElementById('username-display')) {
            const userEmail = localStorage.getItem('userEmail');
            document.getElementById('username-display').textContent = userEmail || 'Tài khoản';
        }

        // Toggle dropdown menu
        if (userBtn && dropdownMenu) {
            userBtn.addEventListener('click', function() {
                dropdownMenu.classList.toggle('hidden');
            });
        }

        // Show transaction warning if budget exceeded
        if (isLoggedIn) {
            const transactionWarning = document.getElementById('transaction-warning');
            if (transactionWarning) {
                // In a real app, you would check actual transaction data
                const showWarning = Math.random() > 0.5; // Random for demo
                if (showWarning) {
                    transactionWarning.classList.remove('hidden');
                }
            }
        }
    }

    // Initialize
    checkAuthStatus();
});