import React from 'react'
import LibraryButton from './LibraryButton';
import axios from 'axios';
import LibraryHeader from './LibraryHeader';

function Office() {

    const [officeName, setOfficeName] = React.useState("");
    const [officeNumber, setOfficeNumber] = React.useState("");
    const [offNumber, setOffNumber] = React.useState("");

    

    async function saveOffice(){
        const response = await axios.post("http://localhost:8080/api/office/save", 
            {
                name: officeName,
                officeNumber: officeNumber
            }
        )
        if(response.status == 200){
            alert("Office saved successfully");
        }else{
            alert("Office is not saved successfully");
        }
    }
    async function deleteOffice() {
        if (!offNumber) {
            alert("Enter an office number to delete");
            return;
        }
        const response = await axios.delete(`http://localhost:8080/api/office/delete-by-number/${offNumber}`,
        
        );
        if (response.status >= 200 && response.status < 300) {
            alert("Office deleted successfully");
            setOffNumber("");
        } else {
            alert("Office not deleted: " + (response.data || response.status));
        }
    }

  return (
    <div>
        <LibraryHeader />
        <h1> SAVE OFFICE</h1>
        <label> Office Name:</label><input type="text" onChange={(e) => setOfficeName(e.target.value)} /> <br/>
        <label> Office Number:</label><input type="text" onChange={(e) => setOfficeNumber(e.target.value)} /> <br/>
        <LibraryButton buttonLabel="SAVE" onClickButton={saveOffice}/>
        <h2>DELETE OFFICE</h2>
        <input type='text' onChange={e=> setOffNumber(e.target.value)}/>
        <LibraryButton buttonLabel="DELETE" onClickButton={deleteOffice}/>
        

    </div>
  )
}

export default Office
