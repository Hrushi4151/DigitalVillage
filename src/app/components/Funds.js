import React,{useState,useEffect} from 'react'

const funds = () => {

  const [AllFunds, setAllFunds] = useState([]);

  const getFunds = async () => {
    const res = await fetch("/api/funds/getFund", {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    });

    const resdata = await res.json();
    setAllFunds(resdata.AllFunds);
  };
  useEffect(() => {
    getFunds();
  }, []);
  return (
    <>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full md:w-[80vw] mx-auto mb-10">
      <h1 className="sm:text-4xl text-3xl title-font mb-2 text-gray-900 bg-white p-2 mx-auto rounded-lg font-bold">Fundings</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base bg-white rounded-lg p-1"> sample Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p>
    </div>
    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap bg-white">
        <thead>
          <tr>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Fund Name</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Type</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Date</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Objective</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Description</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Amount</th>
          </tr>
        </thead>
        <tbody>
        {AllFunds.length>0 ? AllFunds.map((item)=>{
            return(
            <tr className=''>
            <td className="px-4 py-3">{item.fundname} </td>
            <td className="px-4 py-3">{item.fundtype}</td>
            <td className="px-4 py-3">{item.date}</td>
            <td className="px-4 py-3 text-lg text-gray-900">{item.objectives}</td>
            <td className="v">{item.desc}</td>
            <td className="px-4 py-3">{item.amount}</td>
            <td className=" text-center "><span onClick={()=>removeFund(item._id)} className="cursor-pointer text-xl text-black ">🗑️</span></td>
          </tr>)
          }):<h2 className="my-2 uppercase  text-xl bg-white p-2 mx-auto">
          No Fundings Found
        </h2>}
        </tbody>
      </table>
    </div>
  </div>
</section>
    </>
  )
}

export default funds