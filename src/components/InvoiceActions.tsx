import { Download, Printer, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InvoiceData } from "@/types/invoice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceActionsProps {
  invoice: InvoiceData;
  previewRef: React.RefObject<HTMLDivElement>;
}

const InvoiceActions = ({ invoice, previewRef }: InvoiceActionsProps) => {
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your invoice.",
      });

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${invoice.invoiceNumber}.pdf`);

      toast({
        title: "PDF Downloaded!",
        description: `Invoice ${invoice.invoiceNumber} has been saved.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    try {
      const savedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
      const existingIndex = savedInvoices.findIndex((inv: InvoiceData) => inv.id === invoice.id);

      if (existingIndex >= 0) {
        savedInvoices[existingIndex] = invoice;
      } else {
        savedInvoices.push(invoice);
      }

      localStorage.setItem("invoices", JSON.stringify(savedInvoices));

      toast({
        title: "Invoice Saved!",
        description: "Your invoice has been saved to local storage.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save invoice. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="accent" onClick={handleDownloadPDF} className="gap-2">
        <Download className="h-4 w-4" />
        Download PDF
      </Button>
      <Button variant="outline" onClick={handlePrint} className="gap-2">
        <Printer className="h-4 w-4" />
        Print
      </Button>
      <Button variant="secondary" onClick={handleSave} className="gap-2">
        <Save className="h-4 w-4" />
        Save
      </Button>
    </div>
  );
};

export default InvoiceActions;
