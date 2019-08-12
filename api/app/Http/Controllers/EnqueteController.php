<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Enquete;

class EnqueteController extends Controller
{
    public function index(){
        
        $result = Enquete::all();
        return response()->json($result,200);

    }
    
    public function show($id){

        $result = Enquete::find($id);
        return response()->json($result,200);

    }

    public function store(Request $request){

        $input = $request->only(['nome','data_inicio','data_fim']);
        $enquete = Enquete::create($input);

        return response()->json($enquete,201);

    }

    public function update(Request $request, $id){

        $enquete = Enquete::find($id);
        $enquete->update($request->all());

        return response()->json($enquete,200);
    }

    public function updateStatus(Request $request, $id){

        $enquete = Enquete::find($id);
        $enquete->update($request->all());

        return response()->json($enquete,200);
    }

    public function delete($id){
        
        $enquete = Enquete::find($id);
        $enquete->delete();

        return response()->json(["message" => "Deletado com sucesso"],204);
    }
}
