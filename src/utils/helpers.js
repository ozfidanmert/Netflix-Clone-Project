export const ratingToPercentage = (rating) => {
    return (rating * 10)?.toFixed(0)
}

export const resolveRatingColor = (rating) => {
    if (rating >= 7) {
        return "success"
    } else if (rating >= 5.5){
        return "primary"
    } else if (rating >= 4){
        return "warning"
    } else{
        return "danger"
    }
}