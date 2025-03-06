<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;    
use App\Models\Types;

class typesController extends Controller
{
    public function index($id = null)
    {
        $type = Types::all();

        return response()->json($type);
    }
    public function create(Request $request)
    {
        $type = new types;
        
        $type->name = ucfirst($request->name);

        $type->save();
        return response()->json(['message' => 'Type succesvol aan gemaakt', 'status' => 'success'], 200);
    }

    public function edit(Request $request, $id)
    {
        $type = types::find($id);
        if (!$type) {
            return response()->json(['message' => 'Evenement niet gevonden', 'status' => 'error'], 404);
        }

        $type->name = $request->name;
        $type->save();

        return response()->json(['message' => 'Evenement geupdate successvol', 'status' => 'success'], 200);
    }

    public function delete($id)
    {
        $type = types::find($id);
        if (!$type) {
            return response()->json(['message' => 'Type niet gevonden', 'status'=> 'error'], 404);
        }

        $type->delete();
        return response()->json(['message' => 'Type succesvol verwijderd', 'status'=> 'success'], 200);
    }
}