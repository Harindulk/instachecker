'use client';

import Link from 'next/link';

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        href="/"
        className="inline-block mb-8 px-4 py-2 bg-black text-white border-2 border-black rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-2">How does InstaChecker work?</h2>
          <p>
            InstaChecker analyzes your Instagram data by comparing your followers and following lists.
            It identifies accounts that you follow but don&apos;t follow you back. All processing happens
            locally in your browser - we never store or transmit your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">How do I get my Instagram data?</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to Instagram &gt; Settings &gt; Account Centre</li>
            <li>Click on &quot;Your information and permissions&quot;</li>
            <li>Select &quot;Download or transfer information&quot;</li>
            <li>Choose your Instagram account</li>
            <li>Select &quot;Some of your information&quot;</li>
            <li>Choose &quot;Followers and following&quot;</li>
            <li>Click &quot;Download&quot; and wait for the files</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">Is it safe to use?</h2>
          <p>
            Yes! InstaChecker is designed with privacy in mind. All data processing happens locally
            in your browser. We never store, transmit, or have access to your Instagram data.
            The tool is completely transparent and open-source.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">How often can I check?</h2>
          <p>
            You can use InstaChecker as often as you like! Since all processing happens in your
            browser, there are no limits. However, you&apos;ll need to download fresh data from
            Instagram each time you want to check.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">What if I find an error?</h2>
          <p>
            If you encounter any issues or have questions, please contact us through our support
            channels. We&apos;re here to help!
          </p>
        </section>
      </div>
    </div>
  );
} 