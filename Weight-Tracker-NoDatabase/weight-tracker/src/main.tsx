import React, { useState, useEffect } from "react";
import AddWeight from "./add_weight";
import EditWeight from "./edit_weight";
import DeleteConfirmation from "./deleteConfirmation";


const Main: React.FC = () => {
  const [weights, setWeights] = useState<{ id: string; weight: number }[]>([]);
  const [showAddWeight, setShowAddWeight] = useState(false);
  const [showEditWeight, setShowEditWeight] = useState(false);
  const [selectedWeightId, setSelectedWeightId] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Fetch weights from the backend on component mount
  const fetchWeights = async () => {
    try {
      const response = await fetch("http://localhost:5000/weights");
      const data = await response.json();
      setWeights(data);
    } catch (error) {
      console.error("Error fetching weights:", error);
    }
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  // Function to add a new weight
  const addWeight = async (weight: number) => {
    try {
      const response = await fetch("http://localhost:5000/weights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weight }),
      });

      if (response.ok) {
        fetchWeights(); // Refresh weights list after adding
      } else {
        const error = await response.json();
        console.error("Failed to add weight:", error.message);
      }
    } catch (error) {
      console.error("Error adding weight:", error);
    }
  };

  // Function to handle editing a weight
  const handleEditWeight = (id: string) => {
    setSelectedWeightId(id);
    setShowEditWeight(true);
  };

  // Function to handle deleting a weight
  const handleDeleteWeight = (id: string) => {
    setSelectedWeightId(id);
    setShowDeleteConfirmation(true); // Show the delete confirmation modal
  };

  // Function to confirm the deletion
  const confirmDelete = async () => {
    if (selectedWeightId) {
      try {
        const response = await fetch(`http://localhost:5000/weights/${selectedWeightId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchWeights(); // Refresh weights list after deleting
          setShowDeleteConfirmation(false); // Hide confirmation modal
        } else {
          const error = await response.json();
          console.error("Failed to delete weight:", error.message);
        }
      } catch (error) {
        console.error("Error deleting weight:", error);
      }
    }
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setShowDeleteConfirmation(false); // Hide confirmation modal
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Weight List</h1>

      {/* Display list of weights */}
      <ul className="space-y-2 mb-6">
        {weights.map((weight) => (
          <li key={weight.id} className="text-lg text-gray-700">
            Weight: {weight.weight} kg
            <button
              onClick={() => handleEditWeight(weight.id)}
              className="ml-4 text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteWeight(weight.id)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Button to toggle AddWeight visibility */}
      <button
        onClick={() => setShowAddWeight((prev) => !prev)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {showAddWeight ? "Cancel" : "Add Weight"}
      </button>

      {/* Conditionally render AddWeight component */}
      {showAddWeight && <AddWeight onAdd={addWeight} />}

      {/* Conditionally render EditWeight component */}
      {showEditWeight && selectedWeightId && (
        <EditWeight
          id={selectedWeightId}
          onClose={() => {
            setShowEditWeight(false);
            fetchWeights(); // Refresh list after edit
          }}
        />
      )}

      {/* Conditionally render DeleteConfirmation modal */}
      {showDeleteConfirmation && (
        <DeleteConfirmation onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
  );
};

export default Main;
