
function Home() {

    function navigate(url : string){
        window.location.href = url;
    }

    async function auth(){
        const response =await fetch('http://localhost:5000/request',{method:'post'});
    
        const data = await response.json();
        console.log(data);
        navigate(data.url);
    
    }

    return (
        <>
            <h1>Welcome to Consulting Ninja!</h1>
            <h3>Google OAuth!</h3>
            <p>Visit <a href="https://www.youtube.com/@ConsultingNinja/featured"><strong>@ConsultingNinja</strong></a> to see more great videos!</p>

            <button className="btn-auth"  type="button" onClick={()=> auth()}>Click Here to Authenticate</button>
        </>
    );
}

export default Home;