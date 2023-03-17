feather.replace(); // To load icons from CDN

const image = document.querySelector("#body"); // Body
const mainData = document.querySelector("#main-data"); // Data container
const temp = document.querySelector("#temp"); // Temperature
const errorMsg = document.querySelector(".errorMsg"); // Error Message
const search = document.querySelector(".search-wrapper"); // Search: Input and Button
const input = search.querySelector(".search-input"); // Search Input
const searchBtn = search.querySelector(".search"); // Search Button
const toggleSearch = document.querySelector("#toggle-search"); // Toggle Search Button
const city = document.querySelector("#city"); // City
const status = document.querySelector("#status"); // Weather Status
const options = document.querySelectorAll(".options"); // Menu options
const underline = document.querySelector(".underline"); // Underline on active option
const iconInfo = document.querySelector(".dev"); // Developer and icon info
/* ----- Detailed Weather Information ----- */
const cloudCover = document.querySelector(".cloud-cover"); // Cloud Cover
const humidityMeasure = document.querySelector(".humidity"); // Humidity
const windSpeed = document.querySelector(".wind-speed"); // Wind Speed
const pressureMeasure = document.querySelector(".pressure"); // Pressure
const sunRise = document.querySelector(".sunrise"); // Sunrise time
const sunSet = document.querySelector(".sunset"); // Sunset time

const APIKey = "3ea64c578c387dbcb25e4ef16486eed1";

let currLatitude;
let currLongitude;

// What menu options do
options.forEach((option) =>
	option.addEventListener("click", function () {
		// If Fahrenheit button is clicked
		if (this.id == "fahrenheit") {
			iconInfo.classList.remove("display");
			search.classList.remove("toggled-search");
			underline.style.transform = "translateX(50px)";
		}
		// If More button is clicked
		else if (this.id == "more") {
			underline.style.transform = "translateX(100px)";
			mainData.classList.toggle("expanded-data");
			iconInfo.classList.remove("display");
			search.classList.remove("toggled-search");
		}
		// If Toggle Search button is clicked
		else if (this.id == "toggle-search") {
			if (mainData.classList.contains("expanded-data")) {
				mainData.classList.remove("expanded-data");
			}
			iconInfo.classList.remove("display");
			underline.style.transform = "translateX(150px)";
			search.classList.toggle("toggled-search");
			input.focus();
		}
		// If Your location button is clicked
		else if (this.id == "your-location") {
			iconInfo.classList.remove("display");
			underline.style.transform = "translateX(200px)";
			search.classList.remove("toggled-search");
		}
		// If Information button is clicked
		else if (this.id == "info") {
			iconInfo.classList.toggle("display");
			search.classList.remove("toggled-search");
		}
		// If Celcius button is clicked
		else {
			iconInfo.classList.remove("display");
			search.classList.remove("toggled-search");
			underline.style.transform = "translateX(0px)";
		}
	})
);

// Check if Geolocation works or if it's allowed or blocked
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(success, fail);
}

// Function to execute if Geolocation is successful
function success(position) {
	currLatitude = position.coords.latitude;
	currLongitude = position.coords.longitude;
	getData(`lat=${currLatitude}&lon=${currLongitude}`);
}

