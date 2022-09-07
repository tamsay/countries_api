"use strict";
let cardWrapper = document.querySelector("#cardWrapper");
let filterInput = document.querySelector("#continent");
let searchInput = document.querySelector("#countrySearch");

let displayLoader = () => {
  let wrapper = document.createElement("div");
  wrapper.className = "loader-div";

  let loader = document.createElement("img");
  loader.className = "loader-image";
  loader.setAttribute("alt", "loader");
  loader.setAttribute("src", "./assets/images/loader3.gif");

  let text = document.createElement("p");
  text.className = "loading";
  text.innerText = "...loading...";

  wrapper.appendChild(loader);
  wrapper.appendChild(text);
  cardWrapper.appendChild(wrapper);
};

let createCard = (result) => {
  cardWrapper.innerText = "";

  for (let x = 0; x < result.length; x++) {
    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-toggle", "modal");
    card.setAttribute("data-target", "#myModal");

    let flag = document.createElement("img");
    flag.className = "card-img-top";
    flag.setAttribute(
      "src",
      "data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=="
    );
    flag.setAttribute("alt", "flag image");
    flag.style.backgroundImage = `url(${result[x].flag})`;

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title font-weight-bold";
    cardTitle.innerText = `${result[x].name}`;

    let populationParagraph = document.createElement("p");
    populationParagraph.className = "card-text";

    let populationSpan = document.createElement("span");
    populationSpan.className = "font-weight-bold";
    populationSpan.innerText = `Population: `;

    let populationValue = document.createElement("span");
    populationValue.className = "population value";
    populationValue.innerText = `${result[x].population}`;

    let regionParagraph = document.createElement("p");
    regionParagraph.className = "card-text";

    let regionSpan = document.createElement("span");
    regionSpan.className = "font-weight-bold";
    regionSpan.innerText = "Region: ";

    let regionValue = document.createElement("span");
    regionValue.className = "region value";
    regionValue.innerText = `${result[x].region}`;

    let capitalParagraph = document.createElement("p");
    capitalParagraph.className = "card-text";

    let capitalSpan = document.createElement("span");
    capitalSpan.className = "font-weight-bold";
    capitalSpan.innerText = "Capital: ";

    let capitalValue = document.createElement("span");
    capitalValue.className = "capital value";
    capitalValue.innerText = `${result[x].capital}`;

    populationParagraph.appendChild(populationSpan);
    populationParagraph.appendChild(populationValue);

    regionParagraph.appendChild(regionSpan);
    regionParagraph.appendChild(regionValue);

    capitalParagraph.appendChild(capitalSpan);
    capitalParagraph.appendChild(capitalValue);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(populationParagraph);
    cardBody.appendChild(regionParagraph);
    cardBody.appendChild(capitalParagraph);

    card.appendChild(flag);
    card.appendChild(cardBody);
    cardWrapper.appendChild(card);
  }
};

let openBorderCountry = (result) => {
  let borders = document.querySelectorAll(".country-list-item");
  let btnClose = document.querySelector(".btn-close");

  [...borders].map((elements) => {
    if (
      elements.textContent.toLowerCase().includes("does not have any border")
    ) {
      elements.addEventListener("click", () => {
        btnClose.click();
      });
    } else {
      let newResult = [];
      let country = elements.textContent.toLowerCase();
      [...result].filter((items) => {
        if (items.name.toLowerCase() === country) {
          newResult.push(items);
        }
      });
      elements.addEventListener("click", () => {
        btnClose.click();
        //    cardWrapper.innerHTML = '';
        createCard(newResult);
        getFullDetails(newResult, result);

        let card = document.querySelector(".card-img-top");

        setTimeout(() => {
          card.click();
        }, 400);
      });
    }
  });
};

let searchCountry = (result) => {
  let allResult = [...result];
  searchInput.addEventListener("input", () => {
    let inputValue = searchInput.value.toLowerCase();

    let newResult = [];
    result.filter((items) => {
      if (items.name.toLowerCase().includes(inputValue)) {
        newResult.push(items);
      }
    });
    cardWrapper.innerHTML = "";
    createCard(newResult);
    getFullDetails(newResult, allResult);
  });
};

