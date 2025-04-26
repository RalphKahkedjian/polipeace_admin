<?php

namespace App\Http\Requests\UserRequests;

use Illuminate\Foundation\Http\FormRequest;

class UserAuthRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'age' => ['required', 'integer', 'min:0'],
            'password' => ['required', 'string', 'min:6'],
            'party_affiliation' => ['nullable', 'in:Ouwet,Aoun,Dashnak,Kataeb,Hezbollah,Haraket Amal,Marada Movement,Progressive Socialist Party'],
        ];
    }
}
