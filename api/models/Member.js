/**
 * Member.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    tableName: 'cm_users',
  	username: {
        type: 'string',
        unique: true,
        required: true,
        columnName: 'username'
    },
    password: {
        type: 'string',
        required: true,
        columnName: 'password'
    },
    phone: {
      type: 'string',
      required : true,
      columnName: 'phone'
    },
    identityNo: {
      type: 'string',
      required: true,
      columnName: 'identityNo'
    },
    account: {
      collection: 'Account',
      via: 'customer'
    },
    smsCode: {
        collection: 'SmsCode',
        via: 'customer'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  afterCreate: function(values, next) {
    var accountData = {
      accountType: 'HKD',
      // amount: 0
      // for test
      amount: 10000,
      accountNum: '350001002222222'
    };
    Account.create(accountData).exec(function(err,account) {
      if(!err) {
        account.customer.add(values.id);
        account.save();
      }
      next();
    });
  }
};

