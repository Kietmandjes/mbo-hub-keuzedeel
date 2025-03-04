<?php


use App\Http\Controllers\skillsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\ProjectController;
use App\Http\Controllers\projectsController;
use Illuminate\Auth\Events\Login;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;

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

// Route::match(['get', 'post'], '/home', function (Request $request) {
//     // Your logic here
//     return ['Laravel' => app()->version(),$request->all()]; 
// });

Route::get("/projects", [projectsController::class, "index"]);
Route::get("/projects/{id}", [projectsController::class, "index"]);
Route::post("/projects", [projectsController::class, "create"]);
Route::put("/projects/{id}", [projectsController::class, "edit"]);
Route::delete("/projects/{id}", [projectsController::class, "delete"]);

Route::get("/skills", [skillsController::class, "index"]);
Route::post("/skills", [skillsController::class, "create"]);
Route::put("/skills/{id}", [skillsController::class, "edit"]);
Route::delete("/skills/{id}", [skillsController::class, "delete"]);

Route::post("/users", [UserController::class, "users"]);

