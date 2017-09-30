function loadData() {

	var $body = $('body');
	var $wikiElem = $('#wikipedia-links');
	var $nytHeaderElem = $('#nytimes-header');
	var $nytElem = $('#nytimes-articles');
	var $greeting = $('#greeting');

	// clear out old data before new request
	$wikiElem.text("");
	$nytElem.text("");

	var $street = $('#street').val();
	var $city = $('#city').val();

	var $apiKey = 'AIzaSyBvBaZKwGncTekf1DXUTks76-zNi_b4Sbw';

	if ($city) {
		$body
				.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location='
						+ $city + '&key=' + $apiKey + '">');
		var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
				+ $city + '&format=json';
	} else {
		$body
				.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=Boston,MA&key='
				+ $apiKey + '">');
		var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=Boston,MA&format=json';
	}

    $greeting.text("");

    if ($city) {
        $greeting.append('So you want to live at ' + $street + ' ' + $city + '?');
    } else {
        $greeting.append('Do you want to live at Boston ?');

    }
	if ($city) {
		var nyTimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="
				+ $city
				+ "&response-format=jsonp&callback=svc_search_v2_articlesearch&sort=newest&api-key=6e51c4aec16644669714bb5788675770"
	} else {
		var $city = "Boston"
		var nyTimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="
				+ $city
				+ "&response-format=jsonp&callback=svc_search_v2_articlesearch&sort=newest&api-key=6e51c4aec16644669714bb5788675770"
	}
	$.getJSON(
			nyTimesUrl,
			function(data) {

				$nytHeaderElem.text('New York Times Articles About ' + $city);

				data.response.docs.forEach(function(article) {
					$('#nytimes-articles').append(
							'<li class="article">' + '<a href='
									+ article.web_url + '>"'
									+ article.headline.main + '</a>' + '<p>'
									+ article.snippet + '</p></li>');
				});
			}).error(function(e) {
		$nytHeaderElem.text('New York Times Articles could not be loaded');
	});

	var wikiTimeout = setTimeout(function() {
		$wikiElem.text("Failed to load wikipedia resources");
	}, 8000);

	$.ajax({
		url : wikiUrl,
		dataType : "jsonp",
		jsonp : "callback",
		success : function(response) {
			$wikiElem.text('Wikipedia links of  ' + $city);
			response[1].forEach(function(wikiLink) {
				console.log(wikiLink);
				$('#wikipedia-links').append(
						'<li><a href=https://en.wikipedia.org/wiki/' + wikiLink
								+ '>' + wikiLink + '</a>');
			});
			clearTimeout(wikiTimeout);
		}
	});

	return false;
};

$('#form-container').submit(loadData);

loadData();

var myCenter=new google.maps.LatLng(42.3140089,-71.2504676);

function initialize()
{
    var mapProp = {
      center:myCenter,
      zoom:5,
      mapTypeId:google.maps.MapTypeId.ROADMAP
      };

    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

    var marker=new google.maps.Marker({
      position:myCenter,
      });

    marker.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initialize);