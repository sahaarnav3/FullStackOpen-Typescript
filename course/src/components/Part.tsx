import { type CoursePart } from "./Content";

interface CourseProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const actualComponent = (coursePart: CoursePart) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h3 style={{ marginBottom: 0 }}>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <i>{coursePart.description}</i>
        </div>
      );
    case "group":
      return (
        <div>
          <h3 style={{ marginBottom: 0 }}>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p style={{ margin: 0 }}>
            project exercises {coursePart.groupProjectCount}
          </p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3 style={{ marginBottom: 0 }}>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <i>{coursePart.description}</i>
          <p style={{ margin: 0 }}>submit to {coursePart.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3 style={{ marginBottom: 0 }}>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <i>{coursePart.description}</i>
          <p style={{ margin: 0 }}>
            required skills: {coursePart.requirements.join(", ")}
          </p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default function Part({ coursePart }: CourseProps) {
  return <>{actualComponent(coursePart)}</>;
}
