import { asyncHandler } from "../middleware/asyncHandler.js";
import Fee from "../models/fee.js";

export const createFee = async (req, res) => {
    try {
      const { student, grade, amount, annualCharges, annualChargesPaid, discount, fine, month, year, dueDate, remarks } = req.body;
  
      if (!student || !grade || !amount || !month || !year || !dueDate) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }
  
      // Check if a fee record for the same month and year already exists
      const existingFee = await Fee.findOne({ student, month, year });
      if (existingFee) {
        return res.status(400).json({
          message: `Fee for ${month} ${year} has already been submitted for this student.`,
        });
      }
  
      // Create the fee record
      const fee = new Fee({
        student,
        grade,
        amount,
        annualCharges: annualCharges || 0,
        annualChargesPaid: annualChargesPaid || 0, // Set the paid amount correctly
        discount: discount || 0,
        fine: fine || 0,
        month,
        year,
        dueDate,
        remarks: remarks || '',
      });
  
      const savedFee = await fee.save();
      res.status(201).json({
        message: 'Fee record created successfully',
        data: savedFee,
      });
    } catch (error) {
      console.error('Error creating fee:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

export const getAllFees=asyncHandler(async(req,res)=>{
    try {
        const fees=await Fee.find();
        res.json(fees);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

export const getSpecificStudentFee=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params;
        const specificStudentFee=await Fee.findById(id);
        if(!specificStudentFee){
            return res.status(404).json({message:"Fee not found"});
        }
        res.json(specificStudentFee);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})



export const updateFee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFee = await Fee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFee) {
      return res.status(404).json({ message: 'Fee not found' });
    }

    // Save the document to trigger the pre-save hook
    await updatedFee.save();

    res.json(updatedFee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export const deleteFee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFee = await Fee.findByIdAndDelete(id);

    if (!deletedFee) {
      return res.status(404).json({ message: 'Fee not found' });
    }

    res.status(200).json({ message: 'Fee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
