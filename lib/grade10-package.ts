export const GRADE10_PACKAGE = {
  id: 'cbse-grade10-complete-2026-27',
  title: 'CBSE Grade 10 Complete Practice Package',
  amount: 100000,
  path: '/cbse/grade-10/complete-package',
  expiresAt: Date.parse('2027-04-01T00:00:00+05:30'),
  expiryLabel: '31 March 2027',
} as const;
export const grade10PackageOnSale = (now = Date.now()) => now < GRADE10_PACKAGE.expiresAt;
