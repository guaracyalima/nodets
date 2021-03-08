import { Request, Response } from 'express';
import User from '../scheemas/User';
import bcrypt from 'bcrypt';
import { configure, getLogger } from "log4js";
import log4js from 'log4js';
const log = getLogger("AuthController");

import jwt from 'jsonwebtoken';
import authConfig from '../../auth.json';

class AuthController {
    
    public constructor() {
       log4js.configure('./log4js.json');          
    }
    
    public async login(req: Request, res: Response): Promise<Response>{
        
        log.info("Autenticação")

        const { email, senha } = req.body;
        const usuario = await User.findOne({ email }).select('+password');

        if(!usuario){
            log.error("Usuário não encontrado")
            return res.status(400).send({ 'error': 'Usuário nção encontrado '})
        }
            
        if(!await usuario.compareHash(usuario, senha)){
            log.error("Senha invalida")            
            return res.status(400).send({ 'error': `Senha invalida`})
        }

        var token = jwt.sign({ id: usuario.id }, authConfig.secret,{
            expiresIn: 86400
        })
            
        log.info("Usuario autenticado com sucesso!")
        return res.status(200).send({ 
            'mensagem': 'Usuário autenticado',
            'usuario': usuario,
            'token': token
        })
    }

}

export default new AuthController();