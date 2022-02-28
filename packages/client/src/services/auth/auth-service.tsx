import React, { useEffect, useState } from 'react'
import openLoginConnector from '../../lib/web3-auth/open-login-connector'

export const useAuthService = () => {
  //TODO : Create this loader in the app context
  const [isLoading, setLoading] = useState<boolean>(true);
  const [authProvider, setAuthProvider] = useState<any>()
  useEffect(() => {
    mountAuth()
  }, [])

  const mountAuth = async () => {
    setLoading(true);

    try {
      const newAuthProvider = await openLoginConnector.getProvider("development")
      setAuthProvider(newAuthProvider)
    } catch(error) {
      console.log('Error mounting the auth service')
    }
  } 

  const login = async (redirectUrl) => {

    setLoading(true);
    try {
      const loginProvider = "google"

      await authProvider.login({
        loginProvider,
        redirectUrl,
      });
    } catch {
      setLoading(false);
    }
  }

  const onLogout = async () => {

    setLoading(true);
    try {
      await authProvider.logout({});
    } finally {
      setLoading(false);
    }
  };


  return {
    login,
    onLogout
  }
}

