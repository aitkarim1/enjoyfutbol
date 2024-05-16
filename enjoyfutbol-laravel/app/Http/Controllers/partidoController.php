<?php

namespace App\Http\Controllers;

use App\Models\Campo;
use App\Models\Partido;
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

        // Crear un nuevo partido
        $partido = Partido::create([
            'campo_id' => $campo->id,
            'campo_nombre' => $campo->nombre,
            'campo_ubicacion' => $campo->ubicacion,
            'ciudad' => $request->ciudad,
            'jugadores' => $request->jugadores,
            'tipo' => $request->tipo,
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'duracion' => $request->duracion,
        ]);

        // Devolver una respuesta con el partido creado
        return response()->json(['partido' => $partido], 201);
    }

    public function getPartidos()
    {
        // Obtener todos los partidos
        $partidos = Partido::all();

        // Devolver una respuesta con todos los partidos
        return response()->json(['partidos' => $partidos]);
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
        $partido = Partido::find($request->id);

        // Verificar si el partido existe
        if (!$partido) {
            return response()->json(['error' => 'Partido no encontrado'], 404);
        }

        // Actualizar los datos del partido
        $partido->ciudad = $request->ciudad;
        $partido->jugadores = $request->jugadores;
        $partido->tipo = $request->tipo;
        $partido->fecha = $request->fecha;
        $partido->hora = $request->hora;
        $partido->duracion = $request->duracion;
        $partido->save();

        // Devolver una respuesta con el partido actualizado
        return response()->json(['partido' => $partido]);
    }

    public function buscarPartido(Request $request)
    {
        $ciudad = $request->input('ciudad');
        $fecha = $request->input('fecha');

        // Consulta para buscar partidos con la ciudad y fecha especificadas
        $partidos = Partido::where('ciudad', $ciudad)->whereDate('fecha', $fecha)->get();

        // Devolver los partidos encontrados
        return response()->json(['partidos' => $partidos]);
    }
}
