import { faker } from "@faker-js/faker";

export default function amountFactory(min: number, max: number) {
  return faker.datatype.number({ min: min, max: max });
}
