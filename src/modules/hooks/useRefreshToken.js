import useGlobal from './useGlobal'

const useRefreshToken = () => {
    const {setAuth} = useGlobal();

    const refresh = async () => {
        const response = await fetch("http://localhost:3500/refresh", {
            method: "GET",
            credentials: "include"
        });
        const responseData = await response?.json();
        setAuth(prev => {
            return {...prev, accessToken: responseData.accessToken}
        });
        return responseData.accessToken;
    }
  return refresh
}

export default useRefreshToken