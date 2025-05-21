import { pingAPI } from "../actions/loginActions";

export default async function Home() {
  const data = await pingAPI();

  return (
    <div>
      <h1>HOLA</h1>
      <pre>{data}</pre>
    </div>
  );
}
