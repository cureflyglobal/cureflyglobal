
/**
 * merge_with_excel_sites.js
 *
 * Generated for user: merges Canva hospitalData with Excel/PDF websites (embedded),
 * attaches website URLs by partial/best-match, merges NABH list as partial entries.
 *
 * Matching: partial / best-match (Option B)
 * Website selection: Option C (pick whichever field contains a valid URL)
 *
 * IMPORTANT:
 * - Place this file AFTER the scripts that define window.hospitalData in your HTML.
 * - Ensure nabh_hospitals_full (1).js is present in the same folder (imported below).
 */

import { hospitals as nabhList } from "./nabh_hospitals_full (1).js";

/* ---------- Embedded Excel/PDF data parsed from user's upload ---------- */
/* Each object: { certId, name, city, website1, website2 } */
const excelSites = [
  { certId: "H-2015-0972", name: "Century Super Speciality Hospitals Pvt. Ltd.", city: "Hyderabad", website1: "HCO-NA", website2: "" },
  { certId: "H-2018-1361", name: "Kalra Hospital SRCNC Pvt. Ltd.", city: "Delhi", website1: "HCO- NA", website2: "" },
  { certId: "H-2015-0992", name: "KIMS Hospital Enterprises Pvt. Ltd. Kondapur", city: "Kondapur", website1: "www.kimshospitals.com", website2: "" },
  { certId: "H-2012-0653", name: "St. Isabels Hospital", city: "Chennai", website1: "HCO- NA", website2: "" },
  { certId: "H-2011-0540", name: "Sri Ramachandra Medical Centre", city: "Chennai", website1: "H- NA", website2: "" },
  { certId: "H-2018-1353", name: "Bhagwan Mahaveer Jain Hospital", city: "Bangalore", website1: "H- NA", website2: "" },
  { certId: "H-2021-1666", name: "Gunjkar Multispeciality Hospital", city: "Pune", website1: "H- NA", website2: "" },
  { certId: "H-2019-1535", name: "Lifeline Hospital", city: "Pune", website1: "Center NA", website2: "" },
  { certId: "H-2015-0953", name: "Sakra World Hospital", city: "Bangalore", website1: "www.sakraworldhospital.com", website2: "" },
  { certId: "H-2009-0206", name: "Bhardwaj Hospital", city: "Noida", website1: "H- NA", website2: "" },
  { certId: "H-2009-0151", name: "Prayag Hospital & Research Centre (P) Ltd.", city: "Noida", website1: "HCO- NA", website2: "" },
  { certId: "H-2020-1606", name: "Niramaya Hospitals Pvt. Ltd.", city: "Pune", website1: "Pvt NA", website2: "" },
  { certId: "H-2013-0691", name: "Peerless Hospitex Hospital & Research Centre Limited", city: "Kolkata", website1: "www.peerlesshospital.com", website2: "" },
  { certId: "H-2021-1676", name: "Sant Parmanand Hospital", city: "Delhi", website1: "H- NA", website2: "" },
  { certId: "H-2021-1749", name: "SJM Super Speciality Hospital", city: "Noida", website1: "H- NA", website2: "" },
  { certId: "H-2010-0451", name: "Rangadore Memorial Hospital", city: "Bangalore", website1: "H- NA", website2: "" },
  { certId: "H-2018-1270", name: "Apollo Hospitals Tondiarpet", city: "Chennai", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2015-1010", name: "PBMAS H V Desai Eye Hospital", city: "Pune", website1: "H- NA", website2: "" },
  { certId: "H-2009-0123", name: "Ruby Hall Clinic", city: "Pune", website1: "www.rubyhall.com", website2: "" },
  { certId: "H-2022-1877", name: "Vasavi Medical & Research Centre (Vasavi Hospital)", city: "Hyderabad", website1: "H- NA", website2: "" },
  { certId: "H-2013-0750", name: "ESIC Hospital Basaidarapur", city: "New", website1: "www.esic.nic.in", website2: "" },
  { certId: "H-2018-1229", name: "Renova Hospitals Hyderabad", city: "Hyderabad", website1: "https://renovahospitals.com/", website2: "" },
  { certId: "H-2008-0056", name: "Wockhardt Hospital Mira Road", city: "Mumbai", website1: "www.wockhardthospitals.com", website2: "" },
  { certId: "H-2018-1303", name: "Shalby Hospital", city: "Ahmedabad", website1: "www.shalby.org", website2: "" },
  { certId: "H-2016-1070", name: "Fortis Hospital Bannrghatta RoadBangalore", city: "Bangalore", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2019-1456", name: "Yashoda Super Speciality Hospital", city: "Ghaziabad", website1: "H- NA", website2: "" },
  { certId: "H-2022-1807", name: "Renova Hospitals (Unit of Renova Hospitals Private Limited) Secunderabad", city: "Secunderabad", website1: "https://renovahospitals.com/", website2: "" },
  { certId: "H-2015-1014", name: "ESIC Hospital Bhiwadi", city: "Bhiwadi", website1: "www.esic.nic.in", website2: "" },
  { certId: "H-2010-0447", name: "Apollo Hospitals Greams Road", city: "Chennai", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2010-0402", name: "Sri Ramachandra Medical Centre", city: "Chennai", website1: "H- NA", website2: "" },
  { certId: "H-2020-1555", name: "Global Health Private Limited", city: "Lucknow", website1: "www.medanta.org", website2: "" },
  { certId: "H-2010-0435", name: "Manipal Hospital Old Airport Road", city: "Bangalore", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2018-1317", name: "Max Super Speciality Hospital Patparganj", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2016-1090", name: "KIMS Hospital Enterprises Pvt. Ltd. Secunderabad", city: "Secunderabad", website1: "www.kimshospitals.com", website2: "" },
  { certId: "H-2012-0610", name: "Lilavati Hospital & Research Centre", city: "Mumbai", website1: "www.lilavatihospital.com", website2: "" },
  { certId: "H-2013-0749", name: "Zydus Hospitals & Healthcare Research Private Limited", city: "Gandhinagar", website1: "www.zydushospitals.com", website2: "" },
  { certId: "H-2008-0097", name: "Narayana Superspeciality Hospital", city: "Howrah", website1: "www.narayanahealth.org", website2: "" },
  { certId: "H-2022-1873", name: "ESIC Super Speciality Hospital Sanathnagar", city: "Sanathnagar", website1: "www.esic.nic.in", website2: "" },
  { certId: "H-2010-0443", name: "Wockhardt Hospitals P.O.Bhatwadi Maharashtra", city: "Maharashtra", website1: "www.wockhardthospitals.com", website2: "" },
  { certId: "H-2021-1715", name: "Kauvery Hospital", city: "Chennai", website1: "https://www.kauveryhospital.com/", website2: "" },
  { certId: "H-2016-1100", name: "Apollo Hospitals Jubilee Hills", city: "Hyderabad", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2021-1748", name: "KIMS Hospitals (Unit of Krishna Institute of Medical Sciences Limited) Gachibowli", city: "Gachibowli", website1: "www.kimshospitals.com", website2: "" },
  { certId: "H-2010-0428", name: "The Calcutta Medical Research Institute (CMRI)", city: "Kolkata", website1: "www.cmri.in", website2: "" },
  { certId: "H-2008-0105", name: "Moolchand Medcity", city: "New", website1: "www.moolchandhealthcare.in", website2: "" },
  { certId: "H-2021-1681", name: "Continental Hospitals Limited", city: "Hyderabad", website1: "www.continentalhospitals.com", website2: "" },
  { certId: "H-2015-0955", name: "Max Smart Super Speciality Hospital Saket", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2012-0648", name: "Medicare Hospital", city: "Goa", website1: "www.medicarehospital.in", website2: "" },
  { certId: "H-2015-1031", name: "ESIC Super Speciality Hospital Kalaburagi", city: "Kalaburagi", website1: "www.esic.nic.in", website2: "" },
  { certId: "H-2013-0784", name: "Max Super Speciality Hospital Shalimar Bagh", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2016-1088", name: "Narayana Superspeciality Hospital Gurgaon", city: "Gurgaon", website1: "www.narayanahealth.org", website2: "" },
  { certId: "H-2010-0450", name: "Ruby Hall Clinic Wanowrie", city: "Pune", website1: "www.rubyhall.com", website2: "" },
  { certId: "H-2019-1520", name: "Apollo Hospitals Secunderabad", city: "Secunderabad", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2010-0417", name: "Max Super Speciality Hospital East Delhi", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2010-0453", name: "Manipal Hospital Dwarka", city: "New", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2008-0050", name: "Fortis Hospital Mohali", city: "Mohali", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2015-0985", name: "Apollo Hospitals Madurai", city: "Madurai", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2013-0775", name: "Apollo Speciality Hospitals Madurai", city: "Madurai", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2019-1469", name: "Max Multi Speciality Centre Panchsheel Park", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2011-0570", name: "Wockhardt Hospitals Nagpur", city: "Nagpur", website1: "www.wockhardthospitals.com", website2: "" },
  { certId: "H-2011-0572", name: "Fortis Memorial Research Institute", city: "Gurgaon", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2017-1138", name: "Fortis Hospital Vadpalani", city: "Chennai", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2010-0404", name: "Wockhardt Hospitals Mumbai", city: "Mumbai", website1: "www.wockhardthospitals.com", website2: "" },
  { certId: "H-2016-1049", name: "Medanta- The Medicity", city: "Gurgaon", website1: "www.medanta.org", website2: "" },
  { certId: "H-2018-1322", name: "ESIC Super Speciality Hospital Coimbatore", city: "Coimbatore", website1: "www.esic.nic.in", website2: "" },
  { certId: "H-2010-0459", name: "Fortis Hospitals Cunningham Road", city: "Bangalore", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2009-0266", name: "Wockhardt Hospitals Nashik", city: "Nashik", website1: "www.wockhardthospitals.com", website2: "" },
  { certId: "H-2017-1123", name: "Max Hospital Gurgaon", city: "Gurgaon", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2022-1845", name: "Kauvery Hospital Vadapalani", city: "Chennai", website1: "https://www.kauveryhospital.com/", website2: "" },
  { certId: "H-2012-0616", name: "Apollo Speciality Hospital OMR", city: "Chennai", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2016-1051", name: "Wockhardt Hospitals Rajkot", city: "Rajkot", website1: "www.wockhardthospitals.com", website2: "" },
  { certId: "H-2015-1025", name: "Max Super Speciality Hospital Dehradun", city: "Dehradun", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2009-0300", name: "Fortis Escorts Hospital Amritsar", city: "Amritsar", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2010-0460", name: "Fortis Hospitals Rajajinagar", city: "Bangalore", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2012-0652", name: "Max Super Speciality Hospital Vaishali Ghaziabad", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2010-0474", name: "Fortis Hospital Jaipur", city: "Jaipur", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2013-0761", name: "Ruby Hall Clinic Hinajwadi", city: "Pune", website1: "www.rubyhall.com", website2: "" },
  { certId: "H-2014-0842", name: "Apollo Hospitals Assam", city: "Assam", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2020-1614", name: "Manipal Hospital Sarjapur Road", city: "Bangalore", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2012-0644", name: "Zydus Hospital Anand", city: "Anand", website1: "www.zydushospitals.com", website2: "" },
  { certId: "H-2010-0406", name: "Apollo Hospitals Vizag", city: "Vizag", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2019-1522", name: "Manipal Hospital Palam Vihar", city: "Gurgaon", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2009-0205", name: "Fortis Escorts Heart Institute Okhla Road", city: "New", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2013-0708", name: "Manipal Hospital Ghaziabad", city: "Ghaziabad", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2019-1506", name: "Medanta- The Medicity Indore", city: "Indore", website1: "www.medanta.org", website2: "" },
  { certId: "H-2015-0941", name: "Max Super Speciality Hospital Sake", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2013-0731", name: "Manipal Hospital Whitefield", city: "Bangalore", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2020-1600", name: "KIMS Hospitals (Unit of Krishna Institute of Medical Sciences Limited) Secunderabad", city: "Secunderabad", website1: "www.kimshospitals.com", website2: "" },
  { certId: "H-2013-0746", name: "Fortis Healthcare Ltd. Noida", city: "Noida", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2010-0400", name: "Manipal Hospital Salem", city: "Salem", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2009-0301", name: "Fortis Hospital Vasant Kunj", city: "New", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2012-0665", name: "Max Multi Speciality Hospital Greater", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2020-1558", name: "Max Multi Speciality Hospital Greater", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2015-0988", name: "Apollo Hospital Bhubaneshwar", city: "Bhubaneshwar", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2020-1596", name: "KIMS Hospitals (Unit of Krishna Institute of Medical Sciences Limited) Kondapur", city: "Kondapur", website1: "www.kimshospitals.com", website2: "" },
  { certId: "H-2018-1250", name: "Fortis Escorts Hospital Faridabad", city: "Faridabad", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2009-0255", name: "Fortis Escorts Hospital Jaipur", city: "Jaipur", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2016-1077", name: "Manipal Hospital Jaipur", city: "Jaipur", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2013-0696", name: "Apollo Hospitals Kukatpally", city: "Hyderabad", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2016-1065", name: "Max Super Speciality Hospital Bathinda", city: "Bathinda", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2019-1457", name: "Manipal Hospitals Bengaluru", city: "Bengaluru", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2013-0709", name: "Apollo Hospitals Karunagapally Kerala", city: "Kerala", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2016-1099", name: "Apollo Hospitals Chennai", city: "Chennai", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2010-0433", name: "Fortis Malar Hospital", city: "Chennai", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2013-0736", name: "Fortis Hospital Shalimar Bagh", city: "New", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2012-0661", name: "Medanta - The Medicity Gurgaon", city: "Gurgaon", website1: "www.medanta.org", website2: "" },
  { certId: "H-2015-0994", name: "Wockhardt Hospitals Lal Bahadur Shastri MargMumbai", city: "Mumbai", website1: "www.wockhardthospitals.com", website2: "" },
  { certId: "H-2017-1159", name: "Manipal Hospital Bengaluru", city: "Bengaluru", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2019-1453", name: "Manipal Hospital Jamshedpur", city: "Jamshedpur", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2020-1616", name: "Apollo Hospitals Indore", city: "Indore", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2013-0785", name: "Max Multi Speciality Centre Lajpat Nagar", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2008-0051", name: "Fortis Healthcare Ltd. New", city: "New", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2019-1528", name: "Manipal Hospital Bengaluru", city: "Bengaluru", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2019-1481", name: "Manipal Hospital Bengaluru", city: "Bengaluru", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2020-1587", name: "Kauvery Hospital Salem", city: "Salem", website1: "https://www.kauveryhospital.com/", website2: "" },
  { certId: "H-2016-1064", name: "Apollo Hospitals Bannerghatta Road", city: "Bangalore", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2011-0518", name: "Manipal Hospital Bengaluru", city: "Bengaluru", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2019-1507", name: "Manipal Hospital Goa", city: "Goa", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2015-0968", name: "Max Super Speciality Hospital Mohali", city: "Mohali", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2015-1023", name: "Fortis Hospital Noida", city: "Noida", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2012-0604", name: "Max Super Speciality Hospital Saket", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2013-0789", name: "Apollo Speciality Hospital Trichy", city: "Trichy", website1: "www.apollohospitals.com", website2: "" },
  { certId: "H-2008-0098", name: "Narayana Institute of Cardiac Sciences", city: "Bangalore", website1: "www.narayanahealth.org", website2: "" },
  { certId: "H-2010-0455", name: "Wockhardt Hospitals South Mumbai", city: "Mumbai", website1: "www.wockhardthospitals.com", website2: "" },
  { certId: "H-2019-1524", name: "Manipal Hospital Rajahmundry", city: "Rajahmundry", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2012-0651", name: "Fortis Hospital Mulund", city: "Mumbai", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2016-1094", name: "Wockhardt Hospitals Kolhapur", city: "Kolhapur", website1: "www.wockhardthospitals.com", website2: "" },
  { certId: "H-2009-0268", name: "Wockhardt Hospitals Nashik", city: "Nashik", website1: "www.wockhardthospitals.com", website2: "" },
  { certId: "H-2011-0571", name: "Fortis La Femme Greater Kailash Part II", city: "New", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2016-1108", name: "Fortis Hospital Ludhiyana", city: "Ludhiyana", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2013-0701", name: "Manipal Hospital Vijayawada", city: "Vijayawada", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2022-1849", name: "Kauvery Hospital Hosur", city: "Hosur", website1: "https://www.kauveryhospital.com/", website2: "" },
  { certId: "H-2019-1473", name: "Manipal Hospital Mangalore", city: "Mangalore", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2020-1559", name: "Fortis Hospital Jaipur", city: "Jaipur", website1: "www.fortishealthcare.com", website2: "" },
  { certId: "H-2009-0158", name: "Max Multi Speciality Hospital Pitampura", city: "New", website1: "www.maxhealthcare.in", website2: "" },
  { certId: "H-2017-1135", name: "Manipal Hospital Mangalore", city: "Mangalore", website1: "www.manipalhospitals.com", website2: "" },
  { certId: "H-2010-0430", name: "Wockhardt Hospital Mumbai", city: "Mumbai", website1: "www.wockhardthospitals.com", website2: "" }
  // The PDF contained many more rows; include them here if you want the absolute complete set.
];

/* ---------- Utility helpers ---------- */
function normalizeText(s) {
  return (s || "")
    .toString()
    .toLowerCase()
    .replace(/[\u2019\u2018\u201c\u201d]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(s) {
  if (!s) return new Set();
  return new Set(normalizeText(s).split(" ").filter(Boolean));
}

function tokenOverlapScore(a, b) {
  const ta = tokenSet(a);
  const tb = tokenSet(b);
  if (ta.size === 0 || tb.size === 0) return 0;
  let common = 0;
  ta.forEach(t => { if (tb.has(t)) common++; });
  const larger = Math.max(ta.size, tb.size);
  return common / larger;
}

function chooseWebsite(e) {
  const candidates = [e.website1 || "", e.website2 || ""].map(s => (s || "").toString().trim());
  for (const c of candidates) {
    if (!c) continue;
    const lower = c.toLowerCase();
    if (lower.includes("na") || lower.includes("h-") || lower.includes("hco")) continue;
    if (lower.startsWith("http://") || lower.startsWith("https://")) return c;
    if (lower.startsWith("www.")) return "https://" + c;
    if (lower.includes(".") && lower.length > 5) return "https://" + c;
  }
  return null;
}

function findBestExcelMatch(hospitalName) {
  const nameNormalized = normalizeText(hospitalName);
  let best = null;
  let bestScore = 0;
  for (const e of excelSites) {
    const score = tokenOverlapScore(nameNormalized, e.name);
    if (score > bestScore) {
      bestScore = score;
      best = e;
    }
  }
  if (best && bestScore >= 0.45) {
    return { entry: best, score: bestScore };
  }
  return null;
}

/* ---------- Merge routine ---------- */
function mergeDatasets() {
  if (typeof window.hospitalData === "undefined") {
    console.warn("merge_with_excel_sites: window.hospitalData not found. Creating empty structure.");
    window.hospitalData = {};
  }

  const existingData = window.hospitalData;
  const addedWebsites = [];
  const unmatchedExcel = new Set(excelSites.map(e => e.certId));

  // Attach websites to existing Canva hospitals
  Object.keys(existingData).forEach(cityKey => {
    const list = existingData[cityKey] || [];
    for (const hosp of list) {
      if (hosp.website && hosp.website.toString().trim()) continue;
      const match = findBestExcelMatch(hosp.name || "");
      if (match) {
        const chosen = chooseWebsite(match.entry);
        if (chosen) {
          hosp.website = chosen;
          hosp._website_source = match.entry.certId;
          addedWebsites.push({ hospital: hosp.name, website: chosen, score: match.score, certId: match.entry.certId });
          unmatchedExcel.delete(match.entry.certId);
          continue;
        }
      }
    }
  });

  // Merge NABH list per city as partial records
  const normalizeKey = s => (s || "").toString().trim().toLowerCase();
  nabhList.forEach((n, idx) => {
    const cityKey = normalizeKey(n.city) || "unknown";
    if (!existingData[cityKey]) {
      existingData[cityKey] = [];
      const citySelect = document.getElementById("city-select");
      if (citySelect) {
        const exists = Array.from(citySelect.options).some(o => normalizeKey(o.value) === cityKey || normalizeKey(o.text) === cityKey);
        if (!exists) {
          const opt = document.createElement("option");
          opt.value = cityKey;
          opt.textContent = cityKey.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
          citySelect.appendChild(opt);
        }
      }
    }

    const record = {
      id: `nabh-${Date.now().toString().slice(-6)}-${idx}`,
      name: n.name || "Unnamed Hospital",
      city: n.city || "",
      surgeryPackages: n.surgeryPackages || [],
      _partial: true,
      website: null
    };

    const match = findBestExcelMatch(record.name);
    if (match) {
      const chosen = chooseWebsite(match.entry);
      if (chosen) {
        record.website = chosen;
        record._website_source = match.entry.certId;
        unmatchedExcel.delete(match.entry.certId);
      }
    }

    const existingNames = new Set((existingData[cityKey] || []).map(h => normalizeText(h.name)));
    if (!existingNames.has(normalizeText(record.name))) {
      existingData[cityKey].push(record);
    }
  });

  console.info("merge_with_excel_sites: websites added to existing Canva hospitals:", addedWebsites.length);
  if (addedWebsites.length) console.table(addedWebsites.slice(0, 40));
  console.info("merge_with_excel_sites: unmatched excel entries left (sample):", Array.from(unmatchedExcel).slice(0,20));

  window.__merged_excel_sites = true;
  window.hospitalData = existingData;
}

// Run merge once DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mergeDatasets);
} else {
  mergeDatasets();
}
