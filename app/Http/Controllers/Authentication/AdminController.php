<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequests\AdminAuthRequest;
use App\Models\Admin;
use Hash;
use Illuminate\Http\Request;

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
            ],
            "token" => $accessToken,
        ]);
    }

    // Login function TBD

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
