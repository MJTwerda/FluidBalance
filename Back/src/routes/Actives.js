const express = require('express');
const router = express.Router();

router.use(express.json());

const { Actives, User, Op, connection } = require('../db');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const allActives = await Actives.findAll({
            where: {
                UserId: userId
            }
        })
        res.json(allActives ? allActives : "El cliente no tiene ningún activo por el momento")
    } catch {error => res.status(400).send(error)}
})

router.post('/', async (req, res) => {
    const { date, concept, amount, userId } = req.body;
    try {
        const addActive = await Actives.create({
            date, 
            concept,
            amount,
        })
        if (userId) {
            let change = await User.update(
                 {
                     balance: connection.literal(`balance + ${amount}`)}, {
                     where: {id: userId}
                 });
 
             let setIdUser = await addActive.setUser(userId);
         }
         res.json(addActive);

    } catch {error => res.status(400).send(error)}
})

module.exports = router;