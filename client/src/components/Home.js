import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';

export default function Home() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then((results) => setClients(results.data))
        .catch(error => alert(`Sugió este error: ${error}`))
        //.catch(error => console.log('Surgió este error: ', error))
    }, [])

    return(
        <div>
            {clients?.map(client => (
                <div style={{display:'flex', flexDirection:'row', margin:'10px'}}>
                    <h2>{client?.lastName}</h2>
                    <h3>{client?.name}</h3>
                    <h3>Balance: {client?.balance}</h3>
                </div>
            ))}
            <Formik
                initialValues={{name: '', lastName: '', email: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.name) errors.name='Required';
                    if (!values.lastName) errors.lastName='Required';
                    if (!values.email) errors.email = 'Required';
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email='Invalid Email'
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    axios.post('http://localhost:3001/', values)
                    .then(results => alert(`Genial! usuario ${values.name} guardado en la base de datos`))
                    .catch(error => alert('No se puedo terminar la operación: ', error))
                    setSubmitting(false)
                }}
            >
            {
                ({  values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input type='name' name='name' values={values.name}
                                onChange={handleChange} onBlur={handleBlur} 

                        />
                        {errors.name && touched.name && errors.name}

                        <input type='lastName' name='lastName' values={values.lastName}
                                onChange={handleChange} onBlur={handleBlur} 

                        />
                        {errors.lastName && touched.lastName && errors.lastName}

                        <input type='email' name='email' values={values.email}
                                onChange={handleChange} onBlur={handleBlur} 

                        />
                        {errors.email && touched.email && errors.email}

                        <button type='submit' disabled={isSubmitting}>Ingresar</button>
                    </form>
                )
            }
            </Formik>
        </div>
    )
}