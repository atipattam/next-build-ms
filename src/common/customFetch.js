// eslint-disable-next-line default-param-last
export const useFetch = async (url, options = {}, requestInterceptor, responseInterceptor) => {
  // Request Interceptor
  let myUrl = null
  let myOptions = null

  if (requestInterceptor) {
    const modifiedRequest = await requestInterceptor(url, options)
    myUrl = process.env.NEXT_PUBLIC_API_URL + modifiedRequest.url
    myOptions = modifiedRequest.options
  }

  // Perform the fetch request
  const response = await fetch(myUrl, myOptions)

  // Response Interceptor
  if (responseInterceptor) {
    return responseInterceptor(response)
  }

  return response
}
