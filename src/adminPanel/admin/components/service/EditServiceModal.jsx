import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateService } from "../../../../features/admin/service/serviceApi";
import { getAllTechnologies } from "../../../../features/admin/technology/technologySlice";
import { toast } from "react-toastify";
import Select from "react-select";
import { FaUpload, FaTimes } from "react-icons/fa";
import ManageTechnologiesModal from "./AddTechnologyModal";


 const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
const EditServiceModal = ({ service, onClose }) => {
  const dispatch = useDispatch();
  const { technologies } = useSelector((s) => s.technologies);

  // ---------------- States ----------------
  const [form, setForm] = useState({
    title: service?.title || "",
    description: service?.description || "",
    slug: service?.slug || "",
    heroTitle: service?.heroTitle || "",
    heroDescription: service?.heroDescription || "",
    strategySteps: service?.strategySteps || [],
    servicesOffered: service?.servicesOffered || [],
  });

  const [stepInput, setStepInput] = useState({ title: "", side: "left" });
  const [offeredInput, setOfferedInput] = useState({ title: "", description: "" });
  const [offeredImages, setOfferedImages] = useState([]);
  const [offeredPreviews, setOfferedPreviews] = useState([]);

  const [selectedTech, setSelectedTech] = useState(
    service?.technologies?.map((t) => ({
      value: t._id,
      label: `${t.name} (${t.category})`,
    })) || []
  );

  const [cardImage, setCardImage] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [cardPreview, setCardPreview] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);

  const [showTechModal, setShowTechModal] = useState(false);

  const cardFileRef = useRef();
  const heroFileRef = useRef();

  // ---------------- Effects ----------------
  useEffect(() => {
    dispatch(getAllTechnologies());
  }, [dispatch]);

  useEffect(() => {
    if (service.cardImage) setCardPreview(`${BACKEND_URL}/${service.cardImage}`);
    if (service.heroImage) setHeroPreview(`${BACKEND_URL}/${service.heroImage}`);
    if (service.servicesOffered?.length > 0) {
      const previews = service.servicesOffered.map((s) =>
        s.servicesOfferedImg ? `${BACKEND_URL}/${s.servicesOfferedImg}` : null
      );
      setOfferedPreviews(previews);
      setOfferedImages(new Array(service.servicesOffered.length).fill(null));
    }
  }, [service]);

  // ---------------- Handlers ----------------
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Strategy Steps
  const addStrategyStep = () => {
    if (!stepInput.title.trim()) return;
    setForm({ ...form, strategySteps: [...form.strategySteps, stepInput] });
    setStepInput({ title: "", side: "left" });
  };
  const removeStrategyStep = (i) =>
    setForm({
      ...form,
      strategySteps: form.strategySteps.filter((_, idx) => idx !== i),
    });

  // Services Offered
  const addOffered = () => {
    if (!offeredInput.title.trim()) return;
    setForm({ ...form, servicesOffered: [...form.servicesOffered, offeredInput] });
    setOfferedInput({ title: "", description: "" });
    setOfferedPreviews([...offeredPreviews, null]);
    setOfferedImages([...offeredImages, null]);
  };
  const handleOfferedImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const imgs = [...offeredImages];
    const previews = [...offeredPreviews];
    imgs[index] = file;
    previews[index] = URL.createObjectURL(file);
    setOfferedImages(imgs);
    setOfferedPreviews(previews);
  };
  const removeOffered = (i) => {
    setForm({
      ...form,
      servicesOffered: form.servicesOffered.filter((_, idx) => idx !== i),
    });
    setOfferedImages(offeredImages.filter((_, idx) => idx !== i));
    setOfferedPreviews(offeredPreviews.filter((_, idx) => idx !== i));
  };

  // Images
  const handleCardImage = (e) => {
    const file = e.target.files[0];
    setCardImage(file);
    setCardPreview(file ? URL.createObjectURL(file) : null);
  };
  const handleHeroImage = (e) => {
    const file = e.target.files[0];
    setHeroImage(file);
    setHeroPreview(file ? URL.createObjectURL(file) : null);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("slug", form.slug);

    if (cardImage) fd.append("cardImage", cardImage);
    if (heroImage) fd.append("heroImage", heroImage);

    fd.append("heroTitle", form.heroTitle);
    fd.append("heroDescription", form.heroDescription);

    fd.append("strategySteps", JSON.stringify(form.strategySteps));
    fd.append("servicesOffered", JSON.stringify(form.servicesOffered));

    offeredImages.forEach((img) => img && fd.append("servicesOfferedImages", img));

    fd.append("technologies", JSON.stringify(selectedTech.map((t) => t.value)));

    dispatch(updateService({ id: service._id, formData: fd }))
      .unwrap()
      .then(() => {
        toast.success("Service updated successfully ✅");
        onClose();
      })
      .catch((err) => toast.error("Update failed ❌: " + err));
  };

  // ---------------- JSX ----------------
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full p-6 overflow-y-auto max-h-[90vh] relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Service</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Section */}
          <section>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 mb-2 rounded" placeholder="Title" />
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 mb-2 rounded" placeholder="Description" />
            <input name="slug" value={form.slug} onChange={handleChange} className="w-full border px-3 py-2 mb-2 rounded" placeholder="Slug" />
            {cardPreview && <img src={cardPreview} alt="card" className="h-24 mb-2 rounded border" />}
            <label className="flex items-center gap-2 cursor-pointer bg-blue-50 border px-3 py-2 rounded w-fit">
              <FaUpload /> Change Card Image
              <input ref={cardFileRef} type="file" hidden onChange={handleCardImage} />
            </label>
          </section>

          {/* Hero Section */}
          <section>
            <input name="heroTitle" value={form.heroTitle} onChange={handleChange} className="w-full border px-3 py-2 mb-2 rounded" placeholder="Hero Title" />
            <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} className="w-full border px-3 py-2 mb-2 rounded" placeholder="Hero Description" />
            {heroPreview && <img src={heroPreview} alt="hero" className="h-24 mb-2 rounded border" />}
            <label className="flex items-center gap-2 cursor-pointer bg-blue-50 border px-3 py-2 rounded w-fit">
              <FaUpload /> Change Hero Image
              <input ref={heroFileRef} type="file" hidden onChange={handleHeroImage} />
            </label>
          </section>

          {/* Strategy Steps */}
          <section>
            <h3 className="font-semibold">Strategy Steps</h3>
            <div className="flex gap-2 mb-2">
              <input value={stepInput.title} onChange={(e) => setStepInput({ ...stepInput, title: e.target.value })} placeholder="Step Title" className="border px-3 py-2 rounded flex-1" />
              <select value={stepInput.side} onChange={(e) => setStepInput({ ...stepInput, side: e.target.value })} className="border px-2 rounded">
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
              <button type="button" onClick={addStrategyStep} className="bg-blue-600 text-white px-3 rounded">
                Add
              </button>
            </div>
            <ul>
              {form.strategySteps.map((s, i) => (
                <li key={i} className="flex justify-between items-center border p-2 rounded mb-1">
                  {s.title} ({s.side})
                  <button type="button" onClick={() => removeStrategyStep(i)} className="text-red-500">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Services Offered */}
          <section>
            <h3 className="font-semibold">Services Offered</h3>
            {form.servicesOffered.map((s, i) => (
              <div key={i} className="border rounded p-3 mb-2">
                <strong>{s.title}</strong>
                <p>{s.description}</p>
                {offeredPreviews[i] && <img src={offeredPreviews[i]} alt="offered preview" className="h-20 my-2 rounded border" />}
                <label className="flex items-center cursor-pointer gap-2 bg-blue-50 border px-2 py-1 rounded w-fit">
                  <FaUpload /> Change Image
                  <input type="file" hidden onChange={(e) => handleOfferedImage(e, i)} />
                </label>
                <button type="button" onClick={() => removeOffered(i)} className="ml-4 text-red-500">
                  Remove
                </button>
              </div>
            ))}
            <div className="space-y-2 border p-2 rounded">
              <input value={offeredInput.title} onChange={(e) => setOfferedInput({ ...offeredInput, title: e.target.value })} placeholder="Offered Title" className="w-full border px-2 py-1 rounded" />
              <textarea value={offeredInput.description} onChange={(e) => setOfferedInput({ ...offeredInput, description: e.target.value })} placeholder="Offered Description" className="w-full border px-2 py-1 rounded" />
              <button type="button" onClick={addOffered} className="bg-blue-600 text-white px-3 py-1 rounded">Add Offered Card</button>
            </div>
          </section>

          {/* Technologies */}
          <section>
            <h3 className="font-semibold">Technologies</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Select
                  isMulti
                  options={technologies.map((t) => ({
                    value: t._id,
                    label: `${t.name} (${t.category})`,
                  }))}
                  value={selectedTech}
                  onChange={setSelectedTech}
                  placeholder="Select technologies..."
                />
              </div>
              <button
                type="button"
                onClick={() => setShowTechModal(true)}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Manage
              </button>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t pt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>

      {/* Technology Modal */}
      {showTechModal && (
        <ManageTechnologiesModal
          onClose={() => {
            setShowTechModal(false);
            dispatch(getAllTechnologies()); // 🔥 refresh tech after closing modal
          }}
        />
      )}
    </div>
  );
};

export default EditServiceModal;