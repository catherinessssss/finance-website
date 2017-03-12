/**
 * SwiftRecordController
 *
 * @description :: Server-side logic for managing Swiftrecords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: (req, res) => {
        if(req.method == 'POST') {
            var swift = req.body.SwiftRecord;
            SwiftRecord.create(swift).exec(function(err, data) {
                if(err) {
                    return res.send(err);
                }
                Member.findOne({username:req.session.username}).exec(function(err,user) {
                    if(err) {
                        return res.send(err);
                    }
                    SwiftRecord.findOne({id:data.id}).populateAll().exec(function(err,data1) {
                        if(err) {
                            return res.send(err);
                        }
                        console.log(data1);
                        return res.view('oversea/proceed', {'data': data1, 'user': user});
                    })
                    
                });
                
            });
        } else {
            Member.findOne({username:req.session.username}).populateAll()
            .exec(function(err, user) {
                if(err) {
                    return res.send(err);
                }
                return res.view('oversea/add', {'user':user});
            });
        }
    },
    confirm: (req, res) => {
        if(req.method == 'GET') {
            SwiftRecord.findOne({id: req.params.id}).populateAll().exec(function(err, data) {
                if(err) {
                    return res.send(err);
                }
                data.status = 'success';
                data.save();
                Account.findOne({id: data.account[0].id}).exec(function(err, account) {
                    account.amount -= data.realTimeAmount;
                    account.save();
                });
                Account.findOne({accountNum: data.feeAccount}).exec(function(err, feeAccount){
                    if(data.expenseWay == 'Both') {
                       feeAccount.amount -= data.feeAmount/2;
                       feeAccount.save(); 
                    }
                });

                return res.view('oversea/success');
            });
        }
    }
};

