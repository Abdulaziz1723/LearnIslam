export default function MainTable(
    {id,type,nameOfUstaz,definition,kitabName,photo,link})
    {

    return(
        <>
            <div className="BeginnerUstaz" id={id}>
                <div className="up">                
                <h1 id="type">{type}</h1>
                <h2 id="nameOfUstaz">ኡስታዝ፡ {nameOfUstaz}</h2>
                <p id="definition" style={{whiteSpace: "pre-line"}}>{definition}</p>
                <h2 id="kitabName">የ መጽሃፉ ስም ፡ {kitabName}</h2>
                </div>
                 <div className="under">
                    <div className="container">
                    <a href={link}><img src={photo} alt="PHOTO OF KITAB" id="photo" loading="lazy"/></a>
                    </div>
                </div>

            </div>
        </>       
    )
}