module.exports.verifyOptions = function(req, res) {
	const errorMessages = [];
	const { height, currentWeight, age, desiredWeight } = req.body;

	if (height < 1 || height > 299) {
		errorMessages.push('Ограничение по росту от 1 до 299 см!');
	}
	if (currentWeight < 1 || currentWeight > 199) {
		errorMessages.push('Ограничение по весу от 1 до 199 кг!');
	}
	if (desiredWeight < 1 || desiredWeight > 199) {
		errorMessages.push('Ограничение по весу от 1 до 199 кг!');
	}
	if (age < 1 || age > 99) {
		errorMessages.push('Ограничение по возрасту от 1 до 99 лет!');
	}
	if (age < 1 || age > 99) {
		errorMessages.push('Ограничение по возрасту от 1 до 99 лет!');
	}
	if (!age || !height || !currentWeight || !desiredWeight) {
		errorMessages.push('Не все поля заполнены!');
	}

	if (errorMessages.length === 0) {
		const callPerDay =
			10 * currentWeight +
			6.25 * height -
			5 * age -
			161 -
			10 * (currentWeight - desiredWeight);
		res.status(200).json({ calloriesPerDay: callPerDay });
	} else {
		res.status(200).json({ errorMessages });
	}
};
