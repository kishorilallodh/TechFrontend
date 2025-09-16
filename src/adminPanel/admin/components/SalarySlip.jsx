import React from "react";
import logo from "../../../assets/Techdigi_logo.png"; // ❗ Make sure this path is correct

// --- HELPER FUNCTIONS (No changes here) ---
const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    Math.round(Number(amount) || 0)
  );

const numberToWords = (num = 0) => {
    num = Math.max(0, Math.floor(num));
    if (num === 0) return "Zero";
    const a = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const b = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
    const chunk = (n) => {
      let s = "";
      if (n >= 100) { s += a[Math.floor(n / 100)] + " Hundred "; n %= 100; }
      if (n >= 20) { s += b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : ""); } 
      else if (n > 0) { s += a[n]; }
      return s.trim();
    };
    let words = "";
    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const hundred = num % 1000;
    if (crore) words += chunk(crore) + " Crore ";
    if (lakh) words += chunk(lakh) + " Lakh ";
    if (thousand) words += chunk(thousand) + " Thousand ";
    if (hundred) words += chunk(hundred);
    return words.trim();
};


// --- MAIN SALARY SLIP COMPONENT ---
const UserSalarySlip = ({ employeeData, salaryData }) => {
  if (!employeeData || !salaryData) {
    return (
      <div className="text-center p-8 text-gray-500">
        Please select a slip to view details.
      </div>
    );
  }

  const earnings = salaryData.earnings || [];
  const deductions = salaryData.deductions || [];

  const totalEarnings = earnings.reduce((sum, item) => sum + (Number(item?.amount) || 0), 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + (Number(item?.amount) || 0), 0);
  const netSalary = Math.max(0, totalEarnings - totalDeductions);

  // highlight-start
  return (
    // Step 1: A4 Aspect Ratio Container
    <div className="relative w-full h-0 pb-[138%] bg-white font-sans shadow-lg">
      {/* Step 2: Absolute Content Layer */}
      <div id="salary-slip-content" className="absolute inset-0 p-4 lg:p-8 flex flex-col">
        
        {/* Header */}
        <header className="border-b lg:border-b-2 border-gray-300 pb-2 lg:pb-4 lg:mb-4">
          <div className="flex justify-between items-start">
            <div className=" w-20 lg:w-40">
              <img src={logo} alt="Company Logo" className="w-full h-auto" />
            </div>
            <div className="text-right">
              <h1 className="text-[1.1vh] lg:text-xl font-bold text-gray-800">Salary Slip</h1>
              <p className="text-[0.8vh] lg:text-sm text-gray-500">For {salaryData?.month} {salaryData?.year}</p>
            </div>
          </div>
          <div className="text-center mt-2 lg:mt-4">
            {/* <h2 className="text-lg font-semibold">TechDigi Software Solutions Pvt. Ltd.</h2> */}
            <p className="text-[0.8vh] lg:text-sm text-gray-600">
              Sector C-8, 3rd Floor, Indrapuri, Raisen Road, Bhopal (M.P.)
            </p>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow">
            {/* Employee Details */}
            <section className="py-1 lg:py-2 grid grid-cols-2 gap-x-4 lg:gap-x-8 lg:gap-y-2 text-[0.8vh] lg:text-sm">
                <DataRow label="Employee Name" value={employeeData?.name} />
                <DataRow label="Date of Joining" value={employeeData?.dateofjoining} />
                <DataRow label="Designation" value={employeeData?.designation} />
                <DataRow label="Present Days" value={employeeData?.workingday} />
                <DataRow label="PAN" value={employeeData?.pan} />
                <DataRow label="Bank A/C No" value={employeeData?.bankAccount} />
            </section>

            {/* Earnings & Deductions Tables */}
            <section className="grid grid-cols-2 gap-4 lg:gap-8 mt-3 lg:mt-6">
                <div>
                    <SectionTitle text="Earnings" accent="indigo" />
                    <div className="space-y-1 lg:pt-2">
                        {earnings.map((item, idx) => <LineItem key={`earning-${idx}`} label={item.description} amount={item.amount} />)}
                    </div>
                    <TotalRow label="Total Earnings" amount={totalEarnings} />
                </div>
                <div>
                    <SectionTitle text="Deductions" accent="rose" />
                    <div className="space-y-1 lg:pt-2">
                        {deductions.map((item, idx) => <LineItem key={`deduction-${idx}`} label={item.description} amount={item.amount} />)}
                    </div>
                    <TotalRow label="Total Deductions" amount={totalDeductions} />
                </div>
            </section>
        </main>

        {/* Footer with Net Salary (pushed to bottom) */}
        {/* Step 3: Layout Adjustment mt-auto */}
      <div className="mt-auto">
            {/* Step 2: Footer se mt-auto hata dein */}
            <footer className="pt-6">
                <section className="bg-slate-50 p-2 lg:p-4 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-center pb-1 lg:pb-2 border-b border-dashed text-[0.9vh] lg:text-base">
                        <span className="font-semibold text-gray-700">Gross Salary :</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(totalEarnings)}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 lg:py-2 text-[0.9vh] lg:text-base">
                        <span className="font-semibold text-gray-700">Total Deductions :</span>
                        <span className="font-semibold text-gray-900">- {formatCurrency(totalDeductions)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.1 lg:pt-3 mt-2 border-t lg:border-t-2 border-gray-800 ">
                        <h2 className="text-[1.1vh] lg:text-xl font-bold text-gray-800">Net Salary :</h2>
                        <h2 className="text-[1.3vh] lg:text-2xl font-bold text-gray-800">{formatCurrency(netSalary)}</h2>
                    </div>
                    <div className="mt-1 lg:mt-2 text-right">
                        <p className="text-[0.8vh] lg:text-sm font-semibold text-gray-700">
                        (In words: {numberToWords(netSalary)} Rupees Only)
                        </p>
                    </div>
                </section>
            </footer>
            {/* Step 3: Computer Generated Slip Text ko is wrapper mein move karein */}
            <p className="pt-2 lg:pt-4 text-center text-[0.7vh] lg:text-xs text-gray-500">
                This is a computer-generated salary slip and does not require a signature.
            </p>
        </div>
      </div>
      {/* Step 4: Computer Generated Slip Footer */}
      {/* <p className="absolute bottom-4 left-8 text-xs text-gray-500">
        This is a computer-generated salary slip and does not require a signature.
      </p> */}
    </div>
  );
  // highlight-end
};

