import { faker } from "@faker-js/faker";
import codeFactory from "./codeFactory";
import discountFactory from "./discountFactory";

export default function voucherFactory() {
  return {
    id: faker.datatype.number(),
    code: codeFactory(),
    discount: discountFactory(),
    used: false,
  };
}
