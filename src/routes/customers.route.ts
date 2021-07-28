import { Router } from 'express';
import CustomersController from '@controllers/customers.controller';
import { CreateCustomerDto } from '@dtos/customers.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class CustomersRoute implements Routes {
  public path = '/customers';
  public router = Router();
  public customersController = new CustomersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.customersController.getCustomers);
    this.router.get(`${this.path}/:id(\\d+)`, this.customersController.getCustomerById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCustomerDto, 'body'), this.customersController.createCustomer);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateCustomerDto, 'body', true), this.customersController.updateCustomer);
    this.router.delete(`${this.path}/:id(\\d+)`, this.customersController.deleteCustomer);
  }
}

export default CustomersRoute;
