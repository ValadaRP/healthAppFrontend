import DialogInfo from "@/components/ui/dialogInfo.tsx";
import TooltipButton from "@/components/ui/tooltipButton.tsx";
import AddRecipeButton from "@/components/ui/addRecipeButton.tsx";
interface MealProps {
    data:{
        meals:{
          id: number;
          imageType: string;
          title: string;
          readyInMinutes: number;
          servings: number;
          sourceUrl: string;
        }[],
        nutrients:{
            calories: number;
            protein: number;
            fat: number;
            carbohydrates: number;
        },
    }
}

const Meal = (props: MealProps) => {
    return(
        <>
            {props.data ? <div className={"w-full h-screen"}>
                <p className={"text-6xl font-bold text-center m-8"}>Your meals for today</p>
                {props.data ?
                    <div className={"grid grid-cols-4 justify-around content-center text-center w-3/4 mx-auto shadow-2xl p-4 rounded-md border-[0.5px]"}>
                        <div className={"flex flex-col scroll-m-20 text-4xl font-extrabold"}>
                            <p>Carbohydrates</p>
                            <p>{props.data?.nutrients.carbohydrates}</p>
                        </div>
                        <div className={"flex flex-col scroll-m-20 text-4xl font-extrabold"}>
                            <p>Fat</p>
                            <p>{props.data?.nutrients.fat}</p>
                        </div>
                        <div className={"flex flex-col scroll-m-20 text-4xl font-extrabold"}>
                            <p>Calories</p>
                            <p>{props.data?.nutrients.calories}</p>
                        </div>
                        <div className={"flex flex-col scroll-m-20 text-4xl font-extrabold"}>
                            <p>Protein</p>
                            <p>{props.data?.nutrients.protein}</p>
                        </div>
                    </div> : null}
                <div className={"grid md:grid-cols-3 gap-4 items-center justify-center rounded-md p-4 mt-8"}>
                    {props.data ? props.data.meals.map((meal) => (
                            <div key={meal.id} className={"flex flex-col items-center justify-center "}>
                                <h1 className={"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-2xl text my-4 border-b pb-2"}>{meal.title}</h1>
                                <img src={`https://spoonacular.com/recipeImages/${meal.id}-636x393.${meal.imageType}`} alt={"meal image"} className={"w-[500px] rounded-xl"} />
                                <div className={"flex flex-col mt-4"}>
                                    <p className={"scroll-m-20 text-xl font-semibold "}>You can prepare it in: {meal.readyInMinutes}m</p>
                                    <p className={"scroll-m-20 text-xl font-semibold "}>Numbers of servings: {meal.servings}</p>
                                </div>
                                <div className={"flex flex-row mt-2 gap-x-2"}>
                                    <TooltipButton message={"Click for more recipe info"}>
                                        <DialogInfo recipeId={meal.id} />
                                    </TooltipButton>
                                    <TooltipButton message={"Click to add to your diet"}>
                                        <AddRecipeButton id={meal.id} title={meal.title} imageType={meal.imageType} servings={meal.servings}/>
                                    </TooltipButton>
                                </div>
                            </div>
                        )
                    ) : null}
                </div>
            </div> : null}

        </>

    )
}

export default Meal;