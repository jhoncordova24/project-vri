import { supabase } from "../lib/supabaseClient";

/**
 * Obtiene las últimas noticias registradas para el Home,
 * ordenadas cronológicamente por su fecha de publicación.
 */
export const getLatestNews = async (limit = 3) => {
  const { data, error } = await supabase
    .from("noticias")
    .select(
      `
      id,
      titulo,
      categoria,
      imagen_url,
      modalidad,
      fecha_inicio,
      fecha_fin,
      creado_en
    `,
    )
    .order("creado_en", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching news:", error.message);
    throw error;
  }

  return data;
};

/**
 * Obtiene el detalle completo de una noticia específica utilizando su ID único.
 */
export const getNewsById = async (id) => {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching news detail:", error.message);
    throw error;
  }

  return data;
};

/**
 * Obtiene de forma paginada las noticias con opciones de filtrado
 * por categoría y búsqueda de texto en el título.
 */
export const getNews = async ({
  page = 1,
  pageSize = 6,
  search = "",
  category = "Todas",
} = {}) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("noticias")
    .select(
      `
      id,
      titulo,
      categoria,
      imagen_url,
      modalidad,
      fecha_inicio,
      fecha_fin,
      creado_en
    `,
      { count: "exact" },
    )
    .order("creado_en", { ascending: false });

  if (category && category !== "Todas") {
    query = query.eq("categoria", category);
  }

  if (search && search.trim() !== "") {
    const term = search.trim();
    query = query.ilike("titulo", `%${term}%`);
  }

  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error("Error fetching paginated news:", error.message);
    throw error;
  }

  return {
    data,
    totalCount: count,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
};
