import React, { useState, useEffect } from "react";

interface EditWeightProps {
  id: string;
  onClose: () => void;
}

const EditWeight: React.FC<EditWeightProps> = ({ id, onClose }) => {
  const [weight, setWeight] = useState<number | null>(null);

  // Fetch weight details by ID
  useEffect(() => {
    const fetchWeight = async () => {
      try {
        const response = await fetch(`http://localhost:5000/weights/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setWeight(data.weight);
      } catch (error) {
        console.error("Error fetching weight:", error);
      }
    };
    fetchWeight();
  }, [id]);

  // Function to handle updating the weight
  const handleUpdateWeight = async () => {
    if (weight === null) return;

    try {
      const response = await fetch(`http://localhost:5000/weights/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weight }),
      });

      if (response.ok) {
        onClose(); // Close the modal after update
      } else {
        const error = await response.json();
        console.error("Failed to update weight:", error.message);
      }
    } catch (error) {
      console.error("Error updating weight:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Weight</h2>
        <div className="mb-4">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Weight (kg)
          </label>
          <input
            id="weight"
            type="number"
            value={weight ?? ""} // Use nullish coalescing to handle null case
            onChange={(e) => setWeight(e.target.value === "" ? null : Number(e.target.value))}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter weight"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateWeight}
            disabled={weight === null} // Disable button when weight is null
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWeight;
