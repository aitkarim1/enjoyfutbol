<?php

use App\Http\Controllers\campoController;
use App\Http\Controllers\partidoController;
use App\Http\Controllers\userController;
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

Route::get("/user", [userController::class, "user"]);
Route::post("/register", [userController::class, "register"]);
Route::post("/login", [userController::class, "login"]);
Route::post("/logout", [userController::class, "logout"]);
Route::get("/get-usuarios", [userController::class, "getUsuarios"]);
Route::get("/ver-usuario", [userController::class, "verUsuario"]);
Route::get("/modificar-usuario", [userController::class, "modificarUsuario"]);
Route::get("/eleminar-usuario", [userController::class, "eliminarUsuario"]);

Route::post("/add-partido", [partidoController::class, "addPartido"]);
Route::get("/get-partidos", [partidoController::class, "getPartidos"]);
Route::put("/modificar-partido", [partidoController::class, "modificarPartido"]);
Route::post("/eleminar-partido", [partidoController::class, "cancelarPartido"]);
Route::post("/buscar-partidos", [partidoController::class, "buscarPartido"]);

Route::post("/add-campo", [campoController::class, "addCampo"]);
Route::get("/get-campos", [campoController::class, "getCampos"]);
Route::put("/modificar-campo", [campoController::class, "modificarCampo"]);
