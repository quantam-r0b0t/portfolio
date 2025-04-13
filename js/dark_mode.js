const darkModeBtn = document.getElementById('darkModeBtn');
        darkModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                darkModeBtn.textContent = '☀️';
            } else {
                darkModeBtn.textContent = '🌙';
            }
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeBtn.textContent = 'Light Mode';
}