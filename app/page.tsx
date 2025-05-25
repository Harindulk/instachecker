'use client';

import { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

export default function Home() {
  const [nonFollowBackAccounts, setNonFollowBackAccounts] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved results from local storage on initial render
  useEffect(() => {
    const savedResults = localStorage.getItem('instachecker_results');
    if (savedResults) {
      try {
        setNonFollowBackAccounts(JSON.parse(savedResults));
      } catch (error) {
        console.error('Error loading saved results:', error);
        localStorage.removeItem('instachecker_results');
      }
    }
  }, []);

  const handleFilesSelected = async (followersData: string[], followingData: string[]) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      console.log('Received data:', {
        followersCount: followersData.length,
        followingCount: followingData.length,
        sampleFollowers: followersData.slice(0, 3),
        sampleFollowing: followingData.slice(0, 3)
      });

      // Find accounts that you follow but don't follow you back
      const nonFollowBacks = followingData.filter(
        following => !followersData.includes(following)
      );

      console.log('Processing results:', {
        totalFollowers: followersData.length,
        totalFollowing: followingData.length,
        nonFollowBackCount: nonFollowBacks.length
      });

      // Save results to local storage
      localStorage.setItem('instachecker_results', JSON.stringify(nonFollowBacks));
      setNonFollowBackAccounts(nonFollowBacks);
      setError(null);
    } catch (error) {
      console.error('Error processing data:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred while processing your data.');
      setNonFollowBackAccounts([]);
      localStorage.removeItem('instachecker_results');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setNonFollowBackAccounts([]);
    setError(null);
    localStorage.removeItem('instachecker_results');
  };

  return (
    <main className="min-h-screen bg-[#f0f0f0] px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Header - Separate card for better visual hierarchy */}
        <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              InstaChecker
            </h1>
            <div className="inline-block bg-black text-white px-4 py-2 rounded-lg transform -rotate-2">
              <p className="text-lg">
                Find out who doesn&apos;t follow you back on Instagram
              </p>
            </div>
          </div>
        </div>

        {/* Main Content - Separate card */}
        <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="space-y-8">
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

            {nonFollowBackAccounts.length > 0 ? (
              <div className="space-y-6">
                <ResultsDisplay nonFollowBackAccounts={nonFollowBackAccounts} />
                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-black text-white border-2 border-black rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Check Different Account
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <FileUpload onFilesSelected={handleFilesSelected} />
              </div>
            )}

            {isProcessing && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing your data...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions - Separate card */}
        <div className="mt-6 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            How to get your Instagram data
          </h2>
          
          <Accordion 
            type="multiple" 
            defaultValue={["step-1", "step-2", "step-3", "step-4", "step-5", "step-6", "step-7", "step-8", "step-9"]} 
            className="space-y-4"
          >
            {/* Step 1 */}
            <AccordionItem value="step-1" className="border-2 border-black rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex-none flex items-center justify-center w-6 h-6 bg-black text-white rounded-full font-medium text-sm">1</span>
                  <span className="font-semibold text-left">Access Instagram Account Center</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-4">
                  <p className="mb-3">
                    Go to Instagram Settings and Account Center, or directly visit:{" "}
                    <a 
                      href="https://accountscenter.instagram.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-purple-600 hover:text-purple-700 underline"
                    >
                      Instagram Account Center
                    </a>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 2 */}
            <AccordionItem value="step-2" className="border-2 border-black rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex-none flex items-center justify-center w-6 h-6 bg-black text-white rounded-full font-medium text-sm">2</span>
                  <span className="font-semibold text-left">Access Information Download</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-4">
                  <p className="mb-3">Go to &quot;Your information and permissions&quot; and look for the &quot;Download your information&quot; section</p>
                  <Image
                    src="/instructions/step3.png"
                    alt="Navigate to Information and Permissions"
                    width={800}
                    height={600}
                    className="rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 3 */}
            <AccordionItem value="step-3" className="border-2 border-black rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex-none flex items-center justify-center w-6 h-6 bg-black text-white rounded-full font-medium text-sm">3</span>
                  <span className="font-semibold text-left">Start Download Process</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-4">
                  <p className="mb-3">Click on the &quot;Download or transfer information&quot; button</p>
                  <Image
                    src="/instructions/step4.png"
                    alt="Click Download Information"
                    width={800}
                    height={600}
                    className="rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 4 */}
            <AccordionItem value="step-4" className="border-2 border-black rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex-none flex items-center justify-center w-6 h-6 bg-black text-white rounded-full font-medium text-sm">4</span>
                  <span className="font-semibold text-left">Select Instagram Account</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-4">
                  <p className="mb-3">Choose your Instagram account and click &quot;Next&quot;</p>
                  <Image
                    src="/instructions/step5.png"
                    alt="Select Account"
                    width={800}
                    height={600}
                    className="rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 5 */}
            <AccordionItem value="step-5" className="border-2 border-black rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex-none flex items-center justify-center w-6 h-6 bg-black text-white rounded-full font-medium text-sm">5</span>
                  <span className="font-semibold text-left">Choose Information Type</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-4">
                  <p className="mb-3">Click on &quot;Select some of your information&quot;</p>
                  <Image
                    src="/instructions/step6.png"
                    alt="Select Information Type"
                    width={800}
                    height={600}
                    className="rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 6 */}
            <AccordionItem value="step-6" className="border-2 border-black rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex-none flex items-center justify-center w-6 h-6 bg-black text-white rounded-full font-medium text-sm">6</span>
                  <span className="font-semibold text-left">Select Followers and Following</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-4">
                  <p className="mb-3">Find and check the boxes for &quot;Followers&quot; and &quot;Following&quot;, then click &quot;Next&quot;</p>
                  <Image
                    src="/instructions/step7.png"
                    alt="Select Followers and Following"
                    width={800}
                    height={600}
                    className="rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 7 */}
            <AccordionItem value="step-7" className="border-2 border-black rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex-none flex items-center justify-center w-6 h-6 bg-black text-white rounded-full font-medium text-sm">7</span>
                  <span className="font-semibold text-left">Choose Download Method</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-4">
                  <p className="mb-3">Select &quot;Download to device&quot;</p>
                  <Image
                    src="/instructions/step8.png"
                    alt="Download to Device"
                    width={800}
                    height={600}
                    className="rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 8 */}
            <AccordionItem value="step-8" className="border-2 border-black rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex-none flex items-center justify-center w-6 h-6 bg-black text-white rounded-full font-medium text-sm">8</span>
                  <span className="font-semibold text-left">Configure Download Settings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-4">
                  <ul className="list-disc ml-6 mb-3 space-y-1">
                    <li>Set Date range to &quot;All time&quot;</li>
                    <li>Enter your email address</li>
                    <li>Select &quot;JSON&quot; as the format</li>
                    <li>Click &quot;Create files&quot;</li>
                  </ul>
                  <Image
                    src="/instructions/step9.png"
                    alt="Configure Settings"
                    width={800}
                    height={600}
                    className="rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 9 */}
            <AccordionItem value="step-9" className="border-2 border-black rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex-none flex items-center justify-center w-6 h-6 bg-black text-white rounded-full font-medium text-sm">9</span>
                  <span className="font-semibold text-left">Final Steps</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 pb-4">
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Wait 5-10 minutes for Instagram to process your request</li>
                    <li>Check your email for the download link</li>
                    <li>Download and extract the ZIP file</li>
                    <li>Find the files in: connections {'>'} followers_and_following</li>
                    <li>You&apos;ll find two files: followers_1.json and following.json</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Privacy Notice */}
          <div className="mt-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h3 className="font-medium text-green-800">Privacy First</h3>
                <p className="text-green-700 text-sm mt-1">
                  Your data stays on your device - we don&apos;t store or upload your Instagram data to any server. All processing happens locally in your browser.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-x-4">
          <a
            href="/terms"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="/disclaimer"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Disclaimer
          </a>
        </div>
      </div>
    </main>
  );
}
