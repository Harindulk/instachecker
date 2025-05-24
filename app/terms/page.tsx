'use client';

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        href="/"
        className="inline-block mb-8 px-4 py-2 bg-black text-white border-2 border-black rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        ← Back to Home
      </Link>

      <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                By using InstaChecker, you agree to be bound by these terms and conditions. If you disagree with any part of these terms, please do not use our service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                InstaChecker is a tool that helps you analyze your Instagram relationships by comparing your followers and following lists. All processing happens locally in your browser.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>You are responsible for any data you upload</li>
                <li>You must comply with Instagram&apos;s terms of service</li>
                <li>You agree not to misuse or attempt to abuse our service</li>
                <li>You must not use the service for any illegal purposes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Privacy & Data</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                We process all data locally in your browser. We do not store, collect, or transmit any of your personal information or Instagram data. Please review our Privacy Policy for more details.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Disclaimer</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>The service is provided &quot;as is&quot; without any warranties</li>
                <li>We are not responsible for any actions you take based on the results</li>
                <li>We are not affiliated with Instagram or Meta</li>
                <li>Results may not be 100% accurate or real-time</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Service Changes</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                We reserve the right to modify or discontinue our service at any time without notice. We are not liable to you or any third party for any changes or discontinuation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contact</h2>
            <div className="bg-gray-50 border-2 border-black rounded-lg p-4">
              <p className="text-gray-700">
                If you have any questions about these terms, please contact us through our support channels.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 