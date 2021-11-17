const express = require('express');
const router = express.Router();
const { Pasives, Actives, User, Op, connection } = require('../db');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const allPasives = Pasives.findAll();

        res.json(allPasives.length > 0 ? allPasives : "El cliente no tiene Pasivos regitrados")

    } catch {error => res.send(error)}
})

router.post('/', async (req, res) => {
    const { date, concept, amount, type, password, userId } = req.body;
    try {
        if (type === 'pasive') {
            const addPasive = await Pasives.create({
                date, 
                concept,
                amount,
            });
            if (userId) {
            let change = await User.update(
                    {
                        balance: connection.literal(`balance - ${amount}`)}, {
                        where: {password: password}
                    });

                let setIdUser = await addPasive.setUser(userId);
            }
            res.json(addPasive);
        }

        if (type === 'active') {
            const addActive = await Actives.create({
                date, 
                concept,
                amount,
            });
            if (userId) {
            let change = await User.update(
                    {
                        balance: connection.literal(`balance + ${amount}`)}, {
                            where: {password: password}
                    });

                let setIdUser = await addActive.setUser(userId);
            }
            res.json(addActive);
        }

    } catch {error => res.status(400).send(error)}
})

module.exports = router;