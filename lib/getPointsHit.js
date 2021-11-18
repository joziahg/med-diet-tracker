
const getPointsHit = (meals) => {
  return meals.reduce(
    (pointsHit, meal) => Object.assign(pointsHit, {
      legumes: pointsHit.legumes || meal.legumes,
      fruitsNuts: pointsHit.fruitsNuts || meal.fruitsNuts,
      healthyFats: pointsHit.healthyFats || meal.healthyFats,
      dairy: pointsHit.dairy || meal.dairy,
      meat: pointsHit.meat || meal.meat,
      wholeGrains: pointsHit.wholeGrains || meal.wholeGrains,
      vegetables: pointsHit.vegetables || meal.vegetables,
      alcohol: pointsHit.alcohol || meal.alcohol,
      fishSeafood: pointsHit.fishSeafood || meal.fishSeafood
    }), {})
}

export default getPointsHit
