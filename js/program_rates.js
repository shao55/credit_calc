import { percent_formatter } from "./formatters.js";
// Процентные ставки
const program_base = 0.099;
const program_it = 0.047;
const program_gov = 0.067;
const program_zero = 0.108;

// Отображение процентной ставки на страницу
document.querySelector('#base-value').value = program_base;
document.querySelector('#it-value').value = program_it;
document.querySelector('#gov-value').value = program_gov;
document.querySelector('#zero-value').value = program_zero;

// Указываем процентную ставку в Label
document.querySelector("#base-text").innerText = percent_formatter.format(program_base);
document.querySelector("#it-text").innerText = percent_formatter.format(program_it);
document.querySelector("#gov-text").innerText = percent_formatter.format(program_gov);
document.querySelector("#zero-text").innerText = percent_formatter.format(program_zero);

// Отображаем выбранную процентную ставку в правом блоке
const program_inputs = document.querySelectorAll("input[name='program']");
const total_percent = document.querySelector("#total-percent");
program_inputs.forEach((input) => {
    // Отображение процентной ставки на старте
    if (input.checked) {
        total_percent.innerText = percent_formatter.format(input.value);
    }
    // Отображение процентной ставки при переключении
    input.addEventListener("click", function () {
        total_percent.innerText = percent_formatter.format(this.value);
    })
});