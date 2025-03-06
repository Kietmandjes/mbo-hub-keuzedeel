<?php


use App\Http\Controllers\categoriesController;
use App\Http\Controllers\eventsController;
use App\Http\Controllers\skillsController;
use App\Http\Controllers\typesController;
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

Route::get("/projects", [projectsController::class, "index"]);
Route::get("/projects/{id}", [projectsController::class, "index"]);
Route::post("/projects", [projectsController::class, "create"]);
Route::put("/projects/{id}", [projectsController::class, "edit"]);
Route::delete("/projects/{id}", [projectsController::class, "delete"]);

Route::get("/events", [eventsController::class, "index"]);
Route::get("/events/{id}", [eventsController::class, "index"]);
Route::post("/events", [eventsController::class, "create"]);
Route::put("/events/{id}", [eventsController::class, "edit"]);
Route::delete("/events/{id}", [eventsController::class, "delete"]);

Route::get("/skills", [skillsController::class, "index"]);
Route::post("/skills", [skillsController::class, "create"]);
Route::put("/skills/{id}", [skillsController::class, "edit"]);
Route::delete("/skills/{id}", [skillsController::class, "delete"]);

Route::get("/types", [typesController::class, "index"]);
Route::post("/types", [typesController::class, "create"]);
//Route::put("/types/{id}", [typesController::class, "edit"]); //! is denk niet nodig
Route::delete("/types/{id}", [typesController::class, "delete"]);

Route::get("/categories", [categoriesController::class, "index"]);
Route::post("/categories", [categoriesController::class, "create"]);
//Route::put("/categories/{id}", [categoriesController::class, "edit"]); //! is denk niet nodig
Route::delete("/categories/{id}", [categoriesController::class, "delete"]);

Route::post("/users", [UserController::class, "users"]);

