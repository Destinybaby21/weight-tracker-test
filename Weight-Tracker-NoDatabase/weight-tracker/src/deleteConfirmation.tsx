interface DeleteConfirmationProps {
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this weight?</h2>
        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
  
  export default DeleteConfirmation;
  