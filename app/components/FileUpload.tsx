import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFilesSelected: (followersData: string[], followingData: string[]) => void;
}

interface InstagramDataItem {
  title: string;
  media_list_data: unknown[];
  string_list_data: Array<{
    href: string;
    value: string;
    timestamp: number;
  }>;
}

export default function FileUpload({ onFilesSelected }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<{ [key: string]: File }>({});

  const extractUsernames = (content: string, type: 'followers' | 'following'): string[] => {
    try {
      const data = JSON.parse(content);
      console.log(`Parsing ${type} data:`, {
        isArray: Array.isArray(data),
        hasRelationshipsFollowing: !!data.relationships_following,
        firstItem: data[0] || data.relationships_following?.[0] || null
      });

      // For following.json (nested under relationships_following)
      if (type === 'following') {
        if (!data.relationships_following || !Array.isArray(data.relationships_following)) {
          console.error('Invalid following data structure:', data);
          throw new Error('Invalid following.json format');
        }
        const usernames = data.relationships_following
          .map((item: InstagramDataItem) => item.string_list_data?.[0]?.value)
          .filter((username: unknown): username is string => typeof username === 'string' && username.length > 0);
        console.log('Extracted following usernames:', usernames.slice(0, 3), '... (total:', usernames.length, ')');
        return usernames;
      }
      
      // For followers.json (direct array)
      if (!Array.isArray(data)) {
        console.error('Invalid followers data structure:', data);
        throw new Error('Invalid followers.json format');
      }
      const usernames = data
        .map((item: InstagramDataItem) => item.string_list_data?.[0]?.value)
        .filter((username: unknown): username is string => typeof username === 'string' && username.length > 0);
      console.log('Extracted follower usernames:', usernames.slice(0, 3), '... (total:', usernames.length, ')');
      return usernames;
      
    } catch (error) {
      console.error(`Error processing ${type} data:`, error);
      throw new Error(`Error processing ${type}.json file. Please ensure you're using the correct Instagram data export file.`);
    }
  };

  const processFiles = useCallback(async (followersFile: File, followingFile: File) => {
    try {
      console.log('Reading files...');
      const [followersText, followingText] = await Promise.all([
        followersFile.text(),
        followingFile.text()
      ]);
      console.log('Files read successfully');

      // Process both files
      console.log('Processing followers file...');
      const followersData = extractUsernames(followersText, 'followers');
      console.log('Processing following file...');
      const followingData = extractUsernames(followingText, 'following');

      if (!followersData.length) {
        throw new Error('No usernames found in followers.json');
      }

      if (!followingData.length) {
        throw new Error('No usernames found in following.json');
      }

      console.log('Files processed successfully:', {
        followersCount: followersData.length,
        followingCount: followingData.length
      });

      onFilesSelected(followersData, followingData);
    } catch (err) {
      console.error('Error processing files:', err);
      setError(err instanceof Error ? err.message : 'Error processing files. Please make sure you uploaded the correct Instagram data files.');
      setFiles({});
    }
  }, [onFilesSelected]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const newFiles = { ...files };

    for (const file of acceptedFiles) {
      console.log('Processing file:', file.name);
      
      if (!file.name.toLowerCase().endsWith('.json')) {
        setError('Please upload only JSON files.');
        return;
      }

      const isFollowers = file.name.toLowerCase().includes('followers');
      const isFollowing = file.name.toLowerCase().includes('following');

      if (!isFollowers && !isFollowing) {
        setError('Please upload files named "followers.json" and "following.json"');
        return;
      }

      // If we already have this type of file, show warning
      if ((isFollowers && files.followers) || (isFollowing && files.following)) {
        setError(`You already uploaded a ${isFollowers ? 'followers' : 'following'} file. Remove it first if you want to upload a different one.`);
        return;
      }

      if (isFollowers) {
        newFiles.followers = file;
      } else if (isFollowing) {
        newFiles.following = file;
      }
    }

    setFiles(newFiles);

    if (newFiles.followers && newFiles.following) {
      processFiles(newFiles.followers, newFiles.following);
    }
  }, [files, processFiles]);

  const removeFile = (type: 'followers' | 'following') => {
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[type];
      return newFiles;
    });
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    }
  });

  const getMissingFileMessage = () => {
    if (!files.followers && !files.following) return null;
    const missingFile = !files.followers ? 'followers.json' : 'following.json';
    return `Please upload ${missingFile} to continue`;
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed border-black rounded-lg p-8
          bg-gray-100 cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'bg-gray-200' : ''}
          hover:bg-gray-200
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        `}
      >
        <input {...getInputProps()} />
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <div>
            <p className="text-lg font-medium">
              {isDragActive
                ? "Drop the files here..."
                : getMissingFileMessage() || "Drag 'followers.json' and 'following.json' here"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              or click to select files
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {(files.followers || files.following) && (
        <div className="bg-gray-100 rounded-lg p-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-medium mb-2">Selected Files:</h3>
          <ul className="space-y-2">
            {files.followers && (
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>followers.json</span>
                </div>
                <button
                  onClick={() => removeFile('followers')}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            )}
            {files.following && (
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>following.json</span>
                </div>
                <button
                  onClick={() => removeFile('following')}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg border-2 border-red-500 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
} 