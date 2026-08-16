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
        linea_investigacion,
        culminado,
        gestores (
          id,
          nombres_apellidos,
          cargo,
          email,
          foto_url
        ),
        proyecto_investigadores (
          rol,
          investigadores (
            id,
            nombres_apellidos,
            email,
            foto_url,
            orcid_url,
            cti_vitae_url
          )
        )
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

export async function getProjectById(projectId) {
  const { data, error } = await supabase
    .from("proyectos_investigacion")
    .select(
      `
      id,
      titulo,
      resenia,
      linea_investigacion
    `,
    )
    .eq("id", projectId)
    .single();

  if (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error);
    throw error;
  }

  return data;
}
