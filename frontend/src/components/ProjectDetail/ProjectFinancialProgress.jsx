import { motion } from "framer-motion";
import { Wallet, TrendingUp, Coins, Receipt, Layers } from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import SectionContainer from "../common/SectionContainer";

const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(amount);
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const rowVariants = {
  initial: {},
  visible: {},
};

const barVariants = {
  initial: { scaleX: 0 },
  visible: (percentage) => ({
    scaleX: Math.min(percentage / 100, 1),
    transition: {
      duration: 1.6,
      ease: [0.25, 1, 0.5, 1],
      delay: 0.1,
    },
  }),
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
    <SectionContainer dataAos={null}>
      <motion.div
        initial="initial"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={contentVariants}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <SectionLabel>EJECUCIÓN PRESUPUESTAL</SectionLabel>
            <SectionTitle>Avance Financiero</SectionTitle>
          </div>

          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200/80 shadow-xs py-2 px-4 rounded-full self-start md:self-auto">
            <Coins className="w-4 h-4 text-brand-primary" />
            <span>Ejecución acumulada:</span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-brand-primary/10 text-brand-primary">
              {executionPercentage}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 line-clamp-1">
                Presupuesto Aprobado
              </span>
              <div className="p-1.5 sm:p-2.5 bg-slate-100 rounded-lg sm:rounded-xl text-slate-600 shrink-0">
                <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-base sm:text-xl font-bold text-slate-900 tracking-tight truncate">
              {formatCurrency(totals.aprobado)}
            </p>
            <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 block line-clamp-1">
              Monto total asignado
            </span>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 line-clamp-1">
                Presupuesto Ejecutado
              </span>
              <div className="p-1.5 sm:p-2.5 bg-brand-primary/10 rounded-lg sm:rounded-xl text-brand-primary shrink-0">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-base sm:text-xl font-bold text-slate-900 tracking-tight truncate">
              {formatCurrency(totals.ejecutado)}
            </p>
            <span className="text-[11px] sm:text-xs font-medium text-brand-primary mt-0.5 sm:mt-1 block line-clamp-1">
              {executionPercentage}% devengado
            </span>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 line-clamp-1">
                Saldo Disponible
              </span>
              <div className="p-1.5 sm:p-2.5 bg-emerald-50 rounded-lg sm:rounded-xl text-emerald-600 shrink-0">
                <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-base sm:text-xl font-bold text-emerald-700 tracking-tight truncate">
              {formatCurrency(totalSaldo)}
            </p>
            <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 block line-clamp-1">
              Remanente por comprometer
            </span>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 line-clamp-1">
                Gasto Efectivo*
              </span>
              <div className="p-1.5 sm:p-2.5 bg-slate-100 rounded-lg sm:rounded-xl text-slate-600 shrink-0">
                <Receipt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-base sm:text-xl font-bold text-slate-900 tracking-tight truncate">
              {formatCurrency(totals.gasto)}
            </p>
            <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 block line-clamp-1">
              Tras rendición de cuentas
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/50 text-xs uppercase tracking-wider font-semibold text-slate-500">
                  <th className="py-4 px-6">Genérica de Gasto</th>
                  <th className="py-4 px-6 text-right">Presupuesto Aprobado</th>
                  <th className="py-4 px-6 text-right">
                    Presupuesto Ejecutado
                  </th>
                  <th className="py-4 px-6 text-right">Saldo</th>
                  <th className="py-4 px-6 text-right">Gasto Efectivo*</th>
                  <th className="py-4 px-6 text-center">Avance</th>
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
                    <motion.tr
                      key={row.id || row.generica_gasto}
                      className="hover:bg-slate-50/70 transition-colors"
                      variants={rowVariants}
                      initial="initial"
                      whileInView="visible"
                      viewport={{ once: true, amount: "some" }}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200/60">
                            {row.generica_gasto}
                          </span>
                          {row.descripcion && (
                            <span className="text-xs sm:text-sm font-medium text-slate-700">
                              {row.descripcion}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right font-medium text-slate-700 text-xs sm:text-sm">
                        {formatCurrency(aprobado)}
                      </td>

                      <td className="py-4 px-6 text-right font-semibold text-slate-900 text-xs sm:text-sm">
                        {formatCurrency(ejecutado)}
                      </td>

                      <td className="py-4 px-6 text-right font-medium text-emerald-600 text-xs sm:text-sm">
                        {formatCurrency(saldo)}
                      </td>

                      <td className="py-4 px-6 text-right font-medium text-slate-600 text-xs sm:text-sm">
                        {formatCurrency(gasto)}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2.5">
                          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                            <motion.div
                              className="h-full bg-brand-primary rounded-full origin-left"
                              variants={barVariants}
                              custom={rowPercentage}
                            />
                          </div>
                          <span className="text-xs font-bold font-mono text-slate-600 w-12 text-right">
                            {rowPercentage}%
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 bg-slate-50/80 font-bold text-xs sm:text-sm text-slate-900">
                  <td className="py-4 px-6 flex items-center gap-2.5">
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
      </motion.div>
    </SectionContainer>
  );
}
