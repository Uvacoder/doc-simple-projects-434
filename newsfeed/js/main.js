feather.replace(); // To load icons from CDN

const showTagBtn = document.querySelector(".show-tags"); // Show tags button
const tags = document.querySelectorAll(".tag"); // Each tag
const keys = document.querySelectorAll(".key"); // Each key
const refresh = document.querySelector(".refresh"); // Refresh page button
const bookmarks = document.querySelector(".bookmarks"); // Show bookmarks button
const mainBody = document.querySelector(".main-body"); // Main body: Date & Articles
const dailyInfo = document.querySelector(".daily-info"); // Daily Info: Date and weather
const date = document.querySelector(".date"); // Date
const weather = document.querySelector(".weather"); // Weather
const temperature = document.querySelector(".temperature"); // Temperature
const weatherStatus = document.querySelector(".status"); // Weather Status
const bookmarkList = document.querySelector(".bookmarks-list"); // Bookmarks container
const bookmarkArticleBtns = document.querySelectorAll(".bookmark"); // Bookmark article

const newsApiKey = "a01d42f4571b4b7699fd9bd4b68fc29b";
const weatherApiKey = "3ea64c578c387dbcb25e4ef16486eed1";

// Main Articles: Featured and others with image
const mainArticles = document.querySelector(".main-articles");
// Imageless Articles
const imglessArticles = document.querySelector(".imageless-articles");

// Date
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
]; // Name of days
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
]; // Name of Months
const now = new Date();
const day = days[now.getDay()];
const month = months[now.getMonth()];
let today = now.getDate();
let year = now.getFullYear();
today = today.toString();
year = year.toString();

// Display date
date.innerHTML = `${day} <br> ${month} ${today}, ${year}`;

