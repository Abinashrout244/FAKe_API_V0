import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProductContext } from "../utils/ProductContext";
import { clearCart } from "../utils/CartSlice";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  MapPin,
  CreditCard,
  Wallet,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  Tag,
  Star,
  Banknote,
  Smartphone,
  Check,
  Package,
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
  const [openSection, setOpenSection] = useState("address"); // login | address | items | payment
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
      
      // Celebration!
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }, 1800);
  };

  const toggle = (s) => setOpenSection((p) => (p === s ? "" : s));

  /* ── Order Confirmed Screen ─────────────────────────── */
  if (placed) {
    return (
      <div className={`min-h-screen pt-24 pb-32 px-6 flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? "bg-[#080c0a]" : "bg-gray-50"}`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className={`w-full max-w-lg rounded-[2.5rem] border p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden ${isDark ? "bg-[#0b0f0d] border-emerald-900/30" : "bg-white border-emerald-100 shadow-2xl shadow-emerald-500/10"}`}
        >
          {/* Success Decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400" />
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 relative"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full border-2 border-emerald-500/20" 
            />
          </motion.div>

          <h2 className={`text-3xl md:text-4xl font-syne font-black mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Order Confirmed!
          </h2>
          <p className={`text-sm md:text-base mb-8 max-w-[300px] leading-relaxed ${isDark ? "text-white/50" : "text-gray-500"}`}>
            Yay! Your items are on their way to being delivered.
          </p>

          <div className={`w-full rounded-3xl p-6 mb-8 text-left ${isDark ? "bg-white/5 border border-white/5" : "bg-emerald-50/50 border border-emerald-100"}`}>
            <div className="flex items-center justify-between mb-4">
              <p className={`text-[10px] font-black tracking-[3px] uppercase ${isDark ? "text-emerald-500" : "text-emerald-600"}`}>Order Details</p>
              <span className={`text-[10px] font-bold ${isDark ? "text-white/30" : "text-gray-400"}`}>ID: #FK{Math.floor(Math.random()*1000000)}</span>
            </div>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex-shrink-0 shadow-sm">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-gray-800"}`}>{item.title}</p>
                    <p className={`text-[10px] ${isDark ? "text-white/40" : "text-gray-500"}`}>Qty: {item.quantity} · ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-6 pt-4 border-t ${isDark ? "border-white/5" : "border-emerald-100"} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span className={`text-[11px] font-bold ${isDark ? "text-white/70" : "text-gray-600"}`}>Arriving in 3-5 days</span>
              </div>
              <p className={`text-sm font-black ${isDark ? "text-white" : "text-gray-900"}`}>₹{grandTotal.toFixed(0)}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-sm transition-all duration-300 active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/track-order")}
              className={`flex-1 py-4 font-black rounded-2xl text-sm transition-all duration-300 active:scale-95 border ${isDark ? "border-white/10 text-white hover:bg-white/5" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
            >
              Track Order
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Collapsible Step Component ─────────────────────── */
  const Step = ({ id, stepNum, title, children, summary, isCompleted }) => {
    const isOpen = openSection === id;
    return (
      <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isDark ? "bg-[#0b0f0d] border-emerald-900/30" : "bg-white border-gray-200 shadow-sm"}`}>
        <button
          onClick={() => toggle(id)}
          className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50"}`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-black transition-all duration-300 ${isCompleted ? "bg-emerald-500 text-white" : isOpen ? "bg-blue-600 text-white" : isDark ? "bg-white/5 text-white/40" : "bg-gray-100 text-gray-400"}`}>
              {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
            </div>
            <div>
              <p className={`text-[9px] font-black tracking-[2px] uppercase mb-0.5 ${isDark ? "text-white/30" : "text-gray-400"}`}>
                {isCompleted ? "Completed" : "Step " + stepNum}
              </p>
              <p className={`text-sm md:text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isOpen && summary && (
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}>
                {summary}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${isDark ? "text-white/20" : "text-gray-300"}`} />
          </div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className={`px-5 pb-6 pt-2 border-t ${isDark ? 'border-white/5' : 'border-gray-50'}`}>
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  /* ── Main Order Page ─────────────────────────────────── */
  return (
    <div className={`min-h-screen pt-20 pb-44 transition-colors duration-500 ${isDark ? "bg-[#080c0a]" : "bg-gray-50"}`}>

      {/* ── Top Bar ── */}
      <div className={`sticky top-16 z-30 flex items-center gap-4 px-4 md:px-12 py-4 border-b ${isDark ? "bg-[#080c0a]/90 border-emerald-900/30 backdrop-blur-xl" : "bg-white/90 border-gray-100 backdrop-blur-xl"}`}>
        <button onClick={() => navigate(-1)} className={`p-2 rounded-xl transition-all duration-200 ${isDark ? "text-emerald-400 hover:bg-emerald-500/10" : "text-gray-600 hover:bg-gray-100"}`}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className={`text-lg md:text-xl font-black font-syne ${isDark ? "text-white" : "text-gray-900"}`}>
            Checkout
          </h1>
          <p className={`text-[10px] font-bold flex items-center gap-1.5 ${isDark ? "text-emerald-500/60" : "text-emerald-600/60"}`}>
            <ShieldCheck className="w-3 h-3" /> Secure Payment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── Checkout Steps ── */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          
          {/* STEP 1: LOGIN (Mocked as completed) */}
          <Step 
            id="login" 
            stepNum={1} 
            title="Login" 
            summary="Abinash Rout · +91 98765 43210" 
            isCompleted={true}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-black">AR</div>
                <div>
                  <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Abinash Rout</p>
                  <p className={`text-[11px] ${isDark ? "text-white/40" : "text-gray-500"}`}>abinash@example.com</p>
                </div>
              </div>
              <button className="text-xs font-black text-blue-500 hover:underline uppercase tracking-wider">Change</button>
            </div>
          </Step>

          {/* STEP 2: DELIVERY ADDRESS */}
          <Step 
            id="address" 
            stepNum={2} 
            title="Delivery Address" 
            summary={ADDRESSES.find(a=>a.id===selectedAddress)?.city}
            isCompleted={openSection !== "address" && openSection !== "login"}
          >
            <div className="flex flex-col gap-3 mt-2">
              {ADDRESSES.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`relative flex gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedAddress === addr.id
                      ? "border-blue-600 bg-blue-600/5 shadow-lg shadow-blue-600/5"
                      : isDark ? "border-white/5 hover:border-white/10" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className={`mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${selectedAddress === addr.id ? "border-blue-600 bg-blue-600" : isDark ? "border-white/20" : "border-gray-300"}`}>
                    {selectedAddress === addr.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-sm font-black ${isDark ? "text-white" : "text-gray-900"}`}>{addr.name}</span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"}`}>{addr.tag}</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      {addr.line}, {addr.city}, {addr.state} - {addr.pin}
                    </p>
                    <p className={`text-xs mt-2 font-bold ${isDark ? "text-white/70" : "text-gray-600"}`}>📞 {addr.phone}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setOpenSection("items")}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm rounded-2xl transition-all duration-200 mt-2 shadow-lg shadow-blue-600/20 uppercase tracking-widest"
              >
                Deliver Here
              </button>
            </div>
          </Step>

          {/* STEP 3: ORDER SUMMARY */}
          <Step 
            id="items" 
            stepNum={3} 
            title="Order Summary" 
            summary={`${orderItems.length} Item${orderItems.length > 1 ? "s" : ""}`}
            isCompleted={openSection === "payment"}
          >
            <div className="flex flex-col gap-4 mt-2">
              {orderItems.map((item) => (
                <div key={item.id} className={`flex gap-5 p-4 rounded-3xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                  <div className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-2xl overflow-hidden flex items-center justify-center p-3 transition-transform hover:scale-105 ${isDark ? "bg-white/10" : "bg-white shadow-sm"}`}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className={`text-xs md:text-sm font-bold line-clamp-2 mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</p>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded">
                        <span>{item.rating?.rate ?? "4.2"}</span>
                        <Star className="w-2.5 h-2.5 fill-white" />
                      </div>
                      <span className={`text-[10px] font-bold ${isDark ? "text-white/30" : "text-gray-400"}`}>Qty: {item.quantity}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>₹{item.price}</span>
                      <span className={`text-xs line-through ${isDark ? "text-white/20" : "text-gray-300"}`}>₹{origPrice(item.price)}</span>
                      <span className="text-xs font-black text-emerald-500">
                        {Math.round(((origPrice(item.price) - item.price) / origPrice(item.price)) * 100)}% Off
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className={`p-4 rounded-2xl border border-dashed ${isDark ? "border-white/10 bg-white/5" : "border-emerald-200 bg-emerald-50/30"}`}>
                <p className={`text-[10px] md:text-xs leading-relaxed ${isDark ? "text-white/40" : "text-gray-500"}`}>
                  Order confirmation email will be sent to <span className="font-bold text-blue-500">abinash@example.com</span>. 
                  Delivery expected by <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{new Date(Date.now() + 4 * 86400000).toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })}</span>.
                </p>
              </div>
              <button
                onClick={() => setOpenSection("payment")}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm rounded-2xl transition-all duration-200 mt-2 shadow-lg shadow-blue-600/20 uppercase tracking-widest"
              >
                Continue
              </button>
            </div>
          </Step>

          {/* STEP 4: PAYMENT OPTIONS */}
          <Step 
            id="payment" 
            stepNum={4} 
            title="Payment Options" 
            summary={PAYMENT_OPTIONS.find(p=>p.id===selectedPayment)?.label}
          >
            <div className="flex flex-col gap-3 mt-2">
              {PAYMENT_OPTIONS.map(({ id, label, sub, icon: Icon }) => (
                <div
                  key={id}
                  onClick={() => setSelectedPayment(id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedPayment === id
                      ? "border-blue-600 bg-blue-600/5 shadow-lg shadow-blue-600/5"
                      : isDark ? "border-white/5 hover:border-white/10" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${selectedPayment === id ? "border-blue-600 bg-blue-600" : isDark ? "border-white/20" : "border-gray-300"}`}>
                    {selectedPayment === id && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className={`p-2.5 rounded-xl ${isDark ? "bg-white/5 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm md:text-base font-black ${isDark ? "text-white" : "text-gray-900"}`}>{label}</p>
                    <p className={`text-[10px] md:text-xs ${isDark ? "text-white/40" : "text-gray-500"}`}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </Step>
        </div>

        {/* ── Side Sidebar: Price Details ── */}
        <div className="lg:block">
          <div className={`sticky top-32 rounded-[2rem] border overflow-hidden transition-all duration-500 ${isDark ? "bg-[#0b0f0d] border-emerald-900/30" : "bg-white border-emerald-100 shadow-xl shadow-emerald-500/5"}`}>
            <div className={`px-6 py-4 border-b ${isDark ? "border-white/5" : "border-emerald-50"}`}>
              <p className={`text-[11px] font-black tracking-[3px] uppercase ${isDark ? "text-white/30" : "text-gray-400"}`}>
                Price Details
              </p>
            </div>
            
            <div className="p-6 flex flex-col gap-5">
              {[
                { label: `Price (${orderItems.reduce((a,i)=>a+i.quantity,0)} Items)`, val: `₹${totalMRP.toFixed(0)}`, color: "" },
                { label: "Discount", val: `−₹${totalDisc.toFixed(0)}`, color: "text-emerald-500" },
                { label: "Delivery Charges", val: delivery === 0 ? "FREE" : `₹${delivery}`, color: delivery === 0 ? "text-emerald-500" : "" },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? "text-white/60" : "text-gray-600"}`}>{label}</span>
                  <span className={`text-sm font-black ${color || (isDark ? "text-white" : "text-gray-900")}`}>{val}</span>
                </div>
              ))}
              
              <div className={`h-px w-full my-1 ${isDark ? "bg-white/5" : "bg-emerald-50"}`} />
              
              <div className="flex items-center justify-between">
                <span className={`text-lg font-black ${isDark ? "text-white" : "text-gray-900"}`}>Total Amount</span>
                <span className={`text-lg font-black ${isDark ? "text-white" : "text-gray-900"}`}>₹{grandTotal.toFixed(0)}</span>
              </div>
            </div>
            
            <div className={`px-6 py-4 border-t ${isDark ? "bg-emerald-500/5 border-emerald-900/20" : "bg-emerald-50/50 border-emerald-100"}`}>
              <p className="text-emerald-500 text-[11px] font-black flex items-center gap-2 uppercase tracking-tight">
                <Tag className="w-3.5 h-3.5" />
                You will save ₹{totalDisc.toFixed(0)} on this order
              </p>
            </div>

            {/* Extra Trust Badges */}
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-500 opacity-50" />
                <p className={`text-[8px] font-black uppercase tracking-widest ${isDark ? "text-white/30" : "text-gray-400"}`}>Secure Payments</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Package className="w-6 h-6 text-emerald-500 opacity-50" />
                <p className={`text-[8px] font-black uppercase tracking-widest ${isDark ? "text-white/30" : "text-gray-400"}`}>Original Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Place Order Bar (Mobile only) ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t px-6 py-4 flex items-center justify-between gap-6 transition-all duration-300 ${isDark ? "bg-[#0b0f0d]/98 border-emerald-900/30 backdrop-blur-2xl" : "bg-white border-gray-100 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"}`}>
        <div>
           <p className={`text-xl font-black font-outfit ${isDark ? "text-white" : "text-gray-900"}`}>₹{grandTotal.toFixed(0)}</p>
           <p className={`text-[10px] font-bold text-emerald-500 uppercase tracking-tighter`}>Price Detail View</p>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading || openSection !== "payment"}
          className="flex-1 max-w-[220px] py-4 bg-amber-400 hover:bg-amber-500 active:scale-95 disabled:opacity-50 disabled:grayscale disabled:scale-100 text-gray-900 font-black text-sm rounded-2xl transition-all duration-200 shadow-xl shadow-amber-400/20 flex items-center justify-center gap-3 uppercase tracking-widest"
        >
          {loading ? (
            <div className="w-5 h-5 border-3 border-gray-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            "Place Order"
          )}
        </button>
      </div>

      {/* ── Desktop Place Order Button (Inside Payment Section) ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-6 hidden lg:block">
        <div className="lg:col-span-2 flex justify-end">
          {openSection === "payment" && (
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full max-w-sm py-5 bg-amber-400 hover:bg-amber-500 active:scale-95 disabled:opacity-50 text-gray-900 font-black text-base rounded-[2rem] transition-all duration-300 shadow-2xl shadow-amber-400/30 flex items-center justify-center gap-4 uppercase tracking-[0.2em]"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                "Confirm Order"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
