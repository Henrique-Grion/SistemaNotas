<?php

namespace App\Models;

use CodeIgniter\Model;

class NotaModel extends Model
{

    protected $table = "notas";
    protected $primaryKey = "id";
    protected $allowedFields = ["titulo", "conteudo", "dataHora", "destaque"];

    public function getNota($id = null)
    {
        if ($id) {
            return $this->where('id', $id)->orderBy('destaque', 'DESC')->find();
        } else {
            return $this->orderBy('destaque', 'DESC')
                ->findAll();
        }
    }
}
