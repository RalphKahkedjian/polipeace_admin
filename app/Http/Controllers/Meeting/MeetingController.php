<?php

namespace App\Http\Controllers\Meeting;

use App\Http\Controllers\Controller;
use App\Http\Requests\MeetingRequests\MeetingRequest;
use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    // Method to create a new meeting
public function scheduleMeeting(MeetingRequest $request) {
    $meeting = Meeting::create($request->validated());

    return response()->json([
        "status" => true,
        "message" => "Meeting appointed successfully",
        "details" => [
            "id" => $meeting->id,
            "name" => $meeting->name,
            "location" => $meeting->location,
            "status" => $meeting->status,
            "duration" => $meeting->duration,
            "time" => $meeting->time,
            "date" => $meeting->date,
        ]
    ]);
  }

  public function showMeeting() {
    $meetings = Meeting::all();

    if(!$meetings->isEmpty()) {
        return response()->json([
            "status" => true,
            "message" => "Meetings List Below: ",
            "meetings" => $meetings
        ], 200);
    }

    return response()->json([
        "status" => false,
        "message" => "No meetings scheduled"
    ], 404);
  }

  public function deleteMeeting(Meeting $meeting) {
    $meeting->delete();

    return response()->json([
        "status" => true,
        "message" => "Meeting deleted successfully"
    ]);
  }
}
