<?php

namespace App\Http\Controllers;

use App\Models\Campo;
use Illuminate\Http\Request;

class campoController extends Controller
{
    public function addCampo(Request $request)
    {

        // Crear un nuevo partido
        $campo = Campo::create([
            'nombre' => $request->nombre,
            'ubicacion' => $request->ubicacion,
            'ciudad' => $request->ciudad,
            'latitud' => $request->latitud,
            'longitud' => $request->longitud,
        ]);

        // Devolver una respuesta con el partido creado
        return response()->json($campo, 201);
    }

    public function getCampos()
    {
        // Obtener todos los partidos
        $campo = Campo::all();

        // Devolver una respuesta con todos los partidos
        return response()->json($campo);
    }

    public function getCampoById(Request $request)
    {
        // Buscar el partido por su ID
        $campo = Campo::find($request->id);

        // Verificar si el partido existe
        if (!$campo) {
            return response()->json(['error' => 'Campo no encontrado'], 404);
        }

        // Devolver una respuesta de éxito
        return response()->json($campo);
    }

    public function borrarCampo(Request $request)
    {
        // Buscar el partido por su ID
        $campo = Campo::find($request->id);

        // Verificar si el partido existe
        if (!$campo) {
            return response()->json(['error' => 'Campo no encontrado'], 404);
        }

        // Cancelar el partido
        $campo->delete();

        // Devolver una respuesta de éxito
        return response()->json(['message' => 'Campo borrado con exito']);
    }

    public function modificarCampo(Request $request)
    {
        // Buscar el partido por su ID
        $campo = Campo::find($request->id);

        // Verificar si el partido existe
        if (!$campo) {
            return response()->json(['error' => 'Campo no encontrado'], 404);
        }

        // Actualizar los datos del partido
        $campo->nombre = $request->nombre;
        $campo->ubicacion = $request->ubicacion;
        $campo->ciudad = $request->ciudad;
        $campo->latitud = $request->latitud;
        $campo->longitud = $request->longitud;

        // Devolver una respuesta con el partido actualizado
        return response()->json($campo);
    }

    public function eliminarCampo(Request $request)
    {
        info('ID del campo recibido: ' . $request->input('campo_id'));

        // Buscar el campo por su ID
        $campo = Campo::find($request->input('campo_id'));

        // Verificar si el campo existe
        if (!$campo) {
            return response()->json(['error' => 'Campo no encontrado'], 404);
        }

        // Eliminar el campo
        $campo->delete();

        // Devolver una respuesta de éxito
        return response()->json(['message' => 'Campo eliminado correctamente']);
    }
}
