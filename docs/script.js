document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");

    containers.forEach(container => {

        console.info(container.className);
        const isCoreValues = container.className.includes("corevalues");
        
        let radios;
        if(isCoreValues) {
            radios = document.querySelectorAll(".teamwork input[type='radio']");
        } else {
            radios = container.querySelectorAll("input[type='radio']");
        }
        
        const pointsDisplay = container.querySelector(".points");
        const banner = container.querySelector(".banner");

        function updatePoints() {
            let totalPoints = 0;

            let checkedRadioNames = new Set();
            let uncheckedRadioNames = new Set();

            Array.from(radios).forEach(radio => {
                if (radio.checked) {
                    totalPoints += parseInt(radio.value, 10);
                    checkedRadioNames.add(radio.name);
                } else {
                    uncheckedRadioNames.add(radio.name);
                }
            });

            console.log(checkedRadioNames);
            console.log(uncheckedRadioNames);

            let allSelected = checkedRadioNames.size == uncheckedRadioNames.size;


            pointsDisplay.textContent = totalPoints;

            if (allSelected) {
                banner.classList.add("finish");
            } else {
                banner.classList.remove("finish");
            }
        }

        radios.forEach(radio => {
            radio.addEventListener("change", updatePoints);
        });

        updatePoints();
    });
});


const language = localStorage.getItem('language') || 'de';

function setLanguage(lang) {
    fetchLanguageData(lang).then(data => {
        updateContent(data);
        setLanguagePreference(lang);
    });
}

setLanguage(language);

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = langData[key];
    });
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.classList.remove('selected');
        if (element.getAttribute('data-lang') === lang) {
            element.classList.add('selected');
        }
    });
}

// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}