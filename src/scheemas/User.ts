import { Schema, model, Document } from 'mongoose';
import bcrypt, { hash } from 'bcrypt';

interface UserInterface extends Document{
    email?: String,
    senha?: string,
    nome?: String,
    sobrenome?: String,
    compareHash(usuario: UserInterface, senha: string): String,
}

const UserSchema = new Schema({
    email: String,
    senha: String,
    nome: String,
    sobrenome: String,
}, {
    timestamps: true
});

UserSchema.pre<UserInterface>("save", async function hashPassword(next) {
    if (!this.isModified("senha")) next();
  
    this.senha = await bcrypt.hash(this.senha, 8);
});

UserSchema.methods.compareHash = function(this: UserInterface, hash) {
    return bcrypt.compare(hash.senha, this.senha);
}

export default model<UserInterface>('User', UserSchema)