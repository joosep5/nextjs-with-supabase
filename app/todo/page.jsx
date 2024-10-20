//app/todo/page.jsx
import ClientComponent from "@/components/todo/ClientComponent";
import ServerComponents from "@/components/todo/ServerComponent";
import CounterComponent from "@/components/counter/CounterComponent";

export default async function Index() {
    return (
      <>
        <CounterComponent />
        <h1>Todo list:</h1>
        <ServerComponents />
        <ClientComponent />
      </>
    );
  }
  