let CaioHValidator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;
        let input;

        let inputs = form.querySelectorAll('input');
        CaioHValidator.clearErrors(input);

        for(let i = 0; i < inputs.length; i++) {
            input = inputs[i];
            let check = CaioHValidator.checkInput(input);
            if(check !== true) {
                send = false;
                CaioHValidator.showError(input, check);
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');
            for(let i in rules) {
                let ruleDetails = rules[i].split('=');

                switch(ruleDetails[0]) {
                    case 'required':
                        if(input.value === '') {
                            return 'Este campo é obrigatório';
                        }
                    break;
                    case 'min':
                        if(input.value.length < ruleDetails[1]) {
                            return `Campo deve ter pelo menos ${ruleDetails[1]} caracteres.`
                        }
                    break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
                            if(!regex.test(input.value.toLowerCase())){
                                return 'E-mail digitado não é válido'
                            }
                        }
                    break;
                }
            }
        }

        return true;
    },
    showError: (input, erro) => {
        input.style.border = 'solid 1px red';

        let inputParent = input.parentElement;
        console.log(inputParent);
        let divElement = document.createElement('div');
        divElement.innerText = erro;
        divElement.classList.add('error');

        inputParent.append(divElement);
    },
    clearErrors: () => {
        let inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.style = '';
        })

        let errorElements = document.querySelectorAll('div');

        errorElements.forEach(errorElement => {
            if(errorElement.classList.contains('error')){
                errorElement.remove();
            }
        })
    }
};

let form = document.querySelector('.caiohvalidator');
form.addEventListener('submit', CaioHValidator.handleSubmit);