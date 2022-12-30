
var assert = require('assert');
//const { describe, it } = require('node:test');

describe('MyTest', () => {

	it("MyCase", () => {
		assert.ok(true);
	})
})


describe('Array', function () {
	describe('#indexOf()', function () {
		it(' should return -1 when the value is not present', function () {
			assert.equal([1, 2, 3].indexOf(4), -1);
		});
	});
});
class User {
	saveAsync(callback) { return callback(); }
}
describe('User', function () {
	describe('#save()', function () {
		it('should save without error', function (done) {
			var user = new User('Luna');
			user.saveAsync(function (err) {
				if (err) {
					throw err;
				} else {
					setTimeout(function() {
						done();
					  }, 1000);
					 // 只有执行完此函数后，该测试用例算是完成。
				}
			});
		});
	});
});
// antipattern
describe("UnitTest", function () {
	describe('Antipattern', function () {
		it('should complete this test', function (done) {
			return new Promise(function (resolve) {
				assert.ok(true);
				resolve();
			}).then(done());
		});
	})
})

function add(args) {
	return args.reduce((prev, curr) => prev + curr, 0);
}

describe('UnitTest', function () {

	describe('add()', function () {
		const tests = [
			{ args: [1, 2], expected: 3 },
			{ args: [1, 2, 3], expected: 6 },
			{ args: [1, 2, 3, 4], expected: 10 }
		];

		tests.forEach(({ args, expected }) => {
			it(`correctly adds ${args.length} args`, function () {
				const res = add(args);
				assert.strictEqual(res, expected);
			});
		});
	});
});
describe('UnitTest', function () {
	describe('#FlowTest()', function () {
		it('should return -1 unless present', function () {
			console.log(" this test will be run 1");
		});

		it('should return the index when present', function () {
			console.log("  this test will also be run 2");
		});
	});

	describe('#concat()', function () {
		it('should return a new Array', function () {
			console.log("  this test will also be run 3");
		});
	});

	describe('#slice()', function () {
		it('should return a new Array', function () {
			console.log("  this test will not be run 4");
		});
	});
});

describe('api', function () {
	describe('GET /api/users groupA', function () {
	  it('respond with an array of users', function () {
		// ...
	  });
	});
  });
  
  describe('app', function () {
	describe('GET /users groupB', function () {
	  it('respond with an array of users', function () {
		// ...
	  });
	});
  });


var connect = require('mysql');

describe('my API', function () {
  let connection;

  before(async function () {
    connection = await connect({port: process.env.TEST_PORT});
  });

  it('should be a nice API', function () {
    // assertions here
  });

  after(async function () {
    return connection.close();
  });
});