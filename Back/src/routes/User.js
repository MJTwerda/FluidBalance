const express = require('express');
const router = express.Router();
const { User, Op } = require('../db');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const searchUsers = await User.findAll();
        res.json(searchUsers.length !== 0 ? searchUsers : "No hay ningún cliente registrado");  
    } catch {error => res.status(400).send(error)}
});

router.get('/:lastName', async (req, res) => {
    const { name } = req.params;
    try {
        const searchUserByLastName = await User.findAll({
            where: {
                lastName:{[Op.like]:`${lastName}%`}
            }
        })
        res.json(searchUserByLastName ? searchUserByLastName : "No hay ningún cliente con el apellido ingresado")
    } catch {error => res.status(400).send(error)}
})

router.post('/', async (req, res) => {
    const { name, lastName, email } = req.body;
    try {
        const createUser = await User.create({name, lastName, email});
        res.json(createUser);
        
    } catch {error => res.status(400).send(error)}
})

module.exports = router;