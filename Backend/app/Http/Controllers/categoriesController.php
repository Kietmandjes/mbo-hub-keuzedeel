<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;    
use App\Models\categories;

class categoriesController extends Controller
{
    public function index()
    {

        $categories = categories::all();
        return response()->json($categories);
    }
    public function create(Request $request)
    {
        $categorie = new categories;
        $categorie->name = ucfirst($request->name);

        $categorie->save();
        return response()->json(['message' => 'Evenementen succesvol aan gemaakt', 'status' => 'success'], 200);
    }

    public function edit(Request $request, $id)
    {
        $categorie = categories::find($id);

        if (!$categorie) {
            return response()->json(['message' => 'Evenement niet gevonden', 'status' => 'error'], 404);
        }

        $categorie->name = $request->name;
        $categorie->save();
    
        return response()->json(['message' => 'Evenement geupdate successvol', 'status' => 'success'], 200);
    }

    public function delete($id)
    {
        $categorie = categories::find($id);

    if (!$categorie) {
        return response()->json(['message' => 'Evenement niet gevonden', 'status'=> 'error'], 404);
    }

    $categorie->delete();

    return response()->json(['message' => 'Evenement succesvol verwijderd', 'status'=> 'success'], 200);
    }
}