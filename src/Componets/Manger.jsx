import React, { useEffect } from 'react'
import './navbar.css'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



export default function Manger() {


    const [showPa, setshowPa] = React.useState('false');
    const [form, setform] = React.useState({ site: '', username: '', password: '' });
    const [individual, setindividual] = React.useState(null);
    const [passwordsArray, setpasswordsArray] = React.useState([]);
    const [copy, setcopy] = React.useState(null);
    const [edit, setedit] = React.useState(null); 


    const getpasswords = async() => {
        let req = await fetch('http://localhost:3000'); 
        let password = await req.json();
        console.log(password);
        setpasswordsArray(password);
   
    }

    const handlekey= (e) =>{ 
        if(e.key ==="Enter"){ 
            SavePassword(); 
        }
    }

    useEffect(() => {
       getpasswords();


    }, [])

    function handleclick() {
        setshowPa(!showPa);

    }

     async function  SavePassword() {

 
        // console.log(form);
        if(form.site === '' || form.username === '' || form.password === ''){
            alert('Please fill all the fields');
            return;
        }

        const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/;
        if(pattern.test(form.site) === false){
            alert('Please enter a valid website');
            return;
        }

        const passwordRegex = /^(?=.*\d).{8,}$/;
        if(!passwordRegex.test(form.password)){
            alert('Password must be of 8 characters and must contain a number');
        return; }
        if(form.id){    
        await fetch("http://localhost:3000", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id : form.id }),
        })
    }
        //     return; 
        // };
     
        setpasswordsArray([...passwordsArray,{...form, id: uuidv4()}]);
        // localStorage.setItem('password', JSON.stringify([...passwordsArray, {...form, id: uuidv4()}]));
        await fetch("http://localhost:3000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form, id: uuidv4() }),
        })

        toast('Password Saved Successfully! ', {
            position: "top-right",
            autoClose: 1500,
            className: "custom-toast",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            style : {
                backgroundColor : "#B084B4",
                color : "#7D52A0"
            }, 
            draggable: true,
            theme: "dark",
            transition: Bounce
        });
        

        console.log(passwordsArray);

        setform({ site: '', username: '', password: '' });

    }
    const handledelete = (id) => { 
        let a = confirm("Do you want to delete this "); 
        if(a == true){ 
            const updatedArray = passwordsArray.filter(item => item.id !== id);
            setpasswordsArray(updatedArray);
           
            let res = fetch("http://localhost:3000", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id }),
            })
        }
        // setpasswordsArray(passwordsArray.filter((_, i) => i !== index)); 
        
    };
    



    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const settoggle = (index) => {
        setindividual(individual === index? null : index);
    }

    function handlechangeedit(id) {

        setform({...passwordsArray.filter(i=> i.id ===id)[0], id : id}); 
       setpasswordsArray(passwordsArray.filter(item=>item.id !== id)); 

       
    }

    function handleclickcopy(index) {

        const entrytocopy = passwordsArray[index];
        const usernamecopy = passwordsArray[index].username;

        const jsonString = JSON.stringify(entrytocopy);

        navigator.clipboard.writeText(jsonString)
            .then(() => {
                toast('Copied Build Better hehe ' + usernamecopy, {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce

                });

            })
            .catch((err) => {
                console.error("Failed to copy : ", err);
            })





        setcopy(copy === index ? null : index);

        setTimeout(() => {
            setcopy(null);
        }, 500);

    };


    return (


        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}

            />
            <div className='heading1' >Locker </div>
            <div className='small_heading'> Your Own Password Manager </div>
            <div className='Mcontainer_1'>
                <input placeholder='Enter you website Name : ' id="W_Name" onChange={handlechange} value={form.site} name="site"></input>
                <input placeholder='Enter your UserName : ' id="U_Name" onChange={handlechange} value={form.username} name="username"></input>
                <div className='p_container'>
                    <input name="password" value={form.password} onChange={handlechange} onKeyDown={handlekey} placeholder='Enter your Password : ' id="P_Name" type={showPa ? 'text' : 'password'} ></input>
                    <span className='eye_password'
                        onClick={handleclick}>

                        <img src={showPa ? 'icons/icons8-eye-64.png' : 'icons/icons8-eye-64 (1).png'}></img>
                    </span>
                </div>



            </div>
            <div className='Mcontainer_2'>

                <button className='btn' onClick={SavePassword} > Save    <lord-icon
                    src="https://cdn.lordicon.com/fjvfsqea.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#6c16c7,secondary:#6c16c7"
                    style={{ width: "30px", height: "30px", marginLeft: "px" }}
                >
                </lord-icon> </button>

            </div>


            <h1 style={{ textAlign: "center", fontFamily: "'Roboto', sans-serif" }}>Data</h1>

            {passwordsArray.length === 0 ? <h3 style={{ textAlign: "center", fontFamily: "'Roboto', sans-serif" }}>No Data</h3> : <div className="table-container">
                <div className="table-container">
                    <table className="custom-table">
                        <thead >
                            <tr className="custom-table-header">
                                <th> Index </th>
                                <th>Site</th>
                                <th>UserName</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {passwordsArray.map((item, index) => {
                                return (

                                    <tr className="alternate-row" key={index}>
                                        <td><div className='copy_container'>{index + 1}
                                            <lord-icon
                                                id="copy_1"
                                                src={copy === index ? "https://cdn.lordicon.com/ygymzvsj.json" : "https://cdn.lordicon.com/rdabbukg.json"}

                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#8930e8,secondary:#cb5eee"
                                                style={{ width: "30px", height: "30px", marginLeft: "px" }}
                                                onClick={() => handleclickcopy(index)}
                                            >
                                            </lord-icon>

                                            <lord-icon
                                                src="https://cdn.lordicon.com/iubtdgvu.json"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#8930e8,secondary:#cb5eee"
                                                style={{ width: "30px", height: "30px", marginLeft: "px" }}
                                                onClick ={() => handlechangeedit(item.id)}
                                            >
                                            </lord-icon>

                                            <lord-icon
                                                src="https://cdn.lordicon.com/crxdwbpm.json"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#8930e8,secondary:#cb5eee"
                                                style={{ width: "30px", height: "30px", marginLeft: "px" }}
                                                onClick ={() => handledelete(item.id)}>
                                            </lord-icon>


                                        </div>
                                        </td>
                                        <td><a href={item.site} target='_blank'>{item.site}</a></td>
                                        <td>{item.username}</td>
                                        <td><div className='eye-password-2' ><span>
                                            {individual === index ? item.password : "*".repeat(item.password.length)}
                                        </span>
                                            <div className='eye_tesing_Container'>
                                            <img src={individual === index ? 'icons/icons8-eye-64.png' : 'icons/icons8-eye-64 (1).png'} className="eye-individual"
                                                onClick={() => settoggle(index)}></img>
                                                </div>
                                        </div></td>
                                    </tr>

                                )
                            })}





                        </tbody>
                    </table>
                </div>

            </div>}

        </>
    )
}
