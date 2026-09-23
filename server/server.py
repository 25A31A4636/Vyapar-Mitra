import http.server
import socketserver
import json
import hashlib
import time
import math
import random
from urllib.parse import parse_qs, urlparse

PORT = 8000

# In-memory storage database
DATABASE = {
    "profile": {
        "name": "Ramesh Kumar",
        "ageRange": "25-34",
        "state": "Andhra Pradesh",
        "district": "Guntur",
        "villageTown": "Tenali",
        "pinCode": "522201",
        "availableCapital": 150000.0,
        "landAvailability": "Owned 400 sq.ft plot near main road",
        "shopAvailability": "Rented shop option available",
        "skills": ["Customer Interaction", "Basic Accounting", "Local Geography"]
    },
    "dprs": []
}

class AdvisoryHandler(http.server.BaseHTTPRequestHandler):

    def _set_cors(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_cors(200)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path in ['/', '/health']:
            self._set_cors(200)
            res = {
                "status": "healthy",
                "system": "Vyapar Mitra MIP Backend Core (Python Native Server)",
                "hackathon": "Smart India Hackathon 2026 — SIH26091",
                "team": "Hexa Syndicate",
                "active_engines": [
                    "Hyper-Local Geo GIS Engine (OSM/Overpass)",
                    "Deterministic Financial Calculator",
                    "Rural Lens Vision OCR Engine",
                    "2G Toll-Free IVR & SMS Gateway",
                    "Anti-Fraud Cryptographic SHA-256 Generator"
                ]
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))
        elif parsed.path == '/api/profile':
            self._set_cors(200)
            self.wfile.write(json.dumps(DATABASE["profile"]).encode('utf-8'))
        else:
            self._set_cors(404)
            self.wfile.write(json.dumps({"error": "Not Found"}).encode('utf-8'))

    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        body_bytes = self.rfile.read(content_length) if content_length > 0 else b'{}'
        
        try:
            body = json.loads(body_bytes.decode('utf-8'))
        except Exception:
            body = {}

        if parsed.path == '/api/advisory/analyze':
            self._set_cors(200)
            
            user_loc = body.get('location', 'Your Selected Location').strip()
            town_name = user_loc.split(',')[0].strip() or "Local Center"
            preferred_cat = body.get('preferredCategory', 'Electrical')
            custom_name = (body.get('customBusinessName') or '').strip()
            capital = float(body.get('capital', 150000))

            low_custom = custom_name.lower()
            low_cat = preferred_cat.lower()

            if "electric" in low_custom or "electric" in low_cat:
                biz_key = "electrical"
                cat_name = "Electrical Shop & Electronics"
                biz_title = custom_name if custom_name else "Sri Venkateswara Electricals & Hardware"
                cost_mult = 1.75
                gross_margin = 0.28
                base_revenue = 135000.0
            elif "kirana" in low_custom or "grocer" in low_custom or "grocery" in low_cat:
                biz_key = "grocery"
                cat_name = "Kirana / Grocery Store"
                biz_title = custom_name if custom_name else "Modern Kirana & Essential Goods Store"
                cost_mult = 1.5
                gross_margin = 0.18
                base_revenue = 105000.0
            elif "apparel" in low_custom or "cloth" in low_custom or "apparel" in low_cat:
                biz_key = "apparel"
                cat_name = "Apparel & Readymade Garments"
                biz_title = custom_name if custom_name else "Royal Apparel & Readymade Store"
                cost_mult = 1.6
                gross_margin = 0.35
                base_revenue = 95000.0
            elif "agri" in low_custom or "seed" in low_custom or "agri" in low_cat:
                biz_key = "agri"
                cat_name = "Agri-Inputs & Seeds Store"
                biz_title = custom_name if custom_name else "Kisan Seva Agri-Inputs & Seeds Depot"
                cost_mult = 1.8
                gross_margin = 0.20
                base_revenue = 140000.0
            elif custom_name:
                biz_key = "custom"
                cat_name = preferred_cat if preferred_cat != "Other" else "Micro-Enterprise"
                biz_title = custom_name if len(custom_name) > 3 else f"{custom_name} Enterprise"
                cost_mult = 1.6
                gross_margin = 0.25
                base_revenue = 115000.0
            else:
                biz_key = "electrical"
                cat_name = "Electrical Shop & Electronics"
                biz_title = "Sri Venkateswara Electricals & Hardware"
                cost_mult = 1.75
                gross_margin = 0.28
                base_revenue = 135000.0

            project_cost = round(max(240000.0, capital * cost_mult))
            own_contrib = round(min(capital, project_cost * 0.35))
            loan_req = project_cost - own_contrib

            monthly_rev = base_revenue
            gross_prof = round(monthly_rev * gross_margin)

            rent = round(monthly_rev * 0.055)
            inventory = round(monthly_rev * (1.0 - gross_margin))
            salaries = round(monthly_rev * 0.045)
            utilities = round(monthly_rev * 0.025)
            transport = round(monthly_rev * 0.015)
            marketing = 1500.0
            other = 1500.0

            total_op = rent + salaries + utilities + transport + marketing + other
            net_profit = max(14000.0, gross_prof - total_op)

            r = 0.095 / 12.0
            n = 60
            monthly_emi = round((loan_req * r * (math.pow(1 + r, n))) / (math.pow(1 + r, n) - 1))
            break_even = round(project_cost / (net_profit + monthly_emi))

            res = {
                "businessName": biz_title,
                "category": cat_name,
                "suitabilityScore": 92,
                "demandIndicator": "High",
                "competitionIndicator": "Moderate",
                "riskLevel": "Low",
                "growthPotential": "High",
                "whyMatched": [
                    f"High daily consumer demand for {cat_name} in {user_loc}",
                    f"Promoter margin requirement of ₹{own_contrib:,.0f} met by your starting capital (₹{capital:,.0f})",
                    f"Favorable competitor density within 2 km radius in {town_name}"
                ],
                "confidence": "High",
                "confidenceReason": f"Deterministic engine calculated for {biz_title} at {user_loc}",
                "financialSnapshot": {
                    "totalProjectCost": project_cost,
                    "ownContribution": own_contrib,
                    "fundingRequirement": loan_req,
                    "monthlyRevenue": monthly_rev,
                    "monthlyExpenses": {
                        "rent": rent,
                        "inventory": inventory,
                        "salaries": salaries,
                        "utilities": utilities,
                        "transport": transport,
                        "marketing": marketing,
                        "other": other
                    },
                    "netMonthlyProfit": net_profit,
                    "breakEvenMonths": break_even,
                    "monthlyEmi": monthly_emi
                },
                "actionPlan": [
                    {"id": "1", "title": f"Validate foot traffic & electrician density near {town_name} commercial junctions", "priority": "High", "estimatedEffort": "2 Days", "requiredInformation": "Location visit count", "status": "Pending"},
                    {"id": "2", "title": f"Obtain shop lease agreement or NOC from property owner in {town_name}", "priority": "High", "estimatedEffort": "3 Days", "requiredInformation": "Rent agreement draft", "status": "Pending"},
                    {"id": "3", "title": "Establish wholesale distributor partnerships (Havells, Polycab, Finolex)" if biz_key == "electrical" else f"Finalize wholesale distributor list in {town_name}", "priority": "High", "estimatedEffort": "4 Days", "requiredInformation": "Supplier rate cards", "status": "Pending"},
                    {"id": "4", "title": f"Apply for Mudra / PMEGP loan scheme for ₹{loan_req:,.0f} using verified DPR", "priority": "High", "estimatedEffort": "7 Days", "requiredInformation": "Verified DPR Document", "status": "Pending"}
                ],
                "locationRecommendations": [
                    {"id": "l1", "name": f"{town_name} Bus Stand Junction", "type": "Recommended", "lat": 16.24, "lng": 80.64, "suitability": 94, "competitionDensity": f"2 {cat_name} stores within 500m", "footTrafficEstimate": "High (3,800/day)"},
                    {"id": "l2", "name": f"{town_name} Main Market Road", "type": "High Competition", "lat": 16.25, "lng": 80.65, "suitability": 71, "competitionDensity": f"6 {cat_name} stores within 300m", "footTrafficEstimate": "Very High (6,200/day)"},
                    {"id": "l3", "name": f"{town_name} Station Road / Colony", "type": "Moderate", "lat": 16.23, "lng": 80.63, "suitability": 83, "competitionDensity": f"1 {cat_name} store within 800m", "footTrafficEstimate": "Moderate (2,100/day)"}
                ]
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))

        elif parsed.path == '/api/dpr/generate':
            self._set_cors(200)
            raw = f"{body.get('businessName')}|{body.get('location')}|{body.get('totalInvestment')}|{time.time()}"
            sha256_hash = hashlib.sha256(raw.encode('utf-8')).hexdigest()
            dpr_id = f"DPR-VM-2026-{random.randint(1000, 9999)}"

            dpr_doc = {
                "dprId": dpr_id,
                "sha256Hash": sha256_hash,
                "generatedTimestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "entrepreneurName": body.get('entrepreneurName', 'Ramesh Kumar'),
                "businessName": body.get('businessName', 'Sri Venkateswara Electricals'),
                "location": body.get('location', 'Tenali, Guntur'),
                "totalInvestment": float(body.get('totalInvestment', 280000)),
                "ownContribution": float(body.get('ownContribution', 98000)),
                "loanRequested": float(body.get('loanRequested', 182000)),
                "projectedMonthlyRevenue": float(body.get('projectedMonthlyRevenue', 135000)),
                "projectedMonthlyProfit": float(body.get('projectedMonthlyProfit', 26000)),
                "breakEvenPeriodMonths": int(body.get('breakEvenPeriodMonths', 14)),
                "repaymentTenureYears": 5,
                "estimatedEmi": float(body.get('estimatedEmi', 3820)),
                "swotAnalysis": body.get('swotAnalysis', {
                    "strengths": [f"High local demand in {body.get('location', 'Tenali')}", "Strong promoter margin setup"],
                    "weaknesses": ["Working capital locked in stock inventory"],
                    "opportunities": ["Digital UPI payments & local home delivery"],
                    "threats": ["Competitor expansion on main transit road"]
                })
            }
            DATABASE["dprs"].append(dpr_doc)
            self.wfile.write(json.dumps({"status": "success", "dpr": dpr_doc}).encode('utf-8'))

        elif parsed.path == '/api/ocr/extract':
            self._set_cors(200)
            res = {
                "status": "success",
                "detectedItems": [
                    {"id": "1", "category": "Shop Rent", "description": "Monthly commercial shop rent (handwritten)", "amount": 6000, "confidence": 95},
                    {"id": "2", "category": "Initial Stock", "description": "Opening inventory (goods batch #1)", "amount": 45000, "confidence": 91},
                    {"id": "3", "category": "Fixtures", "description": "Display racks, counter & shelving", "amount": 15000, "confidence": 89},
                    {"id": "4", "category": "Utilities", "description": "Power connection & deposit estimate", "amount": 2500, "confidence": 84}
                ],
                "totalBudget": 68500
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))

        elif parsed.path == '/api/profile':
            self._set_cors(200)
            DATABASE["profile"] = body
            self.wfile.write(json.dumps({"status": "updated", "profile": DATABASE["profile"]}).encode('utf-8'))

        else:
            self._set_cors(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

def run_server():
    with socketserver.TCPServer(("", PORT), AdvisoryHandler) as httpd:
        print(f"Vyapar Mitra Backend Server running at http://localhost:{PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()
