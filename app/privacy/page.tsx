'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        href="/"
        className="inline-block mb-8 px-4 py-2 bg-black text-white border-2 border-black rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        ← Back to Home
      </Link>

      <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Information Collection</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                We do not collect, store, or transmit any of your personal data. All processing of your Instagram data happens locally in your browser.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Data Processing</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                When you upload your Instagram data files:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
                <li>The files are processed entirely in your browser</li>
                <li>No data is sent to our servers</li>
                <li>Data is automatically cleared when you close or refresh the page</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Cookies & Local Storage</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                We use minimal local storage only to remember your preferences and improve your experience. No tracking cookies are used.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                Our service operates independently. We recommend reviewing Instagram&apos;s privacy policy regarding their data handling practices.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                Since we don&apos;t store any user data, and all processing happens locally, your data remains private and secure.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Updates to Policy</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                We may update this privacy policy from time to time. Any changes will be posted on this page.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contact</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                If you have any questions about this privacy policy, please contact us through our support channels.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 