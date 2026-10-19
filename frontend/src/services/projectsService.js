import { supabase } from "../lib/supabaseClient";

/**
 * Obtiene la lista de años únicos disponibles en las convocatorias,
 * ordenados de forma descendente para los selectores o menús de navegación.
 */
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

/**
 * Obtiene la convocatoria de un año específico junto con todos sus proyectos
 * asociados, incluyendo gestores e investigadores principales vinculados.
 */
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
 * Obtiene de forma paginada los requerimientos de un proyecto,
 * sus conteos precisos por categoría y el total de unidades provistas.
 */
export async function getProjectRequirementsPaginated({
  projectId,
  page = 1,
  pageSize = 5,
  unidadMedida = "Todos",
}) {
  const { data: allItems, error: countError } = await supabase
    .from("proyecto_requerimientos")
    .select(
      `
      id,
      cantidad,
      catalogo_requerimientos (
        id,
        descripcion,
        unidad_medida
      )
    `,
    )
    .eq("proyecto_id", projectId);

  if (countError) {
    console.error("Error fetching project requirements base:", countError);
    throw countError;
  }

  const counts = {
    Todos: allItems.length,
    Servicio: 0,
    Subvención: 0,
    Unidad: 0,
  };
  let totalCantidadProvista = 0;

  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    totalCantidadProvista += Number(item.cantidad) || 0;
    const cat = item.catalogo_requerimientos?.unidad_medida;
    if (counts[cat] !== undefined) {
      counts[cat] += 1;
    }
  }

  let targetItems = allItems;
  if (unidadMedida && unidadMedida !== "Todos") {
    targetItems = allItems.filter(
      (item) => item.catalogo_requerimientos?.unidad_medida === unidadMedida,
    );
  }

  const filteredTotalCount = targetItems.length;
  const totalPages = Math.ceil(filteredTotalCount / pageSize) || 1;

  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  const pageIds = targetItems.slice(from, to).map((item) => item.id);

  if (pageIds.length === 0) {
    return {
      data: [],
      totalCount: 0,
      totalPages: 1,
      counts,
      totalUnidades: totalCantidadProvista,
    };
  }

  const { data: pageData, error: pageError } = await supabase
    .from("proyecto_requerimientos")
    .select(
      `
      id,
      cantidad,
      creado_en,
      catalogo_requerimientos (
        descripcion,
        unidad_medida
      )
    `,
    )
    .in("id", pageIds)
    .order("creado_en", { ascending: true });

  if (pageError) {
    console.error("Error fetching paginated requirements page:", pageError);
    throw pageError;
  }

  return {
    data: pageData || [],
    totalCount: filteredTotalCount,
    totalPages,
    counts,
    totalUnidades: totalCantidadProvista,
  };
}
