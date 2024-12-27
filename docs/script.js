document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");

    containers.forEach(container => {

        console.info(container.className);
        const isCoreValues = container.className.includes("corevalues");
        
        let checkboxes;
        if(isCoreValues) {
            checkboxes = document.querySelectorAll(".teamwork input[type='checkbox']");
        } else {
            checkboxes = container.querySelectorAll("input[type='checkbox']");
        }
        
        const pointsDisplay = container.querySelector(".points");
        const banner = container.querySelector(".banner");

        function updatePoints() {
            let totalPoints = 0;

            let checkedcheckboxNames = new Set();
            let uncheckedcheckboxNames = new Set();

            Array.from(checkboxes).forEach(checkbox => {
                if (checkbox.checked) {
                    totalPoints += parseInt(checkbox.value, 10);
                    checkedcheckboxNames.add(checkbox.name);
                } else {
                    uncheckedcheckboxNames.add(checkbox.name);
                }
            });

            console.log(checkedcheckboxNames);
            console.log(uncheckedcheckboxNames);

            let allSelected = checkedcheckboxNames.size == uncheckedcheckboxNames.size;


            pointsDisplay.textContent = totalPoints;

            if (allSelected) {
                banner.classList.add("finish");
            } else {
                banner.classList.remove("finish");
            }
        }

        document.querySelectorAll('tr').forEach(row => {
            const checkboxes = row.querySelectorAll('input[type="checkbox"]');
            
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    // If the clicked checkbox is already checked, uncheck it
                    if (checkbox.checked) {
                        checkboxes.forEach(cb => {
                            if (cb !== checkbox) {
                                cb.checked = false; // Uncheck others
                            }
                        });
                    }
                    console.info("Hello");
                    updatePoints();
                });
            });
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

window.addEventListener("pageshow", (event) => {
    document.querySelectorAll('tr').forEach(row => {
        const checkboxes = row.querySelectorAll('input[type="checkbox"]');
        
        if (Array.from(checkboxes).filter(checkbox => checkbox.checked).length > 1) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        }
        updatePoints();
    });
});