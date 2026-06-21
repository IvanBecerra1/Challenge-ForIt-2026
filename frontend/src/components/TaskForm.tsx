import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTask, updateTask, getAllTasks } from '../service/taskService'

function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const { id } = useParams();
    const [errors, setErrors] = useState({ title: '', description: '' });

    useEffect(() => {
        if (id) {
            getAllTasks().then(tasks => {
                const task = tasks.find((t: { id: string }) => t.id === id);

                if (task) {
                    setTitle(task.title);
                    setDescription(task.description);
                }
            });
        }
    }, [id]);



    const handleSubmit = async () => {
        if (!validate()) 
            return;

        if (!title.trim()) 
            return;

        if (id) 
            await updateTask(id, { title, description });
        else 
            await createTask(title, description);
    
        navigate('/');
    }

    const validate = () => {
        const newErrors = { title: '', description: '' };
        
        if (!title.trim()) 
            newErrors.title = 'El título es obligatorio';
        if (!description.trim()) 
            newErrors.description = 'La descripción es obligatoria';

        setErrors(newErrors);

        return !newErrors.title && !newErrors.description;
    }

    return (
        <div className="min-h-screen bg-gray-1200 text-white"
        style={{
                backgroundImage: 'url(https://forit.ar/images/footer-background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div className="py-16 text-center" style={{ backgroundColor: '#151231' }}>
                <h1 className="text-6xl font-bold">Acciones de tareas</h1>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">
                <div className="bg-gray-800 rounded-xl p-6 flex flex-col gap-4">

                    <h2 className="text-xl font-bold">
                        {id ? 'Editar tarea' : 'Crear nueva tarea'}
                    </h2>

                    <div className="flex flex-col gap-1">
                        <input
                            type="text"
                            placeholder="Título"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="bg-gray-700 rounded-lg px-4 py-2 outline-none text-white placeholder-gray-400"
                            />
                        {errors.title && (
                            <span className="text-red-400 text-sm">{errors.title}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <textarea
                            placeholder="Descripción"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="bg-gray-700 rounded-lg px-4 py-2 outline-none text-white placeholder-gray-400 resize-none h-28"
                            />
                            {errors.description && (
                                <span className="text-red-400 text-sm">{errors.description}</span>
                            )}
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600">
                            {id ? 'Guardar tarea' : 'Crear tarea'}
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;