<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\projects;
class fotos extends Model
{
    protected $table = "fotos";

    public function project()
    {
        return $this->belongsTo(Projects::class, 'projectID', 'id');
    }
}