// search phone function
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status == false) {
                resultNotFound();
            }
            else {
                displayPhones(data.data);
                reloadSearch();

            }
        });
}

//reload data when search function
const reloadSearch = () => {
    //clear no-result found
    const noResult = document.getElementById('no-result');
    noResult.innerText = "";
    //clear phone detail
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';

}

//no- result found function
const resultNotFound = () => {
    const noResult = document.getElementById('no-result');
    noResult.innerText = "Result Is Not Found !!";
    // clear search result 
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    //clear phone detail
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
}


//display phone function
const displayPhones = allPhones => {
    //show 20 items for search
    const phones = allPhones.slice(0, 20);
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    // clear search result 
    searchResult.textContent = '';
    phones.forEach(phone => {
        // console.log(phone);
        const cardDiv = document.createElement('div')
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
           <div class="card-body">
           <h5 class="card-text">Phone-Name: ${phone.phone_name}</h5>
           <h5 class="card-title">Brand: ${phone.brand}</h5>
           <button onclick = "loadPhoneDetails('${phone.slug}')" class="btn btn-danger mt-2 fw-bold ">Explore More</button>
          </div>
       </div> 
        `;
        searchResult.appendChild(cardDiv);

    });
}

//load phone detail function
const loadPhoneDetails = id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

//display phones details function
const displayPhoneDetails = info => {
    // console.log(info)
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('col');
    div.innerHTML = `
        <img src="${info.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">Main Features: </h5>
            <p class="card-text fw-bold">Phone-Name: <span class="fw-normal"> ${info.name}</span> </p>
            <p class="card-text  fw-bold">Brand: <span class="fw-normal"> ${info.brand}</span></p>
            <p class="card-text  fw-bold">Chipset: <span class="fw-normal"> ${info.mainFeatures.storage}</span></p>
            <p class="card-text  fw-bold">Display-Size: <span class="fw-normal"> ${info.mainFeatures.displaySize}</span> </p>
            <p class="card-text  fw-bold">Chipset: <span class="fw-normal"> ${info.mainFeatures.chipSet}</span></p>
            <p class="card-text  fw-bold">Memory: <span class="fw-normal"> ${info.mainFeatures.memory}</span> </p>
            <p class="card-text  fw-bold">Display-Size: <span class="fw-normal"> ${info.mainFeatures.sensors}</span></p>
            <p class="card-text  fw-bold">Release-Date: <span class="fw-normal"> ${info.releaseDate ? info.releaseDate : 'not found'}</span> </p>
            <h5 class="card-title">others: </h5>
            <p class="card-text fw-bold">WLAN: <span class="fw-normal"> ${info?.others?.WLAN ? info?.others?.WLAN : 'not found'}</span> </p>
            <p class="card-text fw-bold">Bluetooth: <span class="fw-normal"> ${info?.others?.Bluetooth ? info?.others?.Bluetooth : 'not found'}</span> </p>
            <p class="card-text fw-bold">GPS: <span class="fw-normal"> ${info?.others?.GPS ? info?.others?.GPS : 'not found'}</span> </p>
            <p class="card-text fw-bold">NFC: <span class="fw-normal"> ${info?.others?.NFC ? info?.others?.NFC : 'not found'}</span> </p>
            <p class="card-text fw-bold">Radio: <span class="fw-normal"> ${info?.others?.Radio ? info?.others?.Radio : 'not found'}</span> </p>
            <p class="card-text fw-bold">USB: <span class="fw-normal"> ${info?.others?.USB ? info?.others?.USB : 'not found'}</span> </p> 
        </div>
          
    `;
    phoneDetail.appendChild(div);

}



