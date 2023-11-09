import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    // Otros campos
}

const userSchema: Schema = new Schema({

    _id: {
        type: String
    },
    name: {
        type: String
    },
    apellido: {
        type: String
    },
    direccion: {
        type: String
    },
    clave :{
        type: String
    },
    telefono : {
        type: String
    },
    birthday : {
        type: String
    },
    rol: {
        type: String
    }
});
//module.exports = mongoose.model("usuarios", userSchema)
const User = mongoose.model<IUser>('usuarios', userSchema);

export default User;

/*
// Crea y exporta el modelo de usuario usando el esquema definido
const User = mongoose.model<IUser>('Usuario', userSchema);

export default User;*/
