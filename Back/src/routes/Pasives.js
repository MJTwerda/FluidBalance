const express = require('express');
const router = express.Router();
const { Pasives, User, Op, connection } = require('../db');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const allPasives = Pasives.findAll();

        res.json(allPasives.length > 0 ? allPasives : "El cliente no tiene Pasivos regitrados")

    } catch {error => res.send(error)}
})

router.post('/', async (req, res) => {
    const { date, concept, amount, userId } = req.body;
    try {
        const addPasive = await Pasives.create({
            date, 
            concept,
            amount,
        });
        if (userId) {
           let change = await User.update(
                {
                    balance: connection.literal(`balance - ${amount}`)}, {
                    where: {id: userId}
                });

            let setIdUser = await addPasive.setUser(userId);
        }
        res.json(addPasive);

    } catch {error => res.status(400).send(error)}
})

module.exports = router;