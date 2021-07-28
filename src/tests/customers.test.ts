import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import { CreateCustomerDto } from '@dtos/customers.dto';
import CustomerRoute from '@routes/customers.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Customers', () => {
  describe('[GET] /customers', () => {
    it('response findAll customers', async () => {
      const customersRoute = new CustomerRoute();
      const customers = customersRoute.customersController.customerService.customers;

      customers.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          email: 'a@email.com',
          given_name: 'A',
          family_name: 'test_user',
        },
        {
          id: 2,
          email: 'b@email.com',
          given_name: 'B',
          family_name: 'test_user',
        },
        {
          id: 3,
          email: 'c@email.com',
          given_name: 'C',
          family_name: 'test_user',
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([customersRoute]);
      return request(app.getServer()).get(`${customersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /customers/:id', () => {
    it('response findOne customer', async () => {
      const customerId = 1;

      const customersRoute = new CustomerRoute();
      const customers = customersRoute.customersController.customerService.customers;

      customers.findByPk = jest.fn().mockReturnValue({
        id: 1,
        email: 'a@email.com',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([customersRoute]);
      return request(app.getServer()).get(`${customersRoute.path}/${customerId}`).expect(200);
    });
  });

  describe('[POST] /customers', () => {
    it('response Create customer', async () => {
      const customerData: CreateCustomerDto = {
        email: 'test@email.com',
        given_name: 'A',
        family_name: 'test_user',
      };

      const customersRoute = new CustomerRoute();
      const customers = customersRoute.customersController.customerService.customers;

      customers.findOne = jest.fn().mockReturnValue(null);
      customers.create = jest.fn().mockReturnValue({
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([customersRoute]);
      return request(app.getServer()).post(`${customersRoute.path}`).send(customerData).expect(201);
    });
  });

  describe.skip('[PUT] /customers/:id', () => {
    it('response Update customer', async () => {
      const customerId = 1;
      const customerData: CreateCustomerDto = {
        email: 'test@email.com',
        given_name: 'A',
        family_name: 'test_user',
      };

      const customersRoute = new CustomerRoute();
      const customers = customersRoute.customersController.customerService.customers;

      customers.findByPk = jest.fn().mockReturnValue({
        id: customerId,
        email: customerData.email,
      });
      customers.update = jest.fn().mockReturnValue([1]);
      customers.findByPk = jest.fn().mockReturnValue({
        id: customerId,
        email: customerData.email,
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([customersRoute]);
      return request(app.getServer()).put(`${customersRoute.path}/${customerId}`).send(customerData).expect(200);
    });
  });

  describe('[DELETE] /customers/:id', () => {
    it('response Delete customer', async () => {
      const customerId = 1;

      const customersRoute = new CustomerRoute();
      const customers = customersRoute.customersController.customerService.customers;

      customers.findByPk = jest.fn().mockReturnValue({
        id: customerId,
        email: 'a@email.com',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([customersRoute]);
      return request(app.getServer()).delete(`${customersRoute.path}/${customerId}`).expect(200);
    });
  });
});
