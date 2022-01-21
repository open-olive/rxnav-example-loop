import { React } from '@oliveai/ldk';
import { create, act } from 'react-test-renderer';

import StartupWhisper from './StartupWhisper';

describe('StartupWhisper', () => {
  it('should render correctly', () => {
    // Use the test renderer to create a tree object that can be snapshot
    const component = create(<StartupWhisper searchHandler={() => null} />);

    // Take advantage of Jest's snapshot feature to ensure the component renders correctly between changes
    // If the component renders differently, the snapshot will fail
    expect(component).toMatchSnapshot();
  });

  it('should call searchHandler with the correct search term', () => {
    const searchHandler = jest.fn();

    // Do some handler triggering to simulate the user typing in the search bar then clicking the button
    const component = create(<StartupWhisper searchHandler={searchHandler} />);
    act(() => component.root.findByType('oh-text-input').props.onChange(undefined, 'foo'));
    act(() => component.root.findByType('oh-button').props.onClick());

    // Make sure our handler is triggered as expected with the updated values coming from user interaction
    expect(searchHandler).toBeCalledWith('foo');
  });
});
