"use client";

import { useState } from "react";
import { CheckCircle, ShieldCheck, User2, MapPin, CreditCard, Wallet, Banknote } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function Booking() {
  const { t, formatPrice, language } = useSettings();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [insurance, setInsurance] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cc");

  const basePrice = 1450000;
  const tax = 100000;
  const insurancePrice = insurance ? 45000 : 0;
  const total = basePrice + tax + insurancePrice;

  const handleQuickPick = () => {
    setName("Budi Santoso");
    setEmail("budi.santoso@example.com");
    setPhone("+6281234567890");
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <>
          <h1 className="text-2xl font-bold text-gray-800">{t("yourBooking")}</h1>
          
          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">{t("contactDetails")}</h2>
              <button onClick={handleQuickPick} className="flex items-center gap-1 text-primary text-sm font-semibold bg-blue-50 hover:bg-blue-100 transition px-3 py-1 rounded-lg">
                <User2 size={16} /> Quick Pick
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">{t("fullName")}</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="border rounded-xl px-4 py-3 outline-none focus:border-primary text-gray-800" placeholder={t("asPerID")} />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="border rounded-xl px-4 py-3 outline-none focus:border-primary text-gray-800" placeholder="contoh@email.com" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-semibold text-gray-600 mb-1">{language === "ID" ? "Nomor Telepon" : "Phone Number"}</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="border rounded-xl px-4 py-3 outline-none focus:border-primary text-gray-800" placeholder="+62 8..." />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{t("passengerDetails")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">{t("title")}</label>
                <select className="border rounded-xl px-4 py-3 outline-none focus:border-primary text-gray-800 bg-white">
                  <option>{t("mr")}</option>
                  <option>{t("mrs")}</option>
                  <option>{t("ms")}</option>
                </select>
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-semibold text-gray-600 mb-1">{t("fullName")}</label>
                <input type="text" className="border rounded-xl px-4 py-3 outline-none focus:border-primary text-gray-800" placeholder={t("asPerID")} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="accent-primary" /> {t("sameAsContact")}
            </label>
          </section>

          <section className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-primary mt-1" size={28} />
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{t("travelInsurance")}</h3>
                <p className="text-sm text-gray-600 my-1">{t("insuranceSub")}</p>
                <label className="flex items-center gap-2 text-primary font-semibold text-sm cursor-pointer mt-2">
                  <input type="checkbox" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} className="accent-primary" /> {t("addInsurance")}
                </label>
              </div>
            </div>
          </section>

          <button 
            onClick={() => {
              if(!name || !email) return alert(language === "ID" ? "Harap lengkapi detail pemesan!" : "Please complete contact details!");
              setStep(2);
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-xl transition shadow-md"
          >
            {t("continueToPayment")}
          </button>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <h1 className="text-2xl font-bold text-gray-800">{t("payment")}</h1>
          
          <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-800">{t("paymentMethod")}</h2>
            
            <label className={`flex items-center gap-4 p-4 rounded-xl border ${paymentMethod === 'cc' ? 'border-primary bg-blue-50' : 'border-gray-200'}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'cc'} onChange={() => setPaymentMethod('cc')} className="accent-primary" />
              <CreditCard size={24} className="text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-800">{t("creditDebitCard")}</h3>
                <p className="text-xs text-gray-500">Visa, Mastercard, JCB</p>
              </div>
            </label>

            <label className={`flex items-center gap-4 p-4 rounded-xl border ${paymentMethod === 'tf' ? 'border-primary bg-blue-50' : 'border-gray-200'}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'tf'} onChange={() => setPaymentMethod('tf')} className="accent-primary" />
              <Banknote size={24} className="text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-800">{t("bankTransfer")}</h3>
                <p className="text-xs text-gray-500">BCA, Mandiri, BNI, BRI</p>
              </div>
            </label>
            
            <label className={`flex items-center gap-4 p-4 rounded-xl border ${paymentMethod === 'ewallet' ? 'border-primary bg-blue-50' : 'border-gray-200'}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'ewallet'} onChange={() => setPaymentMethod('ewallet')} className="accent-primary" />
              <Wallet size={24} className="text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-800">{t("eWallet")}</h3>
                <p className="text-xs text-gray-500">GoPay, OVO, ShopeePay</p>
              </div>
            </label>

          </section>

          <div className="flex gap-4">
            <button 
              onClick={() => setStep(1)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-lg py-4 px-6 rounded-xl transition shadow-sm"
            >
              {t("back")}
            </button>
            <button 
              onClick={() => setStep(3)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-xl transition shadow-md"
            >
              {t("payNow")}
            </button>
          </div>
        </>
      );
    }

    if (step === 3) {
      return (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center py-16">
          <CheckCircle size={80} className="text-green-500 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("bookingSuccess")}</h1>
          <p className="text-gray-600 mb-8 max-w-sm">{t("thankYouBooking")} <br/><b>{email}</b></p>
          
          <div className="flex gap-4">
            <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 px-6 rounded-xl transition shadow-sm">
              {t("backToHome")}
            </Link>
            <Link href="/admin" className="bg-primary hover:bg-[#017bc7] text-white font-bold py-3 px-6 rounded-xl transition shadow-sm">
              {t("checkDashboard")}
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Stepper Navigation */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full" />
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-300 ${step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'}`} />
          
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm transition-colors ${step >= s ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                {s}
              </div>
              <span className={`text-xs font-semibold ${step >= s ? "text-primary" : "text-gray-500"}`}>
                {s === 1 ? t("stepBook") : s === 2 ? t("stepPay") : t("stepDone")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {renderStep()}
        </div>

        {/* Sidebar Summary (Only on Step 1 and 2) */}
        {step !== 3 && (
          <aside className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24 overflow-hidden">
              <h2 className="p-5 font-bold text-lg text-gray-800 border-b">{t("bookingSummary")}</h2>
              
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-0.5" size={20} />
                  <div>
                    <h3 className="font-bold text-gray-800">Jakarta (JKT) → Bali (DPS)</h3>
                    <p className="text-xs text-gray-500 mt-1">Garuda Indonesia • {language === "ID" ? "Kam, 15 Agt 2026" : "Thu, 15 Aug 2026"}</p>
                    <p className="text-xs text-gray-500">10:00 - 12:50 • {t("direct")}</p>
                  </div>
                </div>

                <hr className="border-gray-100" />
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{t("adultTicket")}</span>
                  <span>{formatPrice(basePrice)}</span>
                </div>
                {insurance && (
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{t("insuranceSummary")}</span>
                    <span>{formatPrice(insurancePrice)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{t("taxFees")}</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-5 mt-auto border-t">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-800">{t("totalPrice")}</span>
                  <span className="text-2xl font-extrabold text-orange-500">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </aside>
        )}

      </div>
    </div>
  );
}
