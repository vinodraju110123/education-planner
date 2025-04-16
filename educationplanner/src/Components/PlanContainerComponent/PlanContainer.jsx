import React from "react";
import { IoIosAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function PlanContainer({
  data,
  setData,
  setFormData,
  setIsEditing,
  setEditId,
}) {
  function handleEvent(task, id) {
    if (task === "+" || task === "-") {
      const modifiedData = data.map((obj) =>
        obj.id === id
          ? {
              ...obj,
              hour:
                task === "+"
                  ? Number(obj.hour) + 1
                  : Math.max(0, Number(obj.hour) - 1),
            }
          : obj
      );
      setData(modifiedData);
    }

    if (task === "delete") {
      const modifiedData = data.filter((obj) => obj.id !== id);
      setData(modifiedData);
    }

    if (task === "edit") {
      const obj = data.find((obj) => obj.id === id);
      setFormData({
        subject: obj.subject,
        hour: obj.hour,
      });
      setEditId(obj.id);
      setIsEditing(true);
    }
  }

  return (
    data.length > 0 && (
      <section className="bg-white mt-16 w-full px-4 py-6 rounded-2xl shadow-lg flex flex-col gap-5">
        {data.map((obj) => (
          <div
            key={obj.id}
            className="w-full max-w-3xl border border-gray-200 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl shadow-sm bg-gray-50"
          >
            <div className="text-left w-full md:w-auto flex flex-col md:flex-row md:gap-8 text-gray-800 font-semibold">
              <span className="text-lg">{obj.subject}</span>
              <span className="text-green-600">{obj.hour} Hours</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEvent("+", obj.id)}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition"
                title="Increase"
              >
                <IoIosAdd size={20} />
              </button>
              <button
                onClick={() => handleEvent("-", obj.id)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-full transition"
                title="Decrease"
              >
                <GrFormSubtract size={20} />
              </button>
              <button
                onClick={() => handleEvent("edit", obj.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
                title="Edit"
              >
                <FaEdit size={16} />
              </button>
              <button
                onClick={() => handleEvent("delete", obj.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                title="Delete"
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        ))}
      </section>
    )
  );
}

export default PlanContainer;
