<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;    
use App\Models\Events;

class eventsController extends Controller
{
    public function index($id = null)
    {
        if($id == null){
            $event = events::all();
        } else {
            $event = events::all()->find($id);
        }

        return response()->json($event);
    }
    public function create(Request $request)
    {
        $event = new events;
        $event->title = $request->title;
        $event->date = $request->date;
        $event->type = $request->type;
        $event->description = $request->description;
        $event->location = $request->location;

        $event->save();
        return response()->json(['message' => 'Evenementen succesvol aan gemaakt', 'status' => 'success'], 200);
    }


    public function edit(Request $request, $id)
    {
        $event = events::find($id);

        if (!$event) {
            return response()->json(['message' => 'Evenement niet gevonden', 'status' => 'error'], 404);
        }
    
        // Update project fields
        $event->title = $request->title;
        $event->date = $request->date;
        $event->type = $request->type;
        $event->description = $request->description;
        $event->location = $request->location;
    
        $event->save();
    
        return response()->json(['message' => 'Evenement geupdate successvol', 'status' => 'success'], 200);
    }

    public function delete($id)
    {
        $event = events::find($id);

    if (!$event) {
        return response()->json(['message' => 'Evenement niet gevonden', 'status'=> 'error'], 404);
    }

    $event->delete();

    return response()->json(['message' => 'Evenement succesvol verwijderd', 'status'=> 'success'], 200);
    }
}