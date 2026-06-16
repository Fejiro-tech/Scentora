import { supabase } from "../../../../lib/supabaseClient";

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("products")
    .update(body)
    .eq("id", Number(id))
    .select();

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return Response.json(data);
}

export async function DELETE(req, { params }) {
    const { id } = await params;

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: "Deleted successfully" });
}