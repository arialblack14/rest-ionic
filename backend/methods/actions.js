var User = require('../model/user');
// var Session = require('../model/session');
var config = require('../config/database');
var jwt = require('jwt-simple');

var functions = {
	authenticate: function(req, res) {
		User.findOne({
			name: req.body.name
		}, function(err, user) {
			if (err)  throw err;

			if (!user) {
				res.status(403).send({success: false, msg: 'Authenticate failed, User not found'})
			} else {
				user.comparePassword(req.body.password, function(err, isMatch) {
					if (isMatch && !err) {
						var token = jwt.encode(user, config.secret);
						res.json({success: true, token: token});
					} else {
						res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
					}
				})
			}
		})
	},
	addNew: function(req, res) {
		if (!req.body.name || (!req.body.password)) {
			res.json({success: false, msg: 'Enter all values'});
		} else {
			var newUser = User({
				name: req.body.name,
				password: req.body.password
			});

			newUser.save(function(err, newUser) {
				if (err) {
					res.json({success: false, msg: 'Failed to save'});
				} else {
					res.json({success: true, msg: 'Successfully saved'});
				}
			})
		}
	},
	getinfo: function(req, res) {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			var token = req.headers.authorization.split(' ')[1];
			var decodedtoken =jwt.decode(token, config.secret);
			return res.json({success: true, msg: 'Hello, ' + decodedtoken.name});
		} else {
			return res.json({success: false, msg: 'No header'});
		}
	}
}

module.exports = functions;