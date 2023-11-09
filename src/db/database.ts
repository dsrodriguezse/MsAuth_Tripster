
import mongoose from 'mongoose';
export const connectDB = async (): Promise<void> => {
    try {
        mongoose.connect('mongodb+srv://Juan:123@tripsteruser.cipxjmu.mongodb.net/usuarios?retryWrites=true&w=majority', {
            /*useNewUrlParser: true,
            useUnifiedTopology: true*/

        })
            .then(db => console.log('DB Mongo is connected'))
            .catch(err => console.log(err));
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
    
};