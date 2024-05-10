let base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.getElementById("btn");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

// console.log(dropdowns);

// for(let currcode in countryList)
// {
//     console.log(currcode);
// }

for(let selects of dropdowns)
{
    for(let currcode in countryList)
    {
        let options = document.createElement("option");
        options.innerHTML = currcode;
        options.value = currcode;
        selects.append(options);
        if(selects.id == "from" && currcode == "USD")
        {
            options.selected = "selected";
        }
        else if(selects.id == "to" && currcode == "INR")
        {
            options.selected = "selected";
        }

        selects.addEventListener("change",(e)=>{
            // console.log(e.target);
            updateflag(e.target);
        });
    }

    let updateflag = (elm) =>{
        // console.log(elm.value);
        let curcode = elm.value;
        let countrycode = countryList[curcode];
        // console.log(countrycode);
        let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;

        let img = elm.previousElementSibling;
        // console.log(img);
        img.setAttribute("src",newsrc);
    }
}


btn.addEventListener("click", async (e)=>{
    e.preventDefault();
    updateexchangerate();
});

let updateexchangerate = async () => {
    let amt = document.querySelector("#amt");
    // console.log(amt);
    let amtvalue = amt.value;

    if(amtvalue == "" || amtvalue < 1)
    {
        amt.value = "1";
    }

    // console.log(fromcurr.value,tocurr.value);
    let url = `${base_url}/${fromcurr.value.toLowerCase()}.min.json`;

    let response = await fetch(url);
    // console.log(response);

    let data = await response.json();
    // console.log(data);

    let rate1 = data[fromcurr.value.toLowerCase()];
    // console.log(rate1);

    let rate2 = rate1[tocurr.value.toLowerCase()];
    // console.log(rate2);

    let finalamt = amtvalue * rate2;
    // console.log(finalamt);

    msg.innerHTML = `${amtvalue} ${fromcurr.value} = ${finalamt.toFixed(4)} ${tocurr.value}`;
}

window.addEventListener("load",()=>{
    updateexchangerate();
});