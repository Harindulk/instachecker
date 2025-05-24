'use client';

import Link from 'next/link';

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        href="/"
        className="inline-block mb-8 px-4 py-2 bg-black text-white border-2 border-black rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-8">Disclaimer</h1>

      <div className="prose max-w-none">
        <h2>Not Affiliated with Instagram</h2>
        <p>
          InstaChecker is not affiliated with, endorsed by, or in any way officially connected with Instagram, Meta, or any of their subsidiaries or affiliates.
        </p>

        <h2>Accuracy of Results</h2>
        <p>
          While we strive to provide accurate results, the accuracy of our service depends on the data you provide and your account&apos;s current state. Results may not always be 100% accurate or up-to-date.
        </p>

        <h2>Use at Your Own Risk</h2>
        <p>
          The use of InstaChecker is at your own risk. We are not responsible for any actions you take based on the information provided by our service, including but not limited to managing your Instagram relationships.
        </p>

        <h2>Data Processing</h2>
        <p>
          All data processing occurs locally in your browser. We do not store, transmit, or have access to your data. You are responsible for ensuring your use of this tool complies with Instagram&apos;s terms of service.
        </p>

        <h2>Service Availability</h2>
        <p>
          We do not guarantee uninterrupted access to our service. The tool may be unavailable at times due to technical issues or maintenance.
        </p>

        <h2>Changes to Service</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of our service at any time without notice. We are not liable to you or any third party for any such modifications, suspension, or discontinuation.
        </p>
      </div>
    </div>
  );
} 