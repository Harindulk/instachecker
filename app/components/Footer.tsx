'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">FAQ</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Q: How does it work?</strong>
                <br />
                A: The app helps you analyze your Instagram relationships by comparing your following and followers lists.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Q: Is it safe to use?</strong>
                <br />
                A: Yes, we process everything locally in your browser and don&apos;t store any of your data.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Q: How often can I check?</strong>
                <br />
                A: You can check as often as you like, but we recommend doing it once a week.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/disclaimer"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-sm text-gray-600">
              InstaChecker helps you manage your Instagram relationships by identifying accounts that don&apos;t follow you back. Our tool is designed to be simple, private, and user-friendly.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-black text-white border-2 border-black rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Back to Top ↑
          </button>
          <p className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} InstaChecker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 