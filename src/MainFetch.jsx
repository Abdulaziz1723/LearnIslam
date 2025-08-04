import MainTable from "./MainTable"
import UstazData from "./server"

export default function MainFetch () {
    const Result = UstazData.map((item, index) => {
        return(<>
        <MainTable
        key={index} 
        id={item.id}
        type={item.type}
        nameOfUstaz={item.nameOfUstaz}
        definition={item.definition}
        kitabName={item.kitaName}
        photo={item.photo}
        link={item.link}
        />
        <hr />
        <div className="defkitab">
        </div>
        </>
      )
    })
    return(
        <>
        {Result}
        </>
    )
};