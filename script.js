// Radio buttons and forms
let radioMetric = document.getElementById("metric");
let radioImperial = document.getElementById("imperial");
let inputImperial = document.getElementById("inputImperial");
let inputMetric = document.getElementById("inputMetric");
let space = document.getElementById("space");

// Metric values
let cm = document.getElementById("cm");
let kg = document.getElementById("kg");

// Imperial values
let ft = document.getElementById("ft");
let inch = document.getElementById("in");
let st = document.getElementById("st");
let lbs = document.getElementById("lbs");

// Results
let welcome = document.getElementById("welcome");
let calculatedAnswer = document.getElementById("result");
let bmiScore = document.getElementById("bmi-score");
let healthy = document.getElementById("healthy");
let range = document.getElementById("range");

// Reset state on page load
window.onload = resetState;

function resetState() {
    radioMetric.checked = true;
    radioImperial.checked = false;
    inputImperial.classList.add("hide");
    inputMetric.classList.remove("hide");
    space.classList.remove("space-imp-wel");
    welcome.classList.remove("hide");
    calculatedAnswer.classList.add("hide");
    clearInputs();
}

// Clear input fields
function clearInputs() {
    cm.value = "";
    kg.value = "";
    ft.value = "";
    inch.value = "";
    st.value = "";
    lbs.value = "";
}

// Switch to Imperial
radioImperial.addEventListener("change", () => {
    inputImperial.classList.remove("hide");
    inputMetric.classList.add("hide");
    space.classList.add("space-imp-wel");
    resetResults();
});

// Switch to Metric
radioMetric.addEventListener("change", () => {
    inputImperial.classList.add("hide");
    inputMetric.classList.remove("hide");
    space.classList.remove("space-imp-wel");
    resetResults();
});

// Reset results display
function resetResults() {
    welcome.classList.remove("hide");
    calculatedAnswer.classList.add("hide");
    bmiScore.innerHTML = "";
    healthy.innerHTML = "";
    range.innerHTML = "";
}

// Calculate Metric BMI
function calculateMetricBMI() {
    const heightMeters = cm.value / 100;
    const weightKg = kg.value;
    if (!heightMeters || !weightKg || isNaN(heightMeters) || isNaN(weightKg)) return null;

    const bmi = weightKg / (heightMeters * heightMeters);
    const lowerWeight = (18.5 * heightMeters * heightMeters).toFixed(1) + "kg";
    const upperWeight = (24.9 * heightMeters * heightMeters).toFixed(1) + "kg";

    updateResults(bmi, lowerWeight, upperWeight);
    return bmi.toFixed(1);
}

// Calculate Imperial BMI
function calculateImperialBMI() {
    const heightMeters = (ft.value * 30.48 + inch.value * 2.54) / 100;
    const weightKg = st.value * 6.35029 + lbs.value * 0.45359237;
    if (!heightMeters || !weightKg || isNaN(heightMeters) || isNaN(weightKg)) return null;

    const bmi = weightKg / (heightMeters * heightMeters);
    const lowerWeight = (18.5 * heightMeters * heightMeters).toFixed(1);
    const upperWeight = (24.9 * heightMeters * heightMeters).toFixed(1);

    updateResults(
        bmi,
        `${Math.floor(lowerWeight / 6.35029)}st ${(lowerWeight % 6.35029).toFixed(0)}lbs`,
        `${Math.floor(upperWeight / 6.35029)}st ${(upperWeight % 6.35029).toFixed(0)}lbs`
    );
    return bmi.toFixed(1);
}

// Update results display
function updateResults(bmi, lowerWeight, upperWeight) {
    if (bmi > 24.9) {
        healthy.innerHTML = "overweight";
    } else if (bmi < 18.5) {
        healthy.innerHTML = "underweight";
    } else {
        healthy.innerHTML = "at a healthy weight";
    }
    range.innerHTML = `${lowerWeight} - ${upperWeight}`;
}

// Event listeners for Metric inputs
cm.addEventListener("input", () => {
    if (cm.value && kg.value) {
        welcome.classList.add("hide");
        calculatedAnswer.classList.remove("hide");
        bmiScore.innerHTML = calculateMetricBMI();
    } else {
        resetResults();
    }
});

kg.addEventListener("input", () => {
    if (cm.value && kg.value) {
        welcome.classList.add("hide");
        calculatedAnswer.classList.remove("hide");
        bmiScore.innerHTML = calculateMetricBMI();
    } else {
        resetResults();
    }
});

// Event listeners for Imperial inputs
[ft, inch, st, lbs].forEach(input => {
    input.addEventListener("input", () => {
        if (ft.value && inch.value && st.value && lbs.value) {
            welcome.classList.add("hide");
            calculatedAnswer.classList.remove("hide");
            bmiScore.innerHTML = calculateImperialBMI();
        } else {
            resetResults();
        }
    });
});
