const inputName = document.querySelector("#input-name");
const inputNumber = document.querySelector("#input-number");
const formBtn = document.querySelector("#form-btn");
const form = document.querySelector("#form");
const list = document.querySelector("#list");

const NUMBER_REGEX = /^((412)|(414)|(424)|(212))[0-9]{7}$/;
const NAME_REGEX = /^[A-B]|\S$/;

let numberValidation = false;
let nameValidation = false;

const validate = (input, vericaficion) => {
	const message = input.parentElement.children[1];

	if (numberValidation && nameValidation) {
		formBtn.disabled = false;
	} else {
		formBtn.disabled = true;
	}
	if (!input.value) {
		input.classList.remove("error");
		input.classList.remove("success");
		message.classList.remove("show");
		
	} else if (vericaficion) {
		input.classList.remove("error");
		input.classList.add("success");
		message.classList.remove("show");
	} else {
		input.classList.add("error");
		message.classList.add("show");
		input.classList.remove("success");
	}
};

inputName.addEventListener("input", (e) => {
	nameValidation = inputName.value.length > 3;
	validate(inputName, nameValidation);
});

inputNumber.addEventListener("input", (e) => {
	numberValidation = NUMBER_REGEX.test(inputNumber.value);
	validate(inputNumber, numberValidation);
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const li = document.createElement("li");
	li.innerHTML = `
    <button class="delete-icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>                  
</button>
<input type="text" value="${inputName.value}" disabled placeholder="Nombre...">
<input type="text" value="${inputNumber.value}" disabled placeholder="Numero telefonico...">
<button class="edit-icon">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>                  
</button>
`;

	list.append(li);
	localStorage.setItem("listcontacts", list.innerHTML);

});

list.addEventListener("click", (e) => {
	if (e.target.closest(".delete-icon")) {
		e.target.closest(".delete-icon").parentElement.remove();
		localStorage.removeItem("listcontacts");
	}


	if (e.target.closest(".edit-icon")) {
		const inputEditName=
			e.target.closest(".edit-icon").parentElement.children[1];
		console.log(inputEditName);
		if (inputEditName.hasAttribute("disabled")) {
			inputEditName.removeAttribute("disabled");
			inputEditName, inputEditNumber.focus();
		} else {
			inputEditName.setAttribute("disabled", true);
			inputEditName.setAttribute("value", inputEditName.value);
			console.log(inputEditName.value);
		}
	}
});




window.onload = () => {
	list.innerHTML = localStorage.getItem("listcontacts");
};
