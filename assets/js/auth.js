function store(){

    var name = document.getElementById('name');
    var mail = document.getElementById('mail');
    var pw = document.getElementById('pw');
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(name.value.length == 0){
        alert('Name is required.');

    }else if(mail.value.length == 0){
        alert('Email is mandetory.');

    }else if(pw.value.length == 0){
        alert('Please enter a valid password.');

    }else if(mail.value.length == 0 && pw.value.length == 0 && name.value.length == 0){
        alert('Please fill in name, email and password');

    }else if(pw.value.length > 8){
        alert('Maximum length of password is 8');

    }else if(!pw.value.match(numbers)){
        alert('Password must contain at least one number');

    }else if(!pw.value.match(upperCaseLetters)){
        alert('Password must contain at least one uppercase letter');

    }else if(!pw.value.match(lowerCaseLetters)){
        alert('Password must contain at least one lowercase letter');

    }else{
        localStorage.setItem('name', name.value);
        localStorage.setItem('mail', mail.value);
        localStorage.setItem('pw', pw.value);
        window.location.href = "dashboard.html";
    }
}


// login
function check(){
    var storedName = localStorage.getItem('mail');
    var storedPw = localStorage.getItem('pw');

    var userName = document.getElementById('usrmail');
    var userPw = document.getElementById('usrpw');

    if(userName.value == storedName && userPw.value == storedPw){
        window.location.href = "dashboard.html";
    }else{
        alert('You are not registered or Wrong Credintials');
    }
}

//dashboard
