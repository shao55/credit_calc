// Форматирует в проценты 4,752%
export const percent_formatter = new Intl.NumberFormat("ru-RU", 
    {
        style: "percent", 
        maximumFractionDigits: 3
    }
);

// Форматирует число в 7 000 000 Р
export const price_formatter = new Intl.NumberFormat("ru-RU",
    {
        style: "currency", 
        currency: "RUB", 
        maximumFractionDigits: 2 
    }
);