// Check if Geolocation is allowed or blocked for weather
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(success, fail);
}
// Fetch weather if Geolocation is successful
function success(position) {
	// if (window.innerWidth > 876) {
	dailyInfo.style.height = "140px";
	weather.style.borderBottom = "1px solid #ccc";
	weather.style.height = "60px";
	// }
	// API URL
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}&units=metric`;
	// Get Weather Data in JSON Format
	$.getJSON(url, function (data) {
		// Get Temperature in Celcius
		let celcius = data.main.temp;
		celcius = celcius.toFixed(1);

		// Updates weather status icon and temperature
		if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
			weather.innerHTML = `<i data-feather="cloud-lightning"></i>      ${celcius}&deg;C`;
		} else if (
			(data.weather[0].id >= 300 && data.weather[0].id <= 321) ||
			(data.weather[0].id >= 500 && data.weather[0].id <= 531)
		) {
			weather.innerHTML = `<i data-feather="cloud-rain"></i>      ${celcius}&deg;C`;
		} else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
			weather.innerHTML = `<i data-feather="cloud-snow"></i>      ${celcius}&deg;C`;
		} else if (
			(data.weather[0].id >= 701 && data.weather[0].id <= 781) ||
			(data.weather[0].id >= 951 && data.weather[0].id <= 962)
		) {
			weather.innerHTML = `<i data-feather="cloud-rain"></i>      ${celcius}&deg;C`;
		} else if (data.weather[0].id == 800) {
			weather.innerHTML = `<i data-feather="sun"></i>      ${celcius}&deg;C`;
		} else if (data.weather[0].id == 801) {
			weather.innerHTML = `<i data-feather="cloud"></i>      ${celcius}&deg;C`;
		} else if (data.weather[0].id >= 802 && data.weather[0].id <= 804) {
			weather.innerHTML = `<i data-feather="cloud"></i>      ${celcius}&deg;C`;
		} else if (data.weather[0].id == 906) {
			weather.innerHTML = `<i data-feather="cloud-snow"></i>      ${celcius}&deg;C`;
		} else {
			weather.innerHTML = `${celcius}&deg;C`;
		}
	});
}
// Run if Geolocation fails
function fail(error) {
	// Don't display anything
	console.log(error);
}
// Checks if bookmark list is empty
function isListEmpty() {
	if (bookmarkList.childElementCount > 0) {
		// If not empty remove empty message
		if (bookmarkList.children[0].tagName == "H5")
			bookmarkList.removeChild(bookmarkList.children[0]);
	} else {
		// If empty add empty message
		const noBookmarkMsg = document.createElement("h5");
		noBookmarkMsg.textContent = "You have no saved bookmarks!";
		bookmarkList.appendChild(noBookmarkMsg);
		bookmarkList.style.textAlign = "center";
		noBookmarkMsg.style.lineHeight = "50px";
	}
}
// Returns saved bookmarks
function getSavedBookmarks() {
	let bookmarks;

	if (localStorage.getItem("bookmarks") === null) {
		bookmarks = [];
	} else {
		bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	}
	return bookmarks;
}
// Checks if item already exists
function alreadyExists(title) {
	let isFound = false;
	let bookmarks = getSavedBookmarks();

	for (let i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].artclTitle === title) {
			isFound = true;
			break;
		}
	}

	return isFound;
}
// Saves bookmarks to localStorage
function saveBookmarks(title, source, url) {
	let bookmarks;

	if (!alreadyExists(title)) {
		const bookmark = {
			artclTitle: title,
			artclSource: source,
			artclURL: url,
			artclID: -1,
		};
		feather.replace(); // To load icons from CDN

		bookmarks = getSavedBookmarks();
		bookmark.artclID = bookmarks.length + 1;
		bookmarks.push(bookmark);
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}
}
// Deletes bookmarks
function deleteBookmarks() {
	let bookmarkedArticle = this.parentElement.parentElement;
	// Get deleted ID
	let id = parseFloat(bookmarkedArticle.dataset.id);
	// Delete from UI
	bookmarkList.removeChild(bookmarkedArticle);
	// Load saved bookmarks
	let bookmarks = getSavedBookmarks();
	console.log(bookmarks);

	// Find and remove bookmark that matches ID
	let itemToBeDeleted = bookmarks.find((bookmark) => {
		return bookmark.artclID == id;
	});
	let index = bookmarks.indexOf(itemToBeDeleted);

	if (index > -1) {
		bookmarks.splice(index, 1);
	}

	// Reassign ID
	let i = 1;
	bookmarks.forEach((bookmark) => {
		bookmark.artclID = i;
		i++;
	});

	// Repopulate list
	bookmarkList.innerHTML = "";
	bookmarks.forEach((bookmark) =>
		populateBookmarks(
			bookmark.artclTitle,
			bookmark.artclSource,
			bookmark.artclURL,
			bookmark.artclID
		)
	);

	// Resave bookmarks
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	// Check if list is empty
	isListEmpty();
}
// Populates bookmark list
function populateBookmarks(title, source, url, id = -1) {
	// Checks if bookmark list is empty
	isListEmpty();

	let bookmarks = getSavedBookmarks();

	id = id == -1 ? bookmarks.length : id;

	// Create bookmark article container
	const bookmarkItem = document.createElement("div");
	bookmarkItem.setAttribute("data-id", id);
	bookmarkItem.classList.add("bookmarked-article");

	// Create title and source container
	const bookmarkInfo = document.createElement("div");
	bookmarkInfo.classList.add("bookmarked-article-info");

	// Create title with link
	const bookmarkTitle = document.createElement("a");
	bookmarkTitle.classList.add("bookmarked-article-title");
	bookmarkTitle.textContent = title;
	bookmarkTitle.target = "_blank";
	bookmarkTitle.href = url;

	// Create source
	const bookmarkSource = document.createElement("p");
	bookmarkSource.classList.add("bookmarked-article-source");
	bookmarkSource.textContent = source;

	// Create Buttons Container: Delete bookmark
	const bookmarkButtons = document.createElement("div");
	bookmarkButtons.classList.add("buttons");

	// Create delete button and attach function to it
	const bookmarkDelete = document.createElement("div");
	bookmarkDelete.classList.add("bookmarked-article-buttons", "delete");
	bookmarkDelete.innerHTML = '<i data-feather="trash-2"></i>';
	bookmarkDelete.addEventListener("click", deleteBookmarks);

	// Append Delete button to button container
	bookmarkButtons.appendChild(bookmarkDelete);
	// Append title and source to info container
	bookmarkInfo.appendChild(bookmarkTitle);
	bookmarkInfo.appendChild(bookmarkSource);
	// Append info and button containers to article
	bookmarkItem.appendChild(bookmarkInfo);
	bookmarkItem.appendChild(bookmarkButtons);
	// Append article to list
	bookmarkList.appendChild(bookmarkItem);
	feather.replace(); // To load icons from CDN
}
// Fetch news
function fetchNews(tagName, keyName) {
	let query;

	// Assign tag name
	if (keyName == "") query = !tagName ? "" : `country=us&category=${tagName}`;
	else query = `q=${keyName}`;
	// URL to be sent
	const newsEndpoint = `https://newsapi.org/v2/top-headlines?language=en&${query}&apiKey=${newsApiKey}`;
	const newsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(newsEndpoint)}`
	// Articles array
	let articles = [];

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4) {
			if (this.status == 200) {
				let allData = JSON.parse(this.responseText);
				let data = JSON.parse(allData.contents);
				// Empty article containers for new request
				mainArticles.innerHTML = "";
				imglessArticles.innerHTML = "";
				// console.log(data);

				// Copy articles from response to custom array
				for (let i = 0; i < data.totalResults; i++) {
					articles.push(data.articles[i]);
				}
				// Add first article with image to the featured section
				for (let i = 0; i < articles.length; i++) {
					if (articles[i].urlToImage != null) {
						// Create Featured container
						const featured = document.createElement("div");
						featured.classList.add("featured");
						featured.style.background = `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,1) 80%), url('${articles[i].urlToImage}')`;
						// Create Info section
						const featuredInfo = document.createElement("div");
						featuredInfo.classList.add("featured-info");
						// Create featured label
						const featuredLabel = document.createElement("span");
						featuredLabel.classList.add("featured-label");
						featuredLabel.textContent = "Featured";
						// Create featured title
						const featuredTitle = document.createElement("a");
						featuredTitle.classList.add("featured-title", "title");
						featuredTitle.textContent = articles[i].title;
						featuredTitle.target = "_blank";
						featuredTitle.href = articles[i].url;
						// Create featured source
						const featuredSource = document.createElement("p");
						featuredSource.classList.add("featured-source", "source");
						featuredSource.textContent = articles[i].source.name;
						// Create featured bookmark button
						const featuredBookmark = document.createElement("div");
						featuredBookmark.classList.add(
							"featured-buttons",
							"bookmark"
						);
						featuredBookmark.innerHTML =
							'<i data-feather="bookmark"></i>';

						featuredBookmark.addEventListener("click", function () {
							const title = featuredTitle.textContent;
							const source = featuredSource.textContent;
							const url = featuredTitle.href;
							if (!alreadyExists(title)) {
								saveBookmarks(title, source, url);
								populateBookmarks(title, source, url);
							}
						});

						// Append content to info section
						featuredInfo.appendChild(featuredLabel);
						featuredInfo.appendChild(featuredTitle);
						featuredInfo.appendChild(featuredSource);
						featuredInfo.appendChild(featuredBookmark);
						// Append info to featured container
						featured.appendChild(featuredInfo);
						// Append featured container to articles
						mainArticles.appendChild(featured);
						// Remove article from array
						articles.splice(i, 1);
						// Exit loop
						break;
					}
				}
				// Create container of articles with image
				const articlesContainer = document.createElement("div");
				articlesContainer.classList.add("articles");

				articles.forEach(function (article) {
					if (article) {
						if (
							article.urlToImage != null &&
							article.source.name != "Fox News"
						) {
							// IF IMAGE EXISTS FOR ARTICLE
							// Create article item
							const articleItem = document.createElement("div");
							articleItem.classList.add("article");
							// Create image container and add image
							const articleImage = document.createElement("div");
							articleImage.classList.add("image");
							articleImage.style.backgroundImage = `url('${article.urlToImage}')`;
							// Create info container: title and source
							const articleInfo = document.createElement("div");
							articleInfo.classList.add("article-info");
							// Create title container and add title
							const articleTitle = document.createElement("a");
							articleTitle.classList.add("article-title", "title");
							articleTitle.textContent = article.title;
							articleTitle.target = "_blank";
							articleTitle.href = article.url;
							// Create source and add source name
							const articleSource = document.createElement("p");
							articleSource.classList.add("article-source", "source");
							articleSource.textContent = article.source.name;
							// Create buttons container: Time Published, Share and Bookmark
							const articleButtons = document.createElement("div");
							articleButtons.classList.add("buttons");
							// Create Time published and add time
							const articleTime = document.createElement("p");
							articleTime.classList.add("timePublished");
							articleTime.textContent = "";
							// Create bookmark button and add functionality
							const articleBookmark = document.createElement("div");
							articleBookmark.classList.add(
								"article-buttons",
								"bookmark"
							);
							articleBookmark.innerHTML =
								'<i data-feather="bookmark"></i>';

							articleBookmark.addEventListener("click", function () {
								const title = article.title;
								const source = article.source.name;
								const url = article.url;
								if (!alreadyExists(title)) {
									saveBookmarks(title, source, url);
									populateBookmarks(title, source, url);
								}
							});

							// Append time published, share and bookmark to buttons container
							articleButtons.appendChild(articleTime);
							articleButtons.appendChild(articleBookmark);
							// Append title and source to info container
							articleInfo.appendChild(articleTitle);
							articleInfo.appendChild(articleSource);
							// Append image, info and buttons to article item
							articleItem.appendChild(articleImage);
							articleItem.appendChild(articleInfo);
							articleItem.appendChild(articleButtons);
							// Append article item to articles container
							articlesContainer.appendChild(articleItem);
						} else {
							// IF IMAGE DOESN'T EXIST FOR ARTICLE
							// Create article item
							const imglessArticle = document.createElement("div");
							imglessArticle.classList.add("imageless-article");
							// Create info container: title and source
							const imglessInfo = document.createElement("div");
							imglessInfo.classList.add("imageless-article-info");
							// Create title, add title and link
							const imglessTitle = document.createElement("a");
							imglessTitle.classList.add(
								"imageless-article-title",
								"title"
							);
							imglessTitle.textContent = article.title;
							imglessTitle.target = "_blank";
							imglessTitle.href = article.url;
							// Create source and add source
							const imglessSource = document.createElement("p");
							imglessSource.classList.add(
								"imageless-article-source",
								"source"
							);
							imglessSource.textContent = article.source.name;
							// Create buttons container: Time Published, Share and Bookmark
							const imglessButtons = document.createElement("div");
							imglessButtons.classList.add("buttons");
							// Create Time published and add time
							const imglessTime = document.createElement("p");
							imglessTime.classList.add("timePublished");
							imglessTime.textContent = "";
							// Create bookmark button and add functionality
							const imglessBookmark = document.createElement("div");
							imglessBookmark.classList.add(
								"imageless-article-buttons",
								"bookmark"
							);
							imglessBookmark.innerHTML =
								'<i data-feather="bookmark"></i>';

							imglessBookmark.addEventListener("click", function () {
								const title = article.title;
								const source = article.source.name;
								const url = article.url;
								if (!alreadyExists(title)) {
									saveBookmarks(title, source, url);
									populateBookmarks(title, source, url);
								}
							});

							// Append time published, share and bookmark to buttons container
							imglessButtons.appendChild(imglessTime);
							imglessButtons.appendChild(imglessBookmark);
							// Append title and source to info container
							imglessInfo.appendChild(imglessTitle);
							imglessInfo.appendChild(imglessSource);
							// Append info and buttons to article item
							imglessArticle.appendChild(imglessInfo);
							imglessArticle.appendChild(imglessButtons);
							// Append article item to articles container
							imglessArticles.style.border = "1px solid #ccc";
							imglessArticles.appendChild(imglessArticle);
						}
						// Sets height of imageless article to content height: Fixes CSS Grid bug
						if (imglessArticles.childElementCount > 0) {
							let imglessArticleHeight = 0;
							for (
								let i = 0;
								i < imglessArticles.childElementCount;
								i++
							) {
								imglessArticleHeight +=
									imglessArticles.children[i].offsetHeight;
							}
							imglessArticles.style.height = `${
								imglessArticleHeight + 10
							}px`;
							imglessArticles.style.border = `1px solid #ccc`;
						} else {
							imglessArticles.style.height = `0px`;
							imglessArticles.style.border = `none`;
						}
						feather.replace(); // To load icons from CDN
					}
				});
				// Append all news to articles body
				mainArticles.appendChild(articlesContainer);
				feather.replace(); // To load icons from CDN
			} else {
				// Error handling
				const errMsg =
					"<div style='text-align: center; margin-top: 25px;'><h2 class='ion-bug'></h2><h3>Sorry, something went wrong!</h3></div>";
				mainArticles.style.height = "75px";
				mainArticles.innerHTML = errMsg;
			}
		}
	};
	xhttp.open("GET", newsUrl, true);
	xhttp.send();
}

