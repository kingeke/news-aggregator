<?php

function messageResponse($status, $message, $code = 400)
{
    return [
        'status' => $status,
        'body'   => $message,
        'code'   => $status == "success" ? 200 : $code,
    ];
}

function apiMessageResponse($status, $message = null, $code = 200)
{
    return response()->json([
        'status'  => $status,
        'message' => $message,
    ], $code);
}

function generateUuid($title, $published_at)
{
    if (!$title || !$published_at) {

        return false;
    }

    return md5($title . $published_at);
}

function isVercel()
{
    return !!env("APP_VERCEL");
}
