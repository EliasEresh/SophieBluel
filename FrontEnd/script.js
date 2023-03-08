// API

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => console.log ("toto", data))
  .catch(error => console.error(error));
  
// Page principale et catégories (partie 1)
const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";

const gallery = document.querySelector(".gallery");
const categorySelect = document.createElement("div");
categorySelect.classList.add("category-select");

categorySelect.style.display = "flex";
categorySelect.style.justifyContent = "center";
categorySelect.style.gap = "1rem";
categorySelect.style.marginTop = "51px";
categorySelect.style.marginBottom = "51px";

fetch(categoriesUrl)
  .then(response => response.json())
  .then(data => {
    const categories = new Set([""]);
    data.forEach(category => categories.add(category.name));
    categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category ? category : "Tous";
      button.value = category;
      button.addEventListener("click", event => {
        const category = event.target.value;
        const worksElements = gallery.querySelectorAll(".work");
        worksElements.forEach(workElement => {
          if (category === "" || workElement.dataset.category === category) {
            workElement.style.display = "block";
          } else {
            workElement.style.display = "none";
          }
        });
      });

      button.style.backgroundColor = category === "" ? "#1D6154" : "white";
      button.style.color = category === "" ? "white" : "#1D6154";
      button.style.border = "2px solid #1D6154";
      button.style.borderRadius = "60px";
      button.style.padding = "0.5rem 2rem";
      button.style.height = "37px";
      button.style.fontFamily = "Syne";
      button.style.fontWeight = "700";
      button.style.fontSize = "16px";

      categorySelect.appendChild(button);
    });
  })
  .catch(error => console.error(error));

fetch(worksUrl)
  .then(response => response.json())
  .then(data => {
    data.forEach(work => {
      const workElement = document.createElement("div");
      workElement.classList.add("work");
      workElement.dataset.category = work.category.name;

      const imageElement = document.createElement("img");
      imageElement.src = work.imageUrl;
      workElement.appendChild(imageElement);

      const titleElement = document.createElement("h3");
      titleElement.textContent = work.title;
      workElement.appendChild(titleElement);

      gallery.appendChild(workElement);
    });
  })
  .catch(error => console.error(error));

document.querySelector("#portfolio").insertBefore(categorySelect, gallery);

//local storage

function submitForm(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;

  // Vérifie si l'email et le password sont corrects
  if (email === "sophie.bluel@test.tld" && password === "S0phie") {
    // Si oui, set isLoggedIn flag dans localStorage to true et redirige vers index.html
    localStorage.setItem("isLoggedIn", true);
    window.location.href = "index.html";
      // add black bar to top of page
  const blackBar = document.createElement("div");
  blackBar.style.height = "59px";
  blackBar.style.width = "100%";
  blackBar.style.backgroundColor = "black";
  blackBar.style.position = "fixed";
  blackBar.style.top = "0";
  blackBar.style.left = "0";
  blackBar.style.display = "flex";
  blackBar.style.alignItems = "center";
  document.body.prepend(blackBar);

  // add "Mode édition" text to black bar
  const modeEdition = document.createElement("div");
  modeEdition.innerText = "Mode édition";
  modeEdition.style.color = "white";
  modeEdition.style.fontSize = "16px";
  modeEdition.style.fontWeight = "400";
  modeEdition.style.fontFamily = "Work Sans";
  modeEdition.style.margin = "0 auto";
  blackBar.appendChild(modeEdition);

  // add "modifier" icon after image
  const modifierIcon1 = document.createElement("i");
  modifierIcon1.classList.add("fa-light", "fa-pen-to-square");
  const modifierText1 = document.createElement("span");
  modifierText1.innerText = "modifier";
  modifierText1.style.color = "black";
  modifierText1.style.fontSize = "16px";
  modifierText1.style.fontWeight = "400";
  const imageWrapper = document.querySelector(".me-photo");
  imageWrapper.appendChild(modifierIcon1);
  imageWrapper.appendChild(modifierText1);

  // add "modifier" icon after "Mes Projets" section
  const modifierIcon2 = document.createElement("i");
  modifierIcon2.classList.add("fa-light", "fa-pen-to-square");
  const modifierText2 = document.createElement("span");
  modifierText2.innerText = "modifier";
  modifierText2.style.color = "black";
  modifierText2.style.fontSize = "16px";
  modifierText2.style.fontWeight = "400";
  const portfolioSection = document.querySelector("#portfolio");
  portfolioSection.appendChild(modifierIcon2);
  portfolioSection.appendChild(modifierText2);

  // replace login with logout
  const loginLink = document.querySelector("a[href='login.html']");
  loginLink.innerText = "logout";
  loginLink.addEventListener("click", function() {
    localStorage.setItem("isLoggedIn", false);
    window.location.href = "index.html";
  });

  // remove category buttons
  const categoryButtons = document.querySelectorAll(".category-button");
  categoryButtons.forEach(button => button.remove());


  } else {
    // Sinon, display error message
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";
  }
}

// login form element
const loginForm = document.querySelector('.login-form');

// event listener pour le form submit event
loginForm.addEventListener('submit', function(event) {
  // Prevent the default form submit action
  event.preventDefault();

  // email and password input elements
  const emailInput = loginForm.querySelector('#email-input');
  const passwordInput = loginForm.querySelector('#password-input');

  // email and password values
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  // Méthode post
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: emailValue, password: passwordValue })
  })
  .then(response => {
    // Vérifie la réponse
    if (response.ok) {
      // Redirige vers la page principale si oui
      window.location.href = '/index.html';

      // Obtient le token d'authentification
      const authToken = response.headers.get('Authorization');

      // Sauvegarde dans le local storage
      localStorage.setItem('authToken', authToken);
    } else {
      // Sinon, message d'erreur
      const errorMessage = document.querySelector('#error-message');
      errorMessage.style.display = 'block';
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
