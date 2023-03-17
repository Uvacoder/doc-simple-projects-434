if (document.documentElement.dataset.theme === "dark") {
    document.getElementById("moon").style.display = "none";
    document.getElementById("sun").style.display = "block";
  } else {
    document.getElementById("moon").style.display = "block";
    document.getElementById("sun").style.display = "none";
    document.getElementById("change-theme-button").style.borderColor = "black";
  }
  const globalNewConfirmed = document.querySelector(".new-confirmed"),
    globalTotalConfirmed = document.querySelector(".total-confirmed"),
    globalNewDeaths = document.querySelector(".new-deaths"),
    globalTotalDeaths = document.querySelector(".total-deaths"),
    indiaNewConfirmed = document.querySelector(".india-new-confirmed"),
    indiaTotalConfirmed = document.querySelector(".india-total-confirmed"),
    indiaNewDeaths = document.querySelector(".india-new-deaths"),
    indiaTotalDeaths = document.querySelector(".india-total-deaths"),
    localNewConfirmed = document.querySelector(".local-new-confirmed"),
    localTotalConfirmed = document.querySelector(".local-total-confirmed"),
    localNewDeaths = document.querySelector(".local-new-deaths"),
    localTotalDeaths = document.querySelector(".local-total-deaths"),
    stateTotalConfirmed = document.querySelector(".state-total-confirmed"),
    stateTotalDeaths = document.querySelector(".state-total-deaths"),
    stateTotalRecovered = document.querySelector(".state-total-recovered"),
    countryDiv = document.querySelector("#country-div"),
    stateDiv = document.querySelector("#state-div"),
    summary1 = document.querySelector("#summary-1"),
    summary2 = document.querySelector("#summary-2"),
    grid1 = document.querySelector("#grid-1"),
    grid2 = document.querySelector("#grid-2"),
    detGrid1 = document.querySelector("#details-grid-1"),
    detGrid2 = document.querySelector("#details-grid-2"),
    bodyDate = document.querySelector("#date");
  let date = new Date(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear(),
    fullDate = `<em>Data last fetched on ${day}/${month}/${year}</em>`;
  bodyDate.innerHTML = fullDate;
  var currentBool1 = !0,
    currentBool2 = !0;
  (countryDiv.style.display = "none"),
    (stateDiv.style.display = "none"),
    (localNewConfirmed.style.display = "none"),
    (localTotalConfirmed.style.display = "none"),
    (localNewDeaths.style.display = "none"),
    (localTotalDeaths.style.display = "none"),
    (stateTotalConfirmed.style.display = "none"),
    (stateTotalDeaths.style.display = "none"),
    (stateTotalRecovered.style.display = "none"),
    (globalNewConfirmed.style.display = "none"),
    (globalTotalConfirmed.style.display = "none"),
    (globalNewDeaths.style.display = "none"),
    (globalTotalDeaths.style.display = "none"),
    (indiaNewConfirmed.style.display = "none"),
    (indiaTotalConfirmed.style.display = "none"),
    (indiaNewDeaths.style.display = "none"),
    (indiaTotalDeaths.style.display = "none");
  const countryName = document.querySelector("#country-name-para"),
    stateName = document.querySelector("#state-name-para"),
    searchButton1 = document.querySelector(".button-country"),
    searchButton2 = document.querySelector(".button-state");
  var counArray = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Brazil",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo (Brazzaville)",
      "Congo (Kinshasa)",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Côte d'Ivoire",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "Fiji",
      "Finland",
      "France",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Grenada",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Holy See (Vatican City State)",
      "Honduras",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran, Islamic Republic of",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea (South)",
      "Kuwait",
      "Kyrgyzstan",
      "Lao PDR",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macedonia, Republic of",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Micronesia, Federated States of",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestinian Territory",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Republic of Kosovo",
      "Romania",
      "Russian Federation",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent and Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic (Syria)",
      "Taiwan, Republic of China",
      "Tajikistan",
      "Tanzania, United Republic of",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States of America",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela (Bolivarian Republic)",
      "Viet Nam",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ],
    stateArray = [
      "Andaman and Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Ladakh",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "State Unassigned",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ];
  async function showDataGlobal() {
    var fetchedData = await axios.get("https://api.covid19api.com/summary");
    (globalNewConfirmed.style.display = ""),
      (globalTotalConfirmed.style.display = ""),
      (globalNewDeaths.style.display = ""),
      (globalTotalDeaths.style.display = ""),
      (globalNewConfirmed.innerHTML = `New Confirmed Cases: ${fetchedData.data.Global.NewConfirmed.toString().replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )}`),
      (globalTotalConfirmed.innerHTML = `Total Confirmed Cases: ${fetchedData.data.Global.TotalConfirmed.toString().replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )}`),
      (globalNewDeaths.innerHTML = `New Deaths: ${fetchedData.data.Global.NewDeaths.toString().replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )}`),
      (globalTotalDeaths.innerHTML = `Total Deaths: ${fetchedData.data.Global.TotalDeaths.toString().replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )}`);
  }
  async function showDataIndia() {
    var fetchedData = await axios.get("https://api.covid19api.com/summary");
    (indiaNewConfirmed.style.display = ""),
      (indiaTotalConfirmed.style.display = ""),
      (indiaNewDeaths.style.display = ""),
      (indiaTotalDeaths.style.display = ""),
      (indiaNewConfirmed.innerHTML = `New Confirmed Cases: ${fetchedData.data.Countries[76].NewConfirmed.toString().replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )}`),
      (indiaTotalConfirmed.innerHTML = `Total Confirmed Cases: ${fetchedData.data.Countries[76].TotalConfirmed.toString().replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )}`),
      (indiaNewDeaths.innerHTML = `New Deaths: ${fetchedData.data.Countries[76].NewDeaths.toString().replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )}`),
      (indiaTotalDeaths.innerHTML = `Total Deaths: ${fetchedData.data.Countries[76].TotalDeaths.toString().replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )}`);
  }
  async function showDataCountry(country) {
    var fetchedData = await axios.get("https://api.covid19api.com/summary");
    searchButton1.ariaBusy = !1;
    for (let val of fetchedData.data.Countries)
      val.Country.toUpperCase() === country.toUpperCase() &&
        ((countryDiv.style.display = ""),
        (localNewConfirmed.style.display = ""),
        (localTotalConfirmed.style.display = ""),
        (localNewDeaths.style.display = ""),
        (localTotalDeaths.style.display = ""),
        (countryName.innerHTML = `Covid report for ${val.Country}`),
        0 === val.NewConfirmed
          ? (localNewConfirmed.innerHTML =
              "No new cases in the past 24 hours or the data is unreported.")
          : (localNewConfirmed.innerHTML = `New Confirmed Cases: ${val.NewConfirmed.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )}`),
        (localTotalConfirmed.innerHTML = `Total Confirmed Cases: ${val.TotalConfirmed.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )}`),
        0 === val.NewDeaths
          ? (localNewDeaths.innerHTML =
              "No deaths in the past 24 hours or the data is unreported.")
          : (localNewDeaths.innerHTML = `New Deaths: ${val.NewDeaths.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )}`),
        (localTotalDeaths.innerHTML = `Total Deaths: ${val.TotalDeaths.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )}`));
  }
  async function showDataState(stateGot) {
    var fetchedData = await axios.get(
      "https://api.rootnet.in/covid19-in/stats/latest"
    );
    searchButton2.ariaBusy = !1;
    for (let val of fetchedData.data.data.regional)
      val.loc.toUpperCase() === stateGot.toUpperCase() &&
        ((stateDiv.style.display = ""),
        (stateTotalConfirmed.style.display = ""),
        (stateTotalDeaths.style.display = ""),
        (stateTotalRecovered.style.display = ""),
        (stateTotalConfirmed.innerHTML = `Total confirmed cases: ${val.totalConfirmed
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`),
        (stateTotalDeaths.innerHTML = `Total deaths: ${val.deaths
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`),
        (stateTotalRecovered.innerHTML = `Total recovered: ${val.discharged
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`),
        (stateName.innerHTML = `Covid report for ${val.loc}`));
  }
  function autocomplete(inp, arr) {
    var currentFocus;
    function addActive(x) {
      if (!x) return !1;
      removeActive(x),
        currentFocus >= x.length && (currentFocus = 0),
        currentFocus < 0 && (currentFocus = x.length - 1),
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++)
        x[i].classList.remove("autocomplete-active");
    }
    function closeAllLists(elmnt) {
      for (
        var x = document.getElementsByClassName("autocomplete-items"), i = 0;
        i < x.length;
        i++
      )
        elmnt != x[i] && elmnt != inp && x[i].parentNode.removeChild(x[i]);
    }
    inp.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;
      if ((closeAllLists(), !val)) return !1;
      for (
        currentFocus = -1,
          (a = document.createElement("DIV")).setAttribute(
            "id",
            this.id + "autocomplete-list"
          ),
          a.setAttribute("class", "autocomplete-items"),
          this.parentNode.appendChild(a),
          i = 0;
        i < arr.length;
        i++
      )
        arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() &&
          (((b = document.createElement("DIV")).innerHTML =
            "<strong>" + arr[i].substr(0, val.length) + "</strong>"),
          (b.innerHTML += arr[i].substr(val.length)),
          (b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>"),
          b.addEventListener("click", function (e) {
            (inp.value = this.getElementsByTagName("input")[0].value),
              closeAllLists();
          }),
          a.appendChild(b));
    }),
      inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        x && (x = x.getElementsByTagName("div")),
          40 == e.keyCode
            ? (currentFocus++, addActive(x))
            : 38 == e.keyCode
            ? (currentFocus--, addActive(x))
            : 13 == e.keyCode &&
              (e.preventDefault(),
              currentFocus > -1 && x && x[currentFocus].click());
      }),
      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
  }
  summary1.addEventListener("click", function () {
    (currentBool1 = !currentBool1) &&
      ((stateTotalConfirmed.style.display = "none"),
      (stateTotalDeaths.style.display = "none"),
      (stateTotalRecovered.style.display = "none"),
      (stateTotalConfirmed.innerHTML = ""),
      (stateTotalDeaths.innerHTML = ""),
      (stateTotalRecovered.innerHTML = ""),
      (stateName.innerHTML = ""),
      (stateDiv.style.display = "none")),
      (detGrid2.open = !1);
  }),
    summary2.addEventListener("click", function () {
      (currentBool2 = !currentBool2) &&
        ((localNewConfirmed.style.display = "none"),
        (localTotalConfirmed.style.display = "none"),
        (localNewDeaths.style.display = "none"),
        (localTotalDeaths.style.display = "none"),
        (localNewConfirmed.innerHTML = ""),
        (localTotalConfirmed.innerHTML = ""),
        (localNewDeaths.innerHTML = ""),
        (localTotalDeaths.innerHTML = ""),
        (countryName.innerHTML = ""),
        (countryDiv.style.display = "none")),
        (detGrid1.open = !1);
    }),
    searchButton1.addEventListener("click", function () {
      var country = document.querySelector(".input1").value;
      (searchButton1.ariaBusy = !0), showDataCountry(country);
    }),
    searchButton2.addEventListener("click", function () {
      var state = document.querySelector(".input2").value;
      (searchButton2.ariaBusy = !0), showDataState(state);
    }),
    showDataGlobal(),
    showDataIndia(),
    autocomplete(document.getElementById("myInput1"), counArray),
    autocomplete(document.getElementById("myInput2"), stateArray),
    "serviceWorker" in navigator &&
      navigator.serviceWorker
        .register("service-worker.js")
        .then(function (reg) {
          console.log(reg);
        })
        .catch(function (err) {
          console.log(err);
        });
  const changeThemeButton = document.getElementById("change-theme-button");
  changeThemeButton.addEventListener("click", () => {
    document.documentElement.dataset.theme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    if (document.documentElement.dataset.theme === "dark") {
      document.getElementById("moon").style.display = "none";
      document.getElementById("sun").style.display = "block";
      document.getElementById("change-theme-button").style.borderColor = "white";
    } else {
      document.getElementById("moon").style.display = "block";
      document.getElementById("sun").style.display = "none";
      document.getElementById("change-theme-button").style.borderColor = "black";
    }
  });
