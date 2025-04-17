import React, { use } from "react";
import { useRef,useState,useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref=useRef()
    const passwordRef=useRef()
    const [form, setform] = useState({site:"", username: "", password:""})
    const [passwordArray, setPasswordArray] = useState([])
    
    const getpasswords=async() => {
      let req= await fetch("http://localhost:3000/")
      let passwords = await req.json()
          setPasswordArray(passwords)
    }
    
    useEffect(() => {
        getpasswords()
    }, [])
    const showpass= () => {
        passwordRef.current.type='text'
        
        if(ref.current.src.includes('icon/eyecross.png')){
            ref.current.src='icon/eye.png'
            passwordRef.current.type='password'
        }
        else{
            passwordRef.current.type='text'
            ref.current.src='icon/eyecross.png'
        }
    }
    const savepass=async() => {
        if(form.site.length >3 && form.username.length >3 &&form.password.length >3){
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

      
      setform({ site: "", username: "", password: "" })
        }
    }

    const deletePassword=async(id) => {
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        toast.success('Successfully Deleted!')
    }
    const editPassword=(id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handlechange=(e) => {
      setform({...form,[e.target.name]: e.target.value})
    }

    const copyText=(text) => {
        toast.success('Successfully Copied!')
      navigator.clipboard.writeText(text)
    }
    
    
    
    
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            
      <div className="md:mycontainer px-40">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass/</span>
          <span className="text-green-500">&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">password manager</p>

        <div className="text-black gap-8 flex flex-col p-4 items-center">
          <input value={form.site} onChange={handlechange}
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text" placeholder="Enter website URL" name="site"
          />
          <div className="flex  w-full  gap-3 justify-between">
            <input value={form.username} onChange={handlechange}
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text" placeholder="Enter UserName" name="username"
            />
            <div className="realtive">
                
            <input ref={passwordRef} value={form.password} onChange={handlechange}
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="password" placeholder="Enter Password" name="password" 
              />
              <span className="absolute cursor-pointer" onClick={showpass}>
                <img ref={ref} width={57} className="p-4 py-1" src="icon/eye.png" alt="eye"  />
              </span>
              </div>
          </div>
          <button onClick={savepass} className="flex gap-2 justify-center items-center bg-green-500 hover:bg-green-300 cursor-pointer rounded-full w-fit px-4 py-2">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>



        <Toaster
        position="top-right"
        reverseOrder={false}
        />
        <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
      </div>
    </>
  );
};

export default Manager;
