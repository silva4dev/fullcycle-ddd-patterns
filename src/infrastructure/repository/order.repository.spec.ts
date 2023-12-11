import { Sequelize } from "sequelize-typescript";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
