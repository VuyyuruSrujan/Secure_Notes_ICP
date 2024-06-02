import { useState, useEffect } from "react";
import { Secure_Notes_backend } from 'declarations/Secure_Notes_backend';
import { AuthClient } from "@dfinity/auth-client";

function Titles(){
    var [Data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
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

    useEffect(() => {
        async function getAllData(){
            if (identity) {
                try {
                    const Principal = identity.getPrincipal();
                    const allData = await Secure_Notes_backend.getDataByPrincipal(Principal);
                    setData(allData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }
        getAllData();
    }, [identity]);

    function handleTitleClick(item) {
        setSelectedItem(item);
    }

    return(
        <div>
            <div id="titles">
              <h3>Click on the title you want to refer</h3>
                {Data.length === 0 ? (
                    <p id="AddAnyNotes">Add any notes</p>
                ) : (
                    Data.map((Id,index) => (
                    <div key={index} onClick={() => handleTitleClick(Id)}>
                    <p id="TitlesBox">{index+1}.{Id.Title},<sub id="dataTime">Added on {new Date(Id.DateAndTime).toLocaleString([], { timeZone: 'UTC', month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</sub></p>
                    </div>
                )
                )) }
            </div> 
            <div>
              {selectedItem && (
                <div id="Discontent">
                  <h2><h4>Title:</h4><p id="disTit">{selectedItem.Title}</p></h2>
                  <p><p id="ContentText">Content:</p><p id="rendCont">{selectedItem.Content}</p></p>
                </div>
              )}
            </div>
        </div>
    );
}

export default Titles;


