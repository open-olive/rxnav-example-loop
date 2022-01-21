import { ui, React, ReactWhisper } from '@oliveai/ldk';

import RxNavClient from './aptitudes/network/RxNavClient';
import { SearchResultWhisper, StartupWhisper } from './whispers';

// The function called with a search is done through Olive Helps's search bar, omnibar, or the search field built in this loop's startup whisper
export const searchHandler = async (searchText: string) => {
  // Call the RxNav API to see if our search text has any matches to drugs by name
  const searchResults = await RxNavClient.getDrugsByName(searchText);
  if (searchResults) {
    // If we have any matches, open the Search Result Whisper and pass in props for rendering
    ReactWhisper.renderNewWhisper(
      <SearchResultWhisper searchText={searchText} searchResults={searchResults} />
    );
  }
};

// The function called when the loop is told to "open" through installation or being selected in the Olive Helps dropdown menu.
export const openHandler = () => {
  // Open the Startup Whisper, providing our search handler as a prop to be used by the search input field shown.
  ReactWhisper.renderNewWhisper(<StartupWhisper searchHandler={searchHandler} />);
};

// Any code wrapped in this anonymous function will be executed on startup.
(async () => {
  // Tell Olive Helps what to do with search text provided to the omnibar (what opens when you press CMD/CTRL + O)
  ui.listenGlobalSearch(searchHandler);

  // Tell Olive Helps what to do with search text provided to the header search bar
  ui.listenSearchbar(searchHandler);

  // Tell Olive Helps what to do when the loop is installed or selected in the header search bar dropdown
  ui.loopOpenHandler(openHandler);
})();
