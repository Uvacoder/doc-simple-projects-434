// Code By Webdevtrick ( https://webdevtrick.com )
//kaif's addition
const countries=[
	{
		name: "Australia",
		code: "AUD",
		image: "flags/Australia.png"
	},
	{
		name: "USA",
		code: "USD",
		image: "flags/United_States_of_America.png"
	},
	{
		name: "India",
		code: "INR",
		image: "flags/India.png"
	},
    {
		name: "Canada",
		code: "CAD",
		image: "flags/Canada.png"
	},
    {
		name: "United Arab Emirates",
		code: "AED",
		image: "flags/UAE.png"
	},
    {
		name: "Argentina",
		code: "ARS",
		image: "flags/Argentina.png"
	},
    {
		name: "Bulgaria",
		code: "BGN",
		image: "flags/Bulgaria.png"
	},
    {
		name: "Brazil",
		code: "BRL",
		image: "flags/Brazil.png"
	},
    {
		name: "The Bahamas",
		code: "BSD",
		image: "flags/Bahamas.png"
	},
    {
		name: "Switzerland",
		code: "CHF",
		image: "flags/Switzerland.png"
	},
    {
		name: "Chile",
		code: "CLP",
		image: "flags/Chile.png"
	},
    {
		name: "China",
		code: "CNY",
		image: "flags/China.png"
	},
    {
		name: "Colombia",
		code: "COP",
		image: "flags/Colombia.png"
	},
    {
		name: " Czech Republic",
		code: "CZK",
		image: "flags/Czech_Republic.png"
	},
    {
		name: "Denmark",
		code: "DKK",
		image: "flags/Denmark.png"
	},
    {
		name: "Dominican Republic",
		code: "DOP",
		image: "flags/Dominican_Republic.png"
	},
    {
		name: " Egypt",
		code: "EGP",
		image: "flags/Egypt.png"
	},
    {
		name: "Europe",
		code: "EUR",
		image: "flags/Europe.png"
	},
    {
		name: "Fiji",
		code: "FJD",
		image: "flags/Fiji.png"
	},
    {
		name: "Great Britain",
		code: "GBP",
		image: "flags/United_Kingdom.png"
	},
    {
		name: "Guatemala",
		code: "GTQ",
		image: "flags/Guatemala.png"
	},
    {
		name: "Hong Kong",
		code: "HKD",
		image: "flags/Hong_Kong.png"
	},
    {
		name: "Croatia",
		code: "HRK",
		image: "flags/Croatia.png"
	},
    {
		name: "Hungary",
		code: "HUF",
		image: "flags/Hungary.png"
	},
    {
		name: "Indonesia",
		code: "IDR",
		image: "flags/Indonesia.png"
	},
    {
		name: " Israel",
		code: "ILS",
		image: "flags/ Israel.png"
	},
    {
		name: "Iceland",
		code: "ISK",
		image: "flags/Iceland.png"
	},
    {
		name: "Japan",
		code: "JPY",
		image: "flags/Japan.png"
	},
    {
		name: "South Korean",
		code: "KRW",
		image: "flags/South_Korea.png"
	},
    {
		name: "Kazakhstan",
		code: "KZT",
		image: "flags/Kazakhstan.png"
	},
    {
		name: "Mexico",
		code: "MXN",
		image: "flags/Mexico.png"
	},
    {
		name: "Malaysia",
		code: "MYR",
		image: "flags/Malaysia.png"
	},
    {
		name: "Norway",
		code: "NOK",
		image: "flags/Norway.png"
	},
    {
		name: "New Zealand",
		code: "NZD",
		image: "flags/New_Zealand.png"
	},
    {
		name: "New Zealand",
		code: "NZD",
		image: "flags/New_Zealand.png"
	},
    {
		name: "Panama",
		code: "PAB",
		image: "flags/Panama.png"
	},
    {
		name: "Peru",
		code: "PEN",
		image: "flags/Peru.png"
	},
    {
		name: "Philippines",
		code: "PHP",
		image: "flags/Philippines.png"
	},
    {
		name: "Pakistan",
		code: "PKR",
		image: "flags/Pakistan.png"
	},
    {
		name: "Poland",
		code: "PLN",
		image: "flags/Poland.png"
	},
    {
		name: "Paraguay",
		code: "PYG",
		image: "flags/Paraguay.png"
	},    
    {
		name: "Romania",
		code: "RON",
		image: "flags/Romania.png"
	},
    {
		name: "Russian Federation",
		code: "RUB",
		image: "flags/Russian_Federation.png"
	},
    {
		name: "Saudi Arabia",
		code: "SAR",
		image: "flags/Saudi_Arabia.png"
	},
    {
		name: "Sweden",
		code: "SEK",
		image: "flags/Sweden.png"
	},
    {
		name: "Singapore",
		code: "SGD",
		image: "flags/Singapore.png"
	},
    {
		name: "Thailand",
		code: "THB",
		image: "flags/Thailand.png"
	},
    {
		name: " Turkey",
		code: "TRY",
		image: "flags/Turkey.png"
	},
    {
		name: "Taiwan",
		code: "TWD",
		image: "flags/Taiwan.png"
	},
    {
		name: "Ukraine",
		code: "UAH",
		image: "flags/Ukraine.png"
	},
    {
		name: "Uruguay",
		code: "UYU",
		image: "flags/Uruguay.png"
	},
    {
		name: "Vietnam",
		code: "VND",
		image: "flags/Vietnam.png"
	},
    {
		name: "South Africa",
		code: "ZAR",
		image: "flags/South_Africa.png"
	}
];
//kaif's addition
const from_currencyEl = document.getElementById('from_currency');
const from_ammountEl = document.getElementById('from_ammount');
const to_currencyEl = document.getElementById('to_currency');
const to_ammountEl = document.getElementById('to_ammount');
const rateEl = document.getElementById('rate');
const exchange = document.getElementById('exchange');
 
from_currencyEl.addEventListener('change', calculate);
from_ammountEl.addEventListener('input', calculate);
to_currencyEl.addEventListener('change', calculate);
to_ammountEl.addEventListener('input', calculate);
 
exchange.addEventListener('click', () => {
 const temp = from_currencyEl.value;
 from_currencyEl.value = to_currencyEl.value;
 to_currencyEl.value = temp;
 calculate();
});
 
function calculate() {

/////////////////////////
//Kaif's Addition
//for => from currency
countries.forEach(country => {
    if(country.code==from_currencyEl.value)
    from_flag=country.image;
    
});
console.log(from_flag);
img1.src=from_flag;
from_flag='';
//for => to currency
countries.forEach(country => {
    if(country.code==to_currencyEl.value)
    from_flag=country.image;
    
});
console.log(from_flag);
img2.src=from_flag;
from_flag='';
///////////////////////////


 const from_currency = from_currencyEl.value;
 const to_currency = to_currencyEl.value;
 
 fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
 .then(res => res.json())
 .then(res => {
 const rate = res.rates[to_currency];
 rateEl.innerText = `1 ${from_currency} = ${rate} ${to_currency}`
 to_ammountEl.value = (from_ammountEl.value * rate).toFixed(2);
 })
}
 
calculate();
 
 
