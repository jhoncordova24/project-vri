import { supabase } from "../lib/supabaseClient";

/**
 * Obtiene las últimas noticias registradas, limitadas por cantidad
 * y ordenadas por fecha de inicio y creación de forma descendente.
 */
export const getLatestNews = async (limit = 3) => {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .order("fecha_inicio", { ascending: false, nullsFirst: false })
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
 * por categoría y búsqueda de texto en el título o contenido.
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
    .select("*", { count: "exact" })
    .order("fecha_inicio", { ascending: false, nullsFirst: false })
    .order("creado_en", { ascending: false });

  if (category && category !== "Todas") {
    query = query.eq("categoria", category);
  }

  if (search && search.trim() !== "") {
    const term = search.trim();
    query = query.or(`titulo.ilike.%${term}%,contenido.ilike.%${term}%`);
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
