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
      linea_investigacion,
      contrato_numero,
      contrato_pdf_url,
      resolucion_modificacion,
      resolucion_modificacion_pdf_url,
      resolucion_culminacion,
      resolucion_culminacion_pdf_url,
      convocatorias (
        id,
        anio
      ),
      proyecto_investigadores (
        id,
        rol,
        investigadores (
          id,
          nombres_apellidos,
          email,
          foto_url,
          orcid_url,
          cti_vitae_url
        )
      ),
      proyecto_entregables (
        id,
        entregable,
        estado,
        enlace_url,
        fecha,
        creado_en
      ),
      proyecto_presupuesto (
        id,
        generica_gasto,
        descripcion,
        presupuesto_aprobado,
        presupuesto_ejecutado,
        gasto_efectivo,
        creado_en
      ),
      proyecto_requerimientos (
        id,
        unidad_medida,
        cantidad,
        descripcion,
        creado_en
      )
    `,
    )
    .eq("id", projectId)
    .order("creado_en", {
      referencedTable: "proyecto_entregables",
      ascending: true,
    })
    .order("generica_gasto", {
      referencedTable: "proyecto_presupuesto",
      ascending: true,
    })
    .order("creado_en", {
      referencedTable: "proyecto_requerimientos",
      ascending: true,
    })
    .single();

  if (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error);
    throw error;
  }

  return data;
}

export async function getProjectGallery({ projectId, page = 1, pageSize = 3 }) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await supabase
    .from("proyecto_galeria")
    .select("id, imagen_url, descripcion, creado_en", { count: "exact" })
    .eq("proyecto_id", projectId)
    .order("creado_en", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error fetching project gallery:", error);
    throw error;
  }

  return {
    data: data || [],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}
