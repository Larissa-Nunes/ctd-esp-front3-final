export type CheckoutInput = {
  customer: {
    name: string;
    lastname: string;
    email: string;
    address: {
      address1: string;
      address2?: string | null;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  card: {
    number: string;
    comp: string;
    date: string;
    namePrinted: string;
  };
  order: {
    name: string;
    image: string;
    price: number;
  };
};
