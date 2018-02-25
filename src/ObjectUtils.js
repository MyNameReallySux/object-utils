/* ##########################
  Imports
########################## */

import { getType, isArray, isFunction, isObject, isNumber, isString } from '@beautiful-code/type-utils'

/* ##########################
  Class Definition
########################## */

/** 
 * The ObjectUtils class has various methods related to managing, manipulating, and configuring objects.
 * 
 * @author Chris Coppola <mynamereallysux@gmail.com>
 */
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

		Object.prototype.omit = function(props, fn){
			ObjectUtils.omit(this, props, fn)
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

	/** 
     * Removes all null values from an object. Null values are 'undefined', 'null', or an empty string.
     * 
     * @param {!Object} object Object that should be cleaned.
	 * @param {?Array} exclusions List of values that should be removed.
	 * @returns {Object} Returns an object without any null values.
     * 
	 * @function
	 * @public
     */
	static clean = (object, exclusions = [undefined, null, '']) => ObjectUtils.exclude(object, exclusions)

	static exclude = (object = {}, exclusions = [], fn = () => false) => {
		if(isFunction(exclusions)){
			fn = exclusions
			exclusions = []
		}
		if(!isArray(exclusions)) exclusions = [exclusions]

		return Object.entries(object)
			.filter(([key, value]) => !exclusions.includes(value))
			.reduce((object, [key, value]) => ({...object, [key]: value}), {})
	}

	/** 
     * Extends an object with a series of other objects, taking into account and ignoring null values in the source object and extension objects.
     * 
     * @param {Object} source Object that will be extended.
	 * @returns {Object} Returns a merged object.
     * 
	 * @function
	 * @public
     */
	static extend = (source, ...extensions) => {
		if(!isObject) return {}
		if(!extensions.length) return source
		return ObjectUtils.clean(Object.assign(source, ...extensions))
	}

	static merge = (source, ...extensions) => {
		if(!isObject(source)) return {}
		if(!extensions.length) return source

		return extensions.reduce((collection, extension) => {
			!isObject(extension)
				? collection 
				: Object.entries(extension)
				.filter(([key, value]) => value !== undefined)
				.forEach(([key, value]) => {
					let result = {}
					if(isObject(value) && isObject(source[key])) 	result = ObjectUtils.merge(source[key], value)
					else if(isArray(value) && isArray(source[key])) result = source[key].concat(value)
					else 											result = value

					collection = Object.assign({}, collection, { [key]: result })
				})

			return collection
		}, ObjectUtils.clean(source))
	}

	static omit = (object = {}, omissions = [], fn = () => false) => {
		if(isFunction(omissions)){
			fn = omissions
			omissions = []
		}
		if(!isArray(omissions)) omissions = [omissions]

		return Object.entries(object)
			.filter(([key, value]) => !omissions.includes(key) || fn())
			.reduce((object, [key, value]) => ({...object, [key]: value}), {})
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

let clean = 		ObjectUtils.clean,
	exclude = 		ObjectUtils.extend,
	extend = 		ObjectUtils.extend,
	isSwappable = 	ObjectUtils.isSwappable,
	merge = 		ObjectUtils.merge,
	omit = 			ObjectUtils.omit,
	setDeep =		ObjectUtils.setDeep,
	size =			ObjectUtils.size,
	swap = 			ObjectUtils.swap

export default ObjectUtils

export {
	ObjectUtils,
	clean, exclude, extend, isSwappable, 
	omit, merge, setDeep, size, swap
}