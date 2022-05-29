
//?..input field and input button....
const input_btn=document.querySelector('#input-btn');
const input_field=document.querySelector('#input-field');

input_btn.addEventListener('click',()=>{
    // console.log(input_field.value);
    const input_value=input_field.value;

    
    const url=`https://openapi.programming-hero.com/api/phones?search=${input_value}`

    if(input_value==''){
        //..clear error from ui if exist in UI...
        clearErrorMsg();
        //...custom error message show in UI if input field is empty.......
        errorMsgShow('*please write something in the input box','blank_input');
    }else{
        toggleSpinner('block');
        fetch(url)
        .then((res)=>res.json())
        // .then((data)=>console.log(data))
        .then((json)=>phoneShowToUi(json.data))
    }
    input_field.value='';
})

//!..Error message show...
const errorMsgShow=(msg,inputType)=>{
    // console.log(msg);
    const error_msg=document.querySelector('.error_msg');

    const p=document.createElement('p');
    p.classList.add('msg')
    p.textContent=msg;

    if(inputType==='blank_input'){
        error_msg.appendChild(p);
    }
    else if(inputType==='wrong_input'){
        error_msg.appendChild(p);
    }
    
}
//!..clear error message from ui...
const clearErrorMsg=()=>{
    if(document.querySelector('.msg')){
        const msg= document.querySelector('.msg');
        msg.parentNode.removeChild(msg);
    }
}

//!...phone item add to UI....
const phoneShowToUi=(allPhone)=>{
    // console.log(allPhone);
    const firstTwentyPhone=allPhone.slice(0,20);
    // console.log(firstTwentyPhone)

    if(firstTwentyPhone.length==0){
        toggleSpinner('none');
        clearErrorMsg();
        //...custom error message show in UI if input type is wrong.......
        errorMsgShow('*Please type valid input item in the input Box','wrong_input');
    }else{
        //...All previous item removed....
        document.querySelector('#phone_main').textContent='';
        //..All previous item details removed... 
        document.querySelector('#phone_details').textContent='';


        //!...display total found result in ui......
        if(!document.querySelector('.totalResult')){
            totalItemShow(allPhone,firstTwentyPhone);
        }else{
            const p = document.querySelector('.totalResult');
            p.parentNode.removeChild(p);

            totalItemShow(allPhone,firstTwentyPhone);
        }
        //!...display All button in ui......
        if(!document.querySelector('.showAllBtn')){
            ShowAllItemButton(allPhone);
        }else{
            const button = document.querySelector('.showAllBtn');
            button.parentNode.removeChild(button);

            ShowAllItemButton(allPhone);
        }
        //!..group name of all item....
        if(!document.querySelector('.group_brand_name')){
            nameOfItemName(allPhone[0].brand);
        }else{
            // console.log(allPhone[0].brand);
            const p = document.querySelector('.group_brand_name');
            p.parentNode.removeChild(p);

            nameOfItemName(allPhone[0].brand);
        }
        //...display firstTwentyPhone item in UI......
        displayFirstTwentyItem(firstTwentyPhone)
    }
}

//!..spinner add/remove(toggle)....
const toggleSpinner=(style)=>{
    document.querySelector('.spinner_add').style.display=style;
}


//!....Display first twenty data to UI......
const displayFirstTwentyItem=(firstTwentyData)=>{

    for(let singlePhone of firstTwentyData){
        //..error message clear when item will load if error occur going to search...
        clearErrorMsg();
        // console.log(singlePhone);
        const {brand,phone_name,slug,image}=singlePhone;
        // console.log(brand,phone_name,slug,image);

        let card_main = document.querySelector('#phone_main');

        const colDiv=document.createElement('div');
        colDiv.className="col-xxl-4 col-md-4";

        colDiv.innerHTML=`
        
        <div class="card h-100" >
            <img src="${image}" class="card-img-top phone-img" alt="#" />
            <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <h6 class="card-title">${brand}</h6>
            </div>
            <div class="card-footer">
                <button class="view text-white btn btn-warning" onclick="loadPhoneId('${slug}')">See Details</button>
            </div>
        </div>
        `
        card_main.appendChild(colDiv);
    }
    toggleSpinner('none');
    // const button=document.createElement('button');
    // button.className="load_btn"
    // button.innerText='Load more->'
}

