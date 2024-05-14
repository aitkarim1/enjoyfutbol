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
        return response()->json(['user' => $user])->withCookie($cookie);
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

    public function logout() {
        $cookie = Cookie::forget("jwt");

        return response()->json([
            "msg" => "Se ha cerrado la sesion"
        ])->withCookie($cookie);
    }
}
