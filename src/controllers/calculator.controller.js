// // TODO:
// //! має приймати з req дані - провести їх валідацію, якщо не валідні то видавити помилку по томі чи іншому полі
// //! якщо всі поля пройшли валідацію - з формули вирахувати норму калорій
// //! взяти з реквеста групу крові і в потрібній колекції взяти дані по цій групі - які категорії проуктів заборонені
// //! у відповідь відправи норму калорій і список заборонених категорій продуків
// //!

// // ? requestBody
// // ? {
// // ? height: Number,
// // ? currentWeight: Number,
// // ? age: Number,
// // ? desiredWeight: Number,
// // ? groupBlood: Number
// // ? }
// //* respond
// //* 200
// //*	{
// //*	normalCalories: Number,
// //*	notAllowerCategories: Array // []
// //* }
// //* 500 {
// //* error: Server error,
// //*	message: error.message
// //* }
// //* 400
module.exports.verifyOptions = function (req, res) {

    const errorMessages = [];
    const { height, currentWeight, age, desiredWeight } = req.body;

    if (height < 1 || height > 299) {
        errorMessages.push('Ограничение по росту от 1 до 299 см!')
    }
    if (currentWeight < 1 || currentWeight > 199) {
        errorMessages.push('Ограничение по весу от 1 до 199 кг!')
    }
    if (desiredWeight < 1 || desiredWeight > 199) {
        errorMessages.push('Ограничение по весу от 1 до 199 кг!')
    }
    if (age < 1 || age > 99) {
        errorMessages.push('Ограничение по возрасту от 1 до 99 лет!')
    }
    if (age < 1 || age > 99) {
        errorMessages.push('Ограничение по возрасту от 1 до 99 лет!')
    }
    if (!age||!height||!currentWeight||!desiredWeight) {
        errorMessages.push('Не все поля заполнены!')
    }

    if (errorMessages.length === 0) {
        const callPerDay = 10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desiredWeight);
        res
            .status(200)
            .json({ calloriesPerDay: callPerDay });
    }
    else {
        res
            .status(200)
            .json({ errorMessages })
    }
}

// if(1 < height < 299) {

// } esle {
// errorMessages.push('Ввведена не коректа цифра діапзон невірний')
// }


// if (errorMessages.length > 0) {
// res.status(400).json({
// status: "BAD",
// messages: errorMessages
// })
// } else {
// //! тут добавляжмо функію з формулою 
// //! шукамо у колекції крові потрібний документ
// //! відправляємо результат

// }