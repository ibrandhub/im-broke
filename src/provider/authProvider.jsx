import { AuthService } from './../hooks/auth-service';

export const AuthProvider = ({ children }) => {
  const { isAuthenticated } = AuthService();

  console.log('isAuthenticated', isAuthenticated());

  if (isAuthenticated()) {
    return <>{children}</>;
  } else {
    location.href = '/login';
  }
};
