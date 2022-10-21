<?php

namespace App\Http\Controllers;

use App\Models\Mecanica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function createVeiculoEmpresa(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'placa' => 'required',
            'modelo' => 'required',
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


    public function message($m, $c)
    {
        return response()->json([
            'mensagem' => $m
        ], $c);
    }
}
