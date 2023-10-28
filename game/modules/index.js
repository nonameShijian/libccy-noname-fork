const _status = require('./_status.js'),
	get = require('./get.js'),
	ai = require('./ai.js'),
	lib = require('./lib.js'),
	game = require('./game.js'),
	ui = require('./ui.js');

module.exports = {
	lib: lib,
	game: game,
	ui: ui,
	get: get,
	ai: ai,
	_status: _status
};

// module.exports = {
// 	get lib() { return libExports.lib },
// 	get game() { return gameExports.game },
// 	get ui() { return uiExports.ui },
// 	get get() { return getExports.get },
// 	get ai() { return aiExports.ai },
// 	get _status() { return _statusExports._status },
// };