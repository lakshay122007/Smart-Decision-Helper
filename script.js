let results = document.getElementById("results")

function showData(items){
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

let url = "https://dummyjson.com/products"
function getData(){
    results.innerHTML = "Loading..."
    setTimeout(()=>{
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
        showData(data.products)
    })
    },1000)

}

getData()
