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
            return res.view('exchange/exchange', {'user':user});
        });
    }
};

