<?php
namespace App\Http\Controllers;
use App\Models\Users;
use App\Models\Fotos;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index()
    {
        $users = Users::all();
        $fotos = Fotos::all();

        return response()->json([
            'users' => $users,
            'fotos' => $fotos
        ],200);
    }
}

