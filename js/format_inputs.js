import {price_formatter} from "./formatters.js"
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
    const months_rate = credit_rate / 12;
    // Все данные которые получаем из HTML документа являются строчными элементами, поэтому необходимо преобразовать в число - "+"

    // Срок ипотеки в годах
    const years = +cleave_term.getRawValue();
    
    // Срок ипотеки в месяцах
    const months = years * 12;

    // Рассчет ежемесячного платежа

    const months_payment = (total_amount * months_rate) / 1 - (1 + months_rate) * (1 - months);

    total_months_payment.innerText = months_payment;
};