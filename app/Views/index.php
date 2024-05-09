<div class="container">
    <a style="margin: 10px 10px;" class="btn btn-primary" onclick="criarNota()">Criar +</a>
</div>

<div id="divCriar" class="container" style="display:none;">
    <form id="formCriar">
        <div style="margin:auto; margin-top: 10px; margin-bottom: 10px; width: 500px;">
            <label class="form-label" for="titulo">Titulo:</label>
            <input type="text" class="form-control" id="titulo" name="titulo" value="">

            <label style="margin-top:20px;" class="form-label" for="conteudo">Conteudo:</label>
            <textarea class="form-control" name="conteudo" id="conteudo" cols="50" rows="10" style="resize:none;" placeholder="Conteudo..."></textarea>
            <br>

            <label class="form-check-label" for="destaque">Destaque</label>
            <input class="form-check-input" type="checkbox" id="destaque" name="destaque">
            <br><br>

            <button class="btn btn-primary" id="botaoAdicionar">Adicionar</button>
            <button type="button" class="btn btn-secondary" id="botaoCancelar">Cancelar</button>
        </div>
    </form>
</div>

<div id="divNoticias" class="container">
    <?php foreach ($nota as $notas) : ?>
        <div id="<?= $notas['id'] ?>" class="container" style="border: 2px solid darkgreen; margin-bottom:10px; padding-bottom: 5px; border-radius:10px;
    <?php if ($notas['destaque']) {
            echo 'background-color: yellow;';
        } else {
            echo 'background-color: lightgreen;';
        } ?>">
            <div id="divVisualizar<?= $notas['id'] ?>">
                <h1 id="titulo<?= $notas['id'] ?>"><?= $notas['titulo'] ?></h1>
                <p id="conteudo<?= $notas['id'] ?>"><?= $notas['conteudo'] ?></p>
            </div>
            
            <form id="formEditar<?= $notas['id'] ?>" style="display: none; padding-bottom: 5px;">
                <label class="form-label" for="titulo">Titulo:</label>
                <input type="text" class="form-control" id="editarTitulo<?= $notas['id'] ?>" name="titulo">

                <label style="margin-top:20px;" class="form-label" for="conteudo">Conteudo:</label>
                <textarea class="form-control" id="editarConteudo<?= $notas['id'] ?>" name="conteudo" cols="50" rows="10" style="resize: none;" placeholder="Conteudo..."></textarea>
                <br>

                <label class="form-check-label" for="destaque">Destaque</label>
                <input class="form-check-input" type="checkbox" id="editarDestaque<?= $notas['id'] ?>" name="destaque">
                <br><br>

                <button type="button" class="btn btn-primary" id="botaoEditar<?= $notas['id'] ?>">Salvar</button>
                <button type="button" class="btn btn-secondary" id="botaoCancelar<?= $notas['id'] ?>">Cancelar</button>
            </form>

            <a class="btn btn-warning" onclick="editarNota(<?= $notas['id'] ?>)">Editar</a>
            <a class="btn btn-danger" onclick="excluirNota(<?= $notas['id'] ?>)">Excluir</a>
        </div>
    <?php endforeach; ?>
</div>
