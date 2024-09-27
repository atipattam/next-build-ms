export const requestInterceptor = async (url, options) => {
  // Example: Add Authorization header
  // eslint-disable-next-line no-param-reassign
  options.headers = {
    ...options.headers,
    Authorization: 'Bearer your-token-here',
  }

  return { url, options }
}

export const responseInterceptor = async (response) => {
  // Example: Handle specific status codes
  if (response.status === 401) {
    // Handle unauthorized access (e.g., redirect to login)
    console.error('Unauthorized! Redirecting to login.')
  }

  return response
}
