export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export type InvoiceTemplate = 'classic' | 'modern' | 'minimal';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD' | 'AUD' | 'JPY' | 'PKR';

export const currencies: { code: CurrencyCode; name: string; symbol: string }[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs' },
];

export interface InvoiceData {
  id: string;
  companyName: string;
  companyAddress: string;
  companyLogo: string;
  companyWebsite: string;
  clientName: string;
  clientEmail: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  taxRate: number;
  notes: string;
  currency: CurrencyCode;
  template: InvoiceTemplate;
  isAdvancePayment: boolean;
  advancePaymentAmount: number;
  createdAt: string;
}

export const generateInvoiceNumber = (): string => {
  const prefix = 'INV';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const calculateItemTotal = (item: InvoiceItem): number => {
  return item.quantity * item.price;
};

export const calculateSubtotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
};

export const calculateTax = (subtotal: number, taxRate: number): number => {
  return subtotal * (taxRate / 100);
};

export const calculateTotal = (items: InvoiceItem[], taxRate: number): number => {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal, taxRate);
  return subtotal + tax;
};

export const formatCurrency = (amount: number, currencyCode: CurrencyCode = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
