import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateFeeMutation, useGetAllFeesQuery } from "../../redux/api/fee";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
// import { useGetAllStudentsQuery } from "../../redux/api/student";

const CreateFee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentId } = location.state || {};

  //  const { data: students} = useGetAllStudentsQuery();
  const { data: studentFee, isLoading } = useGetAllFeesQuery();
  console.log(studentFee);

  const [createFee, { isLoading: isSubmitting }] = useCreateFeeMutation();

  const [newFee, setNewFee] = useState({
    amount: "",
    annualCharges: "",
    annualChargesPaid: "",
    discount: "",
    fine: "",
    month: "",
    year: "",
    paymentMode: "",
    paymentDate: "",
    dueDate: "",
    remarks: "",
  });

  useEffect(() => {
    if (!studentId) {
      console.error("Missing studentId! Ensure it is passed correctly via Link state.");
      toast.error("Student ID is missing. Please try again.");
      navigate(-1); // Navigate back if studentId is missing
    }
  }, [studentId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) return;

    try {
      const payload = {
        ...newFee,
        student: studentId, // Rename to match the backend field
        grade: "CLASS_ID_HERE", // Replace with the actual grade ID or fetch it dynamically
      };

      // Remove unnecessary fields
      delete payload.remainingAnnualCharges;
      delete payload.totalPayable;

      await createFee(payload).unwrap();
      toast.success("Fee information submitted successfully!");
      navigate(`/studentsDashboard/studentsList`); // Navigate to student detail page
    } catch (error) {
      console.error("Error submitting fee information:", error);
      toast.error("Failed to submit fee information. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-lg">
        <Loader />
      </div>
    );
  }

  return (
    <section className="">
      <div className="w-[75%] mx-6">
        <h2 className="text-center font-bold text-2xl text-gray-800">Fee Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {[{ label: "Amount", name: "amount", type: "number", placeholder: "Monthly Fee..." },
              { label: "Annual Charges", name: "annualCharges", type: "number", placeholder: "Annual Charges..." },
              { label: "Annual Charges Paid", name: "annualChargesPaid", type: "number", placeholder: "Annual Charges Paid..." },
              { label: "Discount", name: "discount", type: "number", placeholder: "Discount..." },
              { label: "Fine", name: "fine", type: "number", placeholder: "Fine..." }].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={newFee[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>
            ))}

            {/* Month */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Month</label>
              <select
                name="month"
                value={newFee.month}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="">Select Month</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="number"
                name="year"
                value={newFee.year}
                onChange={handleChange}
                placeholder="Year..."
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            {/* Payment Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
              <select
                name="paymentMode"
                value={newFee.paymentMode}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="">Select Payment Mode</option>
                <option value="cash">Cash</option>
                <option value="bank transfer">Bank Transfer</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </select>
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Date</label>
              <input
                type="date"
                name="paymentDate"
                value={newFee.paymentDate}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={newFee.dueDate}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            {/* Remarks */}
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700">Remarks</label>
              <textarea
                name="remarks"
                value={newFee.remarks}
                onChange={handleChange}
                placeholder="Add any remarks here..."
                className="w-full mt-1 p-2 border rounded-lg"
                rows="3"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-4 text-center">
              <button
                type="submit"
                className="bg-teal-800 text-white px-4 py-2 rounded-lg mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Fee Information"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateFee;
