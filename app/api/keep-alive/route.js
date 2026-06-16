import { supabase } from "../../../lib/supabaseClient";

export async function GET() {
  const { error } = await supabase
    .from("products")
    .select("id")
    .limit(1);

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({
    success: true,
    timestamp: new Date().toISOString(),
  });
}