// --- HELPER COMPONENTS (Tweaked for better spacing) ---

function DataRow({ label, value }) {
  return (
    <div className="flex justify-between py-1.5 lg:py-2 border-b border-gray-100">
      <span className="font-semibold text-gray-600">{label}:</span>
      <span className="text-gray-800 font-medium">{value || "-"}</span>
    </div>
  );
}

function SectionTitle({ text, accent = "indigo" }) {
  const borderColor = accent === "rose" ? "border-rose-500" : "border-indigo-500";
  return (
    <h3 className={`text-[0.9vh] lg:text-base font-bold text-gray-800 bg-gray-100 p-1 lg:p-2 rounded-t-lg   border-b lg:border-b-2 ${borderColor}`}>
      {text}
    </h3>
  );
}

function LineItem({ label, amount = 0 }) {
  return (
    <div className="flex justify-between items-center py-1 px-2 text-[0.8vh] lg:text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-800">{formatCurrency(amount)}</span>
    </div>
  );
}

function TotalRow({ label, amount = 0 }) {
  return (
    <div className="flex justify-between items-center font-bold text-gray-800 bg-gray-100 p-1 lg:p-2 rounded-b-lg mt-1 lg:mt-2 border-t-2 border-gray-200 text-[0.8vh] lg:text-sm">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </div>
  );
}

export default UserSalarySlip;