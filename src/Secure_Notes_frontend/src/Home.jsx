
import { useState , useEffect } from "react";
import { Secure_Notes_backend } from 'declarations/Secure_Notes_backend';
import Titles from "./Titles";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthClient } from "@dfinity/auth-client";

function Home() {
    const [showAddNote, setShowAddNote] = useState(false);

    const [identity, setIdentity] = useState(null);

    async function handleConnect() {
        const authClient = await AuthClient.create();
        if (identity !== null) {
            authClient.logout();
            setIdentity(null);
            toast.info('Logged Out Successfully.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            authClient.login({
                maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
                identityProvider: "https://identity.ic0.app/#authorize",
                onSuccess: async () => {
                    setIdentity(await authClient.getIdentity());
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
                },
            });
        }
    }

    useEffect(() => {
        async function init() {
            const authClient = await AuthClient.create();
            if (await authClient.isAuthenticated()) {
                setIdentity(await authClient.getIdentity());
            }
        }
        init();
    }, []);

    async function SubmitCont() {
        var title = document.getElementById('title').value;
        var content = document.getElementById('contentBox').value;
        var DateAndTime = new Date().toString();
        // console.log("DateAndTime", DateAndTime);
        // var caller = await Secure_Notes_backend.GetPrincipal();
           var caller = identity.getPrincipal();
        if(title!= "" && content!= "" && DateAndTime!=""){
        var result = {
            Id: 0,
            Title: title,
            Content: content,
            DateAndTime:DateAndTime,
            creator: caller,
        };
        var send = await Secure_Notes_backend.InsertData(result);
        console.log("after pushing", send);

        var gettingById = await Secure_Notes_backend.getDataById(send);
        console.log("getting by id", gettingById);
        toast.success('successfully inserted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });

    }else{
        toast.warn('fill all the data.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
    }
};
    const toggleAddNote = () => {
        setShowAddNote(!showAddNote);
        if (!showAddNote) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    };

    const handleCloseModal = (e) => {
        if (e.target.className.includes('modal')) {
            setShowAddNote(false);
            document.body.classList.remove('modal-open');
        }
    };

    return (
        <div>
            <div className={`main-content ${showAddNote ? 'blur' : ''}`}>
                <button onClick={toggleAddNote} id="AddNotedBtn">Add New Note +</button><br /><br/>
            </div>
            {showAddNote &&
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content">
                        <label>Title:</label>
                        <input type="text" id="title" required /><br /><br />

                        <label id="ContText">Content:</label>
                        <textarea id="contentBox" required></textarea><br /><br />

                        {/* <label>attach images(if you want):</label>
                        <input type="file" id="images" accept="image/*" required /><br /><br /> */}

                        <button onClick={SubmitCont} id="DetSubmitBtn"> Submit </button>
                    </div>
                </div>
            }
            <Titles />

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

        </div>
    );
}

export default Home;
