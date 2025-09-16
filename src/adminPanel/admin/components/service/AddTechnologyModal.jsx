import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";
import { XMarkIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import {
  getAllTechnologies,
  createNewTechnology,
  deleteTechnology,
} from "../../../../features/admin/technology/technologySlice";
import {
  availableIconsList,
  availableColors,
  availableTechSuggestions,
  DynamicIcon,
} from "./iconLibrary";

const categoryOptions = [
  { value: "firstRow", label: "First Row" },
  { value: "secondRow", label: "Second Row" },
];

// --- MAIN MODAL COMPONENT ---
const ManageTechnologiesModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { technologies, status: techStatus } = useSelector(
    (state) => state.technologies
  );
  const [isAdding, setIsAdding] = useState(false);

  // 👇 new state for delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    dispatch(deleteTechnology(deleteTarget._id))
      .unwrap()
      .then((res) => {
        toast.success(res.message || `Deleted "${deleteTarget.name}"`);
        setDeleteTarget(null);
      })
      .catch((err) => {
        toast.error(err.message || "Delete failed");
        setDeleteTarget(null);
      });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800">Manage Technologies</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Technology list */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-64">
          {techStatus === "loading" && <p>Loading...</p>}
          {technologies.map((tech) => (
            <div
              key={tech._id}
              className="group flex items-center justify-between p-2 border rounded-md hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <DynamicIcon
                  iconName={tech.iconString}
                  className={`w-6 h-6 ${tech.colorClass}`}
                />
                <span className="font-medium text-slate-700">{tech.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100">
                  {tech.category}
                </span>
              </div>
              <button
                onClick={() => setDeleteTarget(tech)} // 👈 open modal
                className="p-1 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add new button OR form */}
        <div className="mt-4 pt-4 border-t">
          {isAdding ? (
            <AddTechnologyForm onCancel={() => setIsAdding(false)} />
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              <PlusIcon className="w-5 h-5" /> Add New Technology
            </button>
          )}
        </div>
      </div>

      {/* 👇 Delete Confirmation Modal */}
      {deleteTarget && (
        <ConfirmDeleteModal
          technology={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

// --- Delete Confirm Modal ---
const ConfirmDeleteModal = ({ technology, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Technology?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete <span className="font-bold">{technology.name}</span>? 
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Add Technology Form (same as before) ---
const AddTechnologyForm = ({ onCancel }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.technologies);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      name: data.name.label,
      category: data.category,
    };
    dispatch(createNewTechnology(payload))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Technology created!");
        onCancel();
      })
      .catch((err) => toast.error(err?.message || "Create failed"));
  };

  const customSelectStyles = {
    option: (p) => ({
      ...p,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    control: (p) => ({ ...p, minHeight: "42px" }),
  };

  return (
  <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-slate-50 p-4 rounded-md"
    >
      <h3 className="font-semibold text-slate-800">New Technology Details</h3>
      <div>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={availableTechSuggestions}
              styles={customSelectStyles}
              placeholder="Select a technology name..."
              onChange={(opt) => {
                field.onChange(opt);
                setValue("iconString", opt.iconString, {
                  shouldValidate: true,
                });
              }}
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Add CATEGORY field */}
      <div>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={categoryOptions}
              placeholder="Select category (row)"
              value={
                categoryOptions.find((opt) => opt.value === field.value) || null
              }
              onChange={(opt) => field.onChange(opt.value)}
            />
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Controller
            name="iconString"
            control={control}
            rules={{ required: "Icon is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={availableIconsList}
                styles={customSelectStyles}
                formatOptionLabel={({ label, Icon }) => (
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" /> <span>{label}</span>
                  </div>
                )}
                placeholder="Select an icon..."
                onChange={(opt) => field.onChange(opt.value)}
                value={
                  availableIconsList.find((opt) => opt.value === field.value) ||
                  null
                }
              />
            )}
          />
          {errors.iconString && (
            <p className="text-red-500 text-xs mt-1">
              {errors.iconString.message}
            </p>
          )}
        </div>
        <div>
          <Controller
            name="colorClass"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={availableColors}
                styles={customSelectStyles}
                getOptionValue={(opt) => opt.class}
                getOptionLabel={(opt) => opt.name}
                formatOptionLabel={({ name, class: c }) => (
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full ${c.replace(
                        "text-",
                        "bg-"
                      )}`}
                    />{" "}
                    <span>{name}</span>
                  </div>
                )}
                placeholder="Select a color..."
                onChange={(opt) => field.onChange(opt.class)}
                value={
                  availableColors.find((opt) => opt.class === field.value) ||
                  null
                }
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded-md border text-sm font-semibold hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-3 py-1.5 rounded-md bg-[#03286d] text-white text-sm font-semibold hover:bg-blue-900 disabled:bg-slate-400"
        >
          {status === "loading" ? "Saving..." : "Save Technology"}
        </button>
      </div>
    </form>
  );
};

export default ManageTechnologiesModal;