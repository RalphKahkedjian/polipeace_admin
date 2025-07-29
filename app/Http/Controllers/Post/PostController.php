<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest\PostsRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function store(PostsRequest $request) {
        $pictureURL = $request->picture_url;

        if($request->hasFile('picture')) {
            $path = $request->file('picture')->store('posts', 'public');
            $pictureURL = Storage::url($path);
        }

        $post = Post::create([
            'user_id' => Auth::id(),
            'description' => $request->description,
            'picture_url' => $pictureURL
        ]);

        $post->load('user');

        return response()->json([
            "status" => true,
            "post" => $post,
            "username" => $post->user->name
        ]);
    }
    
    public function index() {
        $post = Post::all();
        $post->load('user');
        if(!$post->isEmpty()) {
            return response()->json([
                "message" => true,
                "posts" => $post
            ]);
        }
    }
}
