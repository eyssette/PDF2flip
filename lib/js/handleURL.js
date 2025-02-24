const shortcuts = [["", ""]];
const corsProxy = "https://corsproxy.io/?url=";

function handleURL(url) {
  if (url !== "") {
    let addCorsProxy = true;
    // Vérification de la présence d'un raccourci
    const shortcut = shortcuts.find((element) => element[0] == url);
    if (shortcut) {
      url = shortcut[1];
      // Si on a un raccourci, on n'a pas besoin de traiter correctement l'url
      return url;
    }
    // Gestion des fichiers hébergés sur la forge et publiés sur une page web
    if (url.includes(".forge")) {
      addCorsProxy = false;
    }
    // Gestion des fichiers hébergés sur github
    if (url.startsWith("https://github.com")) {
      addCorsProxy = false;
      url = url.replace(
        "https://github.com",
        "https://raw.githubusercontent.com"
      );
      url = url.replace("/blob/", "/");
    }
    url = addCorsProxy ? corsProxy + url : url;
  }
  return url;
}
