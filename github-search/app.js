"use strict";

import axios from "axios";
const userInputs = [];

const createCard = (data) => `
<div class="px-4 py-5 sm:px-6 -ml-4 -mt-4 border-b border-gray-200 pb-8 flex justify-between items-center flex-wrap sm:flex-no-wrap">
  <div class="ml-4 mt-4">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <img class="h-12 w-12 rounded-full" src="${data.avatar_url}" alt="">
      </div>
      <div class="ml-4">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          ${data.name}
          <span class="text-sm leading-5 text-gray-500">
              @${data.login}
          </span>
        </h3>
        <p class="text-sm leading-5 text-gray-500">
          ${data.public_repos} repositories. User since ${data.created_at.slice(
  0,
  4
)}
        </p>
        <p class="text-sm leading-5 text-gray-500">
          ${data.location || ""}
        </p>
        <p class="mt-1 text-sm leading-5 text-gray-500">
          ${data.bio}
        </p>
      </div>
    </div>
  </div>
  <div class="ml-4 mt-4 flex-shrink-0 flex">
    <span class="ml-3 inline-flex rounded-md shadow-sm">
      <a href="${
        data.html_url
      }"><button type="button" class="mr-2 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800">
        <span>
          Profile
        </span>
      </button>
      </a>
      <a href="${
        data.blog
      }"><button type="button" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800">
        <span>
          Website
        </span>
      </button>
      </a>
    </span>
  </div>
</div>
`;

const checkInput = async function (e) {
  e.preventDefault();
  const userInput = document.querySelector("input").value;

  // prevent empty username
  if (!userInput) {
    alert("Enter a username");
    return;
  }

  // Avoid duplicated username
  if (userInputs.includes(userInput)) {
    alert("You already searched for this");
    return;
  }
  userInputs.push(userInput);

  let response = "";
  try {
    response = await axios.get(`https://api.github.com/users/${userInput}`);
  } catch (error) {
    if (404 === error.response.status) {
      alert("Username not found");
    } else {
      alert("Error");
      console.table(error.response);
    }
  }
  //   const response = await axios.get(`https://api.github.com/users/${userInput}`);
  console.table(response.data);
  if (response) {
    const card = createCard(response.data);
    document.querySelector("input").value = "";
    document.querySelector("#container").insertAdjacentHTML("afterbegin", card);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", checkInput);
});