// Fetch news on load
fetchNews("general", "");

// Check if bookmark list is empty on page load
isListEmpty();

// Show bookmarks list
bookmarks.addEventListener("click", function () {
	const rect = this.getBoundingClientRect();
	bookmarkList.style.top = `${rect.bottom + rect.top + 10}px`;
	bookmarkList.style.left = `${rect.x + rect.width - 300}px`;
	bookmarkList.classList.toggle("open-bookmarks-list");
});

// Hide bookmarks list on resize
window.addEventListener("resize", () => {
	bookmarkList.classList.remove("open-bookmarks-list");
});

// Fetch news with tag name
tags.forEach((tag) =>
	tag.addEventListener("click", () => {
		// Get current tag name
		const tagName = tag.dataset.tag;
		// Clear any current active tag property
		for (let i = 0; i < tags.length; i++) {
			tags[i].style.fontFamily = "Metropolis-Regular";
		}
		// Assign active property to clicked tag
		tag.style.fontFamily = "Metropolis-Bold";
		// Fetch news with clicked tag name
		fetchNews(tagName, "");
	})
);

// Fetch news with key name
keys.forEach((key) =>
	key.addEventListener("click", () => {
		// Get current key name
		const keyName = key.dataset.key;

		// Clear any current active key property
		for (let i = 0; i < tags.length; i++) {
			tags[i].style.fontWeight = "normal";
		}
		// Fetch news with clicked key name
		fetchNews("", keyName);
	})
);

// Expands and collpases tags
showTagBtn.addEventListener("click", function () {
	document.body.classList.toggle("collapse-tags");
	const rect = mainBody.getBoundingClientRect();
	mainBody.style.transform = `translateY(-${rect.top - 60}px)`;
});

// Load bookmarks on load
if (localStorage.length > 0) {
	const savedBookmarks = getSavedBookmarks();
	savedBookmarks.forEach((bookmark) =>
		populateBookmarks(
			bookmark.artclTitle,
			bookmark.artclSource,
			bookmark.artclURL,
			bookmark.artclID
		)
	);
}
