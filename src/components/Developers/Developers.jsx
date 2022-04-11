import axios from 'axios';
import React, { useEffect, useState } from 'react';
import avatar from '../../assets/avatar-profile.png'

const Developers = () => {

    // Get form fields value state
    const [ input, setInput ] = useState({
        id : '',
        name : '',
        email : '',
        uName : '',
        birth : '',
        location : '',
        phone : '',
        gender : '',
        photo : '',
    })

    // Get all data state
    const [devs, setDevs] = useState([])

    // set form alert state
    const [ alert, setAlert] = useState({
        type : '',
        mas : '',
        status : false
    })

    // Get all input data
    const { name, email, uName, birth, location, phone, gender, photo } = input;

    // Reset data
    const handleReset = () => {
        setInput({
            id : '',
            name : '',
            email : '',
            uName : '',
            birth : '',
            location : '',
            phone : '',
            gender : '',
            photo : '',
        })
    }

    // Handel form submit
    const handleFormSubmit = (e) => {
        e.preventDefault()

        if(name === '' || email === '' || uName === '' || location === '' || gender === ''){
            setAlert({
                type : 'danger',
                mas : 'All fields are required!',
                status : true
            })
        }else{
            axios.post(`http://localhost:5050/devs`, input).then(res => {

                setInput({
                    id : '',
                    name : '',
                    email : '',
                    uName : '',
                    birth : '',
                    location : '',
                    phone : '',
                    gender : '',
                    photo : '',
                })

                setAlert({
                type : 'success',
                mas : 'Succesfully Add, Well Done.',
                status : true
                })
            }).catch(error => {
                console.log(error); 
            })
        }
    }

    // Delete developer data
    const handleDevDelete = (id) => { 
        axios.delete(`http://localhost:5050/devs/${id}`)
    }
    
    // Get all developers data
    useEffect(() => {
        axios.get(`http://localhost:5050/devs`).then(res => {
            setDevs(res.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [devs])

    // Form alert close
    const handleAlertClose = () => {
        setAlert({
                status : false
            })
    }

    return (
        <div className="developers my-4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h3 className="text-danger text-center fw-bold">Add New Developer</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={ handleFormSubmit }>
                                    <div className="my-2">
                                        <label htmlFor="name">Name</label>
                                        <input className="form-control" placeholder="Type your name" id="name" type="text" value={ name } onChange={ e => setInput({ ...input, name: e.target.value })}/>
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="email">E-mail</label>
                                        <input className="form-control" placeholder="Give your E-mail" id="email" type="email" value={ email } onChange={ e => setInput({ ...input, email: e.target.value })}/>
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="uName">Username</label>
                                        <input className="form-control" placeholder="Type your username" id="uName" type="text" value={ uName } onChange={ e => setInput({ ...input, uName: e.target.value })}/>
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="birth">Date Of Birth</label>
                                        <input className="form-control" id="birth" type="date" value={ birth } onChange={ e => setInput({ ...input, birth: e.target.value })}/>
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="location">Location</label>
                                        <select className="form-select" id="location" value={ location } onChange={ e => setInput({ ...input, location: e.target.value })}>
                                            <option value="">-- Select --</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Khulna">Khulna</option>
                                            <option value="Chittagong">Chittagong</option>
                                            <option value="Rajshahi">Rajshahi</option>
                                            <option value="Rangpur">Rangpur</option>
                                            <option value="Barisal">Barisal</option>
                                            <option value="Sylhet">Sylhet</option>
                                            <option value="Mymensingh">Mymensingh</option>
                                        </select>
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="phone">Phone</label>
                                        <input className="form-control" placeholder="Give your phone number" id="phone" type="tel" value={ phone } onChange={ e => setInput({ ...input, phone: e.target.value })}/>
                                    </div>
                                    <div className="my-2">
                                        <label>Gender</label><br/>
                                        <input type="radio" name="gender" id="male" value="Male" onClick={ e => setInput({ ...input, gender: e.target.value })}/>
                                        <label htmlFor="male">Male</label>&nbsp; &nbsp;
                                        <input type="radio" name="gender" id="female" value="Female" onClick={ e => setInput({ ...input, gender: e.target.value })}/>
                                        <label htmlFor="female">Female</label>
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="photo">Photo</label>
                                        <input className="form-control" placeholder="Photo link" id="photo" type="url" value={ photo } onChange={ e => setInput({ ...input, photo: e.target.value })}/>
                                    </div>
                                    <div className="mt-3">
                                        <input type="reset" style={{ width : '47%' }} className="btn btn-danger" value="Reset All" onClick={ handleReset } /> &nbsp;
                                        <input type="submit" className="btn btn-primary w-50" value="Submit" />
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                {
                                    alert.status && <p className={ `alert alert-${ alert.type } d-flex justify-content-between` }>{ alert.mas }<button onClick={ handleAlertClose } className="btn-close"></button></p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <table className="table table-dark table-striped shadow text-center aling-items-center">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Location</th>
                                    <th>Gender</th>
                                    <th>Photo</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    devs.map((data, index) => 

                                        <tr>
                                            <td>{ index + 1 }</td>
                                            <td>{ data.name }</td>
                                            <td>{ data.email }</td>
                                            <td>{ data.location }</td>
                                            <td>{ data.gender }</td>
                                            <td><img style={{ width: '40px', height: '40px' }} src={ data.photo ? data.photo : avatar } alt={ data.id } /> </td>
                                            <td>
                                                <button className="btn btn-info btn-sm">View</button> &nbsp;
                                                <button className="btn btn-warning btn-sm">Edit</button> &nbsp;
                                                <button className="btn btn-danger btn-sm" onClick={ e => handleDevDelete(data.id) }>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Developers;