import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import Step02 from './Step02';

const Step01 = () => {
    const [ageError, setAgeError] =  useState('');
    const [idError, setIdError] = useState ('');
    const [userid , setuserId] = useState('')
    const navigate = useNavigate();

    const handlePersonalInfo = e => {
        e.preventDefault()
        const name = e.target.firstname.value + ' ' + e.target.lastname.value;
        const age = e.target.age.value;
        const id = e.target.id.value;
        if(age <18 || id.length> 12 || id.length<12){
            setAgeError('You have to be at least 18')
            setIdError('Id number should be 12 digits')
        }
        else if(age <18){
            setAgeError('You have to be at least 18')
        }
       else if(id.length> 12 || id.length<12){
        setIdError('Id number should be 12 digits')
        }
        else{
            setAgeError('')
            setIdError('')
        }
       
        const phone = e.target.mobile.value;
        const email = e.target.email.value;
        
        
        const personalInfo ={name, age, phone, email, id}
        console.log(personalInfo);
        if(idError==='' && ageError===''){
            fetch('https://enigmatic-wave-24762.herokuapp.com/users', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(personalInfo)
              })
                .then(res => res.json())
                .then(data => {
                    setuserId(data.insertedId)
                  
                  console.log(userid);
                  alert('Your Info has been updated')
                  
                  navigate (`step2/${data.insertedId}`)
                  
                })
            }
        
        
    }
    const handleReset = ()=>{
        window.location.reload()
    }
    return (
        <div>
            <div className='text-center fs-3'>
            <NavLink  className='m-2 text-decoration-none'  to='/'>Step01</NavLink> <span>{'>'}</span>
            <NavLink  className='m-2 text-decoration-none' to='/step2/:id' disabled>Step02</NavLink><span>{'>'}</span>
            <NavLink  className='m-2 text-decoration-none' to='/step3/:id' disabled>Step03</NavLink><span>{'>'}</span>
            </div>
           
            <Card className='m-auto border border-primary mt-5' style={{ width: '24rem' }}>
                <Card.Body>
                    <Card.Title>Personal Details</Card.Title>
                    <h4 className='text-danger'>{ageError}</h4>
                    <h4 className='text-danger'>{idError}</h4>
                    <Form onSubmit={handlePersonalInfo} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name='firstname' type="text" placeholder="First Name" required />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name='lastname' type="text" placeholder="Last Name" required/>
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Age</Form.Label>
                            <Form.Control name='age' type="number" placeholder="Your Age(at least 18)" required />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control name='mobile' type="number" placeholder="Your Mobile No." required />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>National Id(Adhar Card)</Form.Label>
                            <Form.Control name='id' type="number" placeholder="Your Unique Id(12 digits)" required />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name='email' type="email" placeholder="Enter email" required />
                           
                        </Form.Group>
                        {(idError ==='' && ageError==='' )?
                         <Button variant=" btn btn-outline-primary item-center w-100 " type="submit">
                            Go To Next Page
                        </Button>:  <Button variant=" btn btn-outline-primary item-center w-100 " disabled type="submit">
                        Go To Next Page
                        </Button> }
                        <Button variant=" btn btn-outline-primary item-center w-100 mt-2  " onClick={handleReset} type="submit">
                            Reset Form
                        </Button>
                       
                    </Form>

                </Card.Body>
            </Card>
            
        </div>
    );
};

export default Step01;