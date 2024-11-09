export const shortenPhone = (phone) => {
	const phoneParts = phone.split(' ');
	const countryCode = phoneParts[0];
	const phoneNumber = phoneParts[1];
	const phoneLength = phoneNumber.length;
	const phoneStart = phoneNumber.slice(0, 3);
	const phoneEnd = phoneNumber.slice(phoneLength - 3, phoneLength);
	return `${countryCode} ${phoneStart}***${phoneEnd}`;
};