// Get Weather data
function getData(coordinate) {
	// API URL
	const url = `https://api.openweathermap.org/data/2.5/weather?${coordinate}&appid=${APIKey}&units=metric`;
	// Get JSON Data about weather
	$.getJSON(url, function (data) {
		// Get Temperature in Celcius
		let celcius = data.main.temp;
		celcius = celcius.toFixed(2);
		// Get Temperature in Fahrenheit
		let fahrenheit = celcius * 1.8 + 32;
		fahrenheit = fahrenheit.toFixed(2);
		// Write data to temp
		temp.innerHTML = `${celcius}&deg;C`;

		// Updates body image and status icon
		if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
			status.src = "media/storm-stat.svg";
			image.style.background =
				"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/storm.jpg')";
		} else if (
			(data.weather[0].id >= 300 && data.weather[0].id <= 321) ||
			(data.weather[0].id >= 500 && data.weather[0].id <= 531)
		) {
			status.src = "media/rainy-stat.svg";
			image.style.background =
				"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/rainy.jpg')";
		} else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
			status.src = "media/snowy-stat.svg";
			image.style.background =
				"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/snowy.jpg')";
		} else if (
			(data.weather[0].id >= 701 && data.weather[0].id <= 781) ||
			(data.weather[0].id >= 951 && data.weather[0].id <= 962)
		) {
			status.src = "media/windy-stat.svg";
			image.style.background =
				"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/windy.jpg')";
		} else if (data.weather[0].id == 800) {
			status.src = "media/sunny-stat.svg";
			image.style.background =
				"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/sunny.jpg')";
		} else if (data.weather[0].id == 801) {
			status.src = "media/halfsunny-stat.svg";
			image.style.background =
				"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/halfsunny.jpg')";
		} else if (data.weather[0].id >= 802 && data.weather[0].id <= 804) {
			status.src = "media/cloudy-stat.svg";
			image.style.background =
				"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/cloudy.jpg')";
		} else if (data.weather[0].id == 906) {
			status.src = "media/hail-stat.svg";
			image.style.background =
				"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/hail.jpg')";
		} else {
			status.src = "media/thermometer-stat.svg";
			image.style.background =
				"linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0) 80%), url('media/other.jpg')";
		}

		// Write Detailed Weather Information
		// Write City
		city.innerHTML = data.name;
		// Write Humidity
		humidityMeasure.textContent = `${data.main.humidity}%`;
		// Write Wind Speed
		windSpeed.textContent = `${data.wind.speed} m/s`;
		// Write Pressure
		pressureMeasure.textContent = `${data.main.pressure} hPa`;
		// Write Cloud Cover
		cloudCover.textContent = `${data.clouds.all}%`;
		// Write Sunrise
		const sunriseDate = new Date(data.sys.sunrise * 1000);
		let sunriseHour = sunriseDate.getHours();
		let sunriseMinutes = sunriseDate.getMinutes();
		let sunriseTime = `${
			sunriseHour >= 12 ? sunriseHour - 12 : sunriseHour
		}:${sunriseMinutes} ${sunriseHour < 12 ? "AM" : "PM"}`;
		sunRise.textContent = sunriseTime;
		// Write Sunset
		const sunsetDate = new Date(data.sys.sunset * 1000);
		let sunsetHour = sunsetDate.getHours();
		let sunsetMinutes = sunsetDate.getMinutes();
		let sunsetTime = `${
			sunsetHour >= 12 ? sunsetHour - 12 : sunsetHour
		}:${sunsetMinutes} ${sunsetHour < 12 ? "AM" : "PM"}`;
		sunSet.textContent = sunsetTime;

		// Display type for children in the Main Data
		for (var i = 0; i < mainData.childElementCount; i++) {
			if (mainData.children[i].tagName == "TABLE") {
				mainData.children[i].style.display = "table";
			} else {
				mainData.children[i].style.display = "block";
			}
		}
		// What menu options do
		options.forEach((option) =>
			option.addEventListener("click", function () {
				// If Fahrenheit button is clicked
				if (this.id == "fahrenheit") {
					temp.innerHTML = `${fahrenheit}&deg;F`;
				}
				// If Celcius button is clicked
				else {
					temp.innerHTML = `${celcius}&deg;C`;
				}
			})
		);
	});
}
// Get weather for current position
document.querySelector("#your-location").addEventListener("click", () => {
	getData(`lat=${currLatitude}&lon=${currLongitude}`);
});

// Determine Weather by City Search
input.addEventListener("keypress", function (e) {
	if (this.value && e.keyCode == 13) {
		const cityName = this.value;
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`;
		errorMsg.innerHTML = "";
		$.getJSON(url, function (data) {
			const lat = data.coord.lat;
			const lon = data.coord.lon;

			getData(`lat=${lat}&lon=${lon}`);
		});
		this.value = "";
		search.classList.remove("toggled-search");
	}
});
searchBtn.addEventListener("click", function () {
	if (input.value) {
		const cityName = input.value;
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`;
		errorMsg.innerHTML = "";
		$.getJSON(url, function (data) {
			const lat = data.coord.lat;
			const lon = data.coord.lon;

			getData(`lat=${lat}&lon=${lon}`);
		});
		input.value = "";
		search.classList.remove("toggled-search");
	}
});

// Function to execute if Geolocation fails
function fail(error) {
	const errorIcon = "<span>⚠</span>";
	errorMsg.innerHTML = `${errorIcon} An error occurred. Please reload to try again.`;
	image.style.backgroundImage = "url('media/other.jpg')";
}
