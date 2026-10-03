import HomePage from '@/app/page';

export default async function GradePage({ params }: { params: Promise<{ gradeSlug: string }> }) {
  const { gradeSlug } = await params;
  const match = gradeSlug.match(/^grade-(6)$/);
  const grade = match ? Number(match[1]) : null;
  return <HomePage initialBoard="ICSE" initialGrade={grade} />;
}
