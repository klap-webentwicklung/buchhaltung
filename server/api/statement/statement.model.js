'use strict';

import mongoose from 'mongoose';

var StatementSchema = new mongoose.Schema({
  // name: String,
  // info: String,
  // active: Boolean,
  provider: String,
  date: Date, 
  infotext: String,
  amount: Number,

});

export default mongoose.model('Statement', StatementSchema);
