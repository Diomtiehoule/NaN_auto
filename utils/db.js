import mongoose from 'mongoose'

export const mongoConnect = async () =>{
    try{
        let mongoUrl = "mongodb+srv://abrahamdiomande85:diom_nan@cluster0.2usc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        if(!mongoUrl) throw new Error ("url mongodb introuvable !")
        await mongoose.connect(mongoUrl , {
        useNewUrlParser : true ,
        useUnifiedTopology : true})
        .then(()=>{
            console.log("Connexion éffectuée à MongoDB")
        })
    } 
    catch (err){
        console.log("Vérifiez votre connexion !!")
        throw new Error(err)
    }
}

