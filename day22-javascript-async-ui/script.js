const API_URL = "https://fakestoreapi.com/products";

const container = document.getElementById("productContainer");
const loading = document.getElementById("loading");

// 2 functions 
// 1 - api call
// 2 - display the data in ui

async function getProducts(){
    try{
        // api call
        const response = await fetch(API_URL);

        const products = await response.json();

        loading.style.display = "none";

        displayProducts(products);
    }catch(err){
        console.log(err);
        loading.innerHTML = `
        <div class="text-danger">Failed to load products</div>
        `
    }
}

function displayProducts(products){
    products.forEach(data => {
        container.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm">
                    <img src="${data.image}" class="card-img-top p-4" style="height: 250px; object-fit: contain;" />

                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-truncate">${data.title}</h5>
                        <p class="card-text text-muted">${data.description.substring(0, 80)}...</p>
                        <h5 class="text-primary mt-auto">$${data.price}</h5>

                        <button class="btn btn-warning mt-3">Buy now</button>
                    </div>

                </div>
            </div>
        `
    })
}

getProducts();