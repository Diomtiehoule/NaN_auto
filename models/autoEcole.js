import { model , Schema }from 'mongoose';

const AutoEcoleModel = new Schema({
    name :{
        type : String,
        required : true
    },
    commune :{
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },

},
    {
        timestamps : true
    }
)


export default model('autoEcole', AutoEcoleModel);