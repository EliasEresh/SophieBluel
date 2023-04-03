// login form element
const loginForm = document.querySelector('.login-form');

// event listener for the form submit event
loginForm.addEventListener('submit', function(event) {
  // Empêcher le comportement par défaut du formulaire
  event.preventDefault();

  // email and password input elements
  const emailInput = loginForm.querySelector('#email-input');
  const passwordInput = loginForm.querySelector('#password-input');

  // email and password values
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: emailValue, password: passwordValue })
  })
  .then(response => {
    // Vérifie le response status
    if (response.ok) {
      // Obtient le token d'authentification
      return response.json();
    } else {
      // Sinon, montre le message d'erreur
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "block";
      throw new Error('Login failed');
    }
  })
  .then(data => {
    // Sauvegarde le token d'authentification dans le local storage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('isLoggedIn', true);
    console.log('isLoggedIn:', true);
    // Rediriger vers index.html
    window.location.href = 'index.html';
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

