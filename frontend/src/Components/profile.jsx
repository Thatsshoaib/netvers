import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

import Select from "react-select";



const BankDetailsForm = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    date_of_birth: "",
    profile_image_url: "",
    bank_name: "",
    holder_name: "",
    account_number: "",
    ifsc: "",
    branch: "",
    bank_city: "",
    account_type: "Saving",
    bank_status: "PENDING",
    address: "",
    landmark: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  });

  const fetchSavedData = async () => {
    const user_id = localStorage.getItem("user_id");
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${user_id}`);
      const data = await res.json();
      console.log("Fetched Data:", data);
      if (data?.data) {
        setSubmittedData(data.data);
      } else {
        console.warn("No data found in response.");
      }
    } catch (err) {
      console.error("Error fetching submitted data:", err);
    }
  };
  useEffect(() => {
    const allCountries = Country.getAllCountries().map((c) => ({
      label: c.name,
      value: c.isoCode,
    }));
    setCountries(allCountries);
  }, []);
  
  useEffect(() => {
    if (formData.country) {
      const countryStates = State.getStatesOfCountry(formData.country).map(
        (s) => ({
          label: s.name,
          value: s.isoCode,
        })
      );
      setStates(countryStates);
    }
  }, [formData.country]);
  
  useEffect(() => {
    if (formData.country && formData.state) {
      const cityOptions = City.getCitiesOfState(formData.country, formData.state).map(
        (c) => ({
          label: c.name,
          value: c.name,
        })
      );
      setCities(cityOptions);
    }
  }, [formData.state]);
  
  

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchSavedData();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image_url") {
      const file = files[0];
      const url = file ? URL.createObjectURL(file) : "";
      setFormData({ ...formData, [name]: url });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return alert("User not logged in.");
  
    const dataToSend = {
      ...submittedData, // ← use previously submitted data
      ...formData,      // ← override with any new/edited fields
      user_id,
    };
  
    try {
      const response = await fetch(
        submittedData
          ? `http://localhost:5000/api/profile/${user_id}`
          : "http://localhost:5000/api/profile",
        {
          method: submittedData ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
  
      const result = await response.json();
      alert(
        submittedData
          ? "Details updated successfully!"
          : "Details submitted successfully!"
      );
      setSubmittedData(result.data || dataToSend);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed.");
    }
  };
  

  const getValue = (name) => formData[name] || submittedData?.[name] || "";

  return (
    <div className="max-w-6xl mx-auto p-10 bg-white shadow-2xl rounded-3xl pt-50">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Personal & Bank Details
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-10"
      >
        {/* Left Section - Profile + Personal */}
        <div className="flex-1 space-y-8">
          {/* Profile Image & DOB */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-sm border">
            <div className="flex flex-col items-center gap-5">
              {(formData.profile_image_url ||
                submittedData?.profile_image_url) && (
                <img
                  src={
                    formData.profile_image_url ||
                    submittedData?.profile_image_url
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-md"
                />
              )}
              <div className="w-full space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Upload Profile Image
                  </label>
                  <input
                    type="file"
                    name="profile_image_url"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={getValue("date_of_birth")}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
         {/* Personal Details */}
<fieldset className="bg-gray-100 p-6 rounded-2xl shadow-sm border">
  <legend className="text-lg font-semibold text-gray-700 mb-6">
    Personal Details
  </legend>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    {/* Address, Landmark */}
    {["address", "landmark"].map((field) => (
      <input
        key={field}
        type="text"
        name={field}
        value={getValue(field)}
        onChange={handleChange}
        className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
      />
    ))}

    {/* Country Dropdown */}
    <Select
  options={countries}
  value={countries.find((c) => c.value === formData.country)}
  onChange={(selected) =>
    setFormData({ ...formData, country: selected.value, state: "", city: "" })
  }
  placeholder="Select Country"
  isSearchable
/>


    {/* State Dropdown */}
    <Select
  options={states}
  value={states.find((s) => s.value === formData.state)}
  onChange={(selected) =>
    setFormData({ ...formData, state: selected.value, city: "" })
  }
  placeholder="Select State"
  isSearchable
/>



    {/* City Dropdown */}
    <Select
  options={cities}
  value={cities.find((c) => c.value === formData.city)}
  onChange={(selected) =>
    setFormData({ ...formData, city: selected.value })
  }
  placeholder="Select City"
  isSearchable
/>



    {/* Pincode */}
    <input
      type="text"
      name="pincode"
      value={getValue("pincode")}
      onChange={handleChange}
      className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Pincode"
    />
  </div>
</fieldset>

        </div>

        {/* Right Section - Bank Details */}
        <div className="flex-1 space-y-8">
          <fieldset className="bg-gray-100 p-6 rounded-2xl shadow-sm border">
            <legend className="text-lg font-semibold text-gray-700 mb-6">
              Bank Details
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                "bank_name",
                "holder_name",
                "account_number",
                "ifsc",
                "branch",
                "bank_city",
              ].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={getValue(field)}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field.replace("_", " ").toUpperCase()}
                />
              ))}

              <select
                name="account_type"
                value={getValue("account_type")}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
              </select>

              <select
                name="bank_status"
                value={getValue("bank_status")}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
              </select>
            </div>
          </fieldset>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white text-sm sm:text-base font-semibold py-2 px-6 sm:px-10 rounded-full shadow hover:bg-blue-700 transition-all duration-200"
            >
              {submittedData ? "Update Details" : "Submit Details"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BankDetailsForm;
