let storage = window.localStorage;
const form = document.querySelector('form');
const buyList = document.querySelector('.buy-list');
const item = document.querySelector('.item');
const value = document.querySelector('.value');
const warning = document.querySelector('.warning');
const total = document.querySelector('.total span');

if (!storage.getItem('buyList')) {
	storage.setItem('buyList', "");
	storage.setItem('total', "0.00");
}

buyList.innerHTML = storage.getItem('buyList');
total.innerHTML = storage.getItem('total');

function addItem() {
	const itemName = item.value;
	const itemValue = parseFloat(value.value.replace(',', '.'));

	if (itemName === "" || itemValue === "") {
		warning.innerHTML = 'Insira um item corretamente.';
		return;
	}

	if (isNaN(itemValue)) {
		warning.innerHTML = 'Insira um valor corretamente.';
		return;
	}

	buyList.innerHTML += `
	<section class="list-item">
	<h3>${itemName}</h3> 
	<p>R$ <span>${itemValue.toFixed(2)}</span></p>
	<i onclick="editItem(this)" class="fa-solid fa-edit"></i>
	<i onclick="deleteItem(this)" class="fa-solid fa-trash-can"></i>
	</section>
	`;

	total.innerHTML = (parseFloat(total.innerHTML) + itemValue).toFixed(2);

	// Reset
	item.value = "";
	value.value = "";
	warning.innerHTML = "";

	saveState();
}

function editItem(element) {
	const elementItem = element.parentElement.querySelector("h3");
	const elementValue = element.parentElement.querySelector("p span");

	item.value = elementItem.innerHTML;
	value.value = elementValue.innerHTML;

	deleteItem(element);
	saveState();
}

function deleteItem(element) {
	const elementValue = element.parentElement.querySelector("p span");
	total.innerHTML = (parseFloat(total.innerHTML) - parseFloat(elementValue.innerHTML)).toFixed(2);

	element.parentElement.remove();
	saveState();
}

function clearList() {
	buyList.innerHTML = "";
	total.innerHTML = "0.00";
	saveState();
}

function saveState() {
	window.localStorage.setItem("buyList", buyList.innerHTML);
	window.localStorage.setItem("total", total.innerHTML);
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	addItem();
});

