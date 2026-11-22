/** JEE Main and JEE Advanced mathematics package: every Grade 11 and Grade 12 JEE chapter paper, the full-syllabus entrance papers and links to the free notes. */
export const JEE_PACKAGE = {
  id: 'jee-main-advanced-2026-27',
  title: 'JEE Main and Advanced Mathematics Package',
  amount: 250000,
  path: '/jee/package',
  expiresAt: Date.parse('2027-06-01T00:00:00+05:30'),
  expiryLabel: '31 May 2027',
} as const;
export const jeePackageOnSale = (now = Date.now()) => now < JEE_PACKAGE.expiresAt;
