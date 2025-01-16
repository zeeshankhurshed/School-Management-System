import { useState } from "react";
import { useCreateClassMutation, useDeleteClassMutation, useFetchClassesQuery, useUpdateClassMutation } from "../../redux/api/classes";
import { toast } from "react-toastify";

const ClassesList = () => {
  const { data: classes, refetch } = useFetchClassesQuery();

  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createClass] = useCreateClassMutation();
  const [updateClass] = useUpdateClassMutation();
  const [deleteClass] = useDeleteClassMutation();

  // Create a new class
  const handleCreateClass = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Class name is required");
      return;
    }

    try {
      await createClass({ name }).unwrap();
      setName("");
      toast.success("Class created successfully");
      refetch();
    } catch (error) {
      console.error("Create class error:", error);
      toast.error("Creating class failed, try again");
    }
  };

  // Update an existing class
  const handleUpdateClass = async (e) => {
    e.preventDefault();

    if (!updatingName.trim()) {
      toast.error("Class name is required");
      return;
    }

    try {
      // Call the updateClass mutation
      await updateClass({
        id: selectedClass._id,
        updatedClass: { name: updatingName },
      }).unwrap();

      toast.success("Class updated successfully");
      setModalVisible(false); // Close the modal
      refetch(); // Refresh the list of classes
    } catch (error) {
      console.error("Error updating class:", error);
      toast.error(error.data?.error || "Failed to update class.");
    }
  };


  // Delete a class
  const handleDeleteClass = async () => {
    if (!selectedClass) return;

    try {
      await deleteClass(selectedClass._id).unwrap();
      setModalVisible(false);
      toast.success("Class deleted successfully");
      refetch();
    } catch (error) {
      console.error("Delete class error:", error);
      toast.error("Deleting class failed, try again");
    }
  };

  return (
    <div className="ml-40 flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h2 className="h-12 font-bold text-center text-3xl">Manage Classes</h2>
        <div className="p-3">
          <form onSubmit={handleCreateClass} className="space-y-3">
            <label htmlFor="className" className="block text-sm font-medium text-gray-700">
              Class Name
            </label>
            <input
              id="className"
              type="text"
              placeholder="Write class name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-3 px-4 border rounded-lg w-full max-w-[50rem]"
            />
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>

          <hr className="my-6" />

          <div className="flex flex-wrap mt-4">
            {Array.isArray(classes?.all) ? (
              classes.all.map((classItem) => (
                <button
                  key={classItem._id}
                  className="bg-teal-900 border border-teal-500 text-white py-2 px-4 rounded-lg m-3 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 cursor-pointer"
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedClass(classItem);
                    setUpdatingName(classItem.name);
                  }}
                >
                  {classItem.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No classes available</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">{selectedClass ? "Update Class" : "Create Class"}</h3>
            <form onSubmit={selectedClass ? handleUpdateClass : handleCreateClass} className="space-y-3">
              <label htmlFor="modalClassName" className="block text-sm font-medium text-gray-700">
                Class Name
              </label>
              <input
                id="className"
                type="text"
                placeholder="Write class name"
                value={updatingName}
                onChange={(e) => setUpdatingName(e.target.value)}
                className="py-3 px-4 border rounded-lg w-full max-w-[50rem]"
              />

              <div className="flex justify-end space-x-2">
                {selectedClass && (
                  <button
                    type="button"
                    onClick={handleDeleteClass}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600"
                >
                  {selectedClass ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesList;
