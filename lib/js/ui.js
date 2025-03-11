const zenBtnShowTitle = "Afficher l'interface";
const zenBtnHideTitle = "Masquer l'interface";

function hideInterface() {
  const elementsToHide =
          document.body.querySelectorAll(".hideIfInIframe");
        elementsToHide.forEach((element) => {
          element.style.display = "none";
        });
        const url = new URL(window.location);
        url.searchParams.set('m', '0');
        window.history.pushState({}, '', url);
}
function showInterface() {
  const elementsToHide =
          document.body.querySelectorAll(".hideIfInIframe");
        elementsToHide.forEach((element) => {
          if(element.id =="shareBtn" && !window.location.hash) {
            element.style.display = "none";
          } else {
            element.style.display = "block";
          }
        });
        const url = new URL(window.location);
        url.searchParams.delete('m');
        window.history.pushState({}, '', url);
}

document.addEventListener("DOMContentLoaded", (event) => {
  // Show/Hide the input panel
  const togglePanelBtn = document.querySelector("#togglePanelBtn");
  const inputPanel = document.querySelector("#inputPanel");
  const pdfSource = document.querySelector("#pdfSource");
  const urlInputField = document.querySelector("#urlInputField");
  const fileInputField = document.querySelector("#fileInputField");
  const loadPdfBtn = document.querySelector("#loadPdfBtn");
  const shareBtn = document.querySelector("#shareBtn");
  const pdfurlElement = document.querySelector("#pdfUrl");
  const zenBtn = document.querySelector('#zenBtn');
  const zenBtnShow = document.querySelector('#zenBtnShow');
  const zenBtnHide = document.querySelector('#zenBtnHide');
  let pdfUrl = pdfurlElement.value;

  pdfurlElement.addEventListener("input", () => {
    pdfUrl = pdfurlElement.value;
  });

  togglePanelBtn.addEventListener("click", function (){
    let inputPanelText
    if(inputPanel.style.display=="none"){
      inputPanel.style.display="block"
      inputPanelText = "Cacher les options"
    } else {
      inputPanel.style.display="none"
      inputPanelText = "Montrer les options"
    }
    togglePanelBtn.textContent = inputPanelText;
  });
  zenBtnShow.addEventListener("click", function () {
    showInterface();
    zenBtnShow.style.display="none"
    zenBtnHide.style.display="flex"
    zenBtn.title = zenBtnHideTitle
    togglePanelBtn.textContent = "Cacher les options"
  })
  zenBtnHide.addEventListener("click", function () {
    hideInterface();
    zenBtnShow.style.display="flex"
    zenBtnHide.style.display="none"
    zenBtn.title = zenBtnShowTitle
  })


  shareBtn.addEventListener("click", function () {
    // Création de la boîte de dialogue
    const confirmation = confirm(
      "Votre lien a été copié dans le presse-papier. Cliquez sur “OK” pour que ce lien affiche seulement le flipbook sans l'interface."
    );

    // Récupération de l'URL actuelle
    let url = new URL(window.location);

    // Si l'utilisateur choisit "OK", on ajoute ?m=0
    if (confirmation) {
      url.searchParams.set("m", "0");
    }

    // Copier l'URL modifiée dans le presse-papiers
    navigator.clipboard.writeText(url.toString()).catch((err) => {
      console.error("Erreur lors de la copie du lien : ", err);
    });
  });
  // Handle the PDF source selection
  pdfSource.addEventListener("change", () => {
    const selectedSource = pdfSource.options[pdfSource.selectedIndex].value;
    urlInputField.classList.toggle("hidden", selectedSource !== "url");
    fileInputField.classList.toggle("hidden", selectedSource !== "local");
    if (selectedSource == "local") {
      document.getElementById("pdfFile").click();
      shareBtn.style.display = "none";
    } else {
      if(window.location.hash) {
        shareBtn.style.display = "block";
      }
    }
  });

  urlInputField.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      loadPdfBtn.click();
    }
  });
  fileInputField.addEventListener("change", () => {
    if (!fileInputField.classList.contains("hidden")) {
      loadPdfBtn.click();
    }
  });

  // On récupère l'URL du hashtag sans le #
  const url = window.location.hash.substring(1).replace(/\?.*/, "");
  // On traite l'URL pour pouvoir récupérer correctement la source du PDF
  const sourcePDF = handleURL(url);
  if (sourcePDF !== "") {
    const newPdfUrl = sourcePDF;
    if (newPdfUrl) {
      currentPdf = newPdfUrl;
    } else {
      alert("Please enter a valid PDF URL.");
    }
  }
  const params = new URLSearchParams(document.location.search);
      if (params && params.get("m") == 0) {
        hideInterface();
        zenBtnShow.style.display="flex";
        zenBtnHide.style.display="none";
        zenBtn.title = zenBtnShowTitle
      } else {
        showInterface();
        zenBtnShow.style.display="none";
        zenBtnHide.style.display="flex";
        zenBtn.title = zenBtnHideTitle
      }

  // Load the PDF based on selected source
  loadPdfBtn.addEventListener("click", () => {
    const selectedSource = pdfSource.options[pdfSource.selectedIndex].value;
    if (selectedSource === "url") {
      const newPdfUrl = handleURL(pdfUrl);
      if (newPdfUrl) {
        currentPdf = newPdfUrl;
        loadFlipbook(currentPdf, isRTL);
        window.location.hash = pdfUrl;
        shareBtn.style.display = "block";
      } else {
        alert("Please enter a valid PDF URL.");
      }
    } else if (selectedSource === "local") {
      const file = document.getElementById("pdfFile").files[0];
      if (file) {
        currentPdf = URL.createObjectURL(file);
        loadFlipbook(currentPdf, isRTL);
      } else {
        alert("Please select a valid PDF file.");
      }
    }
  });
});
