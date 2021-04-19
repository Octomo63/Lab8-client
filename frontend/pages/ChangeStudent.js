import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import StdAuth from '../components/StdAuth'
import config from '../config/config'

const URL = `${config.URL}/students`
const ChangeStudent = ({ token }) => {

  const [name,setName] = useState('')
  const [surname,setSurname] = useState('')
  const [major,setMajor] = useState('')
  const [GPA,setGPA] = useState(0)
  const [students, setStudents] = useState({
    list:
    [
        { id: 1, name: 'Thanan', surname : 'Chairat' , major : 'CoE', GPA : 3.11 }
    ]
  })
 
  useEffect(() => {
    getStudents()
  }, [])

  const addStudent = async (name,surname,major, GPA) =>{
    let students = await axios.post(URL , {name,surname,major, GPA})
    setStudents(students.data)
  }

  const getStudents = async () => {
    let student = await axios.get(URL)
    setStudents(student.data)
    
  }

  const printStudents = () =>{
    if (students.list && students.list.length)
				return (students.list.map((student, index) =>
          <li key = {index}>
            {index + 1 }:
            {(student) ? student.name : "-"}:
            {(student) ? student.surname : "-"}:
            {(student) ? student.major : "-"}:
            {(student) ? student.GPA : 0}
            <button onClick={() => updateStudent(student.id)}>Update</button>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </li>))
    else
      return (<li>No Student</li>)
  }

  const deleteStudent = async (id) => {
    let students = await axios.delete(`${URL}/${id}`)
    setStudents(students.data)
  }

  const updateStudent = async (id) => {
    let students = await axios.put(`${URL}/${id}`,{name,surname,major,GPA})
    setStudents(students.data)
  }

  

  return (
    <Layout>
            <Head>
                <title>Students</title>
            </Head>
            <div >
                <Navbar />
                {JSON.stringify(students.students)}
                <ul >
                    {printStudents()}
                </ul>
                <h1>Add student</h1>
                <div>
                    Name : <input type="text" onChange={(e) => setName(e.target.value)}  />
                    Surname : <input type="text" onChange={(e) => setSurname(e.target.value)} /> 
                    Major : <input type="text" onChange={(e) => setMajor(e.target.value)} /> 
                    GPA : <input type="number" onChange={(e) => setGPA(e.target.value)} /> 
                    <button onClick={() => addStudent(name, surname, major, GPA)} >Add New Student</button>
                </div>
            </div>
        </Layout>
  )
}

export default StdAuth(ChangeStudent)
export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}