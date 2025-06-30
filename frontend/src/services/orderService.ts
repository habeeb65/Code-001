
// Mock order service for demo purposes
export const orderService = {
  getOrders: async () => {
    console.log('Fetching orders...');
    // Mock orders data
    return {
      data: [
        {
          id: "1",
          templateName: "Name Stickers",
          quantity: 50,
          status: 'completed' as const,
          createdAt: "2024-01-15T10:30:00Z",
          totalAmount: 25.00
        },
        {
          id: "2",
          templateName: "Student ID Cards",
          quantity: 1,
          status: 'processing' as const,
          createdAt: "2024-01-20T14:15:00Z",
          totalAmount: 12.00
        }
      ]
    };
  },

  createOrder: async (orderData: any) => {
    console.log('Creating order:', orderData);
    // Mock successful order creation
    return {
      data: {
        id: 'order-123',
        status: 'processing',
        templateId: orderData.templateId,
        quantity: orderData.quantity
      }
    };
  },

  createBulkOrder: async (bulkData: any) => {
    console.log('Creating bulk order:', bulkData);
    // Mock successful bulk order creation
    return {
      data: {
        id: 'bulk-order-123',
        status: 'processing',
        itemCount: bulkData.data.length
      }
    };
  }
};
