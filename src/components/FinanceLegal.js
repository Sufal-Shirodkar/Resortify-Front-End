import {useState,useContext} from 'react'
import PropertyContext from '../context/PropertyContext';
import axios from 'axios';

import {Form} from 'react-bootstrap';
export default function FinanceAndLegal(){
    const {resort, resortDispatch} = useContext(PropertyContext)
    const [ownerShip,setOwnerShip] = useState('')
    const [documents,setDocuments] = useState([])
    const [verify,setVerify] = useState(false)
    const [upload,setUpload] = useState(false)
    const [errors,setErrors] = useState({})
   const [bankingDetails,setBankingDetails] = useState({
    bankingAccountNumber:'',
    reEnterBankAccount:'',
    IFSCCode:'',
    gstIN:'',
    panNo:''
   })
   const newErrors ={}
   const validateErrors=()=>{
        if(ownerShip.length === 0){
            newErrors.ownerShip = 'Please select the ownerShip'
        }
        if(bankingDetails.bankingAccountNumber !== bankingDetails.reEnterBankAccount){
            newErrors.reEnterBankAccount ='check your Bank Account Number'
        }
        if(bankingDetails.bankingAccountNumber.length< 9 || bankingDetails.bankingAccountNumber.length > 18){
            newErrors.bankingAccountNumber ='Enter Valid Bank Account Number'
        }
        if(bankingDetails.IFSCCode.length !== 11){
            newErrors.IFSCCode = 'Enter Valid IFSC code'
        }
        if(bankingDetails.gstIN.length !== 15){
            newErrors.gstIN ='Enter Valid GSTIN'
        }
        if(bankingDetails.panNo.length !== 10){
            newErrors.panNo ='Enter Valid Pan Number'
        }

   }
   
   const handleSubmit=async(e)=>{
        validateErrors()
        if(Object.keys(newErrors).length === 0){
            const formdata ={
                financeAndLegal:{
                    typeOfOwnership:ownerShip,
                    typeOfDocument:documents
                    },
                bankingDetails:bankingDetails
            }
         
            resortDispatch({type:'ADD_PROPERTY_DETAILS',payload:formdata})
            try{
                const form = {...resort.propertyData,roomTypesData:[...resort.roomTypes],geoLocation:{...resort.geoLocation},packages:[...resort.packages]}
                console.log(form)
                const response = await axios.post('http://127.0.0.1:3060/api/owners/propertydetails',form,{headers
                :{Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFiZjZlYmIxOTY4OGFlZTg3MDZmMSIsInJvbGUiOiJvd25lciIsImlhdCI6MTcxMjM4NTIzOSwiZXhwIjoxNzEyOTkwMDM5fQ.ICB0s1jv2bCWhlQ6p3i4hC3CPfK5sbD4-8kcB2LctN0"}})
                console.log(response.data)
        
            }catch(err){
                console.log(err)
                
            }
        }else{
            setErrors(newErrors)
        }
   }

  const handleDocs =(e)=>{
    e.preventDefault()
    const result =[]
    const docs = e.target.elements.documents.files
    for(let i =0;i<docs.length ; i++){
        result.push(docs[i].name)
    }
    setDocuments(result)
  }
  const handleChange =(e)=>{
    const {name,value} = e.target
    setBankingDetails({...bankingDetails,[name]:value})
  }
  console.log(resort)
    return (
        <div>
        <h2>Finance And Legal</h2>
        <div className='col-md-4'>
            <h4>Type Of OwnerShip : </h4>
            <select value={ownerShip}
                    onChange={ e =>{setOwnerShip(e.target.value)}}
                     className='form-select '>
                    <option value="">Select OwnerShip </option>
                    <option value="My Property">My Property</option>
                    <option value="spouse property">Spouse Property</option>
                    <option value="Lease agreement">Lease agreement</option>
                </select>  
        </div>
        {Object.keys(errors).length !== 0 ? <p style={{color:'red'}}>{errors.ownerShip}</p>:""}
        <h4>Upload Documents</h4>
        <form onSubmit={handleDocs}>
        <Form.Group controlId="formFileMultiple" className="mb-3" name="documents">
            <Form.Control type="file"  name="documents" multiple />
        </Form.Group>
        <button className='btn btn-success'
                value={upload}
                onClick={e =>{setUpload(e.target.checked)}}
                type="submit">upload</button>
        </form>
       
        
        <h4>Banking Details</h4>
            <form>
            <div className='form-group'>
                    <input type="text"
                            disabled={upload === false}
                            name="bankingAccountNumber"
                            value={bankingDetails.bankingAccountNumber}
                            onChange={handleChange}
                            className="form-contol col-6"
                            placeholder="bank account number" />
                    {Object.keys(errors).length >0 ? <p style={{color:'red'}}>{errors.bankingAccountNumber}</p>:''}
                    <input  type="text"
                             disabled={upload === false}
                             name="reEnterBankAccount"
                             value={bankingDetails.reEnterBankAccount}
                             onChange={handleChange}
                            className="form-contol col-6"
                            placeholder="Re-enter bank account number" />
                    {Object.keys(errors).length >0 ? <p style={{color:'red'}}>{errors.reEnterBankAccount}</p>:''}
                    <input type="text" 
                            disabled={upload === false}
                            name="IFSCCode"
                            value={bankingDetails.IFSCCode}
                            onChange={handleChange}
                            placeholder="IFSC CODE"
                            className='form-control'
                                />
                    {Object.keys(errors).length >0 ? <p style={{color:'red'}}>{errors.IFSCCode}</p>:''}
                    <input type="text"
                            disabled={upload === false}
                            name="gstIN"
                            value={bankingDetails.gstIN}
                            onChange={handleChange}
                            className="form-contol col-6"
                            placeholder="GSTIN number" />
                    {Object.keys(errors).length > 0 ? <p  style={{color:'red'}}>{errors.gstIN}</p>:''}
                    <input type="text"
                            disabled={upload === false}
                            name="panNo"
                            value={bankingDetails.panNo}
                            onChange={handleChange}
                            className="form-contol col-6"
                            placeholder="PAN Number" />
                    {Object.keys(errors).length >0 ? <p style={{color:'red'}}>{errors.panNo}</p>:''}
            </div>
            </form>
            <div>
            <input type='checkbox' 
                    value={verify}
                    onChange={e =>{setVerify(e.target.checked)}}/>
            <span>Verification by the third </span>
            </div>
            <button className="btn btn-primary"
                    disabled = {verify === false}
                    onClick={handleSubmit}
                    type="submit">Submit</button>
        </div>
    )
}