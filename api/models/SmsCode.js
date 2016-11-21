/**
 * SmsCode.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    customer: {
        collection: 'Member',
        via: 'smsCode'
    },
    createTime: {
        type: 'datetime',
        columnName: 'createTime'
    },
    code: {
        type: 'string',
        columnName: 'code'
    },
    expireTime: {
        type: 'datetime',
        columnName: 'expireTime',
        defaultsTo: function() {
            return new Date(new Date(this.createTime).getTime() + 60 * 1000);
        }
    },
    vertifyCode: function(values) {
        return !!(values === this.code);
    },
    checkExpire: function(values) {
        var timestamp = new Date().getTime();
        return timestamp <= new Date(this.expireTime).getTime();
    }
  }

};

