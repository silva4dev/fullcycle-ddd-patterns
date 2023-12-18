import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuid(), name);
  }
}
