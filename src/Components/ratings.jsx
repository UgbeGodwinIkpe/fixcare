// Importing the necessary modules 
import React, { Fragment, useState } from 'react'; 
import { Rating, Stack } from '@mui/material';

// Creating the ratings component 
const Ratings = () => {
    // Setting the state 
    const [ratings, setRatings] = useState("3"); 

    // handleRatings 
    const handleRatings = (event) => {
        console.log(event.target.value); 
    }

    // Rendering the jsx component 
    return (
        <Fragment>
            <Stack spacing={1}>
                <Rating name="size-large" defaultValue={3} size="large" onChange={handleRatings}/> 
            </Stack>
        </Fragment>
    )
}

// Exporting the ratings components
export default Ratings
