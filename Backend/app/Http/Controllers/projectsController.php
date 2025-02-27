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
}