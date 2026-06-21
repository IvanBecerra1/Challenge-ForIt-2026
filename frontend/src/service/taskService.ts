const API_URL = import.meta.env.VITE_BACKEND_API;

export const getAllTasks = async () => {
    const res = await fetch(`${API_URL}/api/tasks`);
    return res.json();
}

export const createTask = async (title: string, description: string) => {
    const res = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });
    return res.json();
}

export const updateTask = async (id: string, data: object) => {
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export const deleteTask = async (id: string) => {
    await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE'
    });
}