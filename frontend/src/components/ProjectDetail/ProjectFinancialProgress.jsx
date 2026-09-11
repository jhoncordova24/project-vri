import React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Coins, Receipt, Info, Layers } from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(amount);
};

export default function ProjectFinancialProgress({ budget = [] }) {
  if (!budget || budget.length === 0) return null;

  const totals = budget.reduce(
    (acc, row) => {
      const aprobado = Number(row.presupuesto_aprobado) || 0;
      const ejecutado = Number(row.presupuesto_ejecutado) || 0;
      const gasto = Number(row.gasto_efectivo) || 0;
      return {
        aprobado: acc.aprobado + aprobado,
        ejecutado: acc.ejecutado + ejecutado,
        gasto: acc.gasto + gasto,
      };
    },
    { aprobado: 0, ejecutado: 0, gasto: 0 },
  );

  const totalSaldo = totals.aprobado - totals.ejecutado;
  const executionPercentage =
    totals.aprobado > 0
      ? Math.round((totals.ejecutado / totals.aprobado) * 1000) / 10
      : 0;

  return (
    <motion.section
      className="w-full py-12 sm:py-16 bg-slate-50/70 border-t border-slate-200/70"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <SectionLabel>EJECUCIÓN PRESUPUESTAL</SectionLabel>
            <SectionTitle>Avance Financiero</SectionTitle>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200/80 shadow-xs py-1.5 px-3.5 rounded-full self-start md:self-auto">
            <Coins className="w-4 h-4 text-brand-primary" />
            <span>Ejecución acumulada:</span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-primary/10 text-brand-primary">
              {executionPercentage}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Presupuesto Aprobado
              </span>
              <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-slate-900 tracking-tight">
              {formatCurrency(totals.aprobado)}
            </p>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Monto total asignado
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Presupuesto Ejecutado
              </span>
              <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-slate-900 tracking-tight">
              {formatCurrency(totals.ejecutado)}
            </p>
            <span className="text-[11px] font-medium text-brand-primary mt-1 block">
              {executionPercentage}% devengado
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Saldo Disponible
              </span>
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-emerald-700 tracking-tight">
              {formatCurrency(totalSaldo)}
            </p>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Remanente por comprometer
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Gasto Efectivo*
              </span>
              <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-slate-900 tracking-tight">
              {formatCurrency(totals.gasto)}
            </p>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Tras rendiciones de cuentas
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                  <th className="py-3.5 px-6">Genérica de Gasto</th>
                  <th className="py-3.5 px-6 text-right">
                    Presupuesto Aprobado
                  </th>
                  <th className="py-3.5 px-6 text-right">
                    Presupuesto Ejecutado
                  </th>
                  <th className="py-3.5 px-6 text-right">Saldo</th>
                  <th className="py-3.5 px-6 text-right">Gasto Efectivo*</th>
                  <th className="py-3.5 px-6 text-center">Avance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {budget.map((row) => {
                  const aprobado = Number(row.presupuesto_aprobado) || 0;
                  const ejecutado = Number(row.presupuesto_ejecutado) || 0;
                  const gasto = Number(row.gasto_efectivo) || 0;
                  const saldo = aprobado - ejecutado;
                  const rowPercentage =
                    aprobado > 0
                      ? Math.round((ejecutado / aprobado) * 1000) / 10
                      : 0;

                  return (
                    <tr
                      key={row.id || row.generica_gasto}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md border border-slate-200/60">
                            {row.generica_gasto}
                          </span>
                          {row.descripcion && (
                            <span className="text-xs font-medium text-slate-600">
                              {row.descripcion}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right font-medium text-slate-700 text-xs">
                        {formatCurrency(aprobado)}
                      </td>

                      <td className="py-4 px-6 text-right font-semibold text-slate-900 text-xs">
                        {formatCurrency(ejecutado)}
                      </td>

                      <td className="py-4 px-6 text-right font-medium text-emerald-600 text-xs">
                        {formatCurrency(saldo)}
                      </td>

                      <td className="py-4 px-6 text-right font-medium text-slate-600 text-xs">
                        {formatCurrency(gasto)}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2.5">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                            <motion.div
                              className="h-full bg-brand-primary rounded-full origin-left"
                              initial={{ scaleX: 0 }}
                              whileInView={{
                                scaleX: Math.min(rowPercentage / 100, 1),
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                          <span className="text-[11px] font-bold font-mono text-slate-500 w-10 text-right">
                            {rowPercentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 bg-slate-50/80 font-bold text-xs text-slate-900">
                  <td className="py-4 px-6 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-400" />
                    <span>TOTAL GENERAL</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {formatCurrency(totals.aprobado)}
                  </td>
                  <td className="py-4 px-6 text-right text-brand-primary">
                    {formatCurrency(totals.ejecutado)}
                  </td>
                  <td className="py-4 px-6 text-right text-emerald-600">
                    {formatCurrency(totalSaldo)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {formatCurrency(totals.gasto)}
                  </td>
                  <td className="py-4 px-6 text-center font-mono">
                    {executionPercentage}%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-50/60 border border-amber-200/50 text-[11px] text-amber-900/80 leading-relaxed">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>*Gasto Efectivo:</strong> Es el presupuesto ejecutado neto.
            Se consideran las devoluciones de subvenciones, pasajes, viáticos y
            fondos no utilizados tras las rendiciones de cuentas formales
            realizadas por el equipo investigador.
          </span>
        </div>
      </div>
    </motion.section>
  );
}
