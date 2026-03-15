import { runtimeEnv } from '@/lib/env'

export const isPayloadEnabled = runtimeEnv.hasDatabase && runtimeEnv.dataMode !== 'mock'

export const getPayloadClient = async () => {
  if (!isPayloadEnabled) {
    return null
  }

  const [{ getPayload }, configModule] = await Promise.all([
    import('payload'),
    import('../../payload.config')
  ])

  return getPayload({
    config: configModule.default
  })
}
