document.querySelector('input[name="user-name"]').focus()
const otherType = document.querySelector('input[name="job_role_other"]');
otherType.style.display = 'none';

// const colorOption = document.getElementById('colors-js-puns');
// colorOption.style.display = 'none'


const design = document.getElementById('design');
design.children[0].style.display = 'none'
console.log(design.children[0]);

const colors = document.getElementById('color');
const option = document.createElement('option');
option.innerText = "Please select a T-shirt theme.";
option.selected = true;
for (let color of colors) {
    color.style.display = 'none'
}
colors.prepend(option)

console.log(design.options)