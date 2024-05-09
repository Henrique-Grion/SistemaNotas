<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\NotaModel;
use CodeIgniter\I18n\Time;

class Notas extends BaseController
{

    public function index()
    {
        $model = new NotaModel();
        $data = [
            'title' => "Sistema de anotação",
            'nota'  => $model->getNota()
        ];
        echo view('templates/headerHtml', $data);
        echo view('index');
        echo view('templates/footerHtml');
    }

    public function adicionar($id = null)
    {
        $model = new NotaModel();

        $titulo = $this->request->getVar("titulo");
        $conteudo = $this->request->getVar("conteudo");
        $destaque = $this->request->getVar("destaque");

        if ($destaque === "on") {
            $destaque = true;
        } else {
            $destaque = false;
        }

        if ($id == null) {
            $model->save([
                'titulo'    => $titulo,
                'conteudo'  => $conteudo,
                'dataHora'  => Time::now(),
                'destaque'  => $destaque
            ]);

            $id = $model->insertID();
        } else {
            $model->save([
                'id'        => $id,
                'titulo'    => $titulo,
                'conteudo'  => $conteudo,
                'dataHora'  => Time::now(),
                'destaque'  => $destaque
            ]);
        }

        return $this->response->setJSON([
            'success' => true,
            'id' => $id,
        ]);
    }

    public function excluir($id = null)
    {
        $model = new NotaModel();

        $model->where('id', $id)->delete();

        return $this->response->setJSON([
            'success' => true,
        ]);
    }
}
