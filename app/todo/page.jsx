//app/todo/page.jsx
import ClientComponent from "@/components/todo/ClientComponent";
import ServerComponents from "@/components/todo/ServerComponent";

export default async function Index() {
    return (
      <>
        <ServerComponents />
        <ClientComponent />
      </>
    );
  }
  