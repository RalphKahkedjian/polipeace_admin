<?php

use App\Http\Controllers\Authentication\AdminController;
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

Route::post('/Admin/Register', [AdminController::class, 'register']);
Route::get('/Admin/Admins', [AdminController::class, 'getAdmins']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
