import HeartPredictionForm from "@/components/forms/HeartPredictionForm.tsx";

const HeartPrediction = () => {
    return(
        <>
            <div className={"w-full mx-auto shadow-2xl p-8 rounded-md"}>
                <p className={"text-6xl font-bold text-center"}>Heart Disease Prediction</p>
                <HeartPredictionForm />
            </div>
        </>
    );
};

export default HeartPrediction;