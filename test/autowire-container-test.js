
var test = require("tape"),
	path = require('path'),
	Sandal = require('sandal'),
	sandal = new Sandal(),
	sandal2 = new Sandal();

test('Autowire should not be available', function (t) {
	t.notOk(sandal.autowire, 'should not have an autowire fcn');
	t.end();
});

test('Autowire folder and add components', function (t) {
	sandal.extend(require('../index.js'))
		.autowire(path.join(__dirname, '../test-components/default'))
		.factory('foo', function (testfile) { return testfile.foo; });
	t.end();
});

test('Autowire should only be applied to the container', function (t) {
	t.notOk(sandal2.autowire, 'should not have an autowire fcn');
	t.end();
});

test('Manual component', function (t) {
	sandal.resolve(function(err, foo) {
		t.notOk(err);
		t.equal(foo, 'bar', 'should autowire and register manual components');
		t.end();
	});
});

test('From sub dir', function (t) {
	sandal.resolve(function(err, testfile) {
		t.notOk(err);
		t.equal(testfile.foo, 'bar');
		t.end();
	});
});

test('Non function', function (t) {
	sandal.resolve(function(err, testObject) {
		t.notOk(err);
		t.equal(testObject, 'testObject');
		t.end();
	});
});

test('Function', function (t) {
	sandal.resolve(function(err, testFactory) {
		t.notOk(err);
		t.equal(testFactory.getData(), 'testFactory data');
		t.end();
	});
});

test('Service', function (t) {
	sandal.resolve(function(err, testService) {
		t.notOk(err);
		t.equal(testService.getData(), 'testService data');
		t.end();
	});
});

test('With autowire data', function (t) {
	sandal.resolve(function(err, namedFactory) {
		t.notOk(err);
		t.equal(namedFactory.getDep1().foo, 'bar');
		t.equal(namedFactory.getDep2(), 'testObject');
		t.end();
	});
});

test('With autowire data transient', function (t) {
	sandal.resolve(function(err, namedFactory) {
		t.notOk(err);
		t.equal(namedFactory.getDep1().foo, 'bar');
		t.equal(namedFactory.getDep2(), 'testObject');
		t.end();
	});
});

test('With autowire data transient', function (t) {
	sandal.resolve(function(err, testGroup) {
		t.notOk(err);
		t.equal(testGroup.namedFactory.getDep1().foo, 'bar');
		t.equal(testGroup.namedFactory.getDep2(), 'testObject');
		t.end();
	});
});

test('With some autowire data', function (t) {
	sandal.resolve(function(err, namedFactory2) {
		t.notOk(err);
		t.equal(namedFactory2.getDep1().foo, 'bar');
		t.equal(namedFactory2.getDep2(), 'testObject');
		t.end();
	});
});

test('Default lifecycle is singleton', function (t) {
	sandal.resolve(function(err, namedFactory2) {
		t.notOk(err);
		t.equal(namedFactory2.getDep1().foo, 'bar');
		t.equal(namedFactory2.getDep2(), 'testObject');
		t.end();
	});
});

test('Ignored components', function (t) {
	sandal.resolve(function(err, ignoredObject) {
		t.ok(err);
		t.notOk(ignoredObject);
		t.end();
	});
});
