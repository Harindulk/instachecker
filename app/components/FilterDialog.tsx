import { useState } from 'react';

interface FilterDialogProps {
  onClose: () => void;
  onApply: (minFollowers: number) => void;
}

export default function FilterDialog({ onClose, onApply }: FilterDialogProps) {
  const [minFollowers, setMinFollowers] = useState(1000);

  const handleApply = () => {
    onApply(minFollowers);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Filter Settings</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Minimum Followers
          </label>
          <input
            type="number"
            value={minFollowers}
            onChange={(e) => setMinFollowers(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg"
            min="0"
          />
          <p className="text-sm text-gray-500 mt-1">
            Only show accounts that don&apos;t follow you back and have at least this many followers.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
} 