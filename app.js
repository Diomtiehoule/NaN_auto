import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import  { mongoConnect }  from "./utils/db.js";
import routeUtilisateur from './routers/utilisateur.js';
import routerAutoEcole from './routers/autoEcole.js';

const app = express()
app.use(cors())
app.use(express.json())

dotenv.config({
    path: './config.env'
})

const port =  process.env.PORT || 8081
mongoConnect()
.then(()=>{
    app.listen(port,() =>{
        console.log(`le server est lancé sur le port ${port}`);
    })
})
.catch(e =>{
    console.log('une erreur est survenue' , e.message)
})

app.use('/api/utilisateur' , routeUtilisateur);
app.use('/api/auto_ecole' , routerAutoEcole);