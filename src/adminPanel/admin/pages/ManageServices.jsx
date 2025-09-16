import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { createService } from "../../../features/admin/service/serviceApi";
import { clearMessages } from "../../../features/admin/service/serviceSlice";
import { getAllTechnologies } from "../../../features/admin/technology/technologySlice"; // <-- your tech slice

import ManageTechnologiesModal from "../components/service/AddTechnologyModal";
import { FaUpload } from "react-icons/fa"; // upload icon

const AdminServicePage = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((s) => s.services);
  const { technologies } = useSelector((s) => s.technologies);

  // ---------------- Form States ----------------
  const [cardInfo, setCardInfo] = useState({
    title: "",
    description: "",
    slug: "",
  });
  const [cardImage, setCardImage] = useState(null);
  const [cardImagePreview, setCardImagePreview] = useState(null);

  const [hero, setHero] = useState({ heroTitle: "", heroDescription: "" });
  const [heroImage, setHeroImage] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState(null);

  const [strategySteps, setStrategySteps] = useState([]);
  const [stepInput, setStepInput] = useState({ title: "", side: "left" });

  const [servicesOffered, setServicesOffered] = useState([]);
  const [offeredInput, setOfferedInput] = useState({
    title: "",
    description: "",
  });
  const [offeredImages, setOfferedImages] = useState([]);
  const [offeredPreviews, setOfferedPreviews] = useState([]);

  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // File refs for resetting file input
  const cardFileRef = useRef();
  const heroFileRef = useRef();

  useEffect(() => {
    dispatch(getAllTechnologies());
  }, [dispatch]);

  // ---------------- HANDLERS ----------------
  const handleCardChange = (e) =>
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  const handleHeroChange = (e) =>
    setHero({ ...hero, [e.target.name]: e.target.value });

  const handleCardImage = (e) => {
    const file = e.target.files[0];
    setCardImage(file);
    setCardImagePreview(file ? URL.createObjectURL(file) : null);
  };
  const handleHeroImage = (e) => {
    const file = e.target.files[0];
    setHeroImage(file);
    setHeroImagePreview(file ? URL.createObjectURL(file) : null);
  };

  // Strategy steps
  const addStrategyStep = () => {
    if (!stepInput.title.trim()) return;
    setStrategySteps([...strategySteps, stepInput]);
    setStepInput({ title: "", side: "left" });
  };
  const removeStrategyStep = (i) =>
    setStrategySteps(strategySteps.filter((_, idx) => idx !== i));

  // Services Offered
  const addOffered = () => {
    if (!offeredInput.title.trim()) return;
    setServicesOffered([...servicesOffered, offeredInput]);
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
    setServicesOffered(servicesOffered.filter((_, idx) => idx !== i));
    setOfferedImages(offeredImages.filter((_, idx) => idx !== i));
    setOfferedPreviews(offeredPreviews.filter((_, idx) => idx !== i));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", cardInfo.title);
    formData.append("description", cardInfo.description);
    formData.append("slug", cardInfo.slug);
    if (cardImage) formData.append("cardImage", cardImage);

    formData.append("heroTitle", hero.heroTitle);
    formData.append("heroDescription", hero.heroDescription);
    if (heroImage) formData.append("heroImage", heroImage);

    formData.append("strategySteps", JSON.stringify(strategySteps));
    formData.append("servicesOffered", JSON.stringify(servicesOffered));

    offeredImages.forEach((img) => {
      if (img) formData.append("servicesOfferedImages", img);
    });

    const techIds = selectedTechnologies.map((t) => t.value);
    formData.append("technologies", JSON.stringify(techIds));

    dispatch(createService(formData));
  };

  // Success/Error Toast + Reset form
  useEffect(() => {
    if (success) {
      toast.success(success);
      resetForm();
      dispatch(clearMessages());
    } else if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [success, error, dispatch]);

  // Reset
  const resetForm = () => {
    setCardInfo({ title: "", description: "", slug: "" });
    setCardImage(null);
    setCardImagePreview(null);
    setHero({ heroTitle: "", heroDescription: "" });
    setHeroImage(null);
    setHeroImagePreview(null);
    setStrategySteps([]);
    setStepInput({ title: "", side: "left" });
    setServicesOffered([]);
    setOfferedInput({ title: "", description: "" });
    setOfferedImages([]);
    setOfferedPreviews([]);
    setSelectedTechnologies([]);

    if (cardFileRef.current) cardFileRef.current.value = "";
    if (heroFileRef.current) heroFileRef.current.value = "";
  };

  // ---------------- JSX ----------------
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
     
<div className="flex items-center justify-between mb-6">
  {/* Left Side Heading */}
  <h1 className="text-3xl font-bold">Admin – Add New Service</h1>

  {/* Right Side Button as Link */}
  <Link
    to="/admin/all-services"
    className="bg-[#03286d] text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition"
  >
    Back
  </Link>
</div>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white shadow rounded-lg p-6"
      >
        {/* Card Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Card Section</h2>
          <input
            name="title"
            value={cardInfo.title}
            onChange={handleCardChange}
            placeholder="Card Title"
            className="w-full border px-3 py-2 mb-2 rounded"
          />
          <textarea
            name="description"
            value={cardInfo.description}
            onChange={handleCardChange}
            placeholder="Card Description"
            className="w-full border px-3 py-2 mb-2 rounded"
          />
          <input
            name="slug"
            value={cardInfo.slug}
            onChange={handleCardChange}
            placeholder="Slug (unique)"
            className="w-full border px-3 py-2 mb-2 rounded"
          />

          <div className="mt-2">
            <label className="flex items-center gap-2 cursor-pointer bg-blue-50 border px-3 py-2 rounded w-fit">
              <FaUpload className="text-blue-600" />
              <span>Choose Card Image</span>
              <input
                ref={cardFileRef}
                type="file"
                onChange={handleCardImage}
                className="hidden"
              />
            </label>
            {cardImagePreview && (
              <img
                src={cardImagePreview}
                alt="card preview"
                className="mt-2 h-32 rounded border"
              />
            )}
          </div>
        </section>

        {/* Hero Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Hero Section</h2>
          <input
            name="heroTitle"
            value={hero.heroTitle}
            onChange={handleHeroChange}
            placeholder="Hero Title"
            className="w-full border px-3 py-2 mb-2 rounded"
          />
          <textarea
            name="heroDescription"
            value={hero.heroDescription}
            onChange={handleHeroChange}
            placeholder="Hero Description"
            className="w-full border px-3 py-2 mb-2 rounded"
          />

          <div className="mt-2">
            <label className="flex items-center gap-2 cursor-pointer bg-blue-50 border px-3 py-2 rounded w-fit">
              <FaUpload className="text-blue-600" />
              <span>Choose Hero Image</span>
              <input
                ref={heroFileRef}
                type="file"
                onChange={handleHeroImage}
                className="hidden"
              />
            </label>
            {heroImagePreview && (
              <img
                src={heroImagePreview}
                alt="hero preview"
                className="mt-2 h-40 rounded border"
              />
            )}
          </div>
        </section>

        {/* Strategy Steps */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Strategy Steps</h2>
          <div className="flex gap-2 mb-3">
            <input
              value={stepInput.title}
              onChange={(e) =>
                setStepInput({ ...stepInput, title: e.target.value })
              }
              placeholder="Step Title"
              className="border px-3 py-2 rounded flex-1"
            />
            <select
              value={stepInput.side}
              onChange={(e) =>
                setStepInput({ ...stepInput, side: e.target.value })
              }
              className="border rounded px-3"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
            <button
              type="button"
              onClick={addStrategyStep}
              className="bg-[#03286d] text-white px-3 rounded"
            >
              Add
            </button>
          </div>
          <ul className="space-y-1">
            {strategySteps.map((s, i) => (
              <li
                key={i}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {s.title} ({s.side})
                </span>
                <button
                  type="button"
                  onClick={() => removeStrategyStep(i)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Services Offered */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Services Offered</h2>
          {servicesOffered.map((s, i) => (
            <div key={i} className="border rounded p-3 mb-3">
              <div>
                <strong>{s.title}</strong>
                <p className="text-sm">{s.description}</p>
                {offeredPreviews[i] && (
                  <img
                    src={offeredPreviews[i]}
                    alt="offered preview"
                    className="mt-2 h-24 rounded border"
                  />
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer bg-blue-50 border px-3 py-1.5 rounded w-fit">
                  <FaUpload className="text-blue-600" />
                  <span>Choose Image</span>
                  <input
                    type="file"
                    onChange={(e) => handleOfferedImage(e, i)}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeOffered(i)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add new offered */}
          <div className="space-y-2 border rounded p-3">
            <input
              value={offeredInput.title}
              onChange={(e) =>
                setOfferedInput({ ...offeredInput, title: e.target.value })
              }
              placeholder="Offered Title"
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              value={offeredInput.description}
              onChange={(e) =>
                setOfferedInput({
                  ...offeredInput,
                  description: e.target.value,
                })
              }
              placeholder="Offered Description"
              className="w-full border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={addOffered}
              className="px-4 py-2 bg-[#03286d] text-white rounded"
            >
              Add Offered Card
            </button>
          </div>
        </section>

        {/* Technologies */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Technologies</h2>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Select
                isMulti
                options={technologies.map((t) => ({
                  value: t._id,
                  label: `${t.name} (${t.category})`,
                }))} // 👈 show category too
                value={selectedTechnologies}
                onChange={setSelectedTechnologies}
                placeholder="Select technologies..."
              />
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-3 py-2 bg-[#03286d] text-white rounded"
            >
              Manage
            </button>
          </div>
        </section>
        <div className="flex items-center justify-center">

        <button
          type="submit"
          disabled={loading}
          className=" px-4 py-2 bg-[#03286d] text-white rounded-lg hover:bg-blue-900 font-semibold text-lg"
        >
          {loading ? "Saving..." : "Save Service"}
        </button>
        </div>
      </form>

      {showModal && (
        <ManageTechnologiesModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default AdminServicePage;
