import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const App = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/Home');
    //router.replace('/result');
  }, []);

  return null;
};

export default App;
