// API

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => console.log ("Récupération des works", data))
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

fetch(worksUrl)
  .then(response => response.json())
  .then(data => {
    const categories = new Set(["Tous"]); //Plus de Set vide, la catégorie Tous est créée
    data.forEach(work => {
      if(!categories.has(work.category.name)) { // Le "!" inverse la condition
        categories.add(work.category.name);
      }

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

    // Plus besoin de fetch les catégories, boucle sur le Set pour créer les boutons
    categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category;
      button.value = category === "Tous" ? "" : category;
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

      button.style.backgroundColor = category === "Tous" ? "#1D6154" : "white";
      button.style.color = category === "Tous" ? "white" : "#1D6154";
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

document.querySelector("#portfolio").insertBefore(categorySelect, gallery);

//local storage (Partie 2)

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

  // Margin du header
  const header = document.querySelector("header");
  header.style.margin = "95px 0 92px 0";

  // Retire login button
  const loginNav = document.querySelector('.login-nav');
  loginNav.style.display = 'none';

  // Retire category-select div
  const categorySelect = document.querySelector(".category-select");
  categorySelect.style.display = "none";

  // Margin du project-display
  const projectDisplay = document.querySelector(".project-display");
  projectDisplay.style.marginBottom = "92px";
}


// Modale (Partie 3)

// Ouvrir la modale

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

// Première page de la modale

fetch(worksUrl)
  .then(response => response.json())
  .then(data => {
    const modalImages = document.querySelector('.modal-images');

    data.forEach((work, index) => {
      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';
    
      const image = document.createElement('div');
      image.className = 'image';
    
      const arrowIcon = document.createElement('i');
      arrowIcon.className = 'fa-solid fa-arrows-up-down-left-right first-icon';
    
      const img = document.createElement('img');
      img.src = work.imageUrl;
    
      const trashIcon = document.createElement('i');
      trashIcon.className = 'fa-solid fa-trash-can trash';
      trashIcon.setAttribute('id', work.id);
    
      if (index === 0) {
        image.appendChild(arrowIcon);
      }
    
      image.appendChild(img);
      image.appendChild(trashIcon);
    
      const editButton = document.createElement('span');
      editButton.className = 'edit-button';
      editButton.textContent = 'éditer';
    
      imageContainer.appendChild(image);
      imageContainer.appendChild(editButton);
    
      modalImages.appendChild(imageContainer);

      // Event listener pour le delete d'un work
      trashIcon.addEventListener('click', () => {
        deleteWork(work.id);
      });
    });
    
  })
  .catch(error => console.error(error));

//Deuxième page de la modale

const addPhotoButton = document.getElementById('add-photo');
const firstElements = document.getElementById('first-elements');
const newElements = document.getElementById('new-elements');
const closeIcon = document.querySelector('.cross-icon');
const arrowIcon = document.querySelector('.close-icon');
const modal = document.getElementById('modal1');

addPhotoButton.addEventListener('click', function() {
  firstElements.style.display = 'none';
  newElements.style.display = 'flex';
});

closeIcon.addEventListener('click', function() {
  firstElements.style.display = 'flex';
  newElements.style.display = 'none';
});

modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    firstElements.style.display = 'flex';
    newElements.style.display = 'none';
  }
});

arrowIcon.addEventListener('click', function() {
  firstElements.style.display = 'flex';
  newElements.style.display = 'none';
});

//Supprimer les travaux

function deleteWork(workId) {
  const url = `http://localhost:5678/api/works/${workId}`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Effacer dans le DOM aussi
    const imageContainer = document.querySelector(`[id="${workId}"]`).parentNode;
    imageContainer.parentNode.removeChild(imageContainer);
  })
  .catch(error => console.error(error));
}

//Ajouter un projet

// Met un event listener au bouton "Valider"
document.getElementById("send-validation").addEventListener("click", function(event) {
  event.preventDefault();
  // Cherche les data dans le form inputs et le file uploadé
  const title = document.getElementById("title-input").value;
  const category = document.getElementById("category-input").value;
  const file = document.getElementById("photo-addition-button").files[0];
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", file);
  // Vérifie que les champs sont remplis et que le fichier a la bonne taille et le bon format
  if (title.trim() === "" || category.trim() === "" || !file || !["image/jpeg", "image/png"].includes(file.type) || file.size > 4000000) {
    alert("Veuillez remplir tous les champs et sélectionner une image de type jpg ou png de taille maximale 4 Mo.");
    return;
  }
  // Envoie les data à l'API avec un fetch
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: formData
  })
  
  .then(response => response.json())
  .then(data => {
    // Quand l'API répond, display le work ajouté dans la gallerie et la modale
    // On peut accéder aux données du work ajouté depuis le `data` object renvoyé par l'API
    console.log(data);
  })
  .catch(error => console.error(error));
});

// Remplir la category select input avec les données de l'API
fetch("http://localhost:5678/api/categories")
.then(response => response.json())
.then(data => {
  const categoryInput = document.getElementById("category-input");
  data.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id;
    option.text = category.name;
    categoryInput.add(option);
  });
})
.catch(error => console.error(error));

// Image upload
const photoAdditionButton = document.getElementById("photo-addition-button");
const sendValidationButton = document.getElementById("send-validation");

// Met un event listener au bouton send validation
sendValidationButton.addEventListener("click", function() {
  const title = titleInput.value;
  const category = categoryInput.value;
  
});

// Met un event listener sur le bouton d'ajout de photo
photoAdditionButton.addEventListener("change", function() {
  sendValidationButton.style.backgroundColor = "#1D6154";
  const uploadedImage = document.getElementById("uploaded-image");
  const file = this.files[0];
  const reader = new FileReader();

  // Display les works ajoutés dans la modale et la gallery

  reader.addEventListener("load", function () {
    uploadedImage.src = reader.result;
    uploadedImage.classList.remove("hidden");
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
});
