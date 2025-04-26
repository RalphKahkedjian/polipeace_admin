<?php

use App\Http\Controllers\Authentication\AdminController;
use App\Http\Controllers\Authentication\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Admins' Routes
Route::post('/Admin/Register', [AdminController::class, 'register']);
Route::post('/Admin/Login', [AdminController::class, 'login']);
Route::get('/Admin/Admins', [AdminController::class, 'getAdmins']);

//Users' Routes
Route::post('/User/Register', [UserController::class, 'register']);
Route::post('/User/Login', [UserController::class, 'login']);
Route::get('/User/Users', [UserController::class, 'getUsers']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
