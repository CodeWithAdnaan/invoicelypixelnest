import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import InvoiceActions from "@/components/InvoiceActions";
import { InvoiceData, generateInvoiceNumber, generateId } from "@/types/invoice";

const getDefaultInvoice = (): InvoiceData => {
  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + 30);

  return {
    id: generateId(),
    companyName: "",
    companyAddress: "",
    companyLogo: "",
    companyWebsite: "",
    clientName: "",
    clientEmail: "",
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: today.toISOString().split("T")[0],
    dueDate: dueDate.toISOString().split("T")[0],
    items: [
      {
        id: generateId(),
        name: "",
        quantity: 1,
        price: 0,
      },
    ],
    taxRate: 0,
    notes: "",
    currency: "USD",
    template: "classic",
    isAdvancePayment: false,
    advancePaymentAmount: 0,
    createdAt: new Date().toISOString(),
  };
};

const InvoiceBuilder = () => {
  const [invoice, setInvoice] = useState<InvoiceData>(getDefaultInvoice);
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8 animate-fade-up">
            <h1 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-2">
              Create Invoice
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below and watch your invoice come to life.
            </p>
          </div>

          {/* Actions Bar */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <InvoiceActions invoice={invoice} previewRef={previewRef} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="order-2 xl:order-1">
              <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
            </div>

            {/* Preview Section */}
            <div className="order-1 xl:order-2">
              <div className="sticky top-24">
                <div className="mb-4">
                  <h2 className="font-display text-lg font-medium text-foreground">
                    Live Preview
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your invoice updates as you type
                  </p>
                </div>
                <div className="overflow-auto max-h-[calc(100vh-200px)] rounded-xl border border-border shadow-strong">
                  <InvoicePreview ref={previewRef} invoice={invoice} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InvoiceBuilder;
