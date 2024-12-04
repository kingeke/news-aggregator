<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit()
    {
        return inertia('Profile/Edit');
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        auth()->user()->update([
            'preferred_categories' => $request->categories,
            'preferred_sources'    => $request->sources,
            'preferred_authors'    => $request->authors,
        ]);

        return back()->with('message', messageResponse('success', 'Preferences saved successfully'));
    }
}
