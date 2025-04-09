type OrderData = {
  orderId?: string;
  items?: Array<{
    id: string;
    quantity: number;
    price: number;
  }>;
  customer?: {
    name: string;
    email: string;
    phone?: string;
  };
  [key: string]: unknown;
};

export const saveOrderDetails = (section: string, data: OrderData) => {
  fetch('/api/orderDetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      section,
      data,
    }),
  });
};
