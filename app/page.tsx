'use client';

import { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';

interface InstagramData {
  string_list_data: Array<{
    value: string;
  }>;
}

export default function Home() {
  const [nonFollowBackAccounts, setNonFollowBackAccounts] = useState<string[]>([]);

  const handleFilesSelected = (followersData: InstagramData[], followingData: InstagramData[]) => {
    // Extract usernames from followers
    const followers = new Set(
      followersData.map(item => item.string_list_data[0]?.value).filter(Boolean)
    );

    // Extract usernames from following and check who doesn't follow back
    const nonFollowBack = followingData
      .map(item => item.string_list_data[0]?.value)
      .filter(Boolean)
      .filter(username => !followers.has(username));

    setNonFollowBackAccounts(nonFollowBack);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Instagram Follow Checker
          </h1>
          <p className="text-lg text-gray-600">
            Find out who doesn't follow you back on Instagram
          </p>
        </div>

        <FileUpload onFilesSelected={handleFilesSelected} />
        <ResultsDisplay nonFollowBackAccounts={nonFollowBackAccounts} />
      </div>
    </main>
  );
}
