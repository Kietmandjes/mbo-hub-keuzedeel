<?php
namespace App\Http\Controllers;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;


class LoginController extends Controller
{
    public function login()
    {

        $data = Request()->all();

        $email = $data['email'];
        $password = $data['password'];

        $user = Users::where('email', $email)->first();
        if(gettype($user) !== 'object'){
            return response()->json(['message' => 'User not found with that Email','status'=> 'email'], 404);
        }
        if (Hash::check($password, $user['password'])) {
            // The passwords match...
            return response()->json([$user,'status'=>"success"],200);
        }else{
            return response()->json(['message' => 'Password not match','status'=> 'password'], 404);
        }
    }

    public function register()
    {
        $data = Request()->all();
        $user = new Users();
        $user->name = 'test';
        $user->email = $data['email'];
        $user->password = Hash::make($data['password']);
        $user->perms = 2;
        $user->save(); 
        return response()->json(['status'=>"success"],200);
    }
}