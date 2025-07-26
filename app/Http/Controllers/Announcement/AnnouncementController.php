<?php

namespace App\Http\Controllers\Announcement;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnnouncementRequests\AnnouncementRequest;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    //method to post announcement
    public function postAnnouncement(AnnouncementRequest $request) {
        $announcement = Announcement::create($request->validated());

        return response()->json([
            "status" => true,
            "message" => "Announcement posted successfully",
            "announcement" => [
                "subject" => $announcement->subject,
                "description" => $announcement->description
            ]
        ]);
    }
    //method to delete announcement
}
