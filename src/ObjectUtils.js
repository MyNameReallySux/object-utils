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
		Object.prototype.size = function(){
			Object.Utils.size(this)
		}

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

	static extend = (object, ...objects) => {
		for(let extension of objects){
			for(let [name, property] of Object.entries(extension)){
				if(extension.hasOwnProperty(name)){					
					object[name] = property

				}
			}
		}

		return object
	}

	static size = (obj) => {
		if(!TypeUtils.isObject(obj)) throw new Error(`Tried to get size of a non-object. Type was ${TypeUtils.getType(obj)}.`)
		
		return Object.keys(obj).length
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
		if(!TypeUtils.isObject(obj)) throw new Error(`Tried to check if a non-object was swappable. Type was ${TypeUtils.getType(obj)}.`)

		let set = new Set(Object.values(obj))
		return set.size == Object.keys(obj).length
	}
}

/* ##########################
  Exports
########################## */

let extend = 		ObjectUtils.extend,
	size =			ObjectUtils.size,
	swap = 			ObjectUtils.swap,
	isSwappable = 	ObjectUtils.isSwappable

export default ObjectUtils

export {
	ObjectUtils,
	extend, size, swap, isSwappable
}