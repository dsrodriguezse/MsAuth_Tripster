import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    // Otros campos
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Otros campos
});

// Crea y exporta el modelo de usuario usando el esquema definido
const User = mongoose.model<IUser>('Usuario', userSchema);

export default User;
