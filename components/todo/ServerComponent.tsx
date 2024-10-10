// components/todo/ServerComponent.tsx
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function ServerTodo() {
    const supabase = createClient();

    // Fetch todos from the database
    let { data: todos, error } = await supabase
        .from('todos')
        .select('*');

    if (!todos || todos.length === 0) return <h1>No todos found</h1>;

    return (
        <main className="flex-1 flex flex-col gap-6 px-4">
            {todos.map((todo) => (
                <div key={todo.id} className="flex justify-between items-center">
                    <span>{todo.title}</span>
                </div>
            ))}
        </main>
    );
}
