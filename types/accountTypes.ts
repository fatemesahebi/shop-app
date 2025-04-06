 interface Account {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
  }
  
   interface CreateAccountInput {
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
  }
  
  interface UpdateAccountInput extends Partial<CreateAccountInput> {}
  export {
    Account,
    CreateAccountInput,
    UpdateAccountInput,
  }