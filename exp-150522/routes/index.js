const express=require('express')
const router=express.Router()

const {Employee}=require('../models/employee');

// get All Employee
router.get('/api/employees',(req,res)=>{
    Employee.find({},(err,data)=>{
        if(!err){
            res.send(data)
        }else{
            console.log(err);
        }
    })
})

// save an employee
router.post('/api/employees/add',(req,res)=>{
    const emp = new Employee({
        name:req.body.name,
        email:req.body.email,
        salary:req.body.salary
    })
    emp.save((err,data)=>{
        res.status(200).json({code:200,messsage:'Employee Added Successfully',addEmployee:data})
    })
})

// get singlr employee
router.get('/api/employees/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,data)=>{
if(!err){
    res.send(data);
}else{
    console.log(err);
}
    })
})

// update the employee
router.put('/api/employees/edit/:id',(req,res)=>{
    const emp={
        name:req.body.name,
        email:req.body.email,
        salary:req.body.salary
    }
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,data)=>{
        if(!err){
            res.status(200).json({code:200,message:'Employee Updated Successfully',updateEmployee:data})
        }else{
            console.log(err);
        }
    })
})
// Delete an Employee
router.delete('/api/employees/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id,(err,data)=>{
        if(!err){
            res.status(200).json({code:200,message:'Employee Deleted Successfully',deleteEmployee:data})
        }
    })
})

module.exports=router;