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

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect([
      {
        id: products[0].id,
        name: products[0].name,
        price: products[0].price,
      },
      {
        id: products[1].id,
        name: products[1].name,
        price: products[1].price,
      },
    ]).toEqual([
      {
        id: foundProducts[0].id,
        name: foundProducts[0].name,
        price: foundProducts[0].price,
      },
      {
        id: foundProducts[1].id,
        name: foundProducts[1].name,
        price: foundProducts[1].price,
      },
    ]);
  });
});
