import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProductContext } from "../utils/ProductContext";
import { clearCart } from "../utils/CartSlice";
import {
  MapPin,
  CreditCard,
  Wallet,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Tag,
  Star,
  Banknote,
  Smartphone,
} from "lucide-react";

/* ── helpers ─────────────────────────────────────────── */
const origPrice = (p) => (p * 1.35).toFixed(0);
const discAmt = (p) => (parseFloat(origPrice(p)) - p).toFixed(2);

const PAYMENT_OPTIONS = [
  { id: "upi", label: "UPI", sub: "Pay via any UPI app", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "wallet", label: "Wallets", sub: "Paytm, PhonePe, Amazon Pay", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", sub: "Pay when delivered", icon: Banknote },
];

const ADDRESSES = [
  {
    id: 1,
    name: "Abinash Rout",
    line: "12, Green Valley Apartments",
    city: "Bhubaneswar",
    state: "Odisha",
    pin: "751001",
    phone: "98765 43210",
    tag: "Home",
  },
  {
    id: 2,
    name: "Abinash Rout",
    line: "Office Block B, Tech Park",
    city: "Bhubaneswar",
    state: "Odisha",
    pin: "751024",
    phone: "98765 43210",
    tag: "Work",
  },
];

const OrderPage = () => {
  const { theme } = useContext(ProductContext);
  const isDark = theme === "Dark";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  /* Items — either from "Buy Now" state or full cart */
  const cartItems = useSelector((s) => s?.cart?.items);
  const buyNowItem = location.state?.buyNowItem ?? null;
  const orderItems = buyNowItem ? [{ ...buyNowItem, quantity: 1 }] : cartItems;

  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [openSection, setOpenSection] = useState("address"); // address | payment | summary
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalMRP = orderItems.reduce(
    (a, i) => a + parseFloat(origPrice(i.price)) * i.quantity, 0
  );
  const totalDisc = orderItems.reduce(
    (a, i) => a + parseFloat(discAmt(i.price)) * i.quantity, 0
  );
  const totalFinal = orderItems.reduce(
    (a, i) => a + i.price * i.quantity, 0
  );
  const delivery = totalFinal > 499 ? 0 : 40;
  const grandTotal = totalFinal + delivery;

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPlaced(true);
      if (!buyNowItem) dispatch(clearCart());
    }, 1800);
  };

  const toggle = (s) => setOpenSection((p) => (p === s ? "" : s));

  /* ── Order Confirmed Screen ─────────────────────────── */
  if (placed) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center pt-20 pb-32 px-6 transition-colors duration-500 ${isDark ? "bg-[#080c0a]" : "bg-gray-50"}`}>
        <div className={`w-full max-w-sm rounded-3xl border p-8 flex flex-col items-center text-center ${isDark ? "bg-[#0b0f0d] border-emerald-900/30" : "bg-white border-green-100 shadow-xl"}`}>
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className={`text-2xl font-syne font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            Order Placed! 🎉
          </h2>
          <p className={`text-sm mb-1 ${isDark ? "text-white/50" : "text-gray-500"}`}>
            Your order has been confirmed.
          </p>
          <p className={`text-xs font-bold mb-6 ${isDark ? "text-emerald-400" : "text-green-600"}`}>
            Expected delivery in 3–5 business days
          </p>
          <div className={`w-full rounded-2xl p-4 mb-6 text-left ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
            <p className={`text-[9px] font-black tracking-[3px] uppercase mb-2 ${isDark ? "text-white/30" : "text-gray-400"}`}>Order Summary</p>
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-1.5">
                <img src={item.image} alt={item.title} className="w-10 h-10 object-contain rounded-lg bg-white p-1" />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold truncate ${isDark ? "text-white" : "text-gray-800"}`}>{item.title}</p>
                  <p className={`text-[10px] ${isDark ? "text-white/40" : "text-gray-400"}`}>Qty: {item.quantity} · ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={`text-xs font-bold mb-6 ${isDark ? "text-white/30" : "text-gray-400"}`}>
            Total Paid: <span className={isDark ? "text-white" : "text-gray-900"}>₹{grandTotal.toFixed(2)}</span>
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-black rounded-2xl text-sm transition-all duration-300 active:scale-95"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  /* ── Collapsible Step Component ─────────────────────── */
  const Step = ({ id, stepNum, title, children, summary }) => {
    const isOpen = openSection === id;
    return (
      <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isDark ? "bg-[#0b0f0d] border-emerald-900/30" : "bg-white border-gray-200"}`}>
        <button
          onClick={() => toggle(id)}
          className={`w-full flex items-center justify-between px-4 py-4 text-left transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50"}`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${isOpen ? "bg-blue-600 text-white" : isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>
              {stepNum}
            </div>
            <div>
              <p className={`text-[10px] font-black tracking-[2px] uppercase ${isDark ? "text-white/40" : "text-gray-400"}`}>
                {isOpen ? "Step " + stepNum : "STEP " + stepNum + " DONE"}
              </p>
              <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{title}</p>
            </div>
          </div>
          {!isOpen && summary && (
            <span className={`text-xs mr-2 truncate max-w-[120px] ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>{summary}</span>
          )}
          <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${isDark ? "text-white/30" : "text-gray-400"}`} />
        </button>
        {isOpen && <div className="px-4 pb-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}">{children}</div>}
      </div>
    );
  };

  /* ── Main Order Page ─────────────────────────────────── */
  return (
    <div className={`min-h-screen pt-16 pb-44 transition-colors duration-500 ${isDark ? "bg-[#080c0a]" : "bg-gray-50"}`}>

      {/* ── Top Bar ── */}
      <div className={`sticky top-16 z-30 flex items-center gap-3 px-4 py-3 border-b ${isDark ? "bg-[#080c0a]/95 border-emerald-900/30 backdrop-blur" : "bg-white/95 border-gray-200 backdrop-blur"}`}>
        <button onClick={() => navigate(-1)} className={`p-1.5 rounded-xl ${isDark ? "text-emerald-400" : "text-gray-600"}`}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className={`text-base font-bold font-syne ${isDark ? "text-white" : "text-gray-900"}`}>
          Place Order
        </h1>
        <div className="ml-auto flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-bold text-green-600">100% Secure</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 md:px-6 pt-4 flex flex-col gap-4">

        {/* ── STEP 1: Delivery Address ── */}
        <Step id="address" stepNum={1} title="Delivery Address" summary={ADDRESSES.find(a=>a.id===selectedAddress)?.city}>
          <div className="flex flex-col gap-2.5 mt-3">
            {ADDRESSES.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddress(addr.id)}
                className={`relative flex gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedAddress === addr.id
                    ? isDark ? "border-blue-500 bg-blue-500/10" : "border-blue-500 bg-blue-50"
                    : isDark ? "border-white/10 hover:border-white/20" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${selectedAddress === addr.id ? "border-blue-500" : isDark ? "border-white/30" : "border-gray-300"}`}>
                  {selectedAddress === addr.id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{addr.name}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>{addr.tag}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-gray-500"}`}>
                    {addr.line}, {addr.city}, {addr.state} - {addr.pin}
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? "text-white/40" : "text-gray-400"}`}>📞 {addr.phone}</p>
                </div>
                {selectedAddress === addr.id && <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />}
              </div>
            ))}
            <button
              onClick={() => toggle("payment")}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs rounded-2xl transition-all duration-200 mt-2 shadow-lg shadow-blue-600/20"
            >
              DELIVER HERE
            </button>
          </div>
        </Step>

        {/* ── STEP 2: Order Summary ── */}
        <Step id="items" stepNum={2} title="Order Summary" summary={`${orderItems.length} item${orderItems.length > 1 ? "s" : ""}`}>
          <div className="flex flex-col gap-2.5 mt-3">
            {orderItems.map((item) => (
              <div key={item.id} className={`flex gap-3 p-3 rounded-2xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                <div className={`w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center p-1.5 ${isDark ? "bg-white/10" : "bg-white"}`}>
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold line-clamp-2 mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>{item.title}</p>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="flex items-center gap-0.5 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      <span>{item.rating?.rate ?? "4.2"}</span>
                      <Star className="w-2 h-2 fill-white" />
                    </div>
                    <span className={`text-[9px] ${isDark ? "text-white/30" : "text-gray-400"}`}>Qty: {item.quantity}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>₹{item.price}</span>
                    <span className={`text-[10px] line-through ${isDark ? "text-white/30" : "text-gray-400"}`}>₹{origPrice(item.price)}</span>
                    <span className="text-[10px] font-bold text-green-600">
                      {Math.round(((origPrice(item.price) - item.price) / origPrice(item.price)) * 100)}% off
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => toggle("payment")}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs rounded-2xl transition-all duration-200 mt-2 shadow-lg shadow-blue-600/20"
            >
              CONTINUE
            </button>
          </div>
        </Step>

        {/* ── STEP 3: Payment ── */}
        <Step id="payment" stepNum={3} title="Payment Options" summary={PAYMENT_OPTIONS.find(p=>p.id===selectedPayment)?.label}>
          <div className="flex flex-col gap-2 mt-3">
            {PAYMENT_OPTIONS.map(({ id, label, sub, icon: Icon }) => (
              <div
                key={id}
                onClick={() => setSelectedPayment(id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedPayment === id
                    ? isDark ? "border-blue-500 bg-blue-500/10" : "border-blue-500 bg-blue-50"
                    : isDark ? "border-white/10 hover:border-white/20" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selectedPayment === id ? "border-blue-500" : isDark ? "border-white/30" : "border-gray-300"}`}>
                  {selectedPayment === id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                </div>
                <Icon className={`w-5 h-5 flex-shrink-0 ${isDark ? "text-white/60" : "text-gray-500"}`} />
                <div>
                  <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{label}</p>
                  <p className={`text-[10px] ${isDark ? "text-white/40" : "text-gray-400"}`}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Step>

        {/* ── Price Details Section ── */}
        <div className={`mt-4 rounded-2xl border overflow-hidden ${isDark ? "bg-[#0b0f0d] border-emerald-900/30" : "bg-white border-gray-200 shadow-sm"}`}>
          <div className={`px-5 py-3 border-b ${isDark ? "border-white/5" : "border-gray-100"}`}>
            <p className={`text-[11px] font-black tracking-[2px] uppercase ${isDark ? "text-white/40" : "text-gray-400"}`}>
              Price Details ({orderItems.reduce((a, i) => a + i.quantity, 0)} item{orderItems.length > 1 ? "s" : ""})
            </p>
          </div>
          
          <div className="p-5 flex flex-col gap-4">
            {[
              { label: "Price", val: `₹${totalMRP.toFixed(0)}`, color: "" },
              { label: "Discount", val: `−₹${totalDisc.toFixed(0)}`, color: "text-green-600" },
              { label: "Delivery Charges", val: delivery === 0 ? "FREE" : `₹${delivery}`, color: delivery === 0 ? "text-green-600" : "" },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex items-center justify-between">
                <span className={`text-sm ${isDark ? "text-white/70" : "text-gray-600"}`}>{label}</span>
                <span className={`text-sm font-medium ${color || (isDark ? "text-white" : "text-gray-800")}`}>{val}</span>
              </div>
            ))}
            
            <div className={`h-px w-full my-1 ${isDark ? "bg-white/5" : "bg-gray-100"}`} />
            
            <div className="flex items-center justify-between">
              <span className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Total Amount</span>
              <span className={`text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>₹{grandTotal.toFixed(0)}</span>
            </div>
          </div>
          
          <div className={`px-5 py-3 border-t ${isDark ? "bg-emerald-500/5 border-emerald-900/20" : "bg-green-50/50 border-green-100"}`}>
            <p className="text-green-600 text-[11px] font-bold flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" />
              You will save ₹{totalDisc.toFixed(0)} on this order
            </p>
          </div>
        </div>

        {/* ── Delivery Info ── */}
        <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border ${isDark ? "bg-emerald-500/5 border-emerald-900/30" : "bg-blue-50/30 border-blue-100"}`}>
          <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div>
            <p className={`text-xs font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
              {delivery === 0 ? "Free Fast Delivery" : `₹${delivery} delivery charge`}
            </p>
            <p className={`text-[10px] ${isDark ? "text-white/40" : "text-gray-400"}`}>
              Expected by {new Date(Date.now() + 4 * 86400000).toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      {/* ── Sticky Place Order Bar ── */}
      <div className={`fixed bottom-0 md:bottom-0 left-0 right-0 z-40 mb-16 md:mb-0 border-t px-4 py-3 flex items-center justify-between gap-4 transition-all duration-300 ${isDark ? "bg-[#0b0f0d]/98 border-emerald-900/30 backdrop-blur-2xl" : "bg-white border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"}`}>
        <div>
          <div className="flex items-baseline gap-1">
             <p className={`text-lg font-black font-outfit ${isDark ? "text-white" : "text-gray-900"}`}>₹{grandTotal.toFixed(0)}</p>
             <button onClick={() => toggle("summary")} className="text-[10px] font-bold text-blue-500 hover:underline">View Price</button>
          </div>
          <p className={`text-[10px] font-bold text-green-600 uppercase tracking-tighter`}>Delivery Charge Applied</p>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="flex-1 max-w-[200px] py-3.5 bg-amber-400 hover:bg-amber-500 active:scale-95 disabled:opacity-70 disabled:scale-100 text-gray-900 font-black text-sm rounded-2xl transition-all duration-200 shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2 uppercase tracking-wide"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              Placing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
