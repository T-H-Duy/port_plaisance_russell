const express = require('express');
const router = express.Router();

/*
On utilise le routeur d'express pour définir 4 routes.
On exprime ici ce qu'on appelle un CRUD pour Create, Read, Update, Delete
Pour déclarer une route dans express : app.verbeHttp(route, fonction)
Ici on utilise le router pour appeler le verbe Http
router.get('/:id', service.getById);
le callback sera fourni par un service qu'on va déclarer
Recourir à des services permet de structurer le projet et séparer les diverses logiques
On pourra se resservir de ces mêmes services pour d'autres entités que users
*/

const service = require('../services/users');

const private = require('../middlewares/private');

// La route pour lire les infos d'un utilisateur
router.get('/:id', private.checkJWT, service.getById);
// La route pour ajouter un utilisateur
router.put('/add', service.add);
// La route pour modifier un utilisateur
router.patch('/:id', private.checkJWT, service.update);
// La route pour supprimer un utilisateur
router.delete('/:id', private.checkJWT, service.delete);

// Ajout de la route /authenticate
router.post('/authenticate', service.authenticate);

module.exports = router;
