// BASIC INFO SECTION
document.querySelector('input[name="user-name"]').focus();
const otherType = document.querySelector('input[name="job_role_other"]');
const jobTitle = document.getElementById('title');

// HIDE OTHER INPUT WHEN PAGE LOAD
otherType.style.display = 'none';

// REVEAL THE OTHER INPUT WHEN USER SELECTED OTHER VALUE
jobTitle.addEventListener('change', e => {
    // IF TITLE VALUE IS OTHER, SHOW INPUT ELEMENT
    const title = e.target.value;
    if(title === "other") {
        otherType.style.display = 'inherit';
    } else {
        otherType.style.display = 'none';
    }
})

//DESIGN SECTION
// HIDE FIRST OPTION WHEN USER CLICKED DESIGN
const design = document.getElementById('design');
design.firstElementChild.style.display = 'none';

// COLOR SECTION
const colors = document.getElementById('color');
// CREATE DEFAULT SELECTED OPTION
const defaultOption = document.createElement('option');
defaultOption.innerText = "Please select a T-shirt theme.";
defaultOption.selected = true;

// HIDE ALL COLORS WHEN PAGE LOAD
for (let color of colors) {
    color.style.display = 'none';
}
colors.prepend(defaultOption)

// DESIGN OPTION CHANGES
design.addEventListener('change', e => {
    const optionVal = e.target.value;

    // HIDE DEFAULT OPTION
    colors.options[0].style.display = 'none';

    // DISPLAY ONLY "JS PUNS" COLORS
    if(optionVal === "js puns") {
        colors.options[1].selected = true;
        for(let i = 1; i < colors.options.length; i++) {
            colors.options[i].style.display = 'inherit';
            if(i > 3){
                colors.options[i].style.display = 'none';
            }
        }
    // DISPLAY ONLY "HEART JS" COLORS
    } else if(optionVal === "heart js") {
        colors.options[4].selected = true;
        for(let i = 1; i < colors.options.length; i++) {
            colors.options[i].style.display = 'inherit';
            if(i < 4){
                colors.options[i].style.display = 'none';
            }
        }
    }
})

// ACTIVITIES

const activity = document.getElementsByClassName('activities')[0];
// TOTAL COST FOR ACTIVITIES
let cost = 0;

// CREATE TOTAL COST "P" ELEMENT AND APPEND TO ACTIVITY
const totalCost = document.createElement('p');
totalCost.innerHTML = `Total Cost: $${cost}`;
activity.appendChild(totalCost);

// ACTIVITY EVENT LISTENER
activity.addEventListener('change', e => {

    // CLICKED CHECKBOX VALUE
    const currentValue = e.target;

    // GET ALL THE VALUES FROM CHECKBOX AND COMPARE TO CURRENT VALUE
    const activities = document.querySelectorAll('input[type="checkbox"]')
    activities.forEach( inputBox => {
        if(currentValue.getAttribute('data-day-and-time') === inputBox.getAttribute('data-day-and-time')){
            // ANY ONE OF ACTIVITIES MATCHES CURRENT TIME VALUE, DISABLED
            inputBox.disabled = true;
            
            // ENABLE THE CURRENT CHECKBOX
            currentValue.disabled = false;
            
            // IF UNCHECK THE CURRENT CHECKBOX, ENABLE TIME MATCHED CHECKBOX
            if(!currentValue.checked) {
                inputBox.disabled = false;
            }
        }

        // IF TIME MATCHED CHECKBOX ENABLE, UNSET THE LINE THROUGH
        // ELSE SET LINE THROUGH
        if(!inputBox.disabled) {
            inputBox.parentElement.style.textDecoration = 'none';
        } else {
            inputBox.parentElement.style.textDecoration = 'line-through';
        }
    })

    // IF CURRENT CHECKBOX CHECKED, GET THE COST AND ADD TO IT
    if(currentValue.checked) {
        cost += parseInt(currentValue.getAttribute('data-cost'));
    } else {
        cost -= parseInt(currentValue.getAttribute('data-cost'));
    }
    totalCost.innerHTML = `Total Cost: $${cost}`;
})


