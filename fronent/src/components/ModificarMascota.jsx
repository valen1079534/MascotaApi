import React from "react"
import img from "./../../public/bg.jpg"
import close from "./../../public/btn-close.jpg"
import camera from "./../../public/icon-camera.jpg"
import saveBtn from "./../../public/btn-update.jpg"

  function ModificarMas() {

    return(
        <div className="flex flex-col items-center  min-h-screen" 
        style={{backgroundImage:`url(${img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>

            <div className= 'flex flex-row mt-20 justify-center'>
                <label className='text-white text-xl font-medium' >Modificar Mascota</label>
                <div className='ml-10'>
                    <img className='rounded-full' src={close} />
                </div>
            </div>
            
            <div className='mt-16' >
                <img className='rounded-full size-36 mb-10' src={camera} />
            </div>

            <form>
                    <div className='flex flex-col'>
                        <input className='w-full bg-slate-400 py-3 px-2 rounded-3xl border border-gray-400 bg-transparent  placeholder-blue-950 mb-5'
                        type='text' placeholder='Nombre' />
                    </div>

                    <div className='flex flex-col'>
                        <select className='w-full bg-slate-400 py-3 px-2 rounded-3xl border border-gray-400 bg-transparent  placeholder-blue-950 mb-5'>
                            <option>Seleccione Raza...</option>
                        </select>
                    </div>

                    <div  className='flex flex-col'>
                        <select className='w-full bg-slate-400 py-3 px-2 rounded-3xl border border-gray-400 bg-transparent placeholder-blue-950 mb-5'>
                            <option>Seleccione Categoria...</option>
                        </select>
                    </div>

                    <div  className='flex flex-col'>
                        <input className='w-full bg-slate-400 py-3 px-2 rounded-3xl border border-gray-400 bg-transparent   placeholder-blue-950 mb-5'
                        type='text' placeholder='Cambiar Foto' />
                    </div>

                    <div  className='flex flex-col'>
                        <select className='w-full bg-slate-400 py-3 px-2 rounded-3xl border border-gray-400 bg-transparent   placeholder-blue-950 mb-5'>
                            <option>Seleccione Genero</option>
                        </select>
                </div>

                <div>
                    <img className='rounded-full' src={saveBtn} />
                </div>
            </form>
            
        </div> 
    )
  }


export default ModificarMas