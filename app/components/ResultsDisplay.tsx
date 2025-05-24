interface ResultsDisplayProps {
  nonFollowBackAccounts: string[];
}

export default function ResultsDisplay({ nonFollowBackAccounts }: ResultsDisplayProps) {
  if (nonFollowBackAccounts.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Accounts that don't follow you back ({nonFollowBackAccounts.length})
      </h3>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {nonFollowBackAccounts.map((account) => (
            <li key={account} className="p-4 hover:bg-gray-50">
              <a
                href={`https://instagram.com/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-500"
              >
                <span className="text-gray-400">@</span>
                <span>{account}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 