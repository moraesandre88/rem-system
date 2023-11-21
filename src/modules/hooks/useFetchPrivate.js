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

// import { useMemo } from "react";
// import useRefreshToken from "./useRefreshToken";
// import useGlobal from "./useGlobal";

// const useFetchPrivate = () => {
//   const { auth } = useGlobal();
//   const refresh = useRefreshToken();

//   const customFetch = useMemo(() => {
//     const requestIntercept = (url, options) => {
//       if (!options?.headers) {
//         options.headers = {};
//       }
//       options.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
//       return [url, options];
//     };

//     const responseIntercept = async (response) => {
//       if (response.status === 403) {
//         console.log("Original Response Status:", response.status);//
//         const newAccessToken = await refresh();
//         console.log("New Access Token:", newAccessToken);//
//         const updatedHeaders = new Headers(response.headers);
//         updatedHeaders.set("Authorization", `Bearer ${newAccessToken}`);
//         const clonedResponse = new Response(response.body, {
//           status: response.status,
//           statusText: response.statusText,
//           headers: updatedHeaders,
//         });
//         console.log("Cloned Response Status:", clonedResponse.status);//
//         return clonedResponse;
//       }
//       return response;
//     };

//     return async (url, options) => {
//       const [finalUrl, finalOptions] = requestIntercept(url, options);

//       console.log("Final URL:", finalUrl);//
//       console.log("Final Options:", finalOptions);//

//       return fetch(finalUrl, finalOptions)
//         .then(async (response) => {
//           const finalResponse = await responseIntercept(response);
//           console.log("Final Response Status:", finalResponse.status);//
//           return finalResponse;
//         });
//     };
//   }, [auth, refresh]);

//   return customFetch;
// };

// export default useFetchPrivate;
