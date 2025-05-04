<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->integer('age');
            $table->string('password');
            $table->enum('sex', [
                'm',
                'f'
            ]);
            $table->enum('party_affiliation', [
                'none',
                'lebanese forces', 
                'free patriotic movement', 
                'tashnag', 
                'kataeb', 
                'hezbollah', 
                'amal movement', 
                'marada movement', 
                'future movement',
                'progressive socialist party'
            ]);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
