<?php
namespace App\Http\Controllers;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function users()
    {
        $users = Users::all();
        return response()->json($users,200);
    }
}

