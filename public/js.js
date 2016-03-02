function main() {
  return 'Hello, World!';
}

main();

var host = location.href;


var list = document.getElementById('companies_list');	
list.addEventListener('click', function (event) {
	event.stopPropagation();

	var elem = event.target,
		liContainer = elem.closest('li'),
		elemId = liContainer.id,
		elemClassList = elem.classList;
	
	if ( elemClassList.contains("show_children") ) {

		if( ! elemClassList.contains('selected') ) {

			elemClassList.add('selected');

			var res = reqToServer(host, 'showChildren', {parentId: elemId});

			res.addEventListener('load', function () {
				liContainer.insertAdjacentHTML('beforeend', res.responseText);
			});	
		} 
		else {
			liContainer.querySelector('ul').remove();
			elemClassList.remove('selected');
			
		}
	}

	if ( elemClassList.contains('del_company') ) {

	
		var button = liContainer.querySelector(".show_children");
		
		if ( button && button.classList.contains('selected') ) {
			button.click();
		}											

		var res = reqToServer(host, 'deleteCompany', {companyId: elemId});

		res.addEventListener('load', function() {
			if ( res.status == 200 ) {

				if ( elem.closest('ul').childNodes.length == 1 ) {

					var parentButton = liContainer.closest('ul').closest('li').
							querySelector('.show_children');	
					parentButton.click();
					parentButton.remove();
				} 
				else {
					liContainer.remove();
				}		
			}
		}); 
	}

	if ( elemClassList.contains('show_form') ) {

		var button = document.getElementById(elem.name);
		
		button.closest('div').style.display = 'block';
		button.name = elemId;

		if ( elem.name == 'edit_company' ) {
			var form = button.closest('form');
			form.name.value = liContainer.querySelector('.name').textContent;
			form.earnings.value = liContainer.querySelector('.earnings').textContent;
		}
	}
});


var buttonsValidate = document.getElementsByClassName('validate_form');
for (var i=0; i<buttonsValidate.length; i++) {

	buttonsValidate[i].addEventListener('click', function(event) {		
		event.stopPropagation();

		var form = this.closest('form');

		if ( validate(form) ) {

			var name = form.name.value,
				earnings = form.earnings.value,
				elemId = this.name,
				liContainer = document.getElementById(elemId);

			var res = reqToServer(host, 'addNewCompany', {
							name: name,
							earnings: earnings,
							company_id: elemId
						});
			
			if ( this.id == 'add_company') {
				res.addEventListener('load', function() {
			
					var buttonShow = liContainer.querySelector(".show_children");

					if ( buttonShow && buttonShow.classList.contains('selected') ) {

						liContainer.querySelector('ul').
							insertAdjacentHTML('beforeend', res.responseText);
					} 
					if ( !buttonShow ) {
						var newButton = document.createElement('button');
						newButton.className += 'button show_children';
						newButton.innerHTML = '>>>';
						liContainer.appendChild(newButton);
					}
				});
			}

			if (this.id == 'edit_company') {
				res.addEventListener('load', function() {

					var ulContainer = liContainer.closest('ul');
					
					var parser = new DOMParser();  
					var newLiContainer = parser.
						parseFromString(res.responseText, "text/html").querySelector('li');
					
					ulContainer.replaceChild(newLiContainer, liContainer);
				});			
			}

			this.closest('div').style.display = "none";
			resetForm(form);
		}	
	});
}


var buttonsCancel = document.getElementsByClassName('cancel');
for (var i=0; i<buttonsCancel.length; i++) {
	buttonsCancel[i].addEventListener('click', function(event) {
		event.stopPropagation();	
		var elem = event.target;

		elem.closest('div').style.display = "none";
		resetForm(elem.closest('form'));	
	});
}




function validate(form) {

	var valid = true;

	resetError(form.name.nextSibling);
	if ( !form.name.value ) {
		form.name.className = 'error';
		showError(form.name.closest('span'), 'type the earnings');
		valid = false	;
	}

	resetError(form.earnings.nextSibling);
	if ( !form.earnings.value ) {
		form.earnings.className = 'error';
		showError(form.earnings.closest('span'), 'type the earnings');
		valid = false;	
	}
	return valid;
}

function showError(container, errorMessage) {
      var msgElem = document.createElement('span');
      msgElem.className = "error_message";
      msgElem.innerHTML = errorMessage;
      container.appendChild(msgElem);
}


function resetError(msgElem) {
	if ( msgElem ) {
		msgElem.previousSibling.className = '';
		msgElem.remove();
	}
}

function resetForm(form) {
	form.reset();
	resetError(form.name.nextSibling);
	resetError(form.earnings.nextSibling);		
}

function reqToServer (host, urlPath, queryObject) {	
	var request = new XMLHttpRequest();	
	request.open('GET', host + urlPath + '?query=' + 
							JSON.stringify(queryObject) );
	request.send();
	return request;
}

// window.addEventListener('keydown', function(event) {
	
// 	if ( windAddCompany.style.display == 'block' ) {
// 		if ( event.keyCode == 27 ) {
// 			console.log(buttonsCancel[1])
// 			buttonsCancel[2].click();
// 		}
// 		if (event.keyCode == 13 ) {
// 			document.getElementById('create_company').click();
// 		}
// 	}
// })	