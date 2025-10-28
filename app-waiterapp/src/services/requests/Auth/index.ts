import apiClient from '@/services/axios/config'

type SignInData = {
  email: string
  password: string
}

class AuthenticateServices {
  async signIn(body: SignInData) {
    const { data } = await apiClient.post('/auth/signin', body)

    return data
  }
  async refreshToken() {
    return await apiClient.patch('/auth/refresh')
  }
  async logout() {
    return await apiClient.post('/auth/logout')
  }
}

export const authenticateService = new AuthenticateServices()
