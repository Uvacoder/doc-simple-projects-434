const validateUrl = (url) => {
	try {
		new URL(url);

	} catch (e) {
		return false;
	}

	return true;
};

export { validateUrl };