let filterCountry = (result) => {
  let allResult = [...result];

  filterInput.addEventListener("change", () => {
    let filterValue = filterInput.value.toLowerCase();

    let newResult = [];
    if (filterValue === "all") {
      newResult = [...result];
    } else {
      result.filter((items) => {
        if (items.region.toLowerCase().includes(filterValue)) {
          newResult.push(items);
        }
      });
    }
    cardWrapper.innerHTML = "";
    createCard(newResult);
    getFullDetails(newResult, allResult);
  });
};

let getFullDetails = (result, allResult) => {
  let apiData = [...allResult];

  let allCards = document.querySelectorAll(".card");

  for (let x = 0; x < allCards.length; x++) {
    allCards[x].addEventListener("click", () => {
      let countryName = allCards[x].querySelector("h5").textContent;

      let fullInfoArray = [];

      result.filter((item) => {
        if (item.name.toLowerCase() === countryName.toLowerCase()) {
          fullInfoArray.push(item);
        }
      });

      let modalContent = document.querySelector(".modal-content");
      modalContent.innerText = "";

      let modalHeader = document.createElement("div");
      modalHeader.className = "modal-header";

      let btnClose = document.createElement("button");
      btnClose.className = "btn-close btn";
      btnClose.setAttribute("data-dismiss", "modal");
      btnClose.setAttribute("data-keyboard", "true");
      btnClose.setAttribute("aria-label", "Close");

      let closeBtnSpan = document.createElement("span");
      closeBtnSpan.className = "closeBtnSpan";
      closeBtnSpan.setAttribute("aria-hidden", "true");
      closeBtnSpan.innerText = "Back";

      let backArrow = document.createElement("i");
      backArrow.className = "fa fa-long-arrow-left";

      btnClose.appendChild(backArrow);
      btnClose.appendChild(closeBtnSpan);

      let homeButton = document.createElement("button");
      homeButton.className = "btn-home btn";
      // homeButton.setAttribute('data-dismiss', 'modal')
      // homeButton.setAttribute('data-keyboard', 'true')
      homeButton.setAttribute("aria-label", "home");

      let homeBtnSpan = document.createElement("span");
      homeBtnSpan.className = "closeBtnSpan";
      homeBtnSpan.setAttribute("aria-hidden", "true");
      homeBtnSpan.innerText = "Home";

      let homeIcon = document.createElement("i");
      homeIcon.className = "fa fa-home";

      homeButton.appendChild(homeIcon);
      homeButton.appendChild(homeBtnSpan);

      modalHeader.appendChild(btnClose);
      modalHeader.appendChild(homeButton);

      // Modal Body Section
      let modalBody = document.createElement("div");
      modalBody.className = "modal-body row";

      let modalFlag = document.createElement("div");
      modalFlag.className = "col-md-6 modal-flag";

      let modalFlagImg = document.createElement("img");
      modalFlagImg.className = "modalFlagImage";
      modalFlagImg.setAttribute("alt", "flag");
      modalFlagImg.setAttribute("src", `${fullInfoArray[0].flag}`);

      modalFlag.appendChild(modalFlagImg);

      // Country Details Section
      let countryDetails = document.createElement("div");
      countryDetails.className = "country-details col-md-6";

      // Name Header Section
      let nameHeaderDiv = document.createElement("div");
      nameHeaderDiv.className = "row name-header-div";

      let nameHeader = document.createElement("h4");
      nameHeader.className = "nameHeader";
      nameHeader.innerText = `${fullInfoArray[0].name}`;

      nameHeaderDiv.appendChild(nameHeader);

      // Other Info Section
      let otherInfo = document.createElement("div");
      otherInfo.className = "row other-info";

      // First Column - other info section
      let firstCol = document.createElement("div");
      firstCol.className = "col-md-6 first-col";

      // Modal Native Name Paragraph
      let modalNativeNameParagraph = document.createElement("p");
      modalNativeNameParagraph.className = "modal-paragraph";

      let modalNativeNameSpan = document.createElement("span");
      modalNativeNameSpan.className = "font-weight-bold";
      modalNativeNameSpan.innerText = "Native Name: ";

      let modalNativeNameValue = document.createElement("span");
      modalNativeNameValue.className = "modal-native-name value";
      modalNativeNameValue.innerText = `${fullInfoArray[0].nativeName}`;

      modalNativeNameParagraph.appendChild(modalNativeNameSpan);
      modalNativeNameParagraph.appendChild(modalNativeNameValue);

      // Modal Population Paragraph
      let modalPopulationParagraph = document.createElement("p");
      modalPopulationParagraph.className = "modal-paragraph";

      let modalPopulationSpan = document.createElement("span");
      modalPopulationSpan.className = "font-weight-bold";
      modalPopulationSpan.innerText = "Population: ";

      let modalPopulationValue = document.createElement("span");
      modalPopulationValue.className = "modal-population value";
      modalPopulationValue.innerText = `${fullInfoArray[0].population}`;

      modalPopulationParagraph.appendChild(modalPopulationSpan);
      modalPopulationParagraph.appendChild(modalPopulationValue);

      // Modal Region Paragraph
      let modalRegionParagraph = document.createElement("p");
      modalRegionParagraph.className = "modal-paragraph";

      let modalRegionSpan = document.createElement("span");
      modalRegionSpan.className = "font-weight-bold";
      modalRegionSpan.innerText = "Region: ";

      let modalRegionValue = document.createElement("span");
      modalRegionValue.className = "modal-region value";
      modalRegionValue.innerText = `${fullInfoArray[0].region}`;

      modalRegionParagraph.appendChild(modalRegionSpan);
      modalRegionParagraph.appendChild(modalRegionValue);

      // Modal Sub Region Paragraph
      let modalSubRegionParagraph = document.createElement("p");
      modalSubRegionParagraph.className = "modal-paragraph";

      let modalSubRegionSpan = document.createElement("span");
      modalSubRegionSpan.className = "font-weight-bold";
      modalSubRegionSpan.innerText = "Sub Region: ";

      let modalSubRegionValue = document.createElement("span");
      modalSubRegionValue.className = "modal-sub-region value";
      modalSubRegionValue.innerText = `${fullInfoArray[0].subregion}`;

      modalSubRegionParagraph.appendChild(modalSubRegionSpan);
      modalSubRegionParagraph.appendChild(modalSubRegionValue);

      // Modal Capital Paragraph
      let modalCapitalParagraph = document.createElement("p");
      modalCapitalParagraph.className = "modal-paragraph";

      let modalCapitalSpan = document.createElement("span");
      modalCapitalSpan.className = "font-weight-bold";
      modalCapitalSpan.innerText = "Capital: ";

      let modalCapitalValue = document.createElement("span");
      modalCapitalValue.className = "modal-capital value";
      modalCapitalValue.innerText = `${fullInfoArray[0].capital || "N/A"}`;

      modalCapitalParagraph.appendChild(modalCapitalSpan);
      modalCapitalParagraph.appendChild(modalCapitalValue);

      // Second Column - Other Info Section
      let secondCol = document.createElement("div");
      secondCol.className = "col-md-6 second-col";

      // Modal Top Level Domain Paragraph
      let modalTopLevelDomainParagraph = document.createElement("p");
      modalTopLevelDomainParagraph.className = "modal-paragraph";

      let modalTopLevelDomainSpan = document.createElement("span");
      modalTopLevelDomainSpan.className = "font-weight-bold";
      modalTopLevelDomainSpan.innerText = "Top Level Domain: ";

      let modalTopLevelDomainValue = document.createElement("span");
      modalTopLevelDomainValue.className = "modal-topLevelDomain value";
      modalTopLevelDomainValue.innerText = `${fullInfoArray[0].topLevelDomain}`;

      modalTopLevelDomainParagraph.appendChild(modalTopLevelDomainSpan);
      modalTopLevelDomainParagraph.appendChild(modalTopLevelDomainValue);

      // Modal Currencies Paragraph
      let modalCurrenciesParagraph = document.createElement("p");
      modalCurrenciesParagraph.className = "modal-paragraph";

      let modalCurrenciesSpan = document.createElement("span");
      modalCurrenciesSpan.className = "font-weight-bold";
      modalCurrenciesSpan.innerText = "Currencies: ";

      let modalCurrenciesValue = document.createElement("span");
      modalCurrenciesValue.className = "modal-currencies value";
      modalCurrenciesValue.innerText = `${fullInfoArray[0]?.currencies && fullInfoArray[0]?.currencies[0]?.name}`;

      modalCurrenciesParagraph.appendChild(modalCurrenciesSpan);
      modalCurrenciesParagraph.appendChild(modalCurrenciesValue);

      // Modal Languages Paragraph
      let modalLanguagesParagraph = document.createElement("p");
      modalLanguagesParagraph.className = "modal-paragraph";

      let modalLanguagesSpan = document.createElement("span");
      modalLanguagesSpan.className = "font-weight-bold";
      modalLanguagesSpan.innerText = "Languages: ";

      let modalLanguagesValue = document.createElement("span");
      modalLanguagesValue.className = "modal-languages value";
      let languageList = [];
      fullInfoArray[0].languages.map((items) => {
        languageList.push(items.name);
      });
      modalLanguagesValue.innerText = `${languageList.join(", ")}`;

      modalLanguagesParagraph.appendChild(modalLanguagesSpan);
      modalLanguagesParagraph.appendChild(modalLanguagesValue);

      // Other Info Creation
      firstCol.appendChild(modalNativeNameParagraph);
      firstCol.appendChild(modalPopulationParagraph);
      firstCol.appendChild(modalRegionParagraph);
      firstCol.appendChild(modalSubRegionParagraph);
      firstCol.appendChild(modalCapitalParagraph);

      secondCol.appendChild(modalTopLevelDomainParagraph);
      secondCol.appendChild(modalCurrenciesParagraph);
      secondCol.appendChild(modalLanguagesParagraph);

      otherInfo.appendChild(firstCol);
      otherInfo.appendChild(secondCol);

      // Border Countries Section
      let borderCountries = document.createElement("div");
      borderCountries.className = "borderCountries row";

      let borderHeader = document.createElement("span");
      borderHeader.className = "borderHeader";
      borderHeader.innerText = "Border Countries:";

      borderCountries.appendChild(borderHeader);

      let borderNames = [];
      let borderList = fullInfoArray[0].borders;
      Array.isArray(borderList) && borderList.map((items) => {
        allResult.map((elements) => {
          if (elements.alpha3Code === items) {
            borderNames.push(elements.name);
          }
        });
      });

      if (borderNames.length === 0) {
        let countryList = document.createElement("button");
        countryList.className = "country-list-item btn";
        countryList.innerText = `${fullInfoArray[0].name} does not have any Border Country`;

        borderCountries.appendChild(countryList);
      } else {
        borderNames.map((item) => {
          let countryList = document.createElement("button");
          countryList.className = "country-list-item btn";
          countryList.innerText = `${item}`;

          borderCountries.appendChild(countryList);
        });
      }

      // Country Details Creation
      countryDetails.appendChild(nameHeaderDiv);
      countryDetails.appendChild(otherInfo);
      countryDetails.appendChild(borderCountries);

      // Modal Element Creation
      modalBody.appendChild(modalFlag);
      modalBody.appendChild(countryDetails);
      modalContent.appendChild(modalHeader);
      modalContent.appendChild(modalBody);

      homeButton.addEventListener("click", () => {
        btnClose.click();
        window.location.reload();
      });

      openBorderCountry(allResult);
    });
  }
};
let getData = (() => {
  displayLoader();

  fetch(
    "https://restcountries.com/v2/all?fields=name,capital,region,flag,population,nativeName,subregion,topLevelDomain,currencies,languages,borders,alpha3Code"
  )
    .then((resp) => resp.json())
    .then((data) => {
      createCard(data);
      searchCountry(data);
      filterCountry(data);
      getFullDetails(data, [...data]);
      openBorderCountry(data);
    });
})();

//Theme Switcher
let checkbox = document.querySelector("input[name=theme]");
const theme = localStorage.getItem("theme");
let body = document.body;

if (theme) {
  body.classList.add(theme);
}

checkbox.addEventListener("change", function () {
  if (this.checked) {
    trans();
    body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  } else {
    trans();
    body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  }
});

let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};
trans();
