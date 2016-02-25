
$(document).on('click','.layer', function(event) {

	event.stopPropagation();

	var element = event.target;

	if ( element.type && element.className == 'button show_next') {
		//idEle = [layerNumber, number of parents company]
		var elemetId = ( $(element).attr('id') ).split('_');		
	
		$(element).addClass('selected');

		$.get('http://localhost:9999/showNext/?layer=' + ++elemetId[0] +
												'&parent=' +  elemetId[1], 
			function(data) {
				$(element).parents('li').append(data);
		})
	}
	else {
		if ( element.type ) {
			$(element).next('.layer').remove()
			$(element).removeClass('selected')		
		}
	}

})
