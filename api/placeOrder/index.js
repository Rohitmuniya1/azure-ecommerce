module.exports = async function (context, req) {
  const order = req.body;

  if (!order || !order.items || order.items.length === 0) {
    context.res = {
      status: 400,
      body: { message: "Invalid order" }
    };
    return;
  }

  // Abhi demo ke liye sirf log + success
  context.log("New Order:", order);

  context.res = {
    status: 200,
    body: {
      message: "Order received successfully",
      orderId: Date.now()
    }
  };
};
