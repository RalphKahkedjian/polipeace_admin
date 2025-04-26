<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
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
        $user->party_affiliation = strtolower($request->get('party_affiliation'));
        $user->save();

        $accessToken = $user->createToken('access_token')->plainTextToken;
        return response()->json([
            "status" => true,
            "message" => "Welcome $user->name, You have been registered successfully",
            "user" => [
                "name" => $user->name,
                "email" => $user->email,
                "age" => $user->age,
                "party_affiliation" => $user->polipartyAffiliation
            ],
            "token" => $accessToken
        ]);
    }
}
