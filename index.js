const express = require('express');
const { connection } = require('./config/db');
const {router} = require('./routes/user.routes');
const {productRouter} = require('./routes/product.routes');
require('dotenv').config();



const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('you have accessed the root route');
}
);


app.use(router);
app.use(productRouter);





app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error,"error")
    }
    console.log(`Listening on port ${process.env.port}`);
}
);

