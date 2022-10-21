<?php

namespace App\Http\Controllers;

use App\Models\Veiculo_assistencial;
use App\Models\Veiculo_empresa;
use Illuminate\Http\Request;

class AssistencialController extends Controller
{
    public function alugarVeiculo(Request $request){
        $veiculo = new Veiculo_assistencial($request->all());
        $veiculo->save();
        $veiculo->update([
            'cor' => $this->randomColor()
        ]);
        $veiculo->save();

        $empresa = Veiculo_empresa::where([
            'id' => $request->get('veiculo_empresa_id')
        ])->first();
        $empresa->update([
            'ativo' => 1
        ]);
        $empresa->save();

        return $this->message('Lembrete gerado com sucesso', 200);
    }

    public function showVeiculoAssistencial(){
        return Veiculo_assistencial::with('veiculoAssistencialVeiculoEmpresa')->get();
    }

    public function showVeiculoEmpresa(){
        return Veiculo_empresa::all();
    }

    public function showVeiculoEmpresaById($id){
        return Veiculo_empresa::where([
            'id' => $id
        ])->first();
    }

    public function removeAlugar($id){
        $veiculo = Veiculo_assistencial::where([
            'id' => $id
        ])->first();

        $empresa = Veiculo_empresa::where([
            'id' => $veiculo->veiculo_empresa_id
        ])->first();
        $empresa->update([
            'ativo' => 0
        ]);
        $empresa->save();

        $veiculo->delete();
        return $this->message('Lembrete excluído com sucesso', 200);
    }

    public function message($m, $c)
    {
        return response()->json([
            'mensagem' => $m
        ], $c);
    }

    public function randomColor()
    {
        $str = '#';
        for ($i = 0; $i < 3; $i++) {
            $str .= dechex(rand(50, 200));
        }
        return $str;
    }
}
