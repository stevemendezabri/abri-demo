/**
 * ============================================================================
 * CONFIGURATION: Water Quality Config
 * ============================================================================
 * Description: Contains tabular calculation data, SCM metrics, permit datasets,
 * calculation notes, and acronym definitions for the Water Quality Dashboard.
 */

/* ==========================================
   1. OVERALL WATER QUALITY TREATMENT REQUIRED
   ========================================== */
export const treatmentRequiredData = {
  headers: ['Watershed Classification', 'New IC (AC)', 'Redeveloped IC (AC)', 'Removed and Decompacted IC (AC)', 'Net IC Requiring Treatment (AC)'],
  rows: [
    { classification: 'Urban Watersheds', newIc: '12.02', redevelopedIc: '46.64', removedIc: '5.69', netIc: '52.97' },
    { classification: 'Suburban Watersheds', newIc: '12.73', redevelopedIc: '14.98', removedIc: '4.98', netIc: '22.73' },
    { classification: 'Total', newIc: '24.75', redevelopedIc: '61.62', removedIc: '10.67', netIc: '75.70' }
  ]
};

/* ==========================================
   2. OVERALL WATER QUALITY TREATMENT PROVIDED
   ========================================== */
export const treatmentProvidedData = {
  headers: ['Watershed Classification', 'Water Quality Ponds (AC)', 'Ecotrack (AC)', 'Total IC Treated by SCMs (AC)', 'IC Requiring Payment in Lieu (AC)'],
  rows: [
    { classification: 'Urban Watersheds', ponds: '10.90', ecotrack: '0.98', totalScm: '11.88', paymentInLieu: '28.42' },
    { classification: 'Suburban Watersheds', ponds: '33.01', ecotrack: '2.38', totalScm: '35.40', paymentInLieu: '0.00' },
    { classification: 'Total', ponds: '43.91', ecotrack: '3.36', totalScm: '47.27', paymentInLieu: '28.42' }
  ]
};

/* ==========================================
   3. TREATMENT PROVIDED AT PONDS DATA
   ========================================== */
export const pondsProvidedData = [
  { scmId: 'S Congress Ave/College Ave', classification: 'Urban', scmType: 'Full Sedimentation-Filtration', da: '3.90', onSiteIc: '1.69', offSiteIc: '1.49', totalIc: '3.18', captureDepth: '1.10', reqVol: '15,825', provVol: '22,400', bmpdf: '1.00', wqCredit: '3.18' },
  { scmId: 'S Congress Ave/Bartlett St', classification: 'Urban', scmType: 'Partial Sedimentation-Filtration', da: '3.08', onSiteIc: '0.94', offSiteIc: '1.32', totalIc: '2.26', captureDepth: '1.03', reqVol: '11,565', provVol: '11,000', bmpdf: '0.95', wqCredit: '2.15' },
  { scmId: 'S Congress Ave/E Bouldin', classification: 'Urban', scmType: 'Partial Sedimentation-Filtration', da: '61.50', onSiteIc: '8.06', offSiteIc: '31.05', totalIc: '39.11', captureDepth: '0.93', reqVol: '209,038', provVol: '29,800', bmpdf: '0.14', wqCredit: '5.58' },
  { scmId: 'E Riverside Dr/Arise Dr', classification: 'Suburban', scmType: 'Partial Sedimentation-Filtration', da: '35.15', onSiteIc: '1.52', offSiteIc: '11.25', totalIc: '12.77', captureDepth: '0.86', reqVol: '84,636', provVol: '68,000', bmpdf: '0.80', wqCredit: '10.25' },
  { scmId: 'E Riverside Dr/S Pleasant Valley Rd', classification: 'Suburban', scmType: 'Multiple Partial Sedimentation-Filtration in Series', da: '37.89', onSiteIc: '5.84', offSiteIc: '20.68', totalIc: '26.52', captureDepth: '1.00', reqVol: '137,532', provVol: '118,000', bmpdf: '0.86', wqCredit: '22.75' }
];

/* ==========================================
   4. TREATMENT PROVIDED BY ECO-TRACK DATA
   ========================================== */
export const ecoTrackProvidedData = [
  { classification: 'Urban Watersheds', ecotrackLf: '3,216', drainageArea: '1.89', treatedIc: '1.55', reqCaptureDepth: '1.08', reqVol: '7,768', provVol: '4,827', bmpdf: '0.63', wqCredit: '0.98' },
  { classification: 'Suburban Watersheds', ecotrackLf: '7,824', drainageArea: '4.85', treatedIc: '3.77', reqCaptureDepth: '1.08', reqVol: '18,973', provVol: '11,986', bmpdf: '0.63', wqCredit: '2.38' },
  { classification: 'Total', ecotrackLf: '11,040', drainageArea: '', treatedIc: '', reqCaptureDepth: '', reqVol: '', provVol: '', bmpdf: '', wqCredit: '3.36' }
];

