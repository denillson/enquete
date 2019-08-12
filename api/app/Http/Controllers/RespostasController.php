<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Respostas;

class RespostasController extends Controller
{

    public function store(Request $request){

        $input = $request->all();
        $resposta = Respostas::create($input);

        return response()->json($resposta, 200);
    }

    public function update(Request $request, $id){

        $input = $request->all();
        $resposta = Respostas::find($id);
        $resposta->update($input);

        return response()->json($resposta, 200);

    }

    public function delete($id){

        $resposta = Respostas::find($id);
        $resposta->delete();

        return response()->json(["message" => "Deletado com sucesso"], 200);
    }
}
