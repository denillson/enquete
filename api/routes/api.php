<?php

use Illuminate\Http\Request;

Route::prefix('v1')->group(function () {
    Route::post('/enquete','EnqueteController@store');
    Route::get('/enquetes','EnqueteController@index');
    Route::put('/enquete/{id}','EnqueteController@update');
    Route::delete('/enquete/{id}','EnqueteController@delete');

    Route::post('/pergunta','PerguntasController@store');
    Route::get('/perguntas/enquete/{id}','PerguntasController@index');
    Route::put('/perguntas/{id}','PerguntasController@update');
    Route::post('/pergunta/{id}/voto','PerguntasController@votos');
    Route::delete('/pergunta/{id}','PerguntasController@delete');

    Route::post('/resposta','RespostasController@store');
});
