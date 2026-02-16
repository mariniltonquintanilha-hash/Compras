
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const parseBRLToFloat = (value: string): number => {
  // Removes "R$", replaces comma with dot, removes spaces
  const cleanValue = value.replace('R$', '').replace(/\s/g, '').replace('.', '').replace(',', '.');
  return parseFloat(cleanValue) || 0;
};
