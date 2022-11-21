import React, { useContext, useEffect, useState } from "react";
import { Button } from "@material-tailwind/react"
import AuthContext from "../../context/AuthContext";
import Axios from "axios";
import Swal from 'sweetalert2'


const baseUrl = 'http://127.0.0.1:8000/'
export default function ListApplications() {
    const [pending, setPending] = useState([])
    const {authTokens} = useContext(AuthContext)

    useEffect( () => {
        Axios.get(baseUrl+'base/pendinglist',
        {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer  ${authTokens.access}`
            }
        }).then((response) => {
            setPending(response.data)

        })
    },[])

    const handleApprove = (booking_id)=>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Approve ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                console.log('srrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
                try{
                    Axios.post(baseUrl+'base/approving/'+ booking_id).then(res =>{
                        Swal.fire('Success','Form is Approved successfully')
                        console.log('successssssssssssssssssssssssss')
                    })
                } catch (err) {
                    Swal.fire('Error', 'Form has not been approved.')
                }
            } else {
                Swal.fire('', 'Form has not been Approved.')
            }
        })
    }

  
    const handleDecline = (declining_id)=>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Decline ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                console.log('srrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
                try{
                    Axios.post(baseUrl+'base/declining/'+ declining_id).then(res =>{
                        Swal.fire('Success','Form is Declined successfully')
                        console.log('successssssssssssssssssssssssss')
                    })
                } catch (err) {
                    Swal.fire('Error', 'Form has not been declined.')
                }
            } else {
                Swal.fire('', 'Form has not been Declined.')
            }
        })
    }

    return (
        <div>
            <div className="flex flex-col">
                <h1 className="font-bold text-4xl text-gray-600 text-center">Applications</h1 >
                    <div className="overflow-x-auto">
                        <div className="flex justify-between py-3 pl-2">
                            <div className="relative max-w-xs">
                                <label htmlFor="hs-table-search" className="sr-only">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    name="hs-table-search"
                                    id="hs-table-search"
                                    className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                                    placeholder="Search..."
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <svg
                                        className="h-3.5 w-3.5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                                        <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                                            <div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-3 h-3"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="hidden sm:block">
                                                Filters
                                            </div>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-1.5 w-full inline-block align-middle">
                            <div className="overflow-hidden border-x-slate-900 rounded-lg">
                                <table className="min-w-full bg-white divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                        <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Full Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Company Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Email
                                            </th>
                                        
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Phone
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Address
                                            </th>
                                            
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">

                                        { pending.map((data,index) => {
                                            return(
                                                <tr key={data.id}>
                                            
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                {index+1}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {data.full_name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {data.company_name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {data.email} 
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {data.phone} 
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {data.address} 
                                            </td>
                                        
                                            <td className="px-6 py-4 text-sm font-medium text-center flex w-max gap-2 whitespace-nowrap">
                                                <Button onClick={() => handleApprove(data.id)} className="bg-green-700 " >
                                                    Approve
                                                </Button>
                                            
                                            
                                                <Button onClick={()=> handleDecline(data.id)}  className="bg-red-700 hover:bg-red-600">
                                                    Decline
                                                </Button>
                                            </td>
                                        </tr>
                                        
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}