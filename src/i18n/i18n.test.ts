import { describe, expect, it } from 'vitest'
import es from './es/common.json'
import en from './en/common.json'

describe('translation catalogs', () => {
  it('keep the same key structure in Spanish and English', () => {
    const keys = (value: unknown, prefix = ''): string[] => typeof value === 'object' && value !== null ? Object.entries(value).flatMap(([key, child]) => keys(child, prefix ? `${prefix}.${key}` : key)) : [prefix]
    expect(keys(es).sort()).toEqual(keys(en).sort())
  })
})
