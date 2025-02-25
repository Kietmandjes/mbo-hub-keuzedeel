<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use Illuminate\Auth\Events\Login;
use App\Http\Controllers\LoginController;

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

Route::post('/login',[LoginController::class,'login']);
Route::post('/register',[LoginController::class,'register']);

Route::match(['get', 'post'], '/user', function (Request $request) {
    // Your logic here
    return ['Laravel' => app()->version(),$request->all()]; 
});
Route::post("/home", [ProjectController::class, "index"]);
