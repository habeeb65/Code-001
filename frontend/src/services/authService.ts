
// Mock authentication service for demo purposes
export const authService = {
  login: async (credentials: any) => {
    console.log('Login attempt:', credentials);
    // Mock successful login
    return {
      data: {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: credentials.email,
          firstName: 'John',
          lastName: 'Doe',
          role: credentials.role
        }
      }
    };
  },

  register: async (userData: any) => {
    console.log('Register attempt:', userData);
    // Mock successful registration
    return {
      data: {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          schoolName: userData.schoolName
        }
      }
    };
  }
};
