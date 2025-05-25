import React from 'react';
import Image from 'next/image';
import { Card } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";

const Instructions = () => {
  const steps = [
    {
      label: 'Access Instagram Account Center',
      description: 'Navigate to your Instagram settings and Account Center, or directly visit:',
      link: 'https://accountscenter.instagram.com/',
      image: null
    },
    {
      label: 'Access Information Download',
      description: 'Go to &quot;Your information and permissions&quot; and look for the &quot;Download your information&quot; section',
      image: '/instructions/step3.png'
    },
    {
      label: 'Start Download Process',
      description: 'Click on the &quot;Download or transfer information&quot; button',
      image: '/instructions/step4.png'
    },
    {
      label: 'Select Instagram Account',
      description: 'Choose the Instagram account you want to download data from and click &quot;Next&quot; to proceed',
      image: '/instructions/step5.png'
    },
    {
      label: 'Choose Information Type',
      description: 'Click on &quot;Select some of your information&quot; to choose specific data to download',
      image: '/instructions/step6.png'
    },
    {
      label: 'Select Followers and Following',
      description: 'Find and check the boxes for &quot;Followers&quot; and &quot;Following&quot;, then click &quot;Next&quot; to continue',
      image: '/instructions/step7.png'
    },
    {
      label: 'Choose Download Method',
      description: 'Select &quot;Download to device&quot; option',
      image: '/instructions/step8.png'
    },
    {
      label: 'Configure Download Settings',
      description: `Set Date range to &quot;All time&quot;
Enter your email address where you want to receive the download link
Select &quot;JSON&quot; as the format
Click &quot;Create files&quot;`,
      image: '/instructions/step8.png'
    },
    {
      label: 'Final Steps',
      description: `1. Wait 5-10 minutes for Instagram to process your request
2. You&apos;ll receive an email from Instagram with the download link
3. Download the ZIP file from the email
4. Extract the ZIP file
5. Navigate to &apos;connections &gt; followers_and_following&apos; folder
6. You&apos;ll find two files: followers_1.json and following.json`,
      image: null
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        How to Download Your Instagram Followers & Following Data
      </h1>
      
      <ScrollArea className="h-[800px] rounded-md">
        <div className="space-y-8 p-4">
          {steps.map((step, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <h2 className="text-xl font-semibold">{step.label}</h2>
                </div>
                
                <p className="text-muted-foreground whitespace-pre-line">
                  {step.description}
                </p>
                
                {step.link && (
                  <a 
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline block mt-2"
                  >
                    {step.link}
                  </a>
                )}
                
                {step.image && (
                  <div className="mt-4 rounded-lg overflow-hidden border">
                    <Image
                      src={step.image}
                      alt={`Step ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Instructions; 