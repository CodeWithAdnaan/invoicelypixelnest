import { forwardRef } from "react";
import {
  InvoiceData,
  formatCurrency,
  formatDate,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "@/types/invoice";

interface InvoicePreviewProps {
  invoice: InvoiceData;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ invoice }, ref) => {
    const subtotal = calculateSubtotal(invoice.items);
    const tax = calculateTax(subtotal, invoice.taxRate);
    const total = calculateTotal(invoice.items, invoice.taxRate);
    const { currency, template } = invoice;

    const calculateItemTotal = (item: { quantity: number; price: number }) =>
      item.quantity * item.price;

    // Template-specific styles
    const getTemplateStyles = () => {
      switch (template) {
        case 'modern':
          return {
            container: 'bg-gradient-to-br from-primary/5 to-accent/5',
            header: 'bg-primary text-primary-foreground p-6 -m-8 mb-8 rounded-t-xl',
            headerTitle: 'text-primary-foreground',
            invoiceLabel: 'bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold',
            tableHeader: 'bg-primary/10',
            totalSection: 'bg-primary/5 rounded-xl p-4',
          };
        case 'minimal':
          return {
            container: 'bg-white',
            header: '',
            headerTitle: 'text-foreground',
            invoiceLabel: 'text-muted-foreground text-sm uppercase tracking-widest',
            tableHeader: 'border-b-2 border-foreground',
            totalSection: '',
          };
        default: // classic
          return {
            container: 'bg-card',
            header: '',
            headerTitle: 'text-invoice-header',
            invoiceLabel: '',
            tableHeader: '',
            totalSection: '',
          };
      }
    };

    const styles = getTemplateStyles();

    return (
      <div
        ref={ref}
        className={`invoice-paper p-8 min-h-[800px] invoice-print-area ${styles.container}`}
      >
        {/* Header */}
        <div className={`flex justify-between items-start mb-8 pb-6 ${template !== 'modern' ? 'border-b border-border' : ''} ${styles.header}`}>
          <div className="flex items-start gap-4">
            {invoice.companyLogo && (
              <img 
                src={invoice.companyLogo} 
                alt="Company Logo" 
                className={`h-16 w-16 object-contain rounded-lg ${template === 'modern' ? 'bg-white/10 p-1' : ''}`}
              />
            )}
            <div>
              <h1 className={`font-display text-3xl font-semibold mb-2 ${styles.headerTitle}`}>
                {invoice.companyName || "Your Company"}
              </h1>
              <p className={`whitespace-pre-line text-sm ${template === 'modern' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                {invoice.companyAddress || "Company Address"}
              </p>
              {invoice.companyWebsite && (
                <p className={`text-sm mt-1 ${template === 'modern' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {invoice.companyWebsite}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            {template === 'modern' ? (
              <span className={styles.invoiceLabel}>INVOICE</span>
            ) : (
              <h2 className="font-display text-2xl font-medium text-foreground mb-2">
                INVOICE
              </h2>
            )}
            <p className={`font-mono text-sm mt-2 ${template === 'modern' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              {invoice.invoiceNumber}
            </p>
          </div>
        </div>

        {/* Bill To & Dates */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Bill To
            </h3>
            <p className="font-medium text-foreground">
              {invoice.clientName || "Client Name"}
            </p>
            <p className="text-sm text-muted-foreground">
              {invoice.clientEmail || "client@email.com"}
            </p>
          </div>
          <div className="text-right">
            <div className="mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Invoice Date
              </h3>
              <p className="text-sm text-foreground">
                {formatDate(invoice.invoiceDate) || "Select date"}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Due Date
              </h3>
              <p className="text-sm text-foreground">
                {formatDate(invoice.dueDate) || "Select date"}
              </p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className={`border-b border-border ${styles.tableHeader}`}>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Description
                </th>
                <th className="text-center py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Qty
                </th>
                <th className="text-right py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Price
                </th>
                <th className="text-right py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr
                  key={item.id}
                  className={index !== invoice.items.length - 1 ? "border-b border-border/50" : ""}
                >
                  <td className="py-4 text-sm text-foreground">
                    {item.name || "Item description"}
                  </td>
                  <td className="py-4 text-center text-sm text-foreground">
                    {item.quantity}
                  </td>
                  <td className="py-4 text-right text-sm text-foreground">
                    {formatCurrency(item.price, currency)}
                  </td>
                  <td className="py-4 text-right text-sm font-medium text-foreground">
                    {formatCurrency(calculateItemTotal(item), currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className={`w-64 ${styles.totalSection}`}>
            <div className="flex justify-between py-2 text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">{formatCurrency(subtotal, currency)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm border-b border-border">
              <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
              <span className="text-foreground">{formatCurrency(tax, currency)}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="font-display text-lg font-semibold text-foreground">Total</span>
              <span className={`font-display text-lg font-semibold ${template === 'modern' ? 'text-accent' : 'text-invoice-header'}`}>
                {formatCurrency(total, currency)}
              </span>
            </div>
            {invoice.isAdvancePayment && (
              <>
                <div className="flex justify-between py-2 text-sm border-t border-border">
                  <span className="text-muted-foreground">Advance Paid</span>
                  <span className="text-green-600">-{formatCurrency(invoice.advancePaymentAmount, currency)}</span>
                </div>
                <div className="flex justify-between py-2 text-sm">
                  <span className="font-medium text-foreground">Amount Due</span>
                  <span className={`font-semibold ${template === 'modern' ? 'text-accent' : 'text-destructive'}`}>
                    {formatCurrency(Math.max(0, total - invoice.advancePaymentAmount), currency)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="pt-6 border-t border-border">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Notes
            </h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {invoice.notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-8">
          <p className="text-center text-xs text-muted-foreground">
            Thank you for your business
          </p>
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = "InvoicePreview";

export default InvoicePreview;