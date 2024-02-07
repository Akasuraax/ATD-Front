export function seePwd(){
    const inputPwd = document.getElementById("password");
    if(inputPwd.type === "password")inputPwd.type = "text";
    else inputPwd.type = "password";
}