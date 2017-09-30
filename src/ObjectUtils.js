/* ##########################
  Imports
########################## */

import { TypeUtils } from '@beautiful-code/type-utils'

/* ##########################
  Class Definition
########################## */

class ObjectUtils {
	static OBJECT_PROTOTYPE = Object.prototype

	static modifyPrototype = () => {
		Object.prototype.swap = function(obj){
			ObjectUtils.swap(this)
		}

		Object.prototype.isSwappable = function(obj){
			ObjectUtils.isSwappable(this)
		}
	}

	static resetPrototype() {
		Object.prototype = ObjectUtils.OBJECT_PROTOTYPE
	}

	static swap = (obj) => {
		if(!TypeUtils.isObject(obj)) throw new Error(`Tried to swap a non-object. Type was ${TypeUtils.getType(obj)}.`)

		return Object.entries(obj).reduce((swapped, [key, value]) => {
			let hasValidPropTypes = TypeUtils.isString(value) || TypeUtils.isNumber(value)
			if(!hasValidPropTypes) throw new Error(`Tried to swap an object with non-string or non-number properties. Type was ${TypeUtils.getType(value)}.`)
			
			if(swapped.hasOwnProperty(value)) throw new Error(`Tried to swap object with duplicate values. {${swapped[value]}:${value}} and {${key}:${value}} `)

			let numerical = parseFloat(key)
			key = TypeUtils.isNumber(numerical) && !isNaN(numerical) ? numerical : key

			swapped[value] = key
			return swapped
		}, {})
	}

	static isSwappable = (obj) => {
		let set = new Set(Object.values(obj))
		return set.size == Object.keys(obj).length
	}
}

/* ##########################
  Exports
########################## */

let swap = 			ObjectUtils.swap,
	isSwappable = 	ObjectUtils.isSwappable

export default ObjectUtils

export {
	ObjectUtils,
	swap, isSwappable
}