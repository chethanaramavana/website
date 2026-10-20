export function kaprekar(input: string) {
  if (!/^\d{4}$/.test(input))
    throw new Error('Enter exactly four digits, for example 2026.');
  if (new Set(input).size === 1)
    throw new Error('Choose digits that are not all the same.');
  const steps: { descending: string; ascending: string; result: string }[] = [];
  let current = input;
  while (current !== '6174' && steps.length < 8) {
    const ascending = current.split('').sort().join('');
    const descending = ascending.split('').reverse().join('');
    current = String(Number(descending) - Number(ascending)).padStart(4, '0');
    steps.push({ descending, ascending, result: current });
  }
  return steps;
}
