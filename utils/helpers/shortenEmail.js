export const shortenEmail = (email) => {
	const emailParts = email.split('@');
	const emailName = emailParts[0];
	const emailDomain = emailParts[1];
	const emailLength = emailName.length;
	const emailStart = emailName.slice(0, 3);
	const emailEnd = emailName.slice(emailLength - 3, emailLength);
	return `${emailStart}...${emailEnd}@${emailDomain}`;
};
