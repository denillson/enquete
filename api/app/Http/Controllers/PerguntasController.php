<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Perguntas;

class PerguntasController extends Controller
{
    public function index($id){
        
        $result = Perguntas::with('respostas')->with('enquete')->where('enquete_id', $id)->get();
        return response()->json($result);
        
    }

    public function store(Request $request){

        $input = $request->all();
        $pergunta = Perguntas::create($input);

        return response()->json($pergunta,200);
    }
    
    public function show($id){

        $result = Perguntas::find($id);
        
        return response()->json($result,200);
    }

    public function update(Request $request, $id){

        $pergunta= Perguntas::find($id);
        $pergunta->update($request->all());

        return response()->json($pergunta,200);
    }

    public function delete($id){
        
        $pergunta = Perguntas::find($id);
        $pergunta->delete();

        return response()->json(["message" => "Deletado com sucesso"],204);
    }

    public function votos(Request $request, $id){
        $pergunta = Perguntas::find($id);
        $pergunta->increment("votos");
    }
}
