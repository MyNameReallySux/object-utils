import { expect } from 'chai'

import { StringUtils } from '@beautiful-code/string-utils'
import { TypeUtils } from '@beautiful-code/type-utils'
import { ObjectUtils } from '../src/ObjectUtils'

const print = console.log

const formatKey = (key) => {
	return StringUtils.toSnakeCase(key).toUpperCase()
}


describe('ObjectUtils', () => {
	describe('can handle manipulation of object properties', () => {
		class TestClass {
			static staticProp = 'static'
			static staticProp2 = 'static2'

			instanceProp3 = 'value3'
			instanceProp4 = 'value4'

			constructor(){
				this.instanceProp = 'value'
				this.instanceProp2 = 'value2'
			}
			one(){}
			two(){}
		}

		let instance
		beforeEach(() => {
			instance = new TestClass()
		})

		describe('#getInstanceMethods', () => {
			it(`should return 3 methods from 'TestClass'`, () => {
				let test = ObjectUtils.getInstanceMethods(instance)
				let expected = 3
				expect(test.length).equals(expected)
			})
		})
		describe('#getInstanceProps', () => {
			it(`should return 4 instance props from 'TestClass'`, () => {
				let test = ObjectUtils.getInstanceProps(instance)
				let expected = 4
				expect(test.length).equals(expected)
			})
		})
		describe('#getStaticProps', () => {
			it(`should return 5 static props from 'TestClass'`, () => {
				let test = ObjectUtils.getStaticProps(TestClass)
				let expected = 5
				expect(test.length).equals(expected)
			})
		})	
	})
	// describe('can handle manipulation of object prototypes', () => {
	// 	describe('#extendPrototype', () => {
	// 		it(`should append properties to objects prototype'`, () => {
	// 			let prototype = ObjectUtils.extendPrototype(String, {
	// 				contains: (str) => {
	// 					return this.indexOf(str) != -1
	// 				}
	// 			})
	// 			let test = String.prototype.hasOwnProperty('contains')
	// 			let expected = true
	// 			expect(test.length).equals(expected)
	// 		})
	// 	})	
	// })	
	describe('can handle omission of object properties', () => {
		const TESTS = {
			OBJ: {
				initial: {
					name: 'The Boathouse',
					address: '1600 Main St',
					extra: 'omit me'
				},
				omit: 'extra',
				expected: {
					name: 'The Boathouse',
					address: '1600 Main St'
				}
			}
		}
		describe('#omit', () => {
			function testOmit(key){
				let { initial, omit, expected } = TESTS[formatKey(key)]
				let type = TypeUtils.getType(initial)

				it(`is of type '${type}'`, () => {
					let test = ObjectUtils.omit(initial, omit)
					expect(test).deep.equals(expected)
				})
			}
		})
	})	
	describe('can handle merging and extension of objects', () => {
		const TESTS = {
			OBJ: {
				initial: {
					name: 'Joe',
					age: 25
				},
				extension: {
					job: 'Web Developer'
				},
				expected: {
					name: 'Joe',
					age: 25,
					job: 'Web Developer'					
				}
			},
			FUNC: {
				initial: {
					name: 'Joe',
					age: 25,
					getName: () => TESTS.OBJ.initial.name	
				},
				extension: {
					getAge: () => TESTS.OBJ.initial.age
				},
				expected: 25
			},
			DEEP: {
				initial: {
					manager: {
						name: 'Joe',
						age: 25
					},
					employees: [{
						name: 'John',
						age: 22
					}, {
						name: 'Lisa',
						age: 21
					}]
				},
				extension: {
					// TODO(Chris): Will not copy properly if missing one of the initial keys (ex, remove name and it will fail)
					manager: {
						name: "Joe",
						age: 26
					},
					employees: [{
						name: 'Elsa',
						age: 45
					}]
				},
				expected: {
					manager: {
						name: 'Joe',
						age: 26
					},
					employees: [{
						name: 'John',
						age: 22
					}, {
						name: 'Lisa',
						age: 21
					}, {
						name: 'Elsa',
						age: 45
					}]
				}
			}
		}

		describe('#extend', () => {
			function testExtend(key){
				let { initial, extension, expected } = TESTS[formatKey(key)]
				let type = TypeUtils.getType(initial)

				it(`is of type '${type}'`, () => {
					let test = ObjectUtils.extend(initial, extension)
					expect(test).deep.equals(expected)
				})
			}

			function testExtendSubFunction(key, callback){
				let { initial, extension, expected } = TESTS[formatKey(key)]
				let type = TypeUtils.getType(initial)

				it(`is of type '${type}' and has functions`, () => {
					let extended = ObjectUtils.extend(initial, extension)
					let test = callback(extended)
					expect(test).deep.equals(expected)
				})
			}

			describe('returns extended object if', () => {
				testExtend('obj')
				testExtendSubFunction('func', (extended) => extended.getAge())
			})
		})
		describe('#merge', () => {
			function testMerge(key){
				let { initial, extension, expected } = TESTS[formatKey(key)]
				let type = TypeUtils.getType(initial)

				it(`is of type '${type}'`, () => {
					let test = ObjectUtils.merge(initial, extension)
					expect(test).deep.equals(expected)
				})
			}

			function testMergeSubFunction(key, callback){
				let { initial, extension, expected } = TESTS[formatKey(key)]
				let type = TypeUtils.getType(initial)

				
				it(`is of type '${type}' and has functions`, () => {
					let extended = ObjectUtils.merge(initial, extension)
					let test = callback(extended)
					expect(test).deep.equals(expected)
				})
			}

			describe('returns merged object if', () => {
				testMerge('obj')
				testMergeSubFunction('func', (extended) => extended.getAge())
			})
		})
		describe('#mergeDeep', () => {
			function testMergeDeep(key){
				let { initial, extension, expected } = TESTS[formatKey(key)]
				let type = TypeUtils.getType(initial)

				it(`is of type '${type}', with no functions`, () => {
					let test = ObjectUtils.mergeDeep(initial, extension)
					expect(test).deep.equals(expected)
				})
			}

			describe('returns deeply merged object if', () => {
				testMergeDeep('deep')
			})
		})
	})
	describe('can handle size of objects', () => {
		describe('#size', () => {
			const TESTS = {
				ZERO: {
					initial: _generateObjectOfSize(0),
					expected: 0
				},
				ONE: {
					initial: _generateObjectOfSize(1),
					expected: 1
				},
				TEN: {
					initial: _generateObjectOfSize(10),
					expected: 10
				},
				ONE_HUNDRED: {
					initial: _generateObjectOfSize(100),
					expected: 100
				}
			}

			function _generateObjectOfSize(size){
				let object = {}

				for(let i = 0; i < size; i++){
					object[i + 1] = ''
				}

				return object
			}

			function testSize(key){
				let { initial, expected } = TESTS[formatKey(key)]
				let type = TypeUtils.getType(initial)
				let desc = type == 'object' ? ` (of size '${expected}')` : ''

				it(`is type '${type}${desc}'`, () => {
					let test = ObjectUtils.size(initial)
					expect(test).equals(expected)
				})
			}

			describe('returns object size if', () => {
				testSize('zero')
				testSize('one')
				testSize('ten')
				testSize('one hundred')				
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