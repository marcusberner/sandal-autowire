
var test = require("tape"),
	path = require('path'),
	Sandal = require('sandal'),
	sandal;

test('Extend container', function (t) {
	Sandal.extend(require('../index.js'));
	sandal = new Sandal();
	t.end();
});

test('Autowire folder with default groups', function (t) {
	sandal.autowire(path.join(__dirname, '../test-components/default'), { groups: ['myGroup'] });
	t.end();
});

test('Resolve group', function (t) {
	sandal.resolve(function(err, myGroup) {
		t.notOk(err, 'should not fail');
		t.deepEqual(Object.keys(myGroup), [ 'testFactory', 'namedFactory2', 'testObject', 'testService' ], 'should contain all components from teh default group');
		t.end();
	});
});

test('Cleanup', function (t) {
	delete Sandal.prototype.autowire;
	t.end();
});
