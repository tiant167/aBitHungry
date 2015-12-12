'use strict';

let _ = require('lodash');
let config = require('config');
let mongoose = require('mongoose');
let Promise = require('bluebird');

mongoose.Promise = Promise;

let Schema = mongoose.Schema;
let schemas = {};
let autoIndex = process.env.NODE_ENV !== 'production';

mongoose.connect(config.get('mongodb'), {
  server: {
    poolSize: config.get('mongoPoolSize'),
    socketOptions: {
      keepAlive:config.get('mongoKeeplive'),
      connectTimeoutMS: config.get('mongoConnectionTimeout'),
      socketTimeoutMS: config.get('mongoSocketTimeout')
    },
    auto_reconnect: config.get('mongoAutoReconnect')
  }
});

schemas.Recipe = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  img: String,
  recommendImg: String,
  title: String,
  video: String,
  introduce: String,
  tips: String,
  duration: Number,
  calories: Number,
  labels: [{
    name: String,
    engName: String, // 用户匹配客户端传上来的字符串
    sort: String
  }],
  collectionCount: Number,
  commentCount: Number,
  stateValue: Number,
  components: [{
    ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
    meta: {
      name: String
    },
    amount: Number,
    remark: String
  }],
  procedures: [{
    content: String,
    img: String
  }],
  nutrition: {
    water: Number, //水
    energy: Number, // 热量（卡路里）
    protein: Number, // 蛋白质
    fat: Number, // 脂类
    carbohydrate: Number, // 碳水化合物
    fiber: Number, // 纤维素
    sodium: Number, // 钠
    vc: Number, // 维他命 C
    vd: Number, // 维他命 D
    fattyAcids: Number, // 不饱和脂肪酸
    cholesterol: Number, // 胆固醇
  }
}, {
  autoIndex: autoIndex,
  read: 'secondaryPreferred'
});

schemas.Recipe.index({ 'labels.engName': 1, _id: -1, stateValue: -1 });

schemas.Author = new Schema({
  avatar: String,
  nickName: String,
  sex: String
}, {
  autoIndex: autoIndex,
  read: 'secondaryPreferred'
});

schemas.Ingredient = new Schema({
  name: String,
  engName: String,
  ndbno: String,
  nutrition:{
    water: Number, //水
    energy: Number, // 热量（卡路里）
    protein: Number, // 蛋白质
    fat: Number, // 脂类
    carbohydrate: Number, // 碳水化合物
    fiber: Number, // 纤维素
    sodium: Number, // 钠
    vc: Number, // 维他命 C
    vd: Number, // 维他命 D
    fattyAcids: Number, // 不饱和脂肪酸
    cholesterol: Number, // 胆固醇
  }
}, {
  autoIndex: autoIndex,
  read: 'secondaryPreferred'
});

_.each(schemas, function(v,k) {
  module.exports[k] = mongoose.model(k, v);
});
module.exports.mongoose = mongoose;
