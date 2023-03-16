import { faker } from "@faker-js/faker";

export default function codeFactory() {
  return faker.datatype.uuid();
}
