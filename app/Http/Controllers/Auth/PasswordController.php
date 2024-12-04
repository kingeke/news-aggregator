<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password'         => 'required|confirmed|min:8',
        ]);

        $request->user()->update([
            'password' => $validated['password'],
        ]);

        return redirect()->route('dashboard')->with('message', messageResponse("success", "Password updated successfully"));
    }
}
