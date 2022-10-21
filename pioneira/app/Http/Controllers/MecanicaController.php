<?php

namespace App\Http\Controllers;

use App\Models\Mecanica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MecanicaController extends Controller
{
    public function showMecanica()
    {
        return Mecanica::orderBy('qtd', 'DESC')->with('mecanicaEvento')->orderBy('nome', 'DESC')->get();
    }

    public function showListaMecanica()
    {
        return Mecanica::orderBy('nome', 'ASC')->get();
    }

    public function createMecanica(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required',
            'cidade' => 'required',
        ], [
            'required' => 'O campo :attribute é obrigatório',
        ]);

        if ($validator->fails()) {
            return $this->message($validator->errors(), 400);
        }

        $mecanica = new Mecanica($request->all());
        $mecanica->save();
        return $this->message('Mecânica criada com sucesso.', 200);
    }
    
    public function removeMecanica($id)
    {
        $mecanica = Mecanica::where([
            'id' => $id,
        ])->first();
        
        $mecanica->delete();
        return $this->message('Mecânica removida com sucesso.', 200);
    }

    public function message($m, $c)
    {
        return response()->json([
            'mensagem' => $m
        ], $c);
    }
}
