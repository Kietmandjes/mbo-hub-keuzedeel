<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\Fotos;
class projectss extends Model
{
    protected $table = 'projects';

    public function fotos()
    {
        return $this->hasMany(Fotos::class, 'projectId', 'id');
    }
}