import Customer from "../../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";

describe("Customer created event", () => {
  it("constructor of customer created event", () => {
    const customer = new Customer("1", "Customer 1");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    expect(customerCreatedEvent.eventData).toStrictEqual(customer);
    expect(customerCreatedEvent.dataTimeOcurred).toBeInstanceOf(Date);
  });
});
