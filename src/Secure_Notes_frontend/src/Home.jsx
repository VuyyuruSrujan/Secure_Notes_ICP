
import { useState } from "react";
import { Secure_Notes_backend } from 'declarations/Secure_Notes_backend';

function Home() {
    const [showAddNote, setShowAddNote] = useState(false);

    async function SubmitCont() {
        var title = document.getElementById('title').value;
        var content = document.getElementById('contentBox').value;
        var DateAndTime = new Date().toString();
        var caller = await Secure_Notes_backend.GetPrincipal();
         console.log("DateAndTime", DateAndTime);
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
                <button onClick={toggleAddNote} id="AddNotedBtn">Add New Note +</button>
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
        </div>
    );
}

export default Home;
