import express from 'express'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './router'

const key = require('./config/db');

//database connection
mongoose.Promise = global.Promise;
// const dbUrl =  "mongodb://localhost:27017/storage_lym";
const dbUrl =  "mongodb://ux6iq4lfbxcymdlvy9c2:WU0qua8hqX0CpYgUrbFZ@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bcixzvgzykwpugl?replicaSet=rs0";
// const dbUrl =  key.database[0];
mongoose.connect(
    dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(mongoose => console.log("Conectado a la BD en el puerto 27017"))
.catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded(
    {
        extended: true
    }
));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', router);

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
    console.log("El servidor se ejecuto correctamente");
});