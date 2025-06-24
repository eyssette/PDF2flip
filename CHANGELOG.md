## 4.10.0 (2025-06-24)

### Feat

- ajout d'un bouton pour télécharger le PDF

### Fix

- prise en compte des URLs longues sur plusieurs lignes
- paramètre "i=0" (pour cacher le bouton en forme d'œil) ne s'utilise qu'avec "m=0" (pour cacher le menu)
- ouverture du fichier directement si vraiment on ne peut pas le visualiser
- pas de bouton print en cas de PDF en ligne (avec hash)

### Chore

- config Taskfile & commitizen

### Docs

- explications pour paramètre i=0

## 4.9.0 (2025-04-17)

### Feat

- paramètre i=0 pour cacher le bouton d'interface

## 4.8.4 (2025-04-03)

### Fix

- chargement d'un fichier local (pas besoin de corsProxy)

## 4.8.3 (2025-03-16)

### Fix

- couleur de fond des liens dans PDF

## 4.8.2 (2025-03-16)

### Fix

- vérifier si boutons print et share existent

## 4.8.1 (2025-03-14)

### Fix

- typo i18n / "share"

## 4.8.0 (2025-03-14)

### Feat

- i18n - ajout de l'occitan

### Fix

- prise en compte pour l'internationalisation des placeholders

## 4.7.1 (2025-03-14)

### Fix

- lang doit être défini d'abord par le navigator

## 4.7.0 (2025-03-14)

### Feat

- possibilité de changer de proxy s'il ne fonctionne pas

### Fix

-  handleURL ne gère plus le corsProxy
- changement message alertNoValidURL

## 4.6.0 (2025-03-14)

### Feat

- internationalisation de PDF2flip

### Fix

- chargement PDF avec menu : ne pas utiliser handleURL par défaut

## 4.5.0 (2025-03-13)

### Feat

- on n'utilise le proxy CORS que si besoin

### Perf

- réduction taille PDF initial

## 4.4.5 (2025-03-13)

### Fix

- supression closeQuotePanelOnClickOutside

## 4.4.4 (2025-03-12)

### Fix

- liens vers tickets & mail tickets

## 4.4.3 (2025-03-12)

### Fix

- liens dans le PDF initial

## 4.4.2 (2025-03-12)

### Fix

- si on a "e" (endPage) et "p"  comme paramètre : retour à la page initiale définie par "p" plutôt qu'à la page 1

## 4.4.1 (2025-03-12)

### Fix

- liens relatifs pour CSS dans ./lib/css/page/

## 4.4.0 (2025-03-12)

### Feat

- boutons "share" et "info" dans la barre de menu en bas

## 4.3.2 (2025-03-12)

### Fix

- oubli d'un texte

## 4.3.1 (2025-03-12)

### Fix

- texte pour déplier/replier le menu de sélection d'un PDF

## 4.3.0 (2025-03-12)

### Feat

- hideOptions au moment de loadFlipbook (sauf pour readme.pdf au début)

## 4.2.0 (2025-03-12)

### Feat

- si endpage param, pas de bouton "print"

## 4.1.2 (2025-03-11)

### Fix

- 2e appel à loadFlipbook inutile

## 4.1.1 (2025-03-11)

### Fix

- conflit avec fonction interne detectHash : supprimée

## 4.1.0 (2025-03-11)

### Feat

- paramètre e dans URL pour endPage

## 4.0.0 (2025-03-11)

### Feat

- boutons zoom, plein écran, impression / suppression customisation librairie

## 3.4.0 (2025-02-25)

### Feat

- simplification accès PDF sur Nuage

## 3.3.0 (2025-02-25)

### Feat

- paramètres URL (openPage+singlePageMode)

## 3.2.0 (2025-02-25)

### Feat

- effet drag3D de la page

## 3.1.3 (2025-02-25)

### Fix

- togglePanelBtn après clic sur zenBtnShow

## 3.1.2 (2025-02-25)

### Fix

- togglePanelBtn

## 3.1.1 (2025-02-24)

### Fix

- shareBtn qui s'affichait quand plusieurs clics sur zenBtn

## 3.1.0 (2025-02-24)

### Feat

- bouton pour afficher/masquer l'interface

## 3.0.0 (2025-02-24)

### BREAKING CHANGE

- le scroll dans le PDF (zoom /
déplacements horizontaux et verticaux) avec la
souris ou du multitouch sur le trackpad
n'est plus possible (la solution était trop lente)

### Feat

- suppression des événements wheel

## 2.7.0 (2025-02-24)

### Feat

- bouton de partage d'un flipbook en ligne

## 2.6.0 (2025-02-24)

### Feat

- ajout d'un bouton d'informations (lien vers la Forge)

## 2.5.0 (2025-02-24)

### Feat

- ajout de l'URL dans le hash quand on charge un pdf en ligne

## 2.4.0 (2025-02-24)

### Feat

- fichier readme en PDF sur la page d'accueil

## 2.3.0 (2025-02-24)

### Feat

- zoom possible sur mobile

## 2.2.1 (2025-02-24)

### Fix

- francisation d'un message d'erreur

## 2.2.0 (2025-02-23)

### Feat

- zoom (si ctrl+clic ou ctrl+mousewheel) et scroll (si mousewheel)

## 2.1.0 (2025-02-23)

### Feat

- clic "PDF en local" ouvre directement boîte choix d'un fichier

## 2.0.3 (2025-02-22)

### Fix

- francisation de termes "Close" et "Loading"

## 2.0.2 (2025-02-22)

### Fix

- icon-close pour l'annulation du chargement du PDF

## 2.0.1 (2025-02-21)

### Fix

- CSS background-color pour canvas

## 2.0.0 (2025-02-21)

### BREAKING CHANGE

- licence plus restrictive, pour
s'adapter à la nouvelle version, lite, de dflip
- perte de certaines
fonctionnalités (zoom notamment)

### Refactor

- version lite de la librairie dflip

## 1.3.1 (2025-02-21)

### Perf

- **CSS**: configuration de tailwind

## 1.3.0 (2025-02-21)

### Feat

- **ui**: possibilité de désactiver les menus avec ?m=0 si on indique l'URL d'un PDF dans le hash

## 1.2.0 (2025-02-21)

### Feat

- **listeners**: load file si Enter pour mode en ligne ou fichier chargé pour mode local

## 1.1.2 (2025-02-21)

## 1.1.1 (2025-02-21)

### Refactor

- suppression partielle de jQuery + fix: update button

## 1.1.0 (2025-02-21)

### Feat

- **loadPDFfromURL**: toujours utiliser un proxy CORS

## 1.0.0 (2025-02-21)
