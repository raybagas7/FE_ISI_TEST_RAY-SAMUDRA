'use client';

import { setUser } from '@/slices/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function AuthInitializer({ session }: { session: any }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(setUser(session.user));
    }
  }, [session, dispatch]);

  return null;
}
