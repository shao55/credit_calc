import {price_formatter, price_formatter_decimals} from "./formatters.js"
// Находим инпуты на страницы
const input_cost = document.querySelector("#input-cost");
const input_down_payment = document.querySelector("#input-downpayment");
const input_term = document.querySelector("#input-term");
const form = document.querySelector("#form");
const total_cost = document.querySelector("#total-cost");
const total_months_payment = document.querySelector("#total-month-payment");

// Опции форматирования от cleavejs
const cleave_price_settings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: " "
};

// Запускаем форматирование cleavejs
const cleave_cost = new Cleave(input_cost, cleave_price_settings);
const cleave_downpayment = new Cleave(input_down_payment, cleave_price_settings);
const cleave_term = new Cleave(input_term, cleave_price_settings);

// Вызов функции расчета суммы кредита в начале
calc_mortgage();

// Отображение и расчет суммы кредита
form.addEventListener("input", function () {
    // Вызов функции расчета суммы кредита после изменений
    calc_mortgage()
});

// Функция расчета суммы кредита (общая сумма минус первоначальный взнос)
function calc_mortgage() {

    // Общая сумма кредита
    const total_amount = +cleave_cost.getRawValue() - +cleave_downpayment.getRawValue();
    total_cost.innerText = price_formatter.format(total_amount);

    // Находим ставку по кредиту, которая выбрана
    const credit_rate = +document.querySelector("input[name='program']:checked").value;
    const months_rate = (credit_rate * 100) / 12;
    // Все данные которые получаем из HTML документа являются строчными элементами, поэтому необходимо преобразовать в число - "+"

    // Срок ипотеки в годах
    const years = +cleave_term.getRawValue();

    // Срок ипотеки в месяцах
    const months = years * 12;

    // Рассчет ежемесячного платежа
    const months_payment = (total_amount * months_rate) / (1 - (1 + months_rate) * (1 - months));
    
    // Отображение ежемесячного платежа на страницу
    total_months_payment.innerText = price_formatter_decimals.format(months_payment);
};

// Слайдер стоимости недвижимости
const slider_cost = document.getElementById("slider-cost");

noUiSlider.create(slider_cost, {
    start: 10000000,
    connect: "lower",
    // tooltips: true,
    step: 100000,
    range: {
        "min": 0,
        "50%": [10000000, 1000000],
        "max": 100000000,
    },
    format: wNumb({
        decimals: 0,
        thousand: " ",
        suffix: " ",
    }),
});

slider_cost.noUiSlider.on("update", function () {
    const slider_value = parseInt(slider_cost.noUiSlider.get(true));
    cleave_cost.setRawValue(slider_value);
    calc_mortgage();
});

// Слайдер первоначального взноса
const slider_downpayment = document.getElementById("slider-downpayment");

noUiSlider.create(slider_downpayment, {
    start: 4000000,
    connect: "lower",
    // tooltips: true,
    step: 100000,
    range: {
        "min": 0,
        "50%": [10000000, 1000000],
        "max": 100000000,
    },
    format: wNumb({
        decimals: 0,
        thousand: " ",
        suffix: " ",
    }),
});

slider_downpayment.noUiSlider.on("update", function () {
    const slider_value = parseInt(slider_downpayment.noUiSlider.get(true));
    cleave_downpayment.setRawValue(slider_value);
    calc_mortgage();
});

// Слайдер срока кредитования
const slider_term = document.getElementById("slider-term");

noUiSlider.create(slider_term, {
    start: 5,
    connect: "lower",
    // tooltips: true,
    step: 1,
    range: {
        min: 1,
        max: 30,
    },
    format: wNumb({
        decimals: 0,
        thousand: "",
        suffix: "",
    }),
});

slider_term.noUiSlider.on("update", function () {
    const slider_value = parseInt(slider_term.noUiSlider.get(true));
    cleave_term.setRawValue(slider_value);
    calc_mortgage();
});