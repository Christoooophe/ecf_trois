## ECF 3 09/05/2025

Objectif du projet -> dockerizer une application e-commerce et rajouter un service de suggestion de recherche

### Présentation de la feature ajoutée

La consigne indiquait de créer un micro service de suggestion de recherche. J'ai donc compris qu'il fallait ajouter un micro service qui allait envoyer des mots-clés en fonction des lettres qu'il allait recevoir en paramètre de requête.

L'idée est donc de récupérer une entrée utilisateur, puis de chercher les mots-clés qui correspondent.
Mon micro service va piocher chez un autre micro service, à savoir le common-data-service pour récupérer les mots clés et les renvoyer à l'utilisateur.

Lorsque l'utilisateur va commencer à taper une lettre, une suggestion de mots clés va apparaitre en dessous de l'input.

### Démarrage de l'application

L'application est déployée avec docker. 

L'application utilise les ports suivants en local (en dehors des conteneurs): 

- Front : 3000
- Mysql : 3008
- Redis : 6380
- Auth-service: 8081
- Common-data-service: 8082
- Payment-service: 8083
- Suggestion-service: 3002

Vous devez vous assurer que ces ports ne sont pas déjà utilisés. Sinon, vous pouvez les changer directement dans le fichier docker compose

Pour démarrer l'entierté de l'application, comprenant le front et les micro services, vous devez, à la racine du projet, entrer la commande (après avoir démarré docker desktop) :

````
docker compose up --build
````

Ensuite, rendez-vous à cette adresse : http://localhost:3000 pour accéder à l'application

Au démarrage du conteneur, la base de donnée common-data-db va être peuplée, ce qui peut nécessiter du temps. Il est possible qu'un message indique que la page charge, n'hésitez pas à actualiser la page toutes les 5 secondes. 


