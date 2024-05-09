
const divNoticia = document.getElementById("divNoticias");
const divCriar = document.getElementById("divCriar");
const formCriar = document.getElementById('formCriar');
const botaoCancelar = document.getElementById('botaoCancelar');
const titulo = document.getElementById("titulo");
const conteudo = document.getElementById("conteudo");
const destaque = document.getElementById("destaque");

formCriar.addEventListener('submit', function (e) {
    e.preventDefault();
    const titulo = document.getElementById("titulo");
    const conteudo = document.getElementById("conteudo");
    const divNoticias = document.getElementById('divNoticias');

    try {
        if (titulo == '' || conteudo == '') {
            throw new Error("Os campos 'Titulo' e 'Conteudo' são obrigatórios!");
        }

        fetch("/projeto4/public/adicionar", {
            method: 'POST',
            body: new FormData(formCriar),
        }).then(function (response) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function (json) {
                    if (json.success)
                    {
                        const div = document.createElement('div');
                        div.id = json.id;
                        div.classList.add('container');
                        div.style.border = '2px solid darkgreen';
                        div.style.marginBottom = '10px';
                        div.style.paddingBottom = '5px';
                        div.style.borderRadius = '10px';
                        div.style.backgroundColor = destaque.checked ? 'yellow' : 'lightgreen';

                        div.innerHTML = `
                            <div id="divVisualizar${json.id}" style="display: block;">
                                <h1 id="titulo${json.id}">${titulo.value}</h1>
                                <p id="conteudo${json.id}">${conteudo.value}</p>
                            </div>
                            
                            <form id="formEditar${json.id}" style="display: none; padding-bottom: 5px;">
                                <label class="form-label" for="titulo">Titulo:</label>
                                <input type="text" class="form-control" id="editarTitulo${json.id}" name="titulo">
                
                                <label style="margin-top:20px;" class="form-label" for="conteudo">Conteudo:</label>
                                <textarea class="form-control" id="editarConteudo${json.id}" name="conteudo" cols="50" rows="10" style="resize: none;" placeholder="Conteudo..."></textarea>
                                <br>
                
                                <label class="form-check-label" for="destaque">Destaque</label>
                                <input class="form-check-input" type="checkbox" id="editarDestaque${json.id}" name="destaque">
                                <br><br>
                
                                <button type="button" class="btn btn-primary" id="botaoEditar${json.id}">Salvar</button>
                                <button type="button" class="btn btn-secondary" id="botaoCancelar${json.id}">Cancelar</button>
                            </form>
                
                            <a class="btn btn-warning" onclick="editarNota(${json.id})">Editar</a>
                            <a class="btn btn-danger" onclick="excluirNota(${json.id})">Excluir</a>
                        `;

                        divNoticias.appendChild(div);

                        titulo.value = '';
                        conteudo.value = '';
                        destaque.checked = false;
                        divCriar.style.display = 'none';
                    }
                });
            }
        });
    } catch (Erro) {
        alert(Erro);
    }
});

botaoCancelar.addEventListener('click', function () {
    titulo.value = '';
    conteudo.value = '';
    destaque.checked = false;
    divCriar.style.display = "none";
});

function criarNota() {
    divCriar.style.display = "block";
}

function editarNota(id) {
    const divNota = document.getElementById(id);
    const divVisualizar = document.getElementById(`divVisualizar${id}`);
    const formEditar = document.getElementById(`formEditar${id}`);
    const visualizarTitulo = document.getElementById(`titulo${id}`);
    const visualizarConteudo = document.getElementById(`conteudo${id}`);
    const editarTitulo = document.getElementById(`editarTitulo${id}`);
    const editarConteudo = document.getElementById(`editarConteudo${id}`);
    const editarDestaque = document.getElementById(`editarDestaque${id}`);
    const botaoSalvar = document.getElementById(`botaoEditar${id}`);
    const botaoCancelar = document.getElementById(`botaoCancelar${id}`);

    editarTitulo.value = visualizarTitulo.innerText;
    editarConteudo.value = visualizarConteudo.innerText;
    editarDestaque.checked = divNota.style.backgroundColor === 'yellow';

    botaoCancelar.onclick = function () {
        divVisualizar.style.display = 'block';
        formEditar.style.display = 'none';
    };

    botaoSalvar.onclick = function () {
        fetch(`/projeto4/public/adicionar/${id}`, {
            method: 'POST',
            body: new FormData(formEditar),
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(function (response) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function (json) {
                    if (json.success)
                    {
                        visualizarTitulo.innerText = editarTitulo.value;
                        visualizarConteudo.innerHTML = editarConteudo.value;
                        divNota.style.backgroundColor = editarDestaque.checked ? 'yellow' : 'lightgreen';
                        divVisualizar.style.display = 'block';
                        formEditar.style.display = 'none';
                    }
                });
            }
        });
    };

    divVisualizar.style.display = 'none';
    formEditar.style.display = 'block';
}

function excluirNota(id) {
    if (confirm('Deseja mesmo excluir essa nota?'))
    {
        fetch(`excluir/${id}`, {
            method: 'POST',
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(response => {
                if (!response.ok) {
                    throw new Error("erro ao excluir nota!");
                }
            })
            .then(() => {
                document.getElementById(`${id}`).remove();
            })
            .catch(error => {
                console.error('Erro:', error);
            })
    }
}
