const { connection } = require('./src/db');
const server = require('./src/routes/index');

connection.sync()
.then(() => 
server.listen(3001, () => {
    console.log('Is listening at 3001');
})
)
.catch(e => console.log('Error de SYNC', e));
