<?php

use App\Http\Controllers\Authentication\AdminController;
use App\Http\Controllers\Authentication\UserController;
use App\Http\Controllers\ChatbotController;
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
Route::delete('/Admin/{admin}', [AdminController::class, 'deleteAdmin']);

//Users' Routes
Route::post('/User/Register', [UserController::class, 'register']);
Route::post('/User/Login', [UserController::class, 'login']);
Route::get('/User/Users', [UserController::class, 'getUsers']);

//Chatbot Routes

Route::get('/chat', function () {
    $response = Http::withToken(config('services.openai.secret'))->withHeaders([
        'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
        'Content-Type' => 'application/json',
    ])->post('https://api.openai.com/v1/chat/completions', [
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            [
                'role' => 'system',
                'content' => 'You are the system',
            ],
            [
                'role' => 'user',
                'content' => 'You are the user',
            ]
        ]
    ]);

    return $response->json();
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
