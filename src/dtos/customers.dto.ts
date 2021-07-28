import { IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  public email: string;

  @IsString()
  public given_name: string;

  @IsString()
  public family_name: string;
}
