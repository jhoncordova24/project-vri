import { supabase } from "../lib/supabaseClient";

/**
 * Fetch the latest news items for preview sections
 */
export const getLatestNews = async (limit = 3) => {
  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .order("creado_en", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching news:", error.message);
    throw error;
  }

  return data;
};

/**
 * Fetch a single news record by its unique identifier
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
 * Fetch paginated news with optional category filtering and search queries
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
