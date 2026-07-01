<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from the API',
    ]);
});

Route::apiResource('users', UserController::class)->only([
    'index',
    'show',
    'store',
]);
