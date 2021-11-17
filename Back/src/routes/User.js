const express = require('express');
const router = express.Router();
const { User, Op } = require('../db');

router.use(express.json());

router.post('/', async (req, res) => {
    const { user, password } = req.body;
    try {
        const createUser = await User.create({user, password});
        res.json(createUser);
        
    } catch {error => res.status(400).send(error)}
})

router.get('/', async (req, res) => {
    try {
        const searchUsers = await User.findAll();
        res.json(searchUsers);
        //res.json(searchUsers.length !== 0 ? searchUsers : ["No hay ningún cliente registrado"]); 

    } catch {error => res.status(400).send(error)}
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const searchUserById = await User.findOne({
            where: {id}
        })
        res.json(searchUserById ? searchUserById : "No se encontró el usuario con ese ID")

    } catch {error => res.status(400).send(error)}
})

module.exports = router;