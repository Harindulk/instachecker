import { ChangeEvent } from 'react';

interface FileUploadProps {
  onFilesSelected: (followersData: any, followingData: any) => void;
}

export default function FileUpload({ onFilesSelected }: FileUploadProps) {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length !== 2) {
      alert('Please select both followers and following files');
      return;
    }

    try {
      const followersFile = files[0];
      const followingFile = files[1];

      const followersData = JSON.parse(await followersFile.text());
      const followingData = JSON.parse(await followingFile.text());

      onFilesSelected(followersData, followingData);
    } catch (error) {
      alert('Error reading files. Please make sure they are valid JSON files.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Upload Instagram Data Files</h2>
      <p className="text-gray-600 text-center max-w-md">
        Please select both your followers.json and following.json files
      </p>
      <div className="w-full max-w-md">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">Select both JSON files</p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            accept=".json"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
} 