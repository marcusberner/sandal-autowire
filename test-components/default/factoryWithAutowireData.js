module.exports = function (d1, d2) {
	return {
		getDep1: function () {
			return d1;
		},
		getDep2: function () {
			return d2;
		}
	}
};
module.exports.autowire = {
	name: 'namedFactory',
	dependencies: ['testfile', 'testObject'],
	transient: true,
	groups: ['testGroup']
};