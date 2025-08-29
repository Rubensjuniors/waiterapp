import { RefreshTokenController } from '.'

export function makeRefreshController() {
  const refreshTokenController = new RefreshTokenController()

  return refreshTokenController
}
