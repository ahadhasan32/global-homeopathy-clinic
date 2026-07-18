import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  let connectionStatus = "Not tested";
  let connectionError = "";

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("profiles")
      .select("id")
      .limit(1);

    if (error) {
      connectionStatus = "Supabase responded, but the query was rejected.";
      connectionError = error.message;
    } else {
      connectionStatus = "Supabase is connected successfully.";
    }
  } catch (error) {
    connectionStatus = "Supabase connection failed.";

    connectionError =
      error instanceof Error ? error.message : "An unknown error occurred.";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-cyan-600">
          Global Homeopathy Clinic
        </p>

        <h1 className="text-3xl font-bold text-slate-800">
          Supabase Connection Test
        </h1>

        <div className="mt-8 rounded-2xl bg-slate-100 p-5">
          <p className="font-semibold text-slate-800">{connectionStatus}</p>

          {connectionError ? (
            <p className="mt-3 break-words text-sm text-red-600">
              {connectionError}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
