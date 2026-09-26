export const formatDate = (dateString) => {
  if (!dateString) return "";
  const dateStr = dateString.includes("T")
    ? dateString
    : `${dateString}T00:00:00`;
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatEventDates = (inicio, fin, fallbackDate = null) => {
  if (!inicio) return fallbackDate ? formatDate(fallbackDate) : "";

  const dInicio = new Date(`${inicio}T00:00:00`);

  if (!fin || inicio === fin) {
    return dInicio.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const dFin = new Date(`${fin}T00:00:00`);
  const mismoMes =
    dInicio.getMonth() === dFin.getMonth() &&
    dInicio.getFullYear() === dFin.getFullYear();

  const mesFin = dFin.toLocaleDateString("es-PE", { month: "short" });
  const anioFin = dFin.getFullYear();

  if (mismoMes) {
    return `${dInicio.getDate()} al ${dFin.getDate()} de ${mesFin} ${anioFin}`;
  }

  const mesInicio = dInicio.toLocaleDateString("es-PE", { month: "short" });
  const anioInicio = dInicio.getFullYear();

  if (anioInicio === anioFin) {
    return `${dInicio.getDate()} de ${mesInicio} al ${dFin.getDate()} de ${mesFin} ${anioFin}`;
  }

  return `${dInicio.getDate()} de ${mesInicio} ${anioInicio} al ${dFin.getDate()} de ${mesFin} ${anioFin}`;
};