//!...group name of All item...
const nameOfItemName=(name)=>{
    // console.log(name);
    const name_of_found_item=document.querySelector('.name_of_found_item');
    const h1=document.createElement('h1');
    h1.classList.add('group_brand_name')
    h1.innerText=`${name} Phone`;

    name_of_found_item.appendChild(h1);

}

//!...Total item result show in Ui....
const totalItemShow=(allPhone,wantToSee)=>{
    // console.log(allPhone,firstTwentyPhone);
    const total_item_result = document.querySelector('.total_item_result');
    const p = document.createElement('p');
    p.classList.add('totalResult');

    p.innerText=`(Showing 1 to ${wantToSee.length} of ${allPhone.length} items)`;

    total_item_result.appendChild(p);

}

//!... show All button in Ui....
const ShowAllItemButton=(allPhone)=>{
    // console.log(allPhone.length);
    if(allPhone.length>=20){
        const show_all_item = document.querySelector('.show_all_item');
        const button = document.createElement('button');
        button.classList.add('showAllBtn');
        button.innerText='All'

        show_all_item.appendChild(button);
        
        showAllDataToUi(allPhone);
    }
}

//!...Show all Data To Ui using All button...
const showAllDataToUi=(allPhone)=>{
    const showBtn=document.querySelector('.showAllBtn');
    // console.log(showBtn);
    showBtn.addEventListener('click',()=>{
        // console.log('clicked');
        document.querySelector('#phone_main').textContent='';
        // All button removed from the ui..
        const button = document.querySelector('.showAllBtn');
        button.parentNode.removeChild(button);

        const p = document.querySelector('.totalResult');
        p.parentNode.removeChild(p);

        totalItemShow(allPhone,allPhone);

        for(let singlePhone of allPhone){
            const {brand,phone_name,slug,image}=singlePhone;
            // console.log(brand,phone_name,slug,image);

            let card_main = document.querySelector('#phone_main');

            const colDiv=document.createElement('div');
            colDiv.className="col-xxl-4 col-md-4";

            colDiv.innerHTML=`
            
            <div class="card h-100" >
                <img src="${image}" class="card-img-top phone-img" alt="#" />
                <div class="card-body">
                    <h5 class="card-title">${phone_name}</h5>
                    <h6 class="card-title">${brand}</h6>
                </div>
                <div class="card-footer">
                    <button class="view text-white btn btn-warning" onclick="loadPhoneId('${slug}')">See Details</button>
                </div>
            </div>
            `
            card_main.appendChild(colDiv);

        }
        if(!document.querySelector('.showAllBtn')){
            // console.log('button not exists');
            shortButtonCreate();
            const showShortBtn=document.querySelector('.showShortBtn');
            showShortBtn.addEventListener('click',()=>{
                // console.log('click');
                showShortBtn.parentNode.removeChild(showShortBtn);
                // console.log(allPhone);
                phoneShowToUi(allPhone);
            })
        }
    })

    
}

//!...create short button...
const shortButtonCreate=()=>{
    const show_all_item = document.querySelector('.show_all_item');
    const button = document.createElement('button');
    button.classList.add('showShortBtn');
    button.innerText='Short'

    show_all_item.appendChild(button);
    
}

//!....Phone details.......
const loadPhoneId=(phoneID)=>{
    // console.log(mealID);
    const url=`https://openapi.programming-hero.com/api/phone/${phoneID}`;
    fetch(url)
    .then(res=>res.json())
    // .then(data=>console.log(data))
    .then(json=>phoneDetails(json.data))
}

