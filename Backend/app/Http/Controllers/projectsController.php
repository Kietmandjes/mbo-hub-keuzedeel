<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;    
use App\Models\projects;    
use App\Models\fotos;    

class projectsController extends Controller
{
    public function index($id = null)
    {

        // $projects = projects::all();
        $photos = fotos::all();
        if($id == null){
            $projects = projects::with('fotos')->get();
        } else {
            $projects = projects::with('fotos')->find($id);
        }

        return response()->json($projects);
    }
    public function create(Request $request)
    {
        $projects = new projects;
        $projects->title = $request->title;
        $projects->slug = $request->slug;
        $projects->text = $request->text;
        $projects->description = $request->description;
        $projects->active = $request->active;
        $projects->date = $request->date;
        $projects->user_id = $request->user_id;
        $projects->tag = $request->tag;

        $projects->save();
        return response()->json(['message' => 'Project succesvol aan gemaakt', 'status' => 'success'], 200);
    }


    public function edit(Request $request, $id)
    {
        $project = projects::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project niet gevonden', 'status' => 'error'], 404);
        }
    
        // Update project fields
        $project->title = $request->title ?? $project->title;
        $project->slug = $request->slug ?? $project->slug;
        $project->text = $request->text ?? $project->text;
        $project->description = $request->description ?? $project->description;
        $project->active = $request->active ?? $project->active;
        $project->date = $request->date ?? $project->date;
        $project->user_id = $request->user_id ?? $project->user_id;
        $project->tag = $request->tag ?? $project->tag;
    
        $project->save();
    
        return response()->json(['message' => 'Project succesvol geupdate', 'status' => 'success'], 200);
    }

    public function delete($id)
    {
        $project = projects::find($id);

    if (!$project) {
        return response()->json(['message' => 'Project niet gevonden', 'status'=> 'error'], 404);
    }

    $project->delete();

    return response()->json(['message' => 'Project succesvol verwijderd', 'status'=> 'success'], 200);
    }
}