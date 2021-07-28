import DB from '@databases';
import { CreateCustomerDto } from '@dtos/customers.dto';
import { HttpException } from '@exceptions/HttpException';
import { Customer } from '@interfaces/customers.interface';
import { isEmpty } from '@utils/util';

class CustomerService {
  public customers = DB.Customers;

  public async findAllCustomer(): Promise<Customer[]> {
    const allCustomer: Customer[] = await this.customers.findAll();
    return allCustomer;
  }

  public async findCustomerById(customerId: number): Promise<Customer> {
    if (isEmpty(customerId)) throw new HttpException(400, "You're not customerId");

    const findCustomer: Customer = await this.customers.findByPk(customerId);
    if (!findCustomer) throw new HttpException(409, "You're not customer");

    return findCustomer;
  }

  public async createCustomer(customerData: CreateCustomerDto): Promise<Customer> {
    if (isEmpty(customerData)) throw new HttpException(400, "You're not customerData");

    const findCustomer: Customer = await this.customers.findOne({ where: { email: customerData.email } });
    if (findCustomer) throw new HttpException(409, `Your email ${customerData.email} already exists`);

    const createCustomerData: Customer = await this.customers.create({ ...customerData });
    return createCustomerData;
  }

  public async updateCustomer(customerId: number, customerData: CreateCustomerDto): Promise<Customer> {
    if (isEmpty(customerData)) throw new HttpException(400, "You're not customerData");

    const findCustomer: Customer = await this.customers.findByPk(customerId);
    if (!findCustomer) throw new HttpException(409, "You're not customer");

    await this.customers.update({ ...customerData }, { where: { id: customerId } });

    const updateCustomer: Customer = await this.customers.findByPk(customerId);
    return updateCustomer;
  }

  public async deleteCustomer(customerId: number): Promise<Customer> {
    if (isEmpty(customerId)) throw new HttpException(400, "You're not customerId");

    const findCustomer: Customer = await this.customers.findByPk(customerId);
    if (!findCustomer) throw new HttpException(409, "You're not customer");

    await this.customers.destroy({ where: { id: customerId } });

    return findCustomer;
  }
}

export default CustomerService;
