/**
 * Account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    tableName: 'cm_account',
    accountType: {
         type: 'string',
         enum: ['HKD', 'GBP', 'USD', 'EUR'], // 港币，英镑，美元，欧元
         columnName: 'accountType'
    },
    amount: {
      type: 'float',
      columnName: 'amount'
    },
    accountNum: {
      type: 'string',
      columnName:'accountNum'
    },
    customer: {
        collection: 'Member',
        via:'account'
    },
    swiftRecord: {
      collection: 'SwiftRecord',
      via: 'account'
    },
    foreignRecord: {
      collection: 'ForeignExchange',
      via: 'account'
    }
  }
};

