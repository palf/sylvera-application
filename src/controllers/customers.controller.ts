import { NextFunction, Request, Response } from 'express';
import { CreateCustomerDto } from '@dtos/customers.dto';
import { Customer } from '@interfaces/customers.interface';
import customerService from '@services/customers.service';

class CustomersController {
  public customerService = new customerService();

  public getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCustomersData: Customer[] = await this.customerService.findAllCustomer();

      res.status(200).json({ data: findAllCustomersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId = Number(req.params.id);
      const findOneCustomerData: Customer = await this.customerService.findCustomerById(customerId);

      res.status(200).json({ data: findOneCustomerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerData: CreateCustomerDto = req.body;
      const createCustomerData: Customer = await this.customerService.createCustomer(customerData);

      res.status(201).json({ data: createCustomerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId = Number(req.params.id);
      const customerData: CreateCustomerDto = req.body;
      const updateCustomerData: Customer = await this.customerService.updateCustomer(customerId, customerData);

      res.status(200).json({ data: updateCustomerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId = Number(req.params.id);
      const deleteCustomerData: Customer = await this.customerService.deleteCustomer(customerId);

      res.status(200).json({ data: deleteCustomerData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CustomersController;
