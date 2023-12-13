import Customer from "../../../entity/customer";
import CustomerCreatedEvent from "../customer-created.event";
import SendEmailWhenCustomerIsCreatedHandler from "./send-email-when-customer-is-created-handler";

describe("SendEmailWhenCustomerIsCreatedHandler Unit Tests", () => {
  let spyConsoleLog: any;

  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, "log");
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
  });

  it("should send email when customer is created handler", () => {
    const customer = new Customer("1", "Customer 1");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    new SendEmailWhenCustomerIsCreatedHandler().handle(customerCreatedEvent);

    expect(spyConsoleLog).toHaveBeenCalledWith(
      "This is the first console.log of the event: CustomerCreated"
    );
  });
});
