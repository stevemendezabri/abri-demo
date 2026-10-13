/**
 * ============================================================================
 * COMPONENT: TreatmentTables
 * ============================================================================
 * Description: Encapsulates acronym definitions, collapsible calculation notes, 
 * and the four overall water quality calculation & SCM treatment tables.
 */

import React, { useState } from 'react';
import { FileText, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import {
  treatmentRequiredData,
  treatmentProvidedData,
  pondsProvidedData,
  ecoTrackProvidedData,
  notesList,
  acronyms
} from '../config/waterquality.config.js';

export default function TreatmentTables() {
  /* ==========================================
     1. LOCAL STATE HOOKS
     ========================================== */
  const [isNotesOpen, setIsNotesOpen] = useState(false); // Toggle state for collapsible notes

  /* ==========================================
     2. COMPONENT RENDER
     ========================================== */
  return (
    <div className="space-y-6">
      
      {/* ------------------------------------------
         2.1 ACRONYMS & COLLAPSIBLE NOTES SECTION
         ------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Acronym Definitions Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100">
            <BookOpen className="w-4 h-3 text-amber-500" />
            <span>Acronym Definitions</span>
          </div>
          <ul className="space-y-2 text-xs">
            {acronyms.map((item) => (
              <li key={item.code} className="flex items-center justify-between border-b border-gray-50 pb-1">
                <span className="font-mono font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
                  {item.code}
                </span>
                <span className="font-semibold text-gray-700 text-right">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Collapsible Calculation Notes & Compliance Guidelines Section */}
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <button
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100/80 transition-colors border-b border-gray-200 text-left cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Calculation Notes & Compliance Guidelines
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                  10 Notes
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-amber-600 font-bold">
                <span>{isNotesOpen ? 'Hide Notes' : 'View Notes'}</span>
                {isNotesOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </button>

            {isNotesOpen && (
              <div className="p-4 bg-white text-xs text-gray-700 space-y-2.5 max-h-80 overflow-y-auto">
                {notesList.map((note, index) => (
                  <div key={index} className="flex items-start space-x-2 border-b border-gray-50 pb-2 last:border-b-0">
                    <span className="font-mono font-bold text-amber-600 text-right min-w-[20px]">
                      {index + 1}.
                    </span>
                    <p className="leading-relaxed uppercase text-[11px] font-medium text-gray-600">{note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {!isNotesOpen && (
            <div className="p-3 text-center text-xs text-gray-400 bg-white">
              Click <span className="font-semibold text-amber-600">View Notes</span> to expand all 10 calculation notes & guidelines.
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------
         2.2 TABLE 1: OVERALL TREATMENT REQUIRED
         ------------------------------------------ */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex justify-between items-center">
          <span>Overall Water Quality Treatment Required</span>
          <span className="text-gray-400 font-mono text-[10px]">A, B, C, D, B+C-D</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 font-bold text-gray-700 text-[10px]">
                <th className="p-2.5 border-r border-gray-200">A</th>
                <th className="p-2.5 border-r border-gray-200">B</th>
                <th className="p-2.5 border-r border-gray-200">C</th>
                <th className="p-2.5 border-r border-gray-200">D</th>
                <th className="p-2.5">B+C-D</th>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[10px]">
                <th className="p-2 border-r border-gray-200 font-semibold">Watershed Classification</th>
                <th className="p-2 border-r border-gray-200 font-semibold">New IC<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Redeveloped IC<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Removed and Decompacted IC<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 font-semibold">Net IC Requiring Treatment<br/><span className="text-[9px] text-gray-400">AC</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800 font-mono text-[11px]">
              {treatmentRequiredData.rows.map((r, idx) => (
                <tr key={idx} className={r.classification === 'Total' ? 'bg-gray-100 font-bold text-gray-900' : 'hover:bg-gray-50'}>
                  <td className="p-2.5 font-sans border-r border-gray-200 font-semibold">{r.classification}</td>
                  <td className="p-2.5 border-r border-gray-200">{r.newIc}</td>
                  <td className="p-2.5 border-r border-gray-200">{r.redevelopedIc}</td>
                  <td className="p-2.5 border-r border-gray-200">{r.removedIc}</td>
                  <td className="p-2.5 font-bold text-amber-700">{r.netIc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------
         2.3 TABLE 2: OVERALL TREATMENT PROVIDED
         ------------------------------------------ */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex justify-between items-center">
          <span>Overall Water Quality Treatment Provided</span>
          <span className="text-gray-400 font-mono text-[10px]">A, B, C, B+C</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 font-bold text-gray-700 text-[10px]">
                <th className="p-2.5 border-r border-gray-200">A</th>
                <th className="p-2.5 border-r border-gray-200">B</th>
                <th className="p-2.5 border-r border-gray-200">C</th>
                <th className="p-2.5 border-r border-gray-200">B+C</th>
                <th className="p-2.5">IC Requiring Payment in Lieu</th>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[10px]">
                <th className="p-2 border-r border-gray-200 font-semibold">Watershed Classification</th>
                <th className="p-2 border-r border-gray-200 font-semibold">Water Quality Ponds<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Ecotrack<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Total IC Treated by SCMs<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 font-semibold">IC Requiring Payment in Lieu (See Calc Sheet)<br/><span className="text-[9px] text-gray-400">AC</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800 font-mono text-[11px]">
              {treatmentProvidedData.rows.map((r, idx) => (
                <tr key={idx} className={r.classification === 'Total' ? 'bg-gray-100 font-bold text-gray-900' : 'hover:bg-gray-50'}>
                  <td className="p-2.5 font-sans border-r border-gray-200 font-semibold">{r.classification}</td>
                  <td className="p-2.5 border-r border-gray-200">{r.ponds}</td>
                  <td className="p-2.5 border-r border-gray-200">{r.ecotrack}</td>
                  <td className="p-2.5 border-r border-gray-200 font-semibold text-emerald-700">{r.totalScm}</td>
                  <td className="p-2.5 font-semibold text-purple-700">{r.paymentInLieu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------
         2.4 TABLE 3: PONDS TREATMENT SUMMARY
         ------------------------------------------ */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider">
          Summary of Water Quality Treatment Provided at Ponds
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 font-bold text-gray-700 text-[10px] text-center">
                <th className="p-2 border-r border-gray-200">A</th>
                <th className="p-2 border-r border-gray-200">B</th>
                <th className="p-2 border-r border-gray-200">C</th>
                <th className="p-2 border-r border-gray-200">D</th>
                <th className="p-2 border-r border-gray-200">E</th>
                <th className="p-2 border-r border-gray-200">F</th>
                <th className="p-2 border-r border-gray-200">G = E+F</th>
                <th className="p-2 border-r border-gray-200">H</th>
                <th className="p-2 border-r border-gray-200">I</th>
                <th className="p-2 border-r border-gray-200">J</th>
                <th className="p-2 border-r border-gray-200">K = J/I</th>
                <th className="p-2">L = K*G</th>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[10px]">
                <th className="p-2 border-r border-gray-200 font-semibold">SCM ID</th>
                <th className="p-2 border-r border-gray-200 font-semibold">Watershed Classification</th>
                <th className="p-2 border-r border-gray-200 font-semibold">SCM Type</th>
                <th className="p-2 border-r border-gray-200 font-semibold">DA<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">On-Site Treated IC<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Off-Site Treated IC<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Total Treated IC<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Required Capture Depth<br/><span className="text-[9px] text-gray-400">IN</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Required Volume<br/><span className="text-[9px] text-gray-400">CF</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Provided Volume<br/><span className="text-[9px] text-gray-400">CF</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">BMPDF</th>
                <th className="p-2 font-semibold">WQ IC Credit<br/><span className="text-[9px] text-gray-400">AC</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800 font-mono text-[11px]">
              {pondsProvidedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border-r border-gray-200 font-sans font-bold text-gray-900">{row.scmId}</td>
                  <td className="p-2 border-r border-gray-200 font-sans">{row.classification}</td>
                  <td className="p-2 border-r border-gray-200 font-sans text-gray-600">{row.scmType}</td>
                  <td className="p-2 border-r border-gray-200">{row.da}</td>
                  <td className="p-2 border-r border-gray-200">{row.onSiteIc}</td>
                  <td className="p-2 border-r border-gray-200">{row.offSiteIc}</td>
                  <td className="p-2 border-r border-gray-200 font-semibold">{row.totalIc}</td>
                  <td className="p-2 border-r border-gray-200">{row.captureDepth}</td>
                  <td className="p-2 border-r border-gray-200">{row.reqVol}</td>
                  <td className="p-2 border-r border-gray-200">{row.provVol}</td>
                  <td className="p-2 border-r border-gray-200">{row.bmpdf}</td>
                  <td className="p-2 font-bold text-amber-700">{row.wqCredit}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold text-gray-900">
                <td colSpan={11} className="p-2.5 font-sans border-r border-gray-200 text-right uppercase">TOTAL WQ IC CREDIT (AC)</td>
                <td className="p-2.5 font-mono text-emerald-700 text-xs">43.91</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------
         2.5 TABLE 4: ECO-TRACK TREATMENT SUMMARY
         ------------------------------------------ */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider">
          Summary of Water Quality Treatment Provided by Eco-Track
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 font-bold text-gray-700 text-[10px] text-center">
                <th className="p-2 border-r border-gray-200">A</th>
                <th className="p-2 border-r border-gray-200">B</th>
                <th className="p-2 border-r border-gray-200">C</th>
                <th className="p-2 border-r border-gray-200">D</th>
                <th className="p-2 border-r border-gray-200">E</th>
                <th className="p-2 border-r border-gray-200">F</th>
                <th className="p-2 border-r border-gray-200">G</th>
                <th className="p-2 border-r border-gray-200">H = G/F</th>
                <th className="p-2">I = H*D</th>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[10px]">
                <th className="p-2 border-r border-gray-200 font-semibold">Watershed Classification</th>
                <th className="p-2 border-r border-gray-200 font-semibold">Ecotrack<br/><span className="text-[9px] text-gray-400">LF</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Drainage Area (LRT Guideway)<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Treated IC (Track Slab)<br/><span className="text-[9px] text-gray-400">AC</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Required Capture Depth<br/><span className="text-[9px] text-gray-400">IN</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Required Volume<br/><span className="text-[9px] text-gray-400">CF</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">Provided Volume<br/><span className="text-[9px] text-gray-400">CF</span></th>
                <th className="p-2 border-r border-gray-200 font-semibold">BMPDF</th>
                <th className="p-2 font-semibold">WQ IC Credit<br/><span className="text-[9px] text-gray-400">AC</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800 font-mono text-[11px]">
              {ecoTrackProvidedData.map((row, idx) => (
                <tr key={idx} className={row.classification === 'Total' ? 'bg-gray-100 font-bold text-gray-900' : 'hover:bg-gray-50'}>
                  <td className="p-2.5 font-sans border-r border-gray-200 font-semibold">{row.classification}</td>
                  <td className="p-2.5 border-r border-gray-200">{row.ecotrackLf}</td>
                  <td className="p-2.5 border-r border-gray-200">{row.drainageArea}</td>
                  <td className="p-2.5 border-r border-gray-200">{row.treatedIc}</td>
                  <td className="p-2.5 border-r border-gray-200">{row.reqCaptureDepth}</td>
                  <td className="p-2.5 border-r border-gray-200">{row.reqVol}</td>
                  <td className="p-2.5 border-r border-gray-200">{row.provVol}</td>
                  <td className="p-2.5 border-r border-gray-200">{row.bmpdf}</td>
                  <td className="p-2.5 font-bold text-emerald-700">{row.wqCredit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}