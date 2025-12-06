import { Plus, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvoiceData, InvoiceItem, InvoiceTemplate, CurrencyCode, currencies, generateId, formatCurrency } from "@/types/invoice";
import { useRef } from "react";

interface InvoiceFormProps {
  invoice: InvoiceData;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

const templates: { value: InvoiceTemplate; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
];

const InvoiceForm = ({ invoice, setInvoice }: InvoiceFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof InvoiceData, value: string | number) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoice(prev => ({ ...prev, companyLogo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setInvoice(prev => ({ ...prev, companyLogo: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: generateId(),
      name: '',
      quantity: 1,
      price: 0,
    };
    setInvoice(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeItem = (id: string) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const calculateItemTotal = (item: InvoiceItem) => item.quantity * item.price;

  return (
    <div className="space-y-6">
      {/* Template & Currency Selection */}
      <div className="form-section animate-fade-up" style={{ animationDelay: '0.05s' }}>
        <h3 className="font-display text-lg font-medium text-foreground mb-4">Invoice Style</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Template</Label>
            <Select
              value={invoice.template}
              onValueChange={(value) => updateField('template', value)}
            >
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.value} value={template.value}>
                    {template.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select
              value={invoice.currency}
              onValueChange={(value) => updateField('currency', value)}
            >
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="form-section animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="font-display text-lg font-medium text-foreground mb-4">Your Company</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Your Company Name"
              value={invoice.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div className="flex items-center gap-3">
              {invoice.companyLogo ? (
                <div className="relative">
                  <img 
                    src={invoice.companyLogo} 
                    alt="Company Logo" 
                    className="h-16 w-16 object-contain rounded-lg border border-border bg-background"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Logo
                </Button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="companyAddress">Company Address</Label>
            <Textarea
              id="companyAddress"
              placeholder="123 Business St, City, State, ZIP"
              value={invoice.companyAddress}
              onChange={(e) => updateField('companyAddress', e.target.value)}
              className="input-field min-h-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Client Details */}
      <div className="form-section animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <h3 className="font-display text-lg font-medium text-foreground mb-4">Bill To</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              placeholder="Client Name"
              value={invoice.clientName}
              onChange={(e) => updateField('clientName', e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="client@example.com"
              value={invoice.clientEmail}
              onChange={(e) => updateField('clientEmail', e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="form-section animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <h3 className="font-display text-lg font-medium text-foreground mb-4">Invoice Details</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              value={invoice.invoiceNumber}
              onChange={(e) => updateField('invoiceNumber', e.target.value)}
              className="input-field font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoiceDate">Invoice Date</Label>
            <Input
              id="invoiceDate"
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) => updateField('invoiceDate', e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={invoice.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="form-section animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-medium text-foreground">Items</h3>
          <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>
        
        <div className="space-y-3">
          {/* Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-3 text-sm font-medium text-muted-foreground px-1">
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Total</div>
            <div className="col-span-1"></div>
          </div>
          
          {invoice.items.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-lg bg-secondary/50 animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="md:col-span-5">
                <Label className="md:hidden text-xs text-muted-foreground mb-1 block">Description</Label>
                <Input
                  placeholder="Item description"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="md:hidden text-xs text-muted-foreground mb-1 block">Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="md:hidden text-xs text-muted-foreground mb-1 block">Price</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2 flex items-center">
                <Label className="md:hidden text-xs text-muted-foreground mr-2">Total:</Label>
                <span className="font-medium text-foreground">
                  {formatCurrency(calculateItemTotal(item), invoice.currency)}
                </span>
              </div>
              <div className="md:col-span-1 flex items-center justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  disabled={invoice.items.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax & Notes */}
      <div className="form-section animate-fade-up" style={{ animationDelay: '0.5s' }}>
        <h3 className="font-display text-lg font-medium text-foreground mb-4">Additional Details</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input
              id="taxRate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={invoice.taxRate}
              onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
              className="input-field"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Payment terms, thank you note, or any additional information..."
              value={invoice.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              className="input-field min-h-[100px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;