document.querySelector('#advert-form').addEventListener('submit', function (event) {
    document.querySelector("#dummyframe").style.display='block';
});

document.querySelector('#advert-form').addEventListener('reset', function (event) {
    document.querySelector("#dummyframe").style.display='none';
});

document.querySelector("#advert-duration").valueAsDate = new Date();