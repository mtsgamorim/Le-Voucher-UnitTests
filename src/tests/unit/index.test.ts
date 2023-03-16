import { jest } from "@jest/globals";
import voucherService from "services/voucherService";
import voucherRepository from "repositories/voucherRepository";
import codeFactory from "../factory/codeFactory";
import discountFactory from "../factory/discountFactory";
import voucherFactory from "tests/factory/voucherFactory";
import amountFactory from "tests/factory/amountFactory";

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

describe("Apply Voucher", () => {
  it("should apply a voucher for valid voucher and amount >= 100", async () => {
    const voucher = voucherFactory();
    const amount = amountFactory(100, 10000);
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => voucher);
    jest
      .spyOn(voucherRepository, "useVoucher")
      .mockImplementationOnce((): any => {});
    const result = await voucherService.applyVoucher(voucher.code, amount);
    expect(result.amount).toBe(amount);
    expect(result.discount).toBe(voucher.discount);
    expect(result.finalAmount).toBe(amount - amount * (voucher.discount / 100));
    expect(result.applied).toBe(true);
  });

  it("should not apply a voucher if voucher does not exist", () => {
    const voucher = voucherFactory();
    const amount = amountFactory(100, 10000);
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => undefined);
    const result = voucherService.applyVoucher(voucher.code, amount);
    expect(result).rejects.toEqual({
      message: "Voucher does not exist.",
      type: "conflict",
    });
  });

  it("should not apply a voucher for amount < 100", async () => {
    const voucher = voucherFactory();
    const amount = amountFactory(1, 99);
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => voucher);
    const result = await voucherService.applyVoucher(voucher.code, amount);
    expect(result.amount).toBe(amount);
    expect(result.discount).toBe(voucher.discount);
    expect(result.finalAmount).toBe(amount);
    expect(result.applied).toBe(false);
  });

  it("should not apply a voucher if voucher already used", async () => {
    const voucher = voucherFactory();
    voucher.used = true;
    const amount = amountFactory(100, 10000);
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => voucher);
    const result = await voucherService.applyVoucher(voucher.code, amount);
    expect(result.amount).toBe(amount);
    expect(result.discount).toBe(voucher.discount);
    expect(result.finalAmount).toBe(amount);
    expect(result.applied).toBe(false);
  });
});
