<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Enquete extends Model
{
    protected $fillable = ['nome','data_inicio','data_fim','status'];

    public function perguntas(){
        return $this->hasMany(Perguntas::class, 'enquete_id');
    }
}
