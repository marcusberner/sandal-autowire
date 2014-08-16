module.exports = function (testfile, testObject) {
	return {
		getDep1: function () {
			return testfile;
		},
		getDep2: function () {
			return testObject;
		}
	}
};
module.exports.autowire = {
	name: 'namedFactory2'
};