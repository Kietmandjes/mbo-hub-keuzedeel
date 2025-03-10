<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\ProjectController;
use App\Http\Controllers\projectsController;
use Illuminate\Auth\Events\Login;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

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


Route::post("/projects", [projectsController::class, "index"]);
Route::post("/projects/{id}", [projectsController::class, "index"]);
Route::post("/makeProject", [projectsController::class, "create"]);
Route::put("/projects/{id}", [projectsController::class, "edit"]);
Route::delete("/projects/{id}", [projectsController::class, "delete"]);


Route::post("/admin", [AdminController::class, "index"]);

