(function () {

	'use strict';

	module.exports = function (sandal, isConstructor) {
		if (isConstructor) {
			sandal.prototype.autowire = function (path) {
				registerFolder(this, path);
				return this;
			};
		} else {
			sandal.autowire = function (path) {
				registerFolder(sandal, path);
				return sandal;
			};
		}
	};

})();

var fs = require('fs'),
	path = require('path');

function registerFolder (container, folderPath) {
	fs.readdirSync(folderPath).forEach(function (fileName) {
		var filePath = path.join(folderPath, fileName),
			stats = fs.statSync(filePath),
			component,
			meta;
		if (stats.isDirectory()) return registerFolder(container, filePath);
		if (stats.isFile() && (['.js','.json']).indexOf(path.extname(filePath)) !== -1) {
			component = require(filePath);
			meta = component.autowire || {};
			if (meta.ignore) return;
			meta.type = meta.type || ((typeof(component) === 'function') ? 'factory' : 'object');
			meta.name = meta.name || path.basename(filePath, path.extname(filePath));
			if (meta.type === 'object') {
				container.object(meta.name, component, meta.groups);
			} else {
				if (meta.dependencies) {
					container[meta.type](meta.name,
						meta.dependencies,
						component,
						!!meta.transient,
						meta.groups);
				} else {
					container[meta.type](meta.name,
						component,
						!!meta.transient,
						meta.groups);
				}
			}
		}
	});
};