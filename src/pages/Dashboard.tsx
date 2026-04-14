import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShoppingCart, Truck, Box, PieChart, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatNumber } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const { invoices } = useAppContext();

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalDebt = invoices.reduce((sum, inv) => sum + inv.debt, 0);
  const totalOrders = invoices.length;

  return (
    <div className="h-full overflow-y-auto px-4 md:px-0 py-6 md:py-0">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-8 rounded-xl text-white shadow-lg relative overflow-hidden group border border-blue-500/20">
          <div className="relative z-10">
            <p className="text-blue-100 text-[11px] font-bold uppercase tracking-[0.2em] mb-2 opacity-90">Doanh thu hệ thống</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tighter drop-shadow-md">{formatNumber(totalRevenue)}đ</h2>
            <div className="flex gap-6">
              <div className="bg-white/10 backdrop-blur-md px-8 py-5 rounded-lg border border-white/20 shadow-xl">
                <p className="text-[10px] font-bold uppercase opacity-70 mb-1 text-center tracking-widest">Đơn bán</p>
                <p className="font-bold text-3xl tracking-tighter text-center">{totalOrders}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-8 py-5 rounded-lg border border-white/20 shadow-xl">
                <p className="text-[10px] font-bold uppercase opacity-70 mb-1 text-center tracking-widest">Nợ khách</p>
                <p className="font-bold text-3xl text-orange-300 tracking-tighter text-center">{formatNumber(totalDebt)}đ</p>
              </div>
            </div>
          </div>
          <TrendingUp className="absolute bottom-0 right-0 text-white/5 translate-y-1/4 translate-x-1/4 rotate-12 transition-transform duration-1000 group-hover:scale-110" size={280} />
        </div>
        
        <div className="hidden md:grid grid-rows-2 gap-4">
          <Link to="/pos" className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-5 hover:border-blue-400 hover:shadow-md transition-all active:scale-95 group shadow-sm">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center group-hover:rotate-3 transition-transform shadow-sm border border-orange-100">
              <ShoppingCart size={32} />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800 text-sm tracking-tight">Bán hàng</p>
              <p className="text-[11px] text-slate-400 font-medium">Tạo hóa đơn POS nhanh</p>
            </div>
          </Link>
          <Link to="/import" className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-5 hover:border-indigo-400 hover:shadow-md transition-all active:scale-95 group shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center group-hover:rotate-3 transition-transform shadow-sm border border-indigo-100">
              <Truck size={32} />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-800 text-sm tracking-tight">Nhập hàng</p>
              <p className="text-[11px] text-slate-400 font-medium">Tạo phiếu nhập kho</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:hidden">
        <Link to="/pos" className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center gap-3 active:scale-95 shadow-sm">
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center shadow-sm border border-orange-100">
            <ShoppingCart size={24} />
          </div>
          <span className="font-bold text-slate-700 text-[10px] tracking-wider">Bán hàng</span>
        </Link>
        <Link to="/inventory" className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center gap-3 active:scale-95 shadow-sm">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shadow-sm border border-blue-100">
            <Box size={24} />
          </div>
          <span className="font-bold text-slate-700 text-[10px] tracking-wider">Kho hàng</span>
        </Link>
        <Link to="/reports" className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center gap-3 active:scale-95 shadow-sm">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shadow-sm border border-emerald-100">
            <PieChart size={24} />
          </div>
          <span className="font-bold text-slate-700 text-[10px] tracking-wider">Lợi nhuận</span>
        </Link>
        <Link to="/customers" className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center gap-3 active:scale-95 shadow-sm">
          <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center shadow-sm border border-pink-100">
            <Users size={24} />
          </div>
          <span className="font-bold text-slate-700 text-[10px] tracking-wider">Khách hàng</span>
        </Link>
      </div>
    </div>
  );
};
