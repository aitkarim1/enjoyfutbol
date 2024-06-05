<?php

namespace App\Http\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function register(Request $r)
    {
        // Verificar si ya existe un usuario con el mismo correo electrónico
        $existingUser = User::where('email', $r->input('email'))->first();
        if ($existingUser) {
            return response()->json(['error' => 'Correo electrónico ya está en uso'], 409);
        }

        // Si no existe, crear un nuevo usuario
        $user = User::create([
            "name" => $r->input("name"),
            "email" => $r->input("email"),
            "password" => Hash::make($r->input("password"))
        ]);

        return response()->json(['user' => $user]);
    }

    public function login(Request $request)
    {
        $user = User::where("email", $request->input("email"))->first();
        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        if (!Hash::check($request->input("password"), $user->password)) {
            return response()->json(['error' => 'Contraseña incorrecta'], 401);
        }

        // Generar el token JWT
        $payload = [
            'sub' => $user->id,
            'email' => $user->email,
            'exp' => time() + (60 * 24) // Expira en 24 horas
        ];
        $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

        // Crear la cookie con el token JWT
        $cookie = cookie('jwt', $token, 60 * 24);

        // Devolver el usuario y establecer la cookie
        return response()->json(['user' => $user])->withCookie($cookie)
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }

    public function user(Request $request)
    {
        // Obtener el token JWT de la cookie
        $token = $request->cookie('jwt');

        // Verificar si el token está presente
        if (!$token) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        try {
            // Decodificar el token JWT
            $payload = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            // Obtener el ID del usuario del payload
            $userId = $payload->sub;

            // Buscar al usuario en la base de datos usando el ID del token
            $user = User::find($userId);

            // Verificar si se encontró al usuario
            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            // Devolver los detalles del usuario como respuesta
            return response()->json(['user' => $user]);
        } catch (\Exception $e) {
            // En caso de error al decodificar el token
            return response()->json(['error' => 'Token inválido'], 401);
        }
    }

    public function logout()
    {
        $cookie = Cookie::forget("jwt");

        return response()->json([
            "msg" => "Se ha cerrado la sesion"
        ])->withCookie($cookie);
    }

    public function getUsuarios()
    {
        // Obtener todos los usuarios
        $usuarios = User::all();

        // Verificar si se encontraron usuarios
        if ($usuarios->isEmpty()) {
            return response()->json(['error' => 'No se encontraron usuarios'], 404);
        }

        // Devolver los usuarios como respuesta
        return response()->json(['usuarios' => $usuarios]);
    }

    public function eliminarUsuario(Request $request)
    {
        info('ID del usuario recibido: ' . $request->input('user_id'));
        // Buscar al usuario por su ID
        $usuario = User::find($request->input('user_id'));

        // Verificar si el usuario existe
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // Eliminar al usuario
        $usuario->delete();

        // Devolver una respuesta de éxito
        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    public function verUsuario(Request $request)
    {
        // Buscar al usuario por su ID
        $usuario = User::find($request->input('user_id'));

        // Verificar si el usuario existe
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // Devolver los detalles del usuario como respuesta
        return response()->json(['usuario' => $usuario]);
    }

    public function modificarUsuarioAdmin(Request $request)
    {
        // Buscar al usuario por su ID
        $usuario = User::find($request->input('user_id'));

        // Verificar si el usuario existe
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // Modificar los campos del usuario según los datos proporcionados en la solicitud
        $usuario->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'sueldo' => $request->input('sueldo'),
            'genero' => $request->input('genero'),
            'fechaNacimiento' => $request->input('fechaNacimiento'),
            'numeroPartidos' => $request->input('numeroPartidos'),
            'nivel' => $request->input('nivel'),
            'role' => $request->input('role'),
        ]);

        // Devolver una respuesta de éxito
        return response()->json(['message' => 'Usuario modificado correctamente']);
    }

    public function editarUsuario(Request $request)
    {
        info('ID del usuario recibido: ' . $request->input('user_id'));
        // Buscar al usuario por su ID
        $usuario = User::find($request->input('user_id'));

        // Verificar si el usuario existe
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // Modificar los campos del usuario según los datos proporcionados en la solicitud
        $usuario->update([
            'genero' => $request->input('genero'),
            'fechaNacimiento' => $request->input('fechaNacimiento'),
            'nivel' => $request->input('nivel'),
        ]);

        // Devolver una respuesta de éxito
        return response()->json(['message' => 'Usuario modificado correctamente']);
    }

    public function buscarUsuarios(Request $request)
    {
        info('texto de busqueda: ' . $request->input('texto'));
        // Obtener el texto de búsqueda del input
        $textoBusqueda = $request->input('texto');

        // Buscar usuarios que coincidan con el texto de búsqueda en el nombre
        $usuarios = User::where('name', 'like', '%' . $textoBusqueda . '%')->get();

        // Devolver los usuarios encontrados
        return response()->json($usuarios);
    }
}
