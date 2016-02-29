var host = location.href

var list = document.getElementById('companies_list'),
	windAddCompany = document.getElementById('window_add_company');

	
list.addEventListener('click', function (event) {

	event.stopPropagation();
	event.preventDefault();

	var elem = event.target,
		elemId = elem.parentNode.getAttribute('id'),
		elemClassList = elem.classList;

	if ( elemClassList.contains("show_children") ) {

		if( ! elem.classList.contains('selected') ) {

			elem.classList.add('selected');

			var response = requestToServer(host, 'showChildren', {parentId: elemId})

			response.addEventListener('load', function() {
				elem.closest('li').
					insertAdjacentHTML('beforeend', response.responseText)
			});	
		}
		else {
			document.getElementById('company_'+ elemId).remove();
			elem.classList.remove('selected')
		}
	}


	if ( elemClassList.contains('add_company') ) {
		windAddCompany.style.display = "block";
		( document.getElementById('create_company') ).name = elemId
	}


	if ( elemClassList.contains('del_company') ) {

		var button = elem.closest('span').querySelector(".show_children")

		if ( button && button.classList.contains('selected') ) {
			button.click();
		}

		var response = requestToServer(host, 'deleteCompany', {companyId: elemId})

		response.addEventListener('load', function() {
			if ( response.status == 200 ) {

				var parentButton = elem.closest('ul').previousSibling.
											querySelector('.show_children')

				if ( elem.closest('ul').childNodes.length == 1 ) {
					parentButton.click();
					parentButton.remove();
				} else {
					elem.closest('li').remove();
				}		
			}
		}) 
	}
})



windAddCompany.addEventListener('click', function() {

	event.stopPropagation();
	event.preventDefault();

	var elem = event.target,
		form = elem.closest('form');

	if ( elem.id == 'cancel' ) {
		this.style.display = "none";
		resetForm(form);
	}

	if ( elem.id == 'create_company' ) {
		if ( validate(form) ) {

			var name = form.name.value,
				earnings = form.earnings.value,
				elemId = elem.name

			var response = requestToServer(host, 'addNewCompany',
								{
									name: name,
									earnings: earnings,
									parentId: elemId

							});
			
			response.addEventListener('load', function() {
					
				var container = document.getElementById(elemId),
					button = container.querySelector(".show_children");

				if ( button && button.classList.contains('selected') ) {	
					document.getElementById('company_' + elemId).
						insertAdjacentHTML('beforeend', response.responseText)
				} 
				if ( !button ) {
					var newButton = document.createElement('button')
					newButton.className += 'button show_children'
					newButton.innerHTML = '>>>'
					container.appendChild(newButton);
				}		
			})

			windAddCompany.style.display = "none";
			resetForm(form)
		}		
	}
})


function showError(container, errorMessage) {
      var msgElem = document.createElement('span');
      msgElem.className = "error_message";
      msgElem.innerHTML = errorMessage;
      container.appendChild(msgElem);
}


function resetError(msgElem) {
	if ( msgElem ) {
		msgElem.previousSibling.className = ''
		msgElem.remove();
	}
}

function resetForm(form) {
	form.reset();
	resetError(form.name.nextSibling)
	resetError(form.earnings.nextSibling)		
}

function validate(form) {

	var valid = true;

	resetError(form.name.nextSibling)
	if ( !form.name.value ) {
		form.name.className = 'error';
		showError(form.name.closest('span'), 'type the earnings');
		valid = false	
	};

	resetError(form.earnings.nextSibling)
	if ( !form.earnings.value ) {
		form.earnings.className = 'error';
		showError(form.earnings.closest('span'), 'type the earnings');
		valid = false;	
	}

	return valid;
}

function requestToServer (host, urlPath, queryObject) {	

	var request = new XMLHttpRequest();	
	request.open('GET', host + urlPath + '?query=' + 
							JSON.stringify(queryObject) );
	request.send();

	// request.onreadystatechange = function() { 
 //  		console.log(request.readyState)
 //  		if (request.readyState = 4) {
	//   		console.log(request)
  		
 //  		}
 //  	}
	return request;
};


window.addEventListener('keydown', function(event) {
	
	if ( windAddCompany.style.display == 'block' ) {
		if ( event.keyCode == 27 ) {
			document.getElementById('cancel').click();
		}
		if (event.keyCode == 13 ) {
			document.getElementById('create_company').click();
		}
	}
})


