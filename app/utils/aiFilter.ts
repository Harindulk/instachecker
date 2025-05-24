const BATCH_SIZE = 3; // Reduced batch size to avoid rate limits
const DELAY_BETWEEN_REQUESTS = 2000; // 2 seconds delay between requests

interface AIResponse {
  sequence: string;
  labels: string[];
  scores: number[];
}

// Common patterns that suggest a celebrity/business account
const BUSINESS_PATTERNS = [
  /official$/i,         // ends with "official"
  /real$/i,            // ends with "real"
  /_official/i,        // contains "_official"
  /\d{6,}/,           // contains 6 or more consecutive numbers
  /[._]inc$/i,        // ends with inc
  /[._]llc$/i,        // ends with llc
  /[._]ltd$/i,        // ends with ltd
  /global$/i,         // ends with global
  /worldwide$/i,      // ends with worldwide
  /[._]tv$/i,         // ends with tv
  /news$/i,           // ends with news
  /media$/i,          // ends with media
  /store$/i,          // ends with store
  /shop$/i,           // ends with shop
  /brand$/i,          // ends with brand
  /page$/i,           // ends with page
  /team$/i,           // ends with team
  /group$/i,          // ends with group
  /agency$/i,         // ends with agency
  /studio$/i,         // ends with studio
  /magazine$/i,       // ends with magazine
  /blog$/i,           // ends with blog
  /[._]co$/i,         // ends with co
  /verified$/i,       // ends with verified
  /[._]org$/i,        // ends with org
  /[._]net$/i,        // ends with net
];

// Patterns that strongly suggest a business/celebrity account
const STRONG_INDICATORS = [
  /^[a-z0-9.]*official/i,   // starts with official
  /^[a-z0-9.]*real/i,       // starts with real
  /^the/i,                  // starts with "the"
  /verified/i,              // contains "verified"
  /^[a-z0-9.]*world$/i,     // ends with world
  /^[a-z0-9.]*global$/i,    // ends with global
];

// Basic patterns to pre-filter obvious cases
const OBVIOUS_BUSINESS_PATTERNS = [
  /^the/i,                // starts with "the"
  /_official$/i,         // ends with _official
  /\.tv$/i,              // ends with .tv
  /\.inc$/i,             // ends with .inc
  /\.llc$/i,             // ends with .llc
  /\.co$/i,              // ends with .co
];

// For now, we'll disable AI filtering since we don't have a valid API key
export async function filterCelebrityAccounts(accounts: string[]): Promise<string[]> {
  // Using the standard zero-shot classification model
  const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
  const API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
  
  if (!API_KEY) {
    console.error('HuggingFace API key not found. Please check your .env.local file.');
    return accounts;
  }

  console.log(`Starting smart filtering for ${accounts.length} accounts...`);

  // Process accounts in larger batches for efficiency
  const BATCH_SIZE = 20; // Increased batch size for better cost efficiency
  const filteredAccounts: string[] = [];

  for (let i = 0; i < accounts.length; i += BATCH_SIZE) {
    const batch = accounts.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(accounts.length/BATCH_SIZE)}`);
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          inputs: batch.map(account => {
            // Check for common personal account patterns
            const hasRealNamePattern = /^[a-z]+[._][a-z]+$/i.test(account) || // e.g., john.doe, mary_smith
                                     /^[a-z]+\d{1,4}$/i.test(account) ||      // e.g., john123
                                     account.includes('_') ||                  // common in personal accounts
                                     /^[a-z]{3,}$/i.test(account);           // simple username

            const context = hasRealNamePattern ? 
              "This username follows common personal account patterns." :
              "Analyze this username's pattern.";

            return `Instagram username: "${account}". ${context} Question: Is this most likely a regular person's account used for personal social networking? Context: Regular people often use their name, variations of their name, or simple personal handles. They rarely use words like official, real, global, or business-related terms.`;
          }),
          parameters: {
            candidate_labels: [
              "regular personal social media account",
              "commercial, celebrity, or promotional account"
            ],
            multi_label: false
          }
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          console.log('Rate limit hit, waiting and retrying...');
          await new Promise(resolve => setTimeout(resolve, 5000));
          i -= BATCH_SIZE; // Retry this batch
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results = await response.json();
      
      // Handle both single result and array of results
      const resultArray = Array.isArray(results) ? results : [results];
      
      batch.forEach((account, index) => {
        const result = resultArray[index];
        
        if (!result || !result.labels || !result.scores) {
          console.error(`Invalid response format for account ${account}`);
          filteredAccounts.push(account); // Keep account if response is invalid
          return;
        }

        const personalIndex = result.labels.indexOf("regular personal social media account");
        const score = result.scores[personalIndex];

        // More lenient threshold for personal accounts
        // If it's even slightly more likely to be personal, keep it
        if (personalIndex !== -1 && score > 0.35) {
          console.log(`${account} identified as personal account (confidence: ${(score * 100).toFixed(1)}%)`);
          filteredAccounts.push(account);
        } else {
          console.log(`${account} identified as celebrity/business (confidence: ${((1 - score) * 100).toFixed(1)}%)`);
        }
      });

      // Add a small delay between batches to respect rate limits
      if (i + BATCH_SIZE < accounts.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

    } catch (error) {
      console.error(`Error processing batch:`, error);
      // Keep all accounts in the batch if there's an error
      filteredAccounts.push(...batch);
    }
  }

  console.log(`Filtering complete. Kept ${filteredAccounts.length} accounts out of ${accounts.length} total`);
  return filteredAccounts;
} 