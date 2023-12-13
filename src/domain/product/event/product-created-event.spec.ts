import Product from "../entity/product";
import ProductCreatedEvent from "./product-created.event";

describe("Product created event", () => {
  it("constructor of product created event", () => {
    const product = new Product("1", "Product 1", 100);
    const productCreatedEvent = new ProductCreatedEvent(product);

    expect(productCreatedEvent.eventData).toStrictEqual(product);
    expect(productCreatedEvent.dataTimeOcurred).toBeInstanceOf(Date);
  });
});
