import Customer from "../../entity/customer";
import Address from "../../value-object/address";
import CustomerChangedAddressEvent from "../customer-changed-address-event";
import SendEmailWhenCustomerAddressIsChangedHandler from "./send-email-when-customer-address-is-changed-handler";

describe("SendEmailWhenCustomerAddressIsChangedHandler unit tests", () => {
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
    const customerCreatedEvent = new CustomerChangedAddressEvent({
      id: customer.id,
      name: customer.name,
      address: customer.Address,
    });

    new SendEmailWhenCustomerAddressIsChangedHandler().handle(
      customerCreatedEvent
    );

    expect(spyConsoleLog).toHaveBeenCalledWith(
      `Customer address: ${customer.id}, ${
        customer.name
      } changed to: ${customer.Address.toString()}`
    );
  });
});
