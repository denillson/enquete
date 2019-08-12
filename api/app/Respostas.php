<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Respostas extends Model
{
    protected $fillable = ['valor_resposta','pergunta_id'];

    public function pergunta(){
        return $this->belongsTo(Pergunta::class);
    }
}
