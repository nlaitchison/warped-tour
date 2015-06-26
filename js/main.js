
(function($) {

	function sortList() {

	    var ul = $('#band-list');
	    var li = ul.children("li");

	    li.detach().sort(function(a, b) {
	        var date1 = new Date (new Date().toDateString() + ' ' + $(a).children('span.time').text());
	        var date2 = new Date (new Date().toDateString() + ' ' + $(b).children('span.time').text());
	        console.log(date1, date2);
	        var result = (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
	        return result;
	    });

	    ul.append(li);
	}

	jQuery('#add-band').on('click', function(){
		if( jQuery('#hour').val() != '' && jQuery('#minute').val() != '' && jQuery('#band').val() != '' && jQuery('#stage').val() != '' ){
			var item = {
				'hour' : jQuery('#hour').val(),
				'min' : jQuery('#minute').val(),
				'band' : jQuery('#band').val(),
				'stage' : jQuery('#stage').val(),
			};
	
			jQuery('#hour').val('');
			jQuery('#minute').val('');
			jQuery('#band').val('');
			jQuery('#stage').val('');
			$('#s-results').empty();
	
			var t = '';
			if( item.hour == 11 )
				var t = 'am';
			else
				var t = 'pm';
	
			jQuery('#band-list').append('<li><span class="time">'+item.hour+':'+item.min+' '+t+' </span><span class="band">'+item.band+' </span><span class="stage">'+item.stage+' </span></li>')
	
			sortList();
		}

	});

// ---------------------------------------------------------------------------------------------------------------------
// TIPUE DROP
// ---------------------------------------------------------------------------------------------------------------------
/*
Tipue drop 4.0
Copyright (c) 2014 Tipue
Tipue drop is released under the MIT License
http://www.tipue.com/drop
*/
	$.fn.tipuedrop = function(options) {

		var set = $.extend( {
		   'show'                   : 15,
		   'speed'                  : 300,
		   'newWindow'              : false,
		   'mode'                   : 'static',
		   'contentLocation'        : 'js/bands.json'
		}, options);

		return this.each(function() {

			var tipuedrop_in = {
			    bands: []
			};

			$.ajaxSetup({
			    async: false
			});

			if (set.mode == 'json')
			{
			    $.getJSON(set.contentLocation,
			         function(json)
			         {
			              tipuedrop_in = $.extend({}, json);
			         }
			    );
			}

			if (set.mode == 'static')
			{
			    tipuedrop_in = $.extend({}, warpedTour);
			}

			var keyCount = 0;

			$(this).on('focus', function(e){
				getTipuedrop($('#band'));
			});

			$(this).keyup(function(e)
			{
				if(e.keyCode == 8){
					keyCount--;
				}else{
					keyCount++;
				}
				if(keyCount >1){
					getTipuedrop($(this));
				} else{
					$('#s-results').empty();
				}
			});

			$('body').on('click', '#s-results li', function(){
				$('body').find('#band').val(jQuery(this).data('band'));
				$('body').find('#stage').val(jQuery(this).data('stage'));
			});

			function getTipuedrop($obj)	{
	            if ($obj.val()){
					var c = 0;
					var ci = 0;

					for (var i = 0; i < tipuedrop_in.bands.length; i++){
						var obj = '^' + $obj.val();
	                    var pat = new RegExp(obj, 'i');
						var data = tipuedrop_in.bands[i].band;

						if(c < set.show){

							if(data.search(pat) !== -1 ){

								if (ci === 0)
								{
									var bnd = '';
								}

								bnd += '<li data-band="'+tipuedrop_in.bands[i].band+'" data-stage="'+tipuedrop_in.bands[i].stage+'">' + tipuedrop_in.bands[i].band + ' - ' + tipuedrop_in.bands[i].stage + '</li>';
								c++;
								ci++;

							}else {
								$('#s-results').html('<li>No bands found...</li>');
							}
						}

	                }
	                if (c !== 0) {
						$('#s-results').empty();
						$('#s-results').html(bnd);
					}
	            } else{
	            	$('#s-results').html('<li>Start typing...</li>');
	            	keyCount = 0;
	            }
			}
		});
	};

})(jQuery);