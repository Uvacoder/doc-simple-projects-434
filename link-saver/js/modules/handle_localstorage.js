const ls = localStorage;

const toString = (item) => JSON.stringify(item);
const toObject = (item) => JSON.parse(item);

const addToLocalStorage = (item) => {
	let items = toObject(ls.getItem("items")) || [];
	items = [item, ...items];
	ls.setItem("items", toString(items));
};

const getLocalStorageItems = () => {
	const items = toObject(ls.getItem("items")) || [];
	return items;
};

const removeFromLocalStorage = (id) => {
	let items = toObject(ls.getItem("items")) || [];
	if (items.length > 0) {
		items = items.filter((item) => item.id !== id);
		ls.setItem("items", toString(items));
	}
};

const clearLocalStorage = () => ls.clear();

export { addToLocalStorage, getLocalStorageItems, removeFromLocalStorage, clearLocalStorage };
