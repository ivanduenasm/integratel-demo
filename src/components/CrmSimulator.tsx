import { Users, Activity } from "lucide-react";

const customers = [
  {
    name: "Jeniffer Diaz",
    id: "12345678",
    city: "Lima",
    locality: "San Isidro",
    plan: "300 Megabytes",
    equipment: "1 router Wifi",
    status: "ACTIVE"
  },
  {
    name: "Ivan Dueñas",
    id: "87654321",
    city: "Trujillo",
    locality: "Covicorti",
    plan: "500 Megabytes + Wintv L1max",
    equipment: "1 router Wifi y un extensor",
    status: "ACTIVE"
  },
  {
    name: "Andres Ramirez",
    id: "74125896",
    city: "Piura",
    locality: "Las colinas",
    plan: "1000 Megabytes",
    equipment: "1 router Wifi y un extensor",
    status: "ACTIVE"
  },
  {
    name: "Oscar Sanchez",
    id: "86420246",
    city: "Arequipa",
    locality: "Sachaca",
    plan: "750Megabytes + Wintv L1max + wingames",
    equipment: "1 router Wifi y un extensor",
    status: "ACTIVE"
  }
];

export default function CrmSimulator() {
  return (
    <div className="w-full h-full flex flex-col p-6 lg:p-10 border-r border-[#2C2C30] bg-[#0E0E10] text-gray-200 relative overflow-y-auto hidden-scrollbar">
      {/* Decorative left accent line */}
      <div className="absolute left-0 top-12 bottom-12 w-[2px] bg-gradient-to-b from-[#8C52FF] via-[#5CE1E6] to-transparent rounded-r-lg" />
      
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold flex items-center gap-3 text-white">
           CRM <span className="text-[#8C52FF]">Simulador</span>
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          Datos de clientes para interactuar
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {customers.map((c, idx) => (
          <div 
            key={idx} 
            className="group relative p-5 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#8C52FF]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#8C52FF]/10 overflow-hidden"
          >
            {/* Subtle highlight effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8C52FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="font-bold text-lg text-white group-hover:text-[#5CE1E6] transition-colors">{c.name}</h3>
              <span className="text-[10px] font-bold px-3 py-1 bg-white/10 text-gray-300 rounded-full flex items-center gap-1.5 uppercase tracking-wider border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {c.status}
              </span>
            </div>
            
            <div className="grid gap-y-2 text-sm text-gray-300 relative z-10">
              <div className="flex items-start">
                <span className="font-semibold text-white w-20 shrink-0">Cédula:</span>
                <span className="text-gray-400 font-mono tracking-wide">{c.id}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-white w-20 shrink-0">Plan:</span>
                <span className="text-gray-400 leading-snug">{c.plan}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-white w-20 shrink-0">Ciudad:</span>
                <span className="text-gray-400">{c.city}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-white w-20 shrink-0">Zona:</span>
                <span className="text-gray-400">{c.locality}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-[#8C52FF] w-20 shrink-0">Equipos:</span>
                <span className="text-[#8C52FF]/80 text-xs mt-0.5">{c.equipment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
