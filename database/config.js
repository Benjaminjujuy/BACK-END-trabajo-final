const mongoose = require(`mongoose`);

mongoose

.connect(process.env.MONGO_CONNECT)
.then(() => console.log("base de datos conectada"))
.catch((err) => console.log("error en la db", err));