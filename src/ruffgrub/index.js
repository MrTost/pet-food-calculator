import "./index.scss";

// INPUT
const pfcForm = document.getElementById('pfcInForm');
const pfcInType = document.getElementById('pfcInType');
const pfcInAge = document.getElementById('pfcInAge');
const pfcInActive = document.getElementById('pfcInActive');
const pfcInWeight = document.getElementById('pfcInWeight');
const pfcInUnit = document.getElementById('pfcInUnit');
const pfcInFreq1 = document.getElementById('pfcInFreq1');
const pfcInFreq2 = document.getElementById('pfcInFreq2');
const pfcInFreq3 = document.getElementById('pfcInFreq3');
// OUTPUT
const pfcOutWeight = document.getElementById('pfcOutWeight');
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
    pfcOutFrequency.textContent = '';
    pfcOutFeedDay.textContent = '';
    pfcOutFeed.textContent = '';
}

function onPfcInType(event) {
    while (pfcInAge.options.length > 0) {
        pfcInAge.remove(0);
    }

    if (pfcInType.value === 'cat') {
        pfcInAge.add(new Option('Kitten over 8 weeks','young'));
        pfcInAge.add(new Option('Adult','adult'));
    } else if (pfcInType.value === 'dog') {
        pfcInAge.add(new Option('Puppy','young'));
        pfcInAge.add(new Option('Adult','adult'));
        pfcInAge.add(new Option('Senior','senior'));
        pfcInAge.add(new Option('Performance','performance'));
    }

    pfcCalculate(event);
}

function pfcCalculate(event) {
    event.preventDefault();
    event.stopPropagation();

    pfcResetResults();

    if (pfcInWeight.value === '') {
        return;
    }

    if (!pfcInWeight.value || isNaN(pfcInWeight.value)) {
        pfcInWeight.focus();
        pfcInWeight.classList.add('is-invalid');
        pfcInWeight.addEventListener('keypress', pfcRemoveError);
    } else {
        const weight = Number(pfcInWeight.value);
        const unit = pfcInUnit.value;

        let feedDay;

        if (pfcInType.value === 'cat') {
            if (pfcInAge.value === 'young') {
                if (pfcInActive.value === 'low') {
                    feedDay = weight * 0.0375;
                } else if (pfcInActive.value === 'moderate') {
                    feedDay = weight * 0.05;
                } else if (pfcInActive.value === 'high') {
                    feedDay = weight * 0.0625;
                } else {
                    feedDay = 0;
                }
            } else if (pfcInAge.value === 'adult') {
                if (pfcInActive.value === 'low') {
                    feedDay = weight * 0.02;
                } else if (pfcInActive.value === 'moderate') {
                    feedDay = weight * 0.025;
                } else if (pfcInActive.value === 'high') {
                    feedDay = weight * 0.03;
                } else {
                    feedDay = 0;
                }
            } else {
                feedDay = 0;
            }
        } else if (pfcInType.value === 'dog') {
            if (pfcInAge.value === 'young') {
                if (pfcInActive.value === 'low') {
                    feedDay = weight * 0.04;
                } else if (pfcInActive.value === 'moderate') {
                    feedDay = weight * 0.05;
                } else if (pfcInActive.value === 'high') {
                    feedDay = weight * 0.06;
                } else {
                    feedDay = 0;
                }
            } else if (pfcInAge.value === 'adult') {
                if (pfcInActive.value === 'low') {
                    feedDay = weight * 0.02;
                } else if (pfcInActive.value === 'moderate') {
                    feedDay = weight * 0.025;
                } else if (pfcInActive.value === 'high') {
                    feedDay = weight * 0.03;
                } else {
                    feedDay = 0;
                }
            } else if (pfcInAge.value === 'senior') {
                if (pfcInActive.value === 'low') {
                    feedDay = weight * 0.015;
                } else if (pfcInActive.value === 'moderate') {
                    feedDay = weight * 0.0175;
                } else if (pfcInActive.value === 'high') {
                    feedDay = weight * 0.02;
                } else {
                    feedDay = 0;
                }
            } else if (pfcInAge.value === 'performance') {
                if (pfcInActive.value === 'low') {
                    feedDay = weight * 0.03;
                } else if (pfcInActive.value === 'moderate') {
                    feedDay = weight * 0.055;
                } else if (pfcInActive.value === 'high') {
                    feedDay = weight * 0.06;
                } else {
                    feedDay = 0;
                }
            } else {
                feedDay = 0;
            }
        } else {
            feedDay = 0;
        }

        pfcOutWeight.textContent = `${weight.toFixed(4)} ${unit}`;

        if (pfcInFreq1.checked) {
            pfcOutFrequency.textContent = 'ONCE A DAY';
        } else if (pfcInFreq2.checked) {
            pfcOutFrequency.textContent = 'TWICE A DAY';
        } else if (pfcInFreq3.checked) {
            pfcOutFrequency.textContent = 'x3 A DAY';
        } else {
            pfcOutFrequency.textContent = 'ERR';
        }

        pfcOutFeedDay.textContent = `${feedDay.toFixed(4)} ${unit}`;

        if (pfcInFreq1.checked) {
            pfcOutFeed.textContent = `${feedDay.toFixed(4)} ${unit}`;
        } else if (pfcInFreq2.checked) {
            pfcOutFeed.textContent = `${(feedDay / 2).toFixed(4)} ${unit}`;
        } else if (pfcInFreq3.checked) {
            pfcOutFeed.textContent = `${(feedDay / 3).toFixed(4)} ${unit}`;
        } else {
            pfcOutFrequency.textContent = 'ERR';
        }
    }
}

pfcInType.addEventListener('change', onPfcInType);
pfcInAge.addEventListener('change', pfcCalculate);
pfcInActive.addEventListener('change', pfcCalculate);
pfcInUnit.addEventListener('change', pfcCalculate);
pfcInFreq1.addEventListener('change', pfcCalculate);
pfcInFreq2.addEventListener('change', pfcCalculate);
pfcInFreq3.addEventListener('change', pfcCalculate);

pfcForm.addEventListener('submit', pfcCalculate);
pfcBtnReset.addEventListener('click', pfcReset);


