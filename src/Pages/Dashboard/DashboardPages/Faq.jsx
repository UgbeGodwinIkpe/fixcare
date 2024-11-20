// Importing the necessary modules 
import React, { Fragment, useState } from 'react'; 
import styles from "../css/faq.module.css"; 
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import faqAnswers from '../../../Components/faqAnswers';

const Faq = ({ t }) => {  // Destructuring the translation function from props
    // State to handle question toggle
    const [q1, setQ1] = useState(false);
    const [q2, setQ2] = useState(false);  
    const [q3, setQ3] = useState(false); 
    const [q4, setQ4] = useState(false); 
    const [q5, setQ5] = useState(false); 
    const [q6, setQ6] = useState(false); 
    const [q7, setQ7] = useState(false); 
    const [q8, setQ8] = useState(false); 
    const [q9, setQ9] = useState(false); 
    const [q10, setQ10] = useState(false); 

    // Return the JSX component 
    return (
        <Fragment> 
            <main className={styles.mainDiv}> 
                <div>
                    <h3 className={styles.frequentlyAskedQuestionsHeaderText}>{t('faqHeader')}</h3>  
                </div>

                <div className={styles.questionYouMayHaveDiv}> 
                    <p>{t('questionsYouMayHave')}</p> 
                </div>

                <section className={styles.faqQuestionsOutterDivSection}> 
                    <div>
                        <div className={styles.faqQuestionsDiv} onClick={() => setQ1(!q1)}> 
                            <p>{t('question1')}</p>
                            <p> {q1 ? '-' : '+'} </p>
                        </div> 
                        <Zoom delay={100}>
                            <div className={q1 ? styles.active : styles.hidden}>
                                <p>{faqAnswers['question1']}</p> 
                            </div> 
                        </Zoom>
                    </div>
                    
                    {/* Other FAQ Items */}
                    <div className={styles.faqQuestionsDiv} onClick={() => setQ2(!q2)}> 
                        <p>{t('question2')}</p>
                        <p> {q2 ? '-' : '+'} </p>
                    </div>
                    <Zoom delay={100}>
                        <div className={q2 ? styles.active : styles.hidden}>
                            <p>{faqAnswers['question2']}</p> 
                        </div> 
                    </Zoom>

                    <div className={styles.faqQuestionsDiv} onClick={() => setQ3(!q3)}> 
                        <p>{t('question3')}</p>
                        <p> {q3 ? '-' : '+'} </p>
                    </div>
                    <Zoom delay={100}>
                        <div className={q3 ? styles.active : styles.hidden}>
                            <p>{faqAnswers['question3']}</p> 
                        </div>
                    </Zoom>

                    <div className={styles.faqQuestionsDiv} onClick={() => setQ4(!q4)}> 
                        <p>{t('question4')}</p>
                        <p> {q4 ? '-' : '+'} </p>
                    </div>
                    <Zoom delay={100}>
                        <div className={q4 ? styles.active : styles.hidden}>
                            <p>{faqAnswers['question4']}</p>
                        </div>
                    </Zoom>

                    <div className={styles.faqQuestionsDiv} onClick={() => setQ5(!q5)}> 
                        <p>{t('question5')}</p>
                        <p> {q5 ? '-' : '+'} </p>
                    </div>
                    <Zoom delay={100}>
                        <div className={q5 ? styles.active : styles.hidden}>
                            <p>{faqAnswers['question5']}</p>
                        </div>
                    </Zoom>

                    <div className={styles.faqQuestionsDiv} onClick={() => setQ6(!q6)}> 
                        <p>{t('question6')}</p>
                        <p> {q6 ? '-' : '+'} </p>
                    </div>
                    <Zoom delay={100}>
                        <div className={q6 ? styles.active : styles.hidden}>
                            <p>{faqAnswers['question6']}</p>
                        </div>
                    </Zoom>

                    <div className={styles.faqQuestionsDiv} onClick={() => setQ7(!q7)}> 
                        <p>{t('question7')}</p>
                        <p> {q7 ? '-' : '+'} </p>
                    </div>
                    <Zoom delay={100}> 
                        <div className={q7 ? styles.active : styles.hidden}> 
                            <p>{faqAnswers['question7']}</p> 
                        </div>
                    </Zoom>

                    <div className={styles.faqQuestionsDiv} onClick={() => setQ8(!q8)}> 
                        <p>{t('question8')}</p>
                        <p> {q8 ? "-" : "+"} </p>
                    </div>
                    <Zoom delay={100}>
                        <div className={q8 ? styles.active : styles.hidden}> 
                            <p>{faqAnswers['question8']}</p> 
                        </div>
                    </Zoom>

                    <div className={styles.faqQuestionsDiv} onClick={() => setQ9(!q9)}> 
                        <p>{t('question9')}</p>
                        <p> {q9 ? "-" : "+"} </p>
                    </div>
                    <Zoom delay={100}> 
                        <div className={q9 ? styles.active : styles.hidden}> 
                            <p>{faqAnswers['question9']}</p>
                        </div>
                    </Zoom>

                    <div className={styles.faqQuestionsDiv} onClick={() => setQ10(!q10)}> 
                        <p>{t('question10')}</p>
                        <p> {q10 ? "-" : "+"} </p>
                    </div>
                    <Zoom delay={100}> 
                        <div className={q10 ? styles.active : styles.hidden}> 
                            <p>{faqAnswers['question10']}</p>
                        </div>
                    </Zoom>
                </section>

                <section className={styles.stillNotFoundDiv}>
                    <div> 
                        <p>{t('stillNotFound')}</p>
                    </div>

                    <div> 
                        <Link to="#">{t('raiseTicket')}</Link>
                    </div> 
                </section>
            </main>
        </Fragment>
    );
}

// Exporting the FAQ component 
export default Faq;
