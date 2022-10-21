<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Área de evento
Route::post('create-evento', [\App\Http\Controllers\EventoController::class, 'createEvento']);
Route::get('show-evento', [\App\Http\Controllers\EventoController::class, 'showAllEvento']);
Route::delete('remove-veiculo-evento/{id}', [\App\Http\Controllers\EventoController::class, 'removeVeiculoEvento']);
Route::put('finalizar-evento/{id}', [\App\Http\Controllers\EventoController::class, 'finalizarEvento']);

// Área de Direcionamento
Route::post('create-orcamento', [\App\Http\Controllers\DirecionamentoController::class, 'createOrcamento']);
Route::get('show-direcionamento', [\App\Http\Controllers\DirecionamentoController::class, 'showAllDirecionamento']);
Route::get('show-direcionamento/{id}', [\App\Http\Controllers\DirecionamentoController::class, 'showDirecionamentoById']);

// Área de Orçamento
Route::post('create-orcamento-observacao', [\App\Http\Controllers\OrcamentoController::class, 'createOrcamentoObservacao']);
Route::post('create-cotacao', [\App\Http\Controllers\OrcamentoController::class, 'createCotacao']);
Route::get('show-orcamento', [\App\Http\Controllers\OrcamentoController::class, 'showAllOrcamento']);
Route::get('show-orcamento/{id}', [\App\Http\Controllers\OrcamentoController::class, 'showOrcamentoById']);

// Área de Cotação
Route::post('create-cotacao-observacao', [\App\Http\Controllers\CotacaoController::class, 'createCotacaoObservacao']);
Route::post('create-recebimento', [\App\Http\Controllers\CotacaoController::class, 'createRecebimento']);
Route::get('show-cotacao', [\App\Http\Controllers\CotacaoController::class, 'showAllCotacao']);
Route::get('show-cotacao/{id}', [\App\Http\Controllers\CotacaoController::class, 'showCotacaoById']);

// Área de Recebimento
Route::post('create-recebimento-observacao', [\App\Http\Controllers\RecebimentoController::class, 'createRecebimentoObservacao']);
Route::post('create-reparo', [\App\Http\Controllers\RecebimentoController::class, 'createReparo']);
Route::get('show-recebimento', [\App\Http\Controllers\RecebimentoController::class, 'showAllRecebimento']);
Route::get('show-recebimento/{id}', [\App\Http\Controllers\RecebimentoController::class, 'showRecebimentoById']);

// Área de Reparo
Route::post('create-reparo-complemento', [\App\Http\Controllers\ReparoController::class, 'createReparoComplemento']);
Route::post('create-reparo-observacao', [\App\Http\Controllers\ReparoController::class, 'createReparoObservacao']);
Route::post('finalizar-reparo', [\App\Http\Controllers\ReparoController::class, 'finalizarReparo']);
Route::get('show-reparo', [\App\Http\Controllers\ReparoController::class, 'showAllReparo']);
Route::get('show-reparo/{id}', [\App\Http\Controllers\ReparoController::class, 'showReparoById']);

// Área de Relatorio
Route::post('show-evento-form', [\App\Http\Controllers\EventoController::class, 'showEventoByForm']);
Route::get('show-evento/{id}', [\App\Http\Controllers\EventoController::class, 'showEventoById']);
Route::get('change-evento-date/{id}', [\App\Http\Controllers\EventoController::class, 'changeEventoDate']);
Route::post('create-retorno', [\App\Http\Controllers\EventoController::class, 'createRetorno']);
Route::get('show-retorno/{id}', [\App\Http\Controllers\EventoController::class, 'showRetornoById']);

// Mecanica
Route::get('show-mecanica', [\App\Http\Controllers\MecanicaController::class, 'showMecanica']);
Route::get('show-lista-mecanica', [\App\Http\Controllers\MecanicaController::class, 'showListaMecanica']);
Route::post('create-mecanica', [\App\Http\Controllers\MecanicaController::class, 'createMecanica']);
Route::delete('remove-mecanica/{id}', [\App\Http\Controllers\MecanicaController::class, 'removeMecanica']);

// Área de Veículo assistencial
Route::post('alugar-veiculo', [\App\Http\Controllers\AssistencialController::class, 'alugarVeiculo']);
Route::get('show-veiculo-assistencial', [\App\Http\Controllers\AssistencialController::class, 'showVeiculoAssistencial']);
Route::get('show-veiculo-empresa', [\App\Http\Controllers\AssistencialController::class, 'showVeiculoEmpresa']);
Route::get('show-veiculo-empresa/{id}', [\App\Http\Controllers\AssistencialController::class, 'showVeiculoEmpresaById']);
Route::delete('remove-alugar/{id}', [\App\Http\Controllers\AssistencialController::class, 'removeAlugar']);

// Área de Observações
Route::get('show-orcamento-observacao/{id}', [\App\Http\Controllers\ObservacaoController::class, 'showOrcamentoObservacao']);
Route::get('show-cotacao-observacao/{id}', [\App\Http\Controllers\ObservacaoController::class, 'showCotacaoObservacao']);
Route::get('show-recebimento-observacao/{id}', [\App\Http\Controllers\ObservacaoController::class, 'showRecebimentoObservacao']);
Route::get('show-reparo-observacao/{id}', [\App\Http\Controllers\ObservacaoController::class, 'showReparoObservacao']);
Route::get('show-reparo-complemento/{id}', [\App\Http\Controllers\ObservacaoController::class, 'showReparoComplemento']);

// Área de cadastro de Mecânicas e Veículos da empresa
Route::post('create-veiculo-empresa', [\App\Http\Controllers\PostController::class, 'createVeiculoEmpresa']);
