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

        // Changement de couleur des boutons quand ils sont sélectionnés
        const buttons = categorySelect.querySelectorAll("button");
        buttons.forEach(button => {
          button.style.backgroundColor = button.value === category ? "#1D6154" : "white";
          button.style.color = button.value === category ? "white" : "#1D6154";
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
      button.style.cursor = "pointer";

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

//local storage (Partie 2)

function submitForm(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;

  // Fetch method pour vérifier email et password avec le backend
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
  .then(response => {
    console.log('response', response);
    // Check the response status
    if (response.ok) {
      // Set the isLoggedIn flag in localStorage to true
      localStorage.setItem("isLoggedIn", true);
      // Redirige vers index.html
      window.location.href = "index.html";
    } else {
      // Sinon, display error message
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "block";
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

if (localStorage.getItem("isLoggedIn") === "true") {

  // Remplace login par logout
  const logoutBtn = document.querySelector(".logout");
  logoutBtn.addEventListener("click", function() {
    localStorage.clear();
    window.location.href = "index.html";
  });

  // Display elements with display: none
  const topBar = document.getElementById("top-bar");
  topBar.style.display = "flex";
  
  const editionMode = document.querySelectorAll(".edition-mode");
  editionMode.forEach(element => element.style.display = "flex");

  const publishButton = document.querySelector(".publish-button input[type='submit']");
  publishButton.classList.remove("publish");
  
  const logout = document.querySelector(".logout");
  logout.style.display = "block";
  
  const figureDisplay = document.querySelector(".figure-display");
  figureDisplay.style.display = "flex";
  
  const modificationDisplayImage = document.querySelector(".modification-display-image");
  modificationDisplayImage.style.display = "flex";
  
  const modify = document.querySelectorAll(".modify");
  modify.forEach(element => element.style.display = "block");
  
  const modificationDisplayProject = document.querySelector(".modification-display-project");
  modificationDisplayProject.style.display = "flex";

  // Set margin for header
  const header = document.querySelector("header");
  header.style.margin = "95px 0 92px 0";

  // Retire login button
  const loginNav = document.querySelector('.login-nav');
  loginNav.style.display = 'none';

  // Retire category-select div
  const categorySelect = document.querySelector(".category-select");
  categorySelect.style.display = "none";

  // Set margin for project-display
  const projectDisplay = document.querySelector(".project-display");
  projectDisplay.style.marginBottom = "92px";
}


// Modale (Partie 3)

const openModal = function (e) {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href').substring(1); // Enlève le leading #
  const target = document.getElementById(targetId);
  if (!target) {
    console.error(`Cannot find modal element with ID ${targetId}`);
    return;
  }
  target.style.display = 'flex';
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');

  // Event listener pour le modal wrapper, ferme la fenêtre quand on click en dehors
  target.querySelector('.modal-wrapper').addEventListener('click', function (e) {
    e.stopPropagation();
  });
};

//Fermer la modale

const closeModal = function (target) {
  target.style.display = 'none'
  target.setAttribute('aria-hidden', 'true')
  target.removeAttribute('aria-modal')
}

document.querySelectorAll('.modal').forEach(a => {
  a.addEventListener('click', openModal)
})

document.querySelectorAll('.modal-display').forEach(modal => {
  modal.addEventListener('click', function (e) {
    if (e.target === this) {
      closeModal(this);
    }
  });
});

document.querySelectorAll('.modal-close').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    closeModal(e.target.closest('.modal-display'));
  });
});

//Supprimer les travaux
