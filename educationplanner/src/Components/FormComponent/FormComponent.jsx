import React from "react";

function FormComponent({
  data,
  formData,
  setFormData,
  setData,
  isEditing,
  setIsEditing,
  editId,
  setEditId,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (isEditing) {
      const modifiedData = data.map((obj) =>
        obj.id === editId ? { ...formData, id: editId } : obj
      );
      setData(modifiedData);
      setIsEditing(false);
      setEditId(null);
    } else {
      const obj = { ...formData, id: Date.now() };
      setData((prev) => [...prev, obj]);
    }

    setFormData({
      subject: "",
      hour: "",
    });
  }

  return (
    <section className="mt-10 w-full px-6 py-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl shadow-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6 items-stretch"
      >
        <input
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="flex-1 rounded-2xl border border-purple-300 bg-white/60 backdrop-blur-sm p-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition shadow-md"
          type="text"
          placeholder="Enter Subject"
          required
          autoComplete="off"
        />
        <input
          value={formData.hour}
          onChange={(e) =>
            setFormData({ ...formData, hour: e.target.value })
          }
          className="flex-1 rounded-2xl border border-purple-300 bg-white/60 backdrop-blur-sm p-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition shadow-md"
          type="number"
          placeholder="Enter Hours"
          required
          autoComplete="off"
          min={1}
        />
        <input
          className="w-full md:w-auto px-6 py-3 font-semibold rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition shadow-lg cursor-pointer"
          type="submit"
          value={isEditing ? "Update" : "Add"}
        />
      </form>
    </section>
  );
}

export default FormComponent;
