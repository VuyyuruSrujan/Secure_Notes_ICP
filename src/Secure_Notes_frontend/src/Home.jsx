import { useState } from "react";
import { Secure_Notes_backend } from 'declarations/Secure_Notes_backend';

function Home(){
    async function SubmitCont(){
      // var [Data , setData] = useState([]);
      var title = document.getElementById('title').value;
      var content = document.getElementById('content').value;
      var image = document.getElementById('images').value;

      var caller = await Secure_Notes_backend.GetPrincipal();
      var result = {
        Id:0,
        Title:title,
        Content:content,
        image:(new Uint8Array(image)),
        creator:caller,
      };

      var send = await Secure_Notes_backend.InsertData(result);
      console.log("after pushing",send);

      var gettingById = await Secure_Notes_backend.getDataById(send);
      console.log("getting by id",gettingById);
     }

    return(
      <div>
        <div>
            <label>Title:</label>
            <input type="text" id="title" required />

            <label>Content:</label>
            <input type="text" id="content" required />
            
            <label>attach images</label>
            <input type="file" id="images" required />

            <button onClick={SubmitCont}> Submit </button>
        </div>

        <div>
         
        </div>
      </div>
    );
}
export default Home;