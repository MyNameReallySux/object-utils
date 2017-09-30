import { expect } from 'chai'

import { TypeUtils } from '@beautiful-code/type-utils'
import { ObjectUtils } from '../src/ObjectUtils'

describe('ObjectUtils', () => {
	describe('can handle swapping keys and values', () => {
		const TEST = {
			STRINGS: {
				key: 'value',
				key2: 'value2'
			},
			NUMBERS: {
				1: 3,
				2: 1,
				3: 2
			},
			FLOATS: {
				1: 0.4,
				1.75: 2,
				3: 1.25
			},
		}

		const EXPECTED = {
			STRINGS: {
				value: 'key',
				value2: 'key2'
			},
			NUMBERS: {
				3: 1,
				1: 2,
				2: 3
			},
			FLOATS: {
				0.4: 1,
				2: 1.75,
				1.25: 3
			},
		}

		const THROWS = {
			UNDEFINED: undefined,
			NULL: null,
			BOOLEAN: false,
			FLOAT: 0.4,

			STRINGS: {
				key: 'value',
				key2: 'value'
			},
			NUMBERS: {
				3: 1,
				1: 2,
				2: 2
			},
			FLOATS: {
				1: 0.4,
				1.75: 0.4,
				3: 1.25
			}
		}
		
		describe('#isSwappable', () => {
			function testIsSwappable(obj, type, expected = true){
				let desc = expected ? `unique` : `duplicated`
				it(`'${type}'properties are ${desc}`, () => expect(ObjectUtils.isSwappable(obj)).equals(expected))
			}

			describe('returns true if', () => {
				testIsSwappable(TEST.STRINGS, 'string')
				testIsSwappable(TEST.NUMBERS, 'number')
				testIsSwappable(TEST.FLOATS, 'float')
			})

			describe('returns false if', () => {
				testIsSwappable(THROWS.STRINGS, 'string', false)
				testIsSwappable(THROWS.NUMBERS, 'number', false)
				testIsSwappable(THROWS.FLOATS, 'float', false)
			})
			
		})
		describe('#swap', () => {
			function testSwap(obj, type, expected){
				it(`handles objects with '${type}' values`, () => expect(ObjectUtils.swap(obj)).deep.equals(expected))
			}
	
			describe('returns swapped object if', () => {
				testSwap(TEST.STRINGS, 'string', EXPECTED.STRINGS)
				testSwap(TEST.NUMBERS, 'number', EXPECTED.NUMBERS)
				testSwap(TEST.FLOATS, 'float', EXPECTED.FLOATS)
				
			})
	
			describe('throws an error if', () => {
				it(`passed a non-object, or if object has non-string or non-number properties`, () => {
					for(let test of Object.values(THROWS)){
						expect(() => ObjectUtils.swap(test)).throws()
					}
				})
			})
		})
	})
	
})