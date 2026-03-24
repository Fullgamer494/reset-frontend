"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAdminMetrics, AdminMetrics } from "@/lib/api/admin";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line 
} from "recharts";
import Link from "next/link";

const COLORS = ["#0ea5e9", "#ef4444", "#10b981", "#f59e0b", "#6366f1"];

export default function AdminDashboard() {
  const { user, isRestoring } = useAuth();
  const router = useRouter();
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isRestoring) {
      if (!user || user.role !== "ADMIN") {
        router.push("/login");
      } else {
        fetchMetrics();
      }
    }
  }, [user, isRestoring, router]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const data = await getAdminMetrics();
      setMetrics(data);
    } catch (err: any) {
      console.error("Error fetching metrics:", err);
      setError("No se pudieron cargar las métricas reales. Usando datos de respaldo.");
      // Mock data for demo/fallback
      setMetrics({
        totalUsers: 254,
        activeUsers: 189,
        padrinosCount: 42,
        adictosCount: 212,
        registrationsTrend: [
          { name: "Lun", users: 12 },
          { name: "Mar", users: 19 },
          { name: "Mie", users: 15 },
          { name: "Jue", users: 22 },
          { name: "Vie", users: 30 },
          { name: "Sab", users: 25 },
          { name: "Dom", users: 18 },
        ],
        moodStats: [
          { name: "Feliz", value: 45 },
          { name: "Ansioso", value: 25 },
          { name: "Motivado", value: 20 },
          { name: "Triste", value: 10 },
        ],
        relapsesHistory: [
          { date: "2024-03-18", count: 2 },
          { date: "2024-03-19", count: 1 },
          { date: "2024-03-20", count: 0 },
          { date: "2024-03-21", count: 3 },
          { date: "2024-03-22", count: 1 },
          { date: "2024-03-23", count: 2 },
          { date: "2024-03-24", count: 0 },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (isRestoring || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Panel de Control Admin</h1>
          <p className="text-slate-500 mt-1">Monitoreo global de la plataforma ReSet</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchMetrics} 
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            Sincronizar Datos
          </button>
          <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
            {user.name.charAt(0)}
          </div>
        </div>
      </header>

      {error && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
          </svg>
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Usuarios Totales" value={metrics?.totalUsers ?? 0} icon="👥" color="text-sky-600" />
        <StatCard title="Usuarios Activos" value={metrics?.activeUsers ?? 0} icon="⚡" color="text-emerald-600" />
        <StatCard title="Padri-nos" value={metrics?.padrinosCount ?? 0} icon="🤝" color="text-indigo-600" />
        <StatCard title="Adictos en Proceso" value={metrics?.adictosCount ?? 0} icon="🌱" color="text-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Registration Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 font-display">Tendencia de Registros (Semanal)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.registrationsTrend}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 font-display">Distribución de Estados de Ánimo</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics?.moodStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {metrics?.moodStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-sm text-slate-400 uppercase font-bold tracking-widest">Predominante</span>
              <span className="text-2xl font-black text-sky-500">Feliz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Relapse Trend Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-10">
        <h3 className="text-lg font-bold text-slate-800 mb-6 font-display">Reporte de Recaídas (Últimos 7 días)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics?.relapsesHistory}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="count" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <footer className="mt-12 text-center text-slate-400 text-xs">
        &copy; 2024 ReSet System · Panel de Administración Privado
      </footer>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global</span>
      </div>
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
      <p className={`text-4xl font-extrabold ${color}`}>{value}</p>
    </div>
  );
}
