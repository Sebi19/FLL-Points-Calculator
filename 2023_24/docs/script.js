document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".container");

    containers.forEach(container => {
        const radios = container.querySelectorAll("input[type='radio']");
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