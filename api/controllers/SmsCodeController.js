/**
 * SmsCodeController
 *
 * @description :: Server-side logic for managing Smscodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add : function(req, res) {

        Member.findOne({username:req.param("username")}).populateAll().exec(function(err, users) {
            if(users) {
                var random = Math.floor(Math.random() * 10000);
                // 删除已有的code数据
                if(users.smsCode.length) {
                    for(var length = users.smsCode.length; length > 0; length--) {
                        SmsCode.findOne(users.smsCode[length-1].id).exec(function(err, data){
                            data.destroy(); 
                        });
                    }
                }
                SmsCode.create({
                    createTime: new Date(),
                    code: random,
                    customer: users.id
                }).exec(function(err, data) {
                     if(err) {
                        return res.send(err);
                     }
                     return res.send('Code sent! Your SMSCode is '+ data.code);
                });
            } else {
                return res.send('No Such User');
            }
        });

        
    }
};

