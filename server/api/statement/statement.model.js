'use strict';

import mongoose from 'mongoose';

var StatementSchema = new mongoose.Schema({
  // Import fields
  provider: String,
  account: String,
  accountName: String,
  date: Date, 
  infotext: String,
  amount: Number,
  // end import fields
  currency: { type: String,
              default: 'CHF'
  },
  rateChfEth: Number,
  amountChf: Number,
  type: String,
  costType: String,
  incomeType: String,
  processed: Boolean,
  monat: String,
  jahr: String,
  neutralTrans: { type: Boolean,
                  default: false
  },
  comment: String,
  belegsArt: { type: String,
              default: 'Digital'
              }

});

export default mongoose.model('Statement', StatementSchema);
