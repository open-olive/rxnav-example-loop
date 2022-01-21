import { React } from '@oliveai/ldk';
import { stripIndent } from 'common-tags';

// Expect a search handler prop that is the same function used to handle search text from Olive Helps
interface StartupWhisperProps {
  searchHandler: (searchTerm: string) => void;
}
function StartupWhisper({ searchHandler }: StartupWhisperProps) {
  // When creating JSX Whispers, we can use React hooks too!
  const [searchTerm, updateSearchTerm] = React.useState('');

  // Some text for our markdown components to keep the JSX code cleaner
  // stripIndent is a util commonly used to make sure markdown renders as expected
  const headerBody = stripIndent`
    # Look up 194,000+ unique drug names.
    Enter a drug name to find strength, formulation, RXCUI, synonyms, and more (ex. \`Cymbalta\`).
  `;
  const footerBody = stripIndent`
    _This data is powered by the U.S. National Library of Medicine._

    _Please do not search for patient health information as all data searched in this Loop will be sent to the API source._
  `;

  // Return JSX just like in React, but using Whisper-specific components. See: https://docs.oliveai.dev/aptitudes/whisper/jsx-whispers
  return (
    <oh-whisper label="RxNav Drug Lookup" onClose={null}>
      <oh-markdown body={headerBody} />
      <oh-text-input
        label="Search by drug name"
        onChange={(_, val) => {
          // Updating state is identical to standard React
          updateSearchTerm(val);
        }}
      />
      <oh-button
        label="Search"
        onClick={() => {
          // Trigger the search handler with text from the text input field
          searchHandler(searchTerm);
        }}
      />
      <oh-divider />
      <oh-markdown body={footerBody} />
    </oh-whisper>
  );
}

export default StartupWhisper;
