import { React } from '@oliveai/ldk';

import { DrugProperties } from '../aptitudes/network/RxNavClient';
import DrugResult from '../components/DrugResult';

// Expect the search term and results to be given as props for rendering
interface SearchResultWhisperProps {
  searchText: string;
  searchResults: DrugProperties[];
}
function SearchResultWhisper({ searchText, searchResults }: SearchResultWhisperProps) {
  const NUM_UNCOLLAPSED_RESULTS = 3;

  return (
    <oh-whisper
      label={`RxNav Drug Lookup - ${searchResults.length} results for "${searchText}"`}
      onClose={null}
    >
      {searchResults.slice(0, NUM_UNCOLLAPSED_RESULTS).map((drug, i) => (
        // Custom component used to render each result
        <DrugResult key={drug.rxcui} drug={drug} divider={i > 0} />
      ))}
      {searchResults.length > NUM_UNCOLLAPSED_RESULTS && (
        // If we have more than NUM_UNCOLLAPSED_RESULTS (3) results, wrap the rest in a closed collapse box
        <oh-collapse-box open={false}>
          {searchResults.slice(NUM_UNCOLLAPSED_RESULTS).map((drug) => (
            <DrugResult key={drug.rxcui} drug={drug} />
          ))}
        </oh-collapse-box>
      )}
    </oh-whisper>
  );
}

export default SearchResultWhisper;
