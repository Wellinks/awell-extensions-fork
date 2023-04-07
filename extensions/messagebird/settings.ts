import { type Setting } from '../../lib/types'

export const settings = {
  apiKey: {
    label: 'API Key',
    key: 'apiKey',
    obfuscated: true,
    required: true,
    description:
      'Enter an API key so Awell can communicate with the MessageBird API.',
  },
  reportUrl: {
    label: 'Report URL',
    key: 'reportUrl',
    obfuscated: false,
    required: false,
    description:
      'The URL for delivery of status reports for messages. Must be HTTPS.',
  },
} satisfies Record<string, Setting>