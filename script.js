const inputElement = document.querySelector('.formPassword');
const lastLabel = document.querySelector('#labelPassword');

inputElement.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
        validator.clearPassword(inputElement);
        let confirmTrue = validator.checkInputEl(inputElement);
        if (confirmTrue !== true) {
            send = false;
            validator.showErrorPassword(inputElement, confirmTrue);
        }
    }
});

setTimeout(() => {
    document.querySelectorAll('label').forEach(element => {
        element.style.opacity = 1
    })
}, 100)

let validator = {
    handleSubmit: (e) => {
        e.preventDefault();
        let send = true;
        let inputList = form.querySelectorAll('input');

        validator.clearError();

        for (i = 0; i < inputList.length; i++) {
            let inputEl = inputList[i];
            let check = validator.checkInputEl(inputEl);
            if (check !== true) {
                send = false;
                validator.showError(inputEl, check);
            }
        }

        if (send) {
            form.submit();
        }
    },
    checkInputEl: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let j in rules) {
                let rulesDetails = rules[j].split('=');
                switch (rulesDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Necessário ser preenchido'
                        }
                        break;
                    case 'min':
                        if (input.value.length < rulesDetails[1]) {
                            return `Nescessário pelo menos ${rulesDetails[1]} caracteres`
                        }
                        break;
                    case 'email':
                        if (input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                        break;
                    case 'password':
                        if (inputElement.value !== null) {
                            let created = document.querySelector('.confirmPassword')
                            if (created == null) {
                                createConfirm(inputElement)
                            }
                        }
                        break;
                    case 'confirm':
                        if (inputElement.value !== input.value){
                            return 'Senha diferente'
                        }
                }
            }
        }
        return true
    },
    showError: (input, error) => {
        input.style.borderColor = '#eb220f';

        let divErrorNew = document.createElement('div');
        divErrorNew.classList.add('error');
        setTimeout(() => {
            divErrorNew.style.opacity = 1
        }, 100)

        let pNew = document.createElement('p');
        pNew.classList.add('error-shadow');

        pNew.innerHTML = error

        input.parentElement.insertBefore(divErrorNew, input.ElementSibiling);

        let divErroEl = document.querySelectorAll(`.error`)
        for (let i = 0; i < divErroEl.length; i++) {
            divErroEl[i].appendChild(pNew)
        }
    },
    showErrorPassword: (input, error) => {
        input.style.borderColor = '#eb220f';

        let divErrorNew = document.createElement('div');
        divErrorNew.classList.add('error');
        setTimeout(() => {
            divErrorNew.style.opacity = 1
        }, 100)

        let pNew = document.createElement('p');
        pNew.classList.add('error-shadow');

        pNew.innerHTML = error

        lastLabel.appendChild(divErrorNew);

        lastLabel.querySelector('.error').appendChild(pNew)
    },
    clearError: () => {
        let inputs = form.querySelectorAll('input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorEl = document.querySelectorAll('.error');
        for (let i = 0; i < errorEl.length; i++) {
            errorEl[i].remove();
        }
    },
    clearPassword: (element) => {
        element.style = '';

        let divErrorEl = lastLabel.querySelector('div p')
        console.log(divErrorEl)
        if (divErrorEl !== null) {
            divErrorEl.remove();
        }
    }

}

function createConfirm(element) {
    let labelPassword = document.querySelector('.models').cloneNode(true)
    labelPassword.querySelector('input').classList.add('confirmPassword')
    lastLabel.insertAdjacentElement('afterend', labelPassword);
}

let form = document.querySelector('.validatorForm');
form.addEventListener('submit', validator.handleSubmit)