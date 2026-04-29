import axios from "axios"

    export const axiosInstance = axios.create({
  baseURL: "https://social-backend-kzy5.onrender.com",
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = config.headers ?? {}

  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"]
    delete config.headers["content-type"]
  } else {
    config.headers["Content-Type"] = "application/json"
  }

  return config
}, (error) => Promise.reject(error))

let isRefreshing = false
let pendingQueue = []

function resolveQueue(error, token = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  pendingQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (originalRequest?.url?.includes("/auth/refresh")) {
      logoutUser()
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem("refreshToken")

      if (!refreshToken) {
        logoutUser()
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(axiosInstance(originalRequest))
            },
            reject,
          })
        })
      }

      isRefreshing = true

      try {
        const refreshRes = await axios.post(
          "https://social-backend-kzy5.onrender.com/auth/refresh",
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        )

        const newAccessToken = refreshRes.data?.accessToken
        if (!newAccessToken) {
          logoutUser()
          return Promise.reject(error)
        }

        localStorage.setItem("accessToken", newAccessToken)
        resolveQueue(null, newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        resolveQueue(refreshError, null)
        logoutUser()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export function logoutUser() {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  window.location.href = "/login"
}