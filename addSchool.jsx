import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, v));
      const res = await fetch("/api/addSchool", { method: "POST", body: formData });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Failed to add");
      alert("School added successfully!");
      reset();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 bg-white p-6 rounded-2xl shadow">
        <div>
          <label className="block text-sm mb-1">School Name</label>
          <input className="w-full p-2 border rounded" {...register("name", { required: "Required" })} placeholder="e.g. Sunrise Public School" />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Address</label>
          <input className="w-full p-2 border rounded" {...register("address", { required: "Required" })} placeholder="Street, Area" />
          {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">City</label>
            <input className="w-full p-2 border rounded" {...register("city", { required: "Required" })} placeholder="City" />
            {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">State</label>
            <input className="w-full p-2 border rounded" {...register("state", { required: "Required" })} placeholder="State" />
            {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Contact Number</label>
            <input className="w-full p-2 border rounded" {...register("contact", { required: "Required", pattern: { value: /^[0-9]{7,15}$/, message: "Digits 7-15" } })} placeholder="e.g. 9876543210" />
            {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full p-2 border rounded" {...register("email_id", { required: "Required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })} placeholder="e.g. info@school.com" />
            {errors.email_id && <p className="text-red-600 text-sm mt-1">{errors.email_id.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">School Image</label>
          <input type="file" accept="image/*" className="w-full" {...register("image", { required: "Image required" })} />
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>}
        </div>
        {error && <p className="text-red-700">{error}</p>}
        <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50">
          {loading ? "Saving..." : "Add School"}
        </button>
      </form>
    </div>
  );
}
