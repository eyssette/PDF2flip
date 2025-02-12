$(document).ready(function () {
    // Show/Hide the input panel
    $("#togglePanelBtn").click(function () {
        $("#inputPanel").toggleClass("hidden");
        $(this).text($("#inputPanel").hasClass("hidden") ? "Show Options" : "Hide Options");
    });

    // Handle the PDF source selection
    $("#pdfSource").change(function () {
        var selectedSource = $(this).val();
        $("#urlInputField").toggleClass("hidden", selectedSource !== "url");
        $("#fileInputField").toggleClass("hidden", selectedSource !== "local");
    });

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
    $("#loadPdfBtn").click(function () {
        const selectedSource = $("#pdfSource").val();
        if (selectedSource === "url") {
            const newPdfUrl = handleURL($("#pdfUrl").val());
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
    });

    // Toggle between RTL and LTR
    $("#toggleDirectionBtn").click(function () {
        isRTL = !isRTL;  // Toggle the RTL flag
        loadFlipbook(currentPdf, isRTL);
        $(this).text(isRTL ? "Switch to LTR" : "Switch to RTL");
    });
});
