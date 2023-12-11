import useRefreshToken from "./useRefreshToken";
import useGlobal from "./useGlobal";

const useFetchPrivate = () => {
  const { auth } = useGlobal();
  const refresh = useRefreshToken();

  const requestIntercept = (url, options) => {
    console.log(url);
    console.log(options);
    if (!options?.headers) {
      options.headers = {};
    }
    options.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
    console.log(options);
    return [url, options];
  };

  const responseIntercept = async (response) => {
    if (response.status === 403) {
      const newAccessToken = await refresh();
      const updatedHeaders = new Headers(response.headers);
      updatedHeaders.set("Authorization", `Bearer ${newAccessToken}`);
      const clonedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: updatedHeaders,
      });
      return clonedResponse;
    }
    return response;
  };

  const originalFetch = fetch;

  const customFetch = (url, options) => {
    [url, options] = requestIntercept(url, options);
    return originalFetch(url, options).then(async (response) => {
      response = await responseIntercept(response);
      return response;
    });
  };

  return customFetch;
};

export default useFetchPrivate;
