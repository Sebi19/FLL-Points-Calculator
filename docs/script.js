function updatePoints() {
    const containers = document.querySelectorAll(".category");
    const summaryPoints = document.querySelectorAll(".summary-points");

    containers.forEach(container => {
        category = container.getAttribute("data-category");
        
        let checkboxes;
        if(category == "corevalues") {
            checkboxes = document.querySelectorAll(".corevalues input[type='checkbox']");
        } else {
            checkboxes = container.querySelectorAll("input[type='checkbox']");
        }
        
        const pointsDisplay = container.querySelector(".points");
        const banner = container.querySelector(".banner");
        const summaryDisplay = Array.from(summaryPoints).filter(summary => summary.getAttribute("data-category") == category);


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

        let allSelected = checkedcheckboxNames.size == uncheckedcheckboxNames.size;


        pointsDisplay.textContent = totalPoints;

        if (allSelected) {
            banner.classList.add("finish");
            summaryDisplay.forEach(summary => summary.textContent = totalPoints);
        } else {
            banner.classList.remove("finish");
            summaryDisplay.forEach(summary => summary.textContent = '-');
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
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
                updatePoints();
            });
        });
    });
});

 window.addEventListener("pageshow", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataValue = urlParams.get('data');
    if(dataValue) {
        updateForm(dataValue);
    }    

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
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = langData[key];
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


function copyFormUrl(button) {
    const data = [];
    const url = new URL(window.location.href);

    document.querySelectorAll('tr.checkbox-group').forEach(row => {
        const checkboxes = row.querySelectorAll('input[type="checkbox"]:checked');
        
        if (checkboxes.length == 1) {
            data.push(checkboxes[0].value);
        } else {
            data.push('0');
        }
    });

    dataString = data.join('').replace(/0+$/, '');
    url.searchParams.set('data', dataString);
    const updatedUrl = url.toString();
    navigator.clipboard.writeText(updatedUrl)
        .then(() => {
            let copySuccess = button.parentElement.querySelector('.copy-success');
            copySuccess.classList.add('show');
            setTimeout(() => {
                copySuccess.classList.remove('show');
            }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy URL:', err);
        });
}

function updateForm(data) {
    const dataArray = data.split('');
    document.querySelectorAll('tr.checkbox-group').forEach((row, index) => {
        const checkboxes = row.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = dataArray[index] == checkbox.value;
        });
    });
    const url = new URL(window.location.href);
    url.search = '';
    history.replaceState(null, '', url.toString());
}

function clearForm() {
    document.querySelectorAll('tr.checkbox-group').forEach(row => {
        const checkboxes = row.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });
    updatePoints();
}