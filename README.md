# Bookmark backend

Backend en NodeJS

Réaliser une application de gestion de bookmark pour ajouter des liens Vimeo et Flickr.

Les liens référencés ne pourront être que de 2 types :
* vidéo (provenant de Vimeo)
* photo (provenant de Flickr)

Les propriétés communes d’un lien référencé sont :
* URL
* titre
* auteur
* date d'ajout

Les liens de type video auront les propriétés spécifiques suivantes :
* largeur
* hauteur
* durée

Les liens de type photo devront avoir en plus les propriétés :
* largeur
* hauteur

Il est possible d’associer des mots-clés pour chaque lien référencé.

La récupération des propriétés d’un lien référencé sont obtenues en utilisant le protocole ouvert oEmbed (http://oembed.com/).

## Install

`npm install` -> `npm start`


## TODO

- gestion de la pagination
- gestion relationnel de la BDD je n'ai pas réussis à fair 3 table :une common, une vimeo et une autre flickr, j'ai passé un peu de temps dessus j'ai préféré avancer.
- un début de gestion d'erreur est en place, reste a paufiner
- des Test, j'ai initier quelques TU
- sur la gestion des tag, j'ai compris plus tard qu'il fallait une table tags et deux url peuvent avec les même tag, exemple une photo et une video sont lié a un tag 'totoro', ici les tag sont de simple champs texts updatable




