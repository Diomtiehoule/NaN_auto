import { model , Schema }from 'mongoose';

const UtilisateurModel = new Schema({
    name :{
        type : String,
        required : true
    },
    lastName :{
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    }

},
    {
        timestamps : true
    }
)


export default model('utilisateur', UtilisateurModel)