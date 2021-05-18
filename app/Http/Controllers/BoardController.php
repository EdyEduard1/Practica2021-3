<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Task;
use App\Models\User;
use Composer\DependencyResolver\Request;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * Class BoardController
 *
 * @package App\Http\Controllers
 */
class BoardController extends Controller
{


    /**
     * @return Application|Factory|View
     */
    public function boards()
    {
        /** @var User $user */
        $user = Auth::user();

        $boards = Board::with(['user', 'boardUsers']);

        if ($user->role === User::ROLE_USER) {
            $boards = $boards->where(function ($query) use ($user) {
                //Suntem in tabele de boards in continuare
                $query->where('user_id', $user->id)
                    ->orWhereHas('boardUsers', function ($query) use ($user) {
                        //Suntem in tabela de board_users
                        $query->where('user_id', $user->id);
                    });
            });
        }

        $boards = $boards->paginate(10);

        return view(
            'boards.index',
            [
                'boards' => $boards,
            ]
        );
    }

    public function updateBoardAjax(Request $request, $id): JsonResponse
    {
        $board = Board::find($id);

        $error = '';
        $success = '';
        $board->name = $request->name;
        $board->save();


        return response()->json(['error' => $error, 'success' => $success, 'board' => $board]);
    }

     /**
     * @param  Request  $request
     * @param $id
     *
     * @return JsonResponse
     */
    public function deleteBoard(Request $request, $id): JsonResponse
    {
        $board = Board::find($id);

        $error = '';
        $success = '';

        if ($board) {
            $board->delete();

            $success = 'Board deleted';
        } else {
            $error = 'Board not found!';
        }

        return response()->json(['error' => $error, 'success' => $success]);
    }


    /**
     * @param $id
     *
     * @return Application|Factory|View|RedirectResponse
     */
    public function board($id)
    {
        /** @var User $user */
        $user = Auth::user();

        $boards = Board::query();
        $tasks = Task::query();
        $tasks = $tasks->with('user')->paginate(10);

        if ($user->role === User::ROLE_USER) {
            $boards = $boards->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('boardUsers', function ($query) use ($user) {
                        $query->where('user_id', $user->id);
                    });
            });
        }

        $board = clone $boards;
        $board = $board->where('id', $id)->first();

        $boards = $boards->select('id', 'name')->get();

        if (!$board) {
            return redirect()->route('boards.all');
        }

        return view(
            'boards.view',
            [
                'board' => $board,
                'boards' => $boards,
                'tasks' => $tasks,
            ]
        );
    }

    public function updateTaskAjax(Request $request, $id): JsonResponse
    {
        $task = Task::find($id);

        $error = '';
        $success = '';
        $task->name = $request->name;
        //$task->description = $request->description;
        //$task->assignment = $request->assignment;
        $task->save();


        return response()->json(['error' => $error, 'success' => $success, 'task' => $task]);
    }


    /**
     * @param $id
     *
     * @return Application|Factory|View|RedirectResponse
     */

    public function deleteTask(Request $request, $id): JsonResponse
    {
        $task = Task::find($id);

        $error = '';
        $success = '';

        if ($task) {
            $task->delete();

            $success = 'Task deleted';
        } else {
            $error = 'Task not found!';
        }

        return response()->json(['error' => $error, 'success' => $success]);
    }




}