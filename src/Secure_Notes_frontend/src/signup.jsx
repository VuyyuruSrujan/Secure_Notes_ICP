import React, { useEffect, useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';

const SignUp = () => {
  const [iiUrl, setIiUrl] = useState('');
  const [principal, setPrincipal] = useState('');

  const webappId = process.env.CANISTER_ID_INTERNET_IDENTITY;

  const webappIdl = ({ IDL }) => {
    return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ['query']) });
  };

  useEffect(() => {
    let url;
    if (process.env.DFX_NETWORK === 'local') {
      url = `http://localhost:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`;
    } else if (process.env.DFX_NETWORK === 'ic') {
      url = `https://${process.env.CANISTER_ID_INTERNET_IDENTITY}.ic0.app`;
    } else {
      url = `https://${process.env.CANISTER_ID_INTERNET_IDENTITY}.dfinity.network`;
    }
    setIiUrl(url);
  }, []);

  const handleLogin = async () => {
    const authClient = await AuthClient.create();

    await new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: iiUrl,
        onSuccess: resolve,
        onError: reject,
      });
    });

    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    const webapp = Actor.createActor(webappIdl, {
      agent,
      canisterId: webappId,
    });

    const principal = await webapp.whoami();
    setPrincipal(principal.toText());
  };

  return (
    <div>
      <header>
        <img src="logo2.svg" alt="DFINITY logo" />
      </header>
      <main>
        <form>
          <button type="button" onClick={handleLogin}>Login!</button>
        </form>
        {principal && (
          <section id="principal">
            <p>Your Principal ID: {principal}</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default SignUp;
