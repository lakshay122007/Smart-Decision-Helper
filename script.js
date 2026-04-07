let currentData = []
let currentDomain = "Accessories"

let results = document.getElementById("results")

let url1 = "https://dummyjson.com/products"
let url2 = "http://universities.hipolabs.com/search?country=India"
let url3 = "https://dummyjson.com/recipes"
let url4 = "https://api.rawg.io/api/games?key=28b45721b2244372a98083b1afe99f26&page_size=50"


function showData(items){

    currentData = items
    results.innerHTML = ""

    items.forEach((item) => {
        let div = document.createElement("div")
        div.className = "card"

        let title = document.createElement("h3")
        title.innerText = item.title
        let price = document.createElement("p")
        price.innerText = `Price ₹: ${item.price}`

        let rating = document.createElement("p")
        rating.innerText = `Rating: ${item.rating}`

        div.appendChild(title)
        div.appendChild(price)
        div.appendChild(rating)

        results.appendChild(div)

    })
}
function getData(){
    results.innerHTML = "Loading..."
    setTimeout(()=>{
        fetch(url1)
        .then((res) => res.json())
        .then((data) => {
        showData(data.products)
    })
    .catch((err)=>results.innerHTML = "Couldn't Fetch Data")
    },500)

}

getData()



function getUniversities(){
    results.innerHTML = "Loading..."
    setTimeout(()=>{
        fetch(url2)
        .then((res) => res.json())
        .then((data) =>{
            showUniversities(data)
        })
    .catch((err)=>results.innerHTML = "Couldn't Fetch Data")

    },500)

}

function showUniversities(items){
    currentData = items
    results.innerHTML = ""

    items.forEach(function(item){
    let div = document.createElement("div")
    div.className = "card"

    let title = document.createElement("h3")
    title.innerText = item.name

    let country = document.createElement("p")
    country.innerText = "Country: " + item.country

    let link = document.createElement("p")
    link.innerText = item.web_pages[0]

    div.appendChild(title)
    div.appendChild(country)
    div.appendChild(link)

    results.appendChild(div)
    })
}


function getMeals(){
    results.innerHTML = "Loading..."
    setTimeout(()=>{
        fetch(url3)
        .then((res)=> res.json())
        .then((data) =>{
            showMeals(data.recipes)
        })
        .catch((err)=>{
            results.innerHTML = "Couldn't Fetch Data"
        })
    },500)
}

function showMeals(items){
    currentData = items
    results.innerHTML = ""
    items.forEach(function(item){
        let div = document.createElement("div")
        div.className = "card"

        let title = document.createElement("h3")
        title.innerText = item.name

        let cuisine = document.createElement("p")
        cuisine.innerText = "Cuisine: " + item.cuisine

        let rating = document.createElement("p")
        rating.innerText = "Rating: " + item.rating

        div.appendChild(title)
        div.appendChild(cuisine)
        div.appendChild(rating)

        results.appendChild(div)
    })
}

function getGames(){
    results.innerHTML = "Loading..."
    setTimeout(()=>{
        fetch(url4)
        .then((res) => res.json())
        .then((data) => {
            showGames(data.results)
        })
        .catch((err)=>{
            results.innerHTML = "Couldn't Fetch Data"
        })
    },500)
}
function showGames(items){
    currentData = items
    results.innerHTML = ""

    items.forEach(function(item){
        let div = document.createElement("div")
        div.className = "card"

        let title = document.createElement("h3")
        title.innerText = item.name

        let rating = document.createElement("p")
        rating.innerText = "Rating: " + item.rating

        let released = document.createElement("p")
        released.innerText = "Released: " + item.released

        div.appendChild(title)
        div.appendChild(rating)
        div.appendChild(released)

        results.appendChild(div)
    })
}

let btns = document.querySelectorAll(".domain button")

btns.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
        let text = btn.innerText
        currentDomain = text

        if(text == "Accessories"){
            getData()
        }
        else if(text == "Education"){
            getUniversities()
        }
        else if(text == "Food"){
            getMeals()
        }
        else if(text == "Games"){
            getGames()
        }
    })
})

function searchData(value){
    let filtered = currentData.filter((item)=>{ //filter //search
        if(currentDomain == "Accessories"){
            return item.title.toLowerCase().includes(value.toLowerCase())
        }
        else if(currentDomain == "Education"){
            return item.name.toLowerCase().includes(value.toLowerCase())
        }
        else if(currentDomain == "Food"){
            return item.name.toLowerCase().includes(value.toLowerCase())
        }
        else if(currentDomain == "Games"){
            return item.name.toLowerCase().includes(value.toLowerCase())
        }
    })
    showSearch(filtered)
}

function showSearch(items){
    results.innerHTML = ""
    items.forEach((item)=>{
        let div = document.createElement("div")
        div.className = "card"
        let title = document.createElement("h3")
        if (currentDomain == "Accessories"){
            title.innerText = item.title
        }
        else{
            title.innerText = item.name
        }
        div.appendChild(title)
        results.appendChild(div)

    })
}

let input = document.querySelector(".search input")
input.addEventListener('input', ()=>{
    let value = input.value
    searchData(value)
})