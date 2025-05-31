export interface UserData {
  alias: string;
  available_amount: number;
  cvu: string;
  dni: number;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  phone: string;
  token: string;
  user_id: number;
}

export interface CreditCard {
  account_id: number;
  cod: number;
  expiration_date: string;
  first_last_name: string;
  id: number;
  number_id: number;
}
