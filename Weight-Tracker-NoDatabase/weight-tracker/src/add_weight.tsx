import React, { useState } from "react";

interface AddWeightProps {
  onAdd: (weight: number) => void;
}

const AddWeight: React.FC<AddWeightProps> = ({ onAdd }) => {
  const [newWeight, setNewWeight] = useState<string>("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate and convert input to a number
    const parsedWeight = parseFloat(newWeight);

    if (parsedWeight > 0) {
      onAdd(parsedWeight); // Trigger the parent's `onAdd` function
      setNewWeight(""); // Clear the input field
    } else {
      alert("Please enter a valid weight greater than 0.");
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="number"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          disabled={newWeight === null} // Disable button when weight is null
          className="px-4 py-2 border rounded-md text-sm"
          placeholder="Enter weight (kg)"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddWeight;