// PAMENT INFO

const payment = document.getElementById('payment');
// HIDE FIRST OPTION CHOISE
payment.firstElementChild.style.display = 'none';

// HIDE PAYPAL AND BITCOIN DESCRIPTION
const paypalText = document.getElementById('paypal');
const bitcoinText = document.getElementById('bitcoin');
paypalText.style.display = 'none';
bitcoinText.style.display = 'none';

// DISPLAY PAYMENT HELPER FUNCTION
function paymentDisplay(selected) {
    // HIDE AND SHOW CREDIT, PAYPAL, AND BITCOIN
    // DEPENDS ON THE PARAMETER
    
    if(selected === "paypal") {
        paypalText.style.display = 'inherit';
        bitcoinText.style.display = 'none';
        document.getElementById('credit-card').style.display = 'none'
    } else if(selected === "bitcoin") {
        paypalText.style.display = 'none';
        bitcoinText.style.display = 'inherit';
        document.getElementById('credit-card').style.display = 'none'
    } else {
        paypalText.style.display = 'none';
        bitcoinText.style.display = 'none';
        document.getElementById('credit-card').style.display = 'inherit'
    }
}

// PAYMENT DISPLAYING EVENT LISTENER 
payment.addEventListener('change', e => {

    const selectedValue = e.target.value;
    paymentDisplay(selectedValue);
})


// FOR THE FORM VALIDATION
const form = document.getElementById('form');

const name = document.getElementById('name');
const email = document.getElementById('email');
const card = document.getElementById('cc-num');
const zipcode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const expMonth = document.getElementById('exp-month');
const expYear = document.getElementById('exp-year');


//                  REGEX

// ^           # Assert position at the beginning of the string.
// [0-9]{5}    # Match a digit, exactly five times.
// (?:         # Group but don't capture:
//   -         #   Match a literal "-".
//   [0-9]{4}  #   Match a digit, exactly four times.
// )           # End the non-capturing group.
//   ?         #   Make the group optional.
// $           # Assert position at the end of the string.
// MIDDLE NAME IS NOT GOING TO WORK
// 16 length
const visa = new RegExp("^(4[0-9]{12}(?:[0-9]{3})?)?$");

// 15 length
const amex = new RegExp("^(3[47][0-9]{13})?$");

// 16 length
const mastercard = new RegExp("^(5[1-5][0-9]{14})?$");
const zipcodeRegex = new RegExp("^([0-9]{5}(?:-[0-9]{4})?)?$");
const cvvRegex = new RegExp("^([0-9]{3})?$");

const activities = document.querySelectorAll('input[type="checkbox"]');



// REGEX HELPER FUNCTION THAT RETURN TRUE OR FALSE
function isValidName(name) {
    return /^([A-Z]+)?([a-z]+)?(\s)?([A-Z]+)?([a-z]+)?$/.test(name);
}
function isValidEmail(email) {
    return /^([^@]+@[^@.]+\.[a-z]+)?$/i.test(email);
}
function isValidCardNumber(card) {
    return visa.test(card) || amex.test(card) || mastercard.test(card);
}
function isValidZipcode(zipcode) {
    return zipcodeRegex.test(zipcode);
}
function isValidCVV(cvv) {
    return cvvRegex.test(cvv);
}


// DISPLAY ERROR MESSAGE TO THE PAGE
function displayError(show, element, input) {
    if(show) {
        element.style.display = 'inherit';
        input.style.borderColor = 'red';
        element.innerText = `${input.getAttribute('data-name')} is invalid`;
    } else if (!input.value) {
        element.style.display = 'inherit';
        input.style.borderColor = 'red';
        element.innerText = `${input.getAttribute('data-name')} should not be empty.`;
    } else {
        element.style.display = 'none';
        input.style.borderColor = '';
    }
}


