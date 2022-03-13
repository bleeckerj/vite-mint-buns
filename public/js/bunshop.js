  var PUBLISHABLE_KEY = "pk_live_o7Y4EE0jPXTjCLkr1pwj2fwU";
  var stripe = Stripe(PUBLISHABLE_KEY);

  function buy(product, price, qty, nofulfill) {
	var payload = { 'product': product, 'price': price, 'qty': qty, 'optin': document.getElementById(product + '-optin').checked };
	
	// visual feedback
	document.getElementById('buy_'+product).style.display = "none";
	document.getElementById('spinner_'+product).style.display = "block";

	var endpoint = '/create-checkout-session';
	if (nofulfill) endpoint = '/create-checkout-session-nofulfillment';
	
	fetch(endpoint, {
	  method: 'POST',
	  body: JSON.stringify(payload)
	})
	.then(function(response) {
	  return response.json();
	})
	.then(function(session) {
	  if (session.error) {
			console.error(session.error.message);
			if (session.error.error == "STOCK") {
				stockCheck(product);
			}
		document.getElementById('spinner_'+product).style.display = "none";
		document.getElementById('buy_'+product).style.display = "block";
	  }
	  else {
	  	  document.getElementById('spinner_'+product).style.display = "none";
  		  //document.getElementById('buy_'+product).style.display = "block";
		  return stripe.redirectToCheckout({ sessionId: session.id });
	  }
	})
	.then(function(result) {
	  // If `redirectToCheckout` fails due to a browser or network
	  // error, you should display the localized error message to your
	  // customer using `error.message`.
	  if (result.error) {
		alert(result.error.message);
	  }
	})
	.catch(function(error) {
	  console.log(error);
	  //console.error("Buy error");
	});
  }

  function stockCheck(id) {
	fetch('/stock/' + id, {
	  method: 'GET'
	})
	.then(function(response) {
	  return response.json();
	})
	.then(function(result) {
	  if (!result.error) {
		handleStockUpdate(id,result.stock);
	  }
	  else {
		console.error(result.error);
		handleStockUpdate(id,-1);
	  }
	})
	.catch(function(error) {
	  //console.error("Stock check error");
	  handleStockUpdate(id,-1);
	});
  }
  window.onload = function() {
	stockCheck('prod_HnDKjocftAwMDg');
	stockCheck('prod_Ikiux0gW5aNJv3');
  }  

  function handleStockUpdate(id, stock) {
	  if (stock > 0) {
		document.getElementById('buy_'+id).style.display = "block";
		document.getElementById('sold_'+id).style.display = "none";
   	    document.getElementById('spinner_'+id).style.display = "none";
		
		// run subsequent, product-specific stock routines
		switch(id) {
			case 'prod_HnDKjocftAwMDg':
				if (stock < 3) {
					document.getElementById('buy-three-prod_HnDKjocftAwMDg-button').disabled = true;
				}
				if (stock < 2) {
					document.getElementById('buy-two-prod_HnDKjocftAwMDg-button').disabled = true;
				}
				break;          	

			case 'prod_Ikiux0gW5aNJv3':
				break;
		}
	  }
	  else {
   	    document.getElementById('spinner_'+id).style.display = "none";
		document.getElementById('buy_'+id).style.display = "none";
		document.getElementById('sold_'+id).style.display = "block";
	  }
  }
    