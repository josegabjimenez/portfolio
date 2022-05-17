import React, { useEffect } from 'react';
import Link from 'next/link';

// Auth
import { auth, logOut } from '@firebase/index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

const Admin = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      logOut();
      router.push('/admin/auth');
    }
  }, [user]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <Link href="/">
        <button>Home</button>
      </Link>
      <h1>Admin</h1>
      <button onClick={() => logOut()}>Logout</button>
    </main>
  );
};

export default Admin;
