const GeneratorFunction = (function* () {}).constructor;

module.exports = {
	of: fn => gnc.is.generatorFunc(fn) ? function genCoroutine() {
		let gen = fn.apply(this, arguments);
		gen.status = "next";
		gen.state = undefined;
		const callback = (resolve, reject) => {
			let result,
				nexts = resolve,
				throws = reject;
			try {
				result = gen[gen.status](gen.state);
			} catch (error) {
				reject(error);
				return;
			}
			if (!result.done) {
				nexts = (item) => {
					gen.state = item;
					gen.status = "next";
					callback(resolve, reject);
				}
				throws = (err) => {
					gen.state = err;
					gen.status = "throw";
					callback(resolve, reject);
				}
			}
			result = result.value;
			Promise.resolve(result).then(nexts, throws);
		}
		return new Promise(callback);
	} : (() => { throw new TypeError("gnc.of needs a GeneratorFunction.") })(),
	is: {
		coroutine: item => typeof item == "function" && item.name == "genCoroutine",
		generatorFunc: item => item instanceof GeneratorFunction,
		generator: item => (typeof item == "object") && ("constructor" in item) && item.constructor && ("constructor" in item.constructor) && item.constructor.constructor === GeneratorFunction
	}
};

// const gnc = require('./gnc.js');
const gnc = module.exports;