import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
    email: string;
    clave: string;
    // Otros campos
}

const userSchema: Schema = new Schema({

    _id: {
        type: String,
        required: true,
    },
    clave :{
        type: String,
        required: true,
    }
});
const User = mongoose.model<IUser>('usuarios', userSchema);

export default User;

