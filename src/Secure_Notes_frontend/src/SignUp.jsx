import React from 'react';
import { Helmet } from 'react-helmet';
import { useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

export default function SignUp() {
   const navigate = useNavigate(); // Initialize navigate function

   async function handleConnect() {
      const authClient = await AuthClient.create();
      authClient.login({
         maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
         identityProvider: "https://identity.ic0.app/#authorize",
         onSuccess: async () => {
            toast.success('Logged In Successfully.', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
            });
            // Navigate to '/First' when successfully logged in
            navigate('/Home');
         },
      });
   }

   return (
      <>
         <Helmet>
            <title>Student_results_ICP</title>
            {/* Add other meta tags as needed */}
         </Helmet>

         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />

         <div>
            <h1></h1>
            <button onClick={handleConnect} id='ConnectBtn'>Connect</button>
         </div>
         <div>
         <ul>
          <li> <b>Connect to Internet Identity</b> and write your notes <br /> Secure your data by using this </li><br /><br />
          
          </ul>


         </div>
      </>
   );
}

