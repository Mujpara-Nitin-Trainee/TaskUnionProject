
const registerStudent = async() => {

  if(isValid === false){
    alert("Plz Enter All Required Fields");
  }

  let data = document.getElementById('registerPage');

  let formData = new FormData(data);

  let params = new URLSearchParams(formData);

  let result = await fetch("/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/x-www-form-urlencoded",
    },
    body:params
  })

  result = await result.json();

  if(result.success == true){
    alert("User Registered Successfully");
  }

}

const loginStudent = async () => {
    let data = document.getElementById('loginPage');

    let formData = new FormData(data);

    let params = new URLSearchParams(formData);

    let result = await fetch("/login", {
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded",
      },
      body:params
    })

    result = await result.json();

    if(result.success == true){
      alert("User Login Successfully");

      window.location.href = "/student/";

    }

}