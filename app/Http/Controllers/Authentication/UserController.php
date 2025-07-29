<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequests\UserAuthLoginRequest;
use App\Http\Requests\UserRequests\UserAuthRequest;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(UserAuthRequest $request) {
        $user = new User();
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->age = $request->get('age');
        $user->password = Hash::make($request->get('password'));
        $user->sex = $request->get('sex');
        $user->party_affiliation = $request->get('party_affiliation');
        $user->save();

        $accessToken = $user->createToken('access_token')->plainTextToken;
        return response()->json([
            "status" => true,
            "message" => "Welcome $user->name, You have been registered successfully",
            "user" => [
                "name" => $user->name,
                "email" => $user->email,
                "age" => $user->age,
                "sex" => $user->sex,
                "party_affiliation" => $user->party_affiliation
            ],
            "token" => $accessToken
        ]);
    }

    public function login(UserAuthLoginRequest $request) {
        $credentials = $request->validated();

        $user= User::where('email', $credentials['email'])->first();
        if($user && Hash::check($credentials['password'], $user->password)) {
            $accessToken = $user->createToken('access_token')->plainTextToken;
            return response()->json([
                "status" => true,
                "message" => "Welcome back $user->name",
                "user" => [
                    "name" => $user->name,
                    "email" => $user->email,
                    "age" => $user->age,
                    "sex" => $user->sex,
                    "party_affiliation" => $user->party_affiliation,
                ],
                "token" => $accessToken
            ]);
        }

        return response()->json([
            "status" => false,
            "message" => "Invalid email or password"
        ]);
    }

    public function getUsers() {
        $user = User::all();
        if(! $user->isEmpty()) {
            return response()->json([
                "status" => true,
                "users" => $user
            ]);
        }
        else {
            return response()->json([
                "status" => false,
                "message" => "No users found"
            ]);
        }
    }

    public function deleteUser(User $user) {
        $user->delete();
        $username = $user->name;
        return response()->json([
            "status" => true,
            "message" => "${username} has been deleted successfully",
        ], 200);
    }
}
 