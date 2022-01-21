import { React } from '@oliveai/ldk';
import { Direction, JustifyContent, StyleSize, Urgency } from '@oliveai/ldk/dist/whisper';

import { DrugProperties } from '../aptitudes/network/RxNavClient';

// Expect a single drug result and whether or not to show a divider
interface DrugResultProps {
  drug: DrugProperties;
  divider?: boolean;
}
function DrugResult({ drug, divider = true }: DrugResultProps) {
  // Define which drug properties we're looking for and what the label should be for each
  // Typescript magic to enforce that keys here should match keys defined in the RxNav API type
  const drugProperties: Partial<Record<keyof DrugProperties, string>> = {
    synonym: 'Synonym',
    rxcui: 'RXCUI',
    tty: 'TTY',
    language: 'Language',
    suppress: 'Suppress',
  };

  // Each drug result should be a box with the drug's name as a message and a list of properties with copyable values
  // The box is to make sure each result renders properly regardless of whether or not they are in a collapse box
  return (
    <oh-box direction={Direction.Vertical} justifyContent={JustifyContent.Left}>
      {divider && <oh-divider layout={{ paddingBottom: StyleSize.Small }} />}
      <oh-message header={drug.name} />
      {
        // Loop through every key/label defined above and try to render a list pair for each
        Object.entries(drugProperties).map(
          // Some more Typescript magic to let it know to expect each key to match a key from the DrugProperties type
          ([key, label]: [keyof DrugProperties, string]) =>
            // If the drug has a value for the property, render a copyable list pair for it. If not, don't render anything.
            drug[key] && (
              <oh-list-pair
                key={key}
                label={label}
                value={drug[key]}
                style={Urgency.None}
                copyable
              />
            )
        )
      }
    </oh-box>
  );
}

export default DrugResult;
