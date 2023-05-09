import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';

const Step03 = () => {
    const [user, setUser] = useState([]);
    const [amountError ,setAmountError] = useState('')
    const {id} = useParams()

    useEffect(()=>{
        fetch(`https://loan-application-twsw.onrender.com/users/${id}`)
        .then(res=> res.json()).then(data=> {
         setUser(data);
         console.log(data);
        } )
    },[])
   const  handleLoaninfo = e =>{
    e.preventDefault();
    const name = user?.name;
        const age = user?.age;
        const Nid = user?.id;
        const phone = user?.phone;
        const email = user?.email;
        const companyname = user?.companyname;
        const companayvalue = user?.companayvalue;
        const gst = user?.gst;
        const tradeid = user?.tradeid;
        const businessaddress = user?.address;
        const amount = e.target.amount.value;
        if(amount > 100000){
           setAmountError ('Sorry We dont give Loan more than 1 lakh')
        }
        const tenure = e.target.tenure.value;
        const personalInfo ={name, age, phone, email, id:Nid, companyname, companayvalue,gst, tradeid, businessaddress,amount,tenure}
        if( amountError ===''){
            fetch(`https://loan-application-twsw.onrender.com/users/${id}`, {
                method: 'PUT',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(personalInfo)
              })
                .then(res => res.json())
                .then(data => {
                  console.log(data);
                  alert('Your Application is Set For Review By Authority')
                  
                  
                })
            
         }
   }
   const handleReset = ()=>{
    window.location.reload()
}
    console.log(id);
    return (
        <div>
              <div className='text-center fs-3'>
            <NavLink  className='m-2 text-decoration-none'  to='/'>Step01</NavLink> <span>{'>'}</span>
            <NavLink  className='m-2 text-decoration-none' to='/step2/:id' disabled>Step02</NavLink><span>{'>'}</span>
            <NavLink  className='m-2 text-decoration-none' to='/step3/:id' disabled>Step03</NavLink><span>{'>'}</span>
            </div>
             <Card className='m-auto mt-5 border border-primary' style={{ width: '24rem' }}>
                 
                <Card.Body>
                    <Card.Title>Business Details</Card.Title>
                    <h5 className='text-danger'>{amountError}</h5>
                    <Form onSubmit={handleLoaninfo} >
                       
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Loan Amount</Form.Label>
                            <Form.Control name='amount' type="number" placeholder="Your Desired Loan Amount" required />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Loan Tenure</Form.Label>
                            <Form.Control name='tenure' type="number" placeholder="Time You Need To Pay off" required />
                           
                        </Form.Group>
                       
                        {(amountError==='')?
                         <Button variant=" btn btn-outline-primary item-center w-100 " type="submit">
                            Submit
                        </Button>:  <Button variant=" btn btn-outline-primary item-center w-100 " disabled type="submit">
                            Submit
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

export default Step03;