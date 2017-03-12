/**
 * ForeignExchangeController
 *
 * @description :: Server-side logic for managing foreignexchanges
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	buy: (req,res) => {
        Member.findOne({username:req.session.username}).populateAll()
        .exec(function(err, user) {
            if(err) {
                return res.send(err);
            }

            var HKDAccount = [];
            for(var length = user.account.length; length > 0; length--) {
                var item = user.account[length-1];
                if(item.accountType == 'HKD') {
                    HKDAccount.push(item);
                }
            }
            return res.view('exchange/exchange', {'user':user, 'HKDAccount': HKDAccount});
            
        });
    },
    create:(req, res) => {
        if(req.method == 'POST') {
            var exchange = req.body.ForeignExchange;
            ForeignExchange.create(exchange).exec(function(err, data) {
                if(err) {
                    return res.send(err);
                }
                Member.findOne({username:req.session.username}).exec(function(err,user) {
                    if(err) {
                        return res.send(err);
                    }
                    ForeignExchange.findOne({id:data.id}).populateAll().exec(function(err, data1) {
                        if(err) {
                            return res.send(err);
                        }
                        sails.log(data1);
                        return res.view('exchange/present', {'data' : data1, 'user': user});
                    });
                });
                
            });
        }
    },
    confirm:(req, res) => {
        if(req.method === 'GET') {
            ForeignExchange.findOne({id:req.params.id}).populateAll().exec(function(err,data) {
                if(err){
                    return res.send(err);
                }
                console.log(data);
                data.status = 'success';
                data.save();
                Account.findOne({id: data.account[0].id}).exec(function(err, acc) {
                    acc.amount -= data.toHKD;
                    acc.save();
                });
                

                // create account 
                var account = {
                    accountType: data.buyCurrencyType,
                    amount: data.buyAmount,
                    accountNum: Number(data.account[0].accountNum) + 1,
                    customer: req.session.userid
                };
                Account.create(account).exec(function(err, result) {
                    if(err) {
                        return res.send(err);
                    }
                    return res.view('exchange/success');
                });
            });
        }
    }
};

