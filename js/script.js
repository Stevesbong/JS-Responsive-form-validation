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
let num = 0;

// CREATE TOTAL COST "P" ELEMENT AND APPEND TO ACTIVITY
const totalCost = document.createElement('p');
totalCost.innerHTML = `Total Cost: $${num}`;
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
        num += parseInt(currentValue.getAttribute('data-cost'));
    } else {
        num -= parseInt(currentValue.getAttribute('data-cost'));
    }
    totalCost.innerHTML = `Total Cost: $${num}`
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
function displaySetting(credit, paypal, bitcoin) {
    // HIDE AND SHOW CREDIT, PAYPAL, AND BITCOIN
    // DEPENDS ON THE PARAMETER
    document.getElementById('credit-card').style.display = credit;
    paypalText.style.display = paypal;
    bitcoinText.style.display = bitcoin;
}

// PAYMENT DISPLAYING EVENT LISTENER 
payment.addEventListener('change', e => {

    const selectedValue = e.target.value;
    if(selectedValue === "paypal") {

        displaySetting('none', 'inherit', 'none');

    } else if(selectedValue === "bitcoin") {

        displaySetting('none', 'none', 'inherit');

    } else {

        displaySetting('inherit', 'none', 'none');

    }
})


// FOR THE FORM VALIDATION
const form = document.getElementById('form')
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
const nameRegex = /^([A-Z]+)?([a-z]+)?(\s)?([A-Z]+)?([a-z]+)?$/;
const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
const activities = document.querySelectorAll('input[type="checkbox"]');
// 16 length
const visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");

// 15 length
const amex = new RegExp("^3[47][0-9]{13}$");

// 16 length
const mastercard = new RegExp("^5[1-5][0-9]{14}$");

const zipcodeRegex = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$");

const cvvRegex = new RegExp("^[0-9]{3}$");


//                          TEST SECTION

const name = document.getElementById('name');
const email = document.getElementById('email');
const p = document.createElement('p');
const fieldset = document.getElementsByTagName('fieldset')[0];
p.className = 'basic-info-error'
p.style.display = 'none'
fieldset.appendChild(p)

function isValidName(name) {
    return /^([A-Z]+)?([a-z]+)?(\s)?([A-Z]+)?([a-z]+)?$/.test(name);
}
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}
function displayError(show, element, input) {
    if(show) {
        element.style.display = 'inherit';
        input.style.borderColor = 'red';
        element.innerText = `${input.getAttribute('id')} is invalid`;
    } else {
        element.style.display = 'none';
        input.style.borderColor = '';
    }
}

function validListener(validator) {
    return e => {
        const text = e.target.value;
        const valid = validator(text);
        console.log(valid, 'valid');
        const showTip = text !== "" && !valid;
        console.log(showTip);
        const toolTip = p;
        displayError(showTip, toolTip, e.target);
    }
}

name.addEventListener('input', validListener(isValidName))
email.addEventListener('input', validListener(isValidEmail))
// function createListener(validator) {
//     return e => {
//       const text = e.target.value;
//       const valid = validator(text);
//       const showTip = text !== "" && !valid;
//       const tooltip = e.target.nextElementSibling;
//       showOrHideTip(showTip, tooltip);
//     };
//   }



//                          TEST SECTION END

// NAME, EMAIL VALIDATION HELPER FUNCTION
// function basicInfo() {
//     const name = document.getElementById('name');
//     const email = document.getElementById('mail');
//     const p = document.createElement('p');
//     const fieldset = document.getElementsByTagName('fieldset')[0];
//     // p.style.display = 'none'
//     p.className = 'basic-info-error'
//     p.style.display = 'none'
//     fieldset.appendChild(p)
    

//     name.addEventListener('input', e => {
//         if(e.target.value === '') {
    
//             e.target.style.borderColor = 'red'
//             p.style.display = 'inherit'
//             p.innerHTML = "name cannot be empty"
    
//         } else {
//             e.target.style.borderColor = ''
//             p.style.display = ""
//             if(!nameRegex.test(e.target.value)) {
//                 p.style.display = 'inherit'
//                 p.innerHTML = "name is invalid"
//             }
//             p.style.display = 'none'
//         }
//     })

//     email.addEventListener('input', e => {
//         if(email.value === '') {

//             email.style.borderColor = 'red'
//             p.style.display = 'inherit'
//             p.innerHTML = "email cannot be empty"
    
//         } else {
//             e.target.style.borderColor = ''
//             p.style.display = ""
//             if(!emailRegex.test(email.value)) {
//                 email.style.borderColor = 'red'
//                 p.style.display = 'inherit'
//                 p.innerHTML = "email is invalid"
//             }
//         }
//     })

//     if(otherType.style.display !== 'none') {
//         //get other type value
//         console.log(otherType.value)
//     }
// }


// basicInfo()
// console.dir(activities)
form.addEventListener('submit', e => {
    // console.log(e.target)
    if(design.value === "js puns" || design.value === "heart js") {
        if(colors.value !== colors.options[0].value) {
            console.log(colors.value)
        }
    }

    // console.log(activities.length)
    let count =0;
    activities.forEach( e => {
        if(!e.checked) {
            count+=1
        }
    })
    // console.log(count)
    if(activities.length === count) {
        console.log('error')
    }
    // payment cost
    // console.log(num)

    // card number test
    // if payment.value is not creditcard, dont do it
    if(payment.value === payment.options[0].value) {
        console.log('select method')
    } else if(payment.value === 'credit card') {
        console.log(visa.test(card.value))
        console.log(amex.test(card.value))
        console.log(mastercard.test(card.value))
        console.log(zipcodeRegex.test(zipcode.value))
        console.log(cvvRegex.test(cvv.value))
    }

    // console.log(payment.value, 'hi')
    e.preventDefault()
})