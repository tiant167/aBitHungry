'use strict';

let Promise = require('bluebird');
let Recipe = require('../db').Recipe;
let Author = require('../db').Author;
let Ingredient = require('../db').Ingredient;

let authorPayload = {
  avatar: 'https://www.google.com.sg/images/nav_logo242_hr.png',
  nickName: 'seedUser',
  sex: 'm'
};

let ingredientPayload = {
  name: 'seedIngredient',
  engName: 'seedIngredient',
  ndbno: '001234',
  nutrition:{
    water: 1.2, //水
    energy: 2.3, // 热量（卡路里）
    protein: 3.4, // 蛋白质
    fat: 4.5, // 脂类
    carbohydrate: 5.6, // 碳水化合物
    fiber: 6.7, // 纤维素
    sodium: 7.8, // 钠
    vc: 8.9, // 维他命 C
    vd: 9, // 维他命 D
    fattyAcids: 10, // 不饱和脂肪酸
    cholesterol: 11.1, // 胆固醇
  }
};

let recipePayload = {
  author: null,
  img: 'https://www.google.com.sg/images/nav_logo242_hr.png',
  recommendImg: 'https://www.google.com.sg/images/nav_logo242_hr.png',
  title: 'seedTitle',
  video: 'https://www.google.com.sg/images/nav_logo242_hr.png',
  introduce: 'seedIntro',
  tips: 'seedTips',
  duration: 20,
  calories: 120,
  labels: [{
    name: 'seedLabel',
    engName: 'seed',
    sort: 'seeds'
  }],
  collectionCount: 0,
  commentCount: 0,
  stateValue: 0,
  components: [],
  procedures: [{
    content: 'first step',
    img: 'https://www.google.com.sg/images/nav_logo242_hr.png'
  }],
  nutrition: {
    water: 10, //水
    energy: 20, // 热量（卡路里）
    protein: 30, // 蛋白质
    fat: 40, // 脂类
    carbohydrate: 30, // 碳水化合物
    fiber: 10, // 纤维素
    sodium: 20, // 钠
    vc: 10, // 维他命 C
    vd: 2.09, // 维他命 D
    fattyAcids: 3.11, // 不饱和脂肪酸
    cholesterol: 23.1, // 胆固醇
  }
};

Promise.join(
  Ingredient.create(ingredientPayload),
  Author.create(authorPayload)
).then(function(resp){
  recipePayload.author = resp[0]._id;
  recipePayload.components.push({
    ingredient: resp[1]._id,
    meta: {
      name: resp[1].name
    },
    amount: 100,
    remark: 'seedRemark'
  });
  return Recipe.create(recipePayload);
}).then(function(){
  console.log('done');
}).catch(console.log).finally(function(){
  process.exit(0);
});

