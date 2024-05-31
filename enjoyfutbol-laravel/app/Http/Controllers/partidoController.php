<?php

namespace App\Http\Controllers;

use App\Models\Campo;
use App\Models\Partido;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class partidoController extends Controller
{
    public function addPartido(Request $request)
    {
        // Obtener los datos del campo por su ID
        $campo = Campo::find($request->campo);

        // Verificar si el campo existe
        if (!$campo) {
            return response()->json(['error' => 'Campo no encontrado'], 404);
        }

        // Calcular la duración en minutos
        $horaEmpezar = Carbon::parse($request->horaEmpezar);
        $horaTerminar = Carbon::parse($request->horaTerminar);
        $duracion = $horaTerminar->diffInMinutes($horaEmpezar);

        // Crear un nuevo partido
        $partido = Partido::create([
            'campo_id' => $request->campo,
            'ciudad' => $request->ciudad,
            'descripcion' => $request->descripcion ?? 'Partido de futbol',
            'tipo' => $request->tipo,
            'fecha' => $request->fecha,
            'horaEmpezar' => $request->horaEmpezar,
            'horaTerminar' => $request->horaTerminar,
            'coste' => $request->coste,
            'duracion' => $duracion,
            'estado' => $request->estado,
        ]);

        // Devolver una respuesta con el partido creado
        return response()->json($partido, 201);
    }

    public function getPartidos()
    {
        // Obtener todos los partidos
        $partidos = Partido::all();

        // Devolver una respuesta con todos los partidos
        return response()->json($partidos);
    }

    public function getPartidoById(Request $request)
    {
        // Buscar el partido por su ID
        $partido = Partido::with('users')->find($request->id);

        // Verificar si el partido existe
        if (!$partido) {
            return response()->json(['error' => 'Partido no encontrado'], 404);
        }

        // Devolver una respuesta de éxito con los datos del partido
        return response()->json($partido);
    }

    public function cancelarPartido(Request $request)
    {
        // Buscar el partido por su ID
        $partido = Partido::find($request->id);

        // Verificar si el partido existe
        if (!$partido) {
            return response()->json(['error' => 'Partido no encontrado'], 404);
        }

        // Cancelar el partido
        $partido->delete();

        // Devolver una respuesta de éxito
        return response()->json(['message' => 'Partido cancelado con éxito']);
    }

    public function modificarPartido(Request $request)
    {
        // Buscar el partido por su ID
        $partido = Partido::find($request->partido_id);

        // Verificar si el partido existe
        if (!$partido) {
            return response()->json(['error' => 'Partido no encontrado'], 404);
        }

        // Calcular la duración en minutos
        $horaEmpezar = Carbon::parse($request->horaEmpezar);
        $horaTerminar = Carbon::parse($request->horaTerminar);
        $duracion = $horaTerminar->diffInMinutes($horaEmpezar);

        // Actualizar los datos del partido
        $partido->campo_id = $request->campo_id;
        $partido->descripcion = $request->descripcion;
        $partido->tipo = $request->tipo;
        $partido->fecha = $request->fecha;
        $partido->horaEmpezar = $request->horaEmpezar;
        $partido->horaTerminar = $request->horaTerminar;
        $partido->coste = $request->coste;
        $partido->duracion = $duracion;
        $partido->save();

        // Devolver una respuesta con el partido actualizado
        return response()->json($partido);
    }

    public function buscarPartido(Request $request)
    {
        $ciudad = $request->input('ciudad');
        $fecha = $request->input('fecha');

        // Consulta para buscar partidos con la ciudad especificada en el campo y la fecha especificada
        $partidos = Partido::whereHas('campo', function ($query) use ($ciudad) {
            $query->where('ciudad', $ciudad);
        })->whereDate('fecha', $fecha)->get();

        // Devolver los partidos encontrados
        return response()->json($partidos);
    }

    public function añadirUsuarioAPartido(Request $request)
    {
        $user = User::find($request->user_id);
        $partido = Partido::find($request->partido_id);

        if (!$user || !$partido) {
            return response()->json(['message' => 'Usuario o partido no encontrado'], 404);
        }

        if ($partido->users()->where('user_id', $request->user_id)->exists()) {
            return response()->json(['message' => 'El usuario ya está registrado en el partido'], 409);
        }

        // Actualizar el sueldo del usuario
        $user->sueldo -= $request->coste;
        $user->save();

        $partido->users()->attach($user);

        return response()->json(['message' => 'Usuario añadido al partido exitosamente']);
    }

    public function getUsuariosPorPartido(Request $request)
    {
        // Buscar el partido por su ID
        $partido = Partido::find($request->partido_id);

        // Verificar si el partido existe
        if (!$partido) {
            return response()->json(['message' => 'Partido no encontrado'], 404);
        }

        // Obtener los usuarios asociados al partido
        $usuarios = $partido->users;

        // Devolver la lista de usuarios
        return response()->json($usuarios);
    }

    public function abandonarPartido(Request $request)
    {
        $userId = $request->input('user_id');
        $partidoId = $request->input('partido_id');

        // Buscar el usuario y el partido
        $user = User::find($userId);
        $partido = Partido::find($partidoId);

        if (!$user || !$partido) {
            return response()->json(['message' => 'Usuario o partido no encontrado'], 404);
        }

        // Verificar si el usuario está inscrito en el partido
        if (!$partido->users()->where('user_id', $userId)->exists()) {
            return response()->json(['message' => 'El usuario no está registrado en el partido'], 409);
        }

        // Calcular la diferencia de tiempo entre la fecha y hora de inicio del partido y la hora actual
        $fechaHoraEmpezar = Carbon::parse($partido->fecha . ' ' . $partido->horaEmpezar); // Combinar fecha y hora de inicio
        $now = Carbon::now();
        $diffInHours = $now->diffInHours($fechaHoraEmpezar);
        info("Diferencia en horas: $diffInHours");

        // Si quedan más de 17 horas, devolver el coste al usuario
        if ($diffInHours > 17) {
            info("Más de 17 horas antes del partido. Actualizando sueldo del usuario.");
            $user->sueldo += $partido->coste;
            $user->save(); // Guardar el usuario para actualizar el sueldo en la base de datos
        } else {
            info("Menos de 17 horas antes del partido. No se actualiza el sueldo del usuario.");
        }

        // Eliminar al usuario del partido
        $partido->users()->detach($userId);

        return response()->json(['message' => 'Usuario ha abandonado el partido exitosamente']);
    }
}
