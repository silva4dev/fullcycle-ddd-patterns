import Address from "../../../entity/address";
import Customer from "../../../entity/customer";
import CustomerCreatedEvent from "../customer-created.event";
import SendEmailWhenCustomerAddressIsChangedHandler from "./send-email-when-customer-address-is-changed-handler";

describe("SendEmailWhenCustomerAddressIsChangedHandler Unit Tests", () => {
  let spyConsoleLog: any;

  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, "log");
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
  });

  it("should send email when customer address is changed handler", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13350-250", "São Paulo");
    customer.changeAddress(address);
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.Address.toString(),
    });

    new SendEmailWhenCustomerAddressIsChangedHandler().handle(
      customerCreatedEvent
    );

    console.log(`Customer address: ${customer.id}, ${
        customer.name
      } changed to: ${customer.Address.toString()}`)

    expect(spyConsoleLog).toHaveBeenCalledWith(
      `Customer address: ${customer.id}, ${
        customer.name
      } changed to: ${customer.Address.toString()}`
    );
  });
});
