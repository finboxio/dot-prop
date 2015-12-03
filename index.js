'use strict';
var isObj = require('is-obj');

module.exports.get = function (obj, path) {
	if (!isObj(obj) || typeof path !== 'string') {
		return obj;
	}

	var pathArr = path.split('.');

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		while (p[p.length - 1] === '\\') {
			p = p.slice(0, -1) + '.';
			p += pathArr[++i];
		}

		try {
			obj = obj[p];
		} catch (err) {
			return undefined;
		}

		if (obj === undefined) {
			break;
		}
	}

	return obj;
};

module.exports.set = function (obj, path, value) {
	if (typeof path !== 'string') {
		return;
	}

	var pathArr = path.split('.');

	for (var i = 0; i < pathArr.length; i++) {
		var p = pathArr[i];

		while (p[p.length - 1] === '\\') {
			p = p.slice(0, -1) + '.';
			p += pathArr[++i];
		}

		var childProp;
		try {
			childProp = obj[p];
		} catch (err) {
			break;
		}

		if (!isObj(childProp)) {
			try {
				obj[p] = {};
			} catch (err) {
				break;
			}
		}

		if (i === pathArr.length - 1) {
			try {
				obj[p] = value;
			} catch (err) {}
		}

		obj = obj[p];
	}
};
