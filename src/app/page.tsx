'use client';
import { useState } from 'react';
import Head from 'next/head';

interface User {
  title: string;
  media_list_data: unknown[];
  string_list_data: {
    href: string;
    value: string;
    timestamp: number;
  }[];
}

interface FollowingUser {
  title: string;
  string_list_data: {
    href: string;
    timestamp: number;
  }[];
}

interface FollowersData {
  relationships_followers: User[];
}

interface ProcessedData {
  followers: string[];
  following: string[];
}

export default function Home() {
  const [files, setFiles] = useState<{ followers: File | null; following: File | null }>({
    followers: null,
    following: null,
  });
  const [results, setResults] = useState<{
    notFollowingBack: string[];
    youAreNotFollowingBack: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const processFiles = async () => {
    if (!files.followers || !files.following) {
      setError('Please select both followers and a following file.');
      return;
    }

    try {
      setError(null);
      setResults(null);
      console.log('Reading files...');
      const followersContent = await files.followers.text();
      const followingContent = await files.following.text();
      console.log('Files read successfully');

      console.log('Processing followers file...');
      const followersData: FollowersData | User[] = JSON.parse(followersContent);
      console.log('Parsing followers data:', followersData);
      
      let followerUsernames: string[] = [];
      if (Array.isArray(followersData)) { // Handles old format
        followerUsernames = followersData.flatMap(
          (user) => user.string_list_data?.map((item) => item.value) || []
        );
      } else if (followersData && (followersData as FollowersData).relationships_followers) { // Handles new format
        followerUsernames = (followersData as FollowersData).relationships_followers.flatMap(
          (user) => user.string_list_data?.map((item) => item.value) || []
        );
      }
      console.log('Extracted follower usernames:', followerUsernames);


      console.log('Processing following file...');
      const followingData: { relationships_following: FollowingUser[] } = JSON.parse(followingContent);
      console.log('Parsing following data:', followingData);
      const followingUsernames =
        followingData.relationships_following?.map(
          (user) => user.title
        ) || [];
      console.log('Extracted following usernames:', followingUsernames);

      const processedData = {
        followers: followerUsernames,
        following: followingUsernames,
      };

      console.log('Files processed successfully:', processedData);
      processResults(processedData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Error processing files: ${errorMessage}`);
      console.error(err);
    }
  };

  const processResults = (data: ProcessedData) => {
    console.log('Received data:', data);
    const notFollowingBack = data.following.filter(
      (user) => !data.followers.includes(user)
    );
    const youAreNotFollowingBack = data.followers.filter(
      (user) => !data.following.includes(user)
    );
    console.log('Processing results:', { notFollowingBack, youAreNotFollowingBack });
    setResults({ notFollowingBack, youAreNotFollowingBack });
  };

  const downloadResults = (data: string[], filename: string) => {
    const blob = new Blob([data.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <Head>
        <title>InstaUnfollowers</title>
        <meta
          name="description"
          content="Check who doesn't follow you back on Instagram"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          InstaUnfollowers
        </h1>

        <p className="description">
          Find out who doesn&apos;t follow you back on Instagram. Your data is
          processed entirely in your browser and is not uploaded to any server.
        </p>

        <div className="file-inputs">
          <div className="file-input">
            <label htmlFor="followers">Followers File (followers_1.json)</label>
            <input
              type="file"
              id="followers"
              name="followers"
              accept=".json"
              onChange={handleFileChange}
            />
          </div>
          <div className="file-input">
            <label htmlFor="following">Following File (following.json)</label>
            <input
              type="file"
              id="following"
              name="following"
              accept=".json"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button className="process-button" onClick={processFiles}>
          Check Unfollowers
        </button>

        {error && <p className="error">{error}</p>}

        {results && (
          <div className="results">
            <div className="result-section">
              <h2>
                Doesn&apos;t Follow You Back ({results.notFollowingBack.length})
                <button
                  onClick={() =>
                    downloadResults(
                      results.notFollowingBack,
                      'not_following_back.txt'
                    )
                  }
                >
                  Download
                </button>
              </h2>
              <ul>
                {results.notFollowingBack.map((user) => (
                  <li key={user}>
                    <a
                      href={`https://instagram.com/${user}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="result-section">
              <h2>
                You Don&apos;t Follow Back (
                {results.youAreNotFollowingBack.length})
                <button
                  onClick={() =>
                    downloadResults(
                      results.youAreNotFollowingBack,
                      'you_are_not_following_back.txt'
                    )
                  }
                >
                  Download
                </button>
              </h2>
              <ul>
                {results.youAreNotFollowingBack.map((user) => (
                  <li key={user}>
                    <a
                      href={`https://instagram.com/${user}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}