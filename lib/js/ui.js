document.addEventListener("DOMContentLoaded", (event) => {
    // Show/Hide the input panel
    const togglePanelBtn = document.querySelector("#togglePanelBtn");
    const inputPanel = document.querySelector("#inputPanel");
    const pdfSource = document.querySelector("#pdfSource");
    const urlInputField = document.querySelector("#urlInputField");
    const fileInputField = document.querySelector("#fileInputField");
    const loadPdfBtn = document.querySelector("#loadPdfBtn");
    const pdfurlElement = document.querySelector("#pdfUrl");
    let pdfUrl = pdfurlElement.value;

    pdfurlElement.addEventListener("input",()=>{
        pdfUrl = pdfurlElement.value;
    })

    togglePanelBtn.addEventListener("click",(event)=>{
        inputPanel.classList.toggle("hidden");
        const inputPanelText = inputPanel.classList.contains("hidden") ? "Montrer les Options" : "Cacher les Options";
        togglePanelBtn.textContent = inputPanelText;
    })



    // Handle the PDF source selection
    pdfSource.addEventListener("change",()=>{
        const selectedSource = pdfSource.options[pdfSource.selectedIndex].value;
        urlInputField.classList.toggle("hidden", selectedSource !== "url");
        fileInputField.classList.toggle("hidden", selectedSource !== "local");
    })

    // On récupère l'URL du hashtag sans le #
	const url = window.location.hash.substring(1).replace(/\?.*/, "");
	// On traite l'URL pour pouvoir récupérer correctement la source du PDF
	const sourcePDF = handleURL(url);
	if (sourcePDF !== "") {
        const newPdfUrl = sourcePDF;
            if (newPdfUrl) {
                currentPdf = newPdfUrl;
                loadFlipbook(currentPdf, isRTL);
            } else {
                alert("Please enter a valid PDF URL.");
            }
    }

    // Load the PDF based on selected source
    loadPdfBtn.addEventListener("click", ()=>{
        const selectedSource = pdfSource.options[pdfSource.selectedIndex].value;
        if (selectedSource === "url") {
            const newPdfUrl = handleURL(pdfUrl);
            if (newPdfUrl) {
                currentPdf = newPdfUrl;
                loadFlipbook(currentPdf, isRTL);
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
    })
});
