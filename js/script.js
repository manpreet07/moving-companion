
function loadData() {

	var $body = $('body');
	var $wikiElem = $('#wikipedia-links');
	var $nytHeaderElem = $('#nytimes-header');
	var $nytElem = $('#nytimes-articles');
	var $greeting = $('#greeting');

	// clear out old data before new request
	$wikiElem.text("");
	$nytElem.text("");

	// load streetview
	// YOUR CODE GOES HERE!

	var $street = $('#street').val();
	var $city = $('#city').val();

	var $apiKey = 'AIzaSyBXZciFZEY5s_qpEeYi7WJ-Y32I2Mw7PEw';

	if($city){
		$body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + $city + '&key=' + $apiKey + '">');
		var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+$city+'&format=json';
	}
	else{
		$body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=NewYorkCity,NY&key=AIzaSyBXZciFZEY5s_qpEeYi7WJ-Y32I2Mw7PEw">');
		var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=NewYorkCity,NY&format=json';
	}
	
	$greeting.text("");
	$greeting.append('So you want to live at ' + $street + ' ' + $city + '?');
	
	var nyTimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
		$city + "&response-format=jsonp&callback=svc_search_v2_articlesearch&sort=newest&api-key=d781bddc9d95547090d0040cfd9f6bdd:3:74810776"

		$.getJSON(nyTimesUrl, function (data) {
			
			$nytHeaderElem.text('New York Times Articles About ' + $city);
			
			data.response.docs.forEach(function (article) {
				$('#nytimes-articles').append('<li class="article">' +
					'<a href=' + article.web_url + '>"' + article.headline.main + '</a>' +
					'<p>' + article.snippet + '</p></li>');
			});
		}).error(function(e) {
		    $nytHeaderElem.text('New York Times Articles could not be loaded');
		});

	
	

	var wikiTimeout = setTimeout(function(){
		$wikiElem.text("Failed to load wikipedia resources");
	}, 8000);
	
	$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(response){
			$wikiElem.text('Wikipedia links of  ' + $city);
			response[1].forEach(function (wikiLink) {
				console.log(wikiLink);
				$('#wikipedia-links').append('<li><a href=https://en.wikipedia.org/wiki/' + wikiLink + '>' + wikiLink + '</a>');
			});
			clearTimeout(wikiTimeout);
		}	
	});
	
	return false;
};

$('#form-container').submit(loadData);

loadData();


