import { TestHelpers } from '@awell-health/extensions-core'

import { createVisitNote as action } from './createVisitNote'
import { ZodError } from 'zod'
import { createVisitNoteExample } from '../../__mocks__/constants'

jest.mock('../../client')

describe('Elation - Create Visit Note', () => {
  const {
    extensionAction: createVisitNote,
    onComplete,
    onError,
    helpers,
    clearMocks,
  } = TestHelpers.fromAction(action)

  const settings = {
    client_id: 'clientId',
    client_secret: 'clientSecret',
    username: 'username',
    password: 'password',
    auth_url: 'authUrl',
    base_url: 'baseUrl',
  }

  beforeEach(() => {
    clearMocks()
  })

  test('Should call onComplete when successful', async () => {
    await createVisitNote.onEvent({
      payload: {
        fields: createVisitNoteExample,
        settings,
      } as any,
      onComplete,
      onError,
      helpers,
    })

    expect(onComplete).toHaveBeenCalledWith({
      data_points: {
        visitNoteId: '1',
      },
    })
    expect(onError).not.toHaveBeenCalled()
  })

  test('Should call onError when required fields are missing', async () => {
    const resp = createVisitNote.onEvent({
      payload: {
        fields: {
          patientId: 123,
        },
        settings,
      } as any,
      onComplete,
      onError,
      helpers,
    })

    await expect(resp).rejects.toThrow(ZodError)
    expect(onComplete).not.toHaveBeenCalled()
  })

  test('Should call onError when no patientId is provided and name is invalid format', async () => {
    const resp = createVisitNote.onEvent({
      payload: {
        fields: {
          ...createVisitNoteExample,
          patientId: 'invalid',
        },
        settings,
      } as any,
      onComplete,
      onError,
      helpers,
    })

    await expect(resp).rejects.toThrow(ZodError)
    expect(onComplete).not.toHaveBeenCalled()
  })
})
