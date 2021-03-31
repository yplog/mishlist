import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [user, setUser] = useState(null);

  const login = useCallback((token, user, expirationDate) => {
    setToken(token);
    setUser(user);

    const tokenExpirationTime = new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationTime);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        user: user,
        expiration: expirationDate || tokenExpirationTime.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUser(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      storedData.user &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.token, storedData.user, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, user, logout, login };
};
