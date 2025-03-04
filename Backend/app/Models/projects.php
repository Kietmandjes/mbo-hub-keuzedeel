<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\Fotos;
class projects extends Model
{
    protected $table = 'projects';

    public function fotos()
    {
        return $this->hasMany(Fotos::class, 'projectId', 'id');
    }
}