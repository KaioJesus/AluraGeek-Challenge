const init = () => {
    const span = document.getElementById('span__erro');
    const validateEmail = (event) => {
        const input = event.currentTarget;
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailTest = regex.test(input.value);

        if(!emailTest) {
            submitButton.setAttribute("disabled", "disabled");
            input.nextElementSibling.classList.add('error');
            span.textContent = `Seu email precisa estar no padrão texto@texto.com`;

        } else {
            submitButton.removeAttribute("disabled");
            input.nextElementSibling.classList.remove('error');
            span.textContent = ``;
        }
    }

    const validatePassowrd = (event) => {
        const input = event.currentTarget;

        if(input.value.length < 8) {
            submitButton.setAttribute("disabled", "disabled");
        } 
        submitButton.removeAttribute("disabled");
    }
    
    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('.botao__entrar');
    const spanSubmit = document.querySelector("#span__erro-submit");

    inputEmail.addEventListener('input', validateEmail);
    inputPassword.addEventListener('input', validatePassowrd);

    const errorHandler = () => {
        spanSubmit.classList.add('error');
        spanSubmit.textContent = `Usuário ou senha inválida`;
    }

    const successHandler = () => {
        spanSubmit.classList.remove('error');
        spanSubmit.textContent = ``;
        window.location.href="../pages/administrador.html";
    }

    if(submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })
            }).then((response) => {
                if (response.status !== 200) {
                    return errorHandler();
                }
                
                successHandler();
            
            }).catch(() => {
                errorHandler();
            })
        })
    }
}

window.onload = init;