'use server';
/**
 * @fileOverview A Genkit flow for extracting a clean song title from a YouTube video title.
 *
 * - extractSongTitleFromVideo - A function that extracts the song title from a video title.
 * - ExtractSongTitleFromVideoInput - The input type for the extractSongTitleFromVideo function.
 * - ExtractSongTitleFromVideoOutput - The return type for the extractSongTitleFromVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const ExtractSongTitleFromVideoInputSchema = z.object({
  videoTitle: z.string().describe('The full title of the YouTube video.'),
});
export type ExtractSongTitleFromVideoInput = z.infer<typeof ExtractSongTitleFromVideoInputSchema>;

// Define the output schema
const ExtractSongTitleFromVideoOutputSchema = z.object({
  songTitle: z.string().describe('The extracted clean song title.'),
});
export type ExtractSongTitleFromVideoOutput = z.infer<typeof ExtractSongTitleFromVideoOutputSchema>;

// Define the prompt
const extractSongTitlePrompt = ai.definePrompt({
  name: 'extractSongTitlePrompt',
  input: {schema: ExtractSongTitleFromVideoInputSchema},
  output: {schema: ExtractSongTitleFromVideoOutputSchema},
  prompt: `You are an expert at parsing YouTube video titles to extract clean song titles.
Given a YouTube video title, your task is to extract only the core song title, removing any extra information such as:
- Artist names (unless they are part of the song title itself, e.g., "Migos - Bad and Boujee" -> "Bad and Boujee")
- "Official Music Video", "Official Audio", "Lyric Video", "Live", "Remix", "Cover", "Feat." or "Featuring" tags, or similar descriptive terms.
- Parentheses, brackets, or other punctuation that encloses non-song title information (e.g., "(Official Video)", "[Lyrics]").
- Year information (e.g., "(2023)").
- Channel names or irrelevant text at the beginning or end of the title.

Focus on identifying and returning only the primary song title.

Example:
Input: "Artist Name - Song Title (Official Music Video) [4K]"
Output: "Song Title"

Example:
Input: "Song Title (feat. Another Artist) - Album Name"
Output: "Song Title"

Example:
Input: "My Awesome Song - Live Performance"
Output: "My Awesome Song"

Example:
Input: "The Weekend - Blinding Lights (Official Video)"
Output: "Blinding Lights"

Example:
Input: "Doja Cat - Paint The Town Red (Extended Version)"
Output: "Paint The Town Red"

Now, extract the song title from the following YouTube video title:

Video Title: {{{videoTitle}}}`,
});

// Define the flow
const extractSongTitleFromVideoFlow = ai.defineFlow(
  {
    name: 'extractSongTitleFromVideoFlow',
    inputSchema: ExtractSongTitleFromVideoInputSchema,
    outputSchema: ExtractSongTitleFromVideoOutputSchema,
  },
  async (input) => {
    const {output} = await extractSongTitlePrompt(input);
    return output!;
  }
);

// Export the wrapper function
export async function extractSongTitleFromVideo(input: ExtractSongTitleFromVideoInput): Promise<ExtractSongTitleFromVideoOutput> {
  return extractSongTitleFromVideoFlow(input);
}
