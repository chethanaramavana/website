import HomePage from '@/app/page';

export default async function GradePage({ params }: { params: Promise<{ gradeSlug: string }> }) {
  const { gradeSlug } = await params;
  const match = gradeSlug.match(/^grade-(5|6|7|8|9|10|11|12)$/);
  const grade = match ? Number(match[1]) : null;
  return <HomePage initialBoard="ICSE" initialGrade={grade} />;
}
