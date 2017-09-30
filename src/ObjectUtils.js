/* ##########################
  Imports
########################## */

// None atm.

/* ##########################
  Class Definition
########################## */

class ObjectUtils {
	static OBJECT_PROTOTYPE = Object.prototype

	static modifyPrototype = () => {
		Object.prototype.swap = function(obj){
			ObjectUtils.swap(this)
		}
	}

	static resetPrototype() {
		Object.prototype = ObjectUtils.OBJECT_PROTOTYPE
	}

	static swap = (obj) => {
		return Object.entries(obj).map((swapped, [key, value]) => {
			swapped[value] = key
		}, {})
	}
}

/* ##########################
  Exports
########################## */

let swap = ObjectUtils.swap

export default ObjectUtils

export {
	ObjectUtils,
	swap
}