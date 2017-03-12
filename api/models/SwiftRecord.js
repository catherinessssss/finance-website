/**
 * SwiftRecord.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    tableName: 'cm_swift',
    country: {
        type: 'string',
        enum: ['HONG KONG'],
        columnName: 'country'
    },
    address: {
        type: 'string',
        columnName: 'address'
    },
    remittanceAmount: {
        type: 'float',
        columnName: 'remittanceAmount'
    },
    account: {
        collection: 'Account',
        via:'swiftRecord'
    },
    realTimeAmount: {
        type: 'float',
        columnName: 'realTimeAmount'
    },
    feeAccount: {
        type: 'string',
        columnName: "feeAccount"
    },
    feeAmount: {
        type: 'float',
        columnName: "feeAmount"
    },
    feeType: {
        type: 'string',
        columnName: "feeType"
    },
    expenseWay: {
        type: 'string',
        enum: ['Second Party', 'Both'],
        columnName: 'expenseWay'
    },
    beneficiaryName: {
        type: 'string',
        columnName: 'beneficiaryName'
    },
    beneficiaryAddress: {
        type: 'string',
        columnName: 'beneficiaryAddress'
    },
    beneficiaryAccount: {
        type: 'string',
        columnName: 'beneficiaryAccount'
    },
    bankswift: {
        type:"string",
        columnName: 'bankswift'
    },
    postscript: {
        type: 'string',
        columnName: 'postscript'
    },
    beneficiaryResidentCountry: {
        type: 'string',
        columnName: 'beneficiaryResidentCountry'
    },
    purposes: {
        type: 'string',
        columnName: 'purposes'
    },
    contactName: {
        type: 'string',
        columnName: 'contactName'
    },
    contactNum: {
        type: 'string',
        columnName: 'contactNum'
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

