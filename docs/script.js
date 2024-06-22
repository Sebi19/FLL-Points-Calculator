document.addEventListener("DOMContentLoaded", () => {
    const radios = document.querySelectorAll("input[type='radio']");
    const pointsDisplay = document.querySelector(".points");
    const banner = document.querySelector(".banner");

    function updatePoints() {
        let totalPoints = 0;
        let allSelected = true;

        for (let i = 0; i <= 9; i++) {
            const selectedRadio = document.querySelector(`input[name='${i}']:checked`);
            if (selectedRadio) {
                totalPoints += parseInt(selectedRadio.value, 10);
            } else {
                allSelected = false;
            }
        }

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
});