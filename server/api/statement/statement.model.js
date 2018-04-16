'use strict';

import mongoose from 'mongoose';

var StatementSchema = new mongoose.Schema({
  provider: String,
  date: Date, 
  infotext: String,
  amount: Number,
  type: String,
  costType: String,
  incomeType: String,
  processed: Boolean

});

export default mongoose.model('Statement', StatementSchema);
