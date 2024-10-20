"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@/components/context/UserContext";  // Impordi useUser hook

export default function ClientTodo() {
    const [todos, setTodos] = useState<any[] | null>([]);
    const [newTodo, setNewTodo] = useState("");  // Uue TODO jaoks
    const [updatedTodo, setUpdatedTodo] = useState("");  // TODO uuendamiseks
    const [editingId, setEditingId] = useState<number | null>(null);  // Redigeerimise jälgimine
    const [loading, setLoading] = useState(true);  // Laadimise olek
    const supabase = createClient();
    const { user } = useUser();  // Kasutaja info

    useEffect(() => {
        if (user) {
            setLoading(false);  // Kui kasutaja on saadaval, lõpetame laadimise
            getTodos();  // Hangi TODO-d, kui kasutaja on olemas
        } else {
            setLoading(false);  // Kui kasutajat pole, lõpetame ka laadimise
        }
    }, [user]);  // Kui kasutaja muutub, laadi uuesti TODO-d

    // TODO-de pärimine andmebaasist
    const getTodos = async () => {
        const { data: todos, error } = await supabase
            .from('todos')
            .select('*');
        setTodos(todos);
    };

    // TODO-de sisestamine
    const insertTodo = async () => {
        if (!user) return;  // Veendu, et kasutaja on määratud enne sisestamist
        const { data, error } = await supabase
            .from('todos')
            .insert([{ title: newTodo, priority: '2', user_id: user?.id }])  // Lisa kasutaja ID
            .select();

        if (!error) {
            setNewTodo("");  // Tühjenda sisend
            getTodos();  // Värskenda nimekirja
        }
    };

    // TODO-de värskendamine
    const updateTodo = async (id: number) => {
        const { data, error } = await supabase
            .from('todos')
            .update({ title: updatedTodo })
            .eq('id', id);

        if (!error) {
            setEditingId(null);  // Lõpeta redigeerimisrežiim
            setUpdatedTodo("");  // Tühjenda sisend
            getTodos();  // Värskenda nimekirja
        }
    };

    // TODO-de kustutamine
    const deleteTodo = async (id: number) => {
        const { data, error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);

        if (!error) {
            getTodos();  // Värskenda nimekirja
        }
    };

    // Kui TODO-sid ei leita või pole kasutajat sisse logitud
    if (loading) return <h1>Loading...</h1>;  // Kuvatakse laadimise ajal
    if (!todos || todos.length === 0) return <h1>Login to edit todos </h1>;

    return (
        <main className="flex-1 flex flex-col gap-6 px-4">
            {/* TODO-de nimekiri */}
            {todos.map((todo) => (
                <div key={todo.id} className="flex justify-between items-center">
                    {editingId === todo.id ? (
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
                        <>
                            <span>{todo.title}</span>
                            <Button onClick={() => setEditingId(todo.id)}>Edit</Button>
                            <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
                        </>
                    )}
                </div>
            ))}

            {/* Uue TODO sisend */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New TODO"
                    className="border border-gray-400 p-1"
                />
                <Button onClick={insertTodo}>Insert todo</Button>
                
                {/* User contexti kontroll */}
                <div className="my-4 text-center">
                    {loading ? (
                        <p>Loading user info...</p>
                    ) : user ? (
                        <p>Logged in as: {user.email}</p>
                    ) : (
                        <p>No user is logged in</p>
                    )}
                </div>
            </div>
        </main>
    );
}
