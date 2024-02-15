// import { defineStore } from 'pinia'
// import * as auth from '@/apis/auth/index'
import type { UseFetchOptions } from 'nuxt/app'

export default function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {}
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl

  const token = useCookie('token')
  if (token.value != null) {
    headers['Authorization'] = "Bearer " + token.value as string
  }

  // if (process.server) {
  //   headers = {
  //     ...headers,
  //   }
  // }

  return useFetch(baseUrl + path, {
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    }
  })
}