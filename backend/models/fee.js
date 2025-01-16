import mongoose from 'mongoose';


const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    annualCharges: {
      type: Number,
      required: true,
    },
    annualChargesPaid: {
      type: Number,
      default: 0,
    },
    remainingAnnualCharges: {
      type: Number,
      default: function () {
        return this.annualCharges;
      },
    },
    annualChargesStatus: {
      type: String,
      enum: ['unpaid', 'partially paid', 'fully paid'],
      default: 'unpaid',
    },
    discount: {
      type: Number,
      default: 0,
    },
    fine: {
      type: Number,
      default: 0,
    },
    totalPayable: {
      type: Number,
    },
    month: {
      type: String,
      required: true,
      enum: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
    },
    year: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['unpaid', 'paid', 'partial'],
      default: 'unpaid',
    },
    paymentDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ['cash', 'bank transfer', 'card', 'online'],
      default: 'cash',
    },
    remarks: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre-save hook
feeSchema.pre('save', function (next) {
  this.totalPayable = this.amount + this.annualCharges - this.discount + this.fine;
  this.remainingAnnualCharges = this.annualCharges - this.annualChargesPaid;

  // Check the status of the annual charges
  if (this.annualChargesPaid === this.annualCharges) {
    this.annualChargesStatus = 'fully paid';
    this.status = 'paid';  // Set the overall status to "paid"
  } else if (this.annualChargesPaid > 0 && this.annualChargesPaid < this.annualCharges) {
    this.annualChargesStatus = 'partially paid';
    this.status = 'partial';  // Set the overall status to "partial"
  } else {
    this.annualChargesStatus = 'unpaid';
    this.status = 'unpaid';  // Set the overall status to "unpaid"
  }

  next();
});


const Fee = mongoose.model('Fee', feeSchema);

export default Fee;
