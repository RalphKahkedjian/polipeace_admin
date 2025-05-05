<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function sendChatbot(Request $request)
    {
        // Log the API Key for debugging
        \Log::info('OPENAI_API_KEY: ' . env('OPENAI_API_KEY'));

        // Make the API request to OpenAI's chat endpoint with SSL verification turned off
        $response = Http::withToken(env('OPENAI_API_KEY'))
                        ->withoutVerifying() // Disable SSL certificate verification
                        ->post('https://api.openai.com/v1/chat/completions', [
                            'model' => 'gpt-3.5-turbo', // Model being used
                            'messages' => $request->input('messages'), // Messages sent by the user
                        ]);

        // Check if the response is successful
        if ($response->successful()) {
            // Extract the response from OpenAI
            $chatbotResponse = $response->json(); // Parse JSON response

            return response()->json([
                'status' => true,
                'message' => 'Chatbot Request Accepted',
                'data' => $chatbotResponse['choices'][0]['message'] ?? 'No response from GPT model', // Extracting the message
            ]);
        } else {
            // Handle error if the request fails
            return response()->json([
                'status' => false,
                'message' => 'Failed to contact OpenAI API',
                'error' => $response->json(), // Return the error response from OpenAI
            ], $response->status());
        }
    }
}
