// Находим инпуты на страницы
const input_cost = document.querySelector("#input-cost");
const input_down_payment = document.querySelector("#input-downpayment");
const input_term = document.querySelector("#input-term");

// Опции форматирования от cleavejs
const cleave_price_settings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: " "
};

// Запускаем форматирование cleavejs
const cleave_cost = new Cleave(input_cost, cleave_price_settings);
const cleave_downpayment = new Cleave(input_down_payment, cleave_price_settings);

// Отображение и расчет суммы кредита
