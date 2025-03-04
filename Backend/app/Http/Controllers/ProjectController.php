<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;    
use App\Models\Projects;    

class ProjectController extends Controller
{
    public function index()
    {
        $data = Projects::all();
        return response()->json($data);
    }
}