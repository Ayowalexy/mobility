import React from "react";

export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
  accountBalance: string | number;
  token?: string;
  accountType: string;
  referral_code: string;
  points: number;
}
export type IAuthData = {
  user: IUser;
};


export type IBanks = {
  id: number;
  name: string;
  code: string;
}

export type IUserBanks = {
  account_number?: string;
  account_name?: string;
  bank_id?: number,
  code?: string;
}

export type ITransactions = {
  reference?: string;
  amount?: number;
  name?: string;
  type?: string;
  status?: "success" | 'pending' | 'fail';
  createdAt?: string;
  _id?: string;
}

export type fundProps = {
  authorization_code: string;
  amount: string;
  email: string
}

export type TransactionsProps = {
  status: 'success' | 'fail' | 'pending' | 'debit' | 'credit',
  date: string,
  name: string,
  amount?: string,
  _id: string;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>

}

export type creditCardProps = {
  authorization_code: string;
  bank: string;
  last4: string;
  account_name: string;
}

export type SettingsDataProps = {
  icon: string | any;
  header: string;
  text?: string;
  screen?: string;
} 

export type dataProps = {
  name: "Driver" | "Consumer",
  icon: string,
  text: string
}

export const data:dataProps[] = [
  {
    name: "Driver",
    icon: "car-alt",
    text: "Sign up as a driver to have customers pay directly into your account.",
  },
  {
    name: "Consumer",
    icon: "user-alt",
    text: "As a customer, you'll be able to send money to our registered drivers and receive your change",
  },
]