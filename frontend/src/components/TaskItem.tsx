import { useNavigate } from 'react-router-dom'
import type { Task } from '../interface/task'
import { Pencil, Trash2 } from 'lucide-react'

//@Input() en Angular
interface Props {
  task: Task
  onDelete: (id: string) => void
  onToggle: (task: Task) => void
}

function TaskItem({ task, onDelete, onToggle }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex items-start gap-4 px-6 py-4 border-b border-gray-700">
        <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
            className="w-5 h-5 cursor-pointer mt-1"
        />

        <div className="flex-1">
            <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                {task.title}
            </p>
            {task.description && (
                <p className="text-gray-400 text-sm mt-1">
                {task.description}
                </p>
            )}
        </div>

        <div className="flex gap-3">
            <button
                onClick={() => navigate(`/update/${task.id}`)}
                className="text-gray-400 hover:text-blue-400">
                <Pencil size={18} />
            </button>
            <button
                onClick={() => onDelete(task.id)}
                className="text-gray-400 hover:text-red-400">
                <Trash2 size={18} />
            </button>
        </div>
    </div>
  );
}

export default TaskItem;