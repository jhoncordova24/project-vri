import { supabase } from "../lib/supabaseClient";

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
