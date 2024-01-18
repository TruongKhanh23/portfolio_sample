import { classesFactory } from "@/composables/variant"

const MODIFIERS = {
	fixed: {
		root: "fixed",
	},
	absolute: {
		root: "absolute",
	},
}

const ELEMENT = {
	colors: {
		default: {
			root: "bg-[#000000] opacity-40",
		},
		white: {
			root: "bg-[#ffffff] opacity-60",
		},
	},
	sizes: {},
	modifiers: MODIFIERS,
}

const classes = classesFactory("inset-0", ELEMENT)

export default {
	default: "_default",
	_default: {
		el: classes.element(["default", "default", "fixed"]),
	},
	"white-absolute": {
		el: classes.element(["white", "default", "absolute"]),
	},
}