/* ==========================================
   5. PERMIT-LEVEL WATER QUALITY DATASET
   ========================================== */
export const waterQualityData = [
  { id: 'WQ-PERMIT-101', segment: 'Segment 1: 38th to MLK', watershed: 'Shoal Creek', bmpType: 'Biofiltration Pond', impCoverAdded: '+42,500 SF', treatmentVol: '18,200 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-102', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Waller Creek', bmpType: 'Permeable Pavement', impCoverAdded: '+88,100 SF', treatmentVol: '32,400 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-103', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Rain Garden / Vegetated Filter', impCoverAdded: '+15,000 SF', treatmentVol: '8,500 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-104', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'Country Club West', bmpType: 'Wet Pond', impCoverAdded: '+112,000 SF', treatmentVol: '45,000 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-105', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'East Bouldin Creek', bmpType: 'Sand Filter Vault', impCoverAdded: '+117,000 SF', treatmentVol: '36,000 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-106', segment: 'Segment 1: 38th to MLK', watershed: 'Waller Creek', bmpType: 'Biofiltration Pond', impCoverAdded: '+54,200 SF', treatmentVol: '21,500 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-107', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Shoal Creek', bmpType: 'Sand Filter Vault', impCoverAdded: '+78,900 SF', treatmentVol: '29,800 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-108', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Wet Pond', impCoverAdded: '+135,000 SF', treatmentVol: '52,100 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-109', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'East Bouldin Creek', bmpType: 'Permeable Pavement', impCoverAdded: '+31,400 SF', treatmentVol: '12,600 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-110', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'Country Club West', bmpType: 'Rain Garden / Vegetated Filter', impCoverAdded: '+19,800 SF', treatmentVol: '9,200 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-111', segment: 'Segment 1: 38th to MLK', watershed: 'Waller Creek', bmpType: 'Biofiltration Pond', impCoverAdded: '+94,600 SF', treatmentVol: '38,400 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-112', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Shoal Creek', bmpType: 'Sand Filter Vault', impCoverAdded: '+62,300 SF', treatmentVol: '24,100 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-113', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Retention Basin', impCoverAdded: '+105,400 SF', treatmentVol: '41,000 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-114', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'East Bouldin Creek', bmpType: 'Biofiltration Pond', impCoverAdded: '+48,700 SF', treatmentVol: '19,300 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-115', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'Country Club West', bmpType: 'Permeable Pavement', impCoverAdded: '+27,900 SF', treatmentVol: '10,800 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-116', segment: 'Segment 1: 38th to MLK', watershed: 'Waller Creek', bmpType: 'Wet Pond', impCoverAdded: '+89,000 SF', treatmentVol: '34,500 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-117', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Shoal Creek', bmpType: 'Sand Filter Vault', impCoverAdded: '+142,100 SF', treatmentVol: '56,200 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-118', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Biofiltration Pond', impCoverAdded: '+22,300 SF', treatmentVol: '11,400 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-119', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'East Bouldin Creek', bmpType: 'Rain Garden / Vegetated Filter', impCoverAdded: '+36,800 SF', treatmentVol: '14,900 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-120', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'Country Club West', bmpType: 'Permeable Pavement', impCoverAdded: '+41,200 SF', treatmentVol: '16,700 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-121', segment: 'Segment 1: 38th to MLK', watershed: 'Waller Creek', bmpType: 'Biofiltration Pond', impCoverAdded: '+51,000 SF', treatmentVol: '20,400 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-122', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Shoal Creek', bmpType: 'Rain Garden / Vegetated Filter', impCoverAdded: '+64,500 SF', treatmentVol: '25,800 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-123', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Sand Filter Vault', impCoverAdded: '+18,200 SF', treatmentVol: '7,300 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-124', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'East Bouldin Creek', bmpType: 'Wet Pond', impCoverAdded: '+128,000 SF', treatmentVol: '51,200 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-125', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'Country Club West', bmpType: 'Permeable Pavement', impCoverAdded: '+93,400 SF', treatmentVol: '37,300 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-126', segment: 'Segment 1: 38th to MLK', watershed: 'Waller Creek', bmpType: 'Retention Basin', impCoverAdded: '+39,500 SF', treatmentVol: '15,800 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-127', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Shoal Creek', bmpType: 'Biofiltration Pond', impCoverAdded: '+82,100 SF', treatmentVol: '32,800 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-128', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Permeable Pavement', impCoverAdded: '+11,900 SF', treatmentVol: '4,700 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-129', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'East Bouldin Creek', bmpType: 'Sand Filter Vault', impCoverAdded: '+156,000 SF', treatmentVol: '62,400 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-130', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'Country Club West', bmpType: 'Wet Pond', impCoverAdded: '+74,200 SF', treatmentVol: '29,600 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-131', segment: 'Segment 1: 38th to MLK', watershed: 'Waller Creek', bmpType: 'Rain Garden / Vegetated Filter', impCoverAdded: '+45,000 SF', treatmentVol: '18,000 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-132', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Shoal Creek', bmpType: 'Sand Filter Vault', impCoverAdded: '+91,000 SF', treatmentVol: '36,400 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-133', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Biofiltration Pond', impCoverAdded: '+29,500 SF', treatmentVol: '11,800 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-134', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'East Bouldin Creek', bmpType: 'Permeable Pavement', impCoverAdded: '+118,000 SF', treatmentVol: '47,200 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-135', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'Country Club West', bmpType: 'Retention Basin', impCoverAdded: '+81,600 SF', treatmentVol: '32,600 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-136', segment: 'Segment 1: 38th to MLK', watershed: 'Waller Creek', bmpType: 'Wet Pond', impCoverAdded: '+67,300 SF', treatmentVol: '26,900 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-137', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Shoal Creek', bmpType: 'Biofiltration Pond', impCoverAdded: '+53,400 SF', treatmentVol: '21,300 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-138', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Sand Filter Vault', impCoverAdded: '+24,000 SF', treatmentVol: '9,600 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-139', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'East Bouldin Creek', bmpType: 'Rain Garden / Vegetated Filter', impCoverAdded: '+139,000 SF', treatmentVol: '55,600 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-140', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'Country Club West', bmpType: 'Permeable Pavement', impCoverAdded: '+62,000 SF', treatmentVol: '24,800 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-141', segment: 'Segment 1: 38th to MLK', watershed: 'Waller Creek', bmpType: 'Sand Filter Vault', impCoverAdded: '+47,800 SF', treatmentVol: '19,100 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-142', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Shoal Creek', bmpType: 'Retention Basin', impCoverAdded: '+71,200 SF', treatmentVol: '28,400 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-143', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Biofiltration Pond', impCoverAdded: '+16,500 SF', treatmentVol: '6,600 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-144', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'East Bouldin Creek', bmpType: 'Wet Pond', impCoverAdded: '+102,300 SF', treatmentVol: '40,900 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-145', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'Country Club West', bmpType: 'Rain Garden / Vegetated Filter', impCoverAdded: '+88,900 SF', treatmentVol: '35,500 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-146', segment: 'Segment 1: 38th to MLK', watershed: 'Waller Creek', bmpType: 'Permeable Pavement', impCoverAdded: '+58,400 SF', treatmentVol: '23,300 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-147', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Shoal Creek', bmpType: 'Biofiltration Pond', impCoverAdded: '+96,100 SF', treatmentVol: '38,400 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-148', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Sand Filter Vault', impCoverAdded: '+21,000 SF', treatmentVol: '8,400 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-149', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'East Bouldin Creek', bmpType: 'Retention Basin', impCoverAdded: '+114,500 SF', treatmentVol: '45,800 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-150', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'Country Club West', bmpType: 'Wet Pond', impCoverAdded: '+69,800 SF', treatmentVol: '27,900 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-151', segment: 'Segment 1: 38th to MLK', watershed: 'Waller Creek', bmpType: 'Rain Garden / Vegetated Filter', impCoverAdded: '+33,200 SF', treatmentVol: '13,200 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-152', segment: 'Segment 2: MLK to Cesar Chavez', watershed: 'Shoal Creek', bmpType: 'Permeable Pavement', impCoverAdded: '+84,000 SF', treatmentVol: '33,600 CF', status: 'Action Required' },
  { id: 'WQ-PERMIT-153', segment: 'Segment 3: Bridge', watershed: 'Lady Bird Lake', bmpType: 'Biofiltration Pond', impCoverAdded: '+27,100 SF', treatmentVol: '10,800 CF', status: 'Approved' },
  { id: 'WQ-PERMIT-154', segment: 'Segment 4: Riverside Split to S. Oltorf', watershed: 'East Bouldin Creek', bmpType: 'Sand Filter Vault', impCoverAdded: '+123,400 SF', treatmentVol: '49,300 CF', status: 'In Review' },
  { id: 'WQ-PERMIT-155', segment: 'Segment 5: Riverside Split to Pleasant Valley', watershed: 'Country Club West', bmpType: 'Biofiltration Pond', impCoverAdded: '+79,000 SF', treatmentVol: '31,600 CF', status: 'Approved' }
];

