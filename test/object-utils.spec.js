import { expect } from 'chai'

import { TypeUtils } from '@beautiful-code/type-utils'
import { ObjectUtils } from '../src/ObjectUtils'

describe('ObjectUtils', () => {
	describe('can handle merging and extension of objects', () => {
		describe('#extend', () => {
			const TEST = {
				OBJ: {
					name: 'Joe',
					age: 25
				},
				FUNCTION: {
					name: 'Joe',
					age: 25,
					getName: () => TEST.OBJ.name	
				}
			}

			const EXTEND = {
				OBJ: {
					job: 'Web Developer'
				},
				FUNCTION: {
					getAge: () => TEST.OBJ.age
				}
			}

			const EXPECTED = {
				OBJ: {
					name: 'Joe',
					age: 25,
					job: 'Web Developer'					
				}, 
				FUNCTION: 25
			}

			function testExtend(object, extension, expected){
				// TODO(Chris): Fix TypeUtils 'get-type'
				let type = TypeUtils.isObject(object) ? 'object' : 'non-object'

				it(`is of type '${type}'`, () => expect(ObjectUtils.extend(object, extension)).deep.equals(expected))
			}

			function testExtendSubFunction(object, extension, expected, callback){
				let type = TypeUtils.isObject(object) ? 'object' : 'non-object'

				let extended = ObjectUtils.extend(object, extension)
				let result = callback(extended)
				it(`is of type '${type}' and has functions`, () => expect(result).deep.equals(expected))
			}

			describe('returns extended object if', () => {
				testExtend(TEST.OBJ, EXTEND.OBJ, EXPECTED.OBJ)
				testExtendSubFunction(TEST.FUNCTION, EXTEND.FUNCTION, EXPECTED.FUNCTION, (extended) => extended.getAge())
			})
		})
	})
	describe('can handle size of objects', () => {
		describe('#size', () => {
			function testSize(object, expected){
				// TODO(Chris): Fix TypeUtils 'get-type'
				let type = TypeUtils.isObject(object) ? 'object' : 'non-object'
				let desc = type == 'object' ? ` (of size '${expected}')` : ''
				it(`is type ${object}${desc}`, () => expect(ObjectUtils.size(object)).equals(expected))
			}

			function _generateObjectOfSize(size){
				let object = {}

				for(let i = 0; i < size; i++){
					object[i + 1] = ''
				}

				return object
			}

			const TEST = {
				ZERO: _generateObjectOfSize(0),
				ONE: _generateObjectOfSize(1),
				TWO: _generateObjectOfSize(2),
				TEN: _generateObjectOfSize(10),
				ONE_HUNDRED: _generateObjectOfSize(100)
			}

			const EXPECTED = {
				ZERO: 0,
				ONE: 1,
				TWO: 2,
				TEN: 10,
				ONE_HUNDRED: 100
			}

			describe('returns object size if', () => {
				testSize(TEST.ZERO, EXPECTED.ZERO)
				testSize(TEST.ONE, EXPECTED.ONE)
				testSize(TEST.TWO, EXPECTED.TWO)
				testSize(TEST.TEN, EXPECTED.TEN)
				testSize(TEST.ONE_HUNDRED, EXPECTED.ONE_HUNDRED)
			})
		})
	})
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