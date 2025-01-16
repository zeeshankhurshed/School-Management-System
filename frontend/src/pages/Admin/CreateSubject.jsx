import { useState } from "react";
import {
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useFetchSubjectsQuery,
  useUpdateSubjectMutation,
} from "../../redux/api/subject";
import { toast } from "react-toastify";
import SubjectList from "../../components/SubjectList";

const CreateSubject = () => {
  const { data: subjects, refetch } = useFetchSubjectsQuery();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [createSubject] = useCreateSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  const resetForm = () => {
    setName("");
    setCategory("");
    setDescription("");
    setEditingId(null);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSubject({ id: editingId, updatedSubject: { name, category, description } }).unwrap();
        toast.success("Subject updated successfully!");
      } else {
        await createSubject({ name, category, description }).unwrap();
        toast.success("Subject created successfully!");
      }
      resetForm();
      refetch();
    } catch (error) {
      toast.error(error.message || "Error creating/updating subject!");
    }
  };

  const handleEdit = (subject) => {
    setName(subject.name);
    setCategory(subject.category);
    setDescription(subject.description);
    setEditingId(subject._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubject(id).unwrap();
      toast.success("Subject deleted successfully!");
      refetch();
    } catch (error) {
      toast.error(error.message || "Error deleting subject!");
    }
  };

  return (
    <div className="ml-4 flex flex-col  gap-6">
      <div className="md:w-3/4 p-3 ">
        <h2 className="h-12 font-bold text-center text-3xl text-gray-700">Manage Subjects</h2>
        <div className="p-3 text-center">
          <form className="space-y-3" onSubmit={handleCreateOrUpdate}>
            {/* <label className="block text-sm font-medium text-gray-700">Subject Name</label> */}
            <input
              type="text"
              className="py-3 px-4 border rounded-lg w-full max-w-[50rem]"
              placeholder="Write Subject name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              className="py-3 px-4 border rounded-lg w-full max-w-[50rem]"
              placeholder="Write category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            /> */}

            {/* <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              className="py-3 px-4 border rounded-lg w-full max-w-[50rem]"
              placeholder="Write Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /> */}

            <div className="flex  justify-center space-x-4">
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                {editingId ? "Update Subject" : "Create Subject"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      <SubjectList subjects={subjects} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default CreateSubject;
