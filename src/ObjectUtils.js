/* ##########################
  Imports
########################## */

import { getType, isArray, isFunction, isObject, isNumber, isString } from '@beautiful-code/type-utils'

/* ##########################
  Class Definition
########################## */

class ObjectUtils {
	static extendedPrototypes = new Map()

	static modifyPrototype = () => {
		Object.prototype.extend = function(object, ...objects){
			ObjectUtils.extend(this, object)
		}

		Object.prototype.merge = function(object){
			ObjectUtils.merge(this, object)
		}

		Object.prototype.mergeDeep = function(...sources){
			ObjectUtils.mergeDeep(this, ...sources)
		}

		Object.prototype.setDeep = function(value, path){
			ObjectUtils.setDeep(this, value, path)
		}

		Object.prototype.omit = function(props, fcn){
			ObjectUtils.omit(this, props, fcn)
		}

		Object.prototype.size = function(){
			ObjectUtils.size(this)
		}

		Object.prototype.swap = function(){
			ObjectUtils.swap(this)
		}

		Object.prototype.isSwappable = function(){
			ObjectUtils.isSwappable(this)
		}
	}

	/* ##########################
		Properties
	########################## */

	static getInstanceMethods(instance){
		return Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
	}

	static getInstanceProps(instance){
		return Object.entries(instance)
	}
	
	static getStaticProps(clazz){
		return Object.getOwnPropertyNames(clazz)
	}

	/* ##########################
		Prototypes
	########################## */
	
	static extendPrototype(clazz, extension){
		if(!ObjectUtils.extendedPrototypes.has(clazz)){
			ObjectUtils.extendedPrototypes.set(clazz, clazz.prototype)
		}
		ObjectUtils.extend(clazz.prototype, {
			
		})
	}
	
	static resetPrototype(clazz){
		if(ObjectUtils.extendedPrototypes.has(clazz)){
			clazz.prototype = ObjectUtils.extendedPrototypes.get(clazz)
		}
	}

	/* ##########################
		Object Utils
	########################## */

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

	static merge = (...objects) => Object.assign({}, ...objects)
	static mergeDeep = (target, ...sources) => {
		if(!sources.length) return target
		const source = sources.shift()
	
		if(isObject(target) && isObject(source)) {
			for(const key in source) {
				if(isObject(source[key])) {
					if(!target[key]) Object.assign(target, { [key]: {} })
					ObjectUtils.mergeDeep(target[key], source[key])
				} if(isArray(source[key]) && isArray(target[key])){
					target[key] = target[key].concat(source[key])
				} else {
					Object.assign(target, {[key]: source[key]})
				}
			}
		}
	  
		return ObjectUtils.mergeDeep(target, ...sources);
	}

	static omit = (obj, props, func) => {
		if(!isObject(obj)) return {}
	
		if(isFunction(props)){
			func = props
			props = []
		}
	
		if(isString(props)){
			props = [props]
		}
	
		if(!isArray(props)) return {}
	
		return Object.entries(obj).reduce((collection, [key, value]) => {
			const propsDoNotExist = !props,
				  keyIsInProps = props.indexOf(key) === -1,
				  lastParamIsNotFunction = !isFunction(func) || func(value, key, obj)
	
			if(propsDoNotExist || keyIsInProps && lastParamIsNotFunction){
				collection[key] = value
			}
			
			return collection
		}, {})
	}

	static setDeep = (object = {}, value, path) => {
		const parts = path.split('.'),
			  regexp = /([a-zA-Z]+)(\[(\d)\])+/; // matches:  item[0]
	
		let selector, 
			match = null,   
			context = object
	
		parts.map((part) => {
			match = regexp.exec(part)
			if (match !== null) context = context[match[1]][match[3]]
			else {
				if(context && !context.hasOwnProperty(part)) 
					context[part] = {}
	
				context = context[part]
			}
		})
	
		match = regexp.exec([parts[parts.length - 1]]);
	
		if (match !== null) context[match[1]][match[3]] = value;
		else context[parts[parts.length - 1]] = value;
	
		return object
	}

	static size = (obj) => {
		if(!isObject(obj)) throw new Error(`Tried to get size of a non-object. Type was ${getType(obj)}.`)
		
		return Object.keys(obj).length
	}

	static swap = (obj) => {
		if(!isObject(obj)) throw new Error(`Tried to swap a non-object. Type was ${getType(obj)}.`)


		return Object.entries(obj).reduce((swapped, [key, value]) => {
			let hasValidPropTypes = isString(value) || isNumber(value)
			if(!hasValidPropTypes) throw new Error(`Tried to swap an object with non-string or non-number properties. Type was ${getType(value)}.`)
			
			if(swapped.hasOwnProperty(value)) throw new Error(`Tried to swap object with duplicate values. {${swapped[value]}:${value}} and {${key}:${value}} `)

			let numerical = parseFloat(key)
			key = isNumber(numerical) && !isNaN(numerical) ? numerical : key

			swapped[value] = key
			return swapped
		}, {})
	}

	static isSwappable = (obj) => {
		if(!isObject(obj)) throw new Error(`Tried to check if a non-object was swappable. Type was ${getType(obj)}.`)

		let set = new Set(Object.values(obj))
		return set.size == Object.keys(obj).length
	}
}

/* ##########################
  Exports
########################## */

let extend = 		ObjectUtils.extend,
	merge = 		ObjectUtils.merge,
	mergeDeep =		ObjectUtils.mergeDeep,
	omit = 			ObjectUtils.omit,
	setDeep =		ObjectUtils.setDeep,
	size =			ObjectUtils.size,
	swap = 			ObjectUtils.swap,
	isSwappable = 	ObjectUtils.isSwappable

export default ObjectUtils

export {
	ObjectUtils,
	extend, merge, mergeDeep, omit, 
	setDeep, size, swap, isSwappable
}