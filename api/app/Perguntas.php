<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Perguntas extends Model
{
    protected $fillable = ['texto_pergunta', 'enquete_id', 'votos'];

    public function enquete(){
        return $this->belongsTo(Enquete::class);
    }

    public function respostas(){
        return $this->hasMany(Respostas::class, 'pergunta_id');
    }
}
