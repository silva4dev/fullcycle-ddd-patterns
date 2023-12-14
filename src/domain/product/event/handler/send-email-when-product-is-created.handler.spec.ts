import Product from "../../entity/product";
import ProductCreatedEvent from "../product-created.event";
import SendEmailWhenProductIsCreatedHandler from "./send-email-when-product-is-created.handler";

describe("SendEmailWhenProductIsCreatedHandler unit tests", () => {
  let spyConsoleLog: any;

  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, "log");
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
  });

  it("should send email when product is created handler", () => {
    const product = new Product("1", "Product 1", 100);
    const productCreatedEvent = new ProductCreatedEvent(product);

    new SendEmailWhenProductIsCreatedHandler().handle(productCreatedEvent);

    expect(spyConsoleLog).toHaveBeenCalledWith("Sending email to ...");
  });
});
