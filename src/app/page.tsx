import { pingAPI, getLoginToken } from "./actions/loginActions";

export default async function Home() {
  const data = await pingAPI();
  const loginData = await getLoginToken();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>HOLA</h1>
      <p>{loginData.token}</p>
      <pre>{data}</pre>
    </div>
  );
}
