interface CourseName {
    courseName: string;
}

export default function Header(props: CourseName) {
    return (
        <h1>{props.courseName}</h1>
    )
}