<?php
namespace App\Http\Controllers;
use App\Models\Skills;
use Illuminate\Http\Request;    

class skillsController extends Controller
{
    public function index($id = null)
    {

        $skills = Skills::all();


        return response()->json($skills);
    }
    public function create(Request $request)
    {
        $skills = new Skills;
        $skills->title = $request->title;
        $skills->description = $request->description;
        $skills->example = $request->example;
        $skills->icon = $request->icon;
        $skills->save();
        return response()->json(['message' => 'Skill succesvol aan gemaakt', 'status' => 'success'], 200);
    }


    public function edit(Request $request, $id)
    {
        $skills = Skills::find($id);

        if (!$skills) {
            return response()->json(['message' => 'Skill niet gevonden', 'status' => 'error'], 404);
        }
        $skills->title = $request->title;
        $skills->description = $request->description;
        $skills->example = $request->example;
        $skills->icon = $request->icon;
    
        $skills->save();
    
        return response()->json(['message' => 'Skill succesvol geupdate', 'status' => 'success'], 200);
    }

    public function delete($id)
    {
        $skills = Skills::find($id);

        if (!$skills) {
            return response()->json(['message' => 'Skill niet gevonden', 'status'=> 'error'], 404);
        }

        $skills->delete();

        return response()->json(['message' => 'Skill succesvol verwijderd', 'status'=> 'success'], 200);
    }
}