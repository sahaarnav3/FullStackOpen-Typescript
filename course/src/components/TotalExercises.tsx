interface TotalExercises {
  totalExercises: number;
}

export default function TotalExercises(props: TotalExercises) {
  return <p>Number of exercises {props.totalExercises}</p>;
}
