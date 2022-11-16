const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoSchema = new Schema(
{
title: {type: String, required: true},
description: {type: String, required: false,},
author: {type: Schema.Types.ObjectId, ref: 'User'},
dateCreated: {type: String, default: new Date(Date.now()).toLocaleString()},
complete: {type: Boolean, default: false},
dateCompleted: {type: String, default: null},
username: {type: String, default: null}
}
);
//Export model
module.exports = mongoose.model('Todo', TodoSchema);