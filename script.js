const base_Url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("form .from select");
const toCurr = document.querySelector("form .to select");
const msg = document.querySelector(".msg");


window.addEventListener = ("load", ()=>{
    exchangeRate();
})

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
};

const updateFlag = (element) =>{
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png` ;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();
    exchangeRate();    
})

const exchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 0)
    {
        amtValue = 1;
        amount.value = 1;
    }
   const URL = `${base_Url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
   let reponse = await fetch(URL);
   let data = await reponse.json();
   let rate = data[toCurr.value.toLowerCase()]
   let finalAmount = amtValue * rate;
   msg.innerText = `${amtValue}${fromCurr.value} = ${finalAmount}${toCurr.value}`
   console.log(finalAmount);
} 