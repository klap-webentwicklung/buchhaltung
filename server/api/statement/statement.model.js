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
  amountEth: Number,
  amountEur: Number,
  currency: { type: String,
              default: 'CHF'
  },
  rate: Number,
  // amountChf: Number, -> amount
  type: String,
  costType: String,
  incomeType: String,
  processed: Boolean,
  monat: String,
  jahr: String,
  tag: String,
  neutralTrans: { type: Boolean,
                  default: false
  },
  comment: String,
  belegsArt: { type: String,
              default: 'Digital'
              },
  refId: String

});

export default mongoose.model('Statement', StatementSchema);
