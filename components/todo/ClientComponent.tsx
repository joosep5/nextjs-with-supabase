// components/todo/ClientComponent.tsx
"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ClientTodo() {
    const [todos, setTodos] = useState<any[] | null>([]);
    const [newTodo, setNewTodo] = useState(""); // For new TODO title
    const [updatedTodo, setUpdatedTodo] = useState(""); // For updating TODO title
    const [editingId, setEditingId] = useState<number | null>(null); // To track which TODO is being edited
    const supabase = createClient();

    useEffect(() => {
        getTodos();
    }, []);

    // Fetch todos from the database
    const getTodos = async () => {
        const { data: todos, error } = await supabase
            .from('todos')
            .select('*');
        setTodos(todos);
    };

    // Insert a new todo
    const insertTodo = async () => {
        const { data, error } = await supabase
            .from('todos')
            .insert([{ title: newTodo, priority: '2' }])
            .select();

        if (!error) {
            setNewTodo(""); // Reset input
            getTodos(); // Refresh the list
        }
    };

    // Update an existing todo
    const updateTodo = async (id: number) => {
        const { data, error } = await supabase
            .from('todos')
            .update({ title: updatedTodo })
            .eq('id', id);

        if (!error) {
            setEditingId(null); // Stop editing mode
            setUpdatedTodo(""); // Reset input
            getTodos(); // Refresh the list
        }
    };

    // Delete a todo
    const deleteTodo = async (id: number) => {
        const { data, error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);

        if (!error) {
            getTodos(); // Refresh the list
        }
    };

    if (!todos || todos.length === 0) return <h1>No todos found</h1>;

    return (
        <main className="flex-1 flex flex-col gap-6 px-4">
            {/* List of Todos */}
            {todos.map((todo) => (
                <div key={todo.id} className="flex justify-between items-center">
                    {editingId === todo.id ? (
                        // Editing mode
                        <>
                            <input
                                type="text"
                                value={updatedTodo}
                                onChange={(e) => setUpdatedTodo(e.target.value)}
                                className="border border-gray-400 p-1"
                            />
                            <Button onClick={() => updateTodo(todo.id)}>Update</Button>
                            <Button onClick={() => setEditingId(null)}>Cancel</Button>
                        </>
                    ) : (
                        // Normal mode
                        <>
                            <span>{todo.title}</span>
                            <Button onClick={() => setEditingId(todo.id)}>Edit</Button>
                            <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
                        </>
                    )}
                </div>
            ))}

            {/* Input for new TODO */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New TODO"
                    className="border border-gray-400 p-1"
                />
                <Button onClick={insertTodo}>Insert todo</Button>
            </div>
        </main>
    );
}
