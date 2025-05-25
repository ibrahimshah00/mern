export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null, // this will hold user data like id, name, etc.
  });

  const login = (userData) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
    });
    localStorage.setItem('authToken', userData.token);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