/* ==========================================
   6. CALCULATION NOTES & COMPLIANCE GUIDELINES
   ========================================== */
export const notesList = [
  "WATER QUALITY SITE AREA DEFINED AS ROW TO ROW THROUGHOUT THE LIMITS OF THE PROJECT.",
  "TOTAL TREATED IC BY PONDS INCLUDES BOTH ON-SITE AND OFF-SITE IMPERVIOUS AREA. ALLOWABLE TREATMENT OF OFF-SITE EQUIVALENT AREA IS STILL UNDER REVIEW WITH AUSTIN WATERSHED PROTECTION.",
  "OFF-SITE IMPERVIOUS COVER IS BASED ON CITY OF AUSTIN IMPERVIOUS COVER 2023 SHAPE FILE FROM PROPERTY PROFILE. ON-SITE IMPERVIOUS COVER IS BASED ON THE PROPOSED ROADWAY AND TRACK DESIGN FILES.",
  "IMPERVIOUS COVER CALCULATIONS EXCLUDE SIDEWALK AND SHARED USE PATH WITHIN ROW AS STATED IN COA ECM SECTION 1.8.0.C. REMOVAL AND REPLACEMENT OF IMPERVIOUS COVER NECESSARY FOR THE INSTALLATION, REPAIR OR REPLACEMENT OF UTILITIES HAS BEEN EXCLUDED FROM THE REDEVELOPED IMPERVIOUS COVER IN ACCORDANCE WITH ECM 1.9.1.",
  "IMPERVIOUS COVER CALCULATIONS INCLUDE THE LRT EMBEDDED TRACK SLAB, THE LRT BRIDGES, AND THE TRACK SLAB PORTION OF ECO-TRACK.",
  "DETAILED SCM DESIGN IS NOT INCLUDED AS PART OF THIS SUBMITTAL. TO CALCULATE A PRELIMINARY WATER QUALITY VOLUME FOR EACH SCM, A UNIFORM PONDING DEPTH OF 3 FT WAS ASSUMED.",
  "PONDS ARE ASSUMED TO BE SEDIMENTATION-FILTRATION FOR CALCULATIONS.",
  "REFER TO THE DRAINAGE REPORT FOR DETAILED CALCULATIONS AND METHODOLOGY.",
  "THE ESTIMATED WATER QUALITY VOLUME (WQVI) PROVIDED BY ECO-TRACK WAS CALCULATED BY MODELING ALL LRT GUIDEWAY UTILIZING ECO-TRACK AS A CONTINUOUS RAIN GARDEN. A UNIFORM PONDING DEPTH OF 4 INCHES WAS ASSUMED ACROSS THE CONSTRAINED CROSS SECTION SHOWN IN THE TRACK DRAWINGS. THE RESULTING VOLUME WAS REDUCED BY A FACTOR OF ONE-THIRD (1/3) TO ACCOUNT FOR GRADING CONSTRAINTS AND THE PRESENCE OF INTERMITTENT WEIRS REQUIRED TO FACILITATE PONDING.",
  "PER CITY OF AUSTIN ORDINANCE NO. 20260521-055, APPROVED BY CITY COUNCIL ON MAY 21, 2026, THIS PROJECT IS AUTHORIZED TO DEMONSTRATE WATER QUALITY COMPLIANCE IN ACCORDANCE WITH LDC §25-8-1 ACROSS MULTIPLE SITE PLANS AND MULTIPLE WATERSHEDS."
];

/* ==========================================
   7. ACRONYM DEFINITIONS
   ========================================== */
export const acronyms = [
  { code: "WQ", label: "WATER QUALITY" },
  { code: "IC", label: "IMPERVIOUS COVER" },
  { code: "SCM", label: "STORMWATER CONTROL MEASURE" },
  { code: "BMPDF", label: "BEST MANAGEMENT PRACTICE DESIGN FACTOR" },
  { code: "LRT", label: "LIGHT RAIL TRANSIT" }
];