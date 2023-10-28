"use strict";
{
	/**
	 * @typedef {InstanceType<typeof lib.element.Player>} Player
	 * @typedef {InstanceType<typeof lib.element.Card>} Card
	 * @typedef {InstanceType<typeof lib.element.VCard>} VCard
	 * @typedef {InstanceType<typeof lib.element.GameEvent>} GameEvent
	 * @typedef {InstanceType<typeof lib.element.NodeWS>} NodeWS
	 */
	const userAgent=navigator.userAgent.toLowerCase();
	if(!localStorage.getItem('gplv3_noname_alerted')){
		if(confirm('①无名杀是一款基于GPLv3协议的开源软件！\n你可以在遵守GPLv3协议的基础上任意使用，修改并转发《无名杀》，以及所有基于《无名杀》开发的拓展。\n点击“确定”即代表您认可并接受GPLv3协议↓️\nhttps://www.gnu.org/licenses/gpl-3.0.html\n②无名杀官方发布地址仅有GitHub仓库！\n其他所有的所谓“无名杀”社群（包括但不限于绝大多数“官方”QQ群、QQ频道等）均为玩家自发组织，与无名杀官方无关！')){
			// @ts-ignore
			localStorage.setItem('gplv3_noname_alerted',true);
		}
		else{
			const ios=userAgent.includes('iphone')||userAgent.includes('ipad')||userAgent.includes('macintosh');
			//electron
			if(typeof window.process=='object'&&typeof window.require=='function'){
				const versions=window.process.versions;
				// @ts-ignore
				const electronVersion=parseFloat(versions.electron);
				let remote;
				if(electronVersion>=14){
					remote = window.require('@electron/remote');
				}else{
					remote = window.require('electron').remote;
				}
				const thisWindow=remote.getCurrentWindow();
				thisWindow.destroy();
				window.process.exit();
			}
			//android-cordova环境
			//ios-cordova环境或ios浏览器环境
			//非ios的网页版
			else if(!ios){
				window.close();
			}
		}
	}

	window['b'+'ann'+'e'+'dE'+'x'+'ten'+'s'+'i'+'o'+'ns']=['\u4fa0\u4e49','\u5168\u6559\u7a0b'];
	
	/**
	 * @param {string} filename
	 */
	function getFileType(filename) {
		// @ts-ignore
		return filename.split('/').pop().split('.').pop().toLowerCase();
	}

	function Module(id, data) {
		this.id = id;
		this.exports = {};
		this.data = data;
	}

	// 根据绝对路径的后缀名，调用挂载在对象上相应的方法
	Module.prototype.load = function () {
		// 取出当前实例上挂载的绝对路径，获取后缀名
		let ext = '.' + getFileType(this.id);
		// 根据后缀名调用对应的处理函数
		// @ts-ignore
		(require.extensions[ext] || require.extensions['.js'])(this);
	};

	/** @type { NodeRequire } */
	// @ts-ignore
	const require = (function () {
		const winRequire = window.require;
		const modules/*=window.modules*/ = {};
		/**
		 * @param {string} path
		 */
		function convertToAbsolutePath(path) {
			// 使用正则表达式替换相对路径
			path = path.replace(/\/\.\//g, '/');
			path = path.replace(/\/([^/]+\/\.\.\/)/g, '/');

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

			// 拼接栈中的路径为绝对路径
			return stack.filter(Boolean).join('/');
		}
		const require = function (id) {
			//console.log(id);
			if (modules[id]) {
				return modules[id];
			}
			if (id.startsWith('./') || id.startsWith('../')) {
				id = (id.startsWith('./') ? './' : '') + convertToAbsolutePath(id);
			} else if (winRequire && !id.startsWith('./') && !id.startsWith('../')) {
				modules[id] = winRequire(id);
			}
			if (modules[id]) {
				return modules[id];
			} else {
				const xhr = new XMLHttpRequest();
				xhr.onerror = () => {
					console.error(`模块[${id}]加载失败`);
					throw new Error(`模块[${id}]加载失败`);
				};
				let data;
				xhr.open("GET", location.href.slice(0, location.href.lastIndexOf('/') + 1) + id, false);
				xhr.send();
				if (xhr.readyState === 4 && ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 0)) {
					data = xhr.responseText;
				} else {
					console.error(`模块[${id}]加载失败`);
					throw new Error(`模块[${id}]加载失败`);
				}
				const _module = new Module(id, data);
				modules[id] = _module.exports;
				if (id.endsWith('.js')) {
					let fun;
					try {
						fun = (new Function(`module`, `exports`, `require`, `__fileName`, `__dirname`, `${data}`));
						fun(_module, _module.exports, _id => require(id.split('/').slice(0, -1).join('/') + '/' + _id)), id.slice(id.lastIndexOf('/') + 1, !!winRequire ? window.__dirname : location.href.slice(0, location.href.lastIndexOf('/')));
						Object.assign(modules[id], _module.exports);
						return modules[id];
					} catch (e) {
						delete modules[id];
						if (e instanceof Error && e.stack) {
							e.stack = e.stack.replace('\n    ', str => str + `at ${location.href.slice(0, location.href.lastIndexOf('/')+1) + id}` + str);
						}
						console.error(`模块[${id}]加载失败`);
						console.error(fun);
						throw e;
					}
				} else {
					try {
						_module.load();
						return modules[id];
					} catch (e) {
						delete modules[id];
						console.error(`模块[${id}]加载失败`);
						throw e;
					}
				}
			}
		};
		require.main = winRequire ? winRequire.main : undefined;
		require.cache = winRequire ? winRequire.cache : Object.create(null);
		require.extensions = Object.assign(Object.create(null), {
			// 其实用不到js这个
			// 但是导入别的后缀名是可以默认按照这个来
			'.js': module => {
				module.exports = module.data;
				Object.assign(modules[module.id], module.exports);
			},
			'.json': module => {
				module.exports = JSON.parse(module.data);
				Object.assign(modules[module.id], module.exports);
			},
			'.node': module => {
				if (winRequire) {
					module.exports = winRequire(module.id);
					Object.assign(modules[module.id], module.exports);
				} else throw '还未支持解析.node文件';
			},
		});
		return require;
	})();

	window.require = require;

	/**
	 * @type { import('./modules/index.js') }
	 */
	const nonameModule = require('./game/modules/index.js');

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
	const setAllPropertiesEnumerable=object=>{
		Object.getOwnPropertyNames(object).forEach(propertyKey=>{
			if(propertyKey=='constructor') return;
			const propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyKey);
			if (propertyDescriptor) {
				if (!propertyDescriptor.enumerable) propertyDescriptor.enumerable = true;
				Object.defineProperty(object, propertyKey, propertyDescriptor);
			}
		},{});
		return object;
	};
	setAllPropertiesEnumerable(lib.element.Player.prototype);
	const cardPrototype=setAllPropertiesEnumerable(lib.element.Card.prototype),vCardPrototype=setAllPropertiesEnumerable(lib.element.VCard.prototype);
	Object.keys(vCardPrototype).forEach(key=>{
		// @ts-ignore
		Object.defineProperty(cardPrototype,key,Object.getOwnPropertyDescriptor(vCardPrototype,key));
	});
	setAllPropertiesEnumerable(lib.element.Button.prototype);
	setAllPropertiesEnumerable(lib.element.GameEvent.prototype);
	setAllPropertiesEnumerable(lib.element.Dialog.prototype);
	setAllPropertiesEnumerable(lib.element.Control.prototype);
	setAllPropertiesEnumerable(lib.element.Client.prototype);
	setAllPropertiesEnumerable(lib.element.NodeWS.prototype);
	if('__core-js_shared__' in window) lib.init.init();
	else{
		const coreJSBundle=document.createElement('script');
		coreJSBundle.onerror=coreJSBundle.onload=lib.init.init;
		coreJSBundle.src=`${lib.assetURL}game/core-js-bundle.js`;
		document.head.appendChild(coreJSBundle);
	}
}
