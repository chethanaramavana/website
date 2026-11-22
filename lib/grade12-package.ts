/** CBSE Grade 12 board-exam package. JEE papers are not included. */
export const GRADE12_PACKAGE = {
  id: 'cbse-grade12-board-2026-27',
  title: 'CBSE Grade 12 Board Exam Package',
  amount: 150000,
  path: '/cbse/grade-12/board-package',
  expiresAt: Date.parse('2027-06-01T00:00:00+05:30'),
  expiryLabel: '31 May 2027',
} as const;
export const grade12PackageOnSale = (now = Date.now()) => now < GRADE12_PACKAGE.expiresAt;
