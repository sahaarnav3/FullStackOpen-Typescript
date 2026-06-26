
const calculateBmi = (height: number, weight: number) : String => {
    if(height < 0)
        return 'Enter Proper Height'
    else 
        height /= 100
    if(weight < 0)
        return 'Enter Proper Weight'
    let bmiValue = weight / (height * height)

    if(bmiValue < 16)
        return "Underwight (Severe thinness)"
    if(bmiValue < 17)
        return "Underweight (Moderate thinness)"
    if(bmiValue < 18.5)
        return "Underweight (Mild thinness)"
    if(bmiValue < 25)
        return "Normal Range"
    if(bmiValue < 30)
        return "Overweight (Pre-obese)"
    if(bmiValue < 35)
        return "Obese (Class I)"
    if(bmiValue < 40)
        return "Obese (Class II)"
    if(bmiValue >= 40)
        return "Obese (Class III)"
    return "Enter correct height and weight values."
}

console.log(calculateBmi(180, 74))