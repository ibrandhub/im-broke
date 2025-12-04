import { updateProfile } from 'api/user';

export function useProfile(userId) {
  const handleSubmitProofile = async ({ name, password }) => {
    try {
      const response = await updateProfile({ userId, name, password });
      return response;
    } catch (error) {
      console.error('Error updating profile', error);
      throw error;
    }
  };

  return {
    handleSubmitProofile
  };
}
