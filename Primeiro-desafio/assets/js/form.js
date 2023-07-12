const inputsFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

inputsFormulario.forEach( (campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    //blur quando tira o foco do input
    campo.addEventListener("invalid", (e) => e.preventDefault());
})

const tiposDeErro = [
    'valueMissing', 
    'tooShort', 
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        tooShort: "Por favor, preencha um nome válido."
    },
    mensagem: {
        valueMissing: "O campo de mensagem não pode estar vazio.",
    },
};

function verificaCampo(campo){
    let mensagem = "";
    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if(!validadorDeInput){
        mensagemErro.textContent = mensagem;
    } else{
        mensagemErro.textContent = "";
    }
    console.log(campo.validity);
}