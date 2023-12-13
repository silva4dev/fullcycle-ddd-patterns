import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerChangedAddressEvent from "./customer-changed-address-event";

describe("Customer changed address event", () => {
  it("constructor of customer changed address event", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13350-250", "São Paulo");
    customer.changeAddress(address);
    const customerChangedAddressEvent = new CustomerChangedAddressEvent(
      customer
    );

    expect(customerChangedAddressEvent.eventData).toStrictEqual(customer);
    expect(customerChangedAddressEvent.dataTimeOcurred).toBeInstanceOf(Date);
  });
});
