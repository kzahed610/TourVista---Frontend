import CardGrid from "../components/CardGrid"; 
import useTours from "../hooks/useTours"; 
import './HomePage.css' 

function HomePage() { 
  const { status, results, tours } = useTours(); 

return ( 
  <div className={status === "loading" ? "dark-background" : ""}>
     {status === "loading" ? (
       <p className="loading">Loading tours…</p> 
      ) : ( 
      <CardGrid status={status} results={results} tours={tours} /> 
    )} 
    </div>
     ); 
    } 

 export default HomePage;