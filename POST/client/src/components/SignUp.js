import React, { useRef } from 'react'

function SignUp(){

    let firstNameInputRef=useRef();
    let lastNameInputRef=useRef();
    let ageInputRef=useRef();
    let emailInputRef=useRef();
    let PasswordInputRef=useRef();
    let mobileNoInputRef=useRef();

    let onSignUp=async()=>{
        
        let dataToSend={
            firstName:firstNameInputRef.current.value,
            lastName:lastNameInputRef.current.value,
            age:ageInputRef.current.value,
            email:emailInputRef.current.value,
            password:PasswordInputRef.current.value,
            mobileNo:mobileNoInputRef.current.value
        };

        console.log(dataToSend);
       
        let myHeader=new Headers();
        myHeader.append("content-type","application/json");
          
         let reqOptions={
            method:"POST",
            body:JSON.stringify(dataToSend),
            headers:myHeader,
         }
         let JSONData=await fetch("http://localhost:1405/signup",reqOptions);
         let JSOData=await JSONData.json();
         console.log(JSOData);
    }

  return (
    <div className="mainDiv">
        <form>
            <h2>Signup</h2>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef}></input>
            </div>
            <div>
                <label>Last Name</label>
                <input ref={lastNameInputRef}></input>
            </div>
            <div>
                <label>Age</label>
                <input ref={ageInputRef}></input>
            </div>
            <div>
                <label>Email</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>Password</label>
                <input ref={PasswordInputRef}></input>
            </div>
            <div>
                <label>Mobile No</label>
                <input ref={mobileNoInputRef}></input>
            </div>
            <div>
                <button type="button" onClick={()=>{
                    onSignUp();
                }}>Signup</button>
            </div>
        </form>
    </div>
  )
}

export default SignUp