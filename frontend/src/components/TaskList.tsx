import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type{ Task } from '../interface/task'
import { getAllTasks, deleteTask, updateTask } from '../service/taskService'
import TaskItem from './TaskItem'

function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const navigate = useNavigate();

    // similar que el ngoninit de angular
    useEffect(() => {
        getAllTasks().then(data=> setTasks(data));
    }, [])

    const handleDelete = async (id: string) => {
        await deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
    }

    const handleToggle = async (task: Task) => {
        const updated = await updateTask(task.id, { completed: !task.completed })
        setTasks(tasks.map(t => t.id === updated.id ? updated : t));
    }

    return (
        <div className="min-h-screen text-white" 
                
    //        style={{ backgroundColor: '#0d0b1e' }}
            style={{
                backgroundImage: 'url(https://forit.ar/images/footer-background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            >
            <div className="py-16 text-center w-full"
                style={{ backgroundColor: '#151231' }}>
                <h1 className="text-6xl font-bold">Mis tareas</h1>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">
                <button
                    onClick={() => navigate('/create')}
                    className="bg-gray-800 text-left px-6 py-4 rounded-xl hover:bg-gray-700">
                    Crear una tarea
                </button>

                <div className="bg-gray-800 rounded-xl overflow-hidden">
                    {tasks.map(task => (
                        <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                        />
                    ))}
                    <div className="text-center py-3 text-gray-400">
                        {tasks.length} tareas totales
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskList;