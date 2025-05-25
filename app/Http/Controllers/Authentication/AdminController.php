<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequests\AdminAuthLoginRequest;
use App\Http\Requests\AdminRequests\AdminAuthRequest;
use App\Models\Admin;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    // method to register admin
    public function register(AdminAuthRequest $request) {

        /**
         * @var \App\Models\Admin
         */
        $admin = new Admin();
        $admin->id = $request->get('id');
        $admin->username = $request->get('username');
        $admin->email = $request->get('email');
        $admin->profile_pic = $request->get('profile_pic');
        $admin->password = Hash::make($request->get('password'));
        $admin->age = $request->get('age');
        $admin->save();

        $accessToken = $admin->createToken('access_token')->plainTextToken;
        return response()->json([
            "status" => true,
            "message" => "Admin Registered Successfully",
            "admin" => [
                "id" => $admin->id,
                "username" => $admin->username,
                "email" => $admin->email,
                "age" => $admin->age,
                "profilePictureURL" => $admin->profile_pic
            ],
            "token" => $accessToken,
        ]);
    }

    // Login function TBD
    public function login(AdminAuthLoginRequest $request) {
        $credentials = $request->validated();

        $admin = Admin::where('email', $credentials['email'])->first();
        if ($admin && Hash::check($credentials['password'], $admin->password)) {
            $accessToken = $admin->createToken('access_token')->plainTextToken;
            return response()->json([
                "status" => true,
                "message" => "Welcome back $admin->username",
                "admin" => [
                    "id" => $admin->id,
                    "username" => $admin->username,
                    "email" => $admin->email,
                    "age" => $admin->age,
                    "profilePictureURL" => $admin->profile_pic
                ],
                "token" => $accessToken
            ]);
        }

        return response()->json([
            "status" => false,
            "message" => "Invalid email or password"
        ]);
    }
    // Get function 
    public function getAdmins() {
        $admins = Admin::all();
    
        if (!$admins->isEmpty()) {
            return response()->json([
                "status" => true,
                "admins" => $admins
            ]);
        } else {
            return response()->json([
                "status" => false,
                "message" => "Admins list is empty"
            ]);
        }
    }    
}
