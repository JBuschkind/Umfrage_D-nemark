var XMLHttpRequest = require('xhr2');
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://busch.click:3000/user");
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const data = xhr.response;
    console.log(data);
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};