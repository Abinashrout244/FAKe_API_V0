import { useState } from "react";
import {
  generateQRCode,
  downloadQRCode,
  clearQRCode,
} from "shadow-qr-generator";

export default function ShowQR() {
  const [input, setInput] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    const text = input.trim();

    if (!text) {
      alert("Please enter some text or URL.");
      return;
    }

    try {
      setLoading(true);

      const dataUrl = await generateQRCode(text, {
        width: 300,
        darkColor: "#111827",
        lightColor: "#ffffff",
      });

      setQrImage(dataUrl);
    } catch (error) {
      console.error("QR generation failed:", error);
      alert("Failed to generate QR code.");
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrImage) {
      alert("Please generate a QR code first.");
      return;
    }

    downloadQRCode(qrImage, "shadow-qr-code.png");
  };

  const clearQR = () => {
    clearQRCode({
      input: null,
      image: null,
    });

    setInput("");
    setQrImage("");
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950 px-4 pb-6 pt-20 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl sm:p-5">
        {/* Header */}
        <div className="mb-3 text-center">
          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Shadow QR Generator
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Generate, download, and clear QR codes seamlessly.
          </p>
        </div>

        {/* Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              generateQR();
            }
          }}
          placeholder="Enter URL or text..."
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/10"
        />

        {/* QR Preview (Compact layout to avoid vertical overflow) */}
        <div className="my-3 flex min-h-[170px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          {qrImage ? (
            <div className="rounded-xl bg-white p-3 shadow-md transition-transform duration-200 hover:scale-105">
              <img
                src={qrImage}
                alt="Generated QR Code"
                className="h-auto w-full max-w-[140px] sm:max-w-[160px]"
              />
            </div>
          ) : (
            <p className="text-xs text-zinc-600">QR code will appear here</p>
          )}
        </div>

        {/* Generate + Clear */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={generateQR}
            disabled={loading}
            className="rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate QR"}
          </button>

          <button
            onClick={clearQR}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 active:scale-[0.98]"
          >
            Clear
          </button>
        </div>

        {/* Download Button */}
        <button
          onClick={downloadQR}
          disabled={!qrImage}
          className="mt-2.5 w-full rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
        >
          ↓ Download QR Code
        </button>

        {/* Footer */}
        <p className="mt-3 text-center text-xs text-zinc-600">
          Powered by{" "}
          <span className="font-medium text-zinc-400">shadow-qr-generator</span>
        </p>
      </div>
    </main>
  );
}
