const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getCategoriesByProducts(products){
	let result = []	
	
	return products.reduce((categories, product) => {
		if(!result.includes(product.category))
			result.push(product.category)

		return result
	}, 0)
}	

function getProductsById(ids, productsList){
	return productsList.filter(product => ids.includes(product.id))
}

function getCartPrice(products, look){
	return products.reduce((finalPrice, product) => {	
		let promocao = product
												.promotions
												.filter(promotion => promotion.looks.includes(look));	
				
		
		if(promocao.length)			
			finalPrice += promocao[0].price		
		else
			finalPrice += product.regularPrice				

		return finalPrice
	}, 0) 
}

function getRegularPrice(products){
	return products.reduce((price, product) => {
	   return price += product.regularPrice
	}, 0)
}

function getShoppingCart(ids, productsList) {	
	let products = getProductsById(ids, productsList)
	let promotion = promotions[getCategoriesByProducts(products).length - 1]

	let cart_price = getCartPrice(products, promotion)
	let regular_price = getRegularPrice(products)

	let discount_value = regular_price - cart_price
	let discount_percent = (discount_value/regular_price)

	products = products.map(product => { return {
		name: product.name,
		category: product.category
	}})

	return {
		products,
		promotion,
		totalPrice: cart_price.toFixed(2),
		discountValue: discount_value.toFixed(2),
		discount: `${(discount_percent*100).toFixed(2)}%`
	};
}

module.exports = { getShoppingCart };
