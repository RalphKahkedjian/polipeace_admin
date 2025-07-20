<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
public function sendChatbot(Request $request)
{
    $prompt = strtolower(trim($request->input('prompt')));

    if (!$prompt) {
        return response()->json([
            'status' => false,
            'message' => 'Prompt is required.',
        ], 400);
    }

    // Define your custom Q&A list
    $customAnswers = [
        'who are you' => 'I am Polipeace ChatBot made by Ralph Kahkedjian. ',
        'what is your name' => 'My name is Polipeace',
        'how are you' => 'I am doing great, thank you for asking!',
        'which party affiliation has the most followers' => 'party_most_followers',
        'can you list the latest registered users' => 'latest_registered_users',
    ];

    if (array_key_exists($prompt, $customAnswers)) {
        $answer = $customAnswers[$prompt];

        if ($answer === 'party_most_followers') {
            $sql = file_get_contents(database_path('sql/party_with_most_followers.sql'));
            $result = \DB::selectOne($sql);

            $answer = $result
                ? "The party with the most followers is " . ucfirst($result->party_affiliation)
                : "I don't have that info.";
        } 
        else if ($answer === 'latest_registered_users') {
            $sql = file_get_contents(database_path('sql/latest_registered_users.sql'));
            $results = \DB::select($sql); 

            if ($results && count($results) > 0) {
                $answer = "The latest registered Polipeace users are:\n\n";

                foreach ($results as $user) {
                    $answer .= "- {$user->name} (joined on " . date('Y-m-d', strtotime($user->created_at)) . ")\n";
                }
            } else {
                $answer = "No recent users found.";
            }
        }

        // Return the custom answer in **all cases** here
        return response()->json([
            'status' => true,
            'message' => 'Custom Answer',
            'data' => $answer,
        ]);
    }

    // If prompt is NOT in custom answers, call Gemini API normally
    $contents = [
        [
            'parts' => [
                ['text' => $prompt]
            ]
        ]
    ];

    $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-goog-api-key' => env('GEMINI_API_KEY'),
        ])
        ->withoutVerifying()
        ->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', [
            'contents' => $contents
        ]);

    if ($response->successful()) {
        $json = $response->json();

        return response()->json([
            'status' => true,
            'message' => 'Chatbot Request Accepted',
            'data' => $json['candidates'][0]['content']['parts'][0]['text'] ?? 'No response from Gemini model',
        ]);
    } else {
        return response()->json([
            'status' => false,
            'message' => 'Failed to contact Gemini API',
            'error' => $response->json(),
        ], $response->status());
    }
}

}