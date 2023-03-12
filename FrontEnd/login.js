// login form element
const loginForm = document.querySelector('.login-form');

// event listener for the form submit event
loginForm.addEventListener('submit', function(event) {
  // Prevent the default form submit action
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
    // Check the response status
    if (response.ok) {
      // Get the authentication token
      return response.json();
    } else {
      // Otherwise, display error message
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "block";
      throw new Error('Login failed');
    }
  })
  .then(data => {
    // Save the authentication token in local storage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('isLoggedIn', true);
    console.log('isLoggedIn:', true);
    // Redirect to index.html
    window.location.href = 'index.html';
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// Check if user is logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
  // Show hidden elements
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(element => element.style.display = 'block');

  // Set header margin
  const header = document.querySelector('header');
  header.style.margin = '95px 0 92px 0';

  // Remove category buttons
  const categoryDiv = document.querySelector('#category-buttons');
  categoryDiv.style.display = 'none';

  // Remove login link
  const loginLink = document.querySelector("a[href='login.html']");
  loginLink.parentElement.style.display = 'none';
}



// Méthode post


// Si le login est bon, faire en sorte que le header de index.html prenne une margin de 95px 0 92px 0;
// Faire disparaître la class "category-select";
// Faire apparaître tout ce qui est en display: none;
// Faire disparaître login
