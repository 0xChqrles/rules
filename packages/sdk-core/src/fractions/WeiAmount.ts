import JSBI from 'jsbi'
import _Big from 'big.js'
import toFormat from 'toformat'
import invariant from 'tiny-invariant'

import { MaxUint256 } from '../constants'
import { Fraction } from './Fraction'
import { BigintIsh } from '../types'

const Big = toFormat(_Big)
Big.PE = 1000000
Big.NE = -1000000

export enum Unit {
  WEI = 0,
  GWEI = 9,
  ETHER = 18,
}

const decimalScaleForDecimals = (decimals: number) => JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))

export class WeiAmount extends Fraction {
  // decimals MUST be declared before ZERO,
  // if not, decimals will be undefined when using `fromRawAmount` from ZERO
  public static readonly decimals = Unit.ETHER
  public static readonly ZERO = WeiAmount.fromRawAmount(0)

  public readonly decimalScale = decimalScaleForDecimals(WeiAmount.decimals)

  public static fromRawAmount(rawAmount: BigintIsh): WeiAmount {
    return new WeiAmount(rawAmount, 1)
  }

  public static fromEtherAmount(etherAmount: number | string): WeiAmount {
    const rawAmount = WeiAmount.rawAmountFromEtherAmount(etherAmount)
    return new WeiAmount(rawAmount, 1)
  }

  private static rawAmountFromEtherAmount(etherAmount: number | string): BigintIsh {
    return Big(etherAmount).mul(Big(10).pow(WeiAmount.decimals)).toFixed(0)
  }

  protected constructor(numerator: BigintIsh, denominator?: BigintIsh) {
    super(numerator, denominator)
    invariant(JSBI.lessThanOrEqual(this.quotient, MaxUint256), 'AMOUNT')
  }

  // operations

  public add(other: Fraction | BigintIsh): WeiAmount {
    const added = super.add(other)
    return new WeiAmount(added.numerator, added.denominator)
  }

  public subtract(other: Fraction | BigintIsh): WeiAmount {
    const subtracted = super.subtract(other)
    return new WeiAmount(subtracted.numerator, subtracted.denominator)
  }

  public multiply(other: Fraction | BigintIsh): WeiAmount {
    const multiplied = super.multiply(other)
    return new WeiAmount(multiplied.numerator, multiplied.denominator)
  }

  public divide(other: Fraction | BigintIsh): WeiAmount {
    const divided = super.divide(other)
    return new WeiAmount(divided.numerator, divided.denominator)
  }

  // conversions

  public toSignificant(
    significantDigits: number = 6,
    roundingMode?: number,
    format?: object,
  ): string {
    return super.divide(this.decimalScale).toSignificant(significantDigits, roundingMode, format)
  }

  public toFixed(
    decimalPlaces: number = WeiAmount.decimals,
    roundingMode?: number,
    format?: object,
  ): string {
    invariant(decimalPlaces <= WeiAmount.decimals, 'DECIMALS')
    return super.divide(this.decimalScale).toFixed(decimalPlaces, roundingMode, format)
  }

  // unit conversions

  public toUnitSignificant(
    unit: Unit,
    significantDigits: number = 6,
    roundingMode?: number,
    format?: object,
  ): string {
    return super.divide(decimalScaleForDecimals(unit)).toSignificant(significantDigits, roundingMode, format)
  }

  public toUnitFixed(
    unit: Unit,
    decimalPlaces?: number,
    roundingMode?: number,
    format?: object,
  ): string {
    if (decimalPlaces === undefined) decimalPlaces = unit
    invariant(decimalPlaces <= unit, 'DECIMALS')

    return super.divide(decimalScaleForDecimals(unit)).toFixed(decimalPlaces, roundingMode, format)
  }
}
