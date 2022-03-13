  function emailSignup() {
  	  var e = document.getElementById('email').value;
  	  if (e.length<=0) return;
	  if (!validateEmail(e)) {
		document.getElementById('email').style.background = "red";
	  }
	  else {
		document.getElementById('email').style.background = "transparent";
		var payload = { 'email': e };
		
		fetch('/subscribe-email', {
		  method: 'POST',
		  body: JSON.stringify(payload)
		})
		.then(function(response) {
		  document.getElementById('email').value='';
		  document.getElementById('email-subscribed').style.display = 'block';
		  document.getElementById('email-subscribe-form').style.display = 'none';
		})
		.catch(function(error) {
		  console.error(error);
		});
		
	  }
  }
 
  function validateEmail(email) {
    	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(String(email).toLowerCase());
  }
