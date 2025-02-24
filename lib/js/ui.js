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
  let pdfUrl = pdfurlElement.value;

  pdfurlElement.addEventListener("input", () => {
    pdfUrl = pdfurlElement.value;
  });

  togglePanelBtn.addEventListener("click", (event) => {
    inputPanel.classList.toggle("hidden");
    const inputPanelText = inputPanel.classList.contains("hidden")
      ? "Montrer les options"
      : "Cacher les options";
    togglePanelBtn.textContent = inputPanelText;
  });

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
      shareBtn.style.display = "block";
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
      const params = new URLSearchParams(document.location.search);
      if (params && params.get("m") == 0) {
        const elementsToHide =
          document.body.querySelectorAll(".hideIfInIframe");
        elementsToHide.forEach((element) => {
          element.style.display = "none";
        });
      } else {
        shareBtn.style.display = "block";
      }
      currentPdf = newPdfUrl;
      loadFlipbook(currentPdf, isRTL);
    } else {
      alert("Please enter a valid PDF URL.");
    }
  }

  // Load the PDF based on selected source
  loadPdfBtn.addEventListener("click", () => {
    const selectedSource = pdfSource.options[pdfSource.selectedIndex].value;
    if (selectedSource === "url") {
      shareBtn.style.display = "block";
      const newPdfUrl = handleURL(pdfUrl);
      if (newPdfUrl) {
        currentPdf = newPdfUrl;
        loadFlipbook(currentPdf, isRTL);
        window.location.hash = pdfUrl;
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
