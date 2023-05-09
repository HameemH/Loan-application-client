import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';

const Step02 = () => {
    const [user, setUser] = useState([])
    const [userId, setuserId] = useState('')
    const [valueError, setValueError] = useState('');
    const navigate = useNavigate();
    const {id} = useParams()
    
    console.log(id);
   useEffect(()=>{
       fetch(`https://loan-application-twsw.onrender.com/users/${id}`)
       .then(res=> res.json()).then(data=> {
        setUser(data);
        console.log(data);
       } )
   },[])
   const handleBusinessInfo = e =>{
        e.preventDefault()
        const name = user?.name;
        const age = user?.age;
        const Nid = user?.id;
        const phone = user?.phone;
        const email = user?.email;
        const companyname = e.target.companyname.value;
        const companayvalue = e.target.companayvalue.value;
        if(companayvalue < 1000000){
            setValueError('Your Company value should be at least 10 Lakhs')
        }
        
        const gst = e.target.gst.value;
        const tradeid = e.target.tradeid.value;
        const businessaddress = e.target.address.value;
        const personalInfo ={name, age, phone, email, id:Nid, companyname, companayvalue,gst, tradeid, businessaddress}
         if( valueError ===''){
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
                  alert('Your Info has been updated')
                  
                 navigate(`/step3/${id}`)
                  
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
             <Card className='m-auto mt-5 border border-primary' style={{ width: '24rem' }}>
                 
                <Card.Body>
                    <Card.Title>Business Details</Card.Title>
                  <h5 className='text-danger'>{valueError}</h5>
                    <Form onSubmit={handleBusinessInfo} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control name='companyname' type="text" placeholder="Your Company Name" required />
                           
                        </Form.Group>
                      
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Your Company value</Form.Label>
                            <Form.Control name='companayvalue' type="number" placeholder="Company Value(at least 10 lakh)" required />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>GST No</Form.Label>
                            <Form.Control name='gst' type="number" placeholder="Your GST." required />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Trade Id</Form.Label>
                            <Form.Control name='tradeid' type="number" placeholder="Your Company's Trade Id" required />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control name='address' type="text" placeholder="Your Business Address" required />
                           
                        </Form.Group>
                       
                        {(  valueError ==='')?
                         <Button variant=" btn btn-outline-primary item-center w-100 "  type="submit">
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

export default Step02;