<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\Fotos;
class Projects extends Model
{
    protected $table = 'projects';

    protected $with = ['fotos'];
    public function fotos()
    {
        return $this->hasMany(Fotos::class, 'projectId', 'id');
    }
}