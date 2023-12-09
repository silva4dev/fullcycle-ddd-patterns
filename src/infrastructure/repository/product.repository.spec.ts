import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequileze.addModels([ProductModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = (
      await ProductModel.findOne({ where: { id: "1" } })
    ).toJSON();

    expect({
      id: productModel.id,
      name: productModel.name,
      price: productModel.price,
    }).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    let productModel = await (
      await ProductModel.findOne({ where: { id: "1" } })
    ).toJSON();

    expect({
      id: productModel.id,
      name: productModel.name,
      price: productModel.price,
    }).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    productModel = (
      await ProductModel.findOne({ where: { id: "1" } })
    ).toJSON();

    expect({
      id: productModel.id,
      name: productModel.name,
      price: productModel.price,
    }).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);
    const productModel = (
      await ProductModel.findOne({ where: { id: "1" } })
    ).toJSON();

    const foundProduct = await productRepository.find("1");

    expect({
      id: productModel.id,
      name: productModel.name,
      price: productModel.price,
    }).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });
});
