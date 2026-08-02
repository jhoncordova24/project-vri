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
