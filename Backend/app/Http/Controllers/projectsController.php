<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;    
use App\Models\projects;  
use App\Models\Fotos;
use Carbon\Carbon;  
class projectsController extends Controller
{
    public function index(Request $request,$id = null)
    {
        
        if($request->cat){
            $projects = projects::select('id', 'Title', 'slug', 'text', 'description', 'updated_at',  'tag')->where('active', 1)->where('tag',$request->cat)->get()->toArray();
            for ($i = 0; $i < count($projects); $i++) {
                $projects[$i]["updated_at"] = substr($projects[$i]["updated_at"], 0, 10);
                $projects[$i]["updated_at"] = Carbon::parse($projects[$i]["updated_at"])->locale('nl')->isoFormat('D MMMM YYYY');
            }
        }
        elseif ($id == null) {
            $projects = projects::select('id', 'Title', 'slug', 'text', 'description', 'updated_at',  'tag')->where('active', 1)->get()->toArray();
            for ($i = 0; $i < count($projects); $i++) {
                $projects[$i]["updated_at"] = substr($projects[$i]["updated_at"], 0, 10);
                $projects[$i]["updated_at"] = Carbon::parse($projects[$i]["updated_at"])->locale('nl')->isoFormat('D MMMM YYYY');
            }
        } else {
            $projects = projects::all()->find($id);
        }

        return response()->json($projects);
    }
    public function create(Request $request)
    {
        $projects = new projects;
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'required|string',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

            // Opslag van afbeeldingen als er bestanden zijn geüpload
        if ($request->hasFile('images')) { 
            $isFirst = true;
            foreach ($request->file('images') as $image) {
                $fotoDB = new Fotos();
           
                $lastImage = Fotos::orderBy('id', 'desc')->first();
                $newId = $lastImage ? $lastImage->id + 1 : 1;
                $fotoDB->primairy = $isFirst ? 1 : 0;
                $isFirst = false;
                $imageName = $newId . '-' . $image->getClientOriginalName();
                $image->storeAs('public/projects', $imageName);
                $lastProject = projects::orderBy('id', 'desc')->first();
                $newId = $lastProject ? $lastProject->id + 1 : 1;
                $fotoDB->name = str_replace(' ', '-', $image->getClientOriginalName());
                $fotoDB->projectId = $newId;
                $fotoDB->save();

                

            }
        }

        $projects->title = $request->title;
        $slug = str_replace(' ', '-', $request->title);
        $projects->slug = $slug;
        $projects->text = $request->description;
        $description = strip_tags(str_replace('&nbsp;', ' ', substr($request->description, 0, 100)));
        $projects->description = $description;
        $projects->active = 1;
        $projects->tag = $request->category;

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