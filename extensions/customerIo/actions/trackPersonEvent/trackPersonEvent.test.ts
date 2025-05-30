import { TestHelpers } from '@awell-health/extensions-core'
import { trackPersonEvent } from '.'
import { CustomerioTrackApiClient } from '../../lib/api/trackApiClient'
import { createAxiosError, generateTestPayload } from '../../../../tests'

jest.mock('../../lib/api/trackApiClient')

describe('Customer.io - Track person event', () => {
  const { onComplete, onError, helpers, extensionAction, clearMocks } =
    TestHelpers.fromAction(trackPersonEvent)

  const mockTrackPersonEvent = jest.fn()

  beforeEach(() => {
    clearMocks()
    jest.clearAllMocks()
  })

  beforeAll(() => {
    const mockedCustomerioTrackApiClient = jest.mocked(CustomerioTrackApiClient)
    mockedCustomerioTrackApiClient.mockImplementation(() => {
      return {
        trackPersonEvent: mockTrackPersonEvent,
      } as unknown as CustomerioTrackApiClient
    })
  })

  describe('Successful event tracking', () => {
    beforeEach(() => {
      mockTrackPersonEvent.mockResolvedValue({})
    })

    test('Should call the onComplete callback', async () => {
      await extensionAction.onEvent({
        payload: generateTestPayload({
          fields: {
            eventName: 'test',
            identifierValue: 'test@example.com',
            personIdentifierType: 'email',
            attributes: JSON.stringify({
              hello: 'world',
            }),
          },
          pathway: {
            id: 'care-flow-id',
            definition_id: 'care-flow-definition-id',
          },
          patient: {
            id: 'patient-id',
            profile: {
              identifier: [
                {
                  system:
                    'http://terminology.hl7.org/ValueSet-identifier-type.html',
                  value: 'test@example.com',
                },
                {
                  system: 'http://medplum.com',
                  value: '123',
                },
              ],
            },
          },
          activity: {
            id: 'activity-id',
          },
          settings: {
            siteId: 'siteId',
            apiKey: 'apiKey',
          },
        }),
        onComplete,
        onError,
        helpers,
      })

      expect(mockTrackPersonEvent).toHaveBeenCalledWith({
        type: 'person',
        action: 'event',
        name: 'test',
        identifiers: {
          email: 'test@example.com',
        },
        attributes: {
          _awell_careflow_id: 'care-flow-id',
          _awell_careflow_definition_id: 'care-flow-definition-id',
          _awell_patient_id: 'patient-id',
          _awell_activity_id: 'activity-id',
          '_awell_identifier_http://terminology.hl7.org/ValueSet-identifier-type.html':
            'test@example.com',
          '_awell_identifier_http://medplum.com': '123',
          hello: 'world',
        },
      })

      expect(onError).not.toHaveBeenCalled()
      expect(onComplete).toHaveBeenCalled()
    })
  })

  describe('Failed event tracking', () => {
    beforeEach(() => {
      mockTrackPersonEvent.mockRejectedValue(
        createAxiosError(
          400,
          'Bad Request',
          JSON.stringify({
            errors: [
              {
                reason: 'string',
                field: 'string',
                message: 'string',
              },
            ],
          }),
        ),
      )
    })

    test('Should throw an error', async () => {
      expect(
        extensionAction.onEvent({
          payload: generateTestPayload({
            fields: {
              eventName: 'test',
              identifierValue: 'test@example.com',
              personIdentifierType: 'email',
            },
            settings: {
              siteId: 'siteId',
              apiKey: 'apiKey',
            },
          }),
          onComplete,
          onError,
          helpers,
        }),
      ).rejects.toThrow()
    })
  })
})
