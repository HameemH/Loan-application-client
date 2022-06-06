import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';

const Step03 = () => {
    const [user, setUser] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        fetch(`http://localhost:5000/users/${id}`)
        .then(res=> res.json()).then(data=> {
         setUser(data);
         console.log(data);
        } )
    },[])
   const  handleLoaninfo = e =>{
    e.preventDefault()
   }
   const handleReset = ()=>{
    window.location.reload()
}
    console.log(id);
    return (
        <div>
             <h1>Hello dear {user?.name}, please give your Business Information</h1>
             <Card className='m-auto border border-primary' style={{ width: '24rem' }}>
                 
                <Card.Body>
                    <Card.Title>Business Details</Card.Title>
                  
                    <Form onSubmit={handleLoaninfo} >
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
                            <Form.Control name='gst' type="number" placeholder="Your Mobile No." required />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Trade Id</Form.Label>
                            <Form.Control name='tradeid' type="number" placeholder="Your Company's Trade Id" required />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control name='address' type="text" placeholder="Your Business Address" required />
                           
                        </Form.Group>
                       
                        {/* {(==='')?
                         <Button variant=" btn btn-outline-primary item-center w-100 " type="submit">
                            Submit
                        </Button>:  <Button variant=" btn btn-outline-primary item-center w-100 " disabled type="submit">
                            Submit
                        </Button> } */}
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