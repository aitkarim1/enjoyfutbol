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
Route::post("/ver-usuario", [userController::class, "verUsuario"]);
Route::post("/modificar-usuario", [userController::class, "modificarUsuario"]);
Route::post("/eleminar-usuario", [userController::class, "eliminarUsuario"]);
Route::post("/editar-usuario", [userController::class, "editarUsuario"]);
Route::post("/buscar-usuario", [userController::class, "buscarUsuarios"]);

Route::post("/add-partido", [partidoController::class, "addPartido"]);
Route::get("/get-partidos", [partidoController::class, "getPartidos"]);
Route::post("/get-partido-by-id", [partidoController::class, "getPartidoById"]);
Route::post("/modificar-partido", [partidoController::class, "modificarPartido"]);
Route::post("/eleminar-partido", [partidoController::class, "cancelarPartido"]);
Route::post("/buscar-partidos", [partidoController::class, "buscarPartido"]);
Route::post("/añadir-usuario-partido", [partidoController::class, "añadirUsuarioAPartido"]);
Route::post("/get-usuarios-partido", [partidoController::class, "getUsuariosPorPartido"]);
Route::post("/abandonar-partido", [partidoController::class, "abandonarPartido"]);

Route::post("/add-campo", [campoController::class, "addCampo"]);
Route::get("/get-campos", [campoController::class, "getCampos"]);
Route::post("/get-campo-by-id", [campoController::class, "getCampoById"]);
Route::put("/modificar-campo", [campoController::class, "modificarCampo"]);
Route::post("/eleminar-campo", [campoController::class, "eliminarCampo"]);
