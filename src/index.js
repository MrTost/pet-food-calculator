import "./index.scss";

// INPUT
const pfcForm = document.getElementById('pfcInForm');
const pfcInWeight = document.getElementById('pfcInWeight');
const pfcInUnit = document.getElementById('pfcInUnit');
const pfcInWeightOver = document.getElementById('pfcInWeightOver');
const pfcInWeightUnder = document.getElementById('pfcInWeightUnder');
const pfcInWeightIdeal = document.getElementById('pfcInWeightIdeal');
const pfcInWeightIdealActive = document.getElementById('pfcInWeightIdealActive');
const pfcInFreq1 = document.getElementById('pfcInFreq1');
const pfcInFreq2 = document.getElementById('pfcInFreq2');
const pfcInFreq3 = document.getElementById('pfcInFreq3');
// OUTPUT
const pfcOutWeight = document.getElementById('pfcOutWeight');
const pfcOutWeightType = document.getElementById('pfcOutWeightType');
const pfcOutFrequency = document.getElementById('pfcOutFrequency');
const pfcOutFeedDay = document.getElementById('pfcOutFeedDay');
const pfcOutFeed = document.getElementById('pfcOutFeed');
// BUTTONS
const pfcBtnReset = document.getElementById('pfcBtnReset');

function pfcRemoveError () {
    pfcInWeight.classList.remove('is-invalid');
    pfcInWeight.removeEventListener('keypress', pfcRemoveError);
}

function pfcReset() {
    pfcForm.reset();
    pfcResetResults();
    pfcInWeight.focus();
}

function pfcResetResults() {
    pfcOutWeight.textContent = '';
    pfcOutWeightType.textContent = '';
    pfcOutFrequency.textContent = '';
    pfcOutFeedDay.textContent = '';
    pfcOutFeed.textContent = '';
}

function pfcCalculate(event) {
    event.preventDefault();
    event.stopPropagation();

    pfcResetResults();

    if (!pfcInWeight.value || isNaN(pfcInWeight.value)) {
        pfcInWeight.focus();
        pfcInWeight.classList.add('is-invalid');
        pfcInWeight.addEventListener('keypress', pfcRemoveError);
    } else {
        const weight = Number(pfcInWeight.value);
        const unit = pfcInUnit.value;

        pfcOutWeight.textContent = `${weight.toFixed(2)} ${unit}`;

        if (pfcInWeightOver.checked) {
            pfcOutWeightType.textContent = 'Overweight';
        } else if (pfcInWeightUnder.checked) {
            pfcOutWeightType.textContent = 'Underweight';
        } else if (pfcInWeightIdeal.checked) {
            pfcOutWeightType.textContent = 'Ideal';
        } else if (pfcInWeightIdealActive.checked) {
            pfcOutWeightType.textContent = 'Ideal Active';
        } else {
            pfcOutWeightType.textContent = 'ERR';
        }

        if (pfcInFreq1.checked) {
            pfcOutFrequency.textContent = 'ONCE A DAY';
        } else if (pfcInFreq2.checked) {
            pfcOutFrequency.textContent = 'TWICE A DAY';
        } else if (pfcInFreq3.checked) {
            pfcOutFrequency.textContent = 'x3 A DAY';
        } else {
            pfcOutFrequency.textContent = 'ERR';
        }

        let feedDay;

        if (pfcInWeightOver.checked) {
            feedDay = weight * 0.015;
        } else if (pfcInWeightUnder.checked) {
            feedDay = weight * 0.03;
        } else if (pfcInWeightIdeal.checked) {
            feedDay = weight * 0.02;
        } else if (pfcInWeightIdealActive.checked) {
            feedDay = weight * 0.035;
        } else {
            feedDay = 0;
        }

        pfcOutFeedDay.textContent = `${feedDay.toFixed(2)} ${unit}`;

        if (pfcInFreq1.checked) {
            pfcOutFeed.textContent = `${feedDay.toFixed(2)} ${unit}`;
        } else if (pfcInFreq2.checked) {
            pfcOutFeed.textContent = `${(feedDay / 2).toFixed(2)} ${unit}`;
        } else if (pfcInFreq3.checked) {
            pfcOutFeed.textContent = `${(feedDay / 3).toFixed(2)} ${unit}`;
        } else {
            pfcOutFrequency.textContent = 'ERR';
        }
    }
}

pfcForm.addEventListener('submit', pfcCalculate);
pfcBtnReset.addEventListener('click', pfcReset);
