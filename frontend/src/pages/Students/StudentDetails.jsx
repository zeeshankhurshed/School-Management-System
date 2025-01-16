import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useDeleteStudentMutation } from '../../redux/api/student';
import { toast } from 'react-toastify';
import { useDeleteFeeMutation, useGetAllFeesQuery, useUpdateFeeMutation } from '../../redux/api/fee';

const StudentDetails = () => {
  const [isEditingFee, setIsEditingFee] = useState(false);
  const [currentFee, setCurrentFee] = useState(null);

  const openEditModal = (fee) => {
    setCurrentFee(fee);
    setIsEditingFee(true);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { student, className } = location.state || {};

  const { userInfo } = useSelector((state) => state.auth);
  const [deleteStudent, { isLoading: isDeletingStudent }] = useDeleteStudentMutation();
  const { data: feeData, isLoading: isLoadingFee } = useGetAllFeesQuery();
  const [deleteFee, { isLoading: isDeletingFee }] = useDeleteFeeMutation();
  const [updateFee] = useUpdateFeeMutation();

  const [expandedYear, setExpandedYear] = useState(null); // To manage which year's fees are expanded
  const [expandedFee, setExpandedFee] = useState(null); // To manage which fee is expanded

  const toggleYearAccordion = (year) => {
    setExpandedYear(expandedYear === year ? null : year); // Toggle year accordion
  };

  const toggleFeeAccordion = (index) => {
    setExpandedFee(expandedFee === index ? null : index); // Toggle fee accordion
  };

  if (!student) {
    return <div className="text-center py-8">No Student Data Found</div>;
  }

  const handleDeleteStudent = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");

    if (confirmed) {
      try {
        await deleteStudent(student._id).unwrap();
        toast.success('Student deleted successfully');
        navigate('/studentsDashboard/studentsList');
      } catch (error) {
        console.error('Failed to delete student:', error);
        toast.error('Failed to delete the student');
      }
    } else {
      toast.info('Delete action was canceled');
    }
  };

  const handleDeleteFee = async (feeId) => {
    console.log('Attempting to delete fee with ID:', feeId);

    const confirmed = window.confirm('Are you sure you want to delete this fee?');
    if (!confirmed) {
      toast.info('Delete action was canceled');
      return;
    }

    try {
      const response = await deleteFee(feeId).unwrap();
      console.log('Deletion successful:', response);
      toast.success('Fee deleted successfully');
    } catch (error) {
      console.error('Failed to delete fee:', error);
      toast.error('Failed to delete the fee. Please try again.');
    }
  };

  const handleUpdateFee = async (feeId) => {
    if (!currentFee) return;
  
    const { amount, annualCharges, annualChargesPaid, remarks, dueDate } = currentFee;
  
    try {
      // Update the fee data
      const updatedFee = await updateFee({
        id: feeId,
        body: {
          amount: parseFloat(amount), // Ensure it's a number
          annualCharges: parseFloat(annualCharges),
          annualChargesPaid: parseFloat(annualChargesPaid),
          remarks,
          dueDate,
        },
      }).unwrap();
  
      toast.success('Fee updated successfully');
      setIsEditingFee(false); // Close the modal
    } catch (error) {
      console.error('Failed to update fee:', error);
      toast.error('Failed to update the fee. Please try again.');
    }
  };
  

  const groupFeesByYear = (fees) => {
    return fees.reduce((acc, fee) => {
      const { year } = fee;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(fee);
      return acc;
    }, {});
  };

  const studentFees = feeData?.filter(fee => fee.student === student._id); // Filter fees for the specific student
  const groupedFees = studentFees ? groupFeesByYear(studentFees) : {};

  return (
    <section>
      <div className="container mx-auto p-2 flex flex-col">
        <div>
          <img
            src={`${student.photo.replace(/\\/g, '/')}`}
            alt={`${student.fullName}'s Photo`}
            className="w-[15rem] h-[15rem] m-auto rounded-md"
          />
        </div>

        <div className="p-4">
          <h2 className="text-2xl text-center font-bold uppercase">{student.fullName}</h2>

          <div className="flex justify-between my-2">
            <p><span className="font-bold">Gender:</span> {student.gender}</p>
            <p><span className="font-bold">Date Of Birth:</span> {dayjs(student.dateOfBirth).format('DD MMMM YYYY')}</p>
            <p><span className="font-bold">Admission Number:</span> {student.admissionNumber}</p>
          </div>

          <div className="flex justify-between my-2">
            <p><span className="font-bold">Class & Section:</span> {className} - {student.section || 'N/A'}</p>
            <p><span className="font-bold">Roll Number:</span> {student.rollNumber}</p>
            <p><span className="font-bold">Academic Year:</span> {student.academicYear}</p>
          </div>

          <div className="flex justify-between my-2">
            <p><span className="font-bold capitalize">Emergency Contact:</span> {student.emergencyContact.name}</p>
            <p><span className="font-bold">Emergency Phone:</span> {student.emergencyContact.phone}</p>
            <p><span className="font-bold">Relation:</span> {student.emergencyContact.relation}</p>
          </div>

          <div className="flex justify-between my-2">
            <p><span className="font-bold capitalize">Guardian Name:</span> {student.guardianName}</p>
            <p><span className="font-bold">Guardian Number:</span> {student.contactNumber}</p>
            <p><span className="font-bold">Email:</span> {student.email}</p>
            <p><span className="font-bold">Address:</span> {student.address}</p>
          </div>

          <hr className="my-4" />

          <div>
            <h2 className="font-bold text-2xl">Fee Information:</h2>
          </div>

          <div className="my-4">
            {isLoadingFee ? (
              <div>Loading fee data...</div>
            ) : (
              Object.keys(groupedFees).map((year) => (
                <div key={year} className="border-b mb-2">
                  {/* Year Accordion */}
                  <button
                    className="w-full text-left p-2 bg-gray-300 hover:bg-gray-400"
                    onClick={() => toggleYearAccordion(year)}
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold">Year: {year}</span>
                    </div>
                  </button>

                  {expandedYear === year && (
                    <div className="p-4 bg-gray-100">
                      {groupedFees[year].map((fee, feeIndex) => (
                        <div key={fee._id} className="border-b mb-2">
                          {/* Fee Accordion */}
                          <button
                            className="w-full text-left p-2 bg-gray-200 hover:bg-gray-300"
                            onClick={() => toggleFeeAccordion(feeIndex)}
                          >
                            <div className="flex justify-between">
                              <span className="font-semibold">Month: {fee.month}</span>
                              <span className="font-semibold">{fee.status === 'paid' ? 'Paid' : (fee.status === 'partial' ? 'Partially Paid' : 'Unpaid')}</span>
                            </div>
                          </button>

                          {expandedFee === feeIndex && (
                            <div className="p-4 bg-gray-50">
                              <div><strong>Amount:</strong> {fee.amount}</div>
                              <div><strong>Annual Charges:</strong> {fee.annualCharges}</div>
                              <div><strong>Annual Charges Paid:</strong> {fee.annualChargesPaid}</div>
                              <div><strong>Remarks:</strong> {fee.remarks}</div>
                              <div><strong>Due Date:</strong> {dayjs(fee.dueDate).format('DD MMMM YYYY')}</div>
                              {/* <div><strong>Total:</strong> {fee.totalPayable}</div> */}

                              {userInfo.isAdmin &&(
                                <div className="flex justify-between mt-4">
                                <button
                                  onClick={() => openEditModal(fee)}
                                  className="bg-yellow-500 text-white p-2 rounded-md"
                                >
                                  Edit
                                </button>


                                <button
                                  className="bg-red-500 text-white p-2 rounded-md"
                                  onClick={() => handleDeleteFee(fee._id)}
                                >
                                  Delete
                                </button>

                              </div>
                              )}

                              </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <hr className="my-4" />

          <div className="flex justify-around my-3">
            {userInfo.isAdmin && (
              <>
                <Link to={`/studentsDashboard/students/${student._id}/edit`} state={{ student }}>
                  <button className="bg-teal-800 p-3 uppercase rounded-md text-white font-bold">
                    Update
                  </button>
                </Link>

                <Link to={'/adminDashboard/createResult'} state={{ studentId: student._id }}>
                  <button className="bg-indigo-800 p-3 uppercase rounded-md text-white font-bold">
                    Create Result
                  </button>
                </Link>

                <Link to={'/adminDashboard/createFee'} state={{ studentId: student._id }}>
                  <button className="bg-green-800 p-3 uppercase rounded-md text-white font-bold">
                    Create Fee
                  </button>
                </Link>


                <button
                  className="bg-red-800 p-3 uppercase rounded-md text-white font-bold"
                  onClick={handleDeleteStudent}
                  disabled={isDeletingStudent}
                >
                  {isDeletingStudent ? 'Deleting...' : 'Delete'}
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center items-center text-xl">
            <Link to={'/studentsDashboard/studentsList'} className="animate-pulse underline font-bold">
              Go Back to Listing Page
            </Link>
          </div>
        </div>
      </div>

      
      {isEditingFee && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-md">
      <h2>Edit Fee</h2>
      <input
        type="text"
        value={currentFee?.amount}
        onChange={(e) =>
          setCurrentFee({ ...currentFee, amount: e.target.value })
        }
        className="border p-2 mb-2 w-full"
      />
      <div className="flex justify-between">
        <button
          onClick={() => setIsEditingFee(false)}
          className="bg-gray-500 text-white p-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={() => handleUpdateFee(currentFee._id)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default StudentDetails;
