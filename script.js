fetch_data = () => {
	return fetch("https://restcountries.eu/rest/v2/all");
}


var create_card = country => {
	var card = '\
		<div class="card my-crd-header">\
			<div class="card-header" style="text-align: center">\
				'+country.name + '\
			</div>\
			<div class="card-body my-crd-body" >\
				<img height="100px" src="'+country.flag+'"/>\
				<p>Capital: '+country.capital+' </p>\
				<p>Region: '+country.region+' </p>\
				<p>Country Code: '+country.cioc+' </p>\
				<button class="my-btn" onclick="weather_on_click(\''+country.name+'\','+country.latlng[0]+','+country.latlng[1]+')" class="btn btn-primary">Click for Weather</button>\
				<h6 id="'+country.name+'"></h6>\
			</div>\
		</div>\
	'

	return card
}

var add_row = countries => {
	var new_row = '<div class="row my-rw" style="margin-bottom: 10px;">'

	for (var i = 0; i < countries.length; i++) {
		new_row += '<div class="col-lg-4 col-sm-12">'
		new_row += create_card(countries[i])
		new_row += '</div>'
	}

	new_row += '</div>'

	return new_row
}

weather_on_click = async (country_name,lat,lon) => {
    var data = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=b488f57838bc5127d09ad8afc0acf5e1');
    data = await data.json();
    document.getElementById(country_name).innerHTML = data.weather[0].description;
}

var set_data = async () => {
	var countries = await fetch_data();
	countries = await countries.json();

	console.log(countries)

	var inner_html = ''

	for (var i = 0; i < countries.length-2; i+=3) {
		inner_html += add_row([countries[i],countries[i+1],countries[i+2]])
	}


	document.getElementById('main_container').innerHTML = inner_html;
}


set_data();