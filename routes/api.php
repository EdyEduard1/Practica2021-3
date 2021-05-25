<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BoardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::group(['middleware' => ['auth:sanctum']],function(){
 //   Route::get('/boards', [BoardController::class, 'boards'])->name('boards.all');
  //  Route::post('/board/add', [BoardController::class, 'addBoard'])->name('boards.add');
//Route::post('/board/update/{id}', [BoardController::class, 'updateBoard'])->name('boards.update');
//Route::post('/board/delete/{id}', [BoardController::class, 'deleteBoard'])->name('boards.delete');

//Route::get('/board/{id}', [BoardController::class, 'board'])->name('board.view');
//Route::post('/task/add', [BoardController::class, 'addTask'])->name('tasks.add');
//Route::post('/task/update/{id}', [BoardController::class, 'updateTask'])->name('tasks.update');
//Route::post('/task/delete/{id}', [BoardController::class, 'deleteTask'])->name('tasks.delete');
//});

//Route::group(['middleware' => ['web']], function () {
//Route::match(['get', 'post'], '/login', [AuthController::class, 'login'])->name('login');
//});