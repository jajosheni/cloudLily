document.querySelector('#advert-form').addEventListener('submit', function (event) {
    document.querySelector("#dummyframe").style.display='block';
});

document.querySelector('#advert-form').addEventListener('reset', function (event) {
    document.querySelector("#dummyframe").style.display='none';
});

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate()+1);

document.querySelector("#advert-duration").valueAsDate = tomorrow;