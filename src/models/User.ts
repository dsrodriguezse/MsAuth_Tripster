import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
    email: string;
    clave: string;
    // Otros campos
}

const userSchema: Schema = new Schema({

    email: {
        type: String,
        required: true,
    },
    clave :{
        type: String,
        required: true,
    }
});
//module.exports = mongoose.model("usuarios", userSchema)
const User = mongoose.model<IUser>('usuarios', userSchema);

export default User;

/*
// Crea y exporta el modelo de usuario usando el esquema definido
const User = mongoose.model<IUser>('Usuario', userSchema);

export default User;*/
