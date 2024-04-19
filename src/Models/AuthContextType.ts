import React from 'react';

type AuthContextType = {
  auth?: { email?: string; accessToken: string } | object;
  setAuth: React.Dispatch<React.SetStateAction<object>>;
};

export default AuthContextType;
