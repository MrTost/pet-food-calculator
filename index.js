// INPUT
const pfcForm = document.getElementById('pfcInForm');
const pfcInTypeDog = document.getElementById('pfcInTypeDog');
const pfcInTypeCat = document.getElementById('pfcInTypeCat');
const pfcInWeight = document.getElementById('pfcInWeight');
const pfcInWeightOver = document.getElementById('pfcInWeightOver');
const pfcInWeightUnder = document.getElementById('pfcInWeightUnder');
const pfcInWeightIdeal = document.getElementById('pfcInWeightIdeal');
const pfcInWeightIdealActive = document.getElementById('pfcInWeightIdealActive');
const pfcInFreq1 = document.getElementById('pfcInFreq1');
const pfcInFreq2 = document.getElementById('pfcInFreq2');
const pfcInFreq3 = document.getElementById('pfcInFreq3');
// OUTPUT
const pfcOutType = document.getElementById('pfcOutType');
const pfcOutWeight = document.getElementById('pfcOutWeight');
const pfcOutWeightType = document.getElementById('pfcOutWeightType');
const pfcOutFrequency = document.getElementById('pfcOutFrequency');
const pfcOutFeedDay = document.getElementById('pfcOutFeedDay');
const pfcOutFeed = document.getElementById('pfcOutFeed');
// BUTTONS
const pfcBtnReset = document.getElementById('pfcBtnReset');

function pfcCalculate(event) {
    event.preventDefault();
    event.stopPropagation();

    if (pfcInTypeDog.checked) {
        pfcOutType.textContent = 'DOG';
    } else if (pfcInTypeCat.checked) {
        pfcOutType.textContent = 'CAT';
    } else {
        pfcOutType.textContent = 'ERR';
    }

    if (pfcInWeight.value) {
        pfcOutWeight.textContent = pfcInWeight.value;
    }

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
        pfcOutFrequency.pfcOutFrequency = '1';
    } else if (pfcInFreq2.checked) {
        pfcOutFrequency.pfcOutFrequency = '2';
    } else if (pfcInFreq3.checked) {
        pfcOutFrequency.pfcOutFrequency = '3';
    } else {
        pfcOutFrequency.textContent = 'ERR';
    }

    if (!Number.isNaN(pfcInWeight.value)) {
        const weight = Number(pfcInWeight.value);

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

        pfcOutFeedDay.textContent = `${feedDay.toFixed(2)}`;

        if (pfcInFreq1.checked) {
            pfcOutFeed.textContent = `${feedDay.toFixed(2)}`;
        } else if (pfcInFreq2.checked) {
            pfcOutFeed.textContent = `${(feedDay / 2).toFixed(2)}`;
        } else if (pfcInFreq3.checked) {
            pfcOutFeed.textContent = `${(feedDay / 3).toFixed(2)}`;
        } else {
            pfcOutFrequency.textContent = 'ERR';
        }
    }
}

function pfcReset(event) {
    pfcForm.reset();
    pfcOutType.textContent = '';
    pfcOutWeight.textContent = '';
    pfcOutWeightType.textContent = '';
    pfcOutFrequency.textContent = '';
    pfcOutFeedDay.textContent = '';
    pfcOutFeed.textContent = '';
}

pfcForm.addEventListener('submit', pfcCalculate);
pfcBtnReset.addEventListener('click', pfcReset);
