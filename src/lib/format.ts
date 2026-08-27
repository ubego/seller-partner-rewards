function groupThousands(value: number): string {
  const negative = value < 0;
  const abs = Math.abs(Math.round(value));
  const grouped = String(abs).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
  return `${negative ? '−' : ''}${grouped}`;
}

export function formatNumber(value: number): string {
  return groupThousands(value);
}

export function formatMoney(value: number): string {
  return `${groupThousands(value)} ₽`;
}

export function formatPercent(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  if (Number.isInteger(rounded)) {
    return `${rounded}%`;
  }
  return `${rounded.toFixed(1).replace('.', ',')}%`;
}

export function formatCoefficient(value: number): string {
  return `×${value.toFixed(2).replace('.', ',')}`;
}

export function pluralize(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
}
