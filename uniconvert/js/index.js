'use strict';
const categorySelect = $('.converter__category');
const inputField = $('.converter__input_value');
const inputUnitSelector = $('.converter__input_unit');
const outputField = $('.converter__output_value');
const outputUnitSelector = $('.converter__output_unit');
const btnSwitch = $('.converter__switch-button');
const btnConvert = $('.converter__button');
const btnShowDropdown = $('.app__body_dropdown-btn');
const dropdownMenu = $('.app__body_dropdown');
let currencies;

const getConverseRate = async (from, to) => {
	const request = `https://api.currencyscoop.com/v1/latest?api_key=61813c249f924c0140fefc162e6a8c17&symbols=${to}&base=${from}`;
	const response = await fetch(request);
	if (!response.ok) throw new Error(response.status);
	const data = await response.json();
	return data.response.rates[to];
};

const calcOutput = (input, from, to) => {
	return getConverseRate(from, to).then((rate) => input * rate);
};

const setUnits = () => {
	// fetch('../currencies.json')
	fetch(
		'https://raw.githubusercontent.com/glebhubarevich/UniConv/e285504c2b706f4971f87e5b9c73c3d29841b064/currencies.json'
	)
		.then((request) => request.json())
		.then((data) => (currencies = data))
		.then(() => {
			for (const c of Object.keys(currencies)) {
				const html = `<option value="${currencies[c].currency_code}">${currencies[c].currency_name}</option>`;
				inputUnitSelector.append(html);
				outputUnitSelector.append(html);
			}
		});
};
setUnits();
btnConvert.click((e) => {
	e.preventDefault();
	const value = inputField.val();
	const from = inputUnitSelector.val();
	const to = outputUnitSelector.val();
	outputField.val('Loading...');
	const getOutput = async () => {
		const output = await calcOutput(value, from, to);
		outputField.val(output.toFixed(4));
	};
	getOutput();
});

btnSwitch.click((e) => {
	e.preventDefault;
	const a = inputUnitSelector.val();
	inputUnitSelector.val(outputUnitSelector.val());
	outputUnitSelector.val(a);
	outputField.val('');
});

//Dropdown menu behaviour:

btnShowDropdown.click(() => {
	dropdownMenu.toggleClass('hidden');
	btnShowDropdown.toggleClass('active');
});
