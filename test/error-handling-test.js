
var test = require("tape"),
	path = require('path'),
	Sandal = require('sandal'),
	sandal = new Sandal();

test('Object as factory', function (t) {
	sandal.extend(require('../index.js'));
	var err;
	try {
		sandal.autowire(path.join(__dirname, '../test-components/with-errors/object-as-factory'));
	}
	catch (e) {
		err = e;
	}
	t.ok(err);
	t.end();
});