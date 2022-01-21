import { network } from '@oliveai/ldk';

import RxNavClient, { ResponseBody } from './RxNavClient';

describe('RxNavClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns results formatted correctly', async () => {
    // Grab a response from the API itself and use it as mock data
    const mockResponse: ResponseBody = {
      drugGroup: {
        name: null,
        conceptGroup: [
          {
            tty: 'TTY1',
          },
          {
            tty: 'TTY2',
            conceptProperties: [
              {
                rxcui: '153008',
                name: 'ibuprofen 200 MG Oral Tablet [Advil]',
                synonym: 'Advil 200 MG Oral Tablet',
                tty: 'TTY2',
                language: 'ENG',
                suppress: 'N',
                umlscui: '',
              },
              {
                rxcui: '206878',
                name: 'ibuprofen 20 MG/ML Oral Suspension [Advil]',
                synonym: 'Advil 20 MG/ML Oral Suspension',
                tty: 'TTY2',
                language: 'ENG',
                suppress: 'N',
                umlscui: '',
              },
            ],
          },
          {
            tty: 'TTY3',
            conceptProperties: [
              {
                rxcui: '153008',
                name: 'ibuprofen 200 MG Oral Tablet [Advil]',
                synonym: 'Advil 200 MG Oral Tablet',
                tty: 'TTY3',
                language: 'ENG',
                suppress: 'N',
                umlscui: '',
              },
            ],
          },
        ],
      },
    };
    const body = await network.encode(JSON.stringify(mockResponse));
    network.httpRequest = jest.fn().mockResolvedValue({
      statusCode: 200,
      body,
    });

    const result = await RxNavClient.getDrugsByName('test');

    const expected = [
      {
        rxcui: '153008',
        name: 'ibuprofen 200 MG Oral Tablet [Advil]',
        synonym: 'Advil 200 MG Oral Tablet',
        tty: 'TTY2',
        language: 'ENG',
        suppress: 'N',
        umlscui: '',
      },
      {
        rxcui: '206878',
        name: 'ibuprofen 20 MG/ML Oral Suspension [Advil]',
        synonym: 'Advil 20 MG/ML Oral Suspension',
        tty: 'TTY2',
        language: 'ENG',
        suppress: 'N',
        umlscui: '',
      },
      {
        rxcui: '153008',
        name: 'ibuprofen 200 MG Oral Tablet [Advil]',
        synonym: 'Advil 200 MG Oral Tablet',
        tty: 'TTY3',
        language: 'ENG',
        suppress: 'N',
        umlscui: '',
      },
    ];

    expect(result).toEqual(expected);
  });

  it('returns null if the response is not 200', async () => {
    network.httpRequest = jest.fn().mockResolvedValue({
      statusCode: 404,
    });

    const result = await RxNavClient.getDrugsByName('test');

    expect(result).toBeNull();
  });

  it('returns null if the response is not JSON', async () => {
    network.httpRequest = jest.fn().mockResolvedValue({
      statusCode: 200,
      body: 'not json',
    });

    const result = await RxNavClient.getDrugsByName('test');

    expect(result).toBeNull();
  });

  it('returns null if network request throws an error', async () => {
    network.httpRequest = jest.fn().mockRejectedValue(new Error('test'));

    const result = await RxNavClient.getDrugsByName('test');

    expect(result).toBeNull();
  });
});
