import { UserLogin } from '../interfaces/UserLogin';

export const login = async (userData: UserLogin) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
}; 