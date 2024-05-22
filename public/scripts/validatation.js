
let isValid = false;

const validateInput = async(id) => {
  
  let data = document.getElementById(id).value;
  if(data.length === 0){
    let divName = id.concat('-error');
    document.getElementById(divName).innerHTML = "Field Should not be empty";
    return isValid;
  }else{

    if(id == "firstName" || id == "lastName"){ validateString(id) }
    else if(id == "email") { validateEmail(id) }
    else if(id == "dob") { validateDate(id) }
    else if(id == "password"){ validatePassword(id) }
    else{
      isValid = true;
      return isValid;
    }
  }
}

const validateString = async(id) => {

  let nameRegEx = /^[A-za-z]+$/;

  let data = document.getElementById(id).value;

  if(!data.match(nameRegEx)){
    let divName = id.concat('-error');

    document.getElementById(divName).innerHTML = "Plz Enter Valid name";

    return isValid;
  }else{
    let divName = id.concat('-error');
    document.getElementById(divName).innerHTML = "";
    isValid = true;

    return isValid
  }

}

const validateEmail = async(id) => {

  let emailRegEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  let data = document.getElementById(id).value;

  if(!data.match(emailRegEx)){

    let divName = id.concat('-error');

    document.getElementById(divName).innerHTML = "Plz Enter Valid email";

    return isValid;

  }else{
    let divName = id.concat('-error');
    document.getElementById(divName).innerHTML = "";
    isValid = true;
    return isValid;
  }

}

const validateDate = async(id) => {

  let dateRegEx = /^\d{4}\/\d{1,2}\/\d{1,2}$/;

  let data = document.getElementById(id).value;

  let divName = id.concat('-error');

  if(!data.match(dateRegEx)){

    document.getElementById(divName).innerHTML = "Plz Enter Valid Date";
    return isValid;
  }else{
    document.getElementById(divName).innerHTML = "";
    isValid = true;
    return isValid;
  }

}

const validatePassword = async(id) => {

  let data = document.getElementById(id).value;
  let divName = id.concat('-error');

  if(data.length < 8){
    document.getElementById(divName).innerHTML = "Password Length should be greater than 8";
    return isValid;
  }else{
    document.getElementById(divName).innerHTML = "";
    isValid = true;
    return isValid;
  }

}