//!...phone Details/specification show to ui...
const phoneDetails=(phoneData)=>{
    // console.log(phoneData);
    const phone_details = document.querySelector('#phone_details');
    // phone_details.textContent='';
    const {name,image,mainFeatures:{storage,displaySize,chipSet,memory}}=phoneData;
    // console.log(releaseDate);

    const allSensor = phoneData.mainFeatures.sensors.toString();
    // console.log(allSensor.split(',').join(', '));

    const phone_specification=document.createElement('div');
    phone_specification.classList.add('phone_specification_branding');
    
    phone_specification.innerHTML=`
    <div className="phone_about">
        <div class="phone_name">
                <h1>${name}</h1>
            </div>
            <div class="description">
                <p>* Some specification may not be up to date according to today's market place. Please always visit official local store or other official brand channels for exact latest specification with price.</p>
            </div>
            <div class="phone_img">
                <img src="${image}"class="mx-auto" alt="">
            </div>
            <div class="phone_specification_title">
                <h1>${name} specification</h1>
        </div>
    </div>
            <table class="table table-striped table-bordered border table_info">
                <tbody>
                    <tr>
                        <th class="td-in-response" >Release date</th>
                        ${phoneData['releaseDate'] ?`<td data-label="Release date" colspan="2">${phoneData.releaseDate}</td>`:`<td data-label="Release date" colspan="2">Release date not published yet</td>`}
                    </tr>
                    <tr>
                        <th  colspan="2" class="text-center main-section">Main Features</th>
                    </tr>
                    <tr>
                        <th class="td-in-response"  scope="row">storage</th>
                        <td data-label="storage" colspan="2">${storage}</td>
                    </tr>
                    <tr>
                        <th class="td-in-response" scope="row">Display size</th>
                        <td data-label="Display size" colspan="2">${displaySize}</td>
                    </tr>
                    <tr>
                        <th class="td-in-response" scope="row">chip set</th>
                        <td data-label="chip set" colspan="2">${chipSet}</td>
                    </tr>
                    <tr>
                        <th class="td-in-response" scope="row">memory</th>
                        <td data-label="memory" colspan="2">${memory}</td>
                    </tr>
            
                    ${phoneData['others']?`
                    <tr>
                        <th  colspan="2" class="text-center main-section">Others</th>
                    </tr>
                    <tr>
                        <th class="td-in-response" scope="row">WLAN</th>
                        <td data-label="WLAN" colspan="2">${phoneData.others.WLAN}</td>
                    </tr>
                    <tr>
                        <th class="td-in-response" scope="row">Bluetooth</th>
                        <td data-label="Bluetooth" colspan="2">${phoneData.others.Bluetooth}</td>
                    </tr>
                    <tr>
                        <th class="td-in-response" scope="row">GPS</th>
                        <td data-label="GPS"  colspan="2">${phoneData.others.GPS}</td>
                    </tr>
                    <tr>
                        <th class="td-in-response" scope="row">NFC</th>
                        <td data-label="NFC" colspan="2">${phoneData.others.NFC}</td>
                    </tr>
                    <tr>
                        <th class="td-in-response" scope="row">Radio</th>
                        <td  data-label="Radio" colspan="2">${phoneData.others.Radio}</td>
                    </tr>
                    <tr>
                        <th class="td-in-response" scope="row">USB</th>
                        <td data-label="USB" >  ${phoneData.others.USB}</td>
                    </tr>`:`
                    <tr>
                        <th class="td-in-response"  colspan="2" class="text-center">Others</th>
                    </tr>
                    <tr>
                    <td data-label="Others" colspan="2" class="text-center">others specification not published yet</td>
                    </tr>
            `}
            
                    <tr>
                        <th class="td-in-response"  colspan="2" class="text-center">Sensor</th>
                    </tr>
                    <tr>
                        <td data-label="Sensor" colspan="2" class="text-center">${allSensor.split(',').join(', ')}</td>
                    </tr>
                </tbody>
            </table>
        `;
        phone_details.appendChild(phone_specification)
}