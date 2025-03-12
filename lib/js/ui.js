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
        hideMenu = true;
        window.history.pushState({}, '', url);
}
function showInterface() {
  const elementsToHide =
          document.body.querySelectorAll(".hideIfInIframe");
        elementsToHide.forEach((element) => {          
            element.style.display = "block";
        });
        const url = new URL(window.location);
        url.searchParams.delete('m');
        hideMenu = false;
        window.history.pushState({}, '', url);
}

document.addEventListener("DOMContentLoaded", (event) => {
  // Show/Hide the input panel
  const pdfSource = document.querySelector("#pdfSource");
  const urlInputField = document.querySelector("#urlInputField");
  const fileInputField = document.querySelector("#fileInputField");
  const loadPdfBtn = document.querySelector("#loadPdfBtn");
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
      inputPanelText = "Replier ce menu"
    } else {
      inputPanel.style.display="none"
      inputPanelText = "Sélectionner un PDF"
    }
    togglePanelBtn.textContent = inputPanelText;
  });
  zenBtnShow.addEventListener("click", function () {
    showInterface();
    zenBtnShow.style.display="none"
    zenBtnHide.style.display="flex"
    zenBtn.title = zenBtnHideTitle
    togglePanelBtn.textContent = "Sélectionner un PDF"
  })
  zenBtnHide.addEventListener("click", function () {
    hideInterface();
    zenBtnShow.style.display="flex"
    zenBtnHide.style.display="none"
    zenBtn.title = zenBtnShowTitle
  })


  
  // Handle the PDF source selection
  pdfSource.addEventListener("change", () => {
    const selectedSource = pdfSource.options[pdfSource.selectedIndex].value;
    urlInputField.classList.toggle("hidden", selectedSource !== "url");
    fileInputField.classList.toggle("hidden", selectedSource !== "local");
    if (selectedSource == "local") {
      document.getElementById("pdfFile").click();
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


  // On traite l'URL pour pouvoir récupérer correctement la source du PDF
  const sourcePDF = handleURL(urlHash);
  if (sourcePDF !== "") {
    const newPdfUrl = sourcePDF;
    if (newPdfUrl) {
      currentPdf = newPdfUrl;
      hideOptions = true;
    } else {
      alert("L'URL de votre fichier ne semble pas valide");
    }
  }
  
      if (params && hideMenu) {
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
        loadFlipbook(currentPdf, isRTL, {hideOptions: true, showShareBtn: true});
        window.location.hash = pdfUrl;
      } else {
        alert("L'URL de votre fichier ne semble pas valide");
      }
    } else if (selectedSource === "local") {
      const file = document.getElementById("pdfFile").files[0];
      if (file) {
        currentPdf = URL.createObjectURL(file);
        loadFlipbook(currentPdf, isRTL, {hideOptions: true});
      } else {
        alert("L'URL de votre fichier ne semble pas valide");
      }
    }
  });
});
