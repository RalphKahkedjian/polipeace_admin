<?php

use App\Http\Controllers\Announcement\AnnouncementController;
use App\Http\Controllers\Authentication\AdminController;
use App\Http\Controllers\Authentication\UserController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\Meeting\MeetingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client as GuzzleClient;

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
Route::delete('/User/{user}', [UserController::class, 'deleteUser']);

//Meetings Routes
Route::post('/Meeting/Add', [MeetingController::class, 'scheduleMeeting']);
Route::get('/Meeting/Show', [MeetingController::class, 'showMeeting']);
Route::delete('/Meeting/Delete', [MeetingController::class, 'deleteMeeting']);

//Announcements Routes
Route::post('/Announcement/Post', [AnnouncementController::class, 'postAnnouncement']);
Route::get('/Announcement/Show', [AnnouncementController::class, 'getAnnouncement']);
Route::delete('/Announcement/Delete', [AnnouncementController::class, 'deleteAnnouncement']);

Route::post('/chatbot', [ChatbotController::class, 'sendChatbot']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
