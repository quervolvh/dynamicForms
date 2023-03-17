import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { change } from 'utils';
import 'assets/styles/main.scss';
import { SetClientAvailability } from 'hooks/useIsClient';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [state, setState] = useState({
    clientMode: false
  });

  const { clientMode } = state;

  const currentPath = router.pathname.trim();

  const unProtectedRoutes: string[] = ["", "/"];

  const redirectCondition = ![...unProtectedRoutes].includes(currentPath);

  useEffect(() => {

    if (![...unProtectedRoutes, "/404", "/500"].includes(currentPath)) {
      router.replace("/");
    }

    //eslint-disable-next-line
  }, [redirectCondition]);

  SetClientAvailability((e) => change(e, "clientMode", setState));

  return (
    <>
      {
        (redirectCondition || !clientMode) ?

          <> </>

          :

          <>

            <Component
              {...pageProps}
              clientMode={clientMode}
            />

          </>
      }

    </>
  );

}

export default App;
