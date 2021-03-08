import { Request, Response } from 'express';
import User from '../scheemas/User';
import { configure, getLogger } from "log4js";
import log4js from 'log4js';
const log = getLogger("UserController");
import {
    ApiPath,
    SwaggerDefinitionConstant,
    ApiOperationGet,
} from 'swagger-express-ts';


class UserController {

    public constructor() {
        log4js.configure('./log4js.json');          
    }

    public async index(req: Request, res: Response): Promise<Response>{
        log.info(" index - metodo de listagem de usuario");
        
        const usuarios = await User.find();
        log.info("registro - Usuário listados com sucesso");

        return res.status(200).send({ 
            'usuarios': usuarios
        })
    }

    public async registro(req: Request, res: Response): Promise<Response> {
        
        log.info(" registro - metodo de registro de usuario");

        const { email } = req.body;

            try{
                if (await User.findOne({ email })) {
                    
                    log.error(` registro - Usuário já cadastrado com o email ${email}`);
                    return res.status(400).json({ 
                        'mensagem': `Usuário já cadastrado com o email ${email}`
                    })

                }

                const usuario = await User.create(req.body);
                log.error("registro - Usuário cadastrado com sucesso");

                return res.status(200).send({ 
                    'mensagem': 'Usuário cadastrado com sucesso',
                    'usuario': usuario
                })

            } catch( erro ) {
                
                log.error(" registro - Falha ao cadastrar usuario ");
                return res.status(400).json({ error: "Falha ao cadastrar usuário" }); 

            }
    }

    public async visualizar(req: Request, res: Response): Promise<Response> {
        log.info(" visualizar - metodo de visualizar usuario");

        const { id } = req.params;
        const usuario = await User.findById({ _id: id });
        
        log.info(`visualizar - Usuário ${id}`);
            try{
                if (!usuario) {

                    log.error(` visualizar - não encontrado`);
                    return res.status(400).json({ 
                        'mensagem': `Usuário não encontrado`
                    })

                } 
                
                const _usuario = await User.findOne({_id: id});
                    return res.status(200).json({ 
                        'mensagem': "Usuário encontrado com sucesso",
                        'usuario': _usuario
                    })

            } catch( erro ) {
                
                log.error(" atualizar - Falha ao atualizar usuario ");
                return res.status(400).json({ error: "Falha ao atualizar usuario " }); 

            } 
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        log.info(" atualizar - metodo de atualizar usuario");

        const { id } = req.params;
        const usuario = await User.findById({ _id: id });
        
        
        log.info(`atualizar - Usuário ${req.params.id}`);
            try{
                if (!usuario) {

                    log.error(` atualizar - não encontrado`);
                    return res.status(400).json({ 
                        'mensagem': `Usuário não encontrado`
                    })

                } 
                
                const usuarioAlterado = await User.updateOne(req.body);

                    log.info(" exclusao - Usuário alterado com sucesso");

                    return res.status(200).json({ 
                        'mensagem': "Usuário alterado com sucesso",
                        'usuario': usuarioAlterado
                    })

            } catch( erro ) {
                
                log.error(" atualizar - Falha ao atualizar usuario ");
                return res.status(400).json({ error: "Falha ao atualizar usuario " }); 

            } 
    }

    public async exclusao(req: Request, res: Response): Promise<Response> {
        
        log.info(" exclusao - metodo de remover usuario");

        const { id } = req.params;
        const usuario = await User.findById({ _id: id });
        
        log.info(`exclusao - Usuário ${req.params.id}`);
            try{
                if (usuario) {
                    
                    await User.remove({_id: id});

                    log.info(" exclusao - Usuário removido com sucesso");

                    return res.status(200).json({ 
                        'mensagem': "Usuário removido com sucesso"
                    })

                } else {
                    log.error(" registro - Falha ao remover usuario ");
                    return res.status(400).json({ error: "Falha ao remover usuario " }); 
                }

            } catch( erro ) {
                
                log.error(" registro - Falha ao remover usuario ");
                return res.status(400).json({ error: "Falha ao remover usuario " }); 

            }
    }

}

export default new UserController();