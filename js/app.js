/*--------------
 products api call here 
 ---------------*/ 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
 /*---------  takes single product  ---------*/
  for (const product of allProducts) {
    /*--------- product image bug fixed  ---------*/
    const image = product.image;
    const title = product.title;
    /*----- slice product title for creat same size cart  ------*/
    const shortTitle = title.slice(0,40);
   /*  single product div creat  */
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 id="product-title">${shortTitle}</h3>
      <p>Category: ${product.category}</p>
      <p id="show-rating"><span><i class="fas fa-star"></i> ${product.rating.rate}</span><span><i class="fas fa-user"></i> ${product.rating.count}</span></p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick="singleProduct(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
/* product price count cart  */
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  // update total bug fixed 
  updateTotal();
  /* ----total product set here --- */
  document.getElementById("total-Products").innerText = count;
};
/*------ take value from price area  ------*/
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id) ;
  const convertPrice = parseFloat(value);
 /* ------- price calculation --------*/ 
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  console.log(id,value);
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    let lowPriceTax = priceConverted * 0.2;
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", parseFloat(lowPriceTax).toFixed(2) );
  }
  if (priceConverted > 400) {
    let middePriceTax = priceConverted * 0.3;
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", parseFloat(middePriceTax).toFixed(2));
  }
  if (priceConverted > 500) {
    let highPriceTax = priceConverted * 0.4;
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", parseFloat(highPriceTax).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
 /* ------- total price calculation  -----*/
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2) ;
};
/* -------single product api call here --------*/ 
const singleProduct = singleProductId =>{
  const url = `https://fakestoreapi.com/products/${singleProductId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => singleProductDetails(data));
}
/*----------- single product description -----------*/ 
const singleProductDetails = singleProductInfo =>{
  const productDescription = document.getElementById("single-product");
  productDescription.style.display = 'block';
  /*-------- single product details give here  -------*/
  productDescription.innerHTML = `
  <img src="${singleProductInfo.image}" id="single-product-image" alt="">
  <h2>${singleProductInfo.title}</h2>
  <p>${singleProductInfo.description}</p>
  <h3 id="description-btn"><strong>Price:${singleProductInfo.price}</strong> <button class="btn btn-primary text-center">Buy Now</button></h3>
  `
}