// CLOSURE FUNCTION 
// VALIDATE INPUTS AND DISPLAY ERROR
function validListener(validator) {
    return e => {
        console.log('validator', e.target)
        const p = errorMessageElement(e.target)
        e.target.parentElement.appendChild(p)
        const text = e.target.value;
        const valid = validator(text);
        const showTip = !valid;
        const toolTip = p;
        displayError(showTip, toolTip, e.target);
    }
}

function errorMessageElement(element){
    // console.log('errorMessageElement', document.querySelector('.basic-info-error'))
    // console.log('errorMessageElement22', element)
    const errorMessageP = document.querySelector('.basic-info-error')
    console.log('parent parent', element)
    console.log('sibling',element.parentElement.previousElementSibling)
    if(element.parentElement.contains(errorMessageP)) {
        document.querySelector('.basic-info-error').remove()
    }
    
    // // NEED WORK
    // else if(element.parentElement.parentElement === document.getElementById('credit-card')) {
    //     if(element.parentElement.previousElementSibling) {
    //         console.log(element.parentElement.previousElementSibling.children[2])
    //         if(element.parentElement.previousElementSibling.children[2] === document.querySelector('p.basic-info-error')) {
    //             console.log('yes')
    //             document.querySelector('p.basic-info-error').remove()
    //         }
    //     }
    // }
    const p = document.createElement('p');
    p.className = 'basic-info-error';
    return p;
}


// INDIVIDUAL VALIDATE EVENT LISTENER
name.addEventListener('input', validListener(isValidName));
email.addEventListener('input', validListener(isValidEmail));
card.addEventListener('input', validListener(isValidCardNumber));
zipcode.addEventListener('input', validListener(isValidZipcode));
cvv.addEventListener('input', validListener(isValidCVV));

function validationForAll() {
    if(basicInfoValidate() && activityValidate() && cardValidate()) {
        return true;
    } else {
        return false;
    }
}


// NAME AND EMAIL VALIDATE FUNCTION
function basicInfoValidate() {
    
    // CHECK INFO VALIDATION
    if(!name.value) {
        const p = errorMessageElement(name)
        name.parentElement.appendChild(p);
        displayError(true, p, name);
    } else {
        return true;
    }
    if(!email.value) {
        const p = errorMessageElement(email)
        email.parentElement.appendChild(p);
        displayError(true, p, email);
    } else {
        return true;
    }
    return false;
}


// ACTIVITY VALIDATE FUNCTION
function activityValidate() {
    
    // ACTIVITY FORM
    let count =0;
    // COUNT ALL THE ACTIVITIES THAT ARE NOT CHECKED
    activities.forEach( e => {
        if(!e.checked) {
            count+=1;
        }
    })
    // IF ACTIVITIES ARE NOT CHECKED, DISPLAY ERROR MESSAGE
    if(activities.length === count) {
        const p = errorMessageElement(activity.children[0]);
        activity.appendChild(p);
        displayError(true, p, activity);
    } else {
        return true;
    }

    return false;
}


// CARD NUMBER, ZIPCODE, AND CVV VALIDATE FUNCTION
function cardValidate() {
    // CARD SECTION
    // IF CARD, ZIPCODE, OR CVV IS EMPTY OR INVALID, DISPLAY ERROR MESSAGE
    if(!card.value) {
        const p = errorMessageElement(card);
        card.parentElement.parentElement.appendChild(p);
        displayError(true, p, card);
    } else {
        return true;
    }
    if(!zipcode.value) {
        const p = errorMessageElement(zipcode);
        zipcode.parentElement.parentElement.appendChild(p);
        displayError(true, p, zipcode);
    } else {
        return true;
    }
    if(!cvv.value) {
        const p = errorMessageElement(cvv);
        cvv.parentElement.parentElement.appendChild(p);
        displayError(true, p, cvv);
    } else {
        return true;
    }
    return false;
}


// FORM SUBMIT EVENT LISTENER
form.addEventListener('submit', e => {

    basicInfoValidate();
    activityValidate();
    cardValidate();

    if(!validationForAll()) {
        e.preventDefault();
    }
})
