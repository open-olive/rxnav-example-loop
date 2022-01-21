import { ui, React, ReactWhisper } from '@oliveai/ldk';

import RxNavClient, { DrugProperties } from './aptitudes/network/RxNavClient';
import { SearchResultWhisper, StartupWhisper } from './whispers';
import { searchHandler, openHandler } from '.';

// Mock out LDK, our RxNavClient, and the React element renderer
// Note: The LDK mock doesn't cover React because it's not a part of the LDK code itself. This is only necessary for code using ReactWhisper.renderNewWhisper()
jest.mock('@oliveai/ldk');
jest.mock('./aptitudes/network/RxNavClient');
React.createElement = jest.fn();

describe('index', () => {
  it('should start listeners and fetch drug display names on startup', async () => {
    // eslint-disable-next-line global-require
    await require('.');

    expect(ui.listenGlobalSearch).toBeCalled();
    expect(ui.listenSearchbar).toBeCalled();
    expect(ui.loopOpenHandler).toBeCalled();
  });

  describe('searchHandler', () => {
    it('should do nothing if the name searched has no matches', async () => {
      await searchHandler('foo');

      expect(ReactWhisper.renderNewWhisper).not.toBeCalled();
    });

    it('should do open the Search Result Whisper if matches are found', async () => {
      RxNavClient.getDrugsByName = jest.fn().mockResolvedValueOnce([{ name: 'foo' }]);

      await searchHandler('foo');

      expect(ReactWhisper.renderNewWhisper).toBeCalledWith(
        <SearchResultWhisper searchText="foo" searchResults={[{ name: 'foo' } as DrugProperties]} />
      );
    });
  });

  describe('openHandler', () => {
    it('should open the Startup Whisper', () => {
      openHandler();

      expect(ReactWhisper.renderNewWhisper).toBeCalledWith(
        <StartupWhisper searchHandler={searchHandler} />
      );
    });
  });
});
