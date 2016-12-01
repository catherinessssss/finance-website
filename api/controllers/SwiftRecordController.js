/**
 * SwiftRecordController
 *
 * @description :: Server-side logic for managing Swiftrecords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: (req, res) => {
        Member.findOne({username:req.session.username}).populateAll()
        .exec(function(err, user) {
            if(err) {
                return res.send(err);
            }
            return res.view('oversea/add', {'user':user});
        });
    }
};

