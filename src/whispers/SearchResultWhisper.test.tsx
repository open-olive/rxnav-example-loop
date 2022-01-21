import { React } from '@oliveai/ldk';
import { create } from 'react-test-renderer';

import SearchResultWhisper from './SearchResultWhisper';

describe('SearchResultWhisper', () => {
  // Create a quick dummy array of search results for all tests
  const mockSearchResults = Array.from(Array(10).keys(), (_, i) => ({
    name: `foo ${i + 1}`,
    synonym: 'Synonym',
    rxcui: `RXCUI${i + 1}`,
    tty: 'TTY',
    language: 'Language',
    suppress: 'Suppress',
    umlscui: '',
  }));

  it('should render correctly for less than four results', () => {
    const component = create(
      <SearchResultWhisper searchText="foo" searchResults={mockSearchResults.slice(0, 3)} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should render correctly for four or more results', () => {
    const component = create(
      <SearchResultWhisper searchText="foo" searchResults={mockSearchResults} />
    );

    expect(component).toMatchSnapshot();
  });
});
