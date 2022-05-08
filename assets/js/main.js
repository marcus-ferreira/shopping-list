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
	const itemValue = value.value.replace(',', '.');

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
		<section class="item-text">
			<h3>${itemName.charAt(0).toUpperCase() + itemName.slice(1)}</h3> 
			<p>R$ <span>${parseFloat(itemValue).toFixed(2)}</span></p>
		</section>
		<section class="item-icons">
			<i onclick="editItem(this)" class="fa-solid fa-edit"></i>
			<i onclick="deleteItem(this)" class="fa-solid fa-trash-can"></i>
		</section>
	</section>
	`;

	total.innerHTML = (parseFloat(total.innerHTML) + parseFloat(itemValue)).toFixed(2);

	// Reset
	item.value = "";
	value.value = "";
	warning.innerHTML = "";
	item.focus();

	saveState();
}

function editItem(element) {
	const elementItem = element.parentElement.parentElement.querySelector("h3");
	const elementValue = element.parentElement.parentElement.querySelector("p span");

	item.value = elementItem.innerHTML;
	value.value = elementValue.innerHTML;

	item.focus();

	warning.innerHTML = "";
	deleteItem(element);
	saveState();
}

function deleteItem(element) {
	const elementValue = element.parentElement.parentElement.querySelector("p span");
	total.innerHTML = (parseFloat(total.innerHTML) - parseFloat(elementValue.innerHTML)).toFixed(2);

	warning.innerHTML = "";
	element.parentElement.parentElement.remove();
	saveState();
}

function clearList() {
	warning.innerHTML = "";
	buyList.innerHTML = "";
	total.innerHTML = "0.00";
	saveState();
}

function saveState() {
	window.localStorage.setItem("buyList", buyList.innerHTML);
	window.localStorage.setItem("total", total.innerHTML);
}

form.addEventListener('submit', e => {
	e.preventDefault();
	addItem();
})