import  UserController  from './UserController';
import bcrypt from 'bcrypt';
import authConfig from '../../auth.json';
import { Request, Response } from 'express';
  
describe('UserController',  () => {

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

    it('Controler deve estar definido', () => {
        expect(UserController.index(mockRequest, res)).toBeTruthy()
    });
});