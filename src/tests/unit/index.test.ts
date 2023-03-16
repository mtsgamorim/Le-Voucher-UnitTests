import { jest } from "@jest/globals";
import voucherService from "services/voucherService";
import voucherRepository from "repositories/voucherRepository";
import codeFactory from "../factory/codeFactory";
import discountFactory from "../factory/discountFactory";

describe("Create Voucher", () => {
  it("should create a voucher if voucher does not exist", async () => {
    const code = codeFactory();
    const discount = discountFactory();
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => undefined);
    jest
      .spyOn(voucherRepository, "createVoucher")
      .mockImplementationOnce((): any => {});
    await voucherService.createVoucher(code, discount);
    expect(voucherRepository.createVoucher).toBeCalled();
  });
  it("should not create a voucher if voucher already exist", async () => {
    const code = codeFactory();
    const discount = discountFactory();
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => true);
    const result = voucherService.createVoucher(code, discount);
    expect(result).rejects.toEqual({
      message: "Voucher already exist.",
      type: "conflict",
    });
  });
});
