import { supabase } from "../lib/supabaseClient";

/**
 * Obtiene la convocatoria de un año específico junto con sus proyectos asociados,
 * trayendo estrictamente los datos que se muestran en el encabezado y en las tarjetas.
 */
export async function getProjectsByYear(year) {
  const { data, error } = await supabase
    .from("convocatorias")
    .select(
      `
      id,
      anio,
      titulo,
      reglamento_resolucion,
      reglamento_pdf_url,
      bases_resolucion,
      bases_pdf_url,
      ganadores_resolucion,
      ganadores_pdf_url,
      presupuesto_resolucion,
      presupuesto_pdf_url,
      fuente_financiamiento,
      proyectos:proyectos_investigacion (
        id,
        titulo,
        linea_investigacion,
        culminado,
        gestores (
          id,
          nombres_apellidos
        ),
        proyecto_investigadores (
          rol,
          investigadores (
            id,
            nombres_apellidos
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

/**
 * Obtiene el detalle completo de un proyecto de investigación por su ID,
 * incluyendo su equipo, entregables y presupuesto asociado ordenados cronológicamente.
 */
export async function getProjectById(projectId) {
  const { data, error } = await supabase
    .from("proyectos_investigacion")
    .select(
      `
      id,
      titulo,
      resenia,
      linea_investigacion,
      presupuesto_total_aprobado,
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
      proyecto_galeria(count),
      proyecto_requerimientos(count)
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
    .single();

  if (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error);
    throw error;
  }

  return data;
}

/**
 * Obtiene de forma paginada los elementos de la galería fotográfica
 * correspondientes a un proyecto específico utilizando rangos del servidor.
 */
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

/**
 * Obtiene todos los requerimientos de un proyecto en una sola consulta
 * para que el filtrado y paginación sean instantáneos en la interfaz.
 */
export async function getProjectRequirements(projectId) {
  const { data, error } = await supabase
    .from("proyecto_requerimientos")
    .select(
      `
      id,
      cantidad,
      creado_en,
      catalogo_requerimientos (
        id,
        descripcion,
        unidad_medida
      )
    `,
    )
    .eq("proyecto_id", projectId)
    .order("creado_en", { ascending: true });

  if (error) {
    console.error("Error fetching project requirements:", error);
    throw error;
  }

  return data || [];
}
