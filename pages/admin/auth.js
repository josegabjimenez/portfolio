import React, { useEffect } from 'react';
import { auth, githubSignIn, logOut } from '@firebase/index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? router.push('/admin') : logOut();
    }
  }, [user]);

  return (
    <main>
      <h1>Auth</h1>
      <button onClick={() => githubSignIn()}>Github</button>
      {/* <SyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} /> */}
    </main>
  );
};

export default Auth;
