<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;    
use App\Models\projects;    

class projectsController extends Controller
{
    public function index()
    {
        $data = projects::all();
        return response()->json($data);
    }
}