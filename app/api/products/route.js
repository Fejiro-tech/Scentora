import { supabase } from "../../../lib/supabaseClient";

export async function GET() {
    const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

    if(error) {
        return Response.json({ error: error.message}, { status: 500 })
    }

    return Response.json(data);
}

export async function POST(req) {
    const body = await req.json();

    const { data, error } = await supabase
    .from("products")
    .insert([body])
    .select();

    if(error) {
        return Response.json({ error: error.message}, { status: 500 })
    }

    return Response.json(data);
}

