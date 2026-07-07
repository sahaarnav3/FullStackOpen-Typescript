interface CourseParts {
  name: string;
  exerciseCount: number;
}

interface CourseProps {
  courseParts: CourseParts[];
}

export default function Content({ courseParts }: CourseProps) {
  return (
    <>
      {courseParts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
}
