import Customer from "../../../entity/customer";
import CustomerCreatedEvent from "../customer-created.event";
import SendToCloudWhenCustomerIsCreatedHandler from "./send-to-cloud-when-customer-is-created-handler";

describe("SendToCloudWhenCustomerIsCreatedHandler Unit Tests", () => {
  let spyConsoleLog: any;

  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, "log");
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
  });

  it("should send to cloud when customer is created handler", () => {
    const customer = new Customer("1", "Customer 1");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    new SendToCloudWhenCustomerIsCreatedHandler().handle(customerCreatedEvent);

    expect(spyConsoleLog).toHaveBeenCalledWith(
      "This is the second console.log of the event: CustomerCreated"
    );
  });
});
