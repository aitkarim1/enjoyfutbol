<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class userController extends Controller
{
    public function register(Request $r) {
        $user = User::create([
            "name" => $r->input("name"),
            "email" => $r->input("email"),
            "password" => Hash::make($r->input("password"))
        ]);

        return response()->json([
            'user' => $user,
        ]);
    }

    public function login(Request $request) {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['msg' => 'Credenciales incorrectas'], 401);
        }
    
        $user = $request->user();
        $token = $user->createToken('token')->plainTextToken;
        $cookie = cookie('jwt', $token, 60 * 24); // Crear una cookie con el token
    
        return response()->json([
            'user' => $user,
        ])->withCookie($cookie);
    }
    

    public function user() {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'error' => 'Usuario no autenticado'
            ], 401);
        }

        return response()->json([
            'user' => $user,
        ]);
    }

    public function logout() {
        $cookie = Cookie::forget("jwt");

        return response()->json([
            "msg" => "Se ha cerrado la sesion"
        ])->withCookie($cookie);
    }
}