"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// from npm magic-string

var sourcemapCodec = require('./sourcemap-codec.js');
var BitSet = /*#__PURE__*/function () {
	function BitSet(arg) {
		_classCallCheck(this, BitSet);
		this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
	}
	_createClass(BitSet, [{
		key: "add",
		value: function add(n) {
			this.bits[n >> 5] |= 1 << (n & 31);
		}
	}, {
		key: "has",
		value: function has(n) {
			return !!(this.bits[n >> 5] & 1 << (n & 31));
		}
	}]);
	return BitSet;
}();
var Chunk = /*#__PURE__*/function () {
	function Chunk(start, end, content) {
		_classCallCheck(this, Chunk);
		this.start = start;
		this.end = end;
		this.original = content;
		this.intro = '';
		this.outro = '';
		this.content = content;
		this.storeName = false;
		this.edited = false;
		{
			this.previous = null;
			this.next = null;
		}
	}
	_createClass(Chunk, [{
		key: "appendLeft",
		value: function appendLeft(content) {
			this.outro += content;
		}
	}, {
		key: "appendRight",
		value: function appendRight(content) {
			this.intro = this.intro + content;
		}
	}, {
		key: "clone",
		value: function clone() {
			var chunk = new Chunk(this.start, this.end, this.original);
			chunk.intro = this.intro;
			chunk.outro = this.outro;
			chunk.content = this.content;
			chunk.storeName = this.storeName;
			chunk.edited = this.edited;
			return chunk;
		}
	}, {
		key: "contains",
		value: function contains(index) {
			return this.start < index && index < this.end;
		}
	}, {
		key: "eachNext",
		value: function eachNext(fn) {
			var chunk = this;
			while (chunk) {
				fn(chunk);
				chunk = chunk.next;
			}
		}
	}, {
		key: "eachPrevious",
		value: function eachPrevious(fn) {
			var chunk = this;
			while (chunk) {
				fn(chunk);
				chunk = chunk.previous;
			}
		}
	}, {
		key: "edit",
		value: function edit(content, storeName, contentOnly) {
			this.content = content;
			if (!contentOnly) {
				this.intro = '';
				this.outro = '';
			}
			this.storeName = storeName;
			this.edited = true;
			return this;
		}
	}, {
		key: "prependLeft",
		value: function prependLeft(content) {
			this.outro = content + this.outro;
		}
	}, {
		key: "prependRight",
		value: function prependRight(content) {
			this.intro = content + this.intro;
		}
	}, {
		key: "split",
		value: function split(index) {
			var sliceIndex = index - this.start;
			var originalBefore = this.original.slice(0, sliceIndex);
			var originalAfter = this.original.slice(sliceIndex);
			this.original = originalBefore;
			var newChunk = new Chunk(index, this.end, originalAfter);
			newChunk.outro = this.outro;
			this.outro = '';
			this.end = index;
			if (this.edited) {
				// after split we should save the edit content record into the correct chunk
				// to make sure sourcemap correct
				// For example:
				// '  test'.trim()
				//     split   -> '  ' + 'test'
				//   ✔️ edit    -> '' + 'test'
				//   ✖️ edit    -> 'test' + '' 
				// TODO is this block necessary?...
				newChunk.edit('', false);
				this.content = '';
			} else {
				this.content = originalBefore;
			}
			newChunk.next = this.next;
			if (newChunk.next) newChunk.next.previous = newChunk;
			newChunk.previous = this;
			this.next = newChunk;
			return newChunk;
		}
	}, {
		key: "toString",
		value: function toString() {
			return this.intro + this.content + this.outro;
		}
	}, {
		key: "trimEnd",
		value: function trimEnd(rx) {
			this.outro = this.outro.replace(rx, '');
			if (this.outro.length) return true;
			var trimmed = this.content.replace(rx, '');
			if (trimmed.length) {
				if (trimmed !== this.content) {
					this.split(this.start + trimmed.length).edit('', undefined, true);
					if (this.edited) {
						// save the change, if it has been edited
						this.edit(trimmed, this.storeName, true);
					}
				}
				return true;
			} else {
				this.edit('', undefined, true);
				this.intro = this.intro.replace(rx, '');
				if (this.intro.length) return true;
			}
		}
	}, {
		key: "trimStart",
		value: function trimStart(rx) {
			this.intro = this.intro.replace(rx, '');
			if (this.intro.length) return true;
			var trimmed = this.content.replace(rx, '');
			if (trimmed.length) {
				if (trimmed !== this.content) {
					var newChunk = this.split(this.end - trimmed.length);
					if (this.edited) {
						// save the change, if it has been edited
						newChunk.edit(trimmed, this.storeName, true);
					}
					this.edit('', undefined, true);
				}
				return true;
			} else {
				this.edit('', undefined, true);
				this.outro = this.outro.replace(rx, '');
				if (this.outro.length) return true;
			}
		}
	}]);
	return Chunk;
}();
function getBtoa() {
	if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
		return function (str) {
			return window.btoa(unescape(encodeURIComponent(str)));
		};
	} else if (typeof Buffer === 'function') {
		return function (str) {
			return Buffer.from(str, 'utf-8').toString('base64');
		};
	} else {
		return function () {
			throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
		};
	}
}
var btoa = /*#__PURE__*/getBtoa();
var SourceMap = /*#__PURE__*/function () {
	function SourceMap(properties) {
		_classCallCheck(this, SourceMap);
		this.version = 3;
		this.file = properties.file;
		this.sources = properties.sources;
		this.sourcesContent = properties.sourcesContent;
		this.names = properties.names;
		this.mappings = sourcemapCodec.encode(properties.mappings);
		if (typeof properties.x_google_ignoreList !== 'undefined') {
			this.x_google_ignoreList = properties.x_google_ignoreList;
		}
	}
	_createClass(SourceMap, [{
		key: "toString",
		value: function toString() {
			return JSON.stringify(this);
		}
	}, {
		key: "toUrl",
		value: function toUrl() {
			return 'data:application/json;charset=utf-8;base64,' + btoa(this.toString());
		}
	}]);
	return SourceMap;
}();
function guessIndent(code) {
	var lines = code.split('\n');
	var tabbed = lines.filter(function (line) {
		return /^\t+/.test(line);
	});
	var spaced = lines.filter(function (line) {
		return /^ {2,}/.test(line);
	});
	if (tabbed.length === 0 && spaced.length === 0) {
		return null;
	}

	// More lines tabbed than spaced? Assume tabs, and
	// default to tabs in the case of a tie (or nothing
	// to go on)
	if (tabbed.length >= spaced.length) {
		return '\t';
	}

	// Otherwise, we need to guess the multiple
	var min = spaced.reduce(function (previous, current) {
		var numSpaces = /^ +/.exec(current)[0].length;
		return Math.min(numSpaces, previous);
	}, Infinity);
	return new Array(min + 1).join(' ');
}
function getRelativePath(from, to) {
	var fromParts = from.split(/[/\\]/);
	var toParts = to.split(/[/\\]/);
	fromParts.pop(); // get dirname

	while (fromParts[0] === toParts[0]) {
		fromParts.shift();
		toParts.shift();
	}
	if (fromParts.length) {
		var i = fromParts.length;
		while (i--) fromParts[i] = '..';
	}
	return fromParts.concat(toParts).join('/');
}
var toString = Object.prototype.toString;
function isObject(thing) {
	return toString.call(thing) === '[object Object]';
}
function getLocator(source) {
	var originalLines = source.split('\n');
	var lineOffsets = [];
	for (var i = 0, pos = 0; i < originalLines.length; i++) {
		lineOffsets.push(pos);
		pos += originalLines[i].length + 1;
	}
	return function locate(index) {
		var i = 0;
		var j = lineOffsets.length;
		while (i < j) {
			var m = i + j >> 1;
			if (index < lineOffsets[m]) {
				j = m;
			} else {
				i = m + 1;
			}
		}
		var line = i - 1;
		var column = index - lineOffsets[line];
		return {
			line: line,
			column: column
		};
	};
}
var wordRegex = /\w/;
var Mappings = /*#__PURE__*/function () {
	function Mappings(hires) {
		_classCallCheck(this, Mappings);
		this.hires = hires;
		this.generatedCodeLine = 0;
		this.generatedCodeColumn = 0;
		this.raw = [];
		this.rawSegments = this.raw[this.generatedCodeLine] = [];
		this.pending = null;
	}
	_createClass(Mappings, [{
		key: "addEdit",
		value: function addEdit(sourceIndex, content, loc, nameIndex) {
			if (content.length) {
				var contentLineEnd = content.indexOf('\n', 0);
				var previousContentLineEnd = -1;
				while (contentLineEnd >= 0) {
					var _segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
					if (nameIndex >= 0) {
						_segment.push(nameIndex);
					}
					this.rawSegments.push(_segment);
					this.generatedCodeLine += 1;
					this.raw[this.generatedCodeLine] = this.rawSegments = [];
					this.generatedCodeColumn = 0;
					previousContentLineEnd = contentLineEnd;
					contentLineEnd = content.indexOf('\n', contentLineEnd + 1);
				}
				var segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
				if (nameIndex >= 0) {
					segment.push(nameIndex);
				}
				this.rawSegments.push(segment);
				this.advance(content.slice(previousContentLineEnd + 1));
			} else if (this.pending) {
				this.rawSegments.push(this.pending);
				this.advance(content);
			}
			this.pending = null;
		}
	}, {
		key: "addUneditedChunk",
		value: function addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
			var originalCharIndex = chunk.start;
			var first = true;
			// when iterating each char, check if it's in a word boundary
			var charInHiresBoundary = false;
			while (originalCharIndex < chunk.end) {
				if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
					var segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
					if (this.hires === 'boundary') {
						// in hires "boundary", group segments per word boundary than per char
						if (wordRegex.test(original[originalCharIndex])) {
							// for first char in the boundary found, start the boundary by pushing a segment
							if (!charInHiresBoundary) {
								this.rawSegments.push(segment);
								charInHiresBoundary = true;
							}
						} else {
							// for non-word char, end the boundary by pushing a segment
							this.rawSegments.push(segment);
							charInHiresBoundary = false;
						}
					} else {
						this.rawSegments.push(segment);
					}
				}
				if (original[originalCharIndex] === '\n') {
					loc.line += 1;
					loc.column = 0;
					this.generatedCodeLine += 1;
					this.raw[this.generatedCodeLine] = this.rawSegments = [];
					this.generatedCodeColumn = 0;
					first = true;
				} else {
					loc.column += 1;
					this.generatedCodeColumn += 1;
					first = false;
				}
				originalCharIndex += 1;
			}
			this.pending = null;
		}
	}, {
		key: "advance",
		value: function advance(str) {
			if (!str) return;
			var lines = str.split('\n');
			if (lines.length > 1) {
				for (var i = 0; i < lines.length - 1; i++) {
					this.generatedCodeLine++;
					this.raw[this.generatedCodeLine] = this.rawSegments = [];
				}
				this.generatedCodeColumn = 0;
			}
			this.generatedCodeColumn += lines[lines.length - 1].length;
		}
	}]);
	return Mappings;
}();
var n = '\n';
var warned = {
	insertLeft: false,
	insertRight: false,
	storeName: false
};
var MagicString = /*#__PURE__*/function () {
	function MagicString(string) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		_classCallCheck(this, MagicString);
		var chunk = new Chunk(0, string.length, string);
		Object.defineProperties(this, {
			original: {
				writable: true,
				value: string
			},
			outro: {
				writable: true,
				value: ''
			},
			intro: {
				writable: true,
				value: ''
			},
			firstChunk: {
				writable: true,
				value: chunk
			},
			lastChunk: {
				writable: true,
				value: chunk
			},
			lastSearchedChunk: {
				writable: true,
				value: chunk
			},
			byStart: {
				writable: true,
				value: {}
			},
			byEnd: {
				writable: true,
				value: {}
			},
			filename: {
				writable: true,
				value: options.filename
			},
			indentExclusionRanges: {
				writable: true,
				value: options.indentExclusionRanges
			},
			sourcemapLocations: {
				writable: true,
				value: new BitSet()
			},
			storedNames: {
				writable: true,
				value: {}
			},
			indentStr: {
				writable: true,
				value: undefined
			},
			ignoreList: {
				writable: true,
				value: options.ignoreList
			}
		});
		this.byStart[0] = chunk;
		this.byEnd[string.length] = chunk;
	}
	_createClass(MagicString, [{
		key: "addSourcemapLocation",
		value: function addSourcemapLocation(_char) {
			this.sourcemapLocations.add(_char);
		}
	}, {
		key: "append",
		value: function append(content) {
			if (typeof content !== 'string') throw new TypeError('outro content must be a string');
			this.outro += content;
			return this;
		}
	}, {
		key: "appendLeft",
		value: function appendLeft(index, content) {
			if (typeof content !== 'string') throw new TypeError('inserted content must be a string');
			this._split(index);
			var chunk = this.byEnd[index];
			if (chunk) {
				chunk.appendLeft(content);
			} else {
				this.intro += content;
			}
			return this;
		}
	}, {
		key: "appendRight",
		value: function appendRight(index, content) {
			if (typeof content !== 'string') throw new TypeError('inserted content must be a string');
			this._split(index);
			var chunk = this.byStart[index];
			if (chunk) {
				chunk.appendRight(content);
			} else {
				this.outro += content;
			}
			return this;
		}
	}, {
		key: "clone",
		value: function clone() {
			var cloned = new MagicString(this.original, {
				filename: this.filename
			});
			var originalChunk = this.firstChunk;
			var clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
			while (originalChunk) {
				cloned.byStart[clonedChunk.start] = clonedChunk;
				cloned.byEnd[clonedChunk.end] = clonedChunk;
				var nextOriginalChunk = originalChunk.next;
				var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
				if (nextClonedChunk) {
					clonedChunk.next = nextClonedChunk;
					nextClonedChunk.previous = clonedChunk;
					clonedChunk = nextClonedChunk;
				}
				originalChunk = nextOriginalChunk;
			}
			cloned.lastChunk = clonedChunk;
			if (this.indentExclusionRanges) {
				cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
			}
			cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
			cloned.intro = this.intro;
			cloned.outro = this.outro;
			return cloned;
		}
	}, {
		key: "generateDecodedMap",
		value: function generateDecodedMap(options) {
			var _this = this;
			options = options || {};
			var sourceIndex = 0;
			var names = Object.keys(this.storedNames);
			var mappings = new Mappings(options.hires);
			var locate = getLocator(this.original);
			if (this.intro) {
				mappings.advance(this.intro);
			}
			this.firstChunk.eachNext(function (chunk) {
				var loc = locate(chunk.start);
				if (chunk.intro.length) mappings.advance(chunk.intro);
				if (chunk.edited) {
					mappings.addEdit(sourceIndex, chunk.content, loc, chunk.storeName ? names.indexOf(chunk.original) : -1);
				} else {
					mappings.addUneditedChunk(sourceIndex, chunk, _this.original, loc, _this.sourcemapLocations);
				}
				if (chunk.outro.length) mappings.advance(chunk.outro);
			});
			if (options.source) {
				console.log(getRelativePath(options.file || '', options.source));
			}
			return {
				file: options.file ? options.file.split(/[/\\]/).pop() : undefined,
				sources: [options.source ? getRelativePath(options.file || '', options.source) : options.file || ''],
				sourcesContent: options.includeContent ? [this.original] : undefined,
				names: names,
				mappings: mappings.raw,
				x_google_ignoreList: this.ignoreList ? [sourceIndex] : undefined
			};
		}
	}, {
		key: "generateMap",
		value: function generateMap(options) {
			return new SourceMap(this.generateDecodedMap(options));
		}
	}, {
		key: "_ensureindentStr",
		value: function _ensureindentStr() {
			if (this.indentStr === undefined) {
				this.indentStr = guessIndent(this.original);
			}
		}
	}, {
		key: "_getRawIndentString",
		value: function _getRawIndentString() {
			this._ensureindentStr();
			return this.indentStr;
		}
	}, {
		key: "getIndentString",
		value: function getIndentString() {
			this._ensureindentStr();
			return this.indentStr === null ? '\t' : this.indentStr;
		}
	}, {
		key: "indent",
		value: function indent(indentStr, options) {
			var pattern = /^[^\r\n]/gm;
			if (isObject(indentStr)) {
				options = indentStr;
				indentStr = undefined;
			}
			if (indentStr === undefined) {
				this._ensureindentStr();
				indentStr = this.indentStr || '\t';
			}
			if (indentStr === '') return this; // noop

			options = options || {};

			// Process exclusion ranges
			var isExcluded = {};
			if (options.exclude) {
				var exclusions = typeof options.exclude[0] === 'number' ? [options.exclude] : options.exclude;
				exclusions.forEach(function (exclusion) {
					for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
						isExcluded[i] = true;
					}
				});
			}
			var shouldIndentNextCharacter = options.indentStart !== false;
			var replacer = function replacer(match) {
				if (shouldIndentNextCharacter) return "".concat(indentStr).concat(match);
				shouldIndentNextCharacter = true;
				return match;
			};
			this.intro = this.intro.replace(pattern, replacer);
			var charIndex = 0;
			var chunk = this.firstChunk;
			while (chunk) {
				var end = chunk.end;
				if (chunk.edited) {
					if (!isExcluded[charIndex]) {
						chunk.content = chunk.content.replace(pattern, replacer);
						if (chunk.content.length) {
							shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === '\n';
						}
					}
				} else {
					charIndex = chunk.start;
					while (charIndex < end) {
						if (!isExcluded[charIndex]) {
							var _char2 = this.original[charIndex];
							if (_char2 === '\n') {
								shouldIndentNextCharacter = true;
							} else if (_char2 !== '\r' && shouldIndentNextCharacter) {
								shouldIndentNextCharacter = false;
								if (charIndex === chunk.start) {
									chunk.prependRight(indentStr);
								} else {
									this._splitChunk(chunk, charIndex);
									chunk = chunk.next;
									chunk.prependRight(indentStr);
								}
							}
						}
						charIndex += 1;
					}
				}
				charIndex = chunk.end;
				chunk = chunk.next;
			}
			this.outro = this.outro.replace(pattern, replacer);
			return this;
		}
	}, {
		key: "insert",
		value: function insert() {
			throw new Error('magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)');
		}
	}, {
		key: "insertLeft",
		value: function insertLeft(index, content) {
			if (!warned.insertLeft) {
				console.warn('magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead'); // eslint-disable-line no-console
				warned.insertLeft = true;
			}
			return this.appendLeft(index, content);
		}
	}, {
		key: "insertRight",
		value: function insertRight(index, content) {
			if (!warned.insertRight) {
				console.warn('magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead'); // eslint-disable-line no-console
				warned.insertRight = true;
			}
			return this.prependRight(index, content);
		}
	}, {
		key: "move",
		value: function move(start, end, index) {
			if (index >= start && index <= end) throw new Error('Cannot move a selection inside itself');
			this._split(start);
			this._split(end);
			this._split(index);
			var first = this.byStart[start];
			var last = this.byEnd[end];
			var oldLeft = first.previous;
			var oldRight = last.next;
			var newRight = this.byStart[index];
			if (!newRight && last === this.lastChunk) return this;
			var newLeft = newRight ? newRight.previous : this.lastChunk;
			if (oldLeft) oldLeft.next = oldRight;
			if (oldRight) oldRight.previous = oldLeft;
			if (newLeft) newLeft.next = first;
			if (newRight) newRight.previous = last;
			if (!first.previous) this.firstChunk = last.next;
			if (!last.next) {
				this.lastChunk = first.previous;
				this.lastChunk.next = null;
			}
			first.previous = newLeft;
			last.next = newRight || null;
			if (!newLeft) this.firstChunk = first;
			if (!newRight) this.lastChunk = last;
			return this;
		}
	}, {
		key: "overwrite",
		value: function overwrite(start, end, content, options) {
			options = options || {};
			return this.update(start, end, content, _objectSpread(_objectSpread({}, options), {}, {
				overwrite: !options.contentOnly
			}));
		}
	}, {
		key: "update",
		value: function update(start, end, content, options) {
			if (typeof content !== 'string') throw new TypeError('replacement content must be a string');
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
			if (end > this.original.length) throw new Error('end is out of bounds');
			if (start === end) throw new Error('Cannot overwrite a zero-length range – use appendLeft or prependRight instead');
			this._split(start);
			this._split(end);
			if (options === true) {
				if (!warned.storeName) {
					console.warn('The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string'); // eslint-disable-line no-console
					warned.storeName = true;
				}
				options = {
					storeName: true
				};
			}
			var storeName = options !== undefined ? options.storeName : false;
			var overwrite = options !== undefined ? options.overwrite : false;
			if (storeName) {
				var original = this.original.slice(start, end);
				Object.defineProperty(this.storedNames, original, {
					writable: true,
					value: true,
					enumerable: true
				});
			}
			var first = this.byStart[start];
			var last = this.byEnd[end];
			if (first) {
				var chunk = first;
				while (chunk !== last) {
					if (chunk.next !== this.byStart[chunk.end]) {
						throw new Error('Cannot overwrite across a split point');
					}
					chunk = chunk.next;
					chunk.edit('', false);
				}
				first.edit(content, storeName, !overwrite);
			} else {
				// must be inserting at the end
				var newChunk = new Chunk(start, end, '').edit(content, storeName);

				// TODO last chunk in the array may not be the last chunk, if it's moved...
				last.next = newChunk;
				newChunk.previous = last;
			}
			return this;
		}
	}, {
		key: "prepend",
		value: function prepend(content) {
			if (typeof content !== 'string') throw new TypeError('outro content must be a string');
			this.intro = content + this.intro;
			return this;
		}
	}, {
		key: "prependLeft",
		value: function prependLeft(index, content) {
			if (typeof content !== 'string') throw new TypeError('inserted content must be a string');
			this._split(index);
			var chunk = this.byEnd[index];
			if (chunk) {
				chunk.prependLeft(content);
			} else {
				this.intro = content + this.intro;
			}
			return this;
		}
	}, {
		key: "prependRight",
		value: function prependRight(index, content) {
			if (typeof content !== 'string') throw new TypeError('inserted content must be a string');
			this._split(index);
			var chunk = this.byStart[index];
			if (chunk) {
				chunk.prependRight(content);
			} else {
				this.outro = content + this.outro;
			}
			return this;
		}
	}, {
		key: "remove",
		value: function remove(start, end) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
			if (start === end) return this;
			if (start < 0 || end > this.original.length) throw new Error('Character is out of bounds');
			if (start > end) throw new Error('end must be greater than start');
			this._split(start);
			this._split(end);
			var chunk = this.byStart[start];
			while (chunk) {
				chunk.intro = '';
				chunk.outro = '';
				chunk.edit('');
				chunk = end > chunk.end ? this.byStart[chunk.end] : null;
			}
			return this;
		}
	}, {
		key: "lastChar",
		value: function lastChar() {
			if (this.outro.length) return this.outro[this.outro.length - 1];
			var chunk = this.lastChunk;
			do {
				if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
				if (chunk.content.length) return chunk.content[chunk.content.length - 1];
				if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
			} while (chunk = chunk.previous);
			if (this.intro.length) return this.intro[this.intro.length - 1];
			return '';
		}
	}, {
		key: "lastLine",
		value: function lastLine() {
			var lineIndex = this.outro.lastIndexOf(n);
			if (lineIndex !== -1) return this.outro.substr(lineIndex + 1);
			var lineStr = this.outro;
			var chunk = this.lastChunk;
			do {
				if (chunk.outro.length > 0) {
					lineIndex = chunk.outro.lastIndexOf(n);
					if (lineIndex !== -1) return chunk.outro.substr(lineIndex + 1) + lineStr;
					lineStr = chunk.outro + lineStr;
				}
				if (chunk.content.length > 0) {
					lineIndex = chunk.content.lastIndexOf(n);
					if (lineIndex !== -1) return chunk.content.substr(lineIndex + 1) + lineStr;
					lineStr = chunk.content + lineStr;
				}
				if (chunk.intro.length > 0) {
					lineIndex = chunk.intro.lastIndexOf(n);
					if (lineIndex !== -1) return chunk.intro.substr(lineIndex + 1) + lineStr;
					lineStr = chunk.intro + lineStr;
				}
			} while (chunk = chunk.previous);
			lineIndex = this.intro.lastIndexOf(n);
			if (lineIndex !== -1) return this.intro.substr(lineIndex + 1) + lineStr;
			return this.intro + lineStr;
		}
	}, {
		key: "slice",
		value: function slice() {
			var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.original.length;
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
			var result = '';

			// find start chunk
			var chunk = this.firstChunk;
			while (chunk && (chunk.start > start || chunk.end <= start)) {
				// found end chunk before start
				if (chunk.start < end && chunk.end >= end) {
					return result;
				}
				chunk = chunk.next;
			}
			if (chunk && chunk.edited && chunk.start !== start) throw new Error("Cannot use replaced character ".concat(start, " as slice start anchor."));
			var startChunk = chunk;
			while (chunk) {
				if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
					result += chunk.intro;
				}
				var containsEnd = chunk.start < end && chunk.end >= end;
				if (containsEnd && chunk.edited && chunk.end !== end) throw new Error("Cannot use replaced character ".concat(end, " as slice end anchor."));
				var sliceStart = startChunk === chunk ? start - chunk.start : 0;
				var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
				result += chunk.content.slice(sliceStart, sliceEnd);
				if (chunk.outro && (!containsEnd || chunk.end === end)) {
					result += chunk.outro;
				}
				if (containsEnd) {
					break;
				}
				chunk = chunk.next;
			}
			return result;
		}

		// TODO deprecate this? not really very useful
	}, {
		key: "snip",
		value: function snip(start, end) {
			var clone = this.clone();
			clone.remove(0, start);
			clone.remove(end, clone.original.length);
			return clone;
		}
	}, {
		key: "_split",
		value: function _split(index) {
			if (this.byStart[index] || this.byEnd[index]) return;
			var chunk = this.lastSearchedChunk;
			var searchForward = index > chunk.end;
			while (chunk) {
				if (chunk.contains(index)) return this._splitChunk(chunk, index);
				chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
			}
		}
	}, {
		key: "_splitChunk",
		value: function _splitChunk(chunk, index) {
			if (chunk.edited && chunk.content.length) {
				// zero-length edited chunks are a special case (overlapping replacements)
				var loc = getLocator(this.original)(index);
				throw new Error("Cannot split a chunk that has already been edited (".concat(loc.line, ":").concat(loc.column, " \u2013 \"").concat(chunk.original, "\")"));
			}
			var newChunk = chunk.split(index);
			this.byEnd[index] = chunk;
			this.byStart[index] = newChunk;
			this.byEnd[newChunk.end] = newChunk;
			if (chunk === this.lastChunk) this.lastChunk = newChunk;
			this.lastSearchedChunk = chunk;
			return true;
		}
	}, {
		key: "toString",
		value: function toString() {
			var str = this.intro;
			var chunk = this.firstChunk;
			while (chunk) {
				str += chunk.toString();
				chunk = chunk.next;
			}
			return str + this.outro;
		}
	}, {
		key: "isEmpty",
		value: function isEmpty() {
			var chunk = this.firstChunk;
			do {
				if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim()) return false;
			} while (chunk = chunk.next);
			return true;
		}
	}, {
		key: "length",
		value: function length() {
			var chunk = this.firstChunk;
			var length = 0;
			do {
				length += chunk.intro.length + chunk.content.length + chunk.outro.length;
			} while (chunk = chunk.next);
			return length;
		}
	}, {
		key: "trimLines",
		value: function trimLines() {
			return this.trim('[\\r\\n]');
		}
	}, {
		key: "trim",
		value: function trim(charType) {
			return this.trimStart(charType).trimEnd(charType);
		}
	}, {
		key: "trimEndAborted",
		value: function trimEndAborted(charType) {
			var rx = new RegExp((charType || '\\s') + '+$');
			this.outro = this.outro.replace(rx, '');
			if (this.outro.length) return true;
			var chunk = this.lastChunk;
			do {
				var end = chunk.end;
				var aborted = chunk.trimEnd(rx);

				// if chunk was trimmed, we have a new lastChunk
				if (chunk.end !== end) {
					if (this.lastChunk === chunk) {
						this.lastChunk = chunk.next;
					}
					this.byEnd[chunk.end] = chunk;
					this.byStart[chunk.next.start] = chunk.next;
					this.byEnd[chunk.next.end] = chunk.next;
				}
				if (aborted) return true;
				chunk = chunk.previous;
			} while (chunk);
			return false;
		}
	}, {
		key: "trimEnd",
		value: function trimEnd(charType) {
			this.trimEndAborted(charType);
			return this;
		}
	}, {
		key: "trimStartAborted",
		value: function trimStartAborted(charType) {
			var rx = new RegExp('^' + (charType || '\\s') + '+');
			this.intro = this.intro.replace(rx, '');
			if (this.intro.length) return true;
			var chunk = this.firstChunk;
			do {
				var end = chunk.end;
				var aborted = chunk.trimStart(rx);
				if (chunk.end !== end) {
					// special case...
					if (chunk === this.lastChunk) this.lastChunk = chunk.next;
					this.byEnd[chunk.end] = chunk;
					this.byStart[chunk.next.start] = chunk.next;
					this.byEnd[chunk.next.end] = chunk.next;
				}
				if (aborted) return true;
				chunk = chunk.next;
			} while (chunk);
			return false;
		}
	}, {
		key: "trimStart",
		value: function trimStart(charType) {
			this.trimStartAborted(charType);
			return this;
		}
	}, {
		key: "hasChanged",
		value: function hasChanged() {
			return this.original !== this.toString();
		}
	}, {
		key: "_replaceRegexp",
		value: function _replaceRegexp(searchValue, replacement) {
			var _this2 = this;
			function getReplacement(match, str) {
				if (typeof replacement === 'string') {
					return replacement.replace(/\$(\$|&|\d+)/g, function (_, i) {
						// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
						if (i === '$') return '$';
						if (i === '&') return match[0];
						var num = +i;
						if (num < match.length) return match[+i];
						return "$".concat(i);
					});
				} else {
					return replacement.apply(void 0, _toConsumableArray(match).concat([match.index, str, match.groups]));
				}
			}
			function matchAll(re, str) {
				var match;
				var matches = [];
				while (match = re.exec(str)) {
					matches.push(match);
				}
				return matches;
			}
			if (searchValue.global) {
				var matches = matchAll(searchValue, this.original);
				matches.forEach(function (match) {
					if (match.index != null) _this2.overwrite(match.index, match.index + match[0].length, getReplacement(match, _this2.original));
				});
			} else {
				var match = this.original.match(searchValue);
				if (match && match.index != null) this.overwrite(match.index, match.index + match[0].length, getReplacement(match, this.original));
			}
			return this;
		}
	}, {
		key: "_replaceString",
		value: function _replaceString(string, replacement) {
			var original = this.original;
			var index = original.indexOf(string);
			if (index !== -1) {
				this.overwrite(index, index + string.length, replacement);
			}
			return this;
		}
	}, {
		key: "replace",
		value: function replace(searchValue, replacement) {
			if (typeof searchValue === 'string') {
				return this._replaceString(searchValue, replacement);
			}
			return this._replaceRegexp(searchValue, replacement);
		}
	}, {
		key: "_replaceAllString",
		value: function _replaceAllString(string, replacement) {
			var original = this.original;
			var stringLength = string.length;
			for (var index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
				this.overwrite(index, index + stringLength, replacement);
			}
			return this;
		}
	}, {
		key: "replaceAll",
		value: function replaceAll(searchValue, replacement) {
			if (typeof searchValue === 'string') {
				return this._replaceAllString(searchValue, replacement);
			}
			if (!searchValue.global) {
				throw new TypeError('MagicString.prototype.replaceAll called with a non-global RegExp argument');
			}
			return this._replaceRegexp(searchValue, replacement);
		}
	}]);
	return MagicString;
}();
var hasOwnProp = Object.prototype.hasOwnProperty;
var Bundle = /*#__PURE__*/function () {
	function Bundle() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		_classCallCheck(this, Bundle);
		this.intro = options.intro || '';
		this.separator = options.separator !== undefined ? options.separator : '\n';
		this.sources = [];
		this.uniqueSources = [];
		this.uniqueSourceIndexByFilename = {};
	}
	_createClass(Bundle, [{
		key: "addSource",
		value: function addSource(source) {
			if (source instanceof MagicString) {
				return this.addSource({
					content: source,
					filename: source.filename,
					separator: this.separator
				});
			}
			if (!isObject(source) || !source.content) {
				throw new Error('bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`');
			}
			['filename', 'ignoreList', 'indentExclusionRanges', 'separator'].forEach(function (option) {
				if (!hasOwnProp.call(source, option)) source[option] = source.content[option];
			});
			if (source.separator === undefined) {
				// TODO there's a bunch of this sort of thing, needs cleaning up
				source.separator = this.separator;
			}
			if (source.filename) {
				if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
					this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
					this.uniqueSources.push({
						filename: source.filename,
						content: source.content.original
					});
				} else {
					var uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
					if (source.content.original !== uniqueSource.content) {
						throw new Error("Illegal source: same filename (".concat(source.filename, "), different contents"));
					}
				}
			}
			this.sources.push(source);
			return this;
		}
	}, {
		key: "append",
		value: function append(str, options) {
			this.addSource({
				content: new MagicString(str),
				separator: options && options.separator || ''
			});
			return this;
		}
	}, {
		key: "clone",
		value: function clone() {
			var bundle = new Bundle({
				intro: this.intro,
				separator: this.separator
			});
			this.sources.forEach(function (source) {
				bundle.addSource({
					filename: source.filename,
					content: source.content.clone(),
					separator: source.separator
				});
			});
			return bundle;
		}
	}, {
		key: "generateDecodedMap",
		value: function generateDecodedMap() {
			var _this3 = this;
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var names = [];
			var x_google_ignoreList = undefined;
			this.sources.forEach(function (source) {
				Object.keys(source.content.storedNames).forEach(function (name) {
					if (!~names.indexOf(name)) names.push(name);
				});
			});
			var mappings = new Mappings(options.hires);
			if (this.intro) {
				mappings.advance(this.intro);
			}
			this.sources.forEach(function (source, i) {
				if (i > 0) {
					mappings.advance(_this3.separator);
				}
				var sourceIndex = source.filename ? _this3.uniqueSourceIndexByFilename[source.filename] : -1;
				var magicString = source.content;
				var locate = getLocator(magicString.original);
				if (magicString.intro) {
					mappings.advance(magicString.intro);
				}
				magicString.firstChunk.eachNext(function (chunk) {
					var loc = locate(chunk.start);
					if (chunk.intro.length) mappings.advance(chunk.intro);
					if (source.filename) {
						if (chunk.edited) {
							mappings.addEdit(sourceIndex, chunk.content, loc, chunk.storeName ? names.indexOf(chunk.original) : -1);
						} else {
							mappings.addUneditedChunk(sourceIndex, chunk, magicString.original, loc, magicString.sourcemapLocations);
						}
					} else {
						mappings.advance(chunk.content);
					}
					if (chunk.outro.length) mappings.advance(chunk.outro);
				});
				if (magicString.outro) {
					mappings.advance(magicString.outro);
				}
				if (source.ignoreList && sourceIndex !== -1) {
					if (x_google_ignoreList === undefined) {
						x_google_ignoreList = [];
					}
					x_google_ignoreList.push(sourceIndex);
				}
			});
			return {
				file: options.file ? options.file.split(/[/\\]/).pop() : undefined,
				sources: this.uniqueSources.map(function (source) {
					return options.file ? getRelativePath(options.file, source.filename) : source.filename;
				}),
				sourcesContent: this.uniqueSources.map(function (source) {
					return options.includeContent ? source.content : null;
				}),
				names: names,
				mappings: mappings.raw,
				x_google_ignoreList: x_google_ignoreList
			};
		}
	}, {
		key: "generateMap",
		value: function generateMap(options) {
			return new SourceMap(this.generateDecodedMap(options));
		}
	}, {
		key: "getIndentString",
		value: function getIndentString() {
			var indentStringCounts = {};
			this.sources.forEach(function (source) {
				var indentStr = source.content._getRawIndentString();
				if (indentStr === null) return;
				if (!indentStringCounts[indentStr]) indentStringCounts[indentStr] = 0;
				indentStringCounts[indentStr] += 1;
			});
			return Object.keys(indentStringCounts).sort(function (a, b) {
				return indentStringCounts[a] - indentStringCounts[b];
			})[0] || '\t';
		}
	}, {
		key: "indent",
		value: function indent(indentStr) {
			var _this4 = this;
			if (!arguments.length) {
				indentStr = this.getIndentString();
			}
			if (indentStr === '') return this; // noop

			var trailingNewline = !this.intro || this.intro.slice(-1) === '\n';
			this.sources.forEach(function (source, i) {
				var separator = source.separator !== undefined ? source.separator : _this4.separator;
				var indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);
				source.content.indent(indentStr, {
					exclude: source.indentExclusionRanges,
					indentStart: indentStart //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
				});

				trailingNewline = source.content.lastChar() === '\n';
			});
			if (this.intro) {
				this.intro = indentStr + this.intro.replace(/^[^\n]/gm, function (match, index) {
					return index > 0 ? indentStr + match : match;
				});
			}
			return this;
		}
	}, {
		key: "prepend",
		value: function prepend(str) {
			this.intro = str + this.intro;
			return this;
		}
	}, {
		key: "toString",
		value: function toString() {
			var _this5 = this;
			var body = this.sources.map(function (source, i) {
				var separator = source.separator !== undefined ? source.separator : _this5.separator;
				var str = (i > 0 ? separator : '') + source.content.toString();
				return str;
			}).join('');
			return this.intro + body;
		}
	}, {
		key: "isEmpty",
		value: function isEmpty() {
			if (this.intro.length && this.intro.trim()) return false;
			if (this.sources.some(function (source) {
				return !source.content.isEmpty();
			})) return false;
			return true;
		}
	}, {
		key: "length",
		value: function length() {
			return this.sources.reduce(function (length, source) {
				return length + source.content.length();
			}, this.intro.length);
		}
	}, {
		key: "trimLines",
		value: function trimLines() {
			return this.trim('[\\r\\n]');
		}
	}, {
		key: "trim",
		value: function trim(charType) {
			return this.trimStart(charType).trimEnd(charType);
		}
	}, {
		key: "trimStart",
		value: function trimStart(charType) {
			var rx = new RegExp('^' + (charType || '\\s') + '+');
			this.intro = this.intro.replace(rx, '');
			if (!this.intro) {
				var source;
				var i = 0;
				do {
					source = this.sources[i++];
					if (!source) {
						break;
					}
				} while (!source.content.trimStartAborted(charType));
			}
			return this;
		}
	}, {
		key: "trimEnd",
		value: function trimEnd(charType) {
			var rx = new RegExp((charType || '\\s') + '+$');
			var source;
			var i = this.sources.length - 1;
			do {
				source = this.sources[i--];
				if (!source) {
					this.intro = this.intro.replace(rx, '');
					break;
				}
			} while (!source.content.trimEndAborted(charType));
			return this;
		}
	}]);
	return Bundle;
}();
MagicString.Bundle = Bundle;
MagicString.SourceMap = SourceMap;
MagicString["default"] = MagicString; // work around TypeScript bug https://github.com/Rich-Harris/magic-string/pull/121

module.exports = MagicString;