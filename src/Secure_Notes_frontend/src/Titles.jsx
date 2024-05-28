import { useState } from "react";
import { Secure_Notes_backend } from 'declarations/Secure_Notes_backend';

function Titles(){
    var [ Data , setData ] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    async function getAllData(){
        var Principal = await Secure_Notes_backend.GetPrincipal();
        var allData = await Secure_Notes_backend.getDataByPrincipal(Principal);
        // console.log(allData);
      setData(allData);
      };
      for(var i=0;i<1;i++){
        getAllData();
      }
      console.log("selectedItem.DateAndTime", selectedItem?.DateAndTime); 
      function handleTitleClick(item) {
        setSelectedItem(item);
      }

    return(
        <div>
            <div id="titles">
              <h3>Click on the title you want to refer</h3>
                {Data.length == 0 ? (
                    <p id="AddAnyNotes">Add any notes</p>
                ) : (
                    Data.map((Id,index) => (
                    <div key={index}  onClick={() => handleTitleClick(Id)}>
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
                  {/* {selectedItem.image && selectedItem.image.length > 0 && (
                  <img src={`data:image/*;base64,${btoa(String.fromCharCode(...selectedItem.image))}`} alt="Content" />
                  )} */}
                </div>
              )}
            </div>
        </div>
    );
}

export default Titles

