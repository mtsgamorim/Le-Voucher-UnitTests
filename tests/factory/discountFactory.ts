import { faker } from "@faker-js/faker";

export default function discountFactory() {
  return faker.datatype.number(100);
}
