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
  processed: Boolean,
  monat: String,
  jahr: String,
  neutralTrans: { type: Boolean,
                  default: false
  }

});

export default mongoose.model('Statement', StatementSchema);
