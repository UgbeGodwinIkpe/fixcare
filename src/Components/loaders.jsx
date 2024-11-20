// Importing the necessary modules 
import React, { Fragment } from 'react'; 
import { BallTriangle } from 'react-loader-spinner'
import styles from './css/loaders.module.css'; 


// Creating the loader component 
const Loader = (props) => {
    return(
        <Fragment> 
            <main className={styles.mainDiv}>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="black"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </main>
           
        </Fragment>
    )
}

// Exporting the loader 
export default Loader; 