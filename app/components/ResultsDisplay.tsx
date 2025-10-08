import { useState, useMemo } from 'react';

interface ResultsDisplayProps {
  nonFollowBackAccounts: string[];
}

export default function ResultsDisplay({ nonFollowBackAccounts }: ResultsDisplayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [copied, setCopied] = useState(false);

  // Filter and sort accounts
  const filteredAndSortedAccounts = useMemo(() => {
    // Filter out null, undefined, and empty strings as a safety measure
    let results = nonFollowBackAccounts.filter(
      account => account && typeof account === 'string' && account.length > 0
    );
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(account => 
        account.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort accounts with null safety
    return [...results].sort((a, b) => {
      // Additional safety check
      if (!a || !b) return 0;
      if (sortOrder === 'asc') {
        return a.localeCompare(b);
      }
      return b.localeCompare(a);
    });
  }, [nonFollowBackAccounts, searchTerm, sortOrder]);

  const handleCopyAll = () => {
    const text = filteredAndSortedAccounts.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const text = filteredAndSortedAccounts.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'non_followers.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-100 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-4 border-b-2 border-black">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h3 className="text-xl font-bold">
            Found {filteredAndSortedAccounts.length} accounts that don&apos;t follow you back
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopyAll}
              className="px-4 py-2 bg-black text-white border-2 border-black rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              {copied ? 'Copied!' : 'Copy All'}
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Export
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>
          <button
            onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            {sortOrder === 'asc' ? '↓ Sort Z-A' : '↑ Sort A-Z'}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2 results-container">
          {filteredAndSortedAccounts.map((account) => (
            <div
              key={account}
              className="flex items-center justify-between p-3 bg-white border-2 border-black rounded-lg hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  {account && account.length > 0 ? account[0].toUpperCase() : '?'}
                </div>
                <span className="font-medium">@{account}</span>
              </div>
              <a
                href={`https://www.instagram.com/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 