/**
 * ForeignExchange.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    tableName: 'cm_foreignExchange',
    account: {
        collection: 'Account',
        via:'foreignRecord'
    },
    contactNum: {
        type:'string',
        columnName: 'contactNum'
    },
    buyCurrencyType: {
        type: 'string',
        enum: ['HKD', 'GBP', 'USD', 'EUR'], // 港币，英镑，美元，欧元
        columnName:'buyCurrencyType'
    },
    buyAmount: {
        type: 'float',
        columnName: 'buyAmount'
    },
    toUSD: {
        type: 'float',
        columnName: 'toUSD'
    },
    toHKD: {
        type: 'float',
        columnName: 'toHKD'
    },
    rate: {
        type: 'float',
        columnName: 'rate'
    },
    useFor: {
        type: 'string',
        columnName: 'useFor'
    },
    status: {
        type: 'string',
        enum: ['proceed', 'success'],
        defaultsTo: function() {
            return 'proceed';
        }
    }
  }
};

