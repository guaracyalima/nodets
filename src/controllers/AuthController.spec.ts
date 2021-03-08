import  AuthController  from './AuthController';
import bcrypt from 'bcrypt';
import authConfig from '../../auth.json';
import { Request, Response } from 'express';
  
describe('AuthController',  () => {

    var req: Request;
    var res: Response;
    const mockRequest = <Request> {
        body: {
            email: 'user@user.com',
            senha: '123'
        }
    }
    jest.mock('bcrypt', () => ({
        bcrypt: jest.fn()
      }))

      jest.mock('express', () => {
        return require('jest-express');
      });

    it('Controle deve estar definido', () => {
        expect(AuthController.login(mockRequest, res)).toBeTruthy()
    });
});