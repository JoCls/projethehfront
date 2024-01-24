import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper, Button} from "@mui/material";
import {useEffect, useState} from "react";

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const [name,setName]=useState('')
    const [address,setAddress]=useState('')
    const [students,setStudents]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,address}
        console.log(student)
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
        console.log("Nouvel élève ajouté")
            setStudents([...students,student])
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res=>res.json())
            .then((result)=>{
            setStudents(result);
        })
    }, []);


    return (

        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:"black"}}><u>Ajouter un étudiant</u></h1>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Nom Prénom" variant="outlined" fullWidth={true}
            value={name}
            onChange={(e)=>setName(e.target.value)}/>
            <TextField id="outlined-basic" label="Adresse" variant="outlined" fullWidth={true}
            value={address}
            onChange={(e)=>setAddress(e.target.value)}/>
            <Button variant="contained" color="success" onClick={handleClick}>Ajouter</Button>
        </Box>
        </Paper>

            <h1>Etudiants</h1>

            <Paper elevation={3} style={paperStyle}>

                {students.map(student=>(
                    <Paper elevation={6} style={{margin: "10px", padding: "15px", textAlign: "left"}} key={student.id}>
                        Id : {student.id}<br/>
                        Name : {student.name}<br/>
                        Address : {student.address}

                    </Paper>))}

            </Paper>

        </Container>
    );
}