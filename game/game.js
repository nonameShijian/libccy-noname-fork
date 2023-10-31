/// <reference path="../typings/index.d.ts" />
"use strict";
{
	/**
	 * @typedef {InstanceType<typeof lib.element.Player>} Player
	 * @typedef {InstanceType<typeof lib.element.Card>} Card
	 * @typedef {InstanceType<typeof lib.element.VCard>} VCard
	 * @typedef {InstanceType<typeof lib.element.GameEvent>} GameEvent
	 * @typedef {InstanceType<typeof lib.element.NodeWS>} NodeWS
	 */
	const userAgent = navigator.userAgent.toLowerCase();
	const nonameInitialized = localStorage.getItem('noname_inited');
	if (!localStorage.getItem('gplv3_noname_alerted')) {
		if (confirm('①无名杀是一款基于GPLv3协议的开源软件！\n你可以在遵守GPLv3协议的基础上任意使用，修改并转发《无名杀》，以及所有基于《无名杀》开发的拓展。\n点击“确定”即代表您认可并接受GPLv3协议↓️\nhttps://www.gnu.org/licenses/gpl-3.0.html\n②无名杀官方发布地址仅有GitHub仓库！\n其他所有的所谓“无名杀”社群（包括但不限于绝大多数“官方”QQ群、QQ频道等）均为玩家自发组织，与无名杀官方无关！')) {
			// @ts-ignore
			localStorage.setItem('gplv3_noname_alerted', true);
		}
		else {
			const ios = userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('macintosh');
			//electron
			if (typeof window.process == 'object' && typeof window.require == 'function') {
				const versions = window.process.versions;
				// @ts-ignore
				const electronVersion = parseFloat(versions.electron);
				let remote;
				if (electronVersion >= 14) {
					remote = window.require('@electron/remote');
				} else {
					remote = window.require('electron').remote;
				}
				const thisWindow = remote.getCurrentWindow();
				thisWindow.destroy();
				window.process.exit();
			}
			//android-cordova环境
			//ios-cordova环境或ios浏览器环境
			//非ios的网页版
			else if (!ios) {
				window.close();
			}
		}
	}

	window['b' + 'ann' + 'e' + 'dE' + 'x' + 'ten' + 's' + 'i' + 'o' + 'ns'] = ['\u4fa0\u4e49', '\u5168\u6559\u7a0b'];

	Error.prepareStackTrace = function (error, callSites) {
		//console.log(error);
		//console.log(callSites);
		//window.mycallSites = callSites;
		//window.err = error;
		const log = error.toString() + '\n' + callSites.map(callSite => {
			let str = '    at ';
			const TypeName = callSite.getTypeName();
			const FunctionName = callSite.getFunctionName();
			const MethodName = callSite.getMethodName();
			//console.log(TypeName, FunctionName, MethodName);
			let FileName = callSite.getFileName();
			if (FunctionName) {
				if (callSite.isConstructor && callSite.isConstructor()) str += 'new ';
				// @ts-ignore
				if (callSite.isAsync && callSite.isAsync()) str += 'async ';
				if (TypeName) {
					str += TypeName + '.';
					if (!FileName) {
						for (const moduleArr of Object.entries(modules)) {
							const moduleName = moduleArr[0];
							const module = moduleArr[1];
							const moduleExports = moduleArr[1].exports;
							try {
								let _str = TypeName.split('.')[0];
								eval(`const ${_str} = moduleExports; if(typeof ${TypeName + '.' + FunctionName} != 'function') throw 'err';`);
								FileName = convertToAbsolutePath(location.href + module.id);
							} catch (error) { }
						}
					}
				}
				str += FunctionName + ' ';
			}
			if (!FileName) FileName = '<anonymous>';

			if (MethodName && MethodName != FunctionName) str += `[as ${MethodName}] `;

			str += '(';

			const isEval = callSite.isEval();
			const EvalOrigin = callSite.getEvalOrigin();
			const LineNumber = callSite.getLineNumber();
			const ColumnNumber = callSite.getColumnNumber();
			if (LineNumber && ColumnNumber) {
				if (isEval && EvalOrigin) {
					if (!EvalOrigin.startsWith('eval at require ')) {
						str += EvalOrigin + ', '
							+ FileName + ':'
							+ LineNumber + ':'
							+ ColumnNumber;
					} else {
						str += FileName + ':'
							// 因为只在文件头尾各加了一行
							+ (LineNumber - 1) + ':'
							+ ColumnNumber;
					}
				} else {
					// @ts-ignore
					str += callSite.getScriptNameOrSourceURL() + ':'
						+ LineNumber + ':'
						+ ColumnNumber;
				}
			}

			str += ')';

			return str;
		}).join('\n');
		// console.log(log);
		return log;
	}

	Error.stackTraceLimit = 100;

	/**
		 * 对带协议的路径进行兼容
		 * @param {string} path
		 */
	function convertToAbsolutePath(path) {
		// 使用正则表达式替换相对路径
		path = path.replace(/\/\.\//g, '/');
		path = path.replace(/\/([^/]+\/\.\.\/)/g, '/');

		// 添加对带协议名的情况的处理
		var protocol = '';
		var index = path.indexOf('://');
		if (index !== -1) {
			protocol = path.substr(0, index + 3);
			path = path.substr(index + 3);
		}

		// 使用循环和栈的方式处理相对路径
		var parts = path.split('/');
		var stack = [];

		for (var i = 0; i < parts.length; i++) {
			if (parts[i] === '.' || parts[i] === '') {
				// 忽略当前路径和空路径
				continue;
			} else if (parts[i] === '..') {
				// 弹出栈中的最后一个路径
				stack.pop();
			} else {
				// 将路径推入栈中
				stack.push(parts[i]);
			}
		}

		// 拼接栈中的路径为绝对路径，加上协议名
		return protocol + stack.filter(Boolean).join('/');
	}

	/**
	 * @param {string} filename
	 */
	function getFileType(filename) {
		// @ts-ignore
		return filename.split('/').pop().split('.').pop().toLowerCase();
	}

	/** @type { { [key: string]: NodeModule } } */
	const modules = window.modules = {};

	/**
	 * @param {string} id
	 */
	function Module(id) {
		this.id = id;
		let exports = Object.create(null);
		if (Symbol.toStringTag) {
			const fileName = id.split(/[/\\]/).pop();
			// 一般情况下无同名文件的解决办法
			// @ts-ignore
			exports[Symbol.toStringTag] = fileName.slice(0, fileName.indexOf('.'));
		}
		// @ts-ignore
		modules[id] = this;
		// 类型提示
		this.exports = null;
		Object.defineProperty(this, 'exports', {
			enumerable: true,
			configurable: true,
			get() { return exports },
			set(newExports) {
				//modules[id] = newExports;
				if (typeof newExports == 'object') {
					for (const key in exports) {
						delete exports[key];
					}
					Object.assign(exports, newExports);
				} else {
					exports = newExports;
				}
				if (Symbol.toStringTag && exports[Symbol.toStringTag]) {
					//console.time(exports[Symbol.toStringTag]);
					function forEach(obj) {
						for (const key in obj) {
							if (Object.hasOwnProperty.call(obj, key)) {
								try {
									const descriptor = Object.getOwnPropertyDescriptor(obj[key], key);
									if (descriptor && (descriptor.get || descriptor.set)) continue;
									obj[key][Symbol.toStringTag] = `${obj[Symbol.toStringTag]}.${key}`;
									forEach(obj[key]);
								} catch (error) {}
							}
						}
					}
					forEach(exports);
					//console.timeEnd(exports[Symbol.toStringTag]);
				}
			}
		});

		this.require = _id => require((_id.startsWith('./') || _id.startsWith('../')) ? (id.split('/').slice(0, -1).join('/') + '/' + _id) : _id);
	}

	// 根据绝对路径的后缀名，调用挂载在对象上相应的方法
	Module.prototype.load = function () {
		// 取出当前实例上挂载的绝对路径，获取后缀名
		let ext = '.' + getFileType(this.id);
		// 根据后缀名调用对应的处理函数
		// @ts-ignore
		(require.extensions[ext] || require.extensions['.js'])(this);
	};

	// @ts-ignore
	window.Module = Module;

	/** @type { import('../typings/magic-string.cjs.d.ts')['default'] } */
	var MagicString;

	/** @type { NodeRequire } */
	// @ts-ignore
	const require = (function () {
		const winRequire = window.require;

		const require = function (id) {
			//console.log(id);
			if (modules[id]) {
				return modules[id].exports;
			}
			if (nonameInitialized && nonameInitialized != 'nodejs' && id.includes(nonameInitialized)) {
				id = id.replace(nonameInitialized, '');
			}
			//console.log(id);
			if (id.startsWith('./') || id.startsWith('../')) {
				id = (id.startsWith('./') ? './' : '') + convertToAbsolutePath(id);
				//console.log(id);
			} else if (winRequire && !id.startsWith('./') && !id.startsWith('../')) {
				let exports = winRequire(id);
				if (exports) {
					const _module = new Module(id);
					_module.exports = exports;
				}
			}
			if (modules[id]) {
				return modules[id].exports;
			} else {
				const xhr = new XMLHttpRequest();
				xhr.onerror = () => {
					console.error(`模块[${id}]加载失败`);
					throw new Error(`模块[${id}]加载失败`);
				};
				let data;
				xhr.open("GET", (nonameInitialized && nonameInitialized != 'nodejs' ? nonameInitialized : location.href.slice(0, location.href.lastIndexOf('/') + 1)) + id + (location.protocol.startsWith('http') ? `?date=${(new Date()).getTime()}` : ''), false);
				xhr.send();
				if (xhr.readyState === 4 && ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 0)) {
					data = xhr.responseText;
				} else {
					console.error(`模块[${id}]加载失败`);
					throw new Error(`模块[${id}]加载失败`);
				}
				const _module = new Module(id);
				if (id.endsWith('.js')) {
					let fun;
					//const functionHeader = `"use strict";\n{\nlet module = window.modules['${id}'];\nlet exports = module.exports;\nlet require = module.require;\nlet __filename = '${id.slice(id.lastIndexOf('/') + 1)}';\nlet __dirname = '${!!winRequire ? window.__dirname : nonameInitialized && nonameInitialized != 'nodejs' ? nonameInitialized : location.host.slice(0, location.host.lastIndexOf('/') == -1 ? undefined : location.host.lastIndexOf('/'))}';\n`;
					//const FunctionTail = `\n}`;
					const functionHeader = `(function (exports, require, module, __filename, __dirname, process, global) {"use strict";\n`;
					const FunctionTail = `\n})`;
					try {
						let mapUrl = '';

						if (MagicString) {
							const source = new MagicString(data);
							source.prepend(functionHeader).append(FunctionTail);
							const sourcePath = convertToAbsolutePath('noname://' + id);
							console.log(sourcePath);
							// generates a v3 sourcemap
							const map = source.generateMap({
								// hires: true,
								source: sourcePath,
								file: id.split(/[/\\]/).pop() + '.map',
								includeContent: true
							});
							console.log(map);
							console.log(JSON.parse(map.toString()));
							mapUrl = '\n//# sourceMappingURL=' + map.toUrl();
						}

						const str = functionHeader + data + FunctionTail + mapUrl;
						// console.log(str);
						fun = eval(str);
						fun(_module.exports, _module.require, _module, /* __filename */ `${id.split(/[/\\]/).pop()}`, /* __dirname */ `${!!winRequire ? window.__dirname : nonameInitialized && nonameInitialized != 'nodejs' ? nonameInitialized : location.host.slice(0, location.host.lastIndexOf('/') == -1 ? undefined : location.host.lastIndexOf('/'))}`, /* process */ window.process, /* global */ window);
						return modules[id].exports;
					} catch (e) {
						delete modules[id];
						if (e instanceof Error && e.stack) {
							e.stack = e.stack.replace('\n    ', str => str + `at ${(nonameInitialized && nonameInitialized != 'nodejs' ? nonameInitialized : location.href.slice(0, location.href.lastIndexOf('/') + 1)) + id}` + str);
						}
						console.error(`模块[${id}]加载失败`);
						//console.error(fun);
						console.log(e.toString());
						throw e;
					}
					// const functionHeader = `"use strict";\n{\nlet module = window.modules['${id}'];\nlet exports = module.exports;\nlet require = module.require;\nlet __filename = '${ id.slice(id.lastIndexOf('/') + 1) }';\nlet __dirname = '${ !!winRequire ? window.__dirname : nonameInitialized && nonameInitialized != 'nodejs' ? nonameInitialized : location.host.slice(0, location.host.lastIndexOf('/') == -1 ? undefined : location.host.lastIndexOf('/')) }';\n`;
					// const FunctionTail = `\n}`;
					// try {

					// 	let mapUrl = '';

					// 	if (MagicString) {
					// 		const source = new MagicString(data);
					// 		source.prepend(functionHeader).append(FunctionTail);
					// 		// generates a v3 sourcemap
					// 		const map = source.generateMap({
					// 			// hires: true,
					// 			source: id,
					// 			file: id + '.map',
					// 			includeContent: true
					// 		});
					// 		mapUrl = '\n//# sourceMappingURL=' + map.toUrl();
					// 	}
					// 	// 同步
					// 	let script = document.createElement('script');
					// 	let str = functionHeader + data + FunctionTail + mapUrl;
					// 	script.innerHTML = str;
					// 	document.head.appendChild(script);
					// 	script.setAttribute('src', id);
					// 	return modules[id].exports;
					// } catch (error) {
					// 	delete modules[id];
					// 	if (error instanceof Error && error.stack) {
					// 		error.stack = error.stack.replace('\n    ', str => str + `at ${(nonameInitialized && nonameInitialized != 'nodejs' ? nonameInitialized : location.href.slice(0, location.href.lastIndexOf('/') + 1)) + id}` + str);
					// 	}
					// 	console.error(`模块[${id}]加载失败`);
					// 	throw error;
					// }
				} else {
					try {
						_module.load();
						return modules[id].exports;
					} catch (e) {
						delete modules[id];
						console.error(`模块[${id}]加载失败`);
						throw e;
					}
				}
			}
		};
		require.main = winRequire ? winRequire.main : undefined;
		require.cache = winRequire ? winRequire.cache : modules;
		require.extensions = Object.assign(Object.create(null), {
			// 其实用不到js这个
			// 但是导入别的后缀名是可以默认按照这个来
			'.js': module => {
				module.exports = module.data;
			},
			'.json': module => {
				module.exports = JSON.parse(module.data);
			},
			'.node': module => {
				if (winRequire) {
					module.exports = winRequire(module.id);
				} else throw '还未支持解析.node文件';
			},
		});
		return require;
	})();

	window.require = require;

	MagicString = require('./game/module/magic-string.cjs.js');

	/**
	 * 虽然index.js是相对于本js应该是‘./module/index.js’的
	 * 
	 * 但是非模块形式下的调用，路径是相对于游戏根目录的
	 * @type { import('./module/index.js') }
	 */
	const nonameModule = require('./game/module/index.js');

	const lib = nonameModule.lib,
		game = nonameModule.game,
		ui = nonameModule.ui,
		get = nonameModule.get,
		ai = nonameModule.ai,
		_status = nonameModule._status;

	/**
	 * @template T
	 * @param {T} object
	 */
	const setAllPropertiesEnumerable = object => {
		Object.getOwnPropertyNames(object).forEach(propertyKey => {
			if (propertyKey == 'constructor') return;
			const propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyKey);
			if (propertyDescriptor) {
				if (!propertyDescriptor.enumerable) propertyDescriptor.enumerable = true;
				Object.defineProperty(object, propertyKey, propertyDescriptor);
			}
		}, {});
		return object;
	};
	setAllPropertiesEnumerable(lib.element.Player.prototype);

	// 这部分修改是因为electron v0.3.6(47内核)会报错，不明原因
	const cardPrototype = lib.element.Card.prototype, vCardPrototype = lib.element.VCard.prototype;
	setAllPropertiesEnumerable(cardPrototype)
	Object.keys(vCardPrototype).forEach(key => {
		Object.defineProperty(cardPrototype, key, Object.getOwnPropertyDescriptor(vCardPrototype, key));
	});
	// const cardPrototype = setAllPropertiesEnumerable(lib.element.Card.prototype), vCardPrototype = setAllPropertiesEnumerable(lib.element.VCard.prototype);
	// Object.keys(vCardPrototype).forEach(key => {
	// 	Object.defineProperty(cardPrototype, key, Object.getOwnPropertyDescriptor(vCardPrototype, key));
	// });
	setAllPropertiesEnumerable(lib.element.Button.prototype);
	setAllPropertiesEnumerable(lib.element.GameEvent.prototype);
	setAllPropertiesEnumerable(lib.element.Dialog.prototype);
	setAllPropertiesEnumerable(lib.element.Control.prototype);
	setAllPropertiesEnumerable(lib.element.Client.prototype);
	setAllPropertiesEnumerable(lib.element.NodeWS.prototype);
	if ('__core-js_shared__' in window) lib.init.init();
	else {
		const coreJSBundle = document.createElement('script');
		coreJSBundle.onerror = coreJSBundle.onload = lib.init.init;
		coreJSBundle.src = `${lib.assetURL}game/core-js-bundle.js`;
		document.head.appendChild(coreJSBundle);
	}
}
