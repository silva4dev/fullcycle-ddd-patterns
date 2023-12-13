/**
 * Eu quero saber o total de todas as ordens de serviço, porém dentro da entidade order eu consigo descobrir total
 * apenas de uma ordem especifica, pois este motivo leva a criar um service de order para calcular
 */

import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1");
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    const OrderItem1 = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const OrderItem2 = new OrderItem("i2", "Item 2", 200, "p2", 2);

    const order1 = new Order("o1", "c1", [OrderItem1]);
    const order2 = new Order("o2", "c2", [OrderItem2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });
});
