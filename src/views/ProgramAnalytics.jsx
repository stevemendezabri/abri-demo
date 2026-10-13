/**
 * ============================================================================
 * COMPONENT: ProgramAnalytics
 * ============================================================================
 * Description: Cross-domain metrics for Permits, Water Quality Compliance, 
 * and Environmental Mitigation[cite: 6]. */

import React, { useMemo } from 'react';
import { permitTrackerData } from '../config/permittracker.config';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { FileText, Droplets, Trees, AlertTriangle } from 'lucide-react';
import { waterQualityData } from '../config/waterquality.config';
import StatCard from '../components/StatCard';

// Parsed SQL values from SEED_TREES_DATA
const treeDataRaw = [
  { species: 'Live Oak', dbh: 28, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' },
  { species: 'Live Oak', dbh: 18, status: 'To Be Removed', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Cedar Elm', dbh: 22, status: 'To Be Removed', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Pecan', dbh: 31, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' },
  { species: 'Ashe Juniper', dbh: 9, status: 'To Remain', tree_type: 'Not Protected', permit_pathway: 'General Permit' },
  { species: 'Bald Cypress', dbh: 18, status: 'To Be Removed', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Crepe Myrtle', dbh: 4, status: 'Recently Planted', tree_type: 'Not Protected', permit_pathway: 'N/A' },
  { species: 'Live Oak', dbh: 28, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' },
  { species: 'Cedar Elm', dbh: 21, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Pecan', dbh: 32, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' },
  { species: 'Crepe Myrtle', dbh: 8, status: 'Recently Planted', tree_type: 'Not Protected', permit_pathway: 'N/A' },
  { species: 'Ashe Juniper', dbh: 14, status: 'To Be Removed', tree_type: 'Not Protected', permit_pathway: 'General Permit' },
  { species: 'Bald Cypress', dbh: 22, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Heritage Live Oak', dbh: 36, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' },
  { species: 'Texas Ash', dbh: 19, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'American Elm', dbh: 25, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' },
  { species: 'Bur Oak', dbh: 20, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Live Oak', dbh: 30, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' },
  { species: 'Cedar Elm', dbh: 19, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Crepe Myrtle', dbh: 9, status: 'Recently Planted', tree_type: 'Not Protected', permit_pathway: 'N/A' },
  { species: 'Live Oak', dbh: 35, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' },
  { species: 'American Elm', dbh: 20, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Pecan', dbh: 22, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Pecan', dbh: 26, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' },
  { species: 'Chinquapin Oak', dbh: 22, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Ashe Juniper', dbh: 11, status: 'To Be Removed', tree_type: 'Not Protected', permit_pathway: 'General Permit' },
  { species: 'Bald Cypress', dbh: 21, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Pecan', dbh: 23, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Live Oak', dbh: 31, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' },
  { species: 'Cedar Elm', dbh: 22, status: 'To Remain', tree_type: 'Protected', permit_pathway: 'Site Plan Permit' },
  { species: 'Bur Oak', dbh: 25, status: 'To Be Removed', tree_type: 'Heritage', permit_pathway: 'Site Plan Permit' }
];

const RISK_COLORS = { Low: '#10B981', Medium: '#F59E0B', High: '#EF4444' };

const ProgramAnalytics = () => {
  // Aggregate Permits by Segment and Risk Level
  const permitSegmentData = useMemo(() => {
    const acc = {};
    permitTrackerData.forEach((p) => {
      const seg = p.segment || 'Unknown';
      if (!acc[seg]) acc[seg] = { segment: seg, High: 0, Medium: 0, Low: 0 };
      const risk = p.risk || 'Low';
      acc[seg][risk] = (acc[seg][risk] || 0) + 1;
    });
    return Object.values(acc);
  }, []);

  // Aggregate Permits by Risk Overall
  const permitRiskData = useMemo(() => {
    const acc = { High: 0, Medium: 0, Low: 0 };
    permitTrackerData.forEach((p) => {
      if (acc[p.risk] !== undefined) acc[p.risk]++;
    });
    return Object.entries(acc).map(([name, value]) => ({ name, value }));
  }, []);

  // Aggregate Water Quality Volume and Impervious Cover by Watershed
  const waterQualityWatershedData = useMemo(() => {
    const acc = {};
    waterQualityData.forEach((item) => {
      const ws = item.watershed;
      const vol = parseInt(item.treatmentVol.replace(/[^0-9]/g, ''), 10) || 0;
      const ic = parseInt(item.impCoverAdded.replace(/[^0-9]/g, ''), 10) || 0;
      if (!acc[ws]) acc[ws] = { watershed: ws, treatmentVol: 0, impCover: 0 };
      acc[ws].treatmentVol += vol;
      acc[ws].impCover += ic;
    });
    return Object.values(acc);
  }, []);

  // Aggregate Trees by Protection Classification and Removal Status
  const treeClassificationData = useMemo(() => {
    const acc = {};
    treeDataRaw.forEach((t) => {
      const type = t.tree_type;
      if (!acc[type]) acc[type] = { tree_type: type, 'To Be Removed': 0, 'To Remain': 0, 'Recently Planted': 0 };
      acc[type][t.status] = (acc[type][t.status] || 0) + 1;
    });
    return Object.values(acc);
  }, []);

  // Overall KPI Counters
  const totalPermits = permitTrackerData.length;
  const highRiskPermits = permitTrackerData.filter((p) => p.risk === 'High').length;
  const totalImpCover = waterQualityWatershedData.reduce((sum, d) => sum + d.impCover, 0);
  const totalTreesRemoved = treeDataRaw.filter((t) => t.status === 'To Be Removed').length;

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Program Analytics</h1>
        <p className="text-slate-500 text-sm">
          Cross-domain metrics for Permits, Water Quality Compliance, and Environmental Mitigation[cite: 6].
        </p>
      </div>

      {/* Metric Cards using StatCard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <StatCard
            label="Total Permits Tracked"
            value={totalPermits}
            color="border-l-4 border-blue-500"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg w-fit mt-2">
              <FileText size={20} />
            </div>
          </StatCard>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <StatCard
            label="High Risk Permits"
            value={highRiskPermits}
            color="border-l-4 border-red-500"
          >
            <div className="p-3 bg-red-50 text-red-600 rounded-lg w-fit mt-2">
              <AlertTriangle size={20} />
            </div>
          </StatCard>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <StatCard
            label="Add'l Imp. Cover (SF)"
            value={totalImpCover.toLocaleString()}
            color="border-l-4 border-cyan-500"
          >
            <div className="p-3 bg-cyan-50 text-cyan-600 rounded-lg w-fit mt-2">
              <Droplets size={20} />
            </div>
          </StatCard>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <StatCard
            label="Trees Marked Removal"
            value={totalTreesRemoved}
            color="border-l-4 border-emerald-500"
          >
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg w-fit mt-2">
              <Trees size={20} />
            </div>
          </StatCard>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Permits by Segment & Risk */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-base font-semibold mb-1">Permit Risk Distribution by Segment</h2>
          <p className="text-xs text-slate-500 mb-4">Volume of permits grouped by track segment and risk level.</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={permitSegmentData} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="segment" 
                  tick={({ x, y, payload }) => {
                    const text = payload.value.length > 18 ? `${payload.value.substring(0, 15)}...` : payload.value;
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <text
                          x={0}
                          y={0}
                          dy={12}
                          textAnchor="end"
                          fill="#64748B"
                          fontSize={11}
                          transform="rotate(-25)"
                        >
                          <title>{payload.value}</title>
                          {text}
                        </text>
                      </g>
                    );
                  }} 
                  interval={0} 
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  align="center" 
                  wrapperStyle={{ position: 'relative', marginTop: '20px', fontSize: 12 }} 
                />
                <Bar dataKey="High" stackId="a" fill={RISK_COLORS.High} />
                <Bar dataKey="Medium" stackId="a" fill={RISK_COLORS.Medium} />
                <Bar dataKey="Low" stackId="a" fill={RISK_COLORS.Low} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overall Permit Risk Pie Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-base font-semibold mb-1">Overall Permit Risk Breakdown</h2>
          <p className="text-xs text-slate-500 mb-4">Ratio of high, medium, and low risk permits.</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={permitRiskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {permitRiskData.map((entry) => (
                    <Cell key={entry.name} fill={RISK_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Quality Volume Area Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-base font-semibold mb-1">Water Quality Treatment Volume by Watershed</h2>
          <p className="text-xs text-slate-500 mb-4">Required retention volume (CF) across watersheds.</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={waterQualityWatershedData} margin={{ top: 10, right: 10, left: 10, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="watershed" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="treatmentVol" stroke="#0284C7" fill="#BAE6FD" name="Treatment Vol (CF)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tree Mitigation Status */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-base font-semibold mb-1">Tree Status by Protection Class</h2>
          <p className="text-xs text-slate-500 mb-4">Impact status across heritage, protected, and non-protected trees.</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={treeClassificationData} margin={{ top: 10, right: 10, left: 0, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="tree_type" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="To Be Removed" fill="#EF4444" />
                <Bar dataKey="To Remain" fill="#10B981" />
                <Bar dataKey="Recently Planted" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramAnalytics;