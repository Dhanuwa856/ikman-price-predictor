"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    make: "Toyota",
    model: "Passo",
    location: "Gampaha",
    year: 2018,
    mileage: 65000,
    gear: "Automatic",
    fuel_type: "Petrol",
    engine_cc: 1000,
    condition: "Registered (Used)",
  });

  const [predictedPrice, setPredictedPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["year", "mileage", "engine_cc"].includes(name)
        ? Number(value)
        : value,
    });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPredictedPrice(null);
    setError(null); // Clear any previous errors

    // Fetch the URL from the .env file, with a fallback for local testing
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/predict";

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPredictedPrice(data.formatted_price);
      } else {
        // Trigger the red error UI box
        setError(data.detail || "Failed to calculate price. Please check your inputs.");
      }
    } catch (err) {
      // Catch network errors (e.g., server offline, CORS issue)
      setError("Error connecting to the prediction server. Please ensure the backend is running.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/30 transition-all">

        {/* Header with Logo */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8 border-b border-gray-200/60 pb-5 sm:pb-6">
          <div className="flex-shrink-0 animate-pulse">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 sm:w-12 sm:h-12"
            >
              <rect width="48" height="48" rx="12" fill="url(#logoGrad)" />
              <path
                d="M24 10C16.268 10 10 15.582 10 22.5c0 4.352 2.392 8.182 6 10.5v3c0 .828.672 1.5 1.5 1.5h13c.828 0 1.5-.672 1.5-1.5v-3c3.608-2.318 6-6.148 6-10.5C38 15.582 31.732 10 24 10z"
                fill="white"
                opacity="0.2"
              />
              <path
                d="M24 14c-5.523 0-10 4.03-10 9 0 3.27 1.694 6.17 4.25 7.93V33c0 .552.448 1 1 1h9.5c.552 0 1-.448 1-1v-2.07C32.306 29.17 34 26.27 34 23c0-4.97-4.477-9-10-9z"
                fill="white"
                opacity="0.3"
              />
              <circle cx="24" cy="24" r="6" fill="white" opacity="0.5" />
              <circle cx="24" cy="24" r="3" fill="white" />
              <path
                d="M24 6v2M24 40v2M6 24h2M40 24h2M10.93 10.93l1.414 1.414M35.657 35.657l1.414 1.414M10.93 37.07l1.414-1.414M35.657 12.343l1.414-1.414"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
              />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              🇱🇰 Vehicle Price Predictor
            </h1>
            <p className="text-sm text-gray-500 font-medium -mt-0.5">
              Sri Lanka Market Estimator
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Make */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Make <span className="text-gray-400 font-normal">(Brand)</span>
              </label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:bg-white transition"
                required
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:bg-white transition"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:bg-white transition"
                required
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:bg-white transition"
                required
              />
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Mileage <span className="text-gray-400 font-normal">(km)</span>
              </label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:bg-white transition"
                required
              />
            </div>

            {/* Engine CC */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Engine <span className="text-gray-400 font-normal">(cc)</span>
              </label>
              <input
                type="number"
                name="engine_cc"
                value={formData.engine_cc}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:bg-white transition"
                required
              />
            </div>

            {/* Gear */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Gear
              </label>
              <select
                name="gear"
                value={formData.gear}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:bg-white transition appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Tiptronic">Tiptronic</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Fuel Type
              </label>
              <select
                name="fuel_type"
                value={formData.fuel_type}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:bg-white transition appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Condition – full width */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:bg-white transition appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="Registered (Used)">Registered (Used)</option>
                <option value="Unregistered (Recondition)">
                  Unregistered (Recondition)
                </option>
                <option value="Brand New">Brand New</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-4 rounded-xl text-base shadow-lg shadow-blue-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-700 flex items-center justify-center gap-3 mt-2"
          >
            {loading ? (
              <>
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Predicting...
              </>
            ) : (
              "🔮 Predict Market Price"
            )}
          </button>
        </form>

        {/* Result */}
        {predictedPrice && !error && (
          <div className="mt-7 animate-slideUp">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-6 text-center">
              <p className="text-gray-600 font-medium text-sm uppercase tracking-wide">
                Estimated Market Value
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold text-green-700 mt-1">
                {predictedPrice}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                * Based on current Sri Lanka market data
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200/60 pt-5">
          <span>🚗 Powered by Machine Learning &nbsp;·&nbsp; Sri Lanka Vehicle Dataset</span>
        </div>
      </div>
    </main>
  );
}