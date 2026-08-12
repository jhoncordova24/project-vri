import { supabase } from "../lib/supabaseClient";

export async function getAvailableYears() {
  const { data, error } = await supabase
    .from("convocatorias")
    .select("anio")
    .order("anio", { ascending: false });

  if (error) {
    console.error("Error fetching available years:", error);
    throw error;
  }

  return data.map((item) => item.anio);
}

export async function getProjectsByYear(year) {
  const { data, error } = await supabase
    .from("convocatorias")
    .select(
      `
      *,
      proyectos:proyectos_investigacion (
        id,
        titulo,
        investigador_principal,
        linea_investigacion,
        culminado
      )
    `,
    )
    .eq("anio", year)
    .single();

  if (error) {
    console.error(`Error fetching projects for year ${year}:`, error);
    throw error;
  }

  return data;
}
