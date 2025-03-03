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
        return response()->json($request);
    }


    public function edit($id)
    {
        return response()->json("edit");
    }

    public function delete($id)
    {
        return response()->json("delete");
    }
}