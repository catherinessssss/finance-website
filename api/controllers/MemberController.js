/**
 * MemberController
 *
 * @description :: Server-side logic for managing Members
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req,res) {
		req.session.nav = 7;
        if (req.method == "GET")
            return res.view('member/login');
        else {
            Member.findOne({username:req.body.username})
            .exec(function (err, user) {
                var responseData = {
                    success : true,
                    message : '',
                    data: null
                }
                if (user == null) {
                    responseData.success = false;
                    responseData.message = 'No such user';
                    return res.send(responseData);
                }
                    

                if (req.body.password != user.password) {
                    responseData.success = false;
                    responseData.message = 'Wrong Password';
                    return res.send(responseData);
                }

                responseData.data = user;
                req.session.username = req.body.username;
                req.session.userid = user.id;
                return res.send(responseData);
            });
            
        }
	},
	register: function(req, res) {
        req.session.nav = 7;
        var register = {
            taken: 'none'
        };

        if(req.method === 'GET') {
            return res.view('member/register', {'register': register});
        }

        var username = req.param("username");
        var password = req.param("password");

        Member.findOne({username: username}).exec(function(err, users) {
            if(users) {
                register.taken = 'block';
                return res.view('member/register', {'register': register});        
            }

            Member.create({
                username: username, 
                password: password
            }).exec(function(err, user) {
                if(err) {
                    return res.send(err);
                } else {
                    return res.send('Register Successfully!');
                }
            });
        });
    }
};

