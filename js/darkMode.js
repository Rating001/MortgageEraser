//Save status in local storage
let darkMode = localStorage.getItem('darkModeMortgageEraser');

const darkModeToggle = document.getElementById('dark-mode-toggle');

const enableDarkMode = () => {
    //Remove light mode class from body
    document.body.classList.remove('lightMode');
    //Add dark mode class to the body
    document.body.classList.add('darkMode');
    //Update the local storage variable
    localStorage.setItem('darkModeMortgageEraser', 'enabled')
}

const disableDarkMode = () => {
    //Remove dark mode class from the body
    document.body.classList.remove('darkMode');
    //Add light mode class to the body
    document.body.classList.add('lightMode');
    //Update the local storage variable
    localStorage.setItem('darkModeMortgageEraser', null)
}

if (darkMode === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkModeMortgageEraser');
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})