import { AuthService } from './../hooks/auth-service';

export const AuthProvider = ({ children }) => {
  const { isAuthenticated } = AuthService();

  // if (isAuthenticated()) {
  return <>{children}</>;
  // } else {
  //   location.href = '/login';
  // }